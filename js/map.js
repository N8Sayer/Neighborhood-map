var map;

// Open up the map with initial coords and zoom level. Intialize global infoWindow.
function initMap() {
  window.largeInfoWindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.0985662, lng: -94.5828433},
    zoom: 17
  });

  // On changes to the filterSelection variable, rerun the marker setter
  $('#filter').change(function(filter) {
    initMarkers(filter.target.value);
  });

  initMarkers();
}

// Initialize the markers and bind a listener to control the infoWindow,
// then apply filters on further runs.
function initMarkers(filter) {
  if (filter === null) {
    for (var x=0; x<markers.length; x++) {
      var marker = new google.maps.Marker({
        position: markers[x].position,
        title: markers[x].title,
        type: markers[x].type,
        subtype: markers[x].subtype,
        description: markers[x].description
      });
      marker.setMap(map);
      markers[x].marker = marker;

      marker.addListener('click',clickMarkers);
    }
  }
  else if (filter == 'All') {
    for (var x=0; x<markers.length; x++) {
      markers[x].marker.setMap(map);
    }
  }
  else {
    var editMarkers = [];
    for (var y=0; y<markers.length; y++) {
      if (markers[y].type == filter) {
        editMarkers.push(markers[y]);
      }
    }

    for (var a=0; a<markers.length; a++) {
      var filterBool = false;
      for (var b=0; b<editMarkers.length; b++) {
        if (editMarkers[b].title == markers[a].title) {
          markers[a].marker.setMap(map);
          filterBool = true;
        }
      }
      if (!filterBool) {
        markers[a].marker.setMap(null);
      }
    }
  }
}

function clickMarkers() {
  markers.forEach(function(object) {
    object.marker.setIcon(null);
  });

  populateInfoWindow(this, largeInfoWindow);
  map.panTo(this.getPosition());
  if (this.icon === null) {
    this.setIcon('https://www.google.com/mapfiles/marker_green.png');
  }
}

// Fill the infoWindow with content, with error handling for flickr API
function populateInfoWindow(marker, infowindow) {
  // Sections of this function were borrowed from Project_Code_13_DevilInTheDetails
  // to ensure full functionality and help with error-proofing
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div id="info-window"><h2></h2><i>'+
    '</i><img><p></p></div>');
    if (!marker.image) {
      var flickrURL = 'https://api.flickr.com/services/rest';
      flickrURL += '?' + $.param({
        method: 'flickr.photos.search',
        api_key: 'aa39c6ad485c236eb611bed796fd88ee',
        text: marker.title + ' Kansas City',
        safe_search: 1,
        per_page: 5,
        format: 'json',
        jsoncallback: 'apiResult'
      });

      $.ajax ({
        url: flickrURL,
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
      }).done(function(result) {
        console.log(result);
        var photo = result.photos.photo[0];

        marker.image = 'https://farm' + photo.farm + '.staticflickr.com/' +
        photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';

        marker.attr = '';


        // Fill the infoWindow with content
        infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
        '<i>'+ marker.type +' - '+ marker.subtype +'</i>'+
        '<img src='+ marker.image +'><span>'+ marker.attr +'</span><p>' +
        marker.description +'</p></div>');
      }).fail(function() {
        infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
        '<i>'+ marker.type +' - '+ marker.subtype +'</i>'+
        '<p>No Flickr Imagery Loaded</p><p>' + marker.description +'</p></div>');
        console.log('fail');
      });
    }
    else {
      // Fill the infoWindow with content
      infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
      '<i>'+ marker.type +' - '+ marker.subtype +'</i>'+
      '<img src='+ marker.image +'><span>'+ marker.attr +'</span><p>' +
      marker.description +'</p></div>');
    }

    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);

  }
}

function mapError() {
  $('#map').html('Google Maps failed to load');
}
