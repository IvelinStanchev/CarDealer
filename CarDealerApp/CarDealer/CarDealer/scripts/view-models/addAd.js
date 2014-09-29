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

            var EARLIEST_YEAR = 1950; // for instance
            var MIN_PHONE_DIGITS = 6;
            var MIN_NAME_LETTERS = 4;
            
            var currentYear = new Date().getFullYear();
            
            if (brand == "") {
                displayEmptyErrorMessage('Brand');
            } else if (model == "") {
                displayEmptyErrorMessage('Model');
            } else if (fuelType == "") {
                displayEmptyErrorMessage('Fuel Type');
            } else if (year == "") {
                displayEmptyErrorMessage('Year');
            } else if (year < EARLIEST_YEAR || year > currentYear) {
                alert('Invalid year - valid values are between ' + EARLIEST_YEAR + ' and ' + currentYear);
            } else if (kilometers == "") {
                displayEmptyErrorMessage('Kilometers');
            } else if (!isNumber(kilometers)) {
                alert('Kilometers must be a number');
            } else if (kilometers < 0) {
                alert('Kilometers cannot be less than 0');
            } else if (price == "") {
                displayEmptyErrorMessage('Price');
            } else if (!isNumber(price)) {
                alert('Price must be a number');
            } else if (price < 0) {
                alert('Price cannot be less than 0');
            } else if (description == "") {
                displayEmptyErrorMessage('Description');
            } else if (name == "") {
                displayEmptyErrorMessage('Your Name');
            } else if (name.length < MIN_PHONE_DIGITS) {
                alert('Name must consist of at least ' + MIN_NAME_LETTERS + ' digits');
            } else if (phoneNumber == "") {
                displayEmptyErrorMessage('Your Phone Number');
            } else if (!isNumber(phoneNumber)) {
                alert('Phone number must be a number');
            } else if (phoneNumber.length < MIN_PHONE_DIGITS) {
                alert('Phone number must consist of at least ' + MIN_PHONE_DIGITS + ' digits');
            }
            else {
                navigator.camera.getPicture(success, error, config);
                console.log(fuelType);
            };

            function isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function displayEmptyErrorMessage(field) {
                alert('The field: \"' + field + '\" cannot be empty');
            };

        }
    });
}(app.viewmodels));