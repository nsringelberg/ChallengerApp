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
  var uid = queryParams.get('challengeID');
  var gameTitle = uid.split("%")[0];
  var idx = uid.split("%")[1];


//put challenges in
  var challengeList = JSON.parse(localStorage[gameTitle]);
  var currData = challengeList[idx];
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
  currData["index"] = idx;
  currData["uid"] = gameTitle.replace(/\s/g,'') + idx;
  var currHtml = template(currData);
  parentDiv.append(currHtml);
  addToList(gameTitle, idx);
  addToList(gameTitle, idx);
}


function addToList(title, idx){
  var myListGames = localStorage.getItem("myListGames");
  var myListChallenges = localStorage.getItem("myListChallenges");
  var inList = -1;
  var place = -1;
  if(myListGames == null){
    myListGames = [];
    myListChallenges = [];
  } else {
    myListGames = JSON.parse(myListGames);
    myListChallenges = JSON.parse(myListChallenges);
  }


  for(game1 in myListGames) {
    if(myListGames[game1] == title && myListChallenges[game1] == idx){

      inList = 1;
      place = game1;
    }
  }
  if (inList == 1) {
    //remove from list
    myListGames.splice(place, 1);
    myListChallenges.splice(place,1);
    $("#" + title.replace(/\s/g, '')+idx).html("Add to My List");
    inList = -1;
  } else {
    //add to list
    myListGames.push(title);
    myListChallenges.push(idx);
    $("#" + title.replace(/\s/g, '')+idx).html("Remove from My List");
  }


  localStorage.setItem("myListGames", JSON.stringify(myListGames));
  localStorage.setItem("myListChallenges", JSON.stringify(myListChallenges));

    //if(myListChallenges.includes(idx) && myListGames.includes(Title)){

  //}

  //if my list already has this item, remove it
  //$("#" + title.replace(/\s/g, '')+idx).html("Add to My List");
}
