angular.module('mapApp', ['ionic'])

.controller('MapController', function($scope, $ionicLoading, $compile) {
 
    /*google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
    });*/
    function initialize() {
        var myLatlng = new google.maps.LatLng(49.840221, 24.017666);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click');
      };


      // Create the search box and link it to the UI element.

     $scope.search = function () {
                google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    });
                })
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls.push(input);

        $scope.map.addListener('bounds_changed', function () {
                searchBox.setBounds($scope.map.getBounds());
        });
        var bounds = new google.maps.LatLngBounds();
        
        searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            } else {
                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService($scope.map);
                var request = {
                    location: latLng,
                    radius: 500,
                    types: [places.types]
                };

                service.nearbySearch(request, callback)
                $scope.map.fitBounds(bounds);
            };
          });

      }
      function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                    }
                        
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                    };
                
                
      function createMarker(place) {
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };
                    
                    var placeLoc = place.geometry.location;
                    markers.push(new google.maps.Marker({
                        map: $scope.map,
                        icon: icon,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }

                    google.maps.event.addListener(markers, 'click', function () {
                        infowindow.setContent(place.name);
                        infowindow.open($scope.map, this);
                    });
                }        
      
      
        });
