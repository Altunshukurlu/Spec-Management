'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;
    owaspPasswordStrengthTest.config({
      allowPassphrases       : true,
      maxLength              : 128,
      minLength              : 3,
      minPhraseLength        : 0,
      minOptionalTestsToPass : 0,
    });

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        console.log('password test result:' + result);
        return result;
      },
      getPopoverMsg: function () {
        //var popoverMsg = 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
        var popoverMsg = 'Please enter a password with greater than 3 characters.';
        return popoverMsg;
      }
    };
  }
]);
