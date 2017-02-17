/**
 * Created by galrettig on 2/9/17.
 * MIT license.
 */


/**
 * @description - main object, holds imported dependencies and opts
 * @type {{yt: *, yts: *, fs, opts: {maxResults: number, key: string}}}
 */
var ytdns = {
    yt : require('ytdl-core'),
    yts : require('youtube-search'),
    fs : require('fs'),
    opts : {maxResults: 5, key: "YOUR-YOUTUBE-API-KEY-HERE"}
};

/**
 *
 * @param args - usage args -s[search mode accepts a key-word] -d[download mode accepts a url to download] -sd[search and download mode accepts a keyword]
 * @returns {null}
 */

ytdns.handle_args = function(args){
    var argument = args[0];
    if(argument == null) {
        return null;
    } else {
        // control flow on which mode will be used
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

/**
 *
 * @param args - rest of the arguments, key-word to search in youtube
 * @param cb - a callback function to be invoked when the list of results returns..
 */
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
            //TODO: if no callback provided call a default one,
        }
    });

};
//-d url file_name
/**
 * @description - download handler
 * @param args - youtube url to download
 */
ytdns.download = function (args) {
    var url = args[0];
    var video_name = args[1];
    this.yt(url, { filter: function(format) { return format.container === 'mp4'; }}).pipe(this.fs.createWriteStream("./downloads/" + video_name));

};
//-sd key_word
/**
 * @description - search and download mode
 * @param args - keyword to search and download
 */
ytdns.search_and_download = function (args) {
    var that = this;
    var index = args[1];// index to download instead of default item which is 0

    // callback to pass later to this.search function
    function cb (res){
        //search found something
        if(res.length > 0){
            var saveAs;
            // received option to download a different item then 0 in the list
            if(index != null) {
                console.log(res[i]);
                saveAs = that.handle_file_name(res[i].title);
                that.download([res[i].link, saveAs + ".mp4"]);
            } else {
                console.log(res[0]);
                saveAs = that.handle_file_name(res[0].title);
                that.download([res[0].link,  saveAs + ".mp4"]);
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
