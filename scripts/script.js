var app;
var mymap;
var auth_data = {};
var API_URL;
var still_loading = 1;
var neighborhoods = [
	{"hood": "Conway/Battle Creek/Highwood", "lat": 44.944011, "lon": -93.025156, "crimes": 0},
	{"hood": "Greater Eastside", "lat": 44.977719, "lon": -93.025242, "crimes": 0},
	{"hood": "Westside", "lat": 44.931543, "lon": -93.078075, "crimes": 0},
	{"hood": "Daytons Bluff", "lat": 44.955243, "lon": -93.060887, "crimes": 0},
	{"hood": "Payne-Phalen", "lat": 44.977719, "lon": -93.066038, "crimes": 0},
	{"hood": "North End", "lat": 44.978012, "lon": -93.108909, "crimes": 0},
	{"hood": "Frogtown", "lat": 44.960185, "lon": -93.121615, "crimes": 0},
	{"hood": "Summit-University", "lat": 44.950433, "lon": -93.126360, "crimes": 0},
	{"hood": "West Seventh", "lat": 44.927815, "lon": -93.126994, "crimes": 0},
	{"hood": "Como", "lat": 44.977532, "lon": -93.146414, "crimes": 0},
	{"hood": "Midway", "lat": 44.963015, "lon": -93.167065, "crimes": 0},
	{"hood": "St. Anthony", "lat": 44.972392, "lon": -93.198394, "crimes": 0},
	{"hood": "Union Park", "lat": 44.949043, "lon": -93.177145, "crimes": 0},
	{"hood": "Macalester-Groveland", "lat": 44.934347, "lon": -93.173582, "crimes": 0},
	{"hood": "Highland Park", "lat": 44.912641, "lon": -93.177235, "crimes": 0},
	{"hood": "Summit Hill", "lat": 44.939679, "lon": -93.136448, "crimes": 0},
	{"hood": "Summit Hill", "lat": 44.948767, "lon": -93.092090, "crimes": 0}
	//{"hood": "Downtown", "lat": 44.951651, "lon": -93.090852},
];











//NODE COMMAND: static-server -p 8001

function Init(crime_api_url) {
	getCrimeData();

	console.log(crime_api_url);
	API_URL = crime_api_url;

    app = new Vue({
        el: "#app",
        data: {
				rows: {},
        location_search: "",
			map: mymap,
			crime: 0,
			rows: {},
			still_loading: 1,
			search_type: "address",
            search_type_options: [
                { value: "address", text: "Address" },
                { value: "coordinate", text: "Coordinate" }
            ],
            search_results: [],
			search_placeholder: "Search Here"
        },
        computed: {

        }
    });


	createMap();
	/*let wait = new Promise( (resolve, reject)=>{
		
		resolve(createMap());
		
	}).then( ()=>{
			
		document.getElementById("overlay").parentNode.removeChild(document.getElementById("overlay"));
		
	});
	*/

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
								var div = document.getElementById("overlay");
								div.style.color = "white";
								div.innerHTML = "Loading...";
								div.style.position = "fixed";
								div.style.textAlign = "center";
								div.style.fontSize = "5em";
								div.style.paddingTop = "300px";

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

	if(app.crime == 1){
		var redIcon = new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		});

		mymap.setView([data[0].lat, data[0].lon], 16);
		L.marker([data[0].lat, data[0].lon], {icon: redIcon}).bindTooltip(app.location_search, { permanent: false, direction: 'top'}).addTo(mymap);
	}
	else{
		var greenIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		mymap.setView([data[0].lat, data[0].lon], 16);
		L.marker([data[0].lat, data[0].lon], {icon: greenIcon}).bindTooltip(app.location_search, { permanent: false, direction: 'top'}).addTo(mymap);

	}
	app.search_placeholder = app.location_search;
	app.location_search = '';
	app.crime = 0;
}


function getCrimeData(){

	let request = {
			url: 'http://cisc-dean.stthomas.edu:8002/incidents?format=json&start_date=2019-10-01&end_date=2019-10-31',
			headers: { "Accept": "application/json"},
			//url: API_URL + '/incidents?format=json',//"https://cisc-dean.stthomas.edu:" + port,
			dataType: "json",
			success: function(data){
				app.rows = data;
			},
			error: ()=>{ alert('Could Not Get St.Paul Crime Data');}
	};

	$.ajax(request);
}

function createMap(){

	mymap = L.map('map').setView([44.954179, -93.091797], 12);

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

	mymap.on('moveend', ()=>{

		var center = mymap.getCenter().toString();
		var latlon = {
			'lat': center.substring(center.indexOf('(') + 1, center.indexOf(',')),
			'lon': center.substring(center.indexOf(',') + 2, center.length - 1)
		};

		if (app.search_type[0] === "a"){

			let request = {
				url: 'https://nominatim.openstreetmap.org/reverse.php?format=json&lat=' + latlon.lat + '&lon=' + latlon.lon,
				headers: { "Accept": "application/json"},
				success: (data)=>{
					if( data.address.house_number !== undefined){
						var address = data.address.house_number + ' ' + data.address.road;
						app.search_placeholder = address;
						//alert(address);
					}

				},
				error: function(){ alert('Could Not Get Address of Center of Map (200)');}
			};

			$.ajax(request);
		}

		else{
			app.search_placeholder = latlon.lat + ', ' + latlon.lon;
			//alert(app.search_placeholder);
		}

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

function clear(){
	
	document.getElementById("overlay").parentNode.removeChild(document.getElementById("overlay"));
	
}
