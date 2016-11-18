(function () {
    'use strict';

    var SCREENS = {
        splash: 'splash-screen',
        accounts: 'accounts-screen',
        main: 'main-screen'
    };

    function HomeController($scope, $window, events, constants,
                            dialogService, applicationContext, notificationService) {
        function isTestnet() {
            return constants.NETWORK_NAME === 'devel';
        }

        var home = this;
        home.screen = SCREENS.splash;
        home.isTestnet = isTestnet;
        home.featureUnderDevelopment = featureUnderDevelopment;
        home.logout = logout;

        var titlePrefix = isTestnet() ? 'TESTNET ' : '';
        home.title = titlePrefix + 'Lite Client';
        home.version = constants.CLIENT_VERSION;

        $scope.$on(events.SPLASH_COMPLETED, function () {
            home.screen = SCREENS.accounts;
        });

        $scope.clipboardOk = function (message) {
            message = message || 'Address copied successfully';
            notificationService.notice(message);
        };

        $scope.$on(events.LOGIN_SUCCESSFUL, function (event, account) {
            // putting the current account to the app context
            applicationContext.account = account;

            home.screen = SCREENS.main;
        });

        function featureUnderDevelopment() {
            dialogService.open('#feat-not-active');
        }

        function logout() {
            $window.location.reload();
        }
    }

    HomeController.$inject = ['$scope', '$window', 'ui.events', 'constants.core',
        'dialogService', 'applicationContext', 'notificationService'];

    angular
        .module('app')
        .controller('homeController', HomeController);
})();
