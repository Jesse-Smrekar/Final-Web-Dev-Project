var app;
var mymap;
var auth_data = {};
var API_URL;

//NODE COMMAND: static-server -p 8001

function Init(crime_api_url) {

	console.log(crime_api_url);
	  API_URL = crime_api_url;

    app = new Vue({
        el: "#app",
        data: {
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

		mymap = L.map('map').setView([44.954179, -93.091797], 2);

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


/* Neighborhoods




Highland Park: 44.912641, -93.177235
Macalenser-Groveland: 44.934347, -93.173582
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
