/* Controller for displaying the log in page */

/* The db file and account schema are used for the log in page. */
const db = require('../models/db.js');
const Account = require('../models/account-schema.js');

/* Bcrypt is used to deal with password hashing. */
const bcrypt = require('bcrypt');

const logInController = {
	/**
	 * Gets the log in page.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	getLogIn: function(req, res) {
		if (req.session.username == null) {
			res.render('log-in');
		} else {
			/* If the user is already logged in, redirect them to the home page. */
			res.redirect('/getHome');
		}
	},

	/**
	 * Logs a user into the application.
	 *
	 * @param {Express.Request} req  Object that contains information on the HTTP request from the client.
	 * @param {Express.Response} res  Object that contains information on the HTTP response from the server.
	 */
	 postLogIn: function(req, res) {
		/* Retrieve the username and password from the user input. */
		const username = req.body.loginUsername.trim();
		const password = req.body.loginPassword;

		/* Use the input username for the database query. */
		const query = {username: username};

		/* Retrieve the user's corresponding data from the database. */
		db.findOne(Account, query, '', function(result) {
			if (result) {
				const userDetails = {
					email: result.email,
					name: result.name,
					username: result.username,
					role: result.role,
					password: result.password,
					status: result.status
				};

				/* If the user account has been accepted, proceed to checking their log in credentials. */
				if (userDetails.status == 'Accepted') {
					/* If the entered password matches the password stored in the database, open a session for
					* the user.
					*/
					bcrypt.compare(password, result.password, function(err, equal) {
						if (equal) {
							req.session.username = result.username;
							req.session.role = result.role;

							res.status(200).json('Log in successful');
							res.send();

						/* If the entered password does not match, send an error message. */
						} else {
							res.status(401).json('Incorrect username and/or password');
							res.send();
						}
					});
				} else {
					res.status(401).json('Account not accepted');
					res.send();
				}

			/* If the entered username is not in the database, send an error message. */
			} else {
				res.status(401).json('Incorrect username and/or password');
				res.send();
			}
		});
	}
};

module.exports = logInController;
