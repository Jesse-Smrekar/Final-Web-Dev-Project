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
];

var color_list = {
  "110": "background-color:red; color: white;", ////////
  "120": "background-color:red; color: white;", ////////
  "210": "background-color:red; color: white;", ////////
  "220": "background-color:red; color: white;", ////////
  "300": "background-color:purple; color:white;",
  "311": "background-color:purple; color:white;",
  "312": "background-color:purple; color:white;",
  "313": "background-color:purple; color:white;",
  "314": "background-color:purple; color:white;",
  "321": "background-color:purple; color:white;",
  "322": "background-color:purple; color:white;",
  "323": "background-color:purple; color:white;",
  "324": "background-color:purple; color:white;",
  "331": "background-color:purple; color:white;",
  "333": "background-color:purple; color:white;",
  "334": "background-color:purple; color:white;",
  "341": "background-color:purple; color:white;",
  "342": "background-color:purple; color:white;",
  "343": "background-color:purple; color:white;",
  "344": "background-color:purple; color:white;",
  "351": "background-color:purple; color:white;",
  "352": "background-color:purple; color:white;",
  "353": "background-color:purple; color:white;",
  "354": "background-color:purple; color:white;",
  "361": "background-color:purple; color:white;",
  "363": "background-color:purple; color:white;",
  "364": "background-color:purple; color:white;",
  "371": "background-color:purple; color:white;",
  "372": "background-color:purple; color:white;",
  "373": "background-color:purple; color:white;",
  "374": "background-color:purple; color:white;",
  "400": "background-color:red; color: white;", ////////
  "410": "background-color:red; color: white;", ////////
  "411": "background-color:red; color: white;", ////////
  "412": "background-color:red; color: white;", ////////
  "420": "background-color:red; color: white;", ////////
  "421": "background-color:red; color: white;", ////////
  "422": "background-color:red; color: white;", ////////
  "430": "background-color:red; color: white;", ////////
  "431": "background-color:red; color: white;", ////////
  "432": "background-color:red; color: white;", ////////
  "440": "background-color:red; color: white;", ////////
  "441": "background-color:red; color: white;", ////////
  "442": "background-color:red; color: white;", ////////
  "450": "background-color:red; color: white;", ////////
  "451": "background-color:red; color: white;", ////////
  "452": "background-color:red; color: white;", ////////
  "453": "background-color:red; color: white;", ////////
  "500": "background-color:purple; color:white;",
  "510": "background-color:purple; color:white;",
  "511": "background-color:purple; color:white;",
  "513": "background-color:purple; color:white;",
  "515": "background-color:purple; color:white;",
  "516": "background-color:purple; color:white;",
  "520": "background-color:purple; color:white;",
  "521": "background-color:purple; color:white;",
  "523": "background-color:purple; color:white;",
  "525": "background-color:purple; color:white;",
  "526": "background-color:purple; color:white;",
  "530": "background-color:purple; color:white;",
  "531": "background-color:purple; color:white;",
  "533": "background-color:purple; color:white;",
  "535": "background-color:purple; color:white;",
  "536": "background-color:purple; color:white;",
  "540": "background-color:purple; color:white;",
  "541": "background-color:purple; color:white;",
  "543": "background-color:purple; color:white;",
  "545": "background-color:purple; color:white;",
  "546": "background-color:purple; color:white;",
  "550": "background-color:purple; color:white;",
  "551": "background-color:purple; color:white;",
  "553": "background-color:purple; color:white;",
  "555": "background-color:purple; color:white;",
  "556": "background-color:purple; color:white;",
  "560": "background-color:purple; color:white;",
  "561": "background-color:purple; color:white;",
  "563": "background-color:purple; color:white;",
  "565": "background-color:purple; color:white;",
  "566": "background-color:purple; color:white;",
  "600": "background-color:purple; color:white;",
  "603": "background-color:purple; color:white;",
  "611": "background-color:purple; color:white;",
  "612": "background-color:purple; color:white;",
  "613": "background-color:purple; color:white;",
  "614": "background-color:purple; color:white;",
  "621": "background-color:purple; color:white;",
  "622": "background-color:purple; color:white;",
  "623": "background-color:purple; color:white;",
  "630": "background-color:purple; color:white;",
  "631": "background-color:purple; color:white;",
  "632": "background-color:purple; color:white;",
  "633": "background-color:purple; color:white;",
  "640": "background-color:purple; color:white;",
  "641": "background-color:purple; color:white;",
  "642": "background-color:purple; color:white;",
  "643": "background-color:purple; color:white;",
  "651": "background-color:purple; color:white;",
  "652": "background-color:purple; color:white;",
  "653": "background-color:purple; color:white;",
  "661": "background-color:purple; color:white;",
  "662": "background-color:purple; color:white;",
  "663": "background-color:purple; color:white;",
  "671": "background-color:purple; color:white;",
  "672": "background-color:purple; color:white;",
  "673": "background-color:purple; color:white;",
  "681": "background-color:purple; color:white;",
  "682": "background-color:purple; color:white;",
  "683": "background-color:purple; color:white;",
  "691": "background-color:purple; color:white;",
  "692": "background-color:purple; color:white;",
  "693": "background-color:purple; color:white;",
  "700": "background-color:purple; color:white;",
  "710": "background-color:purple; color:white;",
  "711": "background-color:purple; color:white;",
  "712": "background-color:purple; color:white;",
  "720": "background-color:purple; color:white;",
  "721": "background-color:purple; color:white;",
  "722": "background-color:purple; color:white;",
  "810": "background-color:red; color: white;", ////////
  "861": "background-color:red; color: white;", ////////
  "862": "background-color:red; color: white;", ////////
  "863": "background-color:red; color: white;", ////////
  "900": "background-color:purple; color:white;",
  "901": "background-color:red; color: white;", ////////
  "903": "background-color:purple; color:white;",
  "905": "background-color:purple; color:white;",
  "911": "background-color:red; color: white;", ////////
  "913": "background-color:purple; color:white;",
  "915": "background-color:purple; color:white;",
  "921": "background-color:purple; color:white;",
  "923": "background-color:purple; color:white;",
  "931": "background-color:purple; color:white;",
  "933": "background-color:purple; color:white;",
  "941": "background-color:purple; color:white;",
  "942": "background-color:purple; color:white;",
  "951": "background-color:purple; color:white;",
  "961": "background-color:purple; color:white;",
  "971": "background-color:purple; color:white;",
  "972": "background-color:purple; color:white;",
  "981": "background-color:purple; color:white;",
  "982": "background-color:purple; color:white;",
  "1400": "background-color:purple; color:white;",
  "1401": "background-color:purple; color:white;",
  "1410": "background-color:purple; color:white;",
  "1415": "background-color:purple; color:white;",
  "1416": "background-color:purple; color:white;",
  "1420": "background-color:purple; color:white;",
  "1425": "background-color:purple; color:white;",
  "1426": "background-color:purple; color:white;",
  "1430": "background-color:purple; color:white;",
  "1435": "background-color:purple; color:white;",
  "1436": "background-color:purple; color:white;",
  "1800": "background-color:blue; color:white;",
  "1810": "background-color:blue; color:white;",
  "1811": "background-color:blue; color:white;",
  "1812": "background-color:blue; color:white;",
  "1813": "background-color:blue; color:white;",
  "1814": "background-color:blue; color:white;",
  "1815": "background-color:blue; color:white;",
  "1820": "background-color:blue; color:white;",
  "1822": "background-color:blue; color:white;",
  "1823": "background-color:blue; color:white;",
  "1824": "background-color:blue; color:white;",
  "1825": "background-color:blue; color:white;",
  "1830": "background-color:blue; color:white;",
  "1835": "background-color:blue; color:white;",
  "1840": "background-color:blue; color:white;",
  "1841": "background-color:blue; color:white;",
  "1842": "background-color:blue; color:white;",
  "1843": "background-color:blue; color:white;",
  "1845": "background-color:blue; color:white;",
  "1850": "background-color:blue; color:white;",
  "1855": "background-color:blue; color:white;",
  "1865": "background-color:blue; color:white;",
  "1870": "background-color:blue; color:white;",
  "1880": "background-color:blue; color:white;",
  "1885": "background-color:blue; color:white;",
  "2619": "background-color:red; color: white;", ////////
  "9954": "background-color:blue; color:white;",
  "9959": "background-color:blue; color:white;"
};











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
			colors: color_list,
			neighborhoods: neighborhoods,
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
				curr_incident: '',
				buttons: {
						"Ok": function() {
								var prompt_input = $("#prompt_input");
								Init(prompt_input.val());
								$(this).dialog("close");
								var div = document.getElementById("overlay");
								div.style.fontcolor = "white";
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
