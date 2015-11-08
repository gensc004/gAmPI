'use strict';

angular.module('gAmPieApp')
  .controller('SchemaMakerCtrl', function ($scope, $http, Auth) {
  	var currentUser = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(isLoggedIn) {
      if(!isLoggedIn) {
        window.location.href = '/login/schemaMaker';
      }
    })
  	console.log(currentUser);
    $http.get('/api/customDataSchema').success(function(success) {
        console.log(success)
    })

    $scope.schema = {
        dataSchema: [{field: '', fieldType:''}],
        visualizationSchema: [],
    }

    $scope.addDataField = function() {
        $scope.schema.dataSchema.push({field: '', fieldType: ''});
    }
    $scope.deleteDataField = function() {
        $scope.schema.dataSchema.splice($scope.schema.dataSchema - 1, 1);
    }


    $scope.message = 'Hello';
    $scope.numFields = [{field: '', fieldType:''}];
    $scope.sections = [[{style: '', fieldName: ''}]];
    $scope.schemaName = '';
    $scope.visTypes = ['List'];
    $scope.lists = [];
    $scope.lineGraphs = [];

    // $scope.addList = function() {
    // 	$scope.lists.push({visType: 'list', sections: [{style: '', fieldName: ''}]})
    // }

    // $scope.addLineGraph = function() {
    // 	$scope.lineGraphs.push({visType: 'line graph', xAxis: '', yAxis: '', labels: [{name: '', field: ''}]})
    // }

    // $scope.setVisType = function(visType, index) {
    // 	$scope.visTypes[index] = visType
    // }

    // $scope.addField = function(){
    // 	$scope.numFields.push({field:'', fieldType:''});
    // }
    // $scope.removeField = function(){
    // 	$scope.numFields.splice($scope.numFields.length - 1, 1);
    // }

    // $scope.addSection = function(listId){
    // 	$scope.lists[listId].sections.push({style: '', fieldName: ''});
    // }
    // $scope.removeSection = function(listId){
    // 	$scope.lists[listId].sections.splice($scope.lists[listId].sections.length - 1, 1);
    // }

    $scope.numOfLists = 0;
    $scope.numOfGraphs = 0;

    $scope.addGraph = function(visIndex) {
        $scope.numOfGraphs++;
        $scope.schema.visualizationSchema.push({visType: 'line graph' ,title: '', xAxis: '', yAxis: '', xAxisLabel: '', yAxisLabel: ''})
    }

    $scope.deleteGraph = function() {
        $scope.numOfGraphs--;
        $scope.schema.visualizationSchema.splice($scope.schema.visualizationSchema.length - 1, 1)
    }

    $scope.addList = function(visIndex) {
        $scope.numOfLists++;
        var check = true;
        for(var i = 0; i < $scope.schema.visualizationSchema.length; i++) {
            if($scope.schema.visualizationSchema[i].visType == 'line graph') {
                $scope.schema.visualizationSchema.splice(i - 1, 0, {visType: 'list', sections: [{field: '', fieldType: ''}]});
                check = false;
                break;
            }
        }
        if(check) {
            $scope.schema.visualizationSchema.push({visType: 'list', sections: [{field: '', fieldType: ''}]});
        }
        

    }

    $scope.deleteList = function() {
        $scope.numOfLists--;
        var check = true;
        for(var i = 0; i < $scope.schema.visualizationSchema.length; i++) {
            if($scope.schema.visualizationSchema[i].visType == 'line graph') {
                console.log(i)
                $scope.schema.visualizationSchema.splice(i - 1, 1);
                check = false;
                break;
            }
        }
        if(check) {
            $scope.schema.visualizationSchema.splice($scope.schema.visualizationSchema.length - 1, 1);
        }
        
    }

    $scope.addField = function(visIndex) {
        console.log(visIndex)
        $scope.schema.visualizationSchema[visIndex].sections.push({field: '', fieldType: ''});

    }

    $scope.deleteField = function(visIndex) {
        console.log(visIndex)
        $scope.schema.visualizationSchema[visIndex].sections.splice($scope.schema.visualizationSchema[visIndex].sections.length - 1, 1);
    }

    // $scope.addLineGraphLabel = function(listId){
    // 	$scope.lineGraphs[listId].labels.push({name:'', field:''});
    // }
    // $scope.removeLineGraphLabel = function(listId){
    // 	$scope.lineGraphs[listId].labels.splice($scope.lineGraphs[listId].labels.length - 1, 1);
    // }



    $scope.createFinalObject = function() {
    	console.log($scope.sections)
    	var toReturn = {
    		name: $scope.schema.name,
    		userId: currentUser._id,
    		dataSchema: $scope.schema.dataSchema,
    		visualizationSchema: $scope.schema.visualizationSchema

    	}

    	$http.post("/api/customDataSchema", toReturn).success(function(success){console.log(success)});
    }

  });
