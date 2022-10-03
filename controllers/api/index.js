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

// let captionText = import {GetCaption} from ('./base.js');

// Uses middleware to process the file upload
router.post('/upload/:newCaption', upload, async (req, res) => {
  const { file } = req;
  const caption = req.params.newCaption;
  console.log('FILE', file);
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
    body_text: caption,
    user_id: req.session.user_id,
  };

  // console.log('CLOUDINARY', result);
  // console.log('FILE', file);

  // Create the Gallery item
  const item = await db.Post.create(data);
  // Ensure it exists before return the result otherise send a 404
  if (item) {
    return res.json(item);
  }
  return res.statusCode(404);
});

router.post('/upload/p/:userId', upload, async (req, res) => {
  const { file } = req;
  // const caption = req.params.newCaption;
  console.log('FILE KSJDFHSDKJLHGSDKJGSDKJFG', req.params.userId, file);
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
    profile_image_filename: result.secure_url,
    // body_text: caption,
    // user_id: req.session.user_id,
  };
  console.log("HERES THE URL", result.secure_url);

  // console.log('CLOUDINARY', result);
  // console.log('FILE', file);

  // Create the Gallery item
  const item = await db.User.update({profile_image_filename: result.secure_url}, {
    where: {
      id: req.params.userId,
    },
  });
  
  
  // ({profile_image_filename: result.secure_url},
  //   {where: {
  //     id: req.params.userId
  //   }});
  // Ensure it exists before return the result otherise send a 404
  if (item) {
    return res.json(item);
  }
  return res.statusCode(404);
});

module.exports = router;
