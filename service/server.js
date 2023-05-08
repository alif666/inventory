const port = 3000; // Replace with the desired port number
const express = require('express');
// const SetupService = require('./services/SetupService');
const app = express();
const cors = require('cors');
//port Server initialization
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  app.use(cors({ origin: 'http://localhost:3001' }));

//declaring routers
deviceRouter = require('./routes/DeviceRouter');
personRouter = require('./routes/PersonRouter');
// billingRouter = require('./routes/BillingRouter');
// productRouter = require('./routes/ProductRouter');
// billLookUpTypeRouter = require('./routes/BillLookUpTypeRouter');


//redirect to routers
app.use('/device',deviceRouter);
app.use('/person',personRouter);
// app.use('/billing',billingRouter);
// app.use('/product',productRouter);
// app.use('/billLookUpType',billLookUpTypeRouter);

app.get('/api', (req, res) => {
  res.send('test get request');
});

// app.post('/api/create_tables',(req, res)=>{
//     setupService= new SetupService();
//     setupService.createTables();
//     res.send('POST Request');
// });
