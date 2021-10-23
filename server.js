let staticServer = require('node-static')
let path = require('path')
let file = new staticServer.Server(`${__dirname}/public`)
const express = require('express')
const { Console } = require('console')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/static',(req,res,next)=>{
//   //console.log(req.query.id)
//   if(req.query.id=="1"){
//       next()
//   }
//   else{
//       res.status(404).send("no data")
//   }
// },express.static(path.join(__dirname, 'public')))

app.use('/static',(req,res,next)=>{
 console.log(req.query.id)
  if(req.query.id=="1"){
    console.log("id==1")
      next()
  }
  else{
      res.status(404).send("no data")
  }
 },express.static(path.join(__dirname, 'public/mclaren.mp4')))
 
app.use('/stream',(req,res) =>{
  res.writeHead(206, {
    "Accept-Ranges" : "bytes",
    "Content-Type" : "video/mp4"
  });
	req.addListener('end', function() {
        file.serve(req, res);
  }).resume();

});
// app.use(express.static('public'));

app.get('/',(req,res) =>{
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//require('http').createServer(function(request, response) {
    
//}).listen(3005);

//open('http://localhost:3005');
