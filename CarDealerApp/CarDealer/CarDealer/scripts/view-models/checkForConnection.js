(function () {
    window.CheckForConnection = function () {
        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            return false;
        }

        return true;
    }
}());