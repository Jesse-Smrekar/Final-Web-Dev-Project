//NODE COMMAND: static-server -p 8001

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
	{"hood": "Capitol River", "lat": 44.948767, "lon": -93.092090, "crimes": 0}
];

neighbor_num = [
"Conway/Battle Creek/Highwood",
"Greater Eastside",
"Westside",
"Daytons Bluff",
"Payne-Phalen",
"North End",
"Frogtown",
"Summit-University",
"West Seventh",
"Como",
"Midway",
"St. Anthony",
"Union Park",
"Macalester-Groveland",
"Highland Park",
"Summit Hill",
];

var color_list = {
  "110": {'style':"background-color:red; color: white;", 'type': 'Violent'},
  "120": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "210": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "220": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "300": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "311": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "312": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "313": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "314": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "321": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "322": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "323": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "324": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "331": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "333": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "334": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "341": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "342": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "343": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "344": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "351": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "352": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "353": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "354": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "361": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "363": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "364": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "371": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "372": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "373": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "374": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "400": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "410": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "411": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "412": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "420": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "421": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "422": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "430": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "431": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "432": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "440": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "441": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "442": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "450": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "451": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "452": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "453": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "500": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "510": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "511": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "513": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "515": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "516": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "520": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "521": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "523": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "525": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "526": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "530": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "531": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "533": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "535": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "536": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "540": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "541": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "543": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "545": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "546": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "550": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "551": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "553": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "555": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "556": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "560": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "561": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "563": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "565": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "566": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "600": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "603": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "611": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "612": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "613": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "614": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "621": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "622": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "623": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "630": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "631": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "632": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "633": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "640": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "641": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "642": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "643": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "651": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "652": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "653": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "661": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "662": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "663": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "671": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "672": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "673": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "681": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "682": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "683": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "691": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "692": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "693": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "700": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "710": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "711": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "712": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "720": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "721": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "722": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "810": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "861": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "862": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "863": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "900": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "901": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "903": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "905": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "911": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "913": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "915": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "921": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "923": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "931": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "933": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "941": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "942": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "951": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "961": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "971": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "972": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "981": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "982": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1400": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1401": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1410": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1415": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1416": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1420": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1425": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1426": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1430": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1435": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1436": {'style':"background-color:purple; color:white;", 'type' : 'Property'},
  "1800": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1810": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1811": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1812": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1813": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1814": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1815": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1820": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1822": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1823": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1824": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1825": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1830": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1835": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1840": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1841": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1842": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1843": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1845": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1850": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1855": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1865": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1870": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1880": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "1885": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "2619": {'style':"background-color:red; color: white;", 'type' : 'Violent'},
  "9954": {'style':"background-color:blue; color:white;", 'type' : 'Other'},
  "9959": {'style':"background-color:blue; color:white;", 'type' : 'Other'}
};

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
			incident: {},
			neighborhoods: neighborhoods,
			map: mymap,
			crime: 0,
			rows: {},
			hood_filter: [],
			crime_filter: [],
			start_date: '2019-10-01',
			end_date: '2019-10-31',
			start_time: '00:00:0000',
			end_time:'24:59:9999',
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
							//	div.style.fontColor = "white";
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

function LocationSearch(event){



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
		var marker = L.marker([data[0].lat, data[0].lon], {icon: redIcon});
		var tooltip = L.tooltip({
			direction: 'top',
			permanent: false,
			interactive: true,
			opacity: 0.9,
		});
		tooltip.setContent( app.incident.date +', '+app.incident.time +'\n '+app.incident.incident+' -Click to delete!');
		tooltip.setLatLng(new L.LatLng(data[0].lat, data[0].lon));
		tooltip.on('mouseover', function(event) {
			alert("PENIS!");
		});
		marker.on('click', ()=>{ map.removeLayer(marker);} );
		marker.bindTooltip(tooltip).addTo(mymap);


		//L.marker([data[0].lat, data[0].lon], {icon: redIcon}).bindTooltip(app.location_search, { permanent: false, direction: 'top'}).addTo(mymap);
		//L.marker([data[0].lat, data[0].lon], {icon: redIcon}).bindTooltip(app.location_search, { permanent: false, direction: 'top'}).addTo(mymap);
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

	mymap = L.map('map').setView([44.954179, -93.091797], 13);

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


function filter(data){
	var result = 'http://cisc-dean.stthomas.edu:8002/incidents?format=json&start_date='+app.start_date+'&end_date=' + app.end_date;

	if(app.hood_filter.length){
		result = result + '&id=';
		let hoods = '';
		app.hood_filter.forEach( hood=>{
				neighborhoods.forEach( obj=>{
						if(hood == obj.hood){
							hoods = hoods + (neighborhoods.indexOf(obj)+ 1) + ',';
						}
				});

		});
		hoods = hoods.substring(0, hoods.length - 1);
		result = result + hoods;
		alert(result);
	}

	if(app.crime_filter.length){
		result = result + '&code=';
		let codes = '';
		app.crime_filter.forEach( type=>{

			if(type == 0){
				for(var violent in color_list){
					if(color_list[violent].type == 'Violent'){
						codes = codes + violent + ',';
					}
				}
			}

			if(type == 1){
				for(var property in color_list){
					if(color_list[property].type == 'Property'){
						codes = codes + property + ',';
					}
				}
			}

			if(type == 2){
				for(var other in color_list){
					if(color_list[other].type == 'Other'){
						codes = codes + other + ',';
					}
				}
			}
		});

		codes = codes.substring(0, codes.length - 1);
		result = result + codes;
	}


	let request = {
			url: result,
			headers: { "Accept": "application/json"},
			//url: API_URL + '/incidents?format=json',//"https://cisc-dean.stthomas.edu:" + port,
			dataType: "json",
			success: function(data){
				app.rows = data;
			},
			error: ()=>{ alert('Could Not Get St.Paul Crime Data');}
	};

	$.ajax(request);



/**
	alert(app.hood_filter);
	alert(app.crime_filter);
	alert(app.start_date +' ' + app.end_date);
	alert(app.start_time +' ' + app.end_time);
**/
}
