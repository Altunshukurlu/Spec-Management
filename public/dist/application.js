'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(["$rootScope", "$state", "Authentication", function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('forbidden');
        } else {
          $state.go('authentication.signin').then(function () {
            storePreviousState(toState, toParams);
          });
        }
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    storePreviousState(fromState, fromParams);
  });

  // Store previous state
  function storePreviousState(state, params) {
    // only store this state if it shouldn't be ignored 
    if (!state.data || !state.data.ignoreState) {
      $state.previous = {
        state: state,
        params: params,
        href: $state.href(state, params)
      };
    }
  }
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('defeaters');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('evidences');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('evidencetypes');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('inferencerules');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('judgements');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('projects');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('propcreators');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('propositions');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('things');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
]);

'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state',
  'Authentication', 'Menus', 'ProjectFactory',
  function($scope, $state, Authentication, Menus, ProjectFactory) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function() {
      $scope.isCollapsed = false;
    });

    $scope.projectIsSet = function() {
      return ProjectFactory.getProjId() !== '';
    };
  }
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);

'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('core')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
  }]);

'use strict';

angular.module('core').factory('authInterceptor', ['$q', '$injector',
  function ($q, $injector) {
    return {
      responseError: function(rejection) {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              $injector.get('$state').transitionTo('authentication.signin');
              break;
            case 403:
              $injector.get('$state').transitionTo('forbidden');
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['user', 'admin'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        if(!user) {
          return false;
        }
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.state, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === menuItemState) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar', {
      roles: ['*']
    });
  }
]);

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

'use strict';

// Configuring the Defeaters module
angular.module('defeaters').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Defeaters',
      state: 'defeaters',
      position: 3,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'defeaters', {
      title: 'List Defeaters',
      state: 'defeaters.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'defeaters', {
      title: 'Create Defeaters',
      state: 'defeaters.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('defeaters').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('defeaters', {
        abstract: true,
        url: '/defeaters',
        template: '<ui-view/>'
      })
      .state('defeaters.list', {
        url: '',
        templateUrl: 'modules/defeaters/client/views/list-defeater.client.view.html'
      })
      .state('defeaters.create', {
        url: '/create',
        templateUrl: 'modules/defeaters/client/views/create-defeater.client.view.html'
      })
      .state('defeaters.view', {
        url: '/:defeaterId',
        templateUrl: 'modules/defeaters/client/views/view-defeater.client.view.html'
      })
      .state('defeaters.edit', {
        url: '/:defeaterId/edit',
        templateUrl: 'modules/defeaters/client/views/edit-defeater.client.view.html'
      });
  }
]);


'use strict';

