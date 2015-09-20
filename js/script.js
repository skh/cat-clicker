var ViewModel = function () {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Catherine');
  this.imgSrc = ko.observable('img/cat.jpg');
};

ko.applyBindings (new ViewModel ());