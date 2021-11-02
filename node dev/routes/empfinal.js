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

router.post("/emp/final",async(req,res)=> {
    const employeeid = req.body.employeeid;
    const from = req.body.from;
    const to = req.body.to;
    console.log(employeeid);
    const Request_URL = 'http://SOLMAN.kaartech.com:8000/sap/bc/srt/rfc/sap/zws_emp_final/100/zws_emp_final/zws_emp_final'
    const Request_XML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZBAPI_FINAL_DETAILS>
          <EMPLOYEE_ID>${employeeid}</EMPLOYEE_ID>
          <END_DATE>${to}</END_DATE>
          <IT_CHNG>
             <EVP>
                
             </EVP>
             <INTER>
                <VERSION>
                   
                   
                </VERSION>
                <VERSC>
                   
                </VERSC>
                <WPBP>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </WPBP>
                <ABC>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </ABC>
                <RT>
                   <!--Zero or more repetitions:-->
                   <item>
                    
                   </item>
                </RT>
                <CRT>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </CRT>
                <BT>
                   <!--Zero or more repetitions:-->
                   <item>
                    
                   </item>
                </BT>
                <C0>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </C0>
                <C1>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </C1>
                <V0>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </V0>
                <VCP>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </VCP>
                <ALP>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </ALP>
                <DFT>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </DFT>
                <GRT>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </GRT>
                <LS>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </LS>
                <STATUS>
                   
                </STATUS>
                <ARRRS>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </ARRRS>
                <DDNTK>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </DDNTK>
                <ACCR>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </ACCR>
                <BENTAB>
                   <!--Zero or more repetitions:-->
                   <item>
                      
                   </item>
                </BENTAB>
                <AB>
                   <!--Zero or more repetitions:-->
                   <item>
                   </item>
                </AB>
                <FUND>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </FUND>
                <AVERAGE>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </AVERAGE>
                <MODIF>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </MODIF>
                <RT_GP>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </RT_GP>
                <CODIST>
                   <!--Zero or more repetitions:-->
                   <item>
                     
                   </item>
                </CODIST>
                <LIFL>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </LIFL>
                <LIDI>
                   <!--Zero or more repetitions:-->
                   <item>
 
                   </item>
                </LIDI>
             </INTER>
             
          </IT_CHNG>
          <IT_CRT>
             <!--Zero or more repetitions:-->
             <item>
 
             </item>
          </IT_CRT>
          <IT_RT>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_RT>
          <IT_VERSC>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_VERSC>
          <IT_VERSION>
             <!--Zero or more repetitions:-->
             <item>
               
             </item>
          </IT_VERSION>
          <IT_WPBP>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </IT_WPBP>
          <START_DATE>${from}</START_DATE>
          <WAGE>
             <!--Zero or more repetitions:-->
             <item>
                
             </item>
          </WAGE>
       </urn:ZBAPI_FINAL_DETAILS>
    </soapenv:Body>
 </soapenv:Envelope>`

final= await fetch(Request_URL,
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

    parser.parseString(final, (err, data) => {
        if(err)
        {
            console.log('Error in po details Fetch Part : ',err)
            callback(err, null)
        }
        else {
            console.log(data)
            credit = data['soap-env:Envelope']['soap-env:Body'][0]['n0:ZBAPI_FINAL_DETAILSResponse'][0]['IT_CHNG'][0]
            console.log(credit)
            
            res.send(credit);//for angular  res.json(sales_order);
        }        
    })
    
})
module.exports =router;

