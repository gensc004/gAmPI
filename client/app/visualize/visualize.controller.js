'use strict';

angular.module('gAmPieApp')
  .controller('VisualizeCtrl', function ($scope, $stateParams, $http) {
  	console.log($stateParams.visCategory);
    $scope.message = 'Hello';

    $http.get('/api/customDataSchema/finder/query?name=' + $stateParams.visCategory).success(function(success) {
    	console.log(success)
    	$scope.schema = success.payload[0];
    	console.log($scope.schema);
    	$http.get('/api/customDataInstance/finder/query?schemaId=' + $scope.schema.schemaId + '&limit=100').success(function(success) {
    		console.log(success)
	    	$scope.instances = success.payload;
	    	console.log($scope.instances)
	    })
    })

    

    $scope.addPoint = function() {
    	$http.post('/api/customDataInstances', {schemaId: $scope.schema.schemaId,dataPoints: [{item: "Henry sucks", player: "Bob"}, {item: "lol", player: "loler"}]}).success(function(success) {
    		console.log(success);

    	})
    }
    //$scope.addPoint()

  });
