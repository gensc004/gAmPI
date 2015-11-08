'use strict';

angular.module('gAmPieApp')
  .controller('GenerateJSONCtrl', function ($scope, $http, Auth, $stateParams, $state) {
  	$scope.genCategory = $stateParams.genCategory;
  	if($scope.genCategory) {
	  	$scope.dataSchemas = [];
	  	 $http.get('/api/customDataSchema/finder/query?name=' + $stateParams.genCategory).success(function(success) {
	  	 	console.log(success);
	  	 	$scope.dataSchema = success.payload[0].dataSchema
	  	 	$scope.dataSchemas.push(success.payload[0].dataSchema);
	  	 	$scope.dataJSON = {dataPoints: [], schemaId: success.payload[0].schemaId}
	  	 	var ourDataSchema = {}
	  	 	for (var i = 0; i < $scope.dataSchema.length; i++) {
	  	 		if($scope.dataSchema[i].fieldType == "string"){
	  	 			ourDataSchema[$scope.dataSchema[i].field] = "";
	  	 		} else {
	  	 			ourDataSchema[$scope.dataSchema[i].field] = 0;
	  	 		}
	  	 	};
	  	 	console.log($scope.dataSchemas.length)
	  	 	// for(var j = 0; j < $scope.dataSchemas.length; j++) {
	  	 	// 	$scope.dataJSON.dataPoints.push(ourDataSchema);
	  	 	// }
	  	 	
	  	 })


	  	 $scope.addDataSchema = function() {
	  	 	$scope.dataSchemas.push($scope.dataSchema);
	  	 }

	  	 $scope.removeDataSchema = function() {
	  	 	$scope.dataSchemas.splice($scope.dataSchemas.length - 1, 1);
	  	 }
	  	 $scope.sendData = function(){
	  	 	console.log($scope.dataJSON);
	  	 	$http.post("/api/customDataInstance", $scope.dataJSON).success(function(success) {
	  	 		console.log(success)
	  	 	})
	  	 }
	} else {
		$http.get('/api/customDataSchema').success(function(success) {
			$scope.schemas = success.payload
		})
		$scope.goToInstance = function(schemaName) {
  			$state.go('generateJSON', {genCategory: schemaName})
  		}
	}
  });
