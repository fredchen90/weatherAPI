function onChangeForDays(days){
	var domId_nextday = document.getElementById("nextDay");
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+RECORD_CITY+"&mode=json&units=metric&cnt="+days+"&appid=5df396cf7b4d7b339bc250ebfd041f2e";
	$.getJSON(url,function(result){
		domId_nextday.innerHTML = "";
		for (var j=0; j < days; j++){
			genNextDayHtml(result,month,j,domId_nextday);
		}
	 });
}

function onChangeForCity(city){
	var map = {
		'taipei,tw' : 1668341,
		'newyork,us' : 5128581,
		'london,uk' : 2643743
	}
	var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e"
	RECORD_CITY = city;
	$.get(url,function(result){
		genCurrentCityHtml(result,0,map[city]);
	});
}

function tabChange(focus,unfocus){
	var tab_focus = document.getElementById(focus);
	var tab = document.getElementById(unfocus);
	tab_focus.className = "tab-focus";
	tab.className = "tab";
	if(focus === "tab_currentCity"){
		$("#container_currentCity").show();
		$("#container_nextday").hide();		
	}else{
		$("#container_nextday").show();
		$("#container_currentCity").hide();		
	}
}

function genNextDayHtml(json,month,listIds,domId_nextday){
	var json_obj = json;
	var getDate_1 = new Date((json_obj.list[listIds].dt)*1000).getDate();
	var getMonth_1 = new Date((json_obj.list[listIds].dt)*1000).getMonth();

	var weather_icon = "i" + json_obj.list[listIds].weather[0].icon;
	var tempHtml = "<div>" + "<hr><div  class='date-weather-block '><span class='date'>" + getDate_1 + " " + month[getMonth_1]+ "</span>" + 
				"<span class='icon "+weather_icon+"'></span>" + "</div>" + 
				"<div class='desciption'><span class='label label-warning icon-box'>" + json_obj.list[listIds].temp.min + "</span>" + 
				"<span class='label label-default icon-box'>" + json_obj.list[listIds].temp.max + "</span>" + 
				"<i>" + json_obj.list[listIds].weather[0].description + "</i>" +
				"<p><span style='display:block;'>" + json_obj.list[listIds].speed + "m/s" + "</span>" + 
				"<span style='display:inline-block;'>" + "clouds: " + json_obj.list[listIds].clouds + "%, " +"</span>"+
				"<span style='display:inline-block;'>" + json_obj.list[listIds].pressure + " hpa" + "</span></p></div>" + "</div>";
	domId_nextday.innerHTML += tempHtml;
}

function genCurrentCityHtml(xml){
	var img_class = "i"+xml.getElementsByTagName("weather")[0].getAttributeNode("icon").nodeValue;
	// remove img class
	$("#city_weather-img").removeClass();

	// add value
	$("#get_time").html(new Date(xml.getElementsByTagName("lastupdate")[0].getAttributeNode("value").nodeValue).toLocaleString());
	$("#city_name").html(xml.getElementsByTagName("city")[0].getAttributeNode("name").nodeValue+", "+
						 xml.getElementsByTagName("country")[0].childNodes[0].nodeValue);
	$("#city_weather-img").addClass(img_class+" city-icon");
	$("#city_temp").html(xml.getElementsByTagName("temperature")[0].getAttributeNode("value").nodeValue);
	$("#city_desciption").html(xml.getElementsByTagName("weather")[0].getAttributeNode("value").nodeValue);
	$("#city_cloud").html(xml.getElementsByTagName("clouds")[0].getAttributeNode("name").nodeValue);
	$("#city_wind").html(xml.getElementsByTagName("speed")[0].getAttributeNode("name").nodeValue+" "+
						 xml.getElementsByTagName("speed")[0].getAttributeNode("value").nodeValue+" m/s" + "<br>"+
						 xml.getElementsByTagName("direction")[0].getAttributeNode("name").nodeValue+"("+
						 xml.getElementsByTagName("direction")[0].getAttributeNode("value").nodeValue+")");
	$("#city_pressure").html(xml.getElementsByTagName("pressure")[0].getAttributeNode("value").nodeValue+" hpa");
	$("#city_humidity").html(xml.getElementsByTagName("humidity")[0].getAttributeNode("value").nodeValue+" %");
	$("#city_sunrise").html(new Date(xml.getElementsByTagName("sun")[0].getAttributeNode("rise").nodeValue).toLocaleString());
	$("#city_sunset").html(new Date(xml.getElementsByTagName("sun")[0].getAttributeNode("set").nodeValue).toLocaleString());
	$("#city_geocoords").html("["+xml.getElementsByTagName("coord")[0].getAttributeNode("lon").nodeValue+", "+
							  xml.getElementsByTagName("coord")[0].getAttributeNode("lat").nodeValue+"]");
	// $("#city_sunrise").html(get_sunrise_time.getHours().toLocaleString() + ":" + get_sunrise_time.getMinutes().toLocaleString());
	// $("#city_sunset").html(get_sunrset_time.getHours().toLocaleString() + ":" + get_sunrset_time.getMinutes().toLocaleString());

}

// global
var RECORD_CITY;

function mainFunc(){
	var url_7days = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=5df396cf7b4d7b339bc250ebfd041f2e";
	var url_current_city = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e";

	$("#container_currentCity").show();
	$("#container_nextday").hide();

	RECORD_CITY = "taipei";

	$.get(url_current_city,function(result){
		genCurrentCityHtml(result);
	});

	onChangeForDays(5);
}