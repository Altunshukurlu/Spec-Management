'use strict';

// Configuring the Arguments module
angular.module('arguments').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Arguments',
      state: 'arguments',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'arguments', {
      title: 'List Arguments',
      state: 'arguments.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'arguments', {
      title: 'Create Arguments',
      state: 'arguments.create'
    });
  }
]);
