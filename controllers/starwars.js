app.controller('StarController', function ($timeout, starservice) {
    let timer = null;

    this.race = "";
    this.count = 0;
    this.search = "";
    this.planets = "";
    this.results = [];
    this.starships = [];
    this.character = null;

    // Gets info about a single character
    this.getInfo = (id) => {
        $('#characterInfo').modal('show')
        starservice.person(id, (resp) => {
            this.character = {
                "name": resp.name,
                "image": starservice.image(id),
                "info": {
                    "Navn": resp.name,
                    "Kjønn": resp.gender,
                    "Høyde": resp.height + "cm",
                    "Vekt": resp.mass + "kg",
                    "Fødselsår": resp.birth_year,
                    "Øyefarge": resp.eye_color,
                    "Hudfarge": resp.skin_color,
                },
                "ships": [],
            }

            // Get homeworld name
            starservice.get(resp.homeworld, (resp) => {
                this.character.homeworld = resp.name;
            })

            // Get race
            if (resp.species) {
                this.character.info.Rase = "";
                resp.species.forEach(specie => {
                    starservice.get(specie, (resp) => {
                        this.character.info.Rase += resp.name;
                    })
                })
            }

            // Get vehicles
            if (resp.vehicles) {
                resp.vehicles.forEach(vehicle => {
                    this.getVehicle(vehicle);
                })
                resp.starships.forEach(starship => {
                    this.getVehicle(starship);
                })
            }
        });
    }

    // Gets info on a single vehicle
    this.getVehicle = (vehicle) => {
        starservice.get(vehicle, (resp) => {
            ship = {
                "name": resp.name,
                "info": {
                    "Modell": resp.model,
                    "Pris": resp.cost_in_credits + " C",
                    "Mannskap": resp.crew,
                    "Passasjerer": resp.passengers,
                    "Klasse": (resp.vehicle_class) ? (resp.vehicle_class) : (resp.starship_class),
                }
            }
            this.character.ships.push(ship);
        });
    }

    // Gets a list of possible characters from search
    this.getList = () => {
        // Cancel timer
        $timeout.cancel(timer);
        timer = $timeout(() => {
            this.results = [];
            starservice.search(this.search, (resp) => {

                // Set counter
                this.count = resp.count;

                // Loop through all results
                resp.results.forEach(character => {
                    let id = character.url.replace("https://swapi.co/api/people/", "").replace("/", "");

                    this.results.push({
                        "Navn": character.name,
                        "Info": {
                            "Fødselsår": character.birth_year,
                            "Høyde": character.height,
                         },
                        "Bilde": starservice.image(id),
                        "Id": id,

                    })
                });
            });

        }, 500);
    }

    // Sets the search string to the clicked card
    this.setSearch = (input) => {
        this.search = input;
    }
});