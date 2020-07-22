const SpriteCreator = require('../src/index');
const config = require('./config');

const test = () =>{
    console.time('sprite-creater');
    const spriteCreator = new SpriteCreator();
    spriteCreator.build(config.sprites);
    console.timeEnd('sprite-creater');
};

module.exports = test();