export default class MoviesStorage {
    constructor(basicMovies) {
        this.basicMovies = basicMovies;
        this.movies = [];
        this.check();
    }

    get items() {
        return this.movies;
    }

    set items(items) {
        this.movies = items;
        console.log(this.movies)
        localStorage.setItem('movies', JSON.stringify(items))
    }

    add(item) {
        this.movies = [...this.items, item];
        localStorage.setItem('movies', JSON.stringify(this.movies))
    }

    serializeData(data) {
        const changeSeen = movie => ({
            ...movie,
            seen: movie.seen === 'T'
        })

        return data.map(changeSeen);
    }

    findMovie(id) {
        return this.items.findIndex(el => el.id == id);
    }

    delete(id) {
        const movies = this.items.filter(el => el.id.toString() !== id.toString());
        this.items = movies
    }

    check() {
        let movies;
        try {
            movies = JSON.parse(localStorage.getItem('movies'))
        } catch (e) {
            console.warn(e);
        }

        if (movies && movies.length) {
            this.items = movies

            return;
        }

        this.items = this.serializeData(this.basicMovies);
    }



}
