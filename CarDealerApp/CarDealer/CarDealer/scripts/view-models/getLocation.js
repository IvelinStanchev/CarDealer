var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';
    var API_KEY_GOOGLE_GEOCODING = 'AIzaSyCj7Dr0HZKRcMnIBuLm2HIWDMXKek1UtTA';
    var NOT_GET_COORDINATES_MESSAGE = 'Unfortunately we could not get the coordinates';

    var currentPlaceAddress;

    function getCoordinates(e) {
        var locationGet = {};

        var error = function () {
            navigator.notification.alert(NOT_GET_COORDINATES_MESSAGE);
        };

        var geoConfig = {
            enableHighAccuracy: true
        };

        var geoSuccess = function (data) {
            locationGet = {
                longitude: data.coords.longitude,
                latitude: data.coords.latitude
            };

            $.ajax({
                type: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + locationGet.latitude + ',' + locationGet.longitude +
                    '&key=' + API_KEY_GOOGLE_GEOCODING,
                contentType: 'application/json',
            }).then(function (data) {
                currentPlaceAddress = 'You are at: ' + data['results'][0]['formatted_address'];

                var vm = kendo.observable({
                    location: currentPlaceAddress
                });
                kendo.bind(e.view.element, vm);

                return currentPlaceAddress;
            });
        };

        navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
    }

    scope.getLocation = function (e) {
        currentPlaceAddress = getCoordinates(e);
    };
}(app.viewmodels));