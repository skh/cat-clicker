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
    "admin": false,
    debug: function () {
    	console.log(this);
    },
    init: function () {
    	this.currentCat = "bc682c8035b1caf5b4c2d9a2f7fc9a59";
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
    	model.init();
      catlist.init();
      catdetail.init();
      admin.init();
    },
    debug: function () {
    	model.debug();
    },
    toggleAdmin: function () {
    	if (model.admin) {
    		model.admin = false;
    	} else {
    		model.admin = true;
    	}
    	admin.render();
    },
    updateCat: function (name, imgsrc) {
    	var cat = this.getCurrentCat();
    	cat.name = name;
    	cat.imgsrc = imgsrc;
    	catlist.render();
    	catdetail.render();
    },
    isAdminVisible: function () {
    	return model.admin;
    }
  };

  var catlist = {
    init: function() {
    	this.$catlistcontainer = $('#cat-list-container');   		
    	
     	this.render(); 	
    },
    render: function () {
    	this.$catlistcontainer.html('');
    	this.catlist = octopus.getCatList();
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
    	var $adminbutton = $('<button class="btn btn-default btn-block">');
    	$adminbutton.text("Admin");
    	$adminbutton.click(function () {
    		octopus.toggleAdmin();
    	});
    	this.$catlistcontainer.append($adminbutton);
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
  		this.render();
  	},
  	render: function () {
  		var cat = octopus.getCurrentCat();
  		this.$catimg.attr('src', cat.imgsrc);
  		this.$counter.text(cat.clicks);
  	}
  };

  var admin = {
  	init: function () {
  		this.$admincontainer = $('#admin-container');
  		this.$adminform = $('#admin-form');
  		this.$adminform.find('#submitcat').click(function (e) {
  			var newCatName = $('#cat-name').val();
  			var newCatImgsrc = $('#cat-imgsrc').val();
	  		octopus.updateCat(newCatName, newCatImgsrc);
  			octopus.toggleAdmin();
  		});
  		this.$adminform.find('#cancelcat').click(function () {
  			octopus.toggleAdmin();
  		});


  	},
  	render: function () {
  		if (octopus.isAdminVisible()) {
  			var cat = octopus.getCurrentCat();
  			this.$adminform.find('#cat-name').val(cat.name);
  			this.$adminform.find('#cat-imgsrc').val(cat.imgsrc);
  			this.$admincontainer.show();
  		} else {
  			this.$admincontainer.hide();
  		}  		
  	}
  };

  octopus.init();
}());
