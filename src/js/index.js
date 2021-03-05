import Movies from './Movies';
import { moviesData } from '../source/data'
import MoviesStorage from "./MoviesStorage";


const init = () => {
    const movieStorage = new MoviesStorage(moviesData);
    const movie = new Movies('#moviesListContainer', movieStorage);
}
document.addEventListener("DOMContentLoaded", init);


