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
  var latlng = new google.maps.LatLng(12.954517, 77.3507357);
 
  var options = {
    'zoom': 10,
    'center': latlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
	'gestureHandling': 'cooperative'
  };
  var stylez = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 } // <-- THIS
      ]
    }
];

var mapOptions = {
    zoom: 10,
    center: latlng,
    mapTypeControlOptions: {
         mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
    },
	gestureHandling: 'cooperative'
};
 
  speedTest.map = new google.maps.Map($('map'), mapOptions);
  var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
  speedTest.map.mapTypes.set('tehgrayz', mapType);
  speedTest.map.setMapTypeId('tehgrayz');
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
    var titleText = speedTest.pics[i].venue_title;
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
		marker.setIcon('images/icons/category-1.png');
	}
	else if (speedTest.pics[i]['category']==='B') {
		marker.setIcon('images/icons/category-2.png');
	}
	else if (speedTest.pics[i]['category']==='C') {
		marker.setIcon('images/icons/category-3.png');
	}
	else if (speedTest.pics[i]['category']==='D') {
		marker.setIcon('images/icons/category-4.png');
	}
    speedTest.markers.push(marker);
  }
  //var markerCluster = new MarkerClusterer(speedTest.map, speedTest.markers, {imagePath: 'images/m'});
  window.setTimeout(speedTest.time, 0);
};


function myFunction() {
	var i;
	for (i = 0; i < speedTest.markers.length; i++) {
			//console.log(speedTest.markers[i]['category']);
		  if (speedTest.markers[i]["category"] === 'A') {
			//speedTest.markers[i].setMap(null);
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
	  speedTest.map.setZoom(17);
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
	}
    var title = pic.venue_title;
  //  var url = pic.photo_url;
  //  var fileurl = pic.photo_file_url;

    var infoHtml = '<h6>' + title +
      '</h6><br/>' +
      '<p>Phone : ' + pic.phone +
      '</p>' +'<a href="' + pic.website + '" target="_blank">' +
      'Web site</a><br/>' +
      '<p>Email : '+ pic.email +
      '</p>'+'<p>Genre : '+pic.genre +'</p>'+
	  '</p>'+'<p>Address : '+pic.address +'</p><br/>'+
	  '<a href="' + pic.fb + '" target="_blank">' + 'Facebook</a>'+
	  '<a href="' + pic.twitter + '" target="_blank">' + ' Twitter</a>'+
	  '<a href="' + pic.youtube + '" target="_blank">' + ' Youtube</a>';+
    speedTest.infoWindow.setContent(infoHtml);
	
    speedTest.infoWindow.setPosition(latlng);
    speedTest.infoWindow.open(speedTest.map);
  };
};
/*
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
*/
function delhi(p1, p2) {
	 var coordinates = new google.maps.LatLng(28.6466773, 76.813073);
  	  speedTest.map.setZoom(10);
	  speedTest.map.setCenter(coordinates);
}
function bangalore(p1, p2) {
	 var coordinates = new google.maps.LatLng(12.9538477, 77.3507442);
  	  speedTest.map.setZoom(10);
	  speedTest.map.setCenter(coordinates);
}
function mumbai(p1, p2) {
	 var coordinates = new google.maps.LatLng(19.0821978, 72.7411);
  	  speedTest.map.setZoom(11);
	  speedTest.map.setCenter(coordinates);
}

speedTest.categoryClickFunction = function(pic, latlng, marker) {
  return function(e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
	  speedTest.map.setZoom(20);
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
    var title = pic.venue_title;
//    var url = pic.photo_url;
//    var fileurl = pic.photo_file_url;

    var infoHtml = '<div"><h3>' + title +
      '</h3><div">' +
      '<h3>Phone : ' + pic.phone +
      '</h3></div>' +'<a href="' + pic.wesbsite + '" target="_blank">' +
      'Web site</a><br/>' +
      '<a href="' + pic.email + '" target="_blank">'+
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
