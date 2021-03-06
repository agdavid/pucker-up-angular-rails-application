(function(){
    'use strict';

    function MapController() {
        
        activate();

        function activate() {
          initMap();
        };

        // Sample GoogleMap to confirm working properly 
        function initMap() {
            // Center map on USA
            var usa = {lat: 41.560654, lng: -98.491622};
                
            // Instantiate new Map
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: usa
            });

            // JS model object
            function Coordinate(id, name, url, lat, lng) {
                this.id = id
                this.name = name
                this.url = url
                this.lat = lat
                this.lng = lng
            };

            //JS method on the prototype
            Coordinate.prototype.create_marker = function() {
                //Give each Brewery a marker and infowindow if it has coordinates
                if (this.lat && this.lng) {
                    //Create new marker for each Brewery and place on map
                    var latLng = new google.maps.LatLng(this.lat, this.lng);
                    
                    var marker = new google.maps.Marker({
                        position: latLng,
                        url: this.url,
                        title: this.name,
                        map: map
                    });
                
                    var infowindow = new google.maps.InfoWindow({
                        content: this.name
                    });

                    //and eventListeners
                    marker.addListener('mouseover', openInfoWindow);
                    function openInfoWindow() {
                        infowindow.open(map, marker);
                    };
                    marker.addListener('mouseout', closeInfoWindow);
                    function closeInfoWindow() {
                        infowindow.close();
                    };
                    marker.addListener('click', goToUrl);
                    function goToUrl() {
                        window.open(this.url);
                    };
                }
            };

            //callback to iterate over AJAX response with JS array of Brewery objects
            function createCoordinates(data) {
                for(var i=0; i < data.length; i++) {
                    var id = data[i].id;
                    var name = data[i].name;
                    var url = data[i].url
                    var lat = parseFloat(data[i].lat);
                    var lng = parseFloat(data[i].lng);

                    var coordinate = new Coordinate(id, name, url, lat, lng);
                    coordinate.create_marker()
                }
            };

            //get AJAX request to Rails API backend breweries#index
            $.get("/breweries.json", createCoordinates);

        };

    };

    angular
        .module('app')
        .controller('MapController', MapController);    
}());