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

  var g = localStorage.getItem("Games");
  var games2 = JSON.parse(g);
  if(!g){
    games2 = [];
  }

//grab title
  var queryParams = new URLSearchParams(window.location.search);
  var gameTitle = queryParams.get('title');

//put game title in header
  var sourceH = $("#header-template").html();
  var templateH = Handlebars.compile(sourceH);

  var parentDivH = $("#yeet");
  var html = templateH({"GameTitle": gameTitle});
  parentDivH.append(html);

//put challenges in
  var challengeList = JSON.parse(localStorage[gameTitle]);
  for (var j=0; j<challengeList.length; j++){
    var currData = challengeList[j];
    if (currData["difficulty"] == "easy"){
      currData["difficulty"] = "text-white bg-success";
      currData['diffBorder'] = "border-success";
      currData["diffName"] = 'Easy'
    } else if (currData["difficulty"] == "medium"){
      currData["difficulty"] = "bg-warning";
      currData['diffBorder'] = "border-warning";
      currData["diffName"] = "Medium"
    } else{
      currData["difficulty"] = "text-white bg-danger";
      currData['diffBorder'] = "border-danger";
      currData["diffName"] = "Hard"
    }
    currData["GameTitle"] = gameTitle;
    currData["index"] = j;
    currData["uid"] = gameTitle + "%" + j;
    var currHtml = template(currData);
    parentDiv.append(currHtml);
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
