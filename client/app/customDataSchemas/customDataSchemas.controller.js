'use strict';

angular.module('gAmPieApp')
  .controller('CustomDataSchemasCtrl', function ($scope, Auth, socket, $http) {
    $scope.message = 'Hello';
    $scope.currentUser = Auth.getCurrentUser();
    console.log($scope.currentUser._id)
    $http.get('/api/customDataSchema').success(function(success) {
    	$scope.schemas = success.payload
    	socket.syncUpdates('customDataSchema', $scope.schemas);
    })

    $scope.deleteSchema = function(schema) {
    	$http.delete('/api/customDataSchema/' + schema._id).success(function(success) {
    		console.log(success);
    	})
    }

    $scope.finishEditing = function(schema) {
    	$http.put('/api/customDataSchema/' + schema._id, schema).success(function(success){
    		console.log(success);
    	})
    }

    $scope.addGraph = function(schemaIndex, visIndex) {
    	console.log(schemaIndex)
    	console.log(visIndex)
    	$scope.schemas[schemaIndex].visualizationSchema.splice(visIndex + 1, 0, {visType: 'line graph' ,title: '', xAxis: '', yAxis: '', xAxisLabel: '', yAxisLabel: ''})
    }

    $scope.deleteGraph = function(schemaIndex, visIndex) {
    	console.log(schemaIndex)
    	console.log(visIndex)
    	$scope.schemas[schemaIndex].visualizationSchema.splice(visIndex, 1)
    }

    $scope.addList = function(schemaIndex, visIndex) {
    	$scope.schemas[schemaIndex].visualizationSchema.splice(visIndex + 1, 0, {visType: 'list', sections: [{field: '', fieldType: ''}]});

    }

    $scope.deleteList = function(schemaIndex, visIndex) {
    	$scope.schemas[schemaIndex].visualizationSchema.splice(visIndex, 1)
    }
    $scope.addField = function(schemaIndex, visIndex, fieldIndex) {
    	console.log($scope.schemas[schemaIndex])
    	console.log($scope.schemas[schemaIndex].visualizationSchema[visIndex])
    	console.log(visIndex);
    	console.log(fieldIndex)
    	$scope.schemas[schemaIndex].visualizationSchema[visIndex].sections.splice(fieldIndex + 1, 0, {field: '', fieldType: ''});

    }

    $scope.deleteField = function(schemaIndex, visIndex, fieldIndex) {
    	console.log(visIndex);
    	console.log(fieldIndex)
    	$scope.schemas[schemaIndex].visualizationSchema[visIndex].sections.splice(fieldIndex, 1);
    }

  });
