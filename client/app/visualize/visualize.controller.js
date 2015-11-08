'use strict';

angular.module('gAmPieApp')
  .controller('VisualizeCtrl', function ($scope, $stateParams, $http) {
  	console.log($stateParams.visCategory);
    $scope.message = 'Hello';
	$scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Voltage (v)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
        };
    $http.get('/api/customDataSchema/finder/query?name=' + $stateParams.visCategory).success(function(success) {
    	console.log(success)
    	$scope.schema = success.payload[0];
    	console.log($scope.schema);
    	$http.get('/api/customDataInstance/finder/query?schemaId=' + $scope.schema.schemaId + '&limit=100').success(function(success) {
    		console.log(success)
	    	$scope.instances = success.payload;
	    	for(var i = 0; i < $scope.instances.length; i++) {
	    		$scope.instances[i]
	    		$scope.instances[i].data = [{
	    			values: [],
	    			key: 'key',
	    			color: '#ff7f0e'
	    		}];
	    		for(var j = 0; j < $scope.instances[i].dataPoints.length; j++) {
	    			$scope.instances[i].data[0].values.push({x: $scope.instances[i].dataPoints[j][$scope.schema.visualizationSchema[0].xAxis], y: $scope.instances[i].dataPoints[j][$scope.schema.visualizationSchema[0].yAxis]})
	    		}
	    	}
	    	console.log([$scope.instances[0].data])
	    	$scope.data = $scope.instances[0].data;
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
