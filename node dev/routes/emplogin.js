// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
var http = require('follow-redirects').http;
// const cors = require('cors');
// var fs = require('fs');
const parser = require('xml-js');
const jwt = require('jsonwebtoken');

let loginStatus;
const user = 'pouser'
const pass = 'Tech@2021'

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const base64 = require("base-64");

router.use(express.urlencoded());
router.use(express.json());

//Login Route
router.post('/employee/login', (req, res) => {
	var loptions = {
		'method': 'POST',
		'port': 50000,
		'host': 'dxktpipo.kaarcloud.com',
		'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EMP_LOGIN_veda&receiverParty=&receiverService=&interface=SI_EMP_LOGIN_veda&interfaceNamespace=http://vedaportal.com/emplogin',
		'headers': {
			'Content-Type': 'text/xml',
			'Authorization': 'Basic ' + base64.encode(user + ':' + pass)
		},
		'maxRedirects': 20
	};
	const employeeid = req.body.employeeid;
	const password = req.body.password;
	const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
	<soapenv:Header/>
	<soapenv:Body>
	   <urn:ZBAPI_EMP_LOGIN_VEDA>
		  <!--You may enter the following 2 items in any order-->
		  <EMPLOYEE_ID>${employeeid}</EMPLOYEE_ID>
		  <PASSWORD>${password}</PASSWORD>
	   </urn:ZBAPI_EMP_LOGIN_VEDA>
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
			const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:ZBAPI_EMP_LOGIN_VEDA.Response']['BAPIRETURN'];
			loginStatus = resp['TYPE']['_text'];
			console.log(loginStatus);
			// if(loginStatus === 'S'){//added
			// var obj = {"output":"success"}//added
			// res.send(obj);}//added

			// console.log(employeeid);//added
			if (loginStatus === 'E') {
				res.sendStatus(401);
				// var obj1 = {"output":"failure"}//added
			    // res.send(obj1);//added
				//res.send(JSON.stringify("User not found"));
				console.log('failure');
			} 
			else {


				console.log('success');
				
				var token = jwt.sign({ userID: employeeid }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
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