function onChangeForDays(days){
	DomId_nextday = document.getElementById("nextDay");
	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+record_city+"&mode=json&units=metric&cnt="+days+"&appid=44db6a862fba0b067b1930da0d769e98";
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

function genCurrentCityHtml(xml,listIds,city_id){
	var xmlDomId_current = xml.getElementsByTagName("current")[0];
	var get_last_update_time = new Date(xmlDomId_current.childNodes[9].getAttributeNode("value").nodeValue);
	var get_sunrise_time = new Date(xmlDomId_current.childNodes[0].childNodes[2].getAttributeNode("rise").nodeValue);
	var get_sunrset_time = new Date(xmlDomId_current.childNodes[0].childNodes[2].getAttributeNode("set").nodeValue);
	var weather_icon = "i" + xmlDomId_current.childNodes[8].getAttributeNode("icon").nodeValue;
	$("#get_time").html(get_last_update_time.toLocaleString());
	$("#city_name").html(xmlDomId_current.childNodes[0].getAttributeNode("name").nodeValue + ", " + xml.getElementsByTagName("city")[0].childNodes[1].childNodes[0].nodeValue);
	$("#city_weather-img").addClass(weather_icon);
	$("#city_temp").html(xml.getElementById(city_id).nextSibling.getAttributeNode("value").nodeValue);
	$("#city_desciption").html(xmlDomId_current.childNodes[8].getAttributeNode("value").nodeValue);
	$("#city_cloud").html(xmlDomId_current.childNodes[5].getAttributeNode("name").nodeValue);
	$("#city_wind").html(xmlDomId_current.childNodes[4].childNodes[0].getAttributeNode("name").nodeValue + " " + 
								xmlDomId_current.childNodes[4].childNodes[0].getAttributeNode("value").nodeValue + " m/s" + "<br>" +
								xmlDomId_current.childNodes[4].childNodes[2].getAttributeNode("name").nodeValue + "(" +
								xmlDomId_current.childNodes[4].childNodes[2].getAttributeNode("value").nodeValue + ")");
	$("#city_pressure").html(xmlDomId_current.childNodes[3].getAttributeNode("value").nodeValue + " hpa");
	$("#city_humidity").html(xmlDomId_current.childNodes[2].getAttributeNode("value").nodeValue + "%");
	$("#city_sunrise").html(get_sunrise_time.getHours().toLocaleString() + ":" + get_sunrise_time.getMinutes().toLocaleString());
	$("#city_sunset").html(get_sunrset_time.getHours().toLocaleString() + ":" + get_sunrset_time.getMinutes().toLocaleString());
	$("#city_geocoords").html(xmlDomId_current.childNodes[0].childNodes[0].getAttributeNode("lon").nodeValue + ", " +
									 xmlDomId_current.childNodes[0].childNodes[0].getAttributeNode("lat").nodeValue);
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
var DomId_nextday;
function mainFunc(){
	var url_7days = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
	var url_current_city = "http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=44db6a862fba0b067b1930da0d769e98";
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var DomId_nextday = document.getElementById("nextDay");
	var city_id = 1668341;

	$("#container_currentCity").show();
	$("#container_nextday").hide();

	record_city = "taipei";

	$.getJSON(url_7days,function(result){
		console.log(result);
		DomId_nextday.innerHTML = "<h3>Next days</h3>";
		for (var j=0; j < 7; j++){
			// 7 days
			genNextDayHtml(result,month,j,DomId_nextday);
		}
		$.get(url_current_city,function(result){
			genCurrentCityHtml(result,0,city_id);
		});
	 });
}