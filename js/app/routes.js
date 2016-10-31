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
		}).state('uber',{
			name:'uber',
			url:'/uber/:id',
			templateUrl:'js/templates/uber.html',
			controller:function($scope,$stateParams){
				$scope.address = $stateParams.id;
				

			}
		}).state('imagenes',{
			name:'imagenes',
			url:'/imagenes/:id',
			templateUrl:'js/templates/imagenes.html',
			controller:function($scope,$stateParams,flickrFactory){
				$scope.tag = $stateParams.id;

				muestrameImagenes($scope.tag);

				function muestrameImagenes(tag){
					flickrFactory.getImagesByTags({
					    tags:tag
					}).then(function(_data){
						$scope.imagenes = _data.data.items;
						console.log(_data.data.items);
					    //on success
					}).catch(function (_data) {
					    //on error
					});
			
				}

				function jsonFlickrApi(data){

				}
				

			}
		})
		
	
	});
})();