import React, { useEffect, useState } from 'react';
import { useNavigate , useLoaderData } from 'react-router-dom';
import instance from '../../axiosConfig/instance';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import {decreasePage , increasePage , setPage } from '../../store/slices/page'
import {setMovies } from '../../store/slices/movies'
import {setDetails } from '../../store/slices/details'
import { FaRegStar , FaStar } from "react-icons/fa6";
import {addToFavo , removeFromFavo ,  } from '../../store/slices/favorites'

import './home.css'
import { setGenres } from '../../store/slices/genres';
import areFavs, { changeFavs , emptyFavs , editFavs } from '../../store/slices/areFavs';

const Home = () => {
    // const [movies, setMovies] = useState([])
    // const [genres , setGenres] = useState([])
    
    const page = useSelector((state) => state.page.page)
    const moviesFromStore = useSelector((state) => state.movies.movies)
    const genres = useSelector((state)=> state.genres.genres)
    let movies = useLoaderData()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const favMovies = useSelector((state) => state.favorites.favorites)
    const areFav = useSelector((state)=> state.areFavs.areFavs)

    
    useEffect(() => {
        
        dispatch(setMovies(movies))


        
        dispatch(emptyFavs())
        let found = false;
        for(let i = 0 ; i < movies.length ; i++){
            found = false
            for(let j = 0 ; j < favMovies.length ; j++){
                if(movies[i].id == favMovies[j].id){
                    dispatch(changeFavs({is : true , index : i , title : movies[i].title}))
                    found = true;
                }
            }
            if(!found){
                dispatch(changeFavs({is : false , index : i , title : movies[i].title}))
            }

        }
            
        

        

        instance.get(`genre/movie/list`,{
            // headers:{"content-type": "application/json"},
        }).then((res) => {
            dispatch(setGenres(res.data.genres))
            
            // setGenres([...res.data.genres])
        }).catch((err) => {
            console.log(err);
        })
    }, [])
     

    const pervPageFunc = (p)=>{
        p = p || 0
        if(p == 0){
            

            dispatch(decreasePage())
            displayMovies(p - 1)
        }
        else{
            dispatch(setPage(p))
            displayMovies(p)
            
        }
        
        
        
        
    }

    const nextPageFunc = (p)=>{
        p = p || 0
        if(p == 0){
            dispatch(increasePage())
            if(page == 1){
                displayMovies(p + 2)

            }else{
                displayMovies(page + 1)

            }

        }
        else{
            dispatch(setPage(p))
            displayMovies(p)

        }
        
        // displayMovies(page)
      
        
    }

    const displayMovies = async (p) =>{

        var res = await instance.get(`movie/popular?page=${p}`,{
            headers:{"content-type": "application/json"},
        })
        dispatch(setMovies(res.data.results))

       

    }

    const toggleFav = (film , index)=>{
        if(areFav[index].is){
            dispatch(removeFromFavo(film))
            dispatch(editFavs(index))
        }
        else{
            dispatch(addToFavo(film))
            dispatch(editFavs(index))

        }
    }
    return (
        <div>
            <h1 className="h1">
                Populer Movies
            </h1>
            <div className="row justify-content-around align-items-center m-0 w-100 p-1 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3" id='movies'>
                {moviesFromStore.map((movie , index)=>(
                    <div className="col" key={movie.id} >
                        <div className="card p-0">
                            <div className="card-header p-0">
                                <span onClick={()=>toggleFav(movie , index)}>
                               {
                                    (areFav.map((value , i)=> {
                                        if(i == index){
                                            if(value.is){
                                                return <FaStar key={value.index}/>
                                            }
                                            else{
                                                return <FaRegStar key={value.index}/>
    
                                            }
                                        }
                                        
                                    }))
                               }
                                </span>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='card-img-top'/>
                            </div>
                            <div className="card-body">
                                <p className="lead fw-semibold">{movie.title}</p>
                                <p className="lead">
                                    {
                                        movie.genre_ids?.map((mGenre)=>(
                                            genres.map((g)=>(
                                                (g.id == mGenre)?<span className="badge text-bg-success me-2" key={mGenre}>{g.name}</span>:""
                                            ))
                                        ))
                                        
                                    }
                                </p>
                                <button className='btn btn-outline-dark btn-sm' onClick={()=>{ navigate(`/details/${movie.id}`)}}>
                                    Show Movie 
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container mx-auto my-3  text-center">
            <nav aria-label="Page navigation example text-center">
            <ul className="pagination justify-content-center">
                <li className="page-item ">
                <a className={(page == 1)?"disabled page-link":"page-link " } type='button' href='#movies'   aria-label="Previous" onClick={()=>{pervPageFunc()}} disabled={page == 1} >
                    <span aria-hidden="true" >&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className={(page <= 2)?"disabled page-link":"page-link "}  href="#movies" onClick={()=>{
                    pervPageFunc(page - 2 )    
                }}>{(page <= 2)?"-":`${page - 2}` }</a></li>
                <li className="page-item"><a className={(page == 1)?"disabled page-link":"page-link " } href="#movies" onClick={()=>{
                    pervPageFunc(page - 1)
                }}>{(page == 1)?"-":`${page - 1}`}</a></li>
                <li className="page-item"><a className="page-link active" href="#movies" onClick={()=>{
                    displayMovies(page)
                }}>{page }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    nextPageFunc(page + 1)
                }}>{page +1 }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    nextPageFunc(page + 2)
                }}>{page +2 }</a></li>
                {/* <li className="page-item"><a className="page-link active" href="#movies" onClick={()=>{
                    displayMovies(page)    
                }}>{page }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    displayMovies(page + 1)
                }}>{page +1 }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    displayMovies(page + 2)
                }}>{page +2 }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    displayMovies(page + 3)
                }}>{page +3 }</a></li>
                <li className="page-item"><a className="page-link" href="#movies" onClick={()=>{
                    displayMovies(page + 4)
                }}>{page +4 }</a></li> */}
                <li className="page-item">
                <a className="page-link" aria-label="Next" href='#movies' type="button" onClick={()=>{nextPageFunc()}}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>
            </div>
            
        </div>
    );
}


export const loader = async ()=>{
    var res = await instance.get("/movie/popular")
    return res.data.results
}



export default Home;
