app.service('starservice', function ($http) {
    let url = "https://swapi.co/api/"

    // Search for a person
    this.search = (search, callback) => {
        this.get(url + "people/?search=" + search, callback);
    }

    // Get person
    this.person = (id, callback) => {
        this.get(url + "people/" + id, callback);
    }

    // Get url
    this.get = (url, callback) => {
        $http.get(url).then((resp) => {
            callback(resp.data);
        })
    }

    // Get image url
    this.image = (id) => {
        return "https://starwars-visualguide.com/assets/img/characters/" + id + ".jpg";
    }
});