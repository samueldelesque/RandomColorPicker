'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  // 'ngAnimate',
  'myApp.colors',
  'myApp.about'
  // 'myApp.colors'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/colors'});
}]);
// .directive('resize', function ($window) {
//     return function (scope, element) {
//         var w = angular.element($window);
//         scope.getWindowDimensions = function () {
//         	console.log("New Window Dimention:",w.innerHeight,w.innerWidth);
//             return {
//                 'h': w.innerHeight,
//                 'w': w.innerWidth
//             };
//         };
//         scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
//             scope.windowHeight = newValue.h;
//             scope.windowWidth = newValue.w;

//             scope.style = function () {
//                 return {
//                     'height': (newValue.h - 100) + 'px',
//                         'width': (newValue.w - 100) + 'px'
//                 };
//             };

//         }, true);

//         w.bind('resize', function () {
//             scope.$apply();
//             alert("window resized");
//         });
//     }
// })
;