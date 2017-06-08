var path = require('path');
var fs = require('fs');
var through = require('through2');
function toBase64(options) {
    var opts = options || {};
<<<<<<< HEAD
    var baseDir = opts.baseDir || '.';
    var maxImageSize=options.maxImageSize||2*1024;
    var publicPath=options.publicPath||' ';
    var rule='src[\\s]*=[\\s]*[\\\"|\\\'][\\s]*'+'([\\s]*'+publicPath+')*'+'(\\w+\\/)*\\w+\\.(png|jpg)[\\s]*[\\\"|\\\']';
=======
    var rule = opts.rule || /src[\s]*=[\s]*"[\s]*(\w+\/)*\w+.(png|jpg)[\s]*"/g;
    var baseDir = opts.baseDir || '.';
    var maxImageSize=options.maxImageSize||2*1024;
>>>>>>> af3c000d568c0b07b2efbb70cb6e01bb5c583b74
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
<<<<<<< HEAD
        var imagesPaths = content.match(new RegExp(rule, 'g'));
=======
        var imagesPaths = content.match(rule);
>>>>>>> af3c000d568c0b07b2efbb70cb6e01bb5c583b74
        if(!imagesPaths){return cb();}
        var currentPath = path.resolve(__dirname , '../../' , baseDir);
        var imageURL;
        imagesPaths.forEach(function(item) {
<<<<<<< HEAD
            imageURL = item.replace(new RegExp('(src=[\'|\"]'+'([\\s]*'+publicPath+'+)|\"|\'|src=)','g'), '');
=======
            imageURL = item.replace(/(src|=|"|"|'|')/g, '');
>>>>>>> af3c000d568c0b07b2efbb70cb6e01bb5c583b74
            var route = path.join(currentPath, imageURL);
            var filepath = fs.realpathSync(route);
            var extname = path.extname(imageURL).slice(1);
            var f= fs.readFileSync(filepath);
            var imageContent;
            if(f.length<=maxImageSize){
                imageContent= new Buffer(f).toString('base64');
<<<<<<< HEAD
                content = content.replace(new RegExp('('+publicPath+')*'+imageURL,'g'), 'data:image/' + extname.toLowerCase() + ';base64,' + imageContent);
=======
                    content = content.replace(imageURL, 'data:image/' + extname.toLowerCase() + ';base64,' + imageContent);
>>>>>>> af3c000d568c0b07b2efbb70cb6e01bb5c583b74
            }
        });
        file.contents = new Buffer(content);
        this.push(file);
        cb();
    })
}
module.exports = toBase64;