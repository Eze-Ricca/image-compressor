import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import imageminPngquant from "imagemin-pngquant";
import sharp from "sharp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
  try {
    const files = await fse.readdir(inputFolder);

    for (const file of files) {
      let inputPath = `${inputFolder}/${file}`;
      let outputPath = `${outputFolder}/${file}`;

      await sharp(inputPath).resize(targetWidth).toFile(outputPath);

      await imagemin([outputPath], {
        destination: outputFolder,
        plugins: [
          imageminJpegtran({ quality: 80 }), // comprimir imagen JPG con calidad del 80%
          imageminPngquant(), // Compimir imagen PNG
          imageminSvgo(), //comprimir imagen SVG
          imageminWebp({ quality: 80 }), //Comprimir imagen WebP con calidad del 80%
          imageminGifsicle(), // compimir imagen GIF
        ],
      });
      console.log(`Se a optimizado la imagen ${file}`);
    }
    console.log(`Se a terminado la optimizacion de todas tus imágenes`);
  } catch (error) {
    console.error(err);
  }
};

processImg();
