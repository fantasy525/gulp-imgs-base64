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
rule:这个正则默认是匹配html里面的img标签的:
/src[\s]*=[\s]*"[\s]*(\w+\/)*\w+.(png|jpg)[\s]*"/g
如：src="images/index/logo.png",src="images/home/head.jpg",
src="images/person.png"等等
```
## License

MIT
