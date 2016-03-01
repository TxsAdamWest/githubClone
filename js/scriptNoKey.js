// *************Variables / querySelectors

var inputEl = document.querySelector("input")
var containerBox = document.querySelector("#container")
var profileBox = document.querySelector("#profColumn")
var repoBox = document.querySelector('#repoColumn') 
var baseURL = "https://api.github.com/users/txsadamwest"


var searchBaseUrl = "https://api.github.com/users/"

console.log("werd up!")

var profilePromise = $.getJSON(baseURL)
var repoPromise = $.getJSON(baseURL + '/repos')

// *********Profile Promise 

var fetchProfileData = function(jsonData) {
    console.log(jsonData)

    var htmlStr = ''

       var p = jsonData
       
       htmlStr += '<img src="' + p.avatar_url + '">'
       htmlStr += '<h1>'+p.name +'</h1>'
       htmlStr += '<h2>'+p.login +'</h2>'
       htmlStr +=    "<div class='dateJoined'><i class='fa fa-clock-o'></i>Joined on Nov 24,2015</div>"
       htmlStr +=    "<div class='profileStats'> # # # </div>"
    
    console.log(htmlStr)
    profColumn.innerHTML = htmlStr
  }

//profilePromise.then(fetchProfileData)
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
       htmlStr += '<li><a href="'+p.clone_url+'">'+p.name +'</a><br><br>Updated 6 days ago</li>'
       // htmlStr +=    "<li>Updated 6 days ago</li>"
       // htmlStr +=    "<li>"+ p.facebook_id+"</li>"
       // htmlStr +=    "<li> "+ p.twitter_id+"</li>"
       htmlStr += '</ul>'
       // htmlStr += '<h5> Term End'+p.term_end+'</h5>'
       htmlStr += '</div>'
    
    console.log(htmlStr)
    repoColumn.innerHTML = htmlStr
  }
}

//repoPromise.then(fetchRepoData)

// *************Search Function 



// This stores the input text and clears it out when user hits 'Enter'
var inputToUrl = function(keyEvent) {
  var inputEl = keyEvent.target
  if (keyEvent.keyCode === 13) {
    var userName = inputEl.value
    inputEl.value = ""
    location.hash = userName
  }
}

// console.log(userName) 

var doRequest = function(userName) {
    var fullUrl = searchBaseUrl + userName 
    console.log(fullUrl)
    var userNamePromise = $.getJSON(fullUrl)
    userNamePromise.then(fetchProfileData)

    var reposUrl = searchBaseUrl + userName + '/repos'
    var userReposPromise = $.getJSON(reposUrl)
    userReposPromise.then(fetchRepoData)
}

var controller = function() {
  var newRepoHTMLstring = ""
  var hash = location.hash.substr(1)
  userName = hash
    doRequest(hash)
}

inputEl.addEventListener("keydown", inputToUrl)

window.addEventListener("hashchange",controller)

console.log(inputToUrl)


