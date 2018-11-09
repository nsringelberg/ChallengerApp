// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#templatedChallenges");
  for(var game in games){
    var challengeList = games[game];
    for (var i=0; i<challengeList.length; i++){
      var currData = challengeList[i];
      currData["GameTitle"] = game;
      var currHtml = template(currData);
      parentDiv.append(currHtml);
    }
  }

  var g = localStorage.getItem("Games");
  var games2 = JSON.parse(g);
  if(!g){
    games2 = [];
  }
  for(var i=0; i<games2.length; i++){
    game = games2[i];
    var challengeList = JSON.parse(localStorage[game]);
    for (var j=0; j<challengeList.length; j++){
      var currData = challengeList[j];
      if (currData["difficulty"] == "easy"){
        currData["difficulty"] = "border-success";
      } else if (currData["difficulty"] == "medium"){
        currData["difficulty"] = "border-warning";
      } else{
        currData["difficulty"] = "border-danger";
      }
      currData["GameTitle"] = game;
      currData["index"] = j;
      currData["uid"] = game + j;
      var currHtml = template(currData);
      parentDiv.append(currHtml);
    }
  }

}


function addToList(title, idx){
  var myListGames = localStorage.getItem("myListGames");
  var myListChallenges = localStorage.getItem("myListChallenges");
  if(myListGames == null){
    myListGames = [];
    myListChallenges = [];
  } else {
    myListGames = JSON.parse(myListGames);
    myListChallenges = JSON.parse(myListChallenges);
  }
  myListGames.push(title);
  myListChallenges.push(idx);
  localStorage.setItem("myListGames", JSON.stringify(myListGames));
  localStorage.setItem("myListChallenges", JSON.stringify(myListChallenges));
  $("#" + title+idx).html("Added");
}