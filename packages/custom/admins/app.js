'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var path = require('path');
var express = require('express');
var Admins = new Module('admins');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Admins.register(function(app, auth, database, circles) {
  var userModel = database.connection.model('User');
  userModel.schema.add({
    categories:{
      type: Array,
      default: []
    },
    series:{
      type: Array,
      default: []
    }
  });

  //We enable routing. By default the Package Object is passed to the routes
  Admins.routes(app, auth, database, circles);
  app.use('/static', express.static(path.join(__dirname, '/../../../files/uploads')));
  //We are adding a link to the main menu for all authenticated users
  Admins.menus.add({
    title: 'category',
    link: 'category',
    roles: ['admin'],
    menu: 'admin'
  });
  Admins.menus.add({
    title: 'series',
    link: 'series',
    roles: ['admin'],
    menu: 'admin'
  });
  Admins.menus.add({
    title: 'post',
    link: 'post',
    roles: ['admin'],
    menu: 'admin'
  });
  Admins.menus.add({
    title: 'publish',
    link: 'post publish',
    roles: ['admin'],
    menu: 'admin'
  });
  Admins.menus.add({
    title: 'access for user',
    link: 'access for user index',
    roles: ['admin'],
    menu: 'admin'
  })
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Admins.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Admins.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Admins.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Admins;
});
