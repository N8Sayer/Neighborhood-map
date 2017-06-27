var map;

function initMarkers(editMarkers) {
  var largeInfoWindow = new google.maps.InfoWindow();

  for (var x=0; x<editMarkers.length;x++) {
    var marker = new google.maps.Marker({
      position: editMarkers[x].position,
      title: editMarkers[x].title,
      type: editMarkers[x].type,
      subtype: editMarkers[x].subtype,
      description: editMarkers[x].description,
    });
    marker.setMap(map);

    marker.addListener('click', function() {
      marker = populateInfoWindow(this, largeInfoWindow);
      if (marker.icon == undefined) {
        marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
      }
    });
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.0985662, lng: -94.5828433},
    zoom: 18
  });

  initMarkers(markers);
}

function capitalFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        var photo = result.photos.photo[0];
        var picURL = 'https://farm' + photo.farm + '.staticflickr.com/' +
        photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
        marker.image = picURL;

        // Fill the infoWindow with content
        infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
        '<i>'+ marker.type +' - '+ capitalFirst(marker.subtype) +'</i>'+
        '<img src='+ marker.image +'><p>' + marker.description +'</p></div>');
      }).fail(function() {
        infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
        '<i>'+ marker.type +' - '+ capitalFirst(marker.subtype) +'</i>'+
        '<p>No Flickr Imagery Loaded</p><p>' + marker.description +'</p></div>');
      });
    }
    else {
      // Fill the infoWindow with content
      infowindow.setContent('<div id="info-window"><h2>'+ marker.title +'</h2>'+
      '<i>'+ marker.type +' - '+ capitalFirst(marker.subtype) +'</i>'+
      '<img src='+ marker.image +'><p>' + marker.description +'</p></div>');
    }

    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);

    return marker;
  }
}
