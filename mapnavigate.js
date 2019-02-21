function $(element) {
  return document.getElementById(element);
}

var speedTest = {};

speedTest.pics = null;
speedTest.map = null;
speedTest.markerClusterer = null;
speedTest.markers = [];
speedTest.infoWindow = null;
var le = null;

speedTest.init = function() {
  var latlng = new google.maps.LatLng(12.9279, 77.6271);
  var options = {
    'zoom': 4,
    'center': latlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
	'gestureHandling': 'cooperative'
  };

  speedTest.map = new google.maps.Map($('map'), options);
  speedTest.pics = data.photos;
  
  

  speedTest.infoWindow = new google.maps.InfoWindow();

  speedTest.showMarkers();
};

speedTest.showMarkers = function() {
  speedTest.markers = [];

  var type = 1;
  

  if (speedTest.markerClusterer) {
    speedTest.markerClusterer.clearMarkers();
  }
  
  var panel = $('markerlistx');
  var panel2 = $('markerlist2');
  var panel3 = $('markerlist3');
  var panel4 = $('markerlist4');
  panel.innerHTML = '';
  panel2.innerHTML = '';
  panel3.innerHTML = '';
  panel4.innerHTML = '';
  le = Object.keys(speedTest.pics).length;
  var numMarkers = 10;
  for (var i = 0; i < le; i++) {
    var titleText = speedTest.pics[i].photo_title;
    if (titleText === '') {
      titleText = 'No title';
    }

    var item = document.createElement('ul');
    var title = document.createElement('li');
    title.href = '#';
    title.className = 'title';
    title.innerHTML = titleText;

    item.appendChild(title);
	if(speedTest.pics[i].category === 'B') {
		panel2.appendChild(item);
	}
	else if(speedTest.pics[i].category === 'C') {
		panel3.appendChild(item);
	}
	else if(speedTest.pics[i].category === 'D') {
		panel4.appendChild(item);
	}
	else {
		panel.appendChild(item);
	}

    var latLng = new google.maps.LatLng(speedTest.pics[i].latitude,
        speedTest.pics[i].longitude);

    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=' +
        'FFFFFF,008CFF,000000&ext=.png';
    var markerImage = new google.maps.MarkerImage(imageUrl,
        new google.maps.Size(24, 32));

    var marker = new google.maps.Marker({
      'position': latLng,
      'icon': markerImage
    });
	
    var fn = speedTest.markerClickFunction(speedTest.pics[i], latLng, marker);
    google.maps.event.addListener(marker, 'click', fn);
    google.maps.event.addDomListener(title, 'click', fn);
	if (speedTest.pics[i]['category']==='A') {
		marker.setIcon('category-1.png');
	}
	else if (speedTest.pics[i]['category']==='B') {
		marker.setIcon('category-2.png');
	}
	else if (speedTest.pics[i]['category']==='C') {
		marker.setIcon('category-3.png');
	}
	else if (speedTest.pics[i]['category']==='D') {
		marker.setIcon('category-4.png');
	}
    speedTest.markers.push(marker);
  }
  window.setTimeout(speedTest.time, 0);
};


function myFunction() {
	var i;
	for (i = 0; i < speedTest.markers.length; i++) {
			//console.log(speedTest.markers[i]['category']);
		  if (speedTest.markers[i]["category"] === 'A') {
			//speedTest.markers[i].setMap(null);
			alert(speedTest.markers[i]["photo_title"]);
		  }
	}
/* Zoom out and set opacity 1 for all markers	 
	speedTest.map.setZoom(4);
	 for( var i in speedTest.markers ){
		speedTest.markers[i].setAnimation(null);
	    speedTest.markers[i].setOptions({'opacity': 1})
	}
*/
}
speedTest.markerClickFunction = function(pic, latlng, marker) {
  return function(e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
	  speedTest.map.setZoom(15);
	  speedTest.map.setCenter(latlng);
	  for( var i in speedTest.markers ){
		speedTest.markers[i].setAnimation(null);
	//	speedTest.markers[i].setMap(null);
	    speedTest.markers[i].setOptions({'opacity': 0.4})
		if( speedTest.markers[i]['position'] == marker['position'] ){
			speedTest.markers[i].setAnimation(google.maps.Animation.BOUNCE);
	//	    speedTest.markers[i].setMap(speedTest.map);
			speedTest.markers[i].setOptions({'opacity': 1})
		}
		else {
			
		}
	}
    var title = pic.photo_title;
    var url = pic.photo_url;
    var fileurl = pic.photo_file_url;

    var infoHtml = '<div class="info"><h3>' + title +
      '</h3><div class="info-body">' +
      '<a href="' + url + '" target="_blank"><img src="' +
      fileurl + '" class="info-img"/></a></div>' +
      '<a href="http://www.panoramio.com/" target="_blank">' +
      '<img src="http://maps.google.com/intl/en_ALL/mapfiles/' +
      'iw_panoramio.png"/></a><br/>' +
      '<a href="' + pic.owner_url + '" target="_blank">' + pic.owner_name +
      '</a></div></div>';

    speedTest.infoWindow.setContent(infoHtml);
	
    speedTest.infoWindow.setPosition(latlng);
    speedTest.infoWindow.open(speedTest.map);
  };
};


speedTest.categoryClickFunction = function(pic, latlng, marker) {
  return function(e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
	  speedTest.map.setZoom(15);
	  speedTest.map.setCenter(latlng);
	  for( var i in speedTest.markers ){
		speedTest.markers[i].setAnimation(null);
	//	speedTest.markers[i].setMap(null);
	    speedTest.markers[i].setOptions({'opacity': 0.4})
		if( speedTest.markers[i]['position'] == marker['position'] ){
			speedTest.markers[i].setAnimation(google.maps.Animation.BOUNCE);
	//	    speedTest.markers[i].setMap(speedTest.map);
			speedTest.markers[i].setOptions({'opacity': 1})
		}
		else {
			
		}
	}
    var title = pic.photo_title;
    var url = pic.photo_url;
    var fileurl = pic.photo_file_url;

    var infoHtml = '<div class="info"><h3>' + title +
      '</h3><div class="info-body">' +
      '<a href="' + url + '" target="_blank"><img src="' +
      fileurl + '" class="info-img"/></a></div>' +
      '<a href="http://www.panoramio.com/" target="_blank">' +
      '<img src="http://maps.google.com/intl/en_ALL/mapfiles/' +
      'iw_panoramio.png"/></a><br/>' +
      '<a href="' + pic.owner_url + '" target="_blank">' + pic.owner_name +
      '</a></div></div>';

    speedTest.infoWindow.setContent(infoHtml);
	
    speedTest.infoWindow.setPosition(latlng);
    speedTest.infoWindow.open(speedTest.map);
  };
};


speedTest.change = function() {
  speedTest.clear();
  speedTest.showMarkers();
};

speedTest.time = function() {

    var start = new Date();
    for (var i = 0, marker; marker = speedTest.markers[i]; i++) {
      marker.setMap(speedTest.map);
    }
	
  var end = new Date();
  $('timetaken').innerHTML = end - start;
};
