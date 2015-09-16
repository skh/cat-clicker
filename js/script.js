$(document).ready(function () {
	for (var i = 0; i < cats.length; i++) {
    $catdiv = $('<div class="col-md-6">');
    $catdiv.append('<h1 class="text-center">' + cats[i].name + '</h1>');
    var $img = $('<img class="img-responsive img-rounded" id="' + cats[i].name + '">');
    $img.attr('src', cats[i].imgsrc);
    $catdiv.append($img)
    $catdiv.appendTo('#catsrow');

    // click handler
    $('#' + cats[i].name).click(function (e) {
    	console.log("a cat was clicked");
    	clicks++;
    	$('#clicks').html(clicks);
    });
	}

	var clicks = 0;
	$('#clicks').html(clicks);	

});





