module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("CNAME");
  ["walks", "bench", "rabbit-holes", "experiments"].forEach(function (collection) {
    eleventyConfig.addCollection(collection, function (api) {
      return api.getFilteredByGlob("content/" + collection + "/*.md").reverse();
    });
  });
  return { dir: { input: ".", includes: "_includes", output: "_site" }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk" };
};
