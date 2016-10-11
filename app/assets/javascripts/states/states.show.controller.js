(function(){
    'use strict';

    function StatesShowController($stateParams, BreweryFactory) {

        var vm = this;

        activate();

        function activate() {
            stateName($stateParams);
        };

        function stateName($stateParams) {
            var stateLettersArray = $stateParams.state.split('');
            var firstLetterUpperCase = stateLettersArray[0].toUpperCase();
            stateLettersArray[0] = firstLetterUpperCase;
            return vm.stateName = stateLettersArray.join('')
        };

        // get the Breweries
        // filter the Breweries
        // set the Breweries and ng-repeat in state.html

    };

    angular
        .module('app')
        .controller('StatesShowController', StatesShowController);


}());