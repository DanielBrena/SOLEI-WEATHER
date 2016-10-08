(function(){
	'use strict';
	angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('home',{
			name:'home',
			url:'/',
			templateUrl:'js/templates/comandos.html'
		}).state('youtube',{
			name:'youtube',
			url:'/youtube/:id',
			templateUrl:'js/templates/youtube.html',
			controller:function($scope,$stateParams){
				$scope.video = $stateParams.id;
				console.log($scope.video);
				$scope.$on('youtube.player.ready', function ($event, player) {
				    // play it again
				    player.playVideo();
				  });

			}
		}).state('mapa',{
			name:'mapa',
			url:'/mapa/:id',
			templateUrl:'js/templates/mapa.html',
			controller:function($scope,$stateParams){
				$scope.address = $stateParams.id;
				

			}
		}).state('trafico',{
			name:'trafico',
			url:'/trafico/:id',
			templateUrl:'js/templates/trafico.html',
			controller:function($scope,$stateParams){
				$scope.address = $stateParams.id;
				

			}
		})
		
	
	});
})();