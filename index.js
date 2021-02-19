const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport');
const ejsMate = require('ejs-mate');
const LocalStrategy = require('passport-local');
const sessionConfig = {
	secret: 'thisnotagoodsecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static('public'));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
// passsport session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// mongoose connection
mongoose.connect('mongodb://localhost:27017/pasportAuth', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
const DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'Connection error'));
DB.once('open', () => {
	console.log('DATABASE CONNECTED');
});
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});
app.use('/products', productsRoutes);
app.use('/', userRoutes);
app.get('/', (req, res) => {
	res.render('home/home');
});

app.listen(3000, () => {
	console.log('App listenning on port 3000');
});
