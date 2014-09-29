var app = app || {};
app.viewmodels = app.viewmodels || {};

window.Adding = (function (scope) {
    'use strict';
    var WRONG_BRAND_MESSAGE = 'The brand cannot be empty!';
    var WRONG_MODEL_MESSAGE = 'The model cannot be empty!';
    var WRONG_FUELTYPE_MESSAGE = 'The fuel type cannot be empty!';
    var WRONG_YEAR_MESSAGE = 'The year cannot be empty!';
    var WRONG_KILOMETERS_MESSAGE = 'The kilometers cannot be empty!';
    var WRONG_PRICE_MESSAGE = 'The price cannot be empty!';
    var WRONG_DESCRIPTION_MESSAGE = 'The description cannot be empty!';
    var WRONG_NAME_MESSAGE = 'The name cannot be empty!';
    var WRONG_PHONENUMBER_MESSAGE = 'The phone number cannot be empty!';
    var TYPES_NAME_DATABASE = 'CarDealer';
    var SUCCESSFULLY_ADDED_AD_MESSAGE = 'Your ad has been added successfully.';
    var NOT_ADDED_PRICTURE_ERROR_MESSAGE = 'Unfortunately we could not add the image.';
    var NO_INTERNET_CONNECTION_MESSAGE = 'No internet connection. Please, provide connection and try again.';
    var DEFAULT_PICTURE_HEIGHT = 120;
    var DEFAULT_PICTURE_WIDTH = 120;

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
                    Filename: Math.random().toString(36).substring(2, 15) + '.jpg',
                    ContentType: 'image/jpeg',
                    base64: data
                },
                        function (picData) {
                            window.everlive.data(TYPES_NAME_DATABASE).create({
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
                                    navigator.notification.alert(SUCCESSFULLY_ADDED_AD_MESSAGE);
                                    window.currentAdsCount++;
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
                    navigator.notification.alert(NO_INTERNET_CONNECTION_MESSAGE);
                }
                else {
                    navigator.notification.alert(NOT_ADDED_PRICTURE_ERROR_MESSAGE);
                }
            };

            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: DEFAULT_PICTURE_HEIGHT,
                targetWidth: DEFAULT_PICTURE_WIDTH
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

            if (brand == '') {
                alert(WRONG_BRAND_MESSAGE);
            }
            else if (model == '') {
                alert(WRONG_MODEL_MESSAGE);
            }
            else if (fuelType == '') {
                alert(WRONG_FUELTYPE_MESSAGE);
            }
            else if (year == '') {
                alert(WRONG_YEAR_MESSAGE);
            }
            else if (kilometers == '') {
                alert(WRONG_KILOMETERS_MESSAGE);
            }
            else if (price == '') {
                alert(WRONG_PRICE_MESSAGE);
            }
            else if (description == '') {
                alert(WRONG_DESCRIPTION_MESSAGE);
            }
            else if (name == '') {
                alert(WRONG_NAME_MESSAGE);
            }
            else if (phoneNumber == '') {
                alert(WRONG_PHONENUMBER_MESSAGE);
            }
            else {
                navigator.camera.getPicture(success, error, config);
            }
        }
});
}(app.viewmodels));