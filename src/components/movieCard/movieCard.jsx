/* import { useEffect, useState } from "react";

const MovieCard = (props) => {

    const [movie , setMovie] = useState({})
    const [genres , setGenres] = useState([])

    useEffect(()=>{
        setMovie(props.movie[0])
        console.log(props.movie[0]);

        console.log(props.genres[0]);
        var g = props.genres[0];
        console.log(g);
        setGenres([...g])

    },[])
    console.log(genres);

    return (
        <div className="card p-0">
            <div className="card-header p-0">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='card-img-top'/>
            </div>
            <div className="card-body">
                <p className="lead">{movie.title}</p>
                <p className="lead">
                    {
                        
                    }


                    {
                        movie.genre_ids.map((mGenre)=>(
                            genres.map((g)=>(
                                (g.id == mGenre)?<span className="badge text-bg-success me-2" key={mGenre}>{g.name}</span>:""
                            ))
                        ))

                    }
                </p>
                <button className='btn btn-outline-light btn-sm' onClick={()=>{ navigate(`/details/${movie.id}`)}}>
                    Show Movie 
                </button>

            </div>
        </div>
    );
}

export default MovieCard;
 */