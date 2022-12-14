// Create Movie Class
class Movie {

    constructor(id, title, plot, poster, ranking, trailer, state,providers,providersLogos) {
        this.id = id;
        this.title = title;
        this.plot = plot;
        this.poster = poster;
        this.ranking = ranking;
        this.trailer = trailer;
        this.state = state;
        this.providers = providers;
        this.providersLogos = providersLogos;
    }


    isToBeWatched() {
        return this.state === "to-be-watched";
    }

    isWatched() {
        return this.state === "watched";
    }

    isWatching() {
        return this.state === "watching";
    }

    addNote(note) {
        var aNote = [moment().format("YYYY-MM-DD hh:mm A") ,note];
        if (!this.myNotes) {
            this.myNotes = [];
        }
        this.myNotes.push(aNote);
        return aNote;
    }

    getNotes() {
        return this.myNotes ? this.myNotes : [];
    }


    nextState() {
        if (this.isToBeWatched()) {
            return "watching";
        } else if (this.isWatching()) {
            return "watched";
        } else if (this.isWatched()) {
            return "to-be-watched";
        } else {
            return "to-be-watched";
        }
    }

    // Function to stringify the movie object
    toString() {
        return JSON.stringify(this);
    }

    // Return movie info link
    link() {
        // Return tmdb link
        var l = "https://www.themoviedb.org/movie/" + this.id;
        return l;
    }

    store(){
        this.storeObj("movies");
    }

    archive() {
        this.archivedAt = new Date();
        this.storeObj("archive");
    }
    // Fuction to save movie to storage
    storeObj(table) {
        // Get existing movies from storage
        var movies = JSON.parse(localStorage.getItem(table));
        // If no movies, create an array
        if (!movies) {
            movies = [];
        }

        // Check if the movie is in the array by comparing ids
        var found = false;
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].id === this.id) {
             
                movies[i] = this;
                found = true;
                break;
            }
        }

        if (!found) {
            movies.push(this);
        }

        // Save movie to local storage
        localStorage.setItem(table, JSON.stringify(movies));

        // Movie.storeMoviesAtServer();
    }


    remove(){
        this.removeObj("movies");
    }

    removeArchive(){
        this.removeObj("archive");
    }

    // Add remove function to remove the movie from local storage
    removeObj(table) {
        // Get existing movies from storage
        var movies = JSON.parse(localStorage.getItem(table));
        // If no movies, create an array
        if (!movies) {
            movies = [];
        }
        // Find movie in array and remove it
        for (var i = 0; i < movies.length; i++) {
            if (movies[i].id === this.id) {
                movies.splice(i, 1);
                break;
            }
        }
        // Save movie to local storage
        localStorage.setItem(table, JSON.stringify(movies));
    }

    // Add static methods to load movies from localStorge
    static loadJSON(table) {
        // Get existing movies from storage
        var json = localStorage.getItem(table);
    
        var aMovies = JSON.parse(json);
        // If no movies, create an array
        if (!aMovies) {
            aMovies = [];
        }
        return aMovies;
    }

    static clearArchive() {
        localStorage.removeItem("archive");
    }

    
    static loadMovie(id) {
        var movies = Movie.loadMovies();
     
        for (var i = 0; i < movies.length; i++) {
            
            if (movies[i].id == id) {
                return movies[i];
            }
        }
        return null;
    }

    static loadMovies() {
        var aMovies = Movie.loadJSON("movies");
        var movieObjects = Movie.load(aMovies);

        return Movie.sort(movieObjects);
    }

    static loadArchive() {
        var movies = Movie.loadJSON("archive");
        return Movie.load(movies);
    }

    static load(movies){
        var movieObjects = [];
        movies.forEach(function (movie) {
            var aMovie = new Movie(movie.id, movie.title, movie.plot, movie.poster, movie.ranking, movie.trailer, movie.state,movie.providers,movie.providersLogos);
            aMovie.archivedAt = movie.archivedAt;
            aMovie.rating = movie.rating;
            aMovie.myNotes = movie.myNotes;
            aMovie.social = movie.social;
            aMovie.providers = movie.providers;
            aMovie.providersLogos = movie.providersLogos;
            aMovie.release_date = movie.release_date;
            movieObjects.push(aMovie);
        });
        return movieObjects;
    }

    // Add static method to parse the movie object and return a new movie object
    static parse(movieJson) {
        var movie = JSON.parse(movieJson);
        var newMovie = new Movie(movie.id, movie.title, movie.plot, movie.poster, movie.ranking, movie.trailer, movie.state,movie.providers,movie.providersLogos);
        newMovie.archivedAt = movie.archivedAt;
        newMovie.rating = movie.rating;
        newMovie.myNotes = movie.myNotes;
        newMovie.social = movie.social;
        newMovie.providers = movie.providers;
        newMovie.providersLogos = movie.providersLogos;
        newMovie.release_date = movie.release_date;
        return newMovie;
    }

    static storeMoviesAtServer() {
        var movies = Movie.loadMovies();
        var moviesJson = JSON.stringify(movies);
        $.post("http://127.0.0.1:5500/data/data.json", moviesJson, function (data) {
            console.log(data);
        });
    }

    static sort(movies) {
        movies.sort(function (a, b) {
            var titleA = a.title.toUpperCase(); // ignore upper and lowercase
            var titleB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        return movies;
    }
}
