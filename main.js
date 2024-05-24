function instantiateTicket(latlong){
  var ticketmaster = new Ticketmaster(latlong);
  ticketmaster.getEvents();
}
