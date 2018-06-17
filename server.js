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
	
	app.post('/send_form_tootmisseadmed', function (req, res) {
		let transporter = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: 'xxxxx',
				pass: 'xxxxx'
			}
		});

		let mailOptions = {
			from: '"' + req.body.name + '" <' + req.body.email + '>',
			to: 'silvakirsimae@gmail.com', 
			subject: 'Toomisseadmete päring' , 
			text: ' Päringu teema: ' + req.body.subject + '\n Päringu saatis: ' + req.body.email + '\n Sõnum: \n\n' + req.body.message,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.send('Midagi läks valesti, palun  proovige uuesti');
			} else {
				res.send('Sõnum saadetud, vastame teile peagi');
			}
		});
	});



	app.listen(port, function() {
		console.log('Server is running at port: ',port);
	});
	







