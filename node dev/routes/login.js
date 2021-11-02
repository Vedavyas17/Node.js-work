// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
var http = require('follow-redirects').http;
// const cors = require('cors');
// var fs = require('fs');
const parser = require('xml-js');
const jwt = require('jsonwebtoken');

let loginStatus;
const user = 'abaper'
const pass = 'abap@123'

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const base64 = require("base-64");

router.use(express.urlencoded());
router.use(express.json());


//Login Route
router.post('/users/login', (req, res) => {
	var loptions = {
		'method': 'POST',
		'port': 8000,
		'host': 'solman.kaartech.com',
		'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_login_new/100/zws_login_new/zws_login_new',
		'headers': {
			'Content-Type': 'text/xml',
			'Authorization': 'Basic ' + base64.encode(user + ':' + pass)
		},
		'maxRedirects': 20
	};
	const username = req.body.name;
	const password = req.body.password;
	const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
	<soapenv:Header/>
	<soapenv:Body>
	   <urn:ZFM_LOGIN>
		  <PASSWORD>${password}</PASSWORD>
		  <USERNAME>${username}</USERNAME>
	   </urn:ZFM_LOGIN>
	</soapenv:Body>
 </soapenv:Envelope>`;
	const req1 = http.request(loptions, function (res1) {
		const chunks = [];

		res1.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res1.on("end", function (chunk) {
			const body = Buffer.concat(chunks);
			const xml = body.toString();
			const data = parser.xml2json(xml, { compact: true, spaces: 4 });
			const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZFM_LOGINResponse']['BAPIRETURN'];
			loginStatus = resp['TYPE']['_text'];
			//console.log(loginStatus);
			console.log(username);
			if (loginStatus === 'E') {
				res.sendStatus(401);
				//res.send(JSON.stringify("User not found"));
				console.log('failure');
			} else {


				console.log('success');
				//res.send(JSON.stringify("User found"))
				var token = jwt.sign({ userID: username }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
				res.send({ token });
			}
		});

		res1.on("error", function (error) {
			console.error(error);
		});
	});

	req1.write(postData);

	req1.end();



});
// app.listen(8000, () => {
// 	console.log('Reading on port ', 8000);
// })
module.exports = router;