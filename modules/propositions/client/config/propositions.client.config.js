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
