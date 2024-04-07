const cloudinary = require('cloudinary').v2;


const uploadFile =  (data) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(data);
  });
};

const deleteFile = async (imageId) => {
  const result = await cloudinary.uploader.destroy(imageId);
  return result;
};

module.exports = { uploadFile, deleteFile };
