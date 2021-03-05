import Movie from './Movie';
import Popup from './Popup';
import Form from './Form';
import setCounterOfTo from './utils/movies-counter';
import FormControl from "./FormControl";

export default class Movies {
    constructor(selector, movieStorage) {
        this.deleteMovie = this.deleteMovie.bind(this)
        this.updateMovies = this.updateMovies.bind(this);
        this.handleChangeSeen = this.handleChangeSeen.bind(this)
        this.popup = new Popup('.popup', '.btnAdd')
        this.root = document.querySelector(selector);
        this.movies = movieStorage;
        this.init();
        this.render();
        this.addListeners();
        this.updateCounterAll();
        this.updateCounterSeen();
        this.addListeners();
    }

    updateCounterAll() {
        this.totalCount = this.movies.items.length;
        setCounterOfTo(this.counterAllEl, this.totalCount)
    }

    updateCounterSeen() {
        this.seenCounter = this.movies
            .items
            .filter(el => el.seen)
            .length;
        setCounterOfTo(this.counterSeenEl, this.seenCounter)
    }

    setButtonValue(el) {
        const isSeen = el.classList.contains('btnViewed');
        if (isSeen) {
            el.innerHTML = `<i class="fas fa-plus"></i>&nbsp Add to Viewed`;
        } else {
            el.innerHTML = `<i class="fas fa-check"></i>&nbsp Viewed`
        }
    }

    updateMovies(id, e) {
        const index = this.movies.findMovie(id);
        const copy = [...this.movies.items];
        copy[index].seen = !copy[index].seen
        this.movies.items = copy;
        const li = e.currentTarget.parentElement.parentElement;
        li.classList.toggle('greenBorder');
        this.setButtonValue(e.currentTarget);
        e.currentTarget.classList.toggle('btnViewed');
        this.updateCounterSeen();
    }

    handleChangeSeen(e) {
        const {currentTarget: {id}} = e;
        const elId = id.split('-')[1];
        this.updateMovies(elId, e);
        this.updateCounterAll();
    }

    addListeners() {
        this.moviesListEl.querySelectorAll('button.btnSeen').forEach(el => {
            el.addEventListener('click', this.handleChangeSeen);
        })
        this.moviesListEl.querySelectorAll('button.btnRemoved').forEach(el => {
            el.addEventListener('click', this.deleteMovie);
        })
    }

    render() {
        this.moviesListEl.innerHTML = '';
        this.movies.items.forEach(element => {
            console.log(element.seen)
            new Movie(element, this.moviesListEl)
        })
        this.addListeners();
    }

    addMovie = movie => {
        this.movies.add({
            ...movie,
            url: "https://source.unsplash.com/random",
            summary: movie.description,
            seen: false,
            id: new Date().getUTCDate()
        });
        this.popup.close()
        this.render()
    }

    init() {
        this.moviesListEl = this.root.querySelector('#moviesList');
        this.counterAllEl = document.querySelector("#moviesCounterAll");
        this.counterSeenEl = document.querySelector('#moviesCounterSeen');
        this.movieInput = document.querySelector('input');
        this.btnSubmit = document.querySelector('#btnSubmit');
        this.form = document.querySelector('form');
        this.idNumber = 21;
        const title = new FormControl('text', 'title', 'Title', value => value.length > 2, 'form', 'Tytul niepoprawny');
        const year = new FormControl('number', 'year', 'Year', value => value.length === 4 , 'form', 'Rok niepoprawny');
        const genre = new FormControl('text', 'genre', 'Genre', value => value.length > 0 , 'form', 'Wpisz gatunek');
        const description = new FormControl('textarea','description', 'Description', () => true, 'form');


        const form = new Form('.formContainerGroup', 'form', [ title, year, genre, description], this.addMovie);
        form.init();

    }

    deleteMovie(e) {
        const {target: {id}} = e;
        const elId = id.split('-')[1];
        this.movies.delete(elId);
        this.render();
        this.updateCounterAll();
    }
}
