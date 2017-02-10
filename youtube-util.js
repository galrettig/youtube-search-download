var ytdns = require("./app");
ytdns.opts.key = (require("./config.json"))["api-key"];
//d, -d will expect a url to download , -sd will search and download

//var key_word = process.argv[3];
ytdns.handle_args((process.argv).slice(2));

