const bodyParser = require("body-parser");
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

//jwt
function ExtractJwt(req) {
	let token = null;
	if(req.cookies && req.cookies.token) token=req.cookie['token'];
	return token;
}

const opts = {
	jwtFromRequest: ExtractJwt,
	secretOrKey: 'jYPxCagP7cqveqbu'
}
passport.use(new Strategy(opts, function(jwt_payload, done) {
	if(jwt_payload) return done(false, jwt_payload);
	done();
}));
function checkAuth(req, res, next) {
	password.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
		if(jwtError || err) return res.send({error: jwtError || err});
		req.user = decryptToken;
		next();
	})(req, res, next);
}
function createToken(body) {
	return jwt.sign(
			body,
			opts.secretOrKey,
			{expiresIn: '1 day'}
		);
}
//end jwt

module.exports = function(app, db) {

	const urlencodedParser = bodyParser.urlencoded({extended: true});

	app.use(bodyParser.json());
	app.use(cookieParser());

	const Schema = db.Schema;
	const ProductsSchema = new Schema({
		name: {type: String},
		price: {type: Number},
		description: {type: String},
		createdBy: {type: Date}
	},{
		versionKey: false,
		collection: "ProductsCollection" 
	});
	const ProductModel = db.model('ProductsModel', ProductsSchema);

	const UsersSchema = new Schema({
		name: {type: String},
		password: {type: String},
	},{
		versionKey: false,
		collection: "UsersCollection" 
	});
	const UserModel = db.model('UserModel', UsersSchema);



	app.get('/products', (req, res) => {
		ProductModel
		.find({})
		.lean()
		.exec( (err, result) => {
			if(err) {
				res.send("error " + err);
			} else {
				res.send(result);	
			}
			
		});
	});
	app.get('/product/:id', (req, res) => {
		const id = db.Types.ObjectId(req.params.id);
		const details = {'_id': id};
		ProductModel
			.findOne(details)
			.lean()
			.exec( (err, result) => {
				if(err) 
					res.send(err);
				else 
					res.send(result);
			});
	});

	app.post('/product/new', urlencodedParser, (req, res) => {	
		const obj = {
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			createdBy: new Date()
		}
		ProductModel.create(obj, (err, result) => {
			if(err) {
				res.send("ProductModel" + err);
			}
			else{
				res.send(result);
			}
		});
	});

	
	
	app.post('/login', async (req, res) => {
		try {
			let user = await UserModel.findOne({name: {$regex: req.body.name, $options: "i"}}).lean().exec();
			if(user && user.password == req.body.password) {
				const token = createToken({id: user._id, username: user.name});
				res.cookie('token', token, {
					httpOnly: true
				});
				res.status(200).send({message: "User login success", err: false});
			} else {
				return res.status(400).send({message: "User not or password err", err: true});
			}
		} catch (e) {
			console.log("Error login", e);
			res.status(500).send({message: "ERROR"});
		}
	});

/*	app.post('/logout', (req, res) => {
		res.clearCookie('token');
		res.status(200).send({message: 'Logout success'});
	});
*/

};