var showcat = function (cat) {
	$('#catimg').attr('src', cat.imgsrc);
	$('#catimg').unbind('click');
	$('#catimg').click(function () {
		cat.clicks++;
		$('#catclicks').text(cat.clicks);
	});
	$('#catclicks').text(cat.clicks);
};

$(document).ready(function () {
	for (var i = 0; i < cats.length; i++) {
    $catbutton = $('<button class="btn btn-default btn-block">');
    $catbutton.text(cats[i].name);   
    // click handler
    $catbutton.click((function (cat) {
    	return function () {
    		showcat(cat);
    	}
    })(cats[i]));
    $('#catlist').append($catbutton);
	}

	showcat(cats[0]);

});





