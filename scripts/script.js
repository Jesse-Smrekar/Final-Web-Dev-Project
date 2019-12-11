var app;
var mymap;
var auth_data = {};
var API_URL;
var neighborhoods = [
	{"hood": "Battle Creek", "lat": 44.944011, "lon": -93.025156},
	{"hood": "Como", "lat": 44.977532, "lon": -93.146414},
	{"hood": "Daytons Bluff", "lat": 44.955243, "lon": -93.060887},
	{"hood": "Downtown", "lat": 44.951651, "lon": -93.090852},
	{"hood": "Frogtown", "lat": 44.960185, "lon": -93.121615},
	{"hood": "Greater Eastside", "lat": 44.977719, "lon": -93.025242},
	{"hood": "Highland Park", "lat": 44.912641, "lon": -93.177235},
	{"hood": "Macalenser-Groveland", "lat": 44.934347, "lon": -93.173582},
	{"hood": "Midway", "lat": 44.963015, "lon": -93.167065},
	{"hood": "Payne-Phalen", "lat": 44.977719, "lon": -93.066038},
	{"hood": "Riverview", "lat": 44.933023, "lon": -93.090391},
	{"hood": "St. Anthony Park", "lat": 44.972392, "lon": -93.198394},
	{"hood": "Summit Hill", "lat": 44.939679, "lon": -93.136448},
	{"hood": "Summit-University", "lat": 44.950433, "lon": -93.126360},
	{"hood": "West Seventh", "lat": 44.927815, "lon": -93.126994}
];











//NODE COMMAND: static-server -p 8001

function Init(crime_api_url) {

	console.log(crime_api_url);
	  API_URL = crime_api_url;

    app = new Vue({
        el: "#app",
        data: {
						rows: {},
            location_search: "",
			map: mymap,
			search_type: "address",
            search_type_options: [
                { value: "address", text: "Address" },
                { value: "coordinate", text: "Coordinate" }
            ],
            search_results: []
        },
        computed: {
            search_placeholder: function() {
				//var mapCenter = map.getCenter().toString();

                if (this.search_type[0] === "a")
                    return "Search for an Address: 1234 Street";
                return "Search for uh coordinate"; //mapCenter.substring( mapCenter.indexOf('(') + 1, mapCenter.length - 1);

            }
        }
    });

		createMap();
		getCrimeData();

}









function Prompt() {
		$(".dialog-form").dialog({
				autoOpen: true,
				modal: true,
				width: "360px",
				buttons: {
						"Ok": function() {
								var prompt_input = $("#prompt_input");
								Init(prompt_input.val());
								$(this).dialog("close");
							document.getElementById("overlay").parentNode.removeChild(document.getElementById("overlay"));//.dialog("close");

						},
						"Cancel": function() {
								$(this).dialog("close");
								document.getElementById("overlay").parentNode.removeChild(document.getElementById("overlay"));//.dialog("close");
						}
				}
		});
}

function LocationSearch(event)
{
	var input = app.location_search;

	if( app.search_type == "address"){
		let result = 'street=' + app.location_search + '&city=Saint+Paul&format=json';
		getLocation(result);
	}
	else{
		let lat = app.location_search.split(' ')[0];
		let lon = app.location_search.split(' ')[1];
		displayCoordinates( [{"lat": lat, "lon": lon}] );
	}

}

function getLocation(requestString){

	let request = {
			url: "https://nominatim.openstreetmap.org/search?" + requestString,
			dataType: "json",
			success: displayCoordinates,
			error: function(){ alert('Invalid Address');}
	};

	$.ajax(request);

}

function displayCoordinates(data){

	mymap.setView([data[0].lat, data[0].lon], 16);
	L.marker([data[0].lat, data[0].lon]).addTo(mymap);

}



function getCrimeData(){

	let request = {
			url: 'http://cisc-dean.stthomas.edu:8002/incidents?format=json&limit=10',
			headers: { "Accept": "application/json"},
			//url: API_URL + '/incidents?format=json',//"https://cisc-dean.stthomas.edu:" + port,
			dataType: "json",
			type: 'GET',
			crossDomain: true,
      beforeSend: function(xhr){
          xhr.withCredentials = true;
    	},
			success: populateRows,
			error: function(){ alert('Could Not Get St.Paul Crime Data');}
	};

	$.ajax(request);
}

function populateRows(data){

	alert(JSON.stringify(data));
	app.rows = data;

}

function createMap(){


			mymap = L.map('map').setView([44.954179, -93.091797], 10);

			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXNsYW5kaWRlYWxpc3QiLCJhIjoiY2szdzVhMHhtMGVpMDNrcGVtM3I3dTR1NCJ9.TB0u05RvP7KUzTvyumY4XA', {
				maxZoom: 18,
				minZoom: 12,
				scrollWheelZoom: true,
				touchZoom: 'center',
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
					'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox/streets-v11'
			}).addTo(mymap);

			var northWest = L.latLng(45.002773, -93.218671), southEast = L.latLng(44.883764, -92.991386);
			var bounds = L.latLngBounds(northWest, southEast);

			mymap.setMaxBounds(bounds);
			mymap.on('drag', function() {
			    mymap.panInsideBounds(bounds, { animate: false });
			});

			for(var i=0; i< neighborhoods.length; i++){
				L.marker([neighborhoods[i].lat, neighborhoods[i].lon]).bindTooltip(neighborhoods[i].hood, { permanent: false, direction: 'top'}).addTo(mymap);
			}

			var polygon = L.polygon(
	    [[[90, -180],
	      [90, 180],
	      [-90, 180],
	      [-90, -180]], //outer ring
	     [[44.988094, -93.207611],
	      [44.953294, -93.207336],
		  [44.949769, -93.202168],
		  [44.918002, -93.201342], //Frd Prkwy Bridge
		 [44.900303, -93.193946],
		 [44.895029, -93.187198],
		 [44.894234, -93.169502],
		 [44.905180, -93.145114],
		 [44.919723, -93.128577], //West Seventh Corner
		 [44.919764, -93.096051],
		 [44.923644, -93.096029],
		 [44.923573, -93.091014],
		 [44.919685, -93.090924],
		 [44.918921, -93.050867],//Battle Creek Corner
		 [44.901276, -93.038764],
		 [44.895682, -93.026061],
		 [44.891048, -93.022994],
		 [44.891052, -93.004513],
		 [44.992155, -93.005119],
		 [44.991802, -93.156665],
		 [44.988258, -93.156659],
		 [44.988174, -93.166981],
		 [44.977335, -93.167115],
		 [44.977036, -93.187278],
		 [44.988080, -93.187184] ]] // cutout
	    ).setStyle({fillColor:"#334652", fillOpacity: 0.7}).addTo(mymap);

}

/* Neighborhoods

Highland Park: [44.912641, -93.177235]
Macalenser-Groveland: [44.934347, -93.173582]
West Seventh: 44.927815, -93.126994
Riverview: 44.933023, -93.090391
Daytons Bluff: 44.955243, -93.060887
Greater Eastside: 44.975379, -93.025242
Payne-Phalen: 44.977719, -93.066038
Summit-University: 44.950433, -93.126360
Frogtown: 44.960185, -93.121615
Downtown: 44.951651, -93.090852
St. Anthony Park: 44.972392, -93.198394
Como: 44.977532, -93.146414
Summit Hill: 44.939679, -93.136448
Midway: 44.963015, -93.167065
Battle Creek: 44.944011, -93.025156


*/
