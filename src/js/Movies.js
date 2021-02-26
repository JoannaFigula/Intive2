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
            el.addEventListener('click', this.handleChangeSeen)
        })

        this.moviesListEl.addEventListener('click', this.deleteMovie)

    }

    render() {
        this.moviesListEl.innerHTML = '';
        this.movies.items.forEach(element => {
            new Movie(element, this.moviesListEl)
        })
    }

    init() {
        this.moviesListEl = this.root.querySelector('#moviesList');
        this.counterAllEl = document.querySelector("#moviesCounterAll");
        this.counterSeenEl = document.querySelector('#moviesCounterSeen');
        // const form = new Form('#formContainer', [
        //     new FormControl('title', 'Title', 'titleParagraph', value => value.length <= 2, '#moviesListContainer', 'Tytul niepoprawny')
        // ])
        //
        // form.init()
    }

    deleteMovie(e) {
        const {target: {id}} = e;
        const elId = id.split('-')[1];
        console.log(this)
        this.movies.delete(elId);
        this.render();
        this.updateCounterAll();
    }

}
