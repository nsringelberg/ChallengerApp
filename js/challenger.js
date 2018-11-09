// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    var source = $("#challenge-template").html();
    var template = Handlebars.compile(source);

    var parentDiv = $("#myChallenges");

    var myGames = localStorage.getItem("myListGames");
    var myChallenges = localStorage.getItem("myListChallenges");


    if(myGames == null){
        myGames = [];
        myChallenges = [];
    } else {
        myGames = JSON.parse(myGames);
        myChallenges = JSON.parse(myChallenges);
    }

    for(var i=0;i < myGames.length; i++){
        game = myGames[i];
        challenge = myChallenges[i];
        var challengeData = JSON.parse(localStorage.getItem(game))[challenge];
        challengeData["GameTitle"] = game;
        var currHtml = template(challengeData);
        parentDiv.append(currHtml);
    }
	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
}



function openTab(evt, tab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
