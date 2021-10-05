require('dotenv').config()
var gulp = require('gulp')
var awspublish = require('gulp-awspublish')
var parallelize = require('concurrent-transform')
let rename = require('gulp-rename')
var uglify = require('gulp-uglify-es').default;
var gzip = require('gulp-gzip')
var cleanCSS = require('gulp-clean-css')
var merge = require("merge-stream");

var config = {
    params: {
        Bucket: process.env.AWS_BUCKET_NAME
    },
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        signatureVersion: 'v3'
    },
    // Optional
    deleteOldVersions: false,                 // NOT FOR PRODUCTION
    // distribution: process.env.AWS_CLOUDFRONT, // CloudFront distribution ID
    region: process.env.AWS_DEFAULT_REGION,
    headers: {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'Content-Encoding': 'gzip'
    },

    // Sensible Defaults - gitignore these Files and Dirs
    distDir: 'dist/browser',
    indexRootPath: true,
    cacheFileName: '.awspublish',
    concurrentUploads: 10,
    wait: true,  // wait for CloudFront invalidation to complete (about 30-60 seconds)
}

gulp.task('deploy', function () {
    var publisher = awspublish.create(config)
    var js = gulp.src(config.distDir + "/**/*.js").pipe(uglify());
    var css = gulp.src(config.distDir + "/**/*.css").pipe(cleanCSS());
    var g = merge(css, js)
        .pipe(gzip({append: false}))
        .pipe(rename(function (path) {
            path.dirname = '/' + process.env.S3_BUCKET_DIR + '/' + path.dirname + '/'
        }))

    g = g.pipe(parallelize(publisher.publish(config.headers), config.concurrentUploads))

    if (config.distribution) {
        console.log('Configured with CloudFront distribution')
        g = g.pipe(cloudfront(config))
    } else {
        console.log('No CloudFront distribution configured - skipping CDN invalidation')
    }
    // Delete removed files
    if (config.deleteOldVersions) g = g.pipe(publisher.sync())
    //create a cache file to speed up consecutive uploads
    g = g.pipe(publisher.cache())
    //print upload updates to console
    g = g.pipe(awspublish.reporter())
    return g
})


