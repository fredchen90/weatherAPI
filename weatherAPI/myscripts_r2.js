function getJson(){
	var httpXmlRequest = new XMLHttpRequest();
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
	httpXmlRequest.open("GET",url,false);
	httpXmlRequest.send(null);
	return httpXmlRequest.responseText;
}

function generalValue(listIds,dateId,weatherId1,weatherId2,desciption,detailInfo){
	var json_obj = JSON.parse(getJson());
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var getDate_1 = new Date((json_obj.list[listIds].dt)*1000).getDate();
	var getMonth_1 = new Date((json_obj.list[listIds].dt)*1000).getMonth();
	document.getElementById(dateId).innerHTML = getDate_1 + " " + month[getMonth_1] + "<img src='img/" + json_obj.list[listIds].weather[0].icon + ".png'>";
	document.getElementById(weatherId1).innerHTML = json_obj.list[listIds].temp.min;
	document.getElementById(weatherId2).innerHTML = json_obj.list[listIds].temp.max;
	document.getElementById(desciption).innerHTML = json_obj.list[listIds].weather[0].description;
	document.getElementById(detailInfo).innerHTML = json_obj.list[listIds].speed + "m/s" + "<br>" + "clouds: " + json_obj.list[listIds].clouds + "%, " + json_obj.list[listIds].pressure + " hpa";
}


function genHtml(dateId,weatherId1,weatherId2,desciption,detailInfo){
	var hr = document.createElement("hr");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	var span1 = document.createElement("span");
	var span2 = document.createElement("span");
	var i = document.createElement("i");
	var p = document.createElement("p");

// id
	div2.id = dateId;
	span1.id = weatherId1;
	span2.id = weatherId2;
	i.id = desciption;
	p.id = detailInfo;
// class
	div2.className  = "date";
	div3.className = "desciption";
	span1.className = "label label-warning position";
	span2.className = "label label-default position-left";
	i.className = "left1";
// append
	div3.appendChild(span1);
	div3.appendChild(span2);
	div3.appendChild(i);
	div3.appendChild(p);
	div1.appendChild(div2);
	div1.appendChild(div3);
// append to top div
	document.getElementById("myDIV").appendChild(hr);
	document.getElementById("myDIV").appendChild(div1);
}


function mainFunc(){
	// gen HTML
	genHtml("date1","weather1-1","weather1-2","desciption_1","detailInfo_1");
	genHtml("date2","weather2-1","weather2-2","desciption_2","detailInfo_2");
	genHtml("date3","weather3-1","weather3-2","desciption_3","detailInfo_3");
	genHtml("date4","weather4-1","weather4-2","desciption_4","detailInfo_4");
	genHtml("date5","weather5-1","weather5-2","desciption_5","detailInfo_5");
	genHtml("date6","weather6-1","weather6-2","desciption_6","detailInfo_6");
	genHtml("date7","weather7-1","weather7-2","desciption_7","detailInfo_7");

	// fill value
	generalValue(0,"date1","weather1-1","weather1-2","desciption_1","detailInfo_1");
	generalValue(1,"date2","weather2-1","weather2-2","desciption_2","detailInfo_2");
	generalValue(2,"date3","weather3-1","weather3-2","desciption_3","detailInfo_3");
	generalValue(3,"date4","weather4-1","weather4-2","desciption_4","detailInfo_4");
	generalValue(4,"date5","weather5-1","weather5-2","desciption_5","detailInfo_5");
	generalValue(5,"date6","weather6-1","weather6-2","desciption_6","detailInfo_6");
	generalValue(6,"date7","weather7-1","weather7-2","desciption_7","detailInfo_7");
}