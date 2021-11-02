// // import xlsxFile from 'read-excel-file';
// // const fetch= require('read-excel-file');
// const xlsxFile = require('read-excel-file/node');
// router.use(read-excel-file.xlsxFile());

// xlsxFile('C:/angularexamples/test1/src/assets/Customer Master Data Upload Template.xlsx').then((rows) => {
// console.log(rows);
// console.table(rows);
// })
const express= require('express');
const router=express.Router();
const fetch= require('node-fetch');
const xml2js = require('xml2js');
const base64 = require("base-64");
const { request } = require('http');
router.use(express.urlencoded());
router.use(express.json());
// var cors = require('cors');
// router.use(cors());

const parser= xml2js.Parser();
// var arr=[];

router.post("/masterdataupload",async(req,res)=> {
    // const CUSTOMER_ID = req.body.CUSTOMER_ID;
    // console.log(CUSTOMER_ID);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_masterdata_new3/100/zws_masterdata_new3/zws_masterdata_new3'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZbapiMasterdatauploadVeda>
          <City>CHENNAI</City>
          <Country>IN</Country>
          <Countryiso>IN</Countryiso>
          <DistrChan>S1</DistrChan>
          <Division>S1</Division>
          <Firstname>VEDA</Firstname>
          <!--Optional:-->
          <Langu>E</Langu>
          <!--Optional:-->
          <LanguIso>EN</LanguIso>
          <Lastname>VEDA</Lastname>
          <Postalcode>600006</Postalcode>
          <RefCustmr>0006000023</RefCustmr>
          <Salesorg>SA01</Salesorg>
          <Street>ABC</Street>
          <Telephone>0123456789</Telephone>
       </urn:ZbapiMasterdatauploadVeda>
    </soapenv:Body>
 </soapenv:Envelope>`

masterData= await fetch(Request_URL,
    {
        method: "POST",
        mode :'cors',
        port : 8000,
        host: "SOLMAN.kaartech.com",
        credentials:'include',
        path : Request_URL,
        headers:{
            'Content-Type':'text/xml',
            'Authorization':'Basic '+ base64.encode('abaper' + ':' + 'abap@123'),
            'Cach-Control' : 'no-cache',
        },
        maxRedirects: 20,
        referrerPolicy:'no-referrer',
        body: Request_XML,
    }).then(res=> res.text())

    parser.parseString(masterData, (err, data) => {
        if(err)
        {
            console.log('Error in masterdata Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            data_upload = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZbapiMasterdatauploadVedaResponse']
            console.log(data_upload)
            // arr.push(data_upload)
            // console.log(arr.push(data_upload))
           
            
            res.send(data_upload);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

