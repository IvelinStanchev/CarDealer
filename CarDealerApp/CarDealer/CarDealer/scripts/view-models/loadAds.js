(function () {
    window.LoadPhotos = function () {
        var NO_INTERNET_CONNECTION_MESSAGE = 'No internet connection. Please, provide connection and try again.';
        var TYPES_NAME_DATABASE = 'CarDealer';
        var API_KEY_DATABASE = '84Kc0v5WmmEQxXDe';

        var hasConnection = window.CheckForConnection();
        if (!hasConnection) {
            navigator.notification.alert(NO_INTERNET_CONNECTION_MESSAGE);
        }

        window.files = [];
        window.everlive.data(TYPES_NAME_DATABASE).get()
            .then(function (data) {
                data.result.forEach(function (file) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://api.everlive.com/v1/' + API_KEY_DATABASE + '/Files/' + file.Pic,
                        contentType: 'application/json',
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