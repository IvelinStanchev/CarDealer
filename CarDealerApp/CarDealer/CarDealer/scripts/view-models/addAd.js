var app = app || {};
app.viewmodels = app.viewmodels || {};

window.Adding = (function (scope) {
    'use strict';
    scope.addAd = kendo.observable({
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
                                    window.LoadPhotos();
                                    self.set('brand', '');
                                    self.set('model', '');
                                    self.set('fuelType', '');
                                    self.set('year', '');
                                    self.set('kilometers', '');
                                    self.set('price', '');
                                    self.set('description', '');
                                    self.set('name', '');
                                    self.set('phoneNumber', '');
                                })
                        }, error);
            };
            
            window.LoadPhotos();

            var error = function () {
                var hasConnection = window.CheckForConnection();
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

            var brand = this.get('brand');
            var model = this.get('model');
            var fuelType = this.get('fuelType');
            var year = this.get('year');
            var kilometers = this.get('kilometers');
            var price = this.get('price');
            var description = this.get('description');
            var name = this.get('name');
            var phoneNumber = this.get('phoneNumber');

            if (brand == "") {
                alert("The brand cannot be empty");
            }
            else if (model == "") {
                alert("The model cannot be empty");
            }
            else if (fuelType == "") {
                alert("The fuelType cannot be empty");
            }
            else if (year == "") {
                alert("The year cannot be empty");
            }
            else if (kilometers == "") {
                alert("The kilometers cannot be empty");
            }
            else if (price == "") {
                alert("The price cannot be empty");
            }
            else if (description == "") {
                alert("The description cannot be empty");
            }
            else if (name == "") {
                alert("The name cannot be empty");
            }
            else if (phoneNumber == "") {
                alert("The phoneNumber cannot be empty");
            }
            else {
                navigator.camera.getPicture(success, error, config);
            }
        }
});
}(app.viewmodels));