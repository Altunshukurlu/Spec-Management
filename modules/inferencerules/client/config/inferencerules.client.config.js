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
