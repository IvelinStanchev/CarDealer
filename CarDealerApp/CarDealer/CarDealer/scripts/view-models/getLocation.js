var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';
    var currentPlaceAddress;

    function getCoordinates() {
        var locationGet = {};

        var error = function () {
            navigator.notification.alert("Unfortunately we could not get the coordinates");
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
                type: "GET",
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + locationGet.latitude +  ',' + locationGet.longitude +
                    '&key=AIzaSyCj7Dr0HZKRcMnIBuLm2HIWDMXKek1UtTA',
                contentType: "application/json",
            }).then(function (data) {
                console.log(data['results'][0]['formatted_address']);

                currentPlaceAddress = data['results'][0]['formatted_address'];

                return currentPlaceAddress;
            })
        };

        navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);
    }

    scope.getLocation = function (e) {
        currentPlaceAddress = getCoordinates();
        setTimeout(function () {
            var vm = kendo.observable({
                location: currentPlaceAddress
            });
            kendo.bind(e.view.element, vm);
        }, 5000);
    };
}(app.viewmodels));