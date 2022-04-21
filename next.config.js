const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {});

module.exports = {
  images: {
    domains: ['res.cloudinary.com']  
  },
  env: {
    CLOUD_NAME: 'jamsanz-dot-com',
    UPLOAD_PRESET: 'zubcrydm'
  }
};
