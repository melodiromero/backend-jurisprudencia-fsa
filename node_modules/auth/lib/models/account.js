var access = require("../access"),
mongoose   = require("mongoose"),
crypto     = require("crypto"),
_          = require("underscore"),
access     = require("../access"),
Schema     = mongoose.Schema,
Token      = require("./token"),
outcome    = require("outcome"),
step       = require("step"); 

/**
 */

var Account = new Schema({

	/**
	 */

	email: { type: String, required: true, index: { unique: true }},

	/**
	 */

	password: { type: String, required: true, set: hashPass },

	/**
	 */

	createdAt: { type: Date, default: Date.now }
});


/**
 * makes this account the owner of the target item. NOT used
 * for querying since mongodb cannot do deep object searching 
 */

Account.methods.ownItem = function(item, acc) {
	var self = this;

	if(!acc) {
		acc = access.all(false);
	}

	if(!(acc instanceof Array)) {
		acc = [acc];
	}


	if(!item.owners.length) {
		acc.push(access.SUPER); //owner
	}

	if(this.isItemOwner(item)) return;

	item.owners.push({
		account: self._id,
		access: acc
	});
}

/**
 */

Account.methods.shareItem = Account.methods.ownItem;

/**
 */

Account.methods.disownItem = function(item) {
	console.log(item.owners.remove);
}

/**
 */

Account.methods.lockdownItem = function(item) {
	item._account = this;
}

/**
 * returns true / false if authorized for the given action
 */

Account.methods.authorized = function(item, access) {

	//MUST 
	return this.isItemOwner(item, access) && (this.token ? this.token.authorized(item, access) : true);
}

/**
 * dead simple flow-control function. Use it like this:
 * if(!user.hasItemAccess(item)) return user.unauthorized(callback);
 */

Account.methods.unauthorized = function(callback) {

	var err = new Error("Unauthorized");


	return arguments.length ? callback(err) : err;
}

/**
 * returns true 
 */

Account.methods.isItemOwner = function(item, acc) {

	if(!acc) acc = access.all(true);
	if(!(acc instanceof Array)) acc = [acc];

	var self = this;
	//first check if the owner exists. If
	return !!_.find(item.owners, function(owner) {
		return String(owner.account) == String(self._id) && 
		!!_.intersection(acc, owner.access).length;
	});
}

/**
 * wraps owner tags around a query
 */

Account.methods.addToSearch = function(query, access) {

	if(arguments.length === 1 && ((typeof query === "string") || (query instanceof Array))) {
		access = query;
		query  = {};
	}

	if(!query) query = {};

	var oaccount,
	oaccess,
	search = {
		"owners.account": this._id,
	}

	//do?
	/*if(!access) {
		access = "SUPER";
	}*/

	//TODO - make 
	if(access) {
		search["owners.access"] = access;
	}

	return _.extend(query, search);
}

/**
 * returns the main account token
 */

Account.methods.getMainToken = function(callback) {
	this.model("tokens").getMainToken(callback);
}

/**
 */

Account.methods.createToken = function(options, callback) {
	this.model("tokens").createToken(this, options, callback);
}

/**
 */

Account.statics.signup = function(acc, callback) {
	var account = new this(acc);
	account.save(callback);
}

/**
 */

Account.statics.login = function(credentials, callback) {
	if(credentials.token) {
		return Token.login(credentials, callback);
	} else {
		this.findOne({ email: credentials.email, password: credentials.password }, on.error(callback).success(function(account) {
			if(!account) return new Error("incorrect username / password");
			callback(null, account);
		}));
	}
}

/**
 */

function hashPass(pass) {
	return crypto.createHash("sha1").update(pass).digest("hex");
}




module.exports = mongoose.model("accounts", Account);