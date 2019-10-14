const multer = require('multer');
const path = require('path');

module.exports={
    //configuracao de para onde as imagens vao
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname,'..','..','uploads'),
        filename: function(req,file,cb){
            cb(null, file.originalname);
        }
    })
};