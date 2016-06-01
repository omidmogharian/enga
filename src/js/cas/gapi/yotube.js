class youtubeApi {
  constructor() {
    window.gapi.client.setApiKey(window.youtubeApiKey);

  }

  _loadYoutubeClient(callback) {
    window.gapi.client.load('youtube', 'v3',callback);
  }

  _deferredinit(justdeferred) {
    let  deferred = null;
    if (!justdeferred)
      deferred = window.$.Deferred();
    else
      deferred = justdeferred;
    return deferred
  }

  _extractyId (url) {
    var video = url.match(/^.*youtu(?:\.)?be(?:\.com)?(?:\/|v\/|u\/\w\/)(?:embed\/|watch\?(v=|.*(?=[vt]=)))([^#\&\?]+)/);
    var user = url.match(/(?:(user)\/(.*))/);
    var channel = url.match(/(?:(channel)\/(.*))/);
    return {
      "video": (video && video[1] == 'v=')?video[video.length - 1]:null,
      "user": (user && user[1] == 'user')? user[user.length - 1] :null,
      "channel":  (channel && channel[1] == 'channel')? channel[channel.length - 1]: null
    };
  }
  _setAccessTokenEmpty() {
    window.gapi.auth.setToken({
      access_token: ""
    });
  }

  ytSearch(keywords,excludes,maxResult=20,order="viewCount",type="video",justdeferred=false) {

    if(keywords.isArray)
      for(let i=0;i<keywords.length;i++)
        keywords[i]=keywords[i].toString();
    else
      keywords=keywords.toString();

    if(excludes.isArray)
      for(let i=0;i<excludes.length;i++)
        excludes[i]=excludes[i].toString();
    else
      excludes=excludes.toString();


    this._setAccessTokenEmpty();
    let  deferred =  this._deferredinit(justdeferred);


    if(!window.gapi.client.youtube) {
      this._loadYoutubeClient(this.ytSearch.bind(this, keywords, excludes,maxResult,order,type, deferred));
      return deferred.promise();
    }
    if (!Array.isArray(keywords)){
      keywords=[keywords]
    }
    let queryText= "";
    for(let i=0;i<keywords.length;i++)
      queryText+=' "'+keywords[i]+'"';
    for(let i=0;i<excludes.length;i++)
      queryText+=' -"'+excludes[i]+'"';
    let options = {
      q: queryText,
      part: 'snippet',
      maxResults:maxResult,
      order:order,
      type: type
    };
    try{
      let request = window.gapi.client.youtube.search.list(options);
      let self = this;
      request.execute(function (response) {
        if (response.result && response.result.items.length> 0) {
          let result=[];
          for (let i =0; i<response.result.items.length;i++){
            let item = response.result.items[i];
            self.videosDetials(item.id.videoId,"statistics").then(function (vDetail) {
              result.push({"id": item.id.videoId, "snippet": item.snippet, "statistics": vDetail.statistics});
              if(i==response.result.items.length-1) {
                deferred.resolve(result);
              }
            })
          }

        }
        else
          deferred.reject("Some error happen");
      });
    }
    catch (err){
      deferred.reject(err);
    }
    if (!justdeferred)
      return  deferred.promise();
  }



  videosDetials(vid,parts,justdeferred=false){

    this._setAccessTokenEmpty();
    let  deferred =  this._deferredinit(justdeferred);


    if(!window.gapi.client.youtube) {
      this._loadYoutubeClient(this.videosDetials.bind(this, vid,parts, deferred));
      return deferred.promise();
    }

    let options = {
      id: vid,
      part: parts
    };
    try{

      let request = window.gapi.client.youtube.videos.list(options);

      request.execute(function (response) {
        if (response.result && response.result.items.length> 0) {

          deferred.resolve(response.result.items[0])
        }

        else
          deferred.reject("Some error happen");
      });
    }
    catch (err){
      deferred.reject(err);
    }
    if (!justdeferred)
      return  deferred.promise();

  }
  getChannelTitle(uri,justdeferred=false) {
    this._setAccessTokenEmpty();
    let  deferred =  this._deferredinit(justdeferred);


    if(!window.gapi.client.youtube) {
      this._loadYoutubeClient(this.getChannelTitle.bind(this,uri,deferred));
      return deferred.promise();
    }

    let options = {
      part: 'snippet'
    };
    if (uri.indexOf('www') !=-1 || uri.indexOf('http') !=-1 ||uri.indexOf('https') !=-1) {
      let matched = this._extractyId(uri);
      if (matched.channel !== null) {
        options.id =  matched.channel;

      }
      else if (matched.user !== null) {
        options.forUsername =  matched.user;
      }
    }
    else {
      options.id = uri;
    }

    try{

      let request = window.gapi.client.youtube.channels.list(options);

      request.execute(function (response) {
        if (response.result && response.result.items.length> 0) {
          let chTitle = response.result.items[0].snippet.title;
          let chId = response.result.items[0].id;

          if (chTitle)
            deferred.resolve({'id':chId,'title':chTitle});
        }

        else
          deferred.reject("Not a valid input");
      });
    }
    catch (err){
      deferred.reject(err);
    }
    if (!justdeferred)
      return  deferred.promise();
  }


}
export default youtubeApi;
