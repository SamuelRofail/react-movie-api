import { configureStore } from "@reduxjs/toolkit";
import pageReducer from './slices/page'
import moviesReducer from './slices/movies'
import genresReducer from './slices/genres'
import favoritesReducer from './slices/favorites'
import detailsReducer from './slices/details'
import loaderReducer from './slices/loader'
import areFavsReducer from './slices/areFavs'

export const store = configureStore({
    reducer :{
        page : pageReducer,
        movies : moviesReducer,
        genres : genresReducer,
        favorites : favoritesReducer,
        details: detailsReducer,
        loader:loaderReducer,
        areFavs:areFavsReducer
    }
})