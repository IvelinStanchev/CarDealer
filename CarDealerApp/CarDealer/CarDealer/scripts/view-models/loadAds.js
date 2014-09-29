(function () {
    window.LoadPhotos = function () {
        var hasConnection = window.CheckForConnection();
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
                            'id': file.Id,
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
                                                "<p id=\"brand\">Brand: #= data.brand #</p>" +
                                                "<p id=\"model\">Model: #= data.model #</p>" +
                                                "<p id=\"kilometers\">Kilometers: #= data.kilometers #</p>" +
                                                "<p id=\"price\">Price: #= data.price #</p>" +
                                                "<p id=\"#= data.id #\"></p>" +
                                                "<p id=\"information\" allinformation=\"#= data.brand #;#= data.model #;" +
                                                "#= data.fuelType #;#= data.year #;#= data.kilometers #;#= data.price #;" +
                                                "#= data.description #;#= data.name #;#= data.phoneNumber #;#= data.imageUrl #\"" +
                                                "></p>" +
                                        "</div>" +
                                "</div>"
                            });
                        });
                });
            });
    }
}());