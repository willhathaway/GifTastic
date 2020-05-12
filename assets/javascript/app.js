$(document).ready(function () {

    // Defining the array of monsters:

    let monsterArray = ['Dragon', 'Vampire', 'Cyclops', 'Werewolf', 'Goblin'];

    // jQuery selecting the HTML div to hold the buttons:

    let buttonsDiv = $('#buttons-div');

    // For loop creating buttons for each item in the array:

    for (i = 0; i < monsterArray.length; i++) {
        let monsterButton = $('<button class = "btn btn-dark monsterButton" id=' + monsterArray[i] + '>');
        monsterButton.html(monsterArray[i]);
        monsterButton.appendTo(buttonsDiv);
    }

    // On-click event to query the Giphy API and display 10 gifs:

    $("#buttons-div").on("click", ".monsterButton", function () {

        // Empty the images div of gifs from any previous clicks:

        $('#images').empty();

        // Defining a variable to hold the name of the monster, taken from the monsterButton (created in the for loop):

        let id = this.id;

        // Creates a variable to hold the API endpoint URL,
        // The question mark creates two blocks within the link. Left of ?: API endpoint. Right of ?: specific parameters to query:

        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&q=" + id;

        // Uses the built-in jQuery ajax() method to execute the query, requesting ('get') a JSON object from the API endpoint:

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // Function is .then() called with the response object:

            .then(function (response) {

                // Console logs the response to see what the object looks like, how to retrieve information:

                console.log(response);

                // Loops through the response data (limited in the query to 10 gifs):

                for (i = 0; i < response.data.length; i++) {

                    // Defines variables to hold the gif and the rating:

                    let rating = response.data[i].rating;

                    let imageUrl = response.data[i].images.fixed_height.url;

                    // An HTML div is created to hold the gif and the rating:

                    let newDiv = $("<div>");

                    let ratingText = $("<p id='rating'>")

                    let monsterGif = $("<img id='monster-gif'>");

                    // Note: the following comment and 2 lines of code were taken/modified from the cat-button activity from October 19
                    // The image element is given then attribute linking to the monster image, and is given the alt atribute 'monster image':

                    monsterGif.attr("src", imageUrl);
                    monsterGif.attr("alt", "monster image");


                    monsterGif.attr("data-still", response.data[i].images.original_still.url);
                    monsterGif.attr("data-animate", response.data[i].images.original.url);
                    monsterGif.attr("data-state", "still");


                    // The rating and the gif are both appended to the newDiv element


                    $(ratingText).text('rating: ' + rating);

                    $(ratingText).appendTo(newDiv);

                    $(monsterGif).appendTo(newDiv);

                    // The newDiv, complete with rating and gif, is now added to the #images div:

                    $(newDiv).appendTo('#images');

                }
            });
    });

    // play/pause gifs on click function:

    $(document).on("click", ".monsterGif",function(){

        let state = $(this).attr("data-state");
        let animateGiphy = $(this).attr("data-animate");
        let stillGiphy = $(this).attr("data-still");
    
            if (state === "pause") {
          $(this).attr("src", animateGiphy);
          $(this).attr("data-state", "play");
        }
    
        else if (state === "play") {
          $(this).attr("src", stillGiphy);
          $(this).attr("data-state", "pause");
        }
      });


    // On-click function for adding a new button to the list:

    $('#add-button').on('click', function () {

        // Defines a variable to hold the user input:

        let input = $('#new-monster-input').val();

        // Pushes the input to the monsterArray:

        monsterArray.push(input);

        // Creates a new button and adds it to the #buttonsDiv:

        let newButton = $('<button class = "btn btn-primary monsterButton" id=' + input + '>');
        newButton.html(input);
        newButton.appendTo(buttonsDiv);

    });

});