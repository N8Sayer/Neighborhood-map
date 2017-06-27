
var markers = [
  {
    position: {lat: 39.099784, lng:-94.583006},
    title: 'Kaldi\'s Coffee',
    type: 'Food/Drink',
    subtype: 'coffee/tea',
    description: 'A local coffee shop with excellent Matcha Lattes'
  },
  {
    position: {lat: 39.098422, lng: -94.581912},
    title: 'Flying Saucer Draught Emporium',
    type: 'Food/Drink',
    subtype: 'bar',
    description: 'A mid-sized bar featuring an enormous variety of beers on tap'
  },
  {
    position: {lat: 39.097358, lng: -94.582428},
    title: 'Chipotle',
    type: 'Food/Drink',
    subtype: 'burritos',
    description: 'Delicious burritos made fresh while you watch'
  },
  {
    position: {lat: 39.098861, lng: -94.583474},
    title: 'Arvest Bank Theatre at the Midland',
    type: 'Entertainment',
    subtype: 'music',
    description: 'One of the best music venues in town after the building was beautifully restored'
  },
  {
    position: {lat: 39.097304, lng: -94.579950},
    title: 'Sprint Center',
    type: 'Entertainment',
    subtype: 'music',
    description: 'Largest indoor stadium venue in Kansas City'
  },
  {
    position: {lat: 39.097804, lng: -94.581624},
    title: 'KC Live!',
    type: 'Entertainment',
    subtype: 'music',
    description: 'An outdoor venue surrounded by bars of varying styles'
  },
  {
    position: {lat: 39.098099, lng: -94.582455},
    title: 'Copaken Stage',
    type: 'Entertainment',
    subtype: 'theater',
    description: 'An excellent small stage for theatrical productions'
  }
];

var view = function() {

};

var viewModel = function() {
  var self = this;
  this.visibleMenu = ko.observable(true);
  this.filterSelection = ko.observable('All');
  this.entertainment = ko.observableArray();
  this.fooddrink = ko.observableArray();

  this.list = ko.observableArray(markers);
  this.title = ko.observable('My Favorite Places');
  this.filter = ko.observableArray(['All','Food/Drink','Entertainment']);

  for (var x=0; x<self.list().length;x++) {
    if (self.list()[x].type == 'Food/Drink') {
      self.fooddrink.push(self.list()[x]);
    }
    else if (self.list()[x].type == 'Entertainment') {
      self.entertainment.push(self.list()[x]);
    }
  }

  this.toggleMenu = function() {
    self.visibleMenu(!self.visibleMenu());
  }
};

ko.applyBindings(new viewModel());
