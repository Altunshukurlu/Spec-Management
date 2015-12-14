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
