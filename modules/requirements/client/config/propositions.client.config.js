'use strict';

// Configuring the Articles module
angular.module('propositions').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Requirements',
      state: 'requirements',
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'requirements', {
      title: 'Propositions',
      state: 'requirements.propositions'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'requirements', {
      title: 'Things',
      state: 'requirements.things'
    });
  }
]);
