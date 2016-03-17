var app = angular.module('myapp', []);

// tab controller
app.controller('tabController',  ['$scope', function($scope) {
	$scope.city_class = "tab-focus";
	$scope.day_class = "tab";
	$scope.record_name = "taipei";
	
	$scope.switchTab = function(tab) {
		$scope.active_tab = tab;
		if($scope.active_tab == 'city'){
			$scope.city_class = "tab-focus";
			$scope.day_class ="tab";
			$scope.content1_class = "show";
			$scope.content2_class = "hide";
		}else{
			$scope.day_class ="tab-focus";
			$scope.city_class = "tab";
			$scope.content2_class = "show";
			$scope.content1_class = "hide";
		}
	};
}]);


// first content controller
app.controller('firstContentController',  function($scope, $http) {
	$scope.citys = [
		{name: '請選擇', id: 0},
		{name: 'Taipei', id: 'taipei,tw'},
		{name: 'New York', id: 'newyork,us'},
		{name: 'London', id: 'london,uk'}
	];

	$http.get("http://api.openweathermap.org/data/2.5/weather?q=Taipei,tw&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
		var x2js = new X2JS();
		var json = x2js.xml_str2json(response.data);
		$scope.infos = json;
	});

	$scope.onChangeCity = function() {
		$scope.record_name = $scope.myCity.name;
		$http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.myCity.id+"&mode=xml&units=metric&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
			var x2js = new X2JS();
			var json = x2js.xml_str2json(response.data);
			$scope.infos = json;
		});
	};

});

// second content controller
app.controller('secondContentController', function($scope, $http) {
	$scope.days = [
		{name:'5 days', value: 5},
		{name:'6 days', value: 6},
		{name:'7 days', value: 7}
	];

	// default
	$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=taipei&mode=json&units=metric&cnt=&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
		$scope.jsonformat = response.data.list;
	})

	$scope.onChangeDays = function() {
		$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q="+$scope.record_name+"&mode=json&units=metric&cnt="+$scope.mydays.value+"&appid=5df396cf7b4d7b339bc250ebfd041f2e").then(function(response){
			$scope.jsonformat = response.data.list;
		})
	};
});
