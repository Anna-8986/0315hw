import express from 'express';
import http from 'http';
import cookieParse from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import session from 'session';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParse());
app.use(express.static(path.resolve(__dirname,'../view')));
app.use(morgan('dev'))
app.use(cors());

app.use(session({
    secret:process.env.APP_KEY,
    resave:false,
    saveUninitalized:false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api',function(req,res,next){
    res.status(200).json({message:'Hi'})
})

const server = http.createServer(app);

server.listen(3000)

server.on('listening',()=>{
    const addr=server.address();
    console.log(`This server is on ${addr}`)
})