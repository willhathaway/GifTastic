$(document).ready(function () {

    let monsterArray = ['Dragon', 'Vampire', 'Cyclops', 'Werewolf', 'Goblin'];
    let buttonsDiv = $('#buttons-div');

    for (i = 0; i < monsterArray.length; i++) {
        let monsterButton = $('<button class = "btn btn-dark monsterButton" id=' + monsterArray[i] + '>');
        monsterButton.html(monsterArray[i]);
        monsterButton.appendTo(buttonsDiv);
    }

    $("#buttons-div").on("click", ".monsterButton", function () {

        $('#images').empty();

        console.log('click');

        let id = this.id;

        // creates a variable to hold the API endpoint URL
        // question mark creates two blocks of this link. left of ?: API endpoint. right of ?: specific parameters to query
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&q=" + id;

        // uses the built-in jQuery ajax() method to execute the query, requesting ('get') a JSON object from the API endpoint
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            // then a function is called with the response object
            // execute response callback function
            .then(function (response) {
                console.log(response);

                // a variable is declared to hold the property 'image_original_url'

                for (i = 0; i < response.data.length; i++) {


                    rating = response.data[i].rating;

                    imageUrl = response.data[i].images.fixed_height.url;


                    // a html element is created to hold the gif

                    let newDiv = $("<div>");

                    let ratingText = $("<p id='rating'>")
                  
                    let monsterGif = $("<img id='monster-gif'>");
                    

                    // the cat image element is given then attrible linking to the cat image and is given the alt atribute 'monster image'
                    monsterGif.attr("src", imageUrl);
                    monsterGif.attr("alt", "monster image");

                    // the element is prepended to the div of id 'images'

                    $(ratingText).text('rating: ' + rating);

                    $(ratingText).appendTo(newDiv);
                    
                    $(monsterGif).appendTo(newDiv);

                    $(newDiv).appendTo('#images');
                    
                }
            });
    });


    $('#add-button').on('click', function () {

        let input = $('#new-monster-input').val();

        monsterArray.push(input);

        let newButton = $('<button class = "btn btn-primary monsterButton" id=' + input + '>');
        newButton.html(input);
        newButton.appendTo(buttonsDiv);

    });

});