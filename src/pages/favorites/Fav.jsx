import { useEffect, useState } from "react";
import {  NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import favorites from "../../store/slices/favorites";

const Fav = () => {

    // const [favMovies , setFavMovies] = useState([])
    const [favExist , setFavExist] = useState(false)
    const navigate=useNavigate()
    const genres = useSelector((state)=> state.genres.genres)

    const favMovies = useSelector((state) => state.favorites.favorites)
    useEffect(()=>{
        console.log(favMovies);
        if(favMovies.length > 0){
            setFavExist(true)
        }
    },[])

    // useEffect(()=>{

    //     console.log(localStorage.length);
    //     if(localStorage.length == 0 ){
    //         console.log(favExist);
    //         setFavExist(false)

    //     }
    //     else{
    //         // console.log(moviesBeforeParse);
    //         let moviesAfterParse = JSON.parse(localStorage.getItem("favMovies"))

    //         console.log(moviesAfterParse.length);
    //         /* for(let i = 0 ; i < moviesAfterParse.length ; i++){
    //             console.log({...moviesAfterParse[i]});
    //             setFavMovies([...favMovies , {...moviesAfterParse[i]}])

    //         } */
    //         setFavMovies([ ...moviesAfterParse])

    //         // setFavMovies(...movies)
    //         console.log(moviesAfterParse);
    //         setFavExist(true)
    //         // setFavMovies([...favMovies , {...moviesAfterParse} ])

    //         // console.log(...movies);


    //     }
    //     // setFavMovies(...favs)

    //     console.log(favMovies);

    // },[])

    return <>
        {(favExist )?<div>
            <h1 className="h1">
                Favourite Movies
            </h1>
            <div className="row justify-content-around align-items-center m-0 w-100 p-1 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3" id='movies'>
                {favMovies.map((movie)=>(
                    <div className="col" key={movie.id} >
                    <div className="card p-0">
                        <div className="card-header p-0">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='card-img-top'/>
                        </div>
                        <div className="card-body">
                            <p className="lead">{movie.title}</p>
                            <p className="lead">
                                
                                {
                                    (movie.genres)? movie.genres.map((g,i)=> (
                                        <span className="badge text-bg-success me-2"  key={i}>
                                            {g.name}
                                        </span>
                                    )):movie.genre_ids?.map((mGenre)=>(
                                        genres.map((g)=>(
                                            (g.id == mGenre)?<span className="badge text-bg-success me-2" key={mGenre}>{g.name}</span>:""
                                        ))
                                    ))

                                   
                                    // [...movie.genres].map((g , i)=> (
                                    //     <span className="badge text-bg-success me-2" key={i}>{g.name}</span>
                                    // ))
                                }
                            </p>
                            <button className='btn btn-outline-light btn-sm' onClick={()=>{ navigate(`/details/${movie.id}`)}}>
                                Show Movie 
                            </button>

                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>:    
            <div className="text-center mt-3">
                <p className="lead ">
                    You didn't add movies to favorites
                </p>
                <NavLink to="/" className="btn btn-outline-danger ">Back to Movies</NavLink>
            </div>
            
        }   
        </>;
}

export default Fav;
