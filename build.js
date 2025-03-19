const fs = require('fs');
const path = require('path');
const uglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

// Paths to source files
const sourcePaths = {
    js: path.join(__dirname, 'assets/js/script.js'),
    css: path.join(__dirname, 'assets/css/style.css')
};

// Paths to output files
const outputPaths = {
    js: path.join(__dirname, 'assets/js/script.min.js'),
    css: path.join(__dirname, 'assets/css/style.min.css')
};

// Minify JavaScript
function minifyJS() {
    const code = fs.readFileSync(sourcePaths.js, 'utf8');
    const minified = uglifyJS.minify(code);
    
    if (minified.error) {
        console.error('Error minifying JavaScript:', minified.error);
        return;
    }
    
    fs.writeFileSync(outputPaths.js, minified.code);
    console.log('JavaScript minified successfully');
}

// Minify CSS
function minifyCSS() {
    const css = fs.readFileSync(sourcePaths.css, 'utf8');
    const minified = new CleanCSS().minify(css);
    
    if (minified.errors.length) {
        console.error('Error minifying CSS:', minified.errors);
        return;
    }
    
    fs.writeFileSync(outputPaths.css, minified.styles);
    console.log('CSS minified successfully');
}

// Run build tasks
function build() {
    try {
        minifyJS();
        minifyCSS();
        console.log('Build completed successfully');
    } catch (error) {
        console.error('Build failed:', error);
    }
}

build();
