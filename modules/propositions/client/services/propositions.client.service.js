'use strict';

//Propositions service used for communicating with the propositions REST endpoints
angular.module('propositions').factory('Propositions', ['$resource',
  function ($resource) {
    return $resource('api/propositions/:propositionId', {
      propositionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('propositions').factory('Things', ['$resource',
  function ($resource) {
    return $resource('api/things/:thingsId', {
      thingsId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('propositions').factory('Propcreators', ['$resource',
  function ($resource) {
    return $resource('api/propcreators/:propCId', {
      propCId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('propositions').factory('Evidences', ['$resource',
  function ($resource) {
    return $resource('api/evidences/:evidenceId', {
      evidenceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('propositions').factory('Judgements', ['$resource',
  function ($resource) {
    return $resource('api/judgements/:judgementId', {
      judgementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
