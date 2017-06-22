
var model = function() {

};

var view = function() {

};

var viewModel = function() {
  var self = this;
  this.visibleMenu = ko.observable(false);

  this.title = ko.observable('My Favorite Places');
  this.list = ko.observableArray(markers);
  this.toggleMenu = function() {
    self.visibleMenu(!self.visibleMenu());
  }
};

ko.applyBindings(new viewModel());
