(function(){

    'use strict';

    function StatesShowController($stateParams, BreweryFactory, $filter) {
        var vm = this;

        //callable methods on the vm
        vm.stateName = stateName($stateParams);
        vm.getBreweries = getBreweries;

        //instantiated info
        activate();

        //defined methods on the vm
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
            vm.breweries = data; //all breweries
            return vm.filteredList =  $filter('filter')(vm.breweries, vm.stateName) //filtered by state
        };
    };

    angular
        .module('app')
        .controller('StatesShowController', StatesShowController);


}());