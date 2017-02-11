# youtube-search-download
CLI tool for searching and/or downloading from youtube
Youtube-Api-Key is needed(you can easily get one in 5minutes from google-api)

###config.json , replace "your-api-key" with your api key, save and you are ready to go.
```
{"api-key":"Your-api-key"} 
```

```
usage : $node index.js -sd [key-word-to-search-in-youtube]
```
Will search in youtube or the provided keyword and will download the first item in the list into ./downloads/ folder

```
usage : $node index.js -s [key-word]
```

Will search in youtube for the keyword (check youtube api for return value)
```
usage: $node index.js -d [url]
```
