'use strict';

angular.module('gAmPieApp')
  .controller('SchemaMakerCtrl', function ($scope, $http, Auth) {
  	var currentUser = Auth.getCurrentUser();
  	console.log(currentUser);
    $http.get('/api/customDataSchema').success(function(success) {
        console.log(success)
    })
    $scope.message = 'Hello';
    $scope.numFields = [{field: '', fieldType:''}];
    $scope.sections = [{style: '', fieldName: ''}];
    $scope.schemaName = '';
    


    $scope.addField = function(){
    	$scope.numFields.push({field:'', fieldType:''});
    }
    $scope.removeField = function(){
    	$scope.numFields.splice($scope.numFields.length - 1, 1);
    }

    $scope.addSection = function(){
    	$scope.sections.push({style: '', fieldName: ''});
    }
    $scope.removeSection = function(){
    	$scope.sections.splice($scope.sections.length - 1, 1);
    }

    $scope.createFinalObject = function() {
    	var toReturn = {
    		name: $scope.schemaName,
    		userId: currentUser._id,
    		dataSchema: $scope.numFields,
    		visualizationSchema: [{
    			visType: 'list',
    			sections: $scope.sections
    		}]

    	}
    	console.log(toReturn);
    	$http.post("/api/customDataSchema", toReturn).success(function(success){console.log(success)});
    }
  });
