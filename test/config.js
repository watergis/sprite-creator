const path = require('path');

module.exports = {
    sprites:[
      {
        output_dir: path.resolve(__dirname,'./sprite'),
        icons: [
          path.resolve(__dirname,'./icons'),
        ],
      }
    ]
};
