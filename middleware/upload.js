const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { remove_mutiple_file_from_req } = require('../components/remove_file');
const allowedExtensions = ['.exe', '.php', '.js', '.c'];
const isInValidExtension = (fileName) => allowedExtensions.includes(path.extname(fileName).toLowerCase());

exports.upload_with_field = async (list = [], _dir, req, res) => {
    try {

        if(list.length == 0) return false;
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                return cb(null, _dir)
            },
            filename: function (req, file, cb) {
                if (isInValidExtension(file.originalname)) {
                    return cb(new Error('Định dạng file không phù hợp')); 
                }
                else{
                    return cb(null, path.basename(file.originalname).replace(path.extname(file.originalname), '-') + Date.now() + path.extname(file.originalname).toLowerCase())                   
                }
            },
        })
        
        const promise = new Promise((resolve, reject) =>{
            multer({
                storage: storage,
                fileFilter: function (req, file, cb) {
                    return cb(null, true)
                }
            }).fields(list)(req, res,  (err)=>{
                if(err){
                    console.error(err)
                    reject(err)
                }
                const array = []
                if (typeof req.files != 'undefined' && req.files != null && typeof req.files != 'undefined') {
                    for (let i = 0; i < list.length; i++) {
                        const data_files = req.files[list[i].name]
                        if (data_files && Array.isArray(data_files)) {
                            for (let j = 0; j < data_files.length; j++) {
                                array.push({
                                    fieldname: data_files[j].fieldname,
                                    originalname: data_files[j].originalname,
                                    destination: data_files[j].destination,
                                    filename: data_files[j].filename,
                                    path: data_files[j].path.replace('public', ''),
                                    size: data_files[j].size,
                                    extention: path.extname(data_files[j].originalname).toLowerCase(),
                                })
                            }
                        }
                    }
                }
                // console.log("________________________________________",array)
                resolve(array)
            })
        })

        return await promise.then((data) => {
            return data
        })
        
    }
    catch(e){
        console.error("Lỗi dòng 70: ",e)
        return false
    }
}

exports.upload_one_file = async (field, _dir, req, res) =>{
    try {

        if(!field) return false
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                return cb(null, _dir)
            },
            filename: function (req, file, cb) {
                if (isInValidExtension(file.originalname)) {
                    return cb(new Error('Định dạng file không phù hợp')); 
                }
                else{
                    return cb(null, path.basename(file.originalname).replace(path.extname(file.originalname), '-') + Date.now() + path.extname(file.originalname).toLowerCase())                   
                }
            },
        })
        
        const promise = new Promise((resolve, reject) =>{
            multer({
                storage: storage,
                fileFilter: function (req, file, cb) {
                    return cb(null, true)
                }
            }).single(field)(req, res,  (err)=>{
                if(err){
                    console.error(err)
                    reject(err)
                }

                if (typeof req.file != 'undefined' && req.file != null && typeof req.file != 'undefined') {
                    const result = {
                        fieldname: req.file .fieldname,
                        originalname: req.file .originalname,
                        destination: req.file .destination,
                        filename: req.file .filename,
                        path: req.file .path.replace('public', ''),
                        size: req.file .size,
                        extention: path.extname(req.file .originalname).toLowerCase(),
                    }
                    resolve(result)
                }
                // console.log("________________________________________",array)
              
            })
        })

        return await promise.then((data) => {
            return data
        })
        
    }
    catch(e){
        console.error("Lỗi dòng 70: ",e)
        return false
    }
}


exports.middleware_upload_single =  (field, _dir) =>{
    createFolderIfNotExists(_dir)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, _dir)
        },
        filename: function (req, file, cb) {
            if (isInValidExtension(file.originalname)) {
                return cb(new Error('Định dạng file không phù hợp')); 
            }
            else{
                return cb(null, path.basename(file.originalname).replace(path.extname(file.originalname), '-') + Date.now() + path.extname(file.originalname).toLowerCase())                   
            }
        }
       
    })
    const upload = multer({storage: storage, dest: _dir }).single(field);
    return (req, res, next) => {
        // Sử dụng try-catch để bắt lỗi từ middleware upload
        try {
            upload(req, res, (err) => {
                if (err) {
                    // Trả về lỗi cho middleware xử lý lỗi
                    remove_mutiple_file_from_req(req)
                    return res.json(err.message)
                }
                // Nếu không có lỗi, tiếp tục sang middleware tiếp theo
                next();
            });
        } catch (error) {
            console.error(error);
            remove_mutiple_file_from_req(req)
            // Trả về lỗi cho middleware xử lý lỗi
            return res.json(err.message)
        }
    };
    
}

exports.middleware_upload_mutiple =  (fields = [], _dir) =>{
    try{
        const array_fields = []
        fields.forEach(item =>{
            array_fields.push({name:item, maxCount:10})
        })
    
        createFolderIfNotExists(_dir)
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                return cb(null, _dir)
            },
            filename: function (req, file, cb) {
                if (isInValidExtension(file.originalname)) {
                    return cb(new Error('Định dạng file không phù hợp')); 
                }
                else{
                    return cb(null, path.basename(file.originalname).replace(path.extname(file.originalname), '-') + Date.now() + (path.extname(file.originalname)).toLowerCase())                   
                }
               
            },
        })
     
        const upload = multer({storage: storage, dest: _dir }).fields(array_fields);
        return (req, res, next) => {
            // Sử dụng try-catch để bắt lỗi từ middleware upload
            try {
                upload(req, res, (err) => {
                    if (err) {
                        // Trả về lỗi cho middleware xử lý lỗi
                        remove_mutiple_file_from_req(req)
                        return res.status(400).send(err.message)
                    }
                    // Nếu không có lỗi, tiếp tục sang middleware tiếp theo
                    next();
                });
            } catch (error) {
                console.error(error);
                remove_mutiple_file_from_req(req)
                // Trả về lỗi cho middleware xử lý lỗi
                return res.status(400).send(err.message)
            }
        };
    }
    catch(error){
        console.error(error)
    }
}

const createFolderIfNotExists = (folderPath) => {
    return new Promise((resolve, reject) => {
      fs.access(folderPath, fs.constants.F_OK, (error) => {
        if (error) {
          // Thư mục không tồn tại, cần tạo mới
          fs.mkdir(folderPath, { recursive: true }, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        } else {
          // Thư mục đã tồn tại
          resolve();
        }
      });
    });
  };


exports.upload_from_ckeditor = async (req, res) =>{
    try{
        createFolderIfNotExists("public/upload/ckeditor")
        const data_file = await this.upload_one_file('upload',"public/upload/ckeditor",req, res)
        if(data_file){
            return res.json({
                uploaded:true,
                url:data_file.path.replace("public","")
            })
        }
        else{
            return res.json({
                uploaded:false,
                error:"Upload không thành công"
            })
        }
    }
    catch(error){
        console.error(error)
        return res.json({
            uploaded:false,
            error:"Upload không thành công"
        })
    }
    
}