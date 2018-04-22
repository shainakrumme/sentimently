(function () {
  'use strict';
  angular
      .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = true;
    self.isDisabled    = false;

    // list of state value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    self.submit= submit;

    function newState(state) {
      alert("Shoot us an email at g7250@berkeley.edu and we'll get back to you!");
    }

    function submit(event) {
      $log.info("fuck data....");

      name = this.searchText;
      console.log(this.searchText);
      switch(name){
        case "Donald Trump":
            window.open('https://www.pundit.today/website/federal/executive/donald_trump.php','_self');
            break;
        case "Mike Pence":
            window.open('https://www.pundit.today/website/federal/executive/mike_pence.php','_self');
            break;
        case "Mimi Walters":
            window.open('https://www.pundit.today/website/federal/house/mimi_walters.php','_self');
            break;
        case "Kamala Harris":
            window.open('https://www.pundit.today/website/federal/senate/kamala_harris.php','_self');
            break;
        case "Dianne Feinstein":
            window.open('https://www.pundit.today/website/federal/senate/dianne_feinstein.php','_self');
            break;
        case "Jerry Brown":
            window.open('https://www.pundit.today/website/state/jerry_brown.php','_self');
            break;
        case "John Moorlach":
            window.open('https://www.pundit.today/website/state/john_moorlach.php','_self');
            break;
        case "Melissa Fox":
            window.open('https://www.pundit.today/website/local/Irvine/city_council/melissa_fox.php','_self');
            break;
        case "Don Wagner":
            window.open('https://www.pundit.today/website/local/Irvine/mayor/don_wagner.php','_self');
            break;
      }
            }

    // ****************************
    // Internal methods
    // ****************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build states list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Donald Trump, Mike Pence, Kamala Harris, Dianne Feinstein, Don Wagner, Jerry Brown, Mimi Walters, Don Wagner, Melissa Fox';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          path: "https://www.facebook.com",
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  }
})();


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
