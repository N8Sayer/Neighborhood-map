// My hard-coded data for the markers.
var markers = [
    {
      position: {lat: 39.099784, lng:-94.583006},
      title: 'Kaldi\'s Coffee',
      type: 'Food/Drink',
      subtype: 'Coffee/Tea',
      description: 'A local coffee shop with excellent Matcha Lattes'
    },
    {
      position: {lat: 39.098422, lng: -94.581912},
      title: 'Flying Saucer Draught Emporium',
      type: 'Food/Drink',
      subtype: 'Bar',
      description: 'A mid-sized bar featuring an enormous variety of beers on tap'
    },
    {
      position: {lat: 39.097358, lng: -94.582428},
      title: 'Chipotle',
      type: 'Food/Drink',
      subtype: 'Burritos',
      description: 'Delicious burritos made fresh while you watch'
    },
    {
      position: {lat: 39.098861, lng: -94.583474},
      title: 'Arvest Bank Theatre at the Midland',
      type: 'Entertainment',
      subtype: 'Music',
      description: 'One of the best music venues in town after the building was beautifully restored'
    },
    {
      position: {lat: 39.097304, lng: -94.579950},
      title: 'Sprint Center',
      type: 'Entertainment',
      subtype: 'Music',
      description: 'Largest indoor stadium venue in Kansas City'
    },
    {
      position: {lat: 39.097804, lng: -94.581624},
      title: 'KC Live!',
      type: 'Entertainment',
      subtype: 'Music',
      description: 'An outdoor venue surrounded by bars of varying styles'
    },
    {
      position: {lat: 39.098099, lng: -94.582455},
      title: 'Copaken Stage',
      type: 'Entertainment',
      subtype: 'Theater',
      description: 'An excellent small stage for theatrical productions'
    }
  ];

var ViewModel = function() {
  var self = this;

  // This variable controls the toggle for the menu
  this.visibleMenu = ko.observable(false);

  // Start the filter with default value of All
  this.filterSelection = ko.observable('All');

  // Menu Title
  this.title = ko.observable('My Favorite Places');

  // Filter drop-down options
  this.filter = ko.observableArray(['All','Food/Drink','Entertainment']);

  // A KO observableArray for markers to get automatic updating in the DOM
  this.list = ko.observableArray(markers);

  // This function controls the infoWindow content from the menus
  this.click = function(Marker) {
    markers.forEach(function(object) {
      object.marker.setIcon(null);
    });

    populateInfoWindow(Marker.marker, largeInfoWindow);
    map.panTo(Marker.marker.getPosition());
    if (Marker.marker.icon === null) {
      Marker.marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
    }
  };


  // As titled, toggles the menu by changing the visibleMenu variable.
  this.toggleMenu = function() {
    self.visibleMenu(!self.visibleMenu());
  };
};

ko.applyBindings(new ViewModel());
