/// <reference path="../kendo/js/jquery.min.js" />

(function () {
    document.addEventListener("deviceready", function () {
        document.addEventListener("pause", onPause, false);

        function onPause() {
            alert("Your program has been in pause for a while. Click OK to resume");
        }

        window.files = [];

        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            initial: "home-view",
            transition: "slide"
        });

        $("#cars").on("click", "div", function ($e) {
            if ($e.currentTarget.id == 'eachItem') {
                var clickedTargetChildren = $e.currentTarget.children[1];

                var allInformationAsString = clickedTargetChildren.lastChild.attributes[1].nodeValue;
                var allInformationAsArray = allInformationAsString.split(';');

                var brand = allInformationAsArray[0];
                var model = allInformationAsArray[1];
                var fuelType = allInformationAsArray[2];
                var year = allInformationAsArray[3];
                var kilometers = allInformationAsArray[4];
                var price = allInformationAsArray[5];
                var description = allInformationAsArray[6];
                var name = allInformationAsArray[7];
                var phoneNumber = allInformationAsArray[8];
                var pictureUri = allInformationAsArray[9];

                app.navigate("views/singleAdView.html");

                var modelContainer = $('.single-ad-container');
                if (modelContainer.html !== '') {
                    modelContainer.empty();
                }

                var imageContainer = $(document.createElement('div'));
                imageContainer.attr('id', 'image-container');
                imageContainer.prepend($('<img>', { id: 'ad-image', src: pictureUri }));

                var informationContainer = $(document.createElement('div'));
                informationContainer.attr('id', 'information-container');
                informationContainer.append($('<p>', { id: 'ad-brand' }).html('Brand: ' + brand));
                informationContainer.append($('<p>', { id: 'ad-model' }).html('Model: ' + model));
                informationContainer.append($('<p>', { id: 'ad-fuelType' }).html('FuelType: ' + fuelType));
                informationContainer.append($('<p>', { id: 'ad-year' }).html('Year: ' + year));
                informationContainer.append($('<p>', { id: 'ad-kilometers' }).html('Kilometers: ' + kilometers));
                informationContainer.append($('<p>', { id: 'ad-price' }).html('Price: ' + price));
                informationContainer.append($('<p>', { id: 'ad-description' }).html('Description: ' + description));
                informationContainer.append($('<p>', { id: 'ad-name' }).html('Name: ' + name));
                informationContainer.append($('<p>', { id: 'ad-phoneNumber' }).html('PhoneNumber: ' + phoneNumber));

                var buttonContainer = $(document.createElement('div'));
                buttonContainer.attr('id', 'button-container');
                buttonContainer.append($('<button>', { id: 'add-contact' }).addClass('add-contact').html('AddContact'));

                buttonContainer.children()[0].addEventListener('click', function () {
                    var myContact = navigator.contacts.create({ "displayName": name });
                    alert(name + " has been added to your contacts successfully.");
                }, false);

                setTimeout(function () {
                    var modelContainer = $('.single-ad-container');

                    imageContainer.appendTo(modelContainer);
                    informationContainer.appendTo(modelContainer);
                    buttonContainer.appendTo(modelContainer);
                }, 100);
            }
        });

        window.everlive = new Everlive("84Kc0v5WmmEQxXDe");

        //navigator.connection.type = Connection.NONE;

        var hasConnection = window.CheckForConnection();

        if (!hasConnection) {
            alert("No internet connection!");

            var interval = setInterval(function () {
                hasConnection = window.CheckForConnection();

                if (hasConnection) {
                    alert("You are now connected to internet.");
                    clearInterval(interval);
                    window.LoadPhotos();
                }
            }, 1500);
        }
        else {
            window.LoadPhotos();

            window.everlive.data('CarDealer').get()
            .then(function (data) {
                window.currentAdsCount = data.count;
            });

            setInterval(function () {
                window.everlive.data('CarDealer').get()
                .then(function (data) {
                    if (window.currentAdsCount < data.count) {
                        window.currentAdsCount = data.count;

                        var my_media = null;
                        var mediaTimer = null;

                        function onSuccess() {
                            console.log("playAudio():Audio Success");
                        }

                        function onError(error) {
                            alert('code: ' + error.code + '\n' +
                                  'message: ' + error.message + '\n');
                        }

                        function setAudioPosition(position) {
                            document.getElementById('audio_position').innerHTML = position;
                        }

                        function playAudio(src) {
                            if (my_media == null) {
                                my_media = new Media(src, onSuccess, onError);
                            }
                            my_media.play();

                            if (mediaTimer == null) {
                                mediaTimer = setInterval(function () {
                                    my_media.getCurrentPosition(
                                        function (position) {
                                            if (position > -1) {
                                                setAudioPosition((position) + " sec");
                                            }
                                        },
                                        function (e) {
                                            setAudioPosition("Error: " + e);
                                        }
                                    );
                                }, 1000);
                            }
                        }

                        playAudio('http://soundfxnow.com/soundfx/futuresoundfx-14.mp3');
                    }
                })
            }, 5000);
        }
    });
}());