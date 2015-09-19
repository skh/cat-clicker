$(function() {
  var model = {
    currentCat: "",
    cats: [{
      "name": "Catherine",
      "ucid": "9fc8427f19e596be73cc74b6bb0a5ebc",
      "imgsrc": "img/cat.jpg",
      "clicks": 0
  	}, {
      "name": "Murr",
      "ucid": "03e2096cb6111748a403be765b0343c7",
      "imgsrc": "img/murr.jpg",
      "clicks": 0
    }, {
      "name": "Hunter",
      "ucid": "c512086575aae37d86df083b90f6f901",
      "imgsrc": "img/hunter.jpg",
      "clicks": 0
    }, {
      "name": "Clara",
      "ucid": "3b0811881fe50b3c02dc4d88ac6aebd2",
      "imgsrc": "img/clara.jpg",
      "clicks": 0
    }, {
      "name": "Y T",
      "ucid": "bc682c8035b1caf5b4c2d9a2f7fc9a59",
      "imgsrc": "img/yt.jpg",
      "clicks": 0
    }],
    debug: function () {
    	console.log(this);
    }

  };

  var octopus = {
  	getCatList: function () {
  		return model.cats;
  	},
  	selectCat: function (ucid) {
  		model.currentCat = ucid;
  		catdetail.render();
  	},
  	getCurrentCat: function () {
  		var selectedCats = model.cats.filter(function (cat) {
  			return cat.ucid == model.currentCat;
  		});
  		console.log(selectedCats);
  		if (selectedCats.length == 1) {
  			return selectedCats[0];
  		} else {
  			console.log("selected cat " + model.currentCat + " doesn't exist");
  			return undefined;
  		}
  	},
  	countCurrentCatClick: function () {
  		var cat = this.getCurrentCat();
  		cat.clicks++;
  		catdetail.render();
  	},
    init: function() {
      catlist.init();
      catdetail.init();
    },
    debug: function () {
    	model.debug();
    }
  };

  var catlist = {
    init: function() {
    	this.$catlistcontainer = $('#cat-list-container');
    	this.catlist = octopus.getCatList();	
     	this.render(); 	
    },
    render: function () {
			this.catlist.forEach(function (cat) {
    		var $catbutton = $('<button class="btn btn-default btn-block">');
    		$catbutton.text(cat.name);
    		$catbutton.click((function (ucid) {
    			return function () {
    			octopus.selectCat(ucid);
    		}
    	})(cat.ucid));
    		this.$catlistcontainer.append($catbutton);
    	}, this);
    	var $debugbutton = $('<button class="btn btn-default btn-block">');
    	$debugbutton.text("Debug");
    	$debugbutton.click(function () {
    		octopus.debug();
    	});
    	this.$catlistcontainer.append($debugbutton);
    }
  };

  var catdetail = {
  	init: function () {
  		this.$catdetailcontainer = $('#cat-detail-container');
  		this.$catimg = this.$catdetailcontainer.find('#img');
  		this.$counter = this.$catdetailcontainer.find('#clicks');
  		this.$catimg.click(function () {
  			octopus.countCurrentCatClick();
  		});
  	},
  	render: function () {
  		var cat = octopus.getCurrentCat();
  		this.$catimg.attr('src', cat.imgsrc);
  		this.$counter.text(cat.clicks);
  	}
  };

  octopus.init();
}());

/*
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

*/
