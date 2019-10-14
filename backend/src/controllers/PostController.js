const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    //retorna todos os posts ordenados pela data de criacao
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    //realiza post
    async store(req,res){
        //recebe informacoes
        const{author, place, description,hashtags}=req.body;
        const {filename:image}=req.file;

        const[name]=image.split('.');
        const fileName = `${name}.jpg`;

        //redimenciona imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination,'resized',fileName)
            );
        //deleta o arquivo original
        fs.unlinkSync(req.file.path);
        //faz o post
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image:fileName,
        });

        //enviar para todos os usuarios o novo post
        req.io.emit('post',post);

        return res.json(post);
    }
};