var app;
var auth_data = {};

//NODE COMMAND: static-server -p 8001

function Init()
{
	
   var newMap = L.map('map').setView([51.505, -0.09], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(newMap);

	L.marker([51.5, -0.09]).addTo(newMap)
	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
	
	
    app = new Vue({
        el: "#app",
        data: {
            location_search: "",
			map: newMap,
			search_type: "address",
            search_type_options: [
                { value: "address", text: "Address" },
                { value: "coordinate", text: "Coordinate" }
            ],
            search_results: []
        },
        computed: {
            search_placeholder: function() {
                if (this.search_type[0] === "a")
                    return "Search for an " + this.search_type;
                return "Search for a " + this.search_type;
            }
        }
    });
}

function LocationSearch(event)
{
    alert("Location Search");
}

function SpotifyData(data)
{
    app.search_results = data[app.spotify_type + "s"].items;
    console.log(data);
}
