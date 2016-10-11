(function(){
  
  'use strict';

  angular
      .module('app', ['ui.router', 'templates', 'Devise', 'ngMessages'])
      .config(function($httpProvider) {
          // for CSRF token sent back to Rails
          $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
      });
      
}());