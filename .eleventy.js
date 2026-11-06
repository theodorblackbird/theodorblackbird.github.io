const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')

const { 
  getAllPosts, 
  getCategoryList,
  getCategorisedPosts 
} = require('./config/collections')

const { 
  readableDate 
} = require('./config/filters')

const { 
  imageShortcode 
} = require('./config/shortcodes')


module.exports = function(eleventyConfig) {
  
  /*================================*/
  /*   plugins and configurations   */
  /*================================*/
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  eleventyConfig.addPassthroughCopy('./src/assets/bblogo.jpg')
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/demo_lina')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy('./src/assets/site.css')
  eleventyConfig.addPassthroughCopy('./src/assets/me.jpg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })


  /*=================*/
  /*     Layouts     */
  /*=================*/
  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('modern', 'layouts/modern')


  /*=================*/
  /*   Collections   */
  /*=================*/
  eleventyConfig.addCollection('blog', getAllPosts)
  eleventyConfig.addCollection('categoryList', getCategoryList)
  eleventyConfig.addCollection('categorisedPosts', getCategorisedPosts)

  
  /*=================*/
  /*     Filters     */
  /*=================*/
  eleventyConfig.addFilter('readableDate', readableDate)
  eleventyConfig.addFilter('year', () => new Date().getFullYear())
  // Group publications by year, newest first, keeping file order within a year.
  eleventyConfig.addFilter('byYear', (pubs) => {
    const groups = new Map()
    pubs.forEach((p) => {
      if (!groups.has(p.year)) groups.set(p.year, [])
      groups.get(p.year).push(p)
    })
    return [...groups.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, items]) => ({ year, items }))
  })


  /*=================*/
  /*    shortcodes   */
  /*=================*/
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)



  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  }
}
