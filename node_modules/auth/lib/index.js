var structr = require("structr"),
Worker      = require("./worker"),
ownableModel = require("./mixin/ownableModel");

require("./models");


var Auth = structr({

	/**
	 */

	"__construct": function(options) {
		this.connection = options.connection;
		this.Account    = this.connection.model("accounts");
	},

	/**
	 * logs the user in
	 */

	"login": function(credentials, callback) {
		this.Account.login.apply(this.Account, arguments);
	},

	/**
	 * signs a user up
	 */

	"signup": function() {
		this.Account.signup.apply(this.Account, arguments);
	}


});

exports.access  = require("./access");

exports.connect = function(options) {
	return new Auth(options);
}

/**
 * mixin for mongoose schemas
 */

exports.ownable = function(model) {
	return ownableModel(model);
}