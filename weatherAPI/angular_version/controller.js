var app = angular.module('myapp', []);

// tab controller
app.controller('tabController',  ['$scope', function($scope) {
	$scope.city_class = "tab-focus";
	$scope.day_class = "tab";
	$scope.switchTab = function(tab) {
		$scope.active_tab = tab;
		if($scope.active_tab == 'city'){
			$scope.city_class = "tab-focus";
			$scope.day_class ="tab";
		}else{
			$scope.day_class ="tab-focus";
			$scope.city_class = "tab";
		}
	};
}]);


// first content controller
app.controller('firstContentController',  function($scope, $http) {
	// $http.get("http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
	// 	console.log(response);
	// })
	$scope.citys = [
		{name: '請選擇', id: 0},
		{name: 'Taipei', id: 'taipei,tw'},
		{name: 'New York', id: 'newyork,us'},
		{name: 'London', id: 'london,uk'}
	]
	$scope.infos = [
		{name: 'Wind', value: 10},
		{name: 'Cloudiness', value: 'sky'},
		{name: 'Pressure', value: '150 hpa'},
		{name: 'Humidity', value: '25%'},
		{name: 'Sunrise', value: '19:05'},
		{name: 'Sunset', value: '06"05'},
		{name: 'Geo coords', value: '[121.53, 25.05]'}
	]
	$scope.onChange = function(city_name) {
		if($scope.myCity.id == 'taipei,tw'){
			alert("taipei");
		}else if($scope.myCity.id == 'newyork,us'){
			alert("newyork");
		}else{
			alert("london");
	}
	};

});

// second content controller
app.controller('secondContentController', function($scope, $http) {
	$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=taipei&mode=json&units=metric&cnt=5&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
		$scope.weather_img = "icon";
		$scope.jsonformat = response.data.list;
	})
	$scope.days = [
		{name:'5 days', value: 5},
		{name:'6 days', value: 6},
		{name:'7 days', value: 7}
	]
});
