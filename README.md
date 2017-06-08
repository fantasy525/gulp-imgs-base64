# gulp-imgs-base64
这个插件是能让页面指定大小的img标签的图片转换为base64
## Install
```
npm install --save-dev gulp-imgs-base64
```
## Usage
Gulpfile.js:
```
gulp.task('base64:img',function(){
    return gulp.src('src/*.html')
        .pipe(imgBase64({
            maxImageSize:5*1024,
            baseDir: 'src'})
        .pipe(gulp.dest('src'))
});
```
### Options
```
maxImageSize:它是指定在特定范围内大小的图片才转换为base64,超过这个值就不转换,
默认：2048
baseDir:默认为当前index.js所在路径，一般需要配置为src
publicPath:默认是空，如果图片加上了线上绝对地址如：http://www.baidu.com/src/那么需要添加这个参数来匹配img标签，地址末尾
以/结尾
```
## License

MIT

