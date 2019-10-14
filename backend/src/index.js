//importando dependencias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//permitir requisicoes http
const server = require('http').Server(app);
//permitir requisicoes por websocket para real time de like e novos posts
const io=require('socket.io')(server);

//conecao com bd
mongoose.connect('mongodb+srv://rodsemana:rodsemana@cluster0-01hep.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true,
});

//permitir que a variavel esteja disponivel em toda a aplicacao middleware
app.use((req,res,next)=>{
    req.io=io;

    next();
})

//permitir que o frontend conecte com o backend
app.use(cors());
//rota para acessar arquivos staticos
app.use('/files',express.static(path.resolve(__dirname,'..','uploads','resized')));
//declarar arquivo de rodas
app.use(require('./routes'));

server.listen(3333);

