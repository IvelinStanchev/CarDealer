var app = app || {};
app.viewmodels = app.viewmodels || {};

window.Adding = (function (scope) {
    'use strict';
    scope.initPullToRefreshScroller = function (e) {
        var scroller = e.view.scroller;

        scroller.setOptions({
            pullToRefresh: true,
            pull: function () {
                window.LoadPhotos();
                setTimeout(function () { scroller.pullHandled(); }, 400);
            }
        })
    };
}(app.viewmodels));