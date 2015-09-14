$(document).ready(function () {
	var clicks = 0;
	$('#clicks').text(clicks);
	$('#cat').click(function(e) {
  	clicks++;
  	$('#clicks').text(clicks);
	});
});





