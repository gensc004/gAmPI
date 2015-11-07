'use strict';

angular.module('gAmPieApp')
  .controller('VisualizeCtrl', function ($scope, $stateParams, $http) {
  	console.log($stateParams.visCategory);
    $scope.message = 'Hello';

    $http.get('/api/customDataSchema/query?name=' + $stateParams.visCategory).success(function(success) {
    	console.log(success)
    	$scope.schema = success.payload;
    	console.log($scope.schema);
    	$http.get('/api/customDataInstance/query?schemaId=' + $scope.schema.schemaId).success(function(success) {
	    	$scope.instance = success.payload;
	    	console.log($scope.instance)
	    })
    })

    

    $scope.addPoint = function() {
    	$http.post('/api/customDataInstances', {schemaId: $scope.schema.schemaId,dataPoints: [{item: "Henry sucks", player: "Bob"}, {item: "lol", player: "loler"}]}).success(function(success) {
    		console.log(success);

    	})
    }
    //$scope.addPoint()

  });
