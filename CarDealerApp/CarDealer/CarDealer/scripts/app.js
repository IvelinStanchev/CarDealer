/// <reference path="../kendo/js/jquery.min.js" />

(function () {
    document.addEventListener("deviceready", function () {
        window.files = [];

        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            initial: "home-view",
            //transition: "slide"
        });
        
        $("#cars").on("click", "div", function ($e) {            
            var currentAdSrc = $e.currentTarget.children[0].src;
            var currentAd = $.grep(window.files, function (e) {
                return e.imageUrl === currentAdSrc;
            })[0];

            app.navigate("views/singleAdView.html");

            var imageContainer = $(document.createElement('div'));
            imageContainer.attr('id', 'image-container');
            imageContainer.prepend($('<img>', { id: 'ad-image', src: currentAdSrc }));

            var infoContainer = $(document.createElement('div'));
            infoContainer.attr('id', 'info-container');

            $.each(currentAd, function (value, key) {
                var newDiv = $(document.createElement('div'));
                newDiv.attr('id', value);
                newDiv.html(value + ': ' + key);
                newDiv.appendTo(infoContainer);
            });

            var modelContainer = $('.model-container');
            imageContainer.appendTo(modelContainer);
            infoContainer.appendTo(modelContainer);
        });

        window.everlive = new Everlive("84Kc0v5WmmEQxXDe");

        //window.listView = kendo.observable({
        //    addImage: function () {
                
        //    }
        //});

        function checkForConnection() {
            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                return false;
            }

            return true;
        }

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
        loadPhotos();
    });
}());