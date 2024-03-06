import fs from "fs";

/**
 * Translates a given key to the specified language.
 * @param {string} key - The key to be translated.
 * @param {string} lang - The language code (e.g., 'ph', 'th').
 * @returns {string} - The translated string, or an empty string if translation is not found.
 */
export function translate(key, lang) {
  const translations = loadTranslations(lang);
  const keys = key.split(".");

  let translation = translations;
  keys.forEach((k) => {
    translation = translation[k];
    if (!translation) return "";
  });

  return translation || "";
}

/**
 * Returns a Facebook link based on the specified locale.
 * @param {string} lang - The language code (e.g., 'ph', 'th').
 * @returns {string} - The Facebook link.
 */
export function getFacebookLink(lang) {
  const link = lang === "th" ? "finn.app.com.th" : "finn.app.ph";
  return `https://www.facebook.com/${link}`;
}

/**
 * Gets the path to the calendar image based on the specified locale.
 * @param {string} lang - The language code (e.g., 'ph', 'th').
 * @returns {string} - The path to the calendar image.
 */
export function getCalendarImg(lang) {
  const imgName = lang === "th" ? "calendar-img.svg" : "calendar-img-ph.svg";
  return `/finn-landing/assets/vectors/${imgName}`;
}

/**
 * Gets the path to the header animation based on the specified locale.
 * @param {string} lang - The language code (e.g., 'ph', 'th').
 * @returns {string} - The path to the header animation
 */
export function getHeaderAnimation(lang) {
  return `/finn-landing/assets/lottie/anim-4-${lang}.json`;
}

/**
 * Determines if the rating star at the specified index should be rendered as a full star.
 * @param {number} index - The index of the star in the sequence.
 * @param {number} rating - The rating value to compare against.
 * @returns {boolean} - True if the star should be rendered as a full star, false otherwise.
 */
export function isFullStar(index, rating) {
  return Math.floor(rating) > index;
}

/**
 * Determines if the rating star at the specified index should be rendered as a half star.
 * @param {number} index - The index of the star in the sequence.
 * @param {number} rating - The rating value to compare against.
 * @returns {boolean} - True if the star should be rendered as a half star, false otherwise.
 */
export function isHalfStar(index, rating) {
  return rating - Math.floor(rating) === 0.5 && Math.ceil(rating) > index;
}

/**
 * Generates an array of numbers from a start value to an end value.
 * @param {number} value - The end value of the range.
 * @param {number} start - The start value of the range. Default is 0.
 * @returns {number[]} - An array containing numbers from start to end.
 */
export function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Compares two variables using the specified comparator. Hbs doesn't provide a built in comparator.
 * 
 * @param {*} variableOne - The first variable to compare.
 * @param {string} comparator - The comparator to use for comparison (e.g., '===', '>', '<=').
 * @param {*} variableTwo - The second variable to compare.
 * @returns {boolean} - True if the comparison is true, otherwise false.
 */
export function compare(variableOne, comparator, variableTwo) {
  switch (comparator) {
    case "===":
      return variableOne === variableTwo;
    case "!==":
      return variableOne !== variableTwo;
    case ">":
      return variableOne > variableTwo;
    case "<":
      return variableOne < variableTwo;
    case ">=":
      return variableOne >= variableTwo;
    case "<=":
      return variableOne <= variableTwo;
    default:
      throw new Error("Invalid comparator: " + comparator);
  }
}

/**
 * Loads translations from a JSON i18n file based on the specified locale.
 *
 * @param {string} lang - The language code (e.g., 'ph', 'th').
 * @returns {Object} - The translations list.
 * @throws Will throw an error if the translation file cannot be read or parsed.
 */
function loadTranslations(lang) {
  try {
    const data = fs.readFileSync(`./src/i18n/${lang}.json`, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(
      `Error reading translation file for ${lang}: ${error.message}`
    );
    return {};
  }
}
