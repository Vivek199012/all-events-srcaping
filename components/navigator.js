var lat = 33.426971;
var long = -117.611992;
var latlong;


function successHandler(position){
  var crd = position.coords;
  lat = crd.latitude;
  long = crd.longitude;
  latlong = lat + "," + long;
  instantiateTicket(latlong);
  loadingScreen();
}

function callNavigator(event){
  event.preventDefault()
  var landing = document.getElementById('landing')
  while(landing.firstChild){
    landing.removeChild(landing.lastChild)
  }
  landing.classList.remove('w-100', 'h-100', 'landing')
  landing.classList.add('hidden')
  navigator.geolocation.getCurrentPosition(successHandler);
}
