var yourLocation;
var contentStringArr=[];
var infoWindowArr=[];
var geocoder;
var map;
var address;

function initMap(latlong, json){
  geocoder = new google.maps.Geocoder();
  yourLocation = {lat: lat, lng: long,};
  map = new google.maps.Map(
    document.getElementById("map"),{
      zoom: 10,
      center: yourLocation,
    });
  for (var i = 0; i<20; i++) {
    if (!json) {
      return;
    }
    var infoWindow = new google.maps.InfoWindow();
    infoWindowArr.push(infoWindow);
    var contentString = {
                    location: json._embedded.events[i]._embedded.venues[0].name,
                    name: json._embedded.events[i].name,
                    latlong: json._embedded.events[i]._embedded.venues[0].location.latitude+json._embedded.events[i]._embedded.venues[0].location.longitude,
    };
    contentStringArr.push(contentString);
    addMarker(map, json._embedded.events[i]);
  }
  var yourMarker = new google.maps.Marker({position: yourLocation, map: map});
}

function loadingScreen(){
  var modal = document.getElementById("loading");
    modal.classList.remove('hidden');
    setTimeout(function(){
      modal.classList.add('hidden')
    }, 2500);
}

function handleSubmit(event){
  event.preventDefault();
  address = document.getElementById('address').value
  codeAddress();
  loadingScreen();
  if (address){
    clearData();
    return
  }
}

function codeAddress(){
  address = document.getElementById('address').value
  if (!address){
    return
  }
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      lat = results[0].geometry.location.lat();
      long = results[0].geometry.location.lng()
      latlong = lat + "," + long;
      instantiateTicket(latlong);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function clearData(){
  var events = document.getElementById('events')
  while(events.hasChildNodes()){
    events.removeChild(events.childNodes[0]);
  }
}

function addMarker(map, event){
 var marker = new google.maps.Marker({
    position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
    latlong: event._embedded.venues[0].location.latitude+event._embedded.venues[0].location.longitude,
    map: map,
  });
  marker.addListener("click", function () {
    for (var i=0; i<20; i++){
      if (contentStringArr[i].latlong===marker.latlong){
        infoWindowArr[i].setContent("<div>"+"<h6>"+contentStringArr[i].name+"</h6>"+"</div>"+"<br>"+
        "<p>"+contentStringArr[i].location+"</p>")
        infoWindowArr[i].close();
        infoWindowArr[i].open(map, marker);
      }
    }
  })
  marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
}
