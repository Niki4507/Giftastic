$( document ).ready(function() {
// An array of actions, new actions will be pushed into this array;
var topics = ["Tacos", "Cats", "Pizza", "Books", "Dogs", "Climbing", "Glitter", "Cowboys"];

//Functions start here
function displayGifButtons(){
//no dupilcate buttons when pulling topics
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("topics");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}


// Function that displays all of the gifs
function displayGifs(){
    var topics = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        //empty the div each time
        $("#gifsView").empty();
        var results = response.data; 

        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");

            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
  
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);

            $("#gifsView").prepend(gifDiv);
        }
    });
}

function addNewButton(){
    $("#addGif").on("click", function(){
    var topic = $("#action-input").val().trim();
    //fixed error of blank buttons
    if (topic == ""){
      return false;
    }
    topics.push(topic);

    displayGifButtons();
    return false;
    });
}
// Calling Functions for Displaying GIFs
displayGifButtons(); 
addNewButton();

//Changing animation states of GIFs on click
$(document).on("click", ".topics", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});