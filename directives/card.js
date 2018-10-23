angular.module('cards', [])
    .directive('card', function () {
        return {
            scope: {
                body: '=',
                title: '@',
                picture: '@',
                click: '=',
                id: '@',
            },
            replace: true, 
            restrict:'E',
            transclude: false,
            templateUrl: 'views/shared/card.html'
        }
    });