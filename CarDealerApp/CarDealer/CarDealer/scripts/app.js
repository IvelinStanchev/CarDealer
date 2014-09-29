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

        //$("#cars").on("click", "div", function ($e) {
        //    console.log($e.currentTarget.children[1].lastChild.id);
        //    app.navigate("views/singleAdView.html");

        //    $(".model-container").append("<p>Test</p>");
        //});
        $("#cars").on("click", "div", function ($e) {
            //var currentAdSrc = $e.currentTarget.children[0].src;
            //var currentAd = $.grep(window.files, function (e) {
            //    return e.imageUrl === currentAdSrc;
            //})[0];

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

                //console.log(brand + ';' + model + ';' + fuelType + ';' + year + ';' + kilometers + ';' + price + ';' + description + ';' + name + ';' + phoneNumber + ';' + pictureUri);
                //console.log(allInformationAsString);

                app.navigate("views/singleAdView.html");

                var modelContainer = $('.single-ad-container');
                if (modelContainer.html !== '') {
                    modelContainer.empty();
                }


                //console.log(pictureUri);
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
                //informationContainer.append($('<div>', { id: 'button-container' }).append($('<button>', { id: 'add-contact' }).addClass('add-contact').html('AddContact')));

                var buttonContainer = $(document.createElement('div'));
                buttonContainer.attr('id', 'button-container');
                buttonContainer.append($('<button>', { id: 'add-contact' }).addClass('add-contact').html('AddContact'));

                buttonContainer.children()[0].addEventListener('click', function () {
                    
























                }, false);

                setTimeout(function () {
                    var modelContainer = $('.single-ad-container');

                    imageContainer.appendTo(modelContainer);
                    informationContainer.appendTo(modelContainer);
                    buttonContainer.appendTo(modelContainer);
                }, 100);
            }

            //console.log($e.currentTarget.id);

            //console.log(currentAd);

            //app.navigate("views/singleAdView.html");

            //var imageContainer = $(document.createElement('div'));
            //imageContainer.attr('id', 'image-container');
            //imageContainer.prepend($('<img>', { id: 'ad-image', src: currentAdSrc }));

            //var infoContainer = $(document.createElement('div'));
            //infoContainer.attr('id', 'info-container');

            //$.each(currentAd, function (value, key) {
            //    if (value != 'imageUrl') {
            //        var newDiv = $(document.createElement('div'));
            //        newDiv.attr('id', value);
            //        newDiv.html(value + ': ' + key);
            //        newDiv.appendTo(infoContainer);
            //    }
            //});

            //var modelContainer = $('.model-container');
            //imageContainer.appendTo(modelContainer);
            //infoContainer.appendTo(modelContainer);

            //$('#chosen-car-view').on('click', function () {
            //    modelContainer.empty();
            //    app.navigate('index.html');
            //});
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
        }

        //function loadPhotos() {
        //    var hasConnection = checkForConnection();
        //    if (!hasConnection) {
        //        navigator.notification.alert("No internet connection. Please, provide connection and try again.");
        //    }

        //    window.files = [];
        //    window.everlive.data('CarDealer').get()
        //        .then(function (data) {
        //            data.result.forEach(function (file) {
        //                $.ajax({
        //                    type: "GET",
        //                    url: 'http://api.everlive.com/v1/84Kc0v5WmmEQxXDe/Files/' + file.Pic,
        //                    //headers: { "Authorization" : "Bearer your-access-token-here" },
        //                    contentType: "application/json",
        //                }).then(function (picData) {
        //                    files.push({
        //                        'brand': file.Brand,
        //                        'model': file.Model,
        //                        'fuelType': file.FuelType,
        //                        'year': file.Year,
        //                        'kilometers': file.Kilometers,
        //                        'price': file.Price,
        //                        'description': file.Description,
        //                        'name': file.Name,
        //                        'phoneNumber': file.PhoneNumber,
        //                        'imageUrl': picData.Result.Uri
        //                    });
        //                })
        //                    .then(function () {
        //                        $("#cars").kendoMobileListView({
        //                            dataSource: files,
        //                            template:
        //                                "<div id=\"eachItem\">" +
        //                                        "<img src='#= data.imageUrl #'>" +
        //                                        "<div id=\"eachItemContainer\">" +
        //                                                "<div id=\"brand\">Brand: #= data.brand #</div>" +
        //                                                "<div id=\"model\">Model: #= data.model #</div>" +
        //                                                "<div id=\"kilometers\">Kilometers: #= data.kilometers #</div>" +
        //                                                "<div id=\"price\">Price: #= data.price #</div>" +
        //                                        "</div>" +
        //                                "</div>"
        //                        });
        //                    });
        //            });
        //        });
        //}
        //loadPhotos();

        //console.log(window);

        //window.LoadPhotos();
    });
}());