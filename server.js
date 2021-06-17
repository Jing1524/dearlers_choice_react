const express = require('express');

const app = express();

const path = require('path');

const { syncAndSeed, models: { Musician, Album, Tune}} = require('./db');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/',(req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/musicians', async(req, res, next)=>{
    try {
        console.log("========================", Musician.findAll());
      res.send(await Musician.findAll({
          attributes:{
              exclude: ['bio']
          }
      }));  
    }
    catch (error) {
       next(error);    
    }
})


app.get('/api/musicians/:id', async(req, res, next)=>{
    try {
      res.send(await Musician.findByPk(req.params.id))
    }
    catch (error) {
       next(error);    
    }
})



const init = async()=>{
   try {
     
     await syncAndSeed();
     
     const port = process.env.PORT || 3000;
     app.listen(port,()=>console.log(`listening on port ${port}`));

   }
   catch (error) {
       console.log(error);   
   }
};

init();