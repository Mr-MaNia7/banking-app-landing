import pkg from "gulp";
import fs from "fs";
import handlebars from "gulp-compile-handlebars";
import htmlmin from "gulp-htmlmin";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import through2 from "through2";
import imagemin from "gulp-imagemin";
import flatten from "gulp-flatten";
import rename from "gulp-rename";
import { deleteAsync } from "del";
import { mkdirp } from "mkdirp";
import layouts from "handlebars-layouts";

import * as helpers from "./src/helpers/index.mjs";

const { src, dest, parallel, series } = pkg;
const configData = getConfigFile();
const langs = ["th", "ph"];

// Register external helper
layouts.register(handlebars.Handlebars);

function getConfigFile() {
  try {
    const data = fs.readFileSync("./config.json", "utf8");
    const parsedData = JSON.parse(data);

    if (!parsedData || typeof parsedData !== "object") {
      throw new Error("Invalid data file structure.");
    }

    if (!parsedData.prod || !parsedData.dev) {
      throw new Error("Missing required properties in data file.");
    }

    return parsedData;
  } catch (error) {
    console.error(`Error reading data file: ${error.message}`);
    process.exit(1); // Exit with error code
  }
}

function buildHTML(data, lang) {
  const pages = `src/pages/${lang}/**/*.hbs`;

  const context = { ...data, lang };

  const options = {
    batch: [
      "./src/partials/env",
      "./src/partials/utils",
      "./src/partials/layout",
      "./src/partials/common",
      `./src/partials/${lang}`,
    ],
    helpers: {
      translate: helpers.translate,
      fbLink: helpers.getFacebookLink,
      calendarImg: helpers.getCalendarImg,
      headerAnim: helpers.getHeaderAnimation,
      isHalfStar: helpers.isHalfStar,
      isFullStar: helpers.isFullStar,
      range: helpers.range,
      compare: helpers.compare,
    },
  };

  return src(pages)
    .pipe(handlebars(context, options))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ extname: ".html" }))
    .pipe(flatten())
    .pipe(dest(`dist/${lang}`));
}

function copyAssets() {
  return src(["assets/**/*", "!assets/scss/**"]).pipe(dest("dist/assets"));
}

function minifyCSS() {
  return src("assets/css/*.css").pipe(cleanCSS()).pipe(dest("dist/assets/css"));
}

function injectJsVariables(data) {
  const config = data?.jsConfig;
  const configKeys = Object.keys(config);

  return src("assets/js/*.js")
    .pipe(
      through2.obj(function (file, _, cb) {
        let content = file.contents.toString();

        configKeys.forEach((key) => {
          const pattern = new RegExp(`__config-${key}__`, "g");
          content = content.replace(pattern, config[key]);
        });

        file.contents = Buffer.from(content);
        this.push(file);

        cb();
      })
    )
    .pipe(terser())
    .pipe(dest("dist/assets/js"));
}

function optimizeImages() {
  return src("assets/images/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/assets/images"));
}

function createDistDir() {
  return mkdirp("dist");
}

async function cleanDist() {
  await deleteAsync("dist", { force: true });
}

function generateHTML(data) {
  const tasks = langs.map((lang) => () => buildHTML(data, lang));
  return parallel(...tasks, () => injectJsVariables(data));
}

const dev = series(
  cleanDist,
  createDistDir,
  copyAssets,
  generateHTML(configData?.dev),
  parallel(minifyCSS, optimizeImages)
);

const prod = series(
  cleanDist,
  createDistDir,
  copyAssets,
  generateHTML(configData?.prod),
  parallel(minifyCSS, optimizeImages)
);

export { dev, prod };
