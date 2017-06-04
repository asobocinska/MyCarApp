/**
 * Created by SobocinskaAgnieszka on 2017-05-13.
 */
'use strict';

mycarapp.controller('CarListCtrl', ['$scope', '$rootScope', '$translate', '$state', 'growl', '$http', function($scope, $rootScope, $translate, $state, growl, $http) {
	
	$scope.userCars = [];
	
	$scope.getCarList = function() {
		$http.get('ajax/getCars.php', {
			params: {
				userId: $rootScope.globals.currentUser.id
			}
		}).then(function (response) {
			if (response.data.records.length > 0) {
				$scope.userCars = response.data.records;
			}
		});
	};
	
	$scope.getCarList();
	
	$scope.switchCar = function(car) {
		$rootScope.currentCar = car;
        growl.addSuccessMessage("NOTIFICATION_SWITCH_CAR");
	};
	
	$scope.addNewCar = function() {
		var isFirstCar = $scope.userCars.length === 0;
		$state.go('car-list.add', {'isFirstCar': isFirstCar});
	}
}]);