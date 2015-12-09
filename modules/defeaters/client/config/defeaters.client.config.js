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
