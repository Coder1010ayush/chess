import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload_stream(
            { folder: 'avatars' },
            (error, result) => {
                if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });
                res.status(200).json({ url: result.secure_url });
            }
        );
        result.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ error: 'Upload error' });
    }
});

export default router;
