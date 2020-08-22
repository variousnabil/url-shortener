# url-shortener-microservice
a url shortener microservice that was made with express.js.

example of shortlink:  
`{url}/api/shorturl/or2emjuhfr`

# routes
POST - `{url}/api/shorturl/new` with json body like below:
```json
{
    "original_url": "facebook.com"
}
``` 
is to create shorturl, this method will response in json format like below:
```json
{
    "original_url": "facebook.com",
    "short_url": "or2emjuhfr"
}
```

GET - `{url}/api/shorturl/{unique_id}` = to access the shorturl

# how to install
1. git clone
2. cd to project folder
3. yarn install
4. yarn start