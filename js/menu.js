
var model = function() {
  this.list = ko.observableArray();
  for (var x=0; x<markers.length; x++) {
    this.list.push(markers[x].title);
  }
};

var view = {

};

var viewModel = function() {
  var self = this;
  this.visibleMenu = ko.observable(false);

  this.title = ko.observable('menu');
  this.list = ko.observableArray(markers);
  this.toggleMenu = function() {
    self.visibleMenu(!self.visibleMenu());
  }
};

ko.applyBindings(new viewModel());
