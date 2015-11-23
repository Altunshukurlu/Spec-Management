'use strict';

// Configuring the Projects module
angular.module('projects').run(['Menus',
  function (Menus) {
    // Add the projects dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Projects',
      state: 'projects',
      position: 0,
      type: 'dropdown',
      roles: ['*']
    });

    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'List Projects',
      state: 'projects.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'projects', {
      title: 'Create Projects',
      state: 'projects.create'
    });
  }
]);
