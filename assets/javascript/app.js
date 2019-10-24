$(document).ready(function(){



// function is run when the #cat-button button is clicked:
    $("#gif-button").on("click", function() {
        console.log('click');
        // creates a variable to hold the API endpoint URL
        // question mark creates two blocks of this link. left of ?: API endpoint. right of ?: specific parameters to query
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=ghibli";
  
        // uses the built-in jQuery ajax() method to execute the query, requesting ('get') a JSON object from the API endpoint
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
          // then a function is called with the response object
          // execute response callback function
          .then(function(response) {
            console.log(response);
  
            // a variable is declared to hold the property 'image_original_url'
            var imageUrl = response.data.image_original_url;
  
            // a html element is created to hold the cat image
            var catImage = $("<img>");
  
            // the cat image element is given then attrible linking to the cat image and is given the alt atribute 'cat image'
            catImage.attr("src", imageUrl);
            catImage.attr("alt", "cat image");
  
            // the cat image element is prepended to the div of id 'images'
            $("#images").prepend(catImage);
          });
      });
    
    });