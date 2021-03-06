function onChangeForDays(days){
	DomId_nextday = document.getElementById("nextDay");
	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	switch (days){
		case '5':
		default:
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+record_city+"&mode=json&units=metric&cnt=5&appid=44db6a862fba0b067b1930da0d769e98";
			n = 5;
			break;
		case '6':
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+record_city+"&mode=json&units=metric&cnt=6&appid=44db6a862fba0b067b1930da0d769e98";
			n = 6;
			break;
		case '7':
			url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+record_city+"&mode=json&units=metric&cnt=7&appid=44db6a862fba0b067b1930da0d769e98";
			n = 7;
			break;
	}
	xHR(url,"GET","json",function(json_obj){
		DomId_nextday.innerHTML = "<h3>Next days</h3>";
		for (var j=0; j < n; j++){
			genNextDayHtml(json_obj,month,j,DomId_nextday);
		}
	});
}

function onChangeForCity(city){
	city_name = "Taipei, TW";
	DomId_nextday = document.getElementById("nextDay");
	DomId_get_time = document.getElementById("get_time");
	DomId_city_name = document.getElementById("city_name");
	DomId_city_weather_img = document.getElementById("city_weather-img");
	DomId_city_temp = document.getElementById("city_temp");
	DomId_city_desciption = document.getElementById("city_desciption");
	DomId_city_cloud = document.getElementById("city_cloud");
	DomId_city_wind= document.getElementById("city_wind");
	DomId_city_pressure = document.getElementById("city_pressure");
	DomId_city_humidity = document.getElementById("city_humidity");
	DomId_city_sunrise = document.getElementById("city_sunrise");
	DomId_city_sunset = document.getElementById("city_sunset");
	DomId_city_geocoords = document.getElementById("city_geocoords");
	switch (city){
		case 'taipei':
		default:
			url = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=44db6a862fba0b067b1930da0d769e98";
			id = 1668341;
			record_city = "taipei";
			break;
		case 'newyork':
			url = "http://api.openweathermap.org/data/2.5/weather?q=Newyork,us&mode=xml&units=metric&appid=44db6a862fba0b067b1930da0d769e98";
			id = 5128581;
			record_city = "newyork";
			break;
		case 'london':
			url = "http://api.openweathermap.org/data/2.5/weather?q=london,uk&mode=xml&units=metric&appid=44db6a862fba0b067b1930da0d769e98";
			id = 2643743;
			record_city = "london";
			break;
	}
	xHR(url,"GET","xml",function(xml_obj){
		genCurrentCityHtml(xml_obj,0,id,DomId_get_time,DomId_city_name,DomId_city_weather_img,DomId_city_temp,DomId_city_desciption,DomId_city_cloud,DomId_city_wind,
			DomId_city_pressure,DomId_city_humidity,DomId_city_sunrise,DomId_city_sunset,DomId_city_geocoords);
	});
}

function currentCity(){
	var tab_currentCity = document.getElementById("tab_currentCity");
	var tab_nextDay = document.getElementById("tab_nextDay");
	tab_currentCity.className = "tab-focus";
	tab_nextDay.className = "tab";
	document.getElementById("container_currentCity").className = "show";
	document.getElementById("container_nextday").className = "hide";
}

