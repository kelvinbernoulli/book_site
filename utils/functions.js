const crypto = require('crypto')
const { parse, format } = require('date-fns');

const getBase64Extension = (base64Data) => {
  let extension = ''
  const matches = base64Data.match(/^data:(.+);base64,/);
  if (matches && matches[1]) {
    const contentType = matches[1];
    // Extract the extension from the content type
    extension = contentType.split('/')[1];
  }
  return extension;
}

// Date format
const formatDateString = (dateString) => {
  try {
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    return formattedDate;
  } catch (error) {
    console.error(`Error parsing date: ${error.message}`);
    throw new Error(`Invalid date format: ${error.message}`);
  }
};

module.exports = { getBase64Extension, formatDateString }
