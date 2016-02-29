// *************Variables / querySelectors

var containerBox = document.querySelector("#container")
var profileBox = document.querySelector("#profColumn")
var repoBox = document.querySelector('#repoColumn') 
var baseURL = "https://api.github.com/users/txsadamwest"

console.log("werd up!")

var profilePromise = $.getJSON(baseURL)
var repoPromise = $.getJSON(baseURL + '/repos')

// *********Profile Promise 

var fetchProfileData = function(jsonData) {
  // $.getJSON("https://api.github.com/users/txsadamwest").then(function(d){
    console.log(jsonData)
    // var el = '#container'  
    // console.log(d)
    // var ghProfile = d.results

    var htmlStr = ''

    // for(var i = 0; i < jsonObj.length; i++){
       var p = jsonData
       
       htmlStr += '<img src="' + p.avatar_url + '">'
       htmlStr += '<h1>'+p.name +'</h1>'
       htmlStr += '<h2>'+p.login +'</h2>'
       // htmlStr += '<ul>'
       // htmlStr +=    "<li>"+ p.email +"</li>"
       // htmlStr +=    "<li>"+ p.website+"</li>"
       // htmlStr +=    "<li>"+ p.facebook_id+"</li>"
       // htmlStr +=    "<li> "+ p.twitter_id+"</li>"
       // htmlStr += '</ul>'
       // htmlStr += '<h5> Term End'+p.term_end+'</h5>'
       // htmlStr += '</div>'
    
    console.log(htmlStr)
    profColumn.innerHTML = htmlStr
  }

profilePromise.then(fetchProfileData)
// *********Repo Promise


var fetchRepoData = function(jsonData) {
  // $.getJSON("https://api.github.com/users/txsadamwest").then(function(d){
    console.log(jsonData)
    // var el = '#container'  
    // console.log(d)
    // var ghProfile = d.results

    var htmlStr = ''

    for(var i = 0; i < jsonData.length; i++){
       var p = jsonData[i]
       console.log(p)

       htmlStr += '<div class="repos">'
      
       // htmlStr += '<h2><a href="'+p.html_url +'"</a></h2>'
       htmlStr += '<ul>'

       // htmlStr += '<li>"Repo Name"</li>'
       htmlStr += '<li><a href="/TxsAdamWest/Day16colorClock">'+p.name +'</a></li>'
       htmlStr +=    "<li>Updated 6 days ago</li>"
       // htmlStr +=    "<li>"+ p.facebook_id+"</li>"
       // htmlStr +=    "<li> "+ p.twitter_id+"</li>"
       htmlStr += '</ul>'
       // htmlStr += '<h5> Term End'+p.term_end+'</h5>'
       htmlStr += '</div>'
    
    console.log(htmlStr)
    repoColumn.innerHTML = htmlStr
  }
}

repoPromise.then(fetchRepoData)

// *************Search Function 

var inputEl = document.querySelector("input")

var doRequest = function(searchQuery) {
    var fullUrl = baseUrl + searchQuery + apiKey
    var searchPromise = $.getJSON(fullUrl)
    searchPromise.then(showData)
}


var userSearch = function(keyEvent) {
  var inputEl = keyEvent.target
  if (keyEvent.keyCode === 13) {
    var searchQuery = inputEl.value
    inputEl.value = ""
    doRequest(searchQuery)
  }

}

inputEl.addEventListener("keydown", userSearch)
