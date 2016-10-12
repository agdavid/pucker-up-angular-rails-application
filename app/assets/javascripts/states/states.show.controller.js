(function(){
    'use strict';

    function StatesShowController($stateParams, BreweryFactory, $filter) {

        var vm = this;
        vm.stateName = stateName($stateParams);
        vm.getBreweries = getBreweries;

        activate();

        function activate() {
            getBreweries();
        };

        function stateName($stateParams) {
            //this function covers the case of a user directly typing '/states/colorado' rather than '/states/Colorado'
            var stateLettersArray = $stateParams.state.split(''); //split name of state into array
            var firstLetterUpperCase = stateLettersArray[0].toUpperCase(); //transform first letter
            stateLettersArray[0] = firstLetterUpperCase; //replace value in array
            return vm.stateName = stateLettersArray.join('')
        };

        function getBreweries() {
            return BreweryFactory.getBreweries()
                                 .then(setBreweries)
        };

        function setBreweries(data) {
            vm.breweries = data;
            return vm.filteredList =  $filter('filter')(vm.breweries, vm.stateName)
        };

        // get the Breweries
        // filter the Breweries
        // set the Breweries and ng-repeat in state.html

    };

    angular
        .module('app')
        .controller('StatesShowController', StatesShowController);


}());