var express = require('express');

var app = express();
var port=3000;
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var cust2Router = require('./routes/custDetailsEdit');
var sorder1Router = require('./routes/SorderSA01');
var cust1Router = require('./routes/custDetails');
var inq1Router = require('./routes/inquiryDisplay');
var payageRouter = require('./routes/payage');
var debitRouter = require('./routes/debit');
var quoteRouter = require('./routes/quotation');
var creditRouter = require('./routes/credit');
var lodRouter = require('./routes/lod');
var empfinalRouter = require('./routes/empfinal');
var vloginRouter = require('./routes/vlogin');
var fetDeliverRouter = require('./routes/fetDelivery');
var fetEnquireRouter = require('./routes/fetEnquire');
var enquireRouter = require('./routes/enquire');
var invoiceRouter = require('./routes/invoicedisplay');
var uploadRouter = require('./routes/upload');
var vpogetRouter = require('./routes/vpoget');
var vgetrfqRouter = require('./routes/vgetrfq');
var vgetinvoiceRouter = require('./routes/vgetinvoice');
var vpayageRouter = require('./routes/vpayage');
var vinvdispayRouter = require('./routes/vinvdisplay');
var vgoodsmvtRouter = require('./routes/vgoodsmvt');
var vcreditRouter = require('./routes/vcredit');
var vdebitRouter = require('./routes/vdebit');
var empinfoRouter = require('./routes/empinfo');
var emploginRouter = require('./routes/emplogin');
var pocreateRouter = require('./routes/vpocreate');
var empldetailsRouter = require("./routes/empLdetails");
var empdetailsRouter = require('./routes/empdetails');
var emplbalanceRouter = require('./routes/empLbalance');
var vrfqdisplayRouter = require('./routes/vrfqdisplay');
var emppayslipRouter = require('./routes/emppayslip');
var vpodisplayRouter = require('./routes/vpodisplay');
var worderlistRouter = require('./routes/worderlist');
var invoicegetRouter = require('./routes/invoiceget');
var worder1Router = require('./routes/worder1');
var notlistRouter = require('./routes/notiflist');
var empsignRouter = require('./routes/empsign');
var venddetailRouter = require('./routes/venddetail');
var mploginRouter = require('./routes/mplogin');
var notdisplayRouter = require('./routes/notdisplay');
var usersRouter = require('./routes/users');

//var cors = require('cors');
app.use((req,res,next)=>{
  res.header("Access-control-allow-Origin",'*');
  res.header("Access-control-allow-Headers",'*');
  next();
})
//app.use(cors());
app.use('/',fetDeliverRouter);
app.use('/',fetEnquireRouter);
app.use('/',worder1Router);
app.use('/',venddetailRouter);
app.use('/',notlistRouter);
app.use('/',mploginRouter);
app.use('/',notdisplayRouter);
app.use('/',worderlistRouter);
app.use('/',vrfqdisplayRouter);
app.use('/',empfinalRouter);
app.use('/',empsignRouter);
app.use('/',empdetailsRouter);
app.use('/',vcreditRouter);
app.use('/',vdebitRouter);
app.use("/",empinfoRouter);
app.use('/',pocreateRouter);
app.use('/',empldetailsRouter);
app.use('/',emplbalanceRouter);
app.use('/',emppayslipRouter);
app.use('/',vpodisplayRouter);
app.use('/',vgetinvoiceRouter);
app.use('/',vpayageRouter);
app.use('/',emploginRouter);
app.use('/',vgoodsmvtRouter);
app.use('/',vinvdispayRouter);
app.use('/',enquireRouter);
app.use('/',vgetrfqRouter);
app.use('/',vpogetRouter);
app.use('/', indexRouter);
app.use('/',invoicegetRouter);
app.use('/',sorder1Router);
app.use('/',vloginRouter);
app.use('/',uploadRouter);
app.use('/',cust1Router);
app.use('/',invoiceRouter);
app.use('/',cust2Router);
app.use('/',lodRouter);
app.use('/',inq1Router);
app.use('/',payageRouter);
app.use('/',creditRouter);
app.use('/',quoteRouter);
app.use('/',debitRouter);
app.use('/', loginRouter);//vary[ end point ]
app.use('/users', usersRouter);




app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  });
  
