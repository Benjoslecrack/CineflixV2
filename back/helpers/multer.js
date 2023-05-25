import multer from 'multer';
import path from 'path';



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split(' ').join('_');
        console.log(name, 'name');
        cb(null, name + '-' + Date.now() + path.extname(file.originalname))

    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000
    },
    filefilter: (req, file, cb) => {
        console.log("req2 in multer", req)
        const filetypes = /jpg|pdf|png|mp4|ppt/
        let result = filetypes.test(path.extname(file.originalname))
        if (result) return cb(null, true);
        else return cb('extension not supported');
    }
}).fields([
    { name: "cv", maxCount: 1 },
    { name: "pp", maxCount: 1 }
]);

export default upload;



