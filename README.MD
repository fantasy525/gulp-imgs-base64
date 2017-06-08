# gulp-imgs-base64
A plugin for encoding pages img to base64
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
publicPath:默认为空，如果img的地址不是相对路径的话则需要配置图片引用的绝对路径
注意路径最后要以/结尾如：http://192.168.1.1/src/
```
## License

MIT
