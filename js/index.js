/**********전역 설정***********/ 
var API_CITY = "../json/city.json";
var API_WORLD = "../json/world.json";
var API_DAILY = "https://api.openweathermap.org/data/2.5/weather"; 
var API_WEEKLY = "https://api.openweathermap.org/data/2.5/onecall";
var API_KEY = "cd47a4d51d9109b2f5dbb40c33b27a60";
var API_UNIT = "metric";
var ICON_URL = "http://openweathermap.org/img/wn/";
var ICON_EXT = "@2x.png";

var DAILY_DATA = {
	appid: API_KEY,
	units: API_UNIT
}


/**********사용자 함수********** */ 




/**********이벤트 콜백********** */ 
function onCity(r){
	var html;
	for(var i in r.cities){
		html = '<option vlaue="'+r.cities[i].id+'">'+r.cities[i].name+'</option>';
		$("#city").append(html);
	}
}

function onWorld(r){
	r.cities.forEach(function(v , i){
		var data = {};
		data.appid = API_KEY,
		data.units = API_UNIT,
		data.id = v.id;
		$.get(API_DAILY,data,onWorldWeather);
	});
}

function onWorldWeather(r){
	console.log(r);
	 
var html = '<div class="city">';
html += '<div class="title">'+r.name+', '+r.sys.country+'</div>';
html += '<div class="icon">';
html += '<img src="'+ICON_URL+r.weather[0].icon+ICON_EXT+'">';
html += '</div>';
html += '<div class="temp">';
html += '<span>'+r.main.temp+'</span>℃';
html += '</div>';
html += '<div class="desc">';
html += '<span>'+r.weather[0].main+'</span>';
html += '<span>'+r.weather[0].description+'</span>';
html += '</div>';
html += '</div>';
$(".world-wrap").append(html);
}


function onPosition(pos) {
	DAILY_DATA.lat = pos.coords.latitude;
	DAILY_DATA.lon = pos.coords.longitude;
	$.get(API_DAILY,DAILY_DATA,onDaily);
}


function onDaily(r){
	console.log(r);
	$(".daily-icon").attr("src", ICON_URL + r.weather[0].icon + ICON_EXT);
	$(".daily-city").html(r.name + ', ' + r.sys.country);
	$(".daily-temp").html(r.main.temp);
	$(".daily-desc").html(r.weather[0].main);
	$(".daily-desc2").html(r.weather[0].description);
}

/**********이벤트 설정**********/ 
$.get(API_CITY,onCity);
$.get(API_WORLD, onWorld)
navigator.geolocation.getCurrentPosition(onPosition);