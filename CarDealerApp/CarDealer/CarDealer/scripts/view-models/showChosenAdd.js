var app = app || {};
app.viewmodels = app.viewmodels || {};

window.ShowingChosen = (function (scope) {
    'use strict';
    scope.showChosenAd = kendo.observable({
        brand: '',
        model: '',
        fuelType: '',
        year: '',
        kilometers: '',
        price: '',
        description: '',
        name: '',
        phoneNumber: '',
        saveAd: function () {
            var self = this;
            var success = function (data) {
                window.everlive.Files.create({
                    Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                    ContentType: "image/jpeg",
                    base64: data
                },
                        function (picData) {
                            window.everlive.data('CarDealer').create({
                                'Brand': self.get('brand'),
                                'Model': self.get('model'),
                                'FuelType': self.get('fuelType'),
                                'Year': self.get('year'),
                                'Kilometers': self.get('kilometers'),
                                'Price': self.get('price'),
                                'Description': self.get('description'),
                                'Name': self.get('name'),
                                'PhoneNumber': self.get('phoneNumber'),
                                'Pic': picData.result.Id
                            },
                                function () {
                                    navigator.notification.alert("Your ad has been added successfully!");
                                    loadPhotos();
                                })
                        }, error);
            };

            function loadPhotos() {
                var hasConnection = checkForConnection();
                if (!hasConnection) {
                    navigator.notification.alert("No internet connection. Please, provide connection and try again.");
                }

                window.files = [];
                window.everlive.data('CarDealer').get()
                    .then(function (data) {
                        data.result.forEach(function (file) {
                            $.ajax({
                                type: "GET",
                                url: 'http://api.everlive.com/v1/84Kc0v5WmmEQxXDe/Files/' + file.Pic,
                                //headers: { "Authorization" : "Bearer your-access-token-here" },
                                contentType: "application/json",
                            }).then(function (picData) {
                                files.push({
                                    'brand': file.Brand,
                                    'model': file.Model,
                                    'fuelType': file.FuelType,
                                    'year': file.Year,
                                    'kilometers': file.Kilometers,
                                    'price': file.Price,
                                    'description': file.Description,
                                    'name': file.Name,
                                    'phoneNumber': file.PhoneNumber,
                                    'imageUrl': picData.Result.Uri
                                });
                            })
                                .then(function () {
                                    $("#cars").kendoMobileListView({
                                        dataSource: files,
                                        template:
                                            "<div id=\"eachItem\">" +
                                                "<img src='#= data.imageUrl #'>" +
                                                "<div id=\"eachItemContainer\">" +
                                                        "<div id=\"brand\">Brand: #= data.brand #</div>" +
                                                        "<div id=\"model\">Model: #= data.model #</div>" +
                                                        "<div id=\"kilometers\">Kilometers: #= data.kilometers #</div>" +
                                                        "<div id=\"price\">Price: #= data.price #</div>" +
                                                "</div>" +
                                        "</div>"
                                    });
                                });
                        });
                    });
            }

            function checkForConnection() {
                var networkState = navigator.connection.type;

                if (networkState == Connection.NONE) {
                    return false;
                }

                return true;
            }

            var error = function () {
                var hasConnection = checkForConnection();
                if (!hasConnection) {
                    navigator.notification.alert("No internet connection. Please, provide connection and try again.");
                }
                else {
                    navigator.notification.alert("Unfortunately we could not add the image");
                }
            };
            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 120,
                targetWidth: 120
            };

            navigator.camera.getPicture(success, error, config);
        }
    });
}(app.viewmodels));