var Cat = function (data) {
  this.clickCount = ko.observable(data.clicks);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgsrc);
  this.nicknames = ko.observableArray(data.nicknames);
  this.level = ko.computed(function () {
    var count = this.clickCount();
    if (count < 10) {
      return 'Newborn';
    } else if (count < 50) {
      return 'Infant';
    } else if (count < 100) {
      return 'Teen';
    } else {
      return 'Adult';
    }
  }, this);
};

var ViewModel = function () {
  
  var self = this;
  this.catList = ko.observableArray([]);
  // cats in cats.js
  cats.forEach(function (catItem) {
    self.catList().push(ko.observable(new Cat(catItem)));
  });

  this.currentCat = this.catList()[0];

  this.incrementCounter = function () {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  this.selectCat = function (cat) {
    self.currentCat(cat);
  }
};

ko.applyBindings (new ViewModel ());