const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const relationshipRoutes = require('./relationshipRoutes');
const { unlinkSync } = require('fs');


router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/relationships', relationshipRoutes);

// const router = require('express').Router();
const { upload, uploadToCloudinary } = require('../../controllers/upload');
const db = require('../../models');

// Uses middleware to process the file upload
router.post('/upload', upload, async (req, res) => {
  const { file } = req;
  // Captures the file data from the upload process and sends it to Cloudinary
  const result = await uploadToCloudinary(file.path, { folder: 'notinsta' });
  // When the upload is complete, delete it from the /tmp directory
  if (file && result) {
    unlinkSync(file.path);
  }
  // Create object using data from the file and result object from Cloudinary
  const data = {
    // name: file.originalname,
    // description: '',
    image_filename: result.secure_url,
    // body_text: result.secure_url,
    body_text: 'idk lol',
    user_id: req.session.user_id,
  };

  console.log('CLOUDINARY', result);
  console.log('FILE', file);

  // Create the Gallery item
  const item = await db.Post.create(data);
  // Ensure it exists before return the result otherise send a 404
  if (item) {
    return res.json(item);
  }
  return res.statusCode(404);
});

module.exports = router;
