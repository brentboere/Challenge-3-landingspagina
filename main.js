// init map
var myMap, preview;
var clicks = 0; 
var btnzoek = document.getElementById('btn-zoek');

document.getElementsByTagName('body').onload = getAPIdata();

function getClicks() {
    clicks += 1;
    console.log(clicks);
    return clicks;
}
function getLat() {
    var latitude = 0;
    var plaatsnaam = document.getElementById('plaatsnaam');
    var onderregel = document.getElementById('onderregel');
    var btnreload = document.getElementById('btn-reload');
    var plaats = document.getElementById('plaats')
    
    btnreload.style.visibility = "hidden";
    
    if (clicks == 0) {
        latitude = -21.173942;
        plaatsnaam.innerHTML = 'Locatie 1:';
        onderregel.innerHTML = '-21.173942 ; 44.983129';
        plaats.innerHTML = 'Ankoronadabo, Madagaskar';
    }
    else if (clicks == 1) {
        latitude = 52.063660;
        plaatsnaam.innerHTML = 'Locatie 2:';
        onderregel.innerHTML = '52.063660 ; 4.648046';
        plaats.innerHTML = 'Boskoop, Nederland';
    }
    else if (clicks == 2) {
        latitude = 18.774114;
        plaatsnaam.innerHTML = 'Locatie 3:';
        onderregel.innerHTML = '18.774114 ; 83.276246';
        plaats.innerHTML = 'Odisha, India';
    }
    else if (clicks == 3) {
        latitude = 67.861316;
        plaatsnaam.innerHTML = 'Locatie 4:';
        onderregel.innerHTML = '67.861316 ; 166.169169'; 
        plaats.innerHTML = 'Bilibinskiy rayon, Tsjoekotka, Rusland';
    }
    else if (clicks == 4) {
        latitude = -5.643074;
        plaatsnaam.innerHTML = 'Locatie 5:';
        onderregel.innerHTML = '-5.643074 ; -63.482504';
        plaats.innerHTML = 'Tapauá - Amazonas, 69480-000, Brazilië';
    }
    else if (clicks => 5) {
        latitude = 0;
        plaatsnaam.innerHTML = 'Dit waren alle opties om te landen.';
        onderregel.innerHTML = 'Klik op de knop om te herstarten.';
        plaats.innerHTML = '';
        btnreload.style.visibility = "visible";
    }
    return latitude;
}
function getLng() {
    var longitude = 0;

    if (clicks == 0){
        longitude = 44.983129;
    }
    else if (clicks == 1) {
        longitude = 4.648046;
    }
    else if (clicks == 2) {
        longitude = 83.276246;
    }
    else if (clicks == 3) {
        longitude = 166.169169;
    }
    else if (clicks == 4) {
        longitude = -63.482504;
    }
    else if (clicks == 5) {
        longitude = 0;
    }
    
    return longitude;
}
function initMap() {
	// set style for the map
	var myStyles =[
		 {
		 	featureType: "poi",
		 	elementType: "labels",
		 	stylers: [{ visibility: "off" }]
		 },
		 {
		 	featureType: 'transit',
		 	elementType: 'labels',
		 	stylers: [{visibility: 'off'}]
		 }
	];
	// set options for map 
	var mapOptions = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 3,
		clickableIcons: false,
		styles: myStyles,
        zoomControl: true,
		mapTypeControl: false,
		streetViewControl: false,
		scaleControl: false,
	};
    var mapOptions2 = {
		center: {
			lat: getLat(), 
			lng: getLng()
		},
		zoom: 3,
		clickableIcons: false,
		styles: myStyles,
        draggable: false,
        scrollwheel: false,
        disableDefaultUI: true,
        mapTypeId: 'satellite'
	};
	// create map and add to page
	myMap = new google.maps.Map(document.getElementById('maps'), mapOptions);
    
    preview = new google.maps.Map(document.getElementById('preview'), mapOptions2);
    
    var locatieMarker = new google.maps.Marker({
		position: {
			lat: getLat(), 
			lng: getLng(),
		},
		map: myMap,
		title: 'Landingsplek'
	});
	
}

//      ---------------------- Weer ----------------------

function getAPIdata() {
	var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
    var lat = getLat();
    var lon = getLng();
	var apiKey ='b1f538a469a6b6f9fd103cda1db6e9ef';
    
	// construct request
	var request = url + lat + '&lon=' + lon + '&appid=' + apiKey;
	// get weather forecast
	fetch(request)
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		onAPISucces(response);
	})
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}
function clearData() {
   document.getElementById('weerbericht').innerHTML = '';
'';
}
function onAPISucces(response) {
	var weatherList = response.daily;
	var weatherBox = document.getElementById('weerbericht');
    var temp = Math.floor(weatherList[1].temp.day - 273.15);
    var clouds = weatherList[1].clouds;
    var weeradvies = document.getElementById('weeradvies');
    var weeradvies2 = document.getElementById('weeradvies2');
    var conclusie = document.getElementById('conclusie');
    
    if (temp > 4) {
        weeradvies.innerHTML = 'Het is een goede temperatuur om te landen.'; 
    }
    else {
        weeradvies.innerHTML = 'Het is erg koud hier.'
    }
    
    if (clouds > 50){
        weeradvies2.innerHTML = 'Er zijn ' + clouds + '% ' + 'wolken in de lucht, waardoor de landingsplek niet optimaal te zien is.';
    }
    else {
        weeradvies2.innerHTML = 'Er zijn ' + clouds + '% ' + 'wolken in de lucht, waardoor de landingsplek goed te zien is!'; 
    }
    
    if (temp > 4) {
        if (clouds < 50){
            conclusie.innerHTML = 'Dit is momenteel een goede landingsplek!';
            conclusie.style.color = "#008000";
        }
        else {
            conclusie.innerHTML = 'Dit is momenteel een goede landingsplek!';
            conclusie.style.color = "#008000";
        }
    }
    else {
        if (clouds < 50) {
            conclusie.innerHTML = 'Dit is momenteel een goede landingsplek!';
            conclusie.style.color = "#008000";
        }
        else {
            conclusie.innerHTML = 'Dit is momenteel geen geschikte landingsplek.';
            conclusie.style.color = "#ff0000";
        }
    }
        
	for(var i=0; i< weatherList.length; i++){
		var dateTime = new Date(weatherList[i].dt*1000);
		var date = formDate(dateTime);
        var cloud = weatherList[i].clouds;
		var temp = Math.floor(weatherList[i].temp.day - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
        forecastMessage +=	 '<div class="cloud"> '+cloud+'&#37; wolken </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';

		weatherBox.innerHTML += forecastMessage;
	}
}
function updateUIError() {
	var weatherBox = document.getElementById('weerbericht');
	weatherBox.className = 'hidden'; 
}
function formDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	return day +'/'+ month;
}