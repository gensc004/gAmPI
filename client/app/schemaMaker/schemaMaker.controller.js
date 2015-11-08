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
    $scope.sections = [[{style: '', fieldName: ''}]];
    $scope.schemaName = '';
    $scope.visTypes = ['List'];
    $scope.lists = [];
    $scope.lineGraphs = [];

    $scope.addList = function() {
    	$scope.lists.push({visType: 'list', sections: [{style: '', fieldName: ''}]})
    }

    $scope.addLineGraph = function() {
    	$scope.lineGraphs.push({visType: 'line graph', xAxis: '', yAxis: '', labels: [{name: '', field: ''}]})
    }

    $scope.setVisType = function(visType, index) {
    	$scope.visTypes[index] = visType
    }

    $scope.addField = function(){
    	$scope.numFields.push({field:'', fieldType:''});
    }
    $scope.removeField = function(){
    	$scope.numFields.splice($scope.numFields.length - 1, 1);
    }

    $scope.addSection = function(listId){
    	$scope.lists[listId].sections.push({style: '', fieldName: ''});
    }
    $scope.removeSection = function(listId){
    	$scope.lists[listId].sections.splice($scope.lists[listId].sections.length - 1, 1);
    }

    $scope.addLineGraphLabel = function(listId){
    	$scope.lineGraphs[listId].labels.push({name:'', field:''});
    }
    $scope.removeLineGraphLabel = function(listId){
    	$scope.lineGraphs[listId].labels.splice($scope.lineGraphs[listId].labels.length - 1, 1);
    }



    $scope.createFinalObject = function(sectionId) {
    	console.log($scope.sections)
    	var toReturn = {
    		name: $scope.schemaName,
    		userId: currentUser._id,
    		dataSchema: $scope.numFields,
    		visualizationSchema: []

    	}
    	for(var i = 0; i < $scope.lists.length; i++) {
    		toReturn.visualizationSchema.push($scope.lists[i]);
    	}
    	for(var i = 0; i < $scope.lineGraphs.length; i++) {
    		toReturn.visualizationSchema.push($scope.lineGraphs[i]);
    	}
    	console.log(toReturn);
    	$http.post("/api/customDataSchema", toReturn).success(function(success){console.log(success)});
    }

  });
