export default class Movie {
    constructor(movie, parent) {
        this.movie = movie;
        this.parent = parent;
        this.render();
    }
    render() {
        const isSeen = this.movie.seen;
        let btnText;
        if (!isSeen) {
            btnText= `<i class="fas fa-plus"></i> Add to viewed`;
        } else {
            btnText = `<i class="fas fa-check"></i> Viewed`
        }
        const li = document.createElement('li');
        li.classList.add('movieItem', this.movie.seen && 'greenBorder')
        li.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div>
                    <img alt="" class="bg" src="${this.movie.url}"/>
                    <div class="factorParagraphs">
                        <p class="factor factorParagraph">${this.movie.year}</p>
                        <p class="factor factorParagraph">${this.movie.genre}</p>
                    </div>
                    
                    <h2> ${this.movie.title} </h2> <p class="summary">${this.movie.summary}</p>
               </div>
                <div class="factorGroup">        
                    <button id="moviesItem-${this.movie.id}" class="factor btnSeen ${this.movie.seen && 'btnViewed'}">${btnText}</button>
                    <button id="moviesItem-${this.movie.id}"  class="factor btnRemoved">Remove</button>                
                </div>
            `
        this.parent.appendChild(li);
    }
}