// Defeaters controller
angular.module('defeaters').controller('DefeatersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Defeaters',
  function ($scope, $stateParams, $location, Authentication, Defeaters) {
    $scope.authentication = Authentication;

    // Create new defeater
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'defeaterForm');

        return false;
      }

      // Create new Defeaters object
      var defeater = new Defeaters({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      defeater.$save(function (response) {
        $location.path('defeaters/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing defeater
    $scope.remove = function (defeater) {
      if (defeater) {
        defeater.$remove();
        for (var i in $scope.defeater) {
          if ($scope.defeaters[i] === defeater) {
            $scope.defeaters.splice(i, 1);
          }
        }
      } else {
        $scope.defeater.$remove(function () {
          $location.path('defeaters');
        });
      }
    };

    // Update existing Defeater
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'defeaterForm');

        return false;
      }

      var defeater = $scope.defeater;

      defeater.$update(function () {
        $location.path('defeaters/' + defeater._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Defeaters
    $scope.find = function () {
      $scope.defeaters = Defeaters.query();
    };

    // Find existing Defeaters
    $scope.findOne = function () {
      $scope.defeater = Defeaters.get({
        defeaterId: $stateParams.defeaterId
      });
    };
  }
]);

'use strict';

//Defeaters service used for communicating with thearguments REST endpoints
angular.module('defeaters').factory('Defeaters', ['$resource',
  function ($resource) {
    return $resource('api/defeaters/:defeaterId', {
      defeaterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

// Configuring the Evidences module
angular.module('evidences').run(['Menus',
  function (Menus) {
    // Add the evidences dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Evidences',
      state: 'evidences',
      position: 3,
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'evidences', {
      title: 'List Evidences',
      state: 'evidences.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'evidences', {
      title: 'Create Evidence',
      state: 'evidences.create',
      //roles: ['user']
    });
  }
]);

'use strict';

// Setting up route
angular.module('evidences').config(['$stateProvider',
  function ($stateProvider) {
    // Evidences state routing
    $stateProvider
      .state('evidences', {
        abstract: true,
        url: '/evidences',
        template: '<ui-view/>'
      })
      .state('evidences.list', {
        url: '',
        templateUrl: 'modules/evidences/client/views/list-evidences.client.view.html'
      })
      .state('evidences.create', {
        url: '/create',
        templateUrl: 'modules/evidences/client/views/create-evidence.client.view.html',
        //data: {
        //  roles: ['user', 'admin']
        //}
      })
      .state('evidences.view', {
        url: '/:evidenceId',
        templateUrl: 'modules/evidences/client/views/view-evidence.client.view.html'
      })
      .state('evidences.edit', {
        url: '/:evidenceId/edit',
        templateUrl: 'modules/evidences/client/views/edit-evidence.client.view.html',
        //data: {
        //  roles: ['user', 'admin']
        //}
      });
  }
]);

'use strict';

// Evidences controller
angular.module('evidences').controller('EvidencesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'EvidenceFactory',
  'ProjectFactory', 'EvidencetypeFactory',
  function($scope, $stateParams, $location, Authentication, EvidenceFactory,
    ProjectFactory, EvidencetypeFactory) {
    $scope.authentication = Authentication;
    $scope.projectId = ProjectFactory.getProjId();
    $scope.types = EvidencetypeFactory.evidencetype.query();

    // Create new Evidence
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }
      // Create new Evidence object
      var evidence = new EvidenceFactory.evidence({
        title: this.title,
        content: this.content,
        etype: this.selectedType._id,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      evidence.$save(function(response) {
        $location.path('evidences/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Evidence
    $scope.remove = function(evidence) {
      if (evidence) {
        evidence.$remove();

        for (var i in $scope.evidences) {
          if ($scope.evidences[i] === evidence) {
            $scope.evidences.splice(i, 1);
          }
        }
      } else {
        $scope.evidence.$remove(function() {
          $location.path('evidences');
        });
      }
    };

    // Update existing Evidence
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');
        return false;
      }

      var evidence = $scope.evidence;
      var typeId = '';
      if (this.selectedType) {
        typeId = this.selectedType._id;
      } else {
        typeId = this.evidence.etype._id;
      }
      evidence.etype = typeId;

      evidence.$update(function() {
        $location.path('evidences/' + evidence._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Evidences
    $scope.find = function() {
      $scope.evidences = EvidenceFactory.project.query({
        projectId: ProjectFactory.getProjId()
      });
    };

    // Find existing Evidence
    $scope.findOne = function() {
      $scope.evidence = EvidenceFactory.evidence.get({
        evidenceId: $stateParams.evidenceId
      }, function() {
        //console.log($scope.evidence.project);
      });
    };
  }
]);

'use strict';

//Evidences service used for communicating with the evidences REST endpoints
angular.module('evidences').factory('EvidenceFactory', ['$resource',
  function($resource) {
    return {
      evidence: $resource('api/evidences/:evidenceId', {
        evidenceId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/evidences/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

'use strict';

// Configuring the Evidencetypes module
angular.module('evidencetypes').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Evidence Types',
      state: 'evidencetypes',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'evidencetypes', {
      title: 'List Evidence Types',
      state: 'evidencetypes.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'evidencetypes', {
      title: 'Create Evidence Types',
      state: 'evidencetypes.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('evidencetypes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('evidencetypes', {
        abstract: true,
        url: '/evidencetypes',
        template: '<ui-view/>'
      })
      .state('evidencetypes.list', {
        url: '',
        templateUrl: 'modules/evidencetypes/client/views/list-evidencetypes.client.view.html'
      })
      .state('evidencetypes.create', {
        url: '/create',
        templateUrl: 'modules/evidencetypes/client/views/create-evidencetype.client.view.html'
      })
      .state('evidencetypes.view', {
        url: '/:evidencetypeId',
        templateUrl: 'modules/evidencetypes/client/views/view-evidencetype.client.view.html'
      })
      .state('evidencetypes.edit', {
        url: '/:evidencetypeId/edit',
        templateUrl: 'modules/evidencetypes/client/views/edit-evidencetype.client.view.html'
      });
  }
]);

'use strict';

// Evidencetypes controller
angular.module('evidencetypes').controller('EvidencetypesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'EvidencetypeFactory',
  function($scope, $stateParams, $location, Authentication,
    EvidencetypeFactory) {
    $scope.authentication = Authentication;
    $scope.types = EvidencetypeFactory.evidencetype.query();

    // Create new evidencetype
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity',
          'evidencetypeForm');

        return false;
      }

      // Create new Evidencetypes object
      var evidencetype = new EvidencetypeFactory.evidencetype({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      evidencetype.$save(function(response) {
        $location.path('evidencetypes/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing evidencetype
    $scope.remove = function(evidencetype) {
      if (evidencetype) {
        evidencetype.$remove();
        for (var i in $scope.evidencetype) {
          if ($scope.evidencetypes[i] === evidencetype) {
            $scope.evidencetypes.splice(i, 1);
          }
        }
      } else {
        $scope.evidencetype.$remove(function() {
          $location.path('evidencetypes');
        });
      }
    };

    // Update existing Evidencetype
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity',
          'evidencetypeForm');
        return false;
      }

      var evidencetype = $scope.evidencetype;

      evidencetype.$update(function() {
        $location.path('evidencetypes/' + evidencetype._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Evidencetypes
    $scope.find = function() {
      $scope.evidencetypes = EvidencetypeFactory.evidencetype.query();
    };

    // Find existing Evidencetypes
    $scope.findOne = function() {
      $scope.evidencetype = EvidencetypeFactory.evidencetype.get({
        evidencetypeId: $stateParams.evidencetypeId
      });
    };
  }
]);

'use strict';

//Evidencetypes service used for communicating with the evidencetypes REST endpoints
angular.module('evidencetypes').factory('EvidencetypeFactory', ['$resource',
  function($resource) {
    return {
      evidencetype: $resource('api/evidencetypes/:evidencetypeId', {
        evidencetypeId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
]);

'use strict';

// Configuring the Inferencerules module
angular.module('inferencerules').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Inference Rules',
      state: 'inferencerules',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'inferencerules', {
      title: 'List Inference Rules',
      state: 'inferencerules.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'inferencerules', {
      title: 'Create Inference Rule',
      state: 'inferencerules.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('inferencerules').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('inferencerules', {
        abstract: true,
        url: '/inferencerules',
        template: '<ui-view/>'
      })
      .state('inferencerules.list', {
        url: '',
        templateUrl: 'modules/inferencerules/client/views/list-inferencerules.client.view.html'
      })
      .state('inferencerules.create', {
        url: '/create',
        templateUrl: 'modules/inferencerules/client/views/create-inferencerule.client.view.html'
      })
      .state('inferencerules.view', {
        url: '/:inferenceruleId',
        templateUrl: 'modules/inferencerules/client/views/view-inferencerule.client.view.html'
      })
      .state('inferencerules.edit', {
        url: '/:inferenceruleId/edit',
        templateUrl: 'modules/inferencerules/client/views/edit-inferencerule.client.view.html'
      });
  }
]);

'use strict';

// Inferencerules controller
angular.module('inferencerules').controller('InferencerulesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'InferenceruleFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication, InferenceruleFactory,
    ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new inferencerule
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'inferenceruleForm');

        return false;
      }

      // Create new Inferencerules object
      var inferencerule = new InferenceruleFactory.inferencerule({
        title: this.title,
        premise: this.premise,
        conclusion: this.conclusion,
        content: this.content,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      inferencerule.$save(function(response) {
        $location.path('inferencerules/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.premise = '';
        $scope.conclusion = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing inferencerule
    $scope.remove = function(inferencerule) {
      if (inferencerule) {
        inferencerule.$remove();
        for (var i in $scope.inferencerule) {
          if ($scope.inferencerules[i] === inferencerule) {
            $scope.inferencerules.splice(i, 1);
          }
        }
      } else {
        $scope.inferencerule.$remove(function() {
          $location.path('inferencerules');
        });
      }
    };

    // Update existing Inferencerule
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'inferenceruleForm');
        return false;
      }

      var inferencerule = $scope.inferencerule;

      inferencerule.$update(function() {
        $location.path('inferencerules/' + inferencerule._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Inferencerules
    $scope.find = function() {
      $scope.inferencerules = InferenceruleFactory.project.query({
        projectId: ProjectFactory.getProjId()
      }, function() {});
    };

    // Find existing Inferencerules
    $scope.findOne = function() {
      $scope.inferencerule = InferenceruleFactory.inferencerule.get({
        inferenceruleId: $stateParams.inferenceruleId
      });
    };
  }
]);

'use strict';

//Inferencerules service used for communicating with the inferencerules REST endpoints
angular.module('inferencerules').factory('InferenceruleFactory', ['$resource',
  function($resource) {
    return {
      inferencerule: $resource('api/inferencerules/:inferenceruleId', {
        inferenceruleId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/inferencerules/project/:projectId', {
        projectID: '@_id'
      })
    };
  }
]);




'use strict';

// Setting up route
angular.module('judgements').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('judgements', {
        abstract: true,
        url: '/judgements',
        template: '<ui-view/>'
      })
      .state('judgements.list', {
        url: '',
        templateUrl: 'modules/judgements/client/views/list-judgement.client.view.html'
      })
      .state('judgements.create', {
        url: '/create',
        templateUrl: 'modules/judgements/client/views/create-judgement.client.view.html'
      })
      .state('judgements.view', {
        url: '/:judgementId',
        templateUrl: 'modules/judgements/client/views/view-judgement.client.view.html'
      })
      .state('judgements.edit', {
        url: '/:judgementId/edit',
        templateUrl: 'modules/judgements/client/views/edit-judgement.client.view.html'
      });
      
  }
]);

'use strict';

// Judgements controller
angular.module('judgements').controller('JudgementsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'JudgementFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication,
    JudgementFactory, ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new judgement
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'judgementForm');

        return false;
      }

      // Create new Judgements object
      var judgement = new JudgementFactory.judgement({
        title: this.title,
        content: this.content,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      judgement.$save(function(response) {
        $location.path('judgements/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };



    // Update existing Judgement
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'judgementForm');

        return false;
      }

      var judgement = $scope.judgement;

      judgement.$update(function() {
        $location.path('things/' + judgement._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Things
    $scope.find = function() {
      $scope.judgements = JudgementFactory.project.query({
        project: ProjectFactory.getProjId()
      });
    };

    // Find existing Judgements
    $scope.findOne = function() {
      $scope.judgement = JudgementFactory.judgement.get({
        judgementId: $stateParams.judgementId
      });
    };
  }
]);

'use strict';

//Judgements service used for communicating with the things REST endpoints
angular.module('judgements').factory('JudgementFactory', ['$resource',
  function($resource) {
    return {
      judgement: $resource('api/judgements/:judgementId', {
        judgementId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/judgements/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

'use strict';

// Configuring the Projects module
angular.module('projects').run(['Menus',
  function (Menus) {
    // Add the projects dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Projects',
      state: 'projects',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'List Projects',
      state: 'projects.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'Create Projects',
      state: 'projects.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('projects').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('projects', {
        abstract: true,
        url: '/projects',
        template: '<ui-view/>'
      })
      .state('projects.list', {
        url: '',
        templateUrl: 'modules/projects/client/views/list-project.client.view.html'
      })
      .state('projects.create', {
        url: '/create',
        templateUrl: 'modules/projects/client/views/create-project.client.view.html'
      })
      .state('projects.view', {
        url: '/:projId',
        templateUrl: 'modules/projects/client/views/view-project.client.view.html'
      })
      .state('projects.edit', {
        url: '/:projId/edit',
        templateUrl: 'modules/projects/client/views/edit-project.client.view.html'
      });
  }
]);

'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'ProjectFactory', 
  function($scope, $stateParams, $location, Authentication, ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new project
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'proejctForm');

        return false;
      }

      // Create new Projects object
      var project = new ProjectFactory.project({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      project.$save(function(response) {
        $location.path('projects/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing project
    $scope.remove = function(project) {
      if (project) {
        project.$remove();
        for (var i in $scope.project) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function() {
          // remove project information from service
          ProjectFactory.setCurProject({});
          ProjectFactory.setProjId('');
          $location.path('projects');
        });
      }
    };

    // Update existing Project
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'projectForm');

        return false;
      }

      var project = $scope.project;

      project.$update(function() {
        $location.path('projects/' + project._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Projects
    $scope.find = function() {
      $scope.projects = ProjectFactory.project.query();
    };

    // Find existing Projects
    $scope.findOne = function() {
      $scope.project = ProjectFactory.project.get({
        projId: $stateParams.projId
      }, function() {
        ProjectFactory.setCurProject($scope.project);
        // set the project id for other modules
        ProjectFactory.setProjId($scope.project._id);
      });
    };
  }
]);

'use strict';

//Projects service used for communicating with the projects REST endpoints
angular.module('projects').factory('ProjectFactory', ['$resource',
  function($resource) {
    var curProject = {};
    var projectId = '';
    var setProjIdFunc = function(pId) {
      projectId = pId;
    };
    var getProjIdFunc = function() {
      return projectId;
    };
    var setCurProjectFunc = function(proj) {
      curProject = proj;
    };
    var getCurProjectFunc = function() {
      return curProject;
    };
    return {
      setProjId: setProjIdFunc,
      getProjId: getProjIdFunc,
      setCurProject: setCurProjectFunc,
      getCurProject: getCurProjectFunc,
      project: $resource('api/projects/:projId', {
        projId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
]);

'use strict';

// Configuring the Articles module
angular.module('propcreators').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Creators',
      state: 'propcreators',
      position: 1,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'propcreators', {
      title: 'List Creators',
      state: 'propcreators.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'propcreators', {
      title: 'New Creator',
      state: 'propcreators.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('propcreators').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('propcreators', {
        abstract: true,
        url: '/propcreators',
        template: '<ui-view/>'
      })
      .state('propcreators.list', {
        url: '',
        templateUrl: 'modules/propcreators/client/views/list-propcreator.client.view.html'
      })
      .state('propcreators.create', {
        url: '/create',
        templateUrl: 'modules/propcreators/client/views/create-propcreator.client.view.html'
      })
      .state('propcreators.view', {
        url: '/:propCId',
        templateUrl: 'modules/propcreators/client/views/view-propcreator.client.view.html'
      })
      .state('propcreators.edit', {
        url: '/:propCId/edit',
        templateUrl: 'modules/propcreators/client/views/edit-propcreator.client.view.html'
      });
  }
]);

'use strict';

// Propcreator controller
angular.module('propcreators').controller('PropcreatorsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'PropcreatorFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication,
    PropcreatorFactory, ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new proposition creator
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propCreatorForm');

        return false;
      }

      // Create new Propcreator object
      var propCreator = new PropcreatorFactory.creator({
        title: this.title,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      propCreator.$save(function(response) {
        $location.path('propcreators/' + response._id);

        // Clear form fields
        $scope.title = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Propcreator
    $scope.remove = function(propCreator) {
      if (propCreator) {
        propCreator.$remove();
        for (var i in $scope.propCreators) {
          if ($scope.propCreators[i] === propCreator) {
            $scope.propCreators.splice(i, 1);
          }
        }
      } else {
        $scope.propCreator.$remove(function() {
          $location.path('propcreators');
        });
      }
    };


    // Update existing Propcreator
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propCreatorForm');

        return false;
      }

      var propCreator = $scope.propCreator;

      propCreator.$update(function() {
        $location.path('propcreators/' + propCreator._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Propcreators
    $scope.find = function() {
      $scope.propCreators = PropcreatorFactory.project.query({
        projectId: ProjectFactory.getProjId()
      });
    };

    // Find existing Propcreators
    $scope.findOne = function() {
      $scope.propCreator = PropcreatorFactory.creator.get({
        propCId: $stateParams.propCId
      });
    };
  }
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('propcreators').factory('PropcreatorFactory', ['$resource',
  function($resource) {
    return {
      creator: $resource('api/propcreators/:propCId', {
        propCId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/propcreators/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

'use strict';

// Configuring the Propositions module
angular.module('propositions').run(['Menus',
  function(Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Propositions',
      state: 'propositions',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'propositions', {
      title: 'List Propositions',
      state: 'propositions.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'propositions', {
      title: 'Create Simple Propositions',
      state: 'propositions.create'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'propositions', {
      title: 'Create Composite Propositions',
      state: 'propositions.create-composite'
    });
  }
]);

'use strict';

// Setting up route
angular.module('propositions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('propositions', {
        abstract: true,
        url: '/propositions',
        template: '<ui-view/>'
      })
      .state('propositions.list', {
        url: '',
        templateUrl: 'modules/propositions/client/views/list-proposition.client.view.html'
      })
      .state('propositions.create', {
        url: '/create',
        templateUrl: 'modules/propositions/client/views/create-proposition.client.view.html'
      })
      .state('propositions.create-composite', {
        url: '/create-composite',
        templateUrl: 'modules/propositions/client/views/create-composite-proposition.client.view.html'
      })
      .state('propositions.view', {
        url: '/:propositionId',
        templateUrl: 'modules/propositions/client/views/view-proposition.client.view.html'
      })
      .state('propositions.view-composite', {
        url: '/composite-proposition/:propositionId',
        templateUrl: 'modules/propositions/client/views/view-composite-proposition.client.view.html'
      })
      .state('propositions.edit', {
        url: '/:propositionId/edit',
        templateUrl: 'modules/propositions/client/views/edit-proposition.client.view.html'
      })
      .state('propositions.edit-composite', {
        url: '/:propositionId/edit-composite',
        templateUrl: 'modules/propositions/client/views/edit-composite-proposition.client.view.html'
      });
  }
]);

'use strict';

// Propositions controller
angular.module('propositions').controller('PropositionsController', ['$scope',
  '$state', '$stateParams', '$location', 'Authentication', 'ProjectFactory',
  'PropositionFactory', 'ThingFactory', 'PropcreatorFactory',
  'EvidenceFactory', 'JudgementFactory',
  function($scope, $state, $stateParams, $location, Authentication,
    ProjectFactory, PropositionFactory, ThingFactory, PropcreatorFactory,
    EvidenceFactory, JudgementFactory) {
    $scope.authentication = Authentication;
    $scope.projectId = ProjectFactory.getProjId();
    $scope.things = ThingFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.creators = PropcreatorFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.judgements = JudgementFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.evidences = EvidenceFactory.project.query({
      projectId: $scope.projectId
    });


    // Create new proposition
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      // Create new Propositions object
      var proposition = new PropositionFactory.proposition({
        title: this.title,
        type: 'Basic',
        thing: this.selectedThing._id,
        project: $scope.projectId,
        propcreator: this.selectedCreator._id
      });
      if (this.selectedEvidence) {
        proposition.evidences = this.selectedEvidence._id;
      }
      if (this.selectedJudgement) {
        proposition.judgements = this.selectedJudgement._id;
      }
      // Redirect after save
      proposition.$save(function(response) {
        $location.path('propositions/' + response._id);
        $scope.title = '';
        //$scope.selectedThing = null;
        //TODO: add other forms field
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Create new proposition
    $scope.createComposite = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      // Create new Propositions objectG
      var proposition = new PropositionFactory.proposition({
        title: this.title,
        project: ProjectFactory.getProjId(),
        firstProposition: this.selectedFirstProposition._id,
        secondProposition: this.selectedSecondProposition._id,
        type: 'Composite'
          //TODO: add others
      });
      console.log(proposition.title);

      // Redirect after save
      proposition.$save(function(response) {
        $location.path('propositions/' + response._id);
        $scope.title = '';
        //$scope.selectedThing = null;
        //TODO: add other forms field
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing proposition
    $scope.remove = function(proposition) {
      if (proposition) {
        proposition.$remove();
        for (var i in $scope.proposition) {
          if ($scope.propositions[i] === proposition) {
            $scope.propositions.splice(i, 1);
          }
        }
      } else {
        $scope.proposition.$remove(function() {
          $location.path('propositions');
        });
      }
    };

    // Update existing proposition
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      var proposition = $scope.proposition;
      proposition.thing = $scope.selectedThing._id;
      proposition.propcreator = $scope.selectedCreator._id;
      if (typeof(this.selectedEvidence._id) !== 'undefined') {
        proposition.evidences = this.selectedEvidence._id;
      }
      if (typeof(this.selectedJudgement._id) !== 'undefined') {
        proposition.judgements = this.selectedJudgement._id;
      }

      var foundThing = false;
      proposition.$update(function() {
        $location.path('propositions/' + proposition._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Update existing composite proposition
    $scope.updateComposite = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      var proposition = $scope.proposition;
      proposition.firstProposition = $scope.selectedFirstProposition._id;
      proposition.secondProposition = $scope.selectedSecondProposition._id;
      proposition.$update(function() {
        $location.path('propositions/composite-proposition/' +
          proposition._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Find a list of propositions
    $scope.find = function() {
      $scope.propositions = PropositionFactory.project.query({
        projectId: $scope.projectId
      });
    };

    // Find existing Propositions
    $scope.findOne = function() {
      $scope.proposition = PropositionFactory.proposition.get({
        propositionId: $stateParams.propositionId
      }, function(errorResponse) {
        if ($scope.proposition.type === 'Composite') {
          $scope.propositions = PropositionFactory.project.query({
            projectId: $scope.projectId
          });
        }
      });
    };

    $scope.viewPropositionByType = function(proposition) {
      var pId = proposition._id;
      if (proposition.type === 'Composite') {
        $state.go('propositions.view-composite', {
          propositionId: pId
        });
      } else {
        $state.go('propositions.view', {
          propositionId: pId
        });
      }
    };
  }
]);

'use strict';

//Propositions service used for communicating with the propositions REST endpoints
angular.module('propositions').factory('PropositionFactory', ['$resource',
  function($resource) {
    return {
      proposition: $resource('api/propositions/:propositionId', {
        propositionId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/propositions/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

'use strict';

// Configuring the Things module
angular.module('things').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Things',
      state: 'things',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'things', {
      title: 'List Things',
      state: 'things.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'things', {
      title: 'Create Things',
      state: 'things.create'
    });
  }
]);

'use strict';

// Setting up route
angular.module('things').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('things', {
        abstract: true,
        url: '/things',
        template: '<ui-view/>'
      })
      .state('things.list', {
        url: '',
        templateUrl: 'modules/things/client/views/list-thing.client.view.html'
      })
      .state('things.create', {
        url: '/create',
        templateUrl: 'modules/things/client/views/create-thing.client.view.html'
      })
      .state('things.view', {
        url: '/:thingId',
        templateUrl: 'modules/things/client/views/view-thing.client.view.html'
      })
      .state('things.edit', {
        url: '/:thingId/edit',
        templateUrl: 'modules/things/client/views/edit-thing.client.view.html'
      });
  }
]);

'use strict';

// Things controller
angular.module('things').controller('ThingsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'ThingFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication, ThingFactory,
    ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new thing
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'thingForm');

        return false;
      }

      // Create new Things object
      var thing = new ThingFactory.thing({
        title: this.title,
        content: this.content,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      thing.$save(function(response) {
        $location.path('things/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing thing
    $scope.remove = function(thing) {
      if (thing) {
        thing.$remove();
        for (var i in $scope.thing) {
          if ($scope.things[i] === thing) {
            $scope.things.splice(i, 1);
          }
        }
      } else {
        $scope.thing.$remove(function() {
          $location.path('things');
        });
      }
    };

    // Update existing Thing
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'thingForm');
        return false;
      }

      var thing = $scope.thing;

      thing.$update(function() {
        $location.path('things/' + thing._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Things
    $scope.find = function() {
      $scope.things = ThingFactory.project.query({
        projectId: ProjectFactory.getProjId()
      }, function() {});
    };

    // Find existing Things
    $scope.findOne = function() {
      $scope.thing = ThingFactory.thing.get({
        thingId: $stateParams.thingId
      });
    };
  }
]);

'use strict';

//Things service used for communicating with the things REST endpoints
angular.module('things').factory('ThingFactory', ['$resource',
  function($resource) {
    return {
      thing: $resource('api/things/:thingId', {
        thingId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/things/project/:projectId', {
        projectID: '@_id'
      })
    };
  }
]);

'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
]);

'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);

'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);

'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator',
  function ($scope, $stateParams, $http, $location, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

        return false;
      }

      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication', 'PasswordValidator',
  function ($scope, $http, Authentication, PasswordValidator) {
    $scope.user = Authentication.user;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Change user password
    $scope.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture',
      alias: 'newProfilePicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);

'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
  }
]);

'use strict';

angular.module('users')
  .directive('passwordValidator', ['PasswordValidator', function(PasswordValidator) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.requirements = function (password) {
          var status = true;
          if (password) {
            var result = PasswordValidator.getResult(password);
            var requirementsIdx = 0;

            // Requirements Meter - visual indicator for users
            var requirementsMeter = [
              { color: 'danger', progress: '20' },
              { color: 'warning', progress: '40' },
              { color: 'info', progress: '60' },
              { color: 'primary', progress: '80' },
              { color: 'success', progress: '100' }
            ];

            if (result.errors.length < requirementsMeter.length) {
              requirementsIdx = requirementsMeter.length - result.errors.length - 1;
            }

            scope.requirementsColor = requirementsMeter[requirementsIdx].color;
            scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

            if (result.errors.length) {
              scope.popoverMsg = PasswordValidator.getPopoverMsg();
              scope.passwordErrors = result.errors;
              status = false;
            } else {
              scope.popoverMsg = '';
              scope.passwordErrors = [];
              status = true;
            }
          }
          return status;
        };
      }
    };
  }]);

'use strict';

angular.module('users')
  .directive('passwordVerify', [function() {
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ngModel) {
        var status = true;
        scope.$watch(function() {
          var combined;
          if (scope.passwordVerify || ngModel) {
            combined = scope.passwordVerify + '_' + ngModel;
          }
          return combined;
        }, function(value) {
          if (value) {
            ngModel.$validators.passwordVerify = function (password) {
              var origin = scope.passwordVerify;
              return (origin !== password) ? false : true;
            };
          }
        });
      }
    };
  }]);

'use strict';

// Users directive used to force lowercase input
angular.module('users').directive('lowercase', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  };
});

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
]);

'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;
    owaspPasswordStrengthTest.config({
      allowPassphrases       : true,
      maxLength              : 128,
      minLength              : 3,
      minPhraseLength        : 0,
      minOptionalTestsToPass : 0,
    });

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        console.log('password test result:' + result);
        return result;
      },
      getPopoverMsg: function () {
        //var popoverMsg = 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
        var popoverMsg = 'Please enter a password with greater than 3 characters.';
        return popoverMsg;
      }
    };
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
