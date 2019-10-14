const Post = require('../models/Post');

module.exports = {
    //soma mais um like para foto
    async store(req,res){
        const post=await Post.findById(req.params.id);        

        post.likes+=1;

        await post.save();

        //notificar usuarios de novo like
        req.io.emit('like',post);

        return res.json(post);
    }
};