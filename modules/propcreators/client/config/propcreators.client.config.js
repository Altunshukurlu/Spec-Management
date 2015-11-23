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
