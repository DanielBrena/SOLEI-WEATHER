(function(){
	'use strict';
	angular.module('app',['dark-sky','ngGeolocation'])
	.config(['darkSkyProvider', function(darkSkyProvider) {
    	darkSkyProvider
        .setApiKey('f82fbb1f6bd87b34d340fb7b39bfe342');
        darkSkyProvider.setUnits('si');
        darkSkyProvider.setLanguage('es');

	}])
	.controller('Principal',Principal);

	Principal.$inject = ['$scope','darkSky','$geolocation','$timeout'];
	function Principal($scope,darkSky,$geolocation,$timeout){

		$scope.tickInterval = 1000 //ms

	    var tick = function() {
	        $scope.clock = Date.now() // get the current time
	        $timeout(tick, $scope.tickInterval); // reset the timer
	    }

    // Start the timer
    	$timeout(tick, $scope.tickInterval);

		$geolocation.watchPosition({
		    timeout: 60000,
		    maximumAge: 250,
		    enableHighAccuracy: true
		  });

		$scope.$on('$geolocation.position.changed', function(event, newPosition){
    		console.log(newPosition); //This is the current position
    		location(newPosition.coords.latitude,newPosition.coords.longitude);
		})

		



		
		function location(lat,lng) { 
               darkSky.getCurrent(lat, lng)
                            .then(function(d){
                            	$scope.weather = d;
                            	console.log(d);
                            })
                            .catch(function(e){

                            }); 
        }


            // Get current location coordinates if supported by browser
        
	}
})();