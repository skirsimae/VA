var express = require('express'),
	http = require('http'),
	path = require('path'),
	nodemailer = require('nodemailer'),
	bodyParser = require('body-parser');

	var app = express();
	app.set('view engine', 'ejs');
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	var port = Number(process.env.PORT || 5000);


	app.get('/', (req, res) => {
		res.render('index_estonian');
	});

	app.get('/en', (req, res) =>{
		res.render('index_english');
	});

	app.get('/tootmisseadmed', (req,res) => {
		res.render('tootmisseadmed');
		console.log('Nodemailer reading console log...' + req.url);
	});

	app.get('/sales', (req,res) => {
		res.render('sales');
	});

	app.get('/raamatupidamine', (req,res) => {
		res.render('raamatupidamine');
	});
	
	app.post('/send_form_tootmisseadmed', (req, res) => {
		if(req.body.name == "" || req.body.email == "" || req.body.message == "") {
			res.send("Error: Nimi, Email voi Sonum puudu");
			return false;
		}
		const output = `
			<p>You have a new contact request</p>
			<h3>Contact Details</h3>
			<ul>  
				<li>Name: ${req.body.name}</li>
				<li>Email: ${req.body.email}</li>
			</ul>
			<h3>Teema</h3>
			<p>${req.body.subject}</p>
			<h3>Message</h3>
			<p>${req.body.message}</p>
		`;

		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 25,
			secure: false,
			auth: {
				user: 'silvakirsimae@gmail.com',
				pass: '3SA6jA6P'
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		let mailOptions = {
			from: '"Tootmisseadmete ankeet" <silvakirsimae@gmail.com>',
			to: 'silvakirsimae@gmail.com', 
			subject: 'Toomisseadmete päring' , 
			text: 'Hello World',
			html: output
		};

		transporter.sendMail(mailOptions, (error, response) => {
			if (error) {
				console.log(error);
				res.send("Email could not sent due to error: "+error)
			} else {
				res.send("Email has been sent successfully");
			}
		});
	});

	app.listen(port, function() {
		console.log('Server is running at port: ',port);
	});
	







