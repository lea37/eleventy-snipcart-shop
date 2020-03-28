const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    // copy assets folder
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/css/main.min.css': 'css/main.min.css'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/scripts/main.min.js': 'scripts/main.min.js'});
    eleventyConfig.addPassthroughCopy({'src/_includes/assets/images/': 'images/'});

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
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