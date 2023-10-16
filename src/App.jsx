import AppLayout from './components/appLayout/appLayout'
import NotFound from './pages/notFound/NotFound'
import Home , {loader as moviesLoader} from './pages/home/Home'
import MovieDetails from './pages/details/movieDetails'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import Fav from './pages/favorites/Fav'
import { store } from './store/store'


const router = createBrowserRouter([
  {
    path:'/', element:<AppLayout/>,
    children:[
      {index : true , element: <Home/> , loader : moviesLoader },
      {path:'/details/:id' , element: <MovieDetails/>},
      {path:'/fav' , element: <Fav/>}
      
    ]
  },
  {
    path:"*",element:<NotFound/>
  }
])
function App() {

  return <Provider store={store}><RouterProvider router={router}/></Provider> 
}

export default App
