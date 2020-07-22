const spritezero = require('@mapbox/spritezero');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const rimraf = require('rimraf');

class SpriteCreator{
    build(sprites){
        sprites.forEach(s=>{
            let output_dir = s.output_dir;
            let icons =s.icons;
            this.create(output_dir, icons);
        })
    }

    create(output_dir, icons){
        const this_ = this;
        let svgs = [];
        icons.forEach(dir=>{
            svgs = svgs.concat(this_.generateSvgs(path.join(dir, '/*.svg')));
        })

        if (fs.existsSync(output_dir)){
        rimraf.sync(output_dir);
        }
        fs.mkdirSync(output_dir);

        [1, 2, 4].forEach(function(pxRatio) {
            this_.generateSprite(pxRatio, svgs, output_dir);
        });
    }

    generateSvgs(input_dir) {
        return glob.sync(path.resolve(input_dir))
        .map(function(f) {
            return {
                svg: fs.readFileSync(f),
                id: path.basename(f).replace('.svg', '')
            };
        });
    }

    suffix(pxRatio){
        if (pxRatio === 1) {
          return ''
        } else {
          return `@${pxRatio}x`
        }
    }

    generateSprite(pxRatio, svgs, output_dir){
        var pngPath = path.resolve(path.join(output_dir, `/sprite${this.suffix(pxRatio)}.png`));
        var jsonPath = path.resolve(path.join(output_dir, `/sprite${this.suffix(pxRatio)}.json`));
    
        spritezero.generateLayout({
            imgs: svgs,
            pixelRatio: pxRatio,
            format: true
        }, (err, dataLayout) => {
                if (err) throw err
                fs.writeFileSync(
                jsonPath,
                JSON.stringify(dataLayout, null, 2)
            )
        })
        spritezero.generateLayout({
            imgs: svgs,
            pixelRatio: pxRatio,
            format: false
        }, (err, imageLayout) => {
                if (err) throw err
                spritezero.generateImage(imageLayout, (err, image) => {
                if (err) throw err
                fs.writeFileSync(pngPath, image)
            })
        })
    }
}

module.exports = SpriteCreator;