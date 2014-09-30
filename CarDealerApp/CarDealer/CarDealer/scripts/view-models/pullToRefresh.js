var app = app || {};
app.viewmodels = app.viewmodels || {};

window.Adding = (function (scope) {
    'use strict';
    var NO_NEWLY_ADS_MESSAGE = 'No newly ads were added.';

    scope.initPullToRefreshScroller = function (e) {
        var scroller = e.view.scroller;

        scroller.setOptions({
            pullToRefresh: true,
            pull: function () {
                window.files = [];
                window.LoadPhotos();
                setTimeout(function () {
                    scroller.pullHandled();
                    $('.newly-ads').html(NO_NEWLY_ADS_MESSAGE);
                }, 400);
            }
        })
    };
}(app.viewmodels));