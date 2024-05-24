var events = document.getElementById('events')

class Ticketmaster{
  constructor(latlong){
    this.latlong=latlong;
    this.getEvents=this.getEvents.bind(this);
  }
  getEvents(){
    $.ajax({
    type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=uPhG93gkA9zk83eAg0Q2AvsIbEOSrASU&radius=30&latlong="+this.latlong,
    dataType: "json",
    success: function (json) {
      var table = document.createElement('table');
      table.setAttribute('class','table table-dark');
      var thead = document.createElement('thead');
      var eventH = document.createElement('th')
      eventH.textContent = 'Event';
      eventH.setAttribute('scope', 'col')
      var venueH = document.createElement('th');
      venueH.textContent = 'Venue';
      venueH.setAttribute('scope', 'col')
      var cityH = document.createElement('th');
      cityH.textContent = 'City';
      cityH.setAttribute('scope', 'col')
      var linkH = document.createElement('th');
      linkH.textContent = "Ticketmaster Link";
      linkH.setAttribute('scope', 'col')
      var tbody = document.createElement('tbody')
      tbody.setAttribute('id', 'table');
      thead.appendChild(eventH);
      thead.appendChild(venueH);
      thead.appendChild(cityH);
      thead.appendChild(linkH);
      table.appendChild(thead);
      table.appendChild(tbody);
      events.appendChild(table);
      if (!json._embedded){
        var blankRow = document.createElement("tr");
        var eventNameNa = document.createElement("td");
        eventNameNa.textContent = 'No Events in your area';
        var eventVenueNa = document.createElement("td");
        eventVenueNa.textContent = 'N/A';
        var eventCityNa = document.createElement("td");
        eventCityNa.textContent = 'N/A'
        var eventLinkNa = document.createElement('td');
        eventLinkNa.textContent = 'N/A'
        blankRow.appendChild(eventNameNa);
        blankRow.appendChild(eventVenueNa);
        blankRow.appendChild(eventCityNa);
        tbody.appendChild(blankRow);
        return;
      }
      for (var i = 0; i < json._embedded.events.length; i++){
        var row = document.createElement("tr");
        var eventName = document.createElement("td");
        eventName.textContent = json._embedded.events[i].name;
        var eventVenue = document.createElement("td");
        eventVenue.textContent = json._embedded.events[i]._embedded.venues[0].name;
        var eventCity = document.createElement("td");
        eventCity.textContent = json._embedded.events[i]._embedded.venues[0].city.name
        var eventLinkTd = document.createElement('td');
        var eventLink = document.createElement('a');
        eventLink.setAttribute('href', json._embedded.events[i].url)
        eventLink.textContent = "Event Info"
        eventLinkTd.appendChild(eventLink);
        row.appendChild(eventName);
        row.appendChild(eventVenue);
        row.appendChild(eventCity);
        row.appendChild(eventLinkTd);
        tbody.appendChild(row);
      }
      initMap(this.latlong, json);
    },
      error: function (xhr, status, err) {
      }
    })
  }
}
