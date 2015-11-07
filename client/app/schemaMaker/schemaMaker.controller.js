'use strict';

angular.module('gAmPieApp')
  .controller('SchemaMakerCtrl', function ($scope, $http, Auth) {
  	var currentUser = Auth.getCurrentUser();
  	console.log(currentUser);
    $http.get('/api/customDataSchema').success(function(success) {
        console.log(success)
    })
    $scope.message = 'Hello';
    $scope.numFeilds = [{feild: '', feildType:''}];
    $scope.sections = [{style: '', fieldName: ''}];
    


    $scope.addFeild = function(){
    	$scope.numFeilds.push({feild:'', feildType:''});
    }
    $scope.removeFeild = function(){
    	$scope.numFeilds.splice($scope.numFeilds.length - 1, 1);
    }

    $scope.addSection = function(){
    	$scope.sections.push({style: '', fieldName: ''});
    }
    $scope.removeSection = function(){
    	$scope.sections.splice($scope.sections.length - 1, 1);
    }

    $scope.createFinalObject = function() {
    	var toReturn = {
    		name:'test',
    		userId: currentUser._id,
    		dataSchema: $scope.numFeilds,
    		visualizationSchema: [{
    			visType: 'list',
    			sections: $scope.sections
    		}]

    	}
    	console.log(toReturn);
    	$http.post("/api/customDataSchema", toReturn).success(function(success){console.log(success)});
    }
  });
