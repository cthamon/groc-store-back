import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profile') cb(null, 'public/images/profiles');
        if (file.fieldname === 'productImg') cb(null, 'public/images/products');
        else if (file.fieldname !== 'profile' && file.fieldname !== 'productImg') cb(null, 'public/images/others');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
});

export const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'png') cb(null, true);
        else cb(new Error('jpg or png only'));
    }
});