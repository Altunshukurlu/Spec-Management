'use strict';

describe('Evidences E2E Tests:', function () {
  describe('Test evidences page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/evidences');
      expect(element.all(by.repeater('evidence in evidences')).count()).toEqual(0);
    });
  });
});
