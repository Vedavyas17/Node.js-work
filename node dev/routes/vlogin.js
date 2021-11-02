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
router.post('/vendor/login', (req, res) => {
	var loptions = {
		'method': 'POST',
		'port': 8000,
		'host': 'solman.kaartech.com',
		'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_vendor_login01/100/zws_vendor_login01/zws_vendor_login01',
		'headers': {
			'Content-Type': 'text/xml',
			'Authorization': 'Basic ' + base64.encode(user + ':' + pass)
		},
		'maxRedirects': 20
	};
	const vendorid = req.body.vendorid;
	const password = req.body.password;
	const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_VENDOR_LOGIN_VED>
          <PASSCODE>${password}</PASSCODE>
          <VENDOR_ID>${vendorid}</VENDOR_ID>
       </urn:ZBAPI_VENDOR_LOGIN_VED>
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
			const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_VENDOR_LOGIN_VEDResponse'];
			loginStatus = resp['FLAG']['_text'];
			//console.log(loginStatus);
			console.log(vendorid);
			if (loginStatus === 'E') {
				res.sendStatus(401);
				//res.send(JSON.stringify("User not found"));
				console.log('failure');
			} else {


				console.log('success');
				//res.send(JSON.stringify("User found"))
				var token = jwt.sign({ userID: vendorid }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
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