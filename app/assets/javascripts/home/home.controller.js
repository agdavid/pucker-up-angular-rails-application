(function(){

  'use strict';

  function HomeController($scope, Auth, $state) {

      var vm = this;

      //callable methods on the vm
      vm.signedIn = Auth.isAuthenticated;
      vm.logout = Auth.logout;
      vm.getCurrentUser = getCurrentUser;

      //instantiated info  
      activate();

      //defined methods on the vm
      function activate() {
          getCurrentUser();
      };

      function getCurrentUser() {
          return Auth.currentUser()
                     .then(setCurrentUser);
      };

      function setCurrentUser(user) {
          console.log(user);
          return vm.user = user;
      };

      //event listeners for user authentication and logout
      $scope.$on('devise:new-registration', function(e, user){
          return vm.user = user;
      });
      $scope.$on('devise:login', function(e, user){
          return vm.user = user;
      });
      $scope.$on('devise:logout', function(e, user){
          return vm.user = {};
      });

  };

  angular
      .module('app')
      .controller('HomeController', HomeController);

}());