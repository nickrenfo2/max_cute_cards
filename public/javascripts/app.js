$(function () {



    //loads 5 images
    var defImages=5;
    for (var i=0;i<defImages;i++) {
        loadImg(i);
    }

    $('.newDeck').on('click', function() {
        imageList = [];

        $('.imagesWrapper').html("");

        for (var i = 0; i < defImages; i++) {
            var randomStart = getRandomInt(0, 6);
            if(!loadImg(randomStart))
                i--;
            console.log(randomStart);
        }
    });

    $(document).on('click','.refresh', function() {
       console.log("something");
        var thisImg = $(this).attr('id');
        $(this).parent().remove();

        thisImg = parseInt(thisImg.slice(thisImg.length-1));
        console.log(thisImg);
       var imgLoaded = false;
       while(!imgLoaded) {
           imgLoaded = loadImg(getRandomInt(0, 6));
       }
        imageList.splice(imageList.indexOf(thisImg),1);

    });

});

var imageList = [];

function loadImg(id){

    var findImg = $.inArray(id, imageList);

    if (findImg >= 0) {
        return false;
    }

    imageList.push(id);
    console.log('imagelist:');
    console.log(imageList);
    $.ajax('/'+id).done(function (res) {
        var htmlString = "<div class='col-md-2 img'><img class='img-rounded' src='"+res.link+"'/><button class='btn btn-default refresh' id='img"+id+"'>^ Refresh ^</button></div>";
        $('.imagesWrapper').append(htmlString);
    });
    return true;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


