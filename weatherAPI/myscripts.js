function myfun(){
	var json_obj = JSON.parse(getJson());
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	generalValue(0,"date1","weather1-1","weather1-2","desciption_1","detailInfo_1");
	generalValue(1,"date2","weather2-1","weather2-2","desciption_2","detailInfo_2");
	generalValue(2,"date3","weather3-1","weather3-2","desciption_3","detailInfo_3");
	generalValue(3,"date4","weather4-1","weather4-2","desciption_4","detailInfo_4");
	generalValue(4,"date5","weather5-1","weather5-2","desciption_5","detailInfo_5");
	generalValue(5,"date6","weather6-1","weather6-2","desciption_6","detailInfo_6");
	generalValue(6,"date7","weather7-1","weather7-2","desciption_7","detailInfo_7");

	function getJson(){
		var httpXmlRequest = new XMLHttpRequest();
		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
		httpXmlRequest.open("GET",url,false);
		httpXmlRequest.send(null);
		return httpXmlRequest.responseText;
	}

	function generalValue(listIds,dateId,weatherId1,weatherId2,desciption,detailInfo){
		var getDate_1 = new Date((json_obj.list[listIds].dt)*1000).getDate();
		var getMonth_1 = new Date((json_obj.list[listIds].dt)*1000).getMonth();
		document.getElementById(dateId).innerHTML = getDate_1 + " " + month[getMonth_1] + "<img src='img/" + json_obj.list[listIds].weather[0].icon + ".png'>";
		document.getElementById(weatherId1).innerHTML = json_obj.list[listIds].temp.min;
		document.getElementById(weatherId2).innerHTML = json_obj.list[listIds].temp.max;
		document.getElementById(desciption).innerHTML = json_obj.list[listIds].weather[0].description;
		document.getElementById(detailInfo).innerHTML = json_obj.list[listIds].speed + "m/s" + "<br>" + "clouds: " + json_obj.list[listIds].clouds + "%, " + json_obj.list[listIds].pressure + " hpa";
	}
}
window.onload=myfun;