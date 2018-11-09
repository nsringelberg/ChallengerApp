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
  var listOfGames = JSON.parse(g);
  if(!g){
    listOfGames = [];
  }
  for(var i=0; i<listOfGames.length; i++){
    game = listOfGames[i];
    var currHtml = template({"GameTitle": game});
    parentDiv.append(currHtml);
  }

}

