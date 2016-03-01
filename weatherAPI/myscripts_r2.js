function genlValue(json,listIds,dateId,weatherId1,weatherId2,desciption,detailInfo){
	var json_obj = json;
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
	span2.className = "label label-default position";
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
	var date = ["date1", "date2", "date3", "date4", "date5", "date6", "date7"];
	var weather1 = ["weather1-1", "weather2-1", "weather3-1", "weather4-1", "weather5-1", "weather6-1", "weather7-1"];
	var weather2 = ["weather1-2", "weather2-2", "weather3-2", "weather4-2", "weather5-2", "weather6-2", "weather7-2"];
	var desciption = ["desciption_1", "desciption_2", "desciption_3", "desciption_4", "desciption_5", "desciption_6", "desciption_7"];
	var detailInfo = ["detailInfo_1", "detailInfo_2", "detailInfo_3", "detailInfo_4", "detailInfo_5", "detailInfo_6", "detailInfo_7"];

	// AJAX
	var httpXmlRequest = new XMLHttpRequest();
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Taipei&mode=json&units=metric&cnt= 7&appid=44db6a862fba0b067b1930da0d769e98";
	var json_obj;

	// gen HTML
	for (var i=0; i < date.length; i++){
		genHtml(date[i],weather1[i],weather2[i],desciption[i],detailInfo[i]);
		
	}

	httpXmlRequest.onreadystatechange = function() {
		if(httpXmlRequest.readyState == 4 && httpXmlRequest.status == 200){
			json_obj = JSON.parse(httpXmlRequest.responseText);
			// gen value
			for (var i=0; i < date.length; i++){
				genlValue(json_obj,i,date[i],weather1[i],weather2[i],desciption[i],detailInfo[i]);
			}
		}
	}
	httpXmlRequest.open("GET",url,true);
	httpXmlRequest.send(null);
}