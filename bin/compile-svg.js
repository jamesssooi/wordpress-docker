/**
 * Compile individual SVGs to a single SVG spritesheet and inline it into the
 * document body.
 */

var fs = require('fs')
var path = require('path')
var glob = require('glob')
var svgstore = require('svgstore')
var replace = require('replace-in-file')
var isProduction = process.env.NODE_ENV === 'production'

var outputDir = isProduction ? 'build' : 'build'

/**
 * Configuration
 */
var options = {
  src: 'src/svg/**/*.svg',
  output: `${outputDir}/sprites.svg`,
  inlineToHtml: false,
  html: `${outputDir}/**/*.html`,
  replaceRegex: /<!-- inline svg here -->/,
  prefix: 'sprite-'
}


/**
 * Combine SVG files into a single spritesheet
 * @param {string} src Glob pattern to match the SVG files
 * @param {string} prefix String to prefix each SVG IDs
 */
function createSVGSprites(src, prefix) {
  var files = glob.sync(src)
  return files.reduce(function(sprites, file) {
    var data = fs.readFileSync(file, 'utf8')
    var spriteId = (prefix === null ? '' : prefix) + path.basename(file, '.svg')
    return sprites.add(spriteId, data)
  }, svgstore())
}


/**
 * Inline a SVG spritesheet into files.
 * @param {svgstore} spritesheet A svgstore object
 * @param {string} files Glob pattern to match files to replace
 * @param {string} regex Regex pattern to search in file to replace
 */
function inlineSpritesheet(spritesheet, files, regex) {
  var data = spritesheet.toString({ inline: true })
  var changedFiles = replace.sync({
    files: ['build/**/*.html'],
    from: regex,
    to: data
  })
}


/**
 * Entry function
 */
function main(options) {
  // create spritesheet
  var spritesheet = createSVGSprites(options.src, options.prefix)

  // inline into html files
  if (options.inlineToHtml) {
    inlineSpritesheet(spritesheet, options.html, options.replaceRegex)
  }

  // output as external resource
  if (options.output) {
    fs.writeFileSync(options.output, spritesheet)
  }
}

// Call main function
main(options)
