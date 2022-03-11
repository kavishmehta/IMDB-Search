$( document ).ready(function() {
        $("#serch").click(function() {
            var page=1;
            for(page=1;page<3;page++){
              getImdbInfo($("#title").val(),page);
            }
        })
    });

    // The some cjavefunction below takes the entered title and searchs imdb for a match then it displays as followed

    function getImdbInfo(Title, page) {
        // var page = 1;
        // for(page=1;page<3;page++){
        $.ajax({
          url: "http://www.omdbapi.com/?s=" + Title + "&page=" + page,
          cache: false,
          dataType: "json",
          success: function(data) {
                // you get an object for iteration, the keys are Title, Type, Year, imdbID
                console.log(data);

               // if(page==1){
               var movieHTML = '<div>';

                // iterate over the data result set
                $.each(data.Search, function(index, callback) {
                    movieHTML += '<div class="col s12 m3"><div class="card hoverable"><div class="card-image waves-effect waves-block waves-light" style="height:200px !important;">';
            
                    //Image
                    movieHTML += '<img class="activator"';
                    movieHTML += ' src="' + callback.Poster + '" alt="Image Not Available">';
                    movieHTML += '</div>';

                    //Title
                    movieHTML += '<div class="card-content"> <span class="card-title activator truncate grey-text text-darken-4">';
                    movieHTML += '<h4>' + callback.Title + '</h4>';
                    movieHTML += '<i class="material-icons right">more_vert</i></span></div>';

                    //Reveal
                    movieHTML += '<div class="card-reveal"><span class="card-title grey-text text-darken-4">';
                    movieHTML += callback.Title;
                    movieHTML += '<i class="material-icons right">close</i></span>';
                    movieHTML += '<p><strong>Type: </strong>' + callback.Type + '</p>';
                    movieHTML += '<p><strong>Released Year: </strong>' + callback.Year + '</p>';
                    movieHTML += '<p><strong>IMDB ID: </strong>' + callback.imdbID + '</p>';
                    movieHTML += '</div></div></div>';

                });

                 movieHTML += '</div>';

                   // insert the html
                if(page==1)
                $("#Results1").html(movieHTML);
                if(page==2)
                $("#Result").html(movieHTML);

          },
          error: function (request, status, error) { alert(status + ", " + error); }
        });
    }

  