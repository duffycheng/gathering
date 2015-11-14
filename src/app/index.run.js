(function() {
  'use strict';

  angular
    .module('gathering')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
