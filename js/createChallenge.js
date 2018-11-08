// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $("#createButton").click(createChallenge)

  // Add any additional listeners here
  // example: $("#div-id").click(functionToCall);
}

function createChallenge(){
  //$("#creationError").toggleClass("hidden")
  var gameTitle = $("#gameTitle").val();
  var challengeTitle = $("#challengeTitle").val();
  var description = $("#description").val();
  var difficulty = $("input[name=difficultyBtn]:checked").val();

  if((gameTitle=="") || (challengeTitle=="") || (description=="") || (difficulty==undefined)){
    $("#creationError").removeClass("hidden");
    return;
  } else{
    $("#creationError").addClass("hidden");
  }

  var challenge = {"ChallengeTitle" : challengeTitle, 
                   "ChallengeDescription": description,
                   "difficulty": difficulty};


  var challenges = localStorage.getItem(gameTitle);
  var list = [];
  if(challenges == null){
    list = [];
  }else{
    list = JSON.parse(challenges);
  }

  list.push(challenge);
  localStorage.setItem(gameTitle, JSON.stringify(list));
  window.location.assign("challenge.html");
}