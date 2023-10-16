import { useState ,useEffect  } from "react";
import instance from "../../axiosConfig/instance";
import { useParams } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import {addToFavo , removeFromFavo } from '../../store/slices/favorites'
import {setDetails } from '../../store/slices/details'

const MovieDetails = () => {

    const [movie , setMovie] = useState({})
    const [genre , setGenre] = useState([])
    // const [isFav , setIsFav] = useState(false)

    const isFav = useSelector((state)=> state.details.details)
    const loader = useSelector((state) => state.loader.loader)

    const favMovies = useSelector((state) => state.favorites.favorites)
    
    const {id} = useParams()

    const dispatch = useDispatch()


    useEffect(()=>{
        instance.get(`movie/${id}`).then((res) => {
            setGenre([...res.data.genres])
            setMovie(res.data)
            
        }).then(()=>{
            if(favMovies.length > 0){
                for(let i = 0 ; i < favMovies.length ; i++){
                    if(favMovies[i].id == id){
                        
                        dispatch(setDetails(true))
                        break
                    }
                    else{
                        dispatch(setDetails(false))
                    }
                }
               
            }
        }).catch((err) => {
            console.log(err);
        })
        
    }, [])



    const toggleFav = (film)=>{
        console.log(film);
        if(isFav){
            dispatch(removeFromFavo(film))
            dispatch(setDetails(!isFav))

        }
        else{
            dispatch(addToFavo(film))
            dispatch(setDetails(!isFav))

        }
    }
    return (
        (!loader)?
        <div className="row justify-content-around m-0 p-1 align-items-center" >
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 ">
                <div className="card"><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className="card-img-top" /></div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-9 ">
                <p className="lead fs-1 my-0">{movie.title}</p>
                <p className="lead fs-4 my-0 mb-3">{movie.tagline}</p>

                <p className="lead">Overview : {movie.overview}</p>
                <p className="lead">Release Date : {movie.release_date}</p>
                <p className="lead"> Genres :&nbsp;   
                    {
                        genre.map((g,i)=> (
                            <span className="badge text-bg-success me-2"  key={i}>
                                 {g.name}
                             </span>
                        ))
                    }
                </p>
                {(isFav)?<button className="btn btn-outline-danger" onClick={()=>toggleFav(movie)}>
                    Remove from Favourite
                </button>:<button className="btn btn-outline-primary" onClick={()=> toggleFav(movie)}>
                    Add to Favourite
                </button>}
                

            </div>
        </div>:<>
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </>
    );
}

export default MovieDetails;
