(function(){
	'use strict';
	angular.module('app',['dark-sky','ngGeolocation','ui.router','jtt_youtube','youtube-embed','ngMap','Uber','jtt_flickr'])
	.config(['darkSkyProvider', function(darkSkyProvider) {
    	darkSkyProvider
        .setApiKey('f82fbb1f6bd87b34d340fb7b39bfe342');
        darkSkyProvider.setUnits('si');
        darkSkyProvider.setLanguage('es');



	}])
	.controller('Principal',Principal);

	Principal.$inject = ['$scope','darkSky','$geolocation','$timeout','$filter','$state','youtubeFactory','$http'];
	function Principal($scope,darkSky,$geolocation,$timeout,$filter,$state,youtubeFactory,$http){

		$scope.tickInterval = 1000 //ms

		if (annyang) {
		  var commands = {
		  	'Hola':hola,
		  	'hola':hola,
		  	'Buenos días':hola,
		  	'buenos días':hola,
		  	'Good morning': hola,
		  	'good morning': hola,

		  	'Inicio':inicio,
		  	'inicio':inicio,
		    'dime la hora': dimeLaHora,
		    'Dime la hora':dimeLaHora,
		    'Dime el clima':dimeElClima,
		    'dime el clima':dimeElClima,
		    'dime mi ubicacion':dimeMiUbicacion,
		    'Dime mi ubicacion':dimeMiUbicacion,
		    'Dime mi ubicación':dimeMiUbicacion,
		    'Donde me encuentro':dondeMeEncuentro,
		    'donde me encuentro':dondeMeEncuentro,
		    'youtube *find':youtube,
		    'yutub *find':youtube,
		    'YouTube *find':youtube,
		    'luutub *find':youtube,
		    'iutube *find':youtube,
		    'video *find':youtube,
		    'vídeo *find':youtube,
		    'Vídeo *find':youtube,
		    'Dime el tráfico':trafico,
		    'dime el tráfico':trafico,
		    'Chiste':chiste,
		    'chiste':chiste,
		    'invita':invita,
		    'estoy bonita':alago,
		    'Estoy bonita':alago,
		    'Uber productos':uberProductos,
		    'muestrame *tag':muestrame,
		    'Muestrame *tag':muestrame,
		    'Muéstrame *tag':muestrame,
		    'muéstrame *tag':muestrame
		  };

		  annyang.addCommands(commands);
		  annyang.debug()
		  annyang.setLanguage('es-MX');
		  annyang.start();
		}



	    var tick = function() {
	        $scope.clock = Date.now() // get the current time
	        $timeout(tick, $scope.tickInterval); // reset the timer
	    }

   
    	$timeout(tick, $scope.tickInterval);

		$geolocation.watchPosition({
		    timeout: 60000,
		    maximumAge: 250,
		    enableHighAccuracy: true
		  });

		$scope.$on('$geolocation.position.changed', function(event, newPosition){
    		console.log(newPosition); //This is the current position
    		$scope.lat = newPosition.coords.latitude;
    		$scope.long = newPosition.coords.longitude;
    		location(newPosition.coords.latitude,newPosition.coords.longitude);
		})

		function muestrame(tag){
			console.log(tag);
			$state.go('imagenes',{id:tag});
			
			
		}

		function success(response){
			return response.data;
		}
		function error(e){
			return e;
		}

		
		function alago(){
			var alagos = [
				'Mas que bonita, estas hermosa',
				'Eres mas que hermosa',
				'Que bonita mirada, eres demasiada bonita',
				'Eres mas linda que una flor'
			];
			var r = Math.floor(Math.random()  * 4) +1;
			responsiveVoice.speak(alagos[r-1], "Spanish Latin American Female");
		}


		
		function location(lat,lng) { 
               darkSky.getCurrent(lat, lng)
                            .then(function(d){
                            	$scope.weather = d;
                            	console.log(d);
                            })
                            .catch(function(e){

                            }); 
        }

        ///
        function dimeLaHora(){
        	var hora = $filter('date')($scope.clock, "H");
        	var minutos = $filter('date')($scope.clock, "mm");
        	responsiveVoice.speak("La hora es "+hora+" horas, "+minutos+ " minutos", "Spanish Latin American Female");
        	
        }
        function dimeElClima(){
        	var temperatura = $scope.weather.currently.temperature;
        	temperatura = temperatura.toFixed(1)
        	responsiveVoice.speak("El clima es: "+ temperatura +"grados" , "Spanish Latin American Female");
        	responsiveVoice.speak($scope.weather.currently.summary +"Te recomiendo usar ropa abrigada el dia de hoy" , "Spanish Latin American Female");
        }

        function dimeMiUbicacion(){
        	var geocoder = new google.maps.Geocoder();
          var latLng = new google.maps.LatLng($scope.lat,$scope.long);
          geocoder.geocode({'latLng':latLng},function(results,status){
            if(status == google.maps.GeocoderStatus.OK){
              console.log(results);
              if(results[0]){
                console.log(results[0].formatted_address);
                
                responsiveVoice.speak(results[0].formatted_address , "Spanish Latin American Female");

                
              }
            }
          });
        }

        function inicio(){
        	console.log('inicio');
        	$state.go('home');
        }

        function youtube(find){
        	youtubeFactory.getVideosFromSearchByParams({
            q: find,
            key: 'AIzaSyCe8Qn_-K-bcaS5AxQMEgH8-_FbveNjWcA'
	        }).then(function (data) {
	        	if(data.data.items.length > 0){
	        		console.log(data.data.items[0].id.videoId);
	        		$state.go('youtube',{id:data.data.items[0].id.videoId});

	        	}
	        });
        }

        function dondeMeEncuentro(){
        	var geocoder = new google.maps.Geocoder();
          var latLng = new google.maps.LatLng($scope.lat,$scope.long);
          geocoder.geocode({'latLng':latLng},function(results,status){
            if(status == google.maps.GeocoderStatus.OK){
              console.log(results);
              if(results[0]){
                console.log(results[0].formatted_address);
               	$state.go('mapa',{id:results[0].formatted_address});


                
              }
            }
          });
        }

        function uberProductos(){
        	var geocoder = new google.maps.Geocoder();
          var latLng = new google.maps.LatLng($scope.lat,$scope.long);
          geocoder.geocode({'latLng':latLng},function(results,status){
            if(status == google.maps.GeocoderStatus.OK){
              console.log(results);
              if(results[0]){
                console.log(results[0].formatted_address);
               	$state.go('uber',{id:results[0].formatted_address});


                
              }
            }
          });
        }

        function trafico(){
        	var geocoder = new google.maps.Geocoder();
          var latLng = new google.maps.LatLng($scope.lat,$scope.long);
          geocoder.geocode({'latLng':latLng},function(results,status){
            if(status == google.maps.GeocoderStatus.OK){
              console.log(results);
              if(results[0]){
                console.log(results[0].formatted_address);
               	$state.go('trafico',{id:results[0].formatted_address});
				responsiveVoice.speak("El trafico para este día es", "Spanish Latin American Female");

                
              }
            }
          });
        }

        function uber(){

        }

        function hola(){
        	var hora = parseInt($filter('date')($scope.clock, "H"));
        	var mensaje = '';
        	if(hora <= 11){
        		mensaje += 'Hola, buenos dias';
        	}else if(hora > 12 && hora < 18){
        		mensaje += 'Hola, buenas tardes';
        	}else{
        		mensaje += 'Hola';
        	}


        	var r = Math.floor(Math.random() * 6) + 1;
        	switch(r){
        		case 1:
        			mensaje += " te ves maravilloso hoy";
        		break;
        		case 2:
        			mensaje += " hoy es un gran día";
        		break;
        		case 3:
        			mensaje += " no olvides sonreir hoy";
        		break;
        		case 4:
        			mensaje += " Te ves increíble, recuerda que el propósito de nuestra vida es ser felices, Dalai Lama";
        		break;
        		case 5:
        			mensaje += " ¿hola, hola quien anda ahi?";
        		break;
        		case 6:
        			mensaje += " Hola, ¿Como estas el dia de hoy?";
        		break;
        	}
        	responsiveVoice.speak(mensaje , "Spanish Latin American Female");

        }

        function chiste(){
        	var chistes = [
        		'¿Por qué está triste la familia Kellogs?   Porque chocó krispis',
        		'¿Sabes que mi hermano anda en bicicleta desde los cuatro años?   um, ya debería estar lejos',

        	];

        	var r = Math.floor(Math.random()  * 2) +1;

        	responsiveVoice.speak(chistes[r-1] , "Spanish Latin American Female");

        }

        function invita(){
        	var frases = [
        	'Hola hola guapa',
        	'Hola hola guapo',
        	'Oye tú te ves hermosa, soy un espejo inteligente',
        	'Oye tu, hoy te ves fabuloso el dia de hoy, ven, soy un espejo inteligente',
        	'Ven y saludame, no asusto, solo soy un espejo inteligente',
        	'Bienvenidos a todos'
        	]
        	var r = Math.floor(Math.random()  * 6) +1;

        	responsiveVoice.speak(frases[r] , "Spanish Latin American Female");
        }


            // Get current location coordinates if supported by browser
        
	}
})();