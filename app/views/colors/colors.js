'use strict';

angular.module('myApp.colors', ['ngRoute'])//,'ngAnimate'

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/colors', {
		templateUrl: 'views/colors/colors.html',
		controller: 'ColorsCtrl'
	});
}])

.controller('ColorsCtrl', function($scope){
	function mkhex(d) {return ("0"+(Number(d).toString(16))).slice(-2).toUpperCase();}
	function gradient(f1, f2, f3, p1, p2, p3,center, width, len){
		if (center == undefined)center = 128;
		if (width == undefined)width = 127;
		if (len == undefined)len = 50;
		for (var i = 0; i < len; ++i){
			$scope.patrone.push({
				hex: 
					mkhex(Math.sin(f1*i + p1) * width + center)+
					mkhex(Math.sin(f2*i + p2) * width + center)+
					mkhex(Math.sin(f3*i + p3) * width + center)
			});
		}
	}
	$scope.algo = {
		blocks: 1000,
		f1:0.1,
		f2:0.05,
		f3:0.01,
		l1:80,
		l2:1,
		l3:7,
		m1:1,
		m2:1
	};
	$scope.renderColors = function(){
		if($scope.algo.blocks > 5000)$scope.algo.blocks = 5000;
		$scope.patrone = [];
		gradient(
			$scope.algo.f1,
			$scope.algo.f2,
			$scope.algo.f3,
			$scope.algo.l1,
			$scope.algo.l2,
			$scope.algo.l3, 
			$scope.algo.m1,
			$scope.algo.m2,
			$scope.algo.blocks
		);
	}
	$scope.renderColors($scope.algo);
	// var r=0,g=0,b=0,s=5,m=255/s,i;
	// for(i=0;i<m;i++){
	// 	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
	// 	r+=s;
	// }
	// for(i=0;i<m;i++){
	// 	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
	// 	g+=s;
	// }
	// for(i=0;i<m;i++){
	// 	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
	// 	b+=s;
	// }
	$scope.palette = [];
	$scope.toggleColor = function(color){
		var index = $scope.palette.indexOf(color);
		if(index < 0)$scope.palette.push(color);
		else $scope.palette.splice(index,1);
		console.log(index,$scope.palette);
	}
	$scope.countSelection = function(){
		return $scope.palette.length;
	}
	$scope.resultsShown = false;
	$scope.dominance = "all";
	$scope.toggleResults = function(){
		$scope.resultsShown = !$scope.resultsShown;
	}
})

.filter("byColor",function(){
	return function(items,color){
		var results = [];
		angular.forEach(items, function(item){
			var r = parseInt(item.hex.slice(0,2),16);
			var g = parseInt(item.hex.slice(2,4),16);
			var b = parseInt(item.hex.slice(4,6),16);
			switch(color){
				case "r":
				case "red":
					if(r > g && r > b){results.push(item);}
				break;
				case "g":
				case "green":
					if(g > r && g > b){results.push(item);}
				break;
				case "b":
				case "blue":
					if(b > r && b > g){results.push(item);}
				break;
				default:
					results.push(item);
				break;
			}
		});
		return results;
	}
});

// Colors Patterns:
/*
//Black > Red > Yellow
for(r=0;r<255;r+=3){
	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
}
for(g=0;g<255;g+=3){
	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
}
for(b=0;b<255;b+=3){
	$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
}
// all stripy
var r=0,g=0,b=0,m=255,s=15;
for(r=0;r<m;r+=s){
	for(g=0;g<m;g+=s){
		for(b=0;b<m;b+=s){
			$scope.patrone.push({hex:mkhex(r)+mkhex(g)+mkhex(b)});
		}
	}
}
*/