/// <reference path="../kendo/js/jquery.min.js" />

(function () {
    document.addEventListener("deviceready", function () {
        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            initial: "home-view",
            //transition: "slide"s
        });

        $("#cars").on("click", "div", function ($e) {
            console.log($e.currentTarget.children[0].src);
            app.navigate("views/singleAdView.html");
        });

        window.everlive = new Everlive("84Kc0v5WmmEQxXDe");

        window.listView = kendo.observable({
            addImage: function () {
                var success = function (data) {

                    window.everlive.Files.create({
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                        ContentType: "image/jpeg",
                        base64: data
                    },
                        function (picData) {
                            window.everlive.data('GeopPic').create({
                                'Pic': picData.result.Id,
                                'Location': 'pesho'
                            },
                                function () {
                                    navigator.notification.alert("Your ad has been added successfully!");
                                }).then(loadPhotos)
                        }, error);
                };
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

        var app = new kendo.mobile.Application(document.body, {
            skin: "flat"
        });

        function checkForConnection() {
            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                return false;
            }

            return true;
        }

        function loadNewViewFunction(){
            console.log("pesho");
        }

        function loadPhotos() {
            var hasConnection = checkForConnection();
            if (!hasConnection) {
                navigator.notification.alert("No internet connection. Please, provide connection and try again.");
            }

            window.everlive.data('GeopPic').get()
                .then(function (data) {
                    var files = [];
                    data.result.forEach(function (file) {
                        $.ajax({
                            type: "GET",
                            url: 'http://api.everlive.com/v1/84Kc0v5WmmEQxXDe/Files/' + file.Pic,
                            //headers: { "Authorization" : "Bearer your-access-token-here" },
                            contentType: "application/json",
                        }).then(function (picData) {
                            files.push({
                                'imageUrl': picData.Result.Uri,
                                'location': file.Location
                            });
                        })
                            .then(function () {
                                $("#cars").kendoMobileListView({
                                    dataSource: files,
                                    template:
                                        "<div id=\"eachItem\">" +
                                            "<img src='#= data.imageUrl #'>" +
                                            "<div id=\"data\">Model: #= data.location #</div>" +
                                        "</div>"
                                });
                            });
                    });
                });
        }
        loadPhotos();
    });
}());