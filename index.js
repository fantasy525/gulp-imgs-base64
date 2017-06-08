var path = require('path');
var fs = require('fs');
var through = require('through2');
function toBase64(options) {
    var opts = options || {};
    var baseDir = opts.baseDir || '.';
    var maxImageSize=options.maxImageSize||2*1024;
    var publicPath=options.publicPath||' ';
    var rule='src[\\s]*=[\\s]*[\\\"|\\\'][\\s]*'+'([\\s]*'+publicPath+')*'+'(\\w+\\/)*\\w+\\.(png|jpg)[\\s]*[\\\"|\\\']';
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var content = file.contents.toString();
        var imagesPaths = content.match(new RegExp(rule, 'g'));
        if(!imagesPaths){return cb();}
        var currentPath = path.resolve(__dirname , '../../' , baseDir);
        var imageURL;
        imagesPaths.forEach(function(item) {
            imageURL = item.replace(new RegExp('(src=[\'|\"]'+'([\\s]*'+publicPath+'+)|\"|\'|src=)','g'), '');
            var route = path.join(currentPath, imageURL);
            var filepath = fs.realpathSync(route);
            var extname = path.extname(imageURL).slice(1);
            var f= fs.readFileSync(filepath);
            var imageContent;
            if(f.length<=maxImageSize){
                imageContent= new Buffer(f).toString('base64');
                content = content.replace(new RegExp('('+publicPath+')*'+imageURL,'g'), 'data:image/' + extname.toLowerCase() + ';base64,' + imageContent);
            }
        });
        file.contents = new Buffer(content);
        this.push(file);
        cb();
    })
}
module.exports = toBase64;