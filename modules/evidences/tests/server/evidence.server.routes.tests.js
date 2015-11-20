'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Evidence = mongoose.model('Evidence'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, evidence;

/**
 * Evidence routes tests
 */
describe('Evidence CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new evidence
    user.save(function () {
      evidence = {
        title: 'Evidence Title',
        content: 'Evidence Content'
      };

      done();
    });
  });

  it('should be able to save an evidence if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new evidence
        agent.post('/api/evidences')
          .send(evidence)
          .expect(200)
          .end(function (evidenceSaveErr, evidenceSaveRes) {
            // Handle evidence save error
            if (evidenceSaveErr) {
              return done(evidenceSaveErr);
            }

            // Get a list of evidences
            agent.get('/api/evidences')
              .end(function (evidencesGetErr, evidencesGetRes) {
                // Handle evidence save error
                if (evidencesGetErr) {
                  return done(evidencesGetErr);
                }

                // Get evidences list
                var evidences = evidencesGetRes.body;

                // Set assertions
                (evidences[0].user._id).should.equal(userId);
                (evidences[0].title).should.match('Evidence Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an evidence if not logged in', function (done) {
    agent.post('/api/evidences')
      .send(evidence)
      .expect(403)
      .end(function (evidenceSaveErr, evidenceSaveRes) {
        // Call the assertion callback
        done(evidenceSaveErr);
      });
  });

  it('should not be able to save an evidence if no title is provided', function (done) {
    // Invalidate title field
    evidence.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new evidence
        agent.post('/api/evidences')
          .send(evidence)
          .expect(400)
          .end(function (evidenceSaveErr, evidenceSaveRes) {
            // Set message assertion
            (evidenceSaveRes.body.message).should.match('Title cannot be blank');

            // Handle evidence save error
            done(evidenceSaveErr);
          });
      });
  });

  it('should be able to update an evidence if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new evidence
        agent.post('/api/evidences')
          .send(evidence)
          .expect(200)
          .end(function (evidenceSaveErr, evidenceSaveRes) {
            // Handle evidence save error
            if (evidenceSaveErr) {
              return done(evidenceSaveErr);
            }

            // Update evidence title
            evidence.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing evidence
            agent.put('/api/evidences/' + evidenceSaveRes.body._id)
              .send(evidence)
              .expect(200)
              .end(function (evidenceUpdateErr, evidenceUpdateRes) {
                // Handle evidence update error
                if (evidenceUpdateErr) {
                  return done(evidenceUpdateErr);
                }

                // Set assertions
                (evidenceUpdateRes.body._id).should.equal(evidenceSaveRes.body._id);
                (evidenceUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of evidences if not signed in', function (done) {
    // Create new evidence model instance
    var evidenceObj = new Evidence(evidence);

    // Save the evidence
    evidenceObj.save(function () {
      // Request evidences
      request(app).get('/api/evidences')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single evidence if not signed in', function (done) {
    // Create new evidence model instance
    var evidenceObj = new Evidence(evidence);

    // Save the evidence
    evidenceObj.save(function () {
      request(app).get('/api/evidences/' + evidenceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', evidence.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single evidence with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/evidences/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Evidence is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single evidence which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent evidence
    request(app).get('/api/evidences/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No evidence with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an evidence if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new evidence
        agent.post('/api/evidences')
          .send(evidence)
          .expect(200)
          .end(function (evidenceSaveErr, evidenceSaveRes) {
            // Handle evidence save error
            if (evidenceSaveErr) {
              return done(evidenceSaveErr);
            }

            // Delete an existing evidence
            agent.delete('/api/evidences/' + evidenceSaveRes.body._id)
              .send(evidence)
              .expect(200)
              .end(function (evidenceDeleteErr, evidenceDeleteRes) {
                // Handle evidence error error
                if (evidenceDeleteErr) {
                  return done(evidenceDeleteErr);
                }

                // Set assertions
                (evidenceDeleteRes.body._id).should.equal(evidenceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an evidence if not signed in', function (done) {
    // Set evidence user
    evidence.user = user;

    // Create new evidence model instance
    var evidenceObj = new Evidence(evidence);

    // Save the evidence
    evidenceObj.save(function () {
      // Try deleting evidence
      request(app).delete('/api/evidences/' + evidenceObj._id)
        .expect(403)
        .end(function (evidenceDeleteErr, evidenceDeleteRes) {
          // Set message assertion
          (evidenceDeleteRes.body.message).should.match('User is not authorized');

          // Handle evidence error error
          done(evidenceDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Evidence.remove().exec(done);
    });
  });
});
