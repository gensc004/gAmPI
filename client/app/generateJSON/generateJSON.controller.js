'use strict';

angular.module('gAmPieApp')
  .controller('GenerateJSONCtrl', function ($scope, $http, Auth, $stateParams) {
  	$scope.genCategory = $stateParams.genCategory;

  	 $http.get('/api/customDataSchema/finder/query?name=' + $stateParams.genCategory).success(function(success) {
  	 	console.log(success);
  	 	$scope.dataSchema = success.payload[0].dataSchema;
  	 	$scope.dataJSON = {dataPoints: [], schemaId: success.payload[0].schemaId}
  	 	var fuckMyDickOrSomething = {}
  	 	for (var i = 0; i < $scope.dataSchema.length; i++) {
  	 		if($scope.dataSchema[i].fieldType == "string"){
  	 			fuckMyDickOrSomething[$scope.dataSchema[i].field] = "";
  	 		} else {
  	 			fuckMyDickOrSomething[$scope.dataSchema[i].field] = 0;
  	 		}
  	 	};
  	 	$scope.dataJSON.dataPoints.push(fuckMyDickOrSomething);
  	 	console.log($scope.dataSchema);
  	 })

  	 $scope.sendData = function(){
  	 	console.log($scope.dataJSON);
  	 	$http.post("/api/customDataInstance", $scope.dataJSON)
  	 }
  });
