'use strict';

// Configuring the Chat module
angular.module('spec').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Spec',
      state: 'spec',
      roles:['*']
    });
  }
]);