function nextDay(){
	var tab_nextDay = document.getElementById("tab_nextDay");
	var tab_currentCity = document.getElementById("tab_currentCity");
	tab_nextDay.className = "tab-focus";
	tab_currentCity.className = "tab";
	document.getElementById("container_nextday").className = "show";
	document.getElementById("container_currentCity").className = "hide";
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

function genCurrentCityHtml(xml,listIds,city_id,DomId_get_time,DomId_city_name,DomId_city_weather_img,DomId_city_temp,DomId_city_desciption,DomId_city_cloud,DomId_city_wind,
							DomId_city_pressure,DomId_city_humidity,DomId_city_sunrise,DomId_city_sunset,DomId_city_geocoords){
	var xmlDomId_current = xml.getElementsByTagName("current")[0];
	var get_last_update_time = new Date(xmlDomId_current.childNodes[9].getAttributeNode("value").nodeValue);
	var get_sunrise_time = new Date(xmlDomId_current.childNodes[0].childNodes[2].getAttributeNode("rise").nodeValue);
	var get_sunrset_time = new Date(xmlDomId_current.childNodes[0].childNodes[2].getAttributeNode("set").nodeValue);
	var weather_icon = "i" + xmlDomId_current.childNodes[8].getAttributeNode("icon").nodeValue;

	DomId_get_time.innerHTML = get_last_update_time.toLocaleString();
	DomId_city_name.innerHTML = xmlDomId_current.childNodes[0].getAttributeNode("name").nodeValue + ", " + xml.getElementsByTagName("city")[0].childNodes[1].childNodes[0].nodeValue;
	DomId_city_weather_img.classList.add(weather_icon);
	DomId_city_temp.innerHTML = xml.getElementById(city_id).nextSibling.getAttributeNode("value").nodeValue;
	DomId_city_desciption.innerHTML = xmlDomId_current.childNodes[8].getAttributeNode("value").nodeValue;
	DomId_city_cloud.innerHTML = xmlDomId_current.childNodes[5].getAttributeNode("name").nodeValue;
	DomId_city_wind.innerHTML = xmlDomId_current.childNodes[4].childNodes[0].getAttributeNode("name").nodeValue + " " + 
								xmlDomId_current.childNodes[4].childNodes[0].getAttributeNode("value").nodeValue + " m/s" + "<br>" +
								xmlDomId_current.childNodes[4].childNodes[2].getAttributeNode("name").nodeValue + "(" +
								xmlDomId_current.childNodes[4].childNodes[2].getAttributeNode("value").nodeValue + ")";
	DomId_city_pressure.innerHTML = xmlDomId_current.childNodes[3].getAttributeNode("value").nodeValue + " hpa";
	DomId_city_humidity.innerHTML = xmlDomId_current.childNodes[2].getAttributeNode("value").nodeValue + "%";
	DomId_city_sunrise.innerHTML = get_sunrise_time.getHours().toLocaleString() + ":" + get_sunrise_time.getMinutes().toLocaleString();
	DomId_city_sunset.innerHTML = get_sunrset_time.getHours().toLocaleString() + ":" + get_sunrset_time.getMinutes().toLocaleString();
	DomId_city_geocoords.innerHTML = xmlDomId_current.childNodes[0].childNodes[0].getAttributeNode("lon").nodeValue + ", " +
									 xmlDomId_current.childNodes[0].childNodes[0].getAttributeNode("lat").nodeValue;
}

function xHR(url,method,format,callback) {
	var httpXmlRequest = new XMLHttpRequest();
	httpXmlRequest.open(method,url,true);
	httpXmlRequest.send(null);
		httpXmlRequest.onreadystatechange = function() {
			if(httpXmlRequest.readyState == 4 && httpXmlRequest.status == 200){
				if(format == "json"){
					format_obj = JSON.parse(httpXmlRequest.responseText);
				}else{
					format_obj = httpXmlRequest.responseXML;
				}
				callback(format_obj);
			}
		}
}


// global
var record_city;

function mainFunc(){
	var url_7days = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
	var url_current_city = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=44db6a862fba0b067b1930da0d769e98";
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var DomId_nextday = document.getElementById("nextDay");
	var DomId_get_time = document.getElementById("get_time");
	var DomId_city_name = document.getElementById("city_name");
	var DomId_city_weather_img = document.getElementById("city_weather-img");
	var DomId_city_temp = document.getElementById("city_temp");
	var DomId_city_desciption = document.getElementById("city_desciption");
	var DomId_city_cloud = document.getElementById("city_cloud");
	var DomId_city_wind= document.getElementById("city_wind");
	var DomId_city_pressure = document.getElementById("city_pressure");
	var DomId_city_humidity = document.getElementById("city_humidity");
	var DomId_city_sunrise = document.getElementById("city_sunrise");
	var DomId_city_sunset = document.getElementById("city_sunset");
	var DomId_city_geocoords = document.getElementById("city_geocoords");
	var city_id = 1668341;

	record_city = "taipei";
	xHR(url_current_city,"GET","xml",function(xml_obj){
		genCurrentCityHtml(xml_obj,0,city_id,DomId_get_time,DomId_city_name,DomId_city_weather_img,DomId_city_temp,DomId_city_desciption,DomId_city_cloud,DomId_city_wind,
			DomId_city_pressure,DomId_city_humidity,DomId_city_sunrise,DomId_city_sunset,DomId_city_geocoords);
		xHR(url_7days,"GET","json",function(json_obj){
			// Add next day title for next day block
			DomId_nextday.innerHTML = "<h3>Next days</h3>";
			for (var j=0; j < 7; j++){
				// 7 days
				genNextDayHtml(json_obj,month,j,DomId_nextday);
			}
		});
	});
}