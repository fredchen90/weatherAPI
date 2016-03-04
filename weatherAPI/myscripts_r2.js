function genHtml(json,listIds,dateId,weatherId1,weatherId2,desciption,speed,clouds,pressure){
	var json_obj = json;
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var getDate_1 = new Date((json_obj.list[listIds].dt)*1000).getDate();
	var getMonth_1 = new Date((json_obj.list[listIds].dt)*1000).getMonth();

	var weather_icon = "i" + json_obj.list[listIds].weather[0].icon;
	var tempHtml = "<div><hr><div  class='date-weather-block '><span id='"+dateId+"' class='date'></span><span class='icon "+weather_icon+"'></span>"+
				"</div><div class='desciption'><span id='"+weatherId1+"'class='label label-warning icon-box'>21.26</span><span id='"+weatherId2+"' class='label label-default icon-box'>"+
				"</span><i id='"+desciption+"'>broken clouds</i><p><span id='"+speed+"' style='display:block;'></span><span id='"+clouds+"' style='display:inline-block;'></span>"+
				"<span id='"+pressure+"' style='display:inline-block;'></span></p></div></div>";
	if (parseInt(listIds) == 0){
		document.getElementById("nextDay").innerHTML = "<h3>Next days</h3>";
	}
	document.getElementById("nextDay").innerHTML += tempHtml;

	// fill value
	document.getElementById(dateId).innerHTML = getDate_1 + " " + month[getMonth_1];
	document.getElementById(weatherId1).innerHTML = json_obj.list[listIds].temp.min;
	document.getElementById(weatherId2).innerHTML = json_obj.list[listIds].temp.max;
	document.getElementById(desciption).innerHTML = json_obj.list[listIds].weather[0].description;
	document.getElementById(speed).innerHTML = json_obj.list[listIds].speed + "m/s";
	document.getElementById(clouds).innerHTML = "clouds: " + json_obj.list[listIds].clouds + "%, ";
	document.getElementById(pressure).innerHTML = json_obj.list[listIds].pressure + " hpa";
}


function getJson(url,method,callback) {
	var httpXmlRequest = new XMLHttpRequest();
	httpXmlRequest.open(method,url,true);
	httpXmlRequest.send(null);
		httpXmlRequest.onreadystatechange = function() {
			if(httpXmlRequest.readyState == 4 && httpXmlRequest.status == 200){
				json_obj = JSON.parse(httpXmlRequest.responseText);
				callback(json_obj);
			}
		}
}

// global
var date = ["date1", "date2", "date3", "date4", "date5", "date6", "date7"];
var weather1 = ["weather1-1", "weather2-1", "weather3-1", "weather4-1", "weather5-1", "weather6-1", "weather7-1"];
var weather2 = ["weather1-2", "weather2-2", "weather3-2", "weather4-2", "weather5-2", "weather6-2", "weather7-2"];
var desciption = ["desciption_1", "desciption_2", "desciption_3", "desciption_4", "desciption_5", "desciption_6", "desciption_7"];
var speed = ["speed_1", "speed_2", "speed_3", "speed_4", "speed_5", "speed_6", "speed_7"];
var clouds = ["clouds_1", "clouds_2", "clouds_3", "clouds_4", "clouds_5", "clouds_6", "clouds_7"];
var pressure = ["pressure_1", "pressure_2", "pressure_3", "pressure_4", "pressure_5", "pressure_6", "pressure_7"];

function mainFunc(){
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
	getJson(url,"GET",function(json_obj){
		for (var i=0; i < date.length; i++){
			genHtml(json_obj,i,date[i],weather1[i],weather2[i],desciption[i],speed[i],clouds[i],pressure[i]);
		}
	});
}