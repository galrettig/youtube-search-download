/**
 * Created by galrettig on 2/10/17.
 */
/**
 * Created by galrettig on 2/9/17.
 */


var ytdns = {
    yt : require('ytdl-core'),
    yts : require('youtube-search'),
    fs : require('fs'),
    opts : {maxResults: 5, key: "YOUR-YOUTUBE-API-KEY-HERE"}
};

ytdns.handle_args = function(args){
    var argument = args[0];
    if(argument == null) {
        return null;
    } else {
        switch (argument) {
            case "-s" :
                this.search(args.slice(1), null);
                break;
            case "-d" :
                this.download(args.slice(1));
                break;
            case "-sd":
                this.search_and_download(args.slice(1));
                break;
            default:
                break;

        }

    }
};
ytdns.search = function (args,cb) {
    console.log(args);
    var key_word = args[0];

    this.yts(key_word, ytdns.opts, function(err, results) {
        if(err) {
            return console.log(err);
        }

        else if(cb != null) {
            cb(results);
        } else {

        }
    });

};
//-d url file_name
ytdns.download = function (args) {
    console.log("download-args : " + args + "\ndownload-args-END");
    var url = args[0];
    var video_name = args[1];
    this.yt(url).pipe(this.fs.createWriteStream("./downloads/" + video_name));

};
//-sd key_word
ytdns.search_and_download = function (args) {
    var that = this;
    console.log("search_and_Download");
    var index = args[1];
    function cb (res){
        if(res.length > 0){
            if(index != null) {
                console.log(res[i]);
                that.download([res[i].link, (res[i].title).replace(/ /gi,"_") + ".mp4"]);
            } else {
                console.log(res[0]);
                that.download([res[0].link, (res[0].title).replace(/ /gi,"_") + ".mp4"]);
            }
        }
    };
    this.search(args, cb);


};
ytdns.handle_file_name = function(fname){
    var s = fname.replace(/[^A-Za-z0-9]/gi, "_");
    s = s.replace(/__/gi,"_");
    return s;
};

module.exports = ytdns;
