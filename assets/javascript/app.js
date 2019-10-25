$(document).ready(function () {

    let animalArray = ['Lion', 'Rhino', 'Bear', 'Wolf', 'Owl'];
    let buttonsDiv = $('#buttons-div');

    for (i = 0; i < animalArray.length; i++) {
        let animalButton = $('<button class = "btn btn-primary animalButton" id=' + animalArray[i] + '>');
        animalButton.html(animalArray[i]);
        animalButton.appendTo(buttonsDiv);
    }

    $("#buttons-div").on("click", ".animalButton", function () {

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

                    imageUrl = response.data[i].bitly_gif_url;


                    // a html element is created to hold the cat image
                    let animalGif = $("<img id='animal-gif'>");

                    // the cat image element is given then attrible linking to the cat image and is given the alt atribute 'cat image'
                    animalGif.attr("src", imageUrl);
                    animalGif.attr("alt", "animal image");

                    // the cat image element is prepended to the div of id 'images'
                    $("#images").prepend(animalGif);
                }
            });
    });


    $('#add-button').on('click', function () {

        let input = $('#new-animal-input').val();

        animalArray.push(input);



        let newButton = $('<button class = "btn btn-primary animalButton" id=' + input + '>');
        newButton.html(input);
        newButton.appendTo(buttonsDiv);

    });

});