require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var http = require('follow-redirects').http;
const cors = require('cors');
var fs = require('fs');
const parser = require('xml-js');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');
const errors = require('http-errors');
app = express();

app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());
//Global Variables
let loginStatus;
const use = 'abaper'
const pas = 'abap@123'


//Login Route
app.post('/users/upd',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_custedit&receiverParty=&receiverService=&interface=SI_CUSTEDIT&interfaceNamespace=http://vedaportal/custediting',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021')
        },
        'maxRedirects': 20
    };
    const adrnr=req.body.adrnr;
    const kunnr=req.body.kunnr;
    const name=req.body.name;
    const ort01=req.body.ort01;
    const pstlz=req.body.pstlz;
    const regio=req.body.regio;
    const stras=req.body.stras;
    const telf1=req.body.telf1;
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_PROFILE_EDIT_VYAS>
          <!--You may enter the following 9 items in any order-->
          <ADRNR>${adrnr}</ADRNR>
          <KUNNR>${kunnr}</KUNNR>
          <NAME>${name}</NAME>
          <ORT01>${ort01}</ORT01>
          <PSTLZ>${pstlz}</PSTLZ>
          <REGIO>${regio}</REGIO>
          <STRAS>${stras}</STRAS>
          <TELF1>${telf1}</TELF1>
          <!--Optional:-->
          <IT_KUNNR>
             <!--Zero or more repetitions:-->
             <item>
                <!--Optional:-->
                
             </item>
          </IT_KUNNR>
       </urn:ZBAPI_PROFILE_EDIT_VYAS>
    </soapenv:Body>
 </soapenv:Envelope>
		  `;
    const req1 = http.request(loptions, function (res1) {
        const chunks = [];

 

        res1.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res1.on("end", function (chunk) {
            const body = Buffer.concat(chunks);
            const xml = body.toString();
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:ZBAPI_PROFILE_EDIT_VYAS.Response']['IT_KUNNR']['item']['KUNNR']['_text'];
            //loginStatus = resp['TYPE']['_text'];
            //console.log(username);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
                    console.log(resp);
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(resp);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//Login Route
app.post('/vendor/upd',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_vendedit&receiverParty=&receiverService=&interface=SI_vendedit&interfaceNamespace=http://vedaportal/vendediting',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021')
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_VENDOR_UPDATE_VEDA>
          <!--You may enter the following 9 items in any order-->
          <ADDRESS>${req.body.address}</ADDRESS>
          <CITY>${req.body.city}</CITY>
          <COUNTRY>${req.body.country}</COUNTRY>
          <DISTRICT>${req.body.district}</DISTRICT>
          <FIRSTNAME>${req.body.name1}</FIRSTNAME>
          <LASTNAME>${req.body.name2}</LASTNAME>
          <PINCODE>${req.body.pincode}</PINCODE>
          <TELEPHONE>${req.body.phone}</TELEPHONE>
          <VENDOR_ID>${req.body.vendorid}</VENDOR_ID>
       </urn:ZBAPI_VENDOR_UPDATE_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:ZBAPI_VENDOR_UPDATE_VEDA.Response']['RETURN']['TYPE']['_text'];
            //loginStatus = resp['TYPE']['_text'];
            console.log(resp);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(resp);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//vendor po creation

app.post('/vendor/pocreate',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_po_create01/100/zws_po_create01/zws_po_create01',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_PO_CREATION_VEDA>
          <CCODE>${req.body.ccode}</CCODE>
          <DATE>${req.body.date}</DATE>
          <DELIVERY>${req.body.ddate}</DELIVERY>
          <GROUP>${req.body.group}</GROUP>
          <LOCATION>${req.body.location}</LOCATION>
          <MATERIAL_NO>${req.body.material}</MATERIAL_NO>
          <PLANT>${req.body.plant}</PLANT>
          <PURCHORG>${req.body.porg}</PURCHORG>
          <QUANTITY>${req.body.qty}</QUANTITY>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN>
          <TEXT>${req.body.text}</TEXT>
          <VENDOR_ID>${req.body.vendorid}</VENDOR_ID>
       </urn:ZBAPI_PO_CREATION_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_PO_CREATION_VEDAResponse']['BAPIRET'];
            //loginStatus = resp['TYPE']['_text'];
            //console.log(username);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(obj);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//emp leave create
app.post('/emp/lcreate',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_emp_l_create01/100/zws_emp_l_create01/zws_emp_l_create01',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_EMP_LEAVEREQ_VED>
          <EMPLOYEE_ID>${req.body.employeeid}</EMPLOYEE_ID>
          <!--Optional:-->
 <!--         <ENDTIME>00.00.00</ENDTIME>
 -->
          <END_DATE>${req.body.date2}</END_DATE>
          <!--Optional:-->
 <!--         <HOURS>0.00</HOURS>
 -->
          <LEAVETYPE>${req.body.abstype}</LEAVETYPE>
          <STARTDATE>${req.body.date1}</STARTDATE>
          <!--Optional:-->
 <!--         <START_TIME>?</START_TIME>
 -->
       </urn:ZBAPI_EMP_LEAVEREQ_VED>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_EMP_LEAVEREQ_VEDResponse']['RETURN'];
            //loginStatus = resp['TYPE']['_text'];
            console.log(resp);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(obj);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//employee update

app.post('/emp/edit',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EMP_EDIT01&receiverParty=&receiverService=&interface=SI_EMP_EDIT&interfaceNamespace=http://vedaportal/empedit',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021')
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_EMP_UPDATE_VEDA>
          <!--You may enter the following 8 items in any order-->
          <ADDRESS>${req.body.address}</ADDRESS>
          <CITY>${req.body.city}</CITY>
          <COUNTRY>${req.body.country}</COUNTRY>
          <EMPLOYEE_ID>${req.body.employeeid}</EMPLOYEE_ID>
          <NAME1>${req.body.fname}</NAME1>
          <NAME2>${req.body.lname}</NAME2>
          <PHONE>${req.body.phone}</PHONE>
          <PINCODE>${req.body.pincode}</PINCODE>
       </urn:ZBAPI_EMP_UPDATE_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            //const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_CUSTOLOGIN_MYResponse']['BAPIRET'];
            //loginStatus = resp['TYPE']['_text'];
            //console.log(username);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(obj);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//mp create notification
app.post('/mp/notcreate',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PM_NOTIF_CREATE&receiverParty=&receiverService=&interface=SI_NOTIF_CREATE&interfaceNamespace=http://vedaportal/notif_create',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021')
        },
        'maxRedirects': 20
    };
    console.log("object");
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_CREATE_NOTIF_VEDA>
          <!--You may enter the following 20 items in any order-->
          <BREAKDOWN_IND>${req.body.break}</BREAKDOWN_IND>
          <END_DATE>${req.body.end_date}</END_DATE>
          <END_TIME>${req.body.end_time}</END_TIME>
          <EQUI_ID>${req.body.equi_id}</EQUI_ID>
          <NOTIF_HEADER>
            
          </NOTIF_HEADER>
          <NOTIF_TYPE>${req.body.notif_type}</NOTIF_TYPE>
          <PLANT>${req.body.plant}</PLANT>
          <PRIORITY>${req.body.priority}</PRIORITY>
          <SHORTTEXT>${req.body.text}</SHORTTEXT>
          <START_DATE>${req.body.start_date}</START_DATE>
          <START_TIME>${req.body.start_time}</START_TIME>
          <!--Optional:-->
          <KEY_RELATIONSHIPS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </KEY_RELATIONSHIPS>
          <!--Optional:-->
          <LONGTEXTS>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </LONGTEXTS>
          <!--Optional:-->
          <NOTIFACTV>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </NOTIFACTV>
          <!--Optional:-->
          <NOTIFCAUS>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </NOTIFCAUS>
          <!--Optional:-->
          <NOTIFPARTNR>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </NOTIFPARTNR>
          <!--Optional:-->
          <NOTIFTASK>
             <!--Zero or more repetitions:-->
             <item>
 
             </item>
          </NOTIFTASK>
          <!--Optional:-->
          <NOTITEM>
             <!--Zero or more repetitions:-->
             <item>
 
             </item>
          </NOTITEM>
          <!--Optional:-->
          <RETURN1>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </RETURN1>
          <!--Optional:-->
          <RETURN2>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN2>
       </urn:ZBAPI_CREATE_NOTIF_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            //const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_CUSTOLOGIN_MYResponse']['BAPIRET'];
            //loginStatus = resp['TYPE']['_text'];
            //console.log(username);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(obj);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//mp workorder create
app.post('/mp/wocreate',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 50000,
        'host': 'dxktpipo.kaarcloud.com',
        'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PM_WO_CREAT&receiverParty=&receiverService=&interface=SI_WO_CREATE&interfaceNamespace=http://vedaportal/wo_create',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode('pouser' + ':' + 'Tech@2021')
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_WO_CREATE_VEDA>
          <!--You may enter the following 12 items in any order-->
          <!--Optional:-->
          <DESCRIPTION>${req.body.desc}</DESCRIPTION>
          <!--Optional:-->
          <DURATION_NORMAL>${req.body.duration}</DURATION_NORMAL>
          <!--Optional:-->
          <EQUIP_NUM>${req.body.equip_num}</EQUIP_NUM>
          <!--Optional:-->
          <MATERIAL>?</MATERIAL>
          <!--Optional:-->
          <NOTIF_NO>${req.body.notif_no}</NOTIF_NO>
          <!--Optional:-->
          <NOTIF_TYPE></NOTIF_TYPE>
          <!--Optional:-->
          <ORDER_TYPE>${req.body.order_type}</ORDER_TYPE>
          <!--Optional:-->
          <PERS_NO>${req.body.pers}</PERS_NO>
          <!--Optional:-->
          <REQUIREMENT_QUANTITY>${req.body.qty}</REQUIREMENT_QUANTITY>
          <!--Optional:-->
          <SHORT_TEXT>${req.body.text}</SHORT_TEXT>
          <!--Optional:-->
          <WORK_ACTIVITY>${req.body.act}</WORK_ACTIVITY>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </RETURN>
       </urn:ZBAPI_WO_CREATE_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            //const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_CUSTOLOGIN_MYResponse']['BAPIRET'];
            //loginStatus = resp['TYPE']['_text'];
            //console.log(username);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(obj);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//mp wo edit
app.post('/mp/woedit',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_wo_update1/100/zws_wo_update1/zws_wo_update1',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_MAIN_WO_UPDATE_VEDA>
          <!--Optional:-->
          <DESCRIPTION>${req.body.desc}</DESCRIPTION>
          <!--Optional:-->
          <DURATION_NORMAL>${req.body.nrml}</DURATION_NORMAL>
          <!--Optional:-->
          <EQUIPMENT>${req.body.equip}</EQUIPMENT>
          <!--Optional:-->
          <NOTIF_NO>?</NOTIF_NO>
          <!--Optional:-->
          <NOTIF_TYPE>${req.body.notif_type}</NOTIF_TYPE>
          <!--Optional:-->
          <ORDER_TYPE>${req.body.type}</ORDER_TYPE>
          <!--Optional:-->
          <PERS_NO></PERS_NO>
          <!--Optional:-->
          <REQUIREMENT_QUANTITY>010.0</REQUIREMENT_QUANTITY>
          <!--Optional:-->
          <RESERVENO></RESERVENO>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </RETURN>
          <!--Optional:-->
          <SHORT_TEXT>${req.body.text}</SHORT_TEXT>
          <!--Optional:-->
          <WOID>${req.body.woid}</WOID>
       </urn:ZBAPI_MAIN_WO_UPDATE_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_MAIN_WO_UPDATE_VEDAResponse']['RETURN']['item'][1]['MESSAGE_V1']['_text'];
            //loginStatus = resp['TYPE']['_text'];
            console.log(resp);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(resp);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

// new mp notif edit
app.post('/maintenance/notifiupdate',(req,res) => {
    
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_notif_update2/100/zws_notif_update2/zws_notif_update2',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
   
    const notifino=req.body.notifino;
    const breakdown=req.body.breakdown;
    const equipid=req.body.equipid;
    const date=req.body.date;
    const type=req.body.type;
    const group=req.body.group;
    const plant=req.body.plant;
    const priority=req.body.priority;
    const reportedby=req.body.reportedby;
    const shorttext=req.body.shorttext;
    const startdate=req.body.startdate;
    const enddate=req.body.enddate;
    const planplant=req.body.planplant;
  
    global.notifino=notifino
    console.log("notif : "+notifino)
    global.breakdown=breakdown;
    global.equipid=equipid;
    global.date=date;
    global.type=type;
    global.group=group;
    global.plant=plant;
    global.priority=priority;
    global.reportedby=reportedby;
    global.shorttext=shorttext;
    global.startdate=startdate;
    global.enddate=enddate;
    global.planplant=planplant;
    
  
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_NOTIF_UPDATE_VEDA>
          <!--Optional:-->
          <BREAKDOWN_IND>${breakdown}</BREAKDOWN_IND>
          <!--Optional:-->
          <EQUI_ID>${equipid}</EQUI_ID>
          
          <NOTIFHEADER1>
 
          </NOTIFHEADER1>
          <NOTIFHEADER_X>
 
          </NOTIFHEADER_X>
          
          <!--Optional:-->
          <NOTIF_DATE>${date}</NOTIF_DATE>
          <NOTIF_NUMBER>${notifino}</NOTIF_NUMBER>
          <!--Optional:-->
          <NOTIF_TYPE>${type}</NOTIF_TYPE>
          <!--Optional:-->
          <PLANGROUP>${group}</PLANGROUP>
          <!--Optional:-->
          <PLANPLANT>${planplant}</PLANPLANT>
          <!--Optional:-->
          <PLANT>${plant}</PLANT>
          <!--Optional:-->
          <PRIORITY>${priority}</PRIORITY>
          <!--Optional:-->
          <REPORTEDBY>${reportedby}</REPORTEDBY>
          <!--Optional:-->
          <REQ_END_DATE>${enddate}</REQ_END_DATE>
          <!--Optional:-->
          <REQ_END_TIME>10:00:00</REQ_END_TIME>
          <!--Optional:-->
          <REQ_START_DATE>${startdate}</REQ_START_DATE>
          <!--Optional:-->
          <REQ_START_TIME>08:00:00</REQ_START_TIME>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </RETURN>
          <!--Optional:-->
          <SHORTTEXT>${shorttext}</SHORTTEXT>
       </urn:ZBAPI_NOTIF_UPDATE_VEDA>
    </soapenv:Body>
 </soapenv:Envelope>
 `;
    const req1 = http.request(loptions, function (res1) {
        const chunks = [];
  
        res1.on("data", function (chunk) {
            chunks.push(chunk);
            
        });
  
        res1.on("end", function (chunk) {
            const body = Buffer.concat(chunks);
            const xml = body.toString();
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
         const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_NOTIF_UPDATE_VEDAResponse']['NOTIFHEADER']['NOTIF_NO']['_text'];
         const resp1 = JSON.parse(data)['soap-env:Envelope']['soap-env:Body'];
            
         console.log('result ',resp);
        //  console.log('emp details ',resp1);
            
         console.log('0');
         res.send(resp);
                
                
            
        });
  
        res1.on("error", function (error) {
            console.error(error);
        });
    });
  
    req1.write(postData);
  
    req1.end();
   
    
  
 }); 

 //ACCURATE new wo create 001
 app.post('/mp/wocreate01',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_wocreate1/100/zws_wocreate1/zws_wocreate1',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_WO_CREATE_VEDA1_NEW>
          <!--Optional:-->
          <DESCRIPTION>${req.body.desc}</DESCRIPTION>
          <!--Optional:-->
          <DURATION_NORMAL>${req.body.duration}</DURATION_NORMAL>
          <!--Optional:-->
          <EQUIPMENT>${req.body.equip}</EQUIPMENT>
          <!--Optional:-->
          <MATERIAL></MATERIAL>
          <!--Optional:-->
          <NOTIF_NO></NOTIF_NO>
          <!--Optional:-->
          <NOTIF_TYPE>${req.body.notif_type}</NOTIF_TYPE>
          <!--Optional:-->
          <ORDER_TYPE>${req.body.order_type}</ORDER_TYPE>
          <!--Optional:-->
          <PERS_NO></PERS_NO>
          <!--Optional:-->
          <REQUIREMENT_QUANTITY></REQUIREMENT_QUANTITY>
          <!--Optional:-->
          <RETURN>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </RETURN>
          <!--Optional:-->
          <SHORT_TEXT>${req.body.text}</SHORT_TEXT>
          <!--Optional:-->
          <WORK_ACTIVITY>${req.body.act}</WORK_ACTIVITY>
       </urn:ZBAPI_WO_CREATE_VEDA1_NEW>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_WO_CREATE_VEDA1_NEWResponse']['RETURN']['item'][3]['MESSAGE_V2']['_text'];
            //loginStatus = resp['TYPE']['_text'];
            console.log(resp);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(resp);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

//ACCURATE NOTIF CREATE
app.post('/mp/notifcreate01',(req,res) => {
    var loptions = {
        'method': 'POST',
        'port': 8000,
        'host': 'solman.kaartech.com',
        'path': 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_noticreate/100/zws_noticreate/zws_noticreate',
        'headers': {
            'Content-Type': 'text/xml',
            'Authorization':'Basic '+ base64.encode(use + ':' + pas)
        },
        'maxRedirects': 20
    };
    
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_NOTIF_CREATE_VEDA>
          <BREAKDOWN_IND>${req.body.down}</BREAKDOWN_IND>
          <EQUIPMENT_ID>${req.body.equip}</EQUIPMENT_ID>
          
               
          <NOTIF_DATE>${req.body.notif_date}</NOTIF_DATE>
          <!--Optional:-->
          <NOTIF_HEADER>
            
          </NOTIF_HEADER>
          <NOTIF_TYPE>${req.body.notif_type}</NOTIF_TYPE>
          <!--Optional:-->
         
          <PLANGROUP>${req.body.group}</PLANGROUP>
          <PLANPLANT>${req.body.planplant}</PLANPLANT>
          <PLANT>${req.body.plant}</PLANT>
          <PRIORITY>${req.body.priority}</PRIORITY>
          <REPORTEDBY>${req.body.reportedby}</REPORTEDBY>
          <REQ_END_DATE>${req.body.end_date}</REQ_END_DATE>
          <!--Optional:-->
          <REQ_END_TIME>02:00:00</REQ_END_TIME>
          <REQ_START_DATE>${req.body.start_date}</REQ_START_DATE>
          <!--Optional:-->
          <REQ_START_TIME>01:00:00</REQ_START_TIME>
          <!--Optional:-->
          
          
          <SHORTTEXT>${req.body.text}</SHORTTEXT>
       </urn:ZBAPI_NOTIF_CREATE_VEDA>
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
            const data = parser.xml2json(xml, {compact: true, spaces: 4});
            const resp = JSON.parse(data)['soap-env:Envelope']['soap-env:Body']['n0:ZBAPI_NOTIF_CREATE_VEDAResponse']['HEADER']['NOTIF_NO']['_text'];
            //loginStatus = resp['TYPE']['_text'];
            console.log(resp);
            // if(loginStatus == 'E'){
            //     res.send(JSON.stringify("User not found"));
            //     console.log('failure');
            // } else {
            //        global.customerid=username;
                
                    
            //         console.log('success');
            //         res.send(JSON.stringify("User found"));
                
                
            // }
            var obj = {"status":"success"}
			res.send(resp);





        });

 

        res1.on("error", function (error) {
            console.error(error);
        });
    });

 

    req1.write(postData);

 

    req1.end();
   
    

 
	

});

app.listen(8000, () => {
	console.log('Reading on port ', 8000);
})

// for salesorder SA01node 