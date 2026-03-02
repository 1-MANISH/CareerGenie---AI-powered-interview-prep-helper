import multer from "multer";

const upload = multer({
        // temp storage
        storage:multer.memoryStorage(),
        limits:{
                fileSize:5*1024*1024 // 5mb
        }
})

export default upload