function onChangeForDays(days){
	DomId_nextday = document.getElementById("nextDay");
	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+record_city+"&mode=json&units=metric&cnt="+days+"&appid=5df396cf7b4d7b339bc250ebfd041f2e";
	$.getJSON(url,function(result){
		DomId_nextday.innerHTML = "<h3>Next days</h3>";
		for (var j=0; j < days; j++){
			// 7 days
			genNextDayHtml(result,month,j,DomId_nextday);
		}
	 });
}

function onChangeForCity(city){
	switch (city){
		case 'taipei':
		default:
			url = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e";
			id = 1668341;
			record_city = city;
			break;
		case 'newyork':
			url = "http://api.openweathermap.org/data/2.5/weather?q=Newyork,us&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e";
			id = 5128581;
			record_city = city;
			break;
		case 'london':
			url = "http://api.openweathermap.org/data/2.5/weather?q=london,uk&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e";
			id = 2643743;
			record_city = city;
			break;
	}
	$.get(url,function(result){
		genCurrentCityHtml(result,0,id);
	});
}

function currentCity(){
	var tab_currentCity = document.getElementById("tab_currentCity");
	var tab_nextDay = document.getElementById("tab_nextDay");
	tab_currentCity.className = "tab-focus";
	tab_nextDay.className = "tab";
	$("#container_currentCity").show();
	$("#container_nextday").hide();
}

function nextDay(){
	var tab_nextDay = document.getElementById("tab_nextDay");
	var tab_currentCity = document.getElementById("tab_currentCity");
	tab_nextDay.className = "tab-focus";
	tab_currentCity.className = "tab";
	$("#container_nextday").show();
	$("#container_currentCity").hide();
}

function genNextDayHtml(json,month,listIds,DomId_nextday){
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
	DomId_nextday.innerHTML += tempHtml;
}

function genCurrentCityHtml(xml){
	$("#get_time").html(new Date(xml.getElementsByTagName("lastupdate")[0].getAttributeNode("value").nodeValue).toLocaleString());
	$("#city_name").html(xml.getElementsByTagName("city")[0].getAttributeNode("name").nodeValue+", "+
						 xml.getElementsByTagName("country")[0].childNodes[0].nodeValue);
	$("#city_weather-img").addClass("i"+xml.getElementsByTagName("weather")[0].getAttributeNode("icon").nodeValue);
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
var record_city;

function mainFunc(){
	var url_7days = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=5df396cf7b4d7b339bc250ebfd041f2e";
	var url_current_city = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e";
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// var DomId_nextday = document.getElementById("nextDay");

	$("#container_currentCity").show();
	$("#container_nextday").hide();

	// record_city = "taipei";

	$.get(url_current_city,function(result){
		genCurrentCityHtml(result);
	});

	// 這是取得Days API
	// $.getJSON(url_7days,function(result){
	// 	DomId_nextday.innerHTML = "<h3>Next days</h3>";
	// 	for (var j=0; j < 7; j++){
	// 		// 7 days
	// 		genNextDayHtml(result,month,j,DomId_nextday);
	// 	}

	//  });
}