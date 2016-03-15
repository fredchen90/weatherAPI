var app = angular.module('myapp', []);

// tab controller
app.controller('tabController',  ['$scope', function($scope) {
	$scope.switchTab = function(tab) {
		$scope.active_tab = tab;
		if($scope.active_tab == 'city'){
			alert("yes");
		}else{
			alert("no");
		}
	};
}]);


// select controller
app.controller('selectController',  function($scope, $http) {
	$http.get("http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
		console.log(response);
	})
	$scope.citys = [
		{name: '請選擇', id: 0},
		{name: 'Taipei', id: 'taipei,tw'},
		{name: 'New York', id: 'newyork,us'},
		{name: 'London', id: 'london,uk'}
	]
});

// app.service('switchTab', function(clicktab) {
// 	this.myTab = function(clicktab) {
// 		if (clicktab == 'city'){
// 			alert("yes");
// 		}else{
// 			alert("no");
// 		}
// 	}
// });
	// $scope.city_wind
	// $scope.city_cloud
	// $scope.city_pressure
	// $scope.city_humidity
	// $scope.city_sunrise
	// $scope.city_sunset
	// $scope.city_geocoords