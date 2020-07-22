# sprite-creator
![GitHub](https://img.shields.io/github/license/watergis/sprite-creator)

This module is to generate sprite files from icon images.

## Installation

```
npm install @watergis/sprite-creator
```

## Usage

```js
const SpriteCreator = require('@watergis/sprite-creator');

const config = {
    sprites:[
      {
        output_dir: path.resolve(__dirname,'./sprite'), //Output directory path for sprite files
        icons: [
          path.resolve(__dirname,'./icons'), //Input directory path for SVG icons
        ],
      }
    ]
};

const spriteCreator = new SpriteCreator();
spriteCreator.build(config.sprites);
```

## Test
```
npm test
```