import axios from 'axios'
import { store } from './../store/store';
import { changeLoader } from '../store/slices/loader';


const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",

    // baseURL:"https://api.themoviedb.org/3/movie/popular",
    // baseURL:"https://api.themoviedb.org/3/genre/movie/list",

    // headers:{
    //    
    // },
    params:{
        api_key:"287a62fa780c976ad81318395b30b71f"
    }
})


instance.interceptors.request.use((config)=>{
    store.dispatch(changeLoader(true))
 
     return config
 },(err)=>{
 
     return Promise.reject(err)
 })
 
 //response interceptor
 instance.interceptors.response.use((res)=>{
 // console.log(res);
 
 store.dispatch(changeLoader(false))
 
 //store.getState()
 return res
 },(err)=>{
 
     return Promise.reject(err)
 })
 

export default instance