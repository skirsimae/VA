var express = require('express'),
	path = require('path'),
	nodeMailer = require('nodemailer'),
	bodyParser = require('body-parser');

	var app = express();
	app.set('view engine', 'ejs');
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	var port = 3000;


	app.get('/', function (req, res) {
		res.render('index_estonian');
	});

	app.get('/en', function (req, res) {
		res.render('index_english');
	});

	app.get('/tootmisseadmed', function (req,res) {
		res.render('tootmisseadmed');
	});

	app.get('/sales', function (req,res) {
		res.render('sales');
	});

	app.get('/raamatupidamine', function (req,res) {
		res.render('raamatupidamine');
	});
	
	app.post('/send-email', function (req, res) {
		let transporter = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: 'silvakirsimae@gmail.com',
				pass: '3SA6jA6P'
			}
		});
		let mailOptions = {
			to: '"Silva" <silvakirsimae@gmail.com>', // sender address
			from: req.body.from, // list of receivers
			subject: req.body.subject, // Subject line
			text: req.body.body, // plain text body
			html: '<b>NodeJS Email Tutorial</b>' // html body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message %s sent: %s', info.messageId, info.response);
				res.render('index');
			});
		});
			app.listen(port, function(){
				console.log('Server is running at port: ',port);
			});
