const { getBase64Extension } = require('../utils/functions');
const { S3upload, S3deleteFile } = require('../services/s3uploads');
const { pool } = require('../services/pg_pool');

const handleFileUploads = async (request, response, fields, basePath) => {
  try {
    for (const field of fields) {
      if (request.body[field]) {
        const fileName = `${basePath}${field}-${Date.now()}.${getBase64Extension(request.body[field])}`;
        await S3upload(request, response, fileName, request.body[field]);
        request.body[field] = fileName;
      } else {
        throw new Error(`${field.replace('_', ' ')} is required!`);
      }
    }
    return { success: true };
  } catch (error) {
    throw new Error("Update File upload error: " + (error?.message || error));
  }
};

const handleUpdateFileUploads = async (request, response, fields, basePath, existingData) => {
  try {
    for (const field of fields) {
      if (request.body[field]) {
        // Delete old file
        if (existingData[field]) {
          await S3deleteFile(existingData[field]);
        }

        const fileName = `${basePath}${field}-${Date.now()}.${getBase64Extension(request.body[field])}`;
        await S3upload(request, response, fileName, request.body[field]);
        request.body[field] = fileName;
      }
    }
    return { success: true };
  } catch (error) {
    throw new Error("File upload error: " + (error?.message || error));
  }
};

module.exports = { handleFileUploads, handleUpdateFileUploads }