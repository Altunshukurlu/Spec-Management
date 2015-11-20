'use strict';

// Configuring the Things module
angular.module('things').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Things',
      state: 'things',
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
