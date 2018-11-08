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

  for(var i=0; i<localStorage.length; i++){
    game = localStorage.key(i);
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
      var currHtml = template(currData);
      parentDiv.append(currHtml);
    }
  }
}