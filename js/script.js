//DOM Nodes

var inputEl = document.querySelector("input")
var containerBox = document.querySelector("#container")
var profileBox = document.querySelector("#profColumn")
var repoBox = document.querySelector('#repoColumn') 

//Base URLS
var baseURL = "https://api.github.com/users/"
var url = 'https://api.github.com/users/repos/'
var searchBaseUrl = "https://api.github.com/users/"


//Global key link from seperate file to avoid being banned from github. :o  
var key = GLOBAL_KEY
var name

try {
  var key = GLOBAL_KEY
}
catch (e) {
  var key = ' '
}

var params = {
  access_key: key
}


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


var fetchRepoData = function(jsonData) {

    var htmlStr = ''

    for(var i = 0; i < jsonData.length; i++){
       var p = jsonData[i]
       console.log(p)

       htmlStr += '<div class="repos">'
       htmlStr += '<ul>'
       htmlStr += '<li><a href="'+p.clone_url+'">'+p.name +'</a></li>'
       htmlStr += '<li>Updated 6 days ago</li>'
       htmlStr += '</ul>'
       htmlStr += '</div>'
    
    console.log(htmlStr)
    repoColumn.innerHTML = htmlStr
  }
}

//Search Function //

var inputToUrl = function(keyEvent) {
  var inputEl = keyEvent.target
  if (keyEvent.keyCode === 13) {
    // Captures the user's input value.
    var userName = inputEl.value
    
    // This stores the input text and clears it out when user hits 'Enter'/
    inputEl.value = ""

    // Now passing the user's input into our url.
    location.hash = userName
  }
} 

var doRequest = function(userName) {
    
    //Create our full url using our Base, plust the username entered by the user, and our api key to allow us access.
    var fullUrl = searchBaseUrl + userName + key
    var reposUrl = searchBaseUrl + userName + '/repos' + key
    
    //Submit our request for data.
    var userNamePromise = $.getJSON(fullUrl)
    var userReposPromise = $.getJSON(reposUrl)

    //Declare the function that will run once data is ready.
    userNamePromise.then(fetchProfileData)
    userReposPromise.then(fetchRepoData)
}

function renderHomeView() {
  console.log("Controller invoked")
  repoBox.innerHTML = "Enter a username into the search bar to see that user's profile and repositories."
}

var controller = function() {
  var newRepoHTMLstring = ""
  var hash = location.hash.substr(1)

  if (hash === "home"){
    renderHomeView()
  }

  else {
    userName = hash
    doRequest(hash)
  }
}

location.hash = "home"
controller()

inputEl.addEventListener("keydown", inputToUrl)
window.addEventListener("hashchange",controller)




