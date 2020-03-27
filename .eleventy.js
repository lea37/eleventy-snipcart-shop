const moment = require("moment");

module.exports = function(eleventyConfig) {
    // copy assets folder
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/css/main.min.css': 'css/main.min.css'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/scripts/main.min.js': 'scripts/main.min.js'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/images/': 'images/'});

    eleventyConfig.addNunjucksFilter("date", function() {
        moment().locale('fr');
      return moment().format('DD/MM/YYYY');
    });

    // posts collection
    eleventyConfig.addCollection("posts", function(collection) {
      return collection.getFilteredByGlob("./src/posts/*.md").reverse();
    });

    // Base config
    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "dist",
        }
    };
}