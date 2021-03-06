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
