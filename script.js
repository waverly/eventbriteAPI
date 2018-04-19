console.clear()

const oAuthToken = 'BZ5BPRFK34EMD52YME3A';


const me = `https://www.eventbriteapi.com/v3/users/me/?token=${oAuthToken}`;
// const ownedEvents = `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${oAuthToken}`;
const eventsExpanded = `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${oAuthToken}&expand=venue,organizer`;
const search = `https://www.eventbriteapi.com/v3/events/search/?token=${oAuthToken}&organizer.id=17129701389&expand=venue`;

let ownedEventsData;

const init = () => {
  fetch(eventsExpanded)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    ownedEventsData = myJson;
    console.log(ownedEventsData.events);
    insertOwnedEvents(ownedEventsData);
    insertNyEvents(ownedEventsData);
  });

  fetch(search)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    searchData = myJson;
    console.log('below is search data');
    console.log(searchData);
  });
}

// create div for owned ownedevents
const insertOwnedEvents = (data) => {
  const wrapper = document.getElementById('ownedEvents');
  const markup = data.events.map( e => {
    const div = document.createElement('div');
    div.classList += "event";
    const name = document.createElement("h2");
    const nameText = document.createTextNode(e.name.text);
    name.appendChild(nameText);

    const description = document.createElement('p');
    const descriptionText = document.createTextNode(e.description.text);
    description.appendChild(descriptionText);

    const time = document.createElement('p');
    const timeText = document.createTextNode( e.start.local );
    time.appendChild(timeText);

    const organizer= document.createElement('p');
    const organizerText = document.createTextNode( e.organizer.name );
    organizer.appendChild(organizerText);

    const venue= document.createElement('p');
    const venueText = document.createTextNode( e.venue.name );
    venue.appendChild(venueText);

    div.appendChild(name);
    div.appendChild(description)
    div.appendChild(time)
    div.appendChild(venue)
    div.appendChild(organizer)
    wrapper.appendChild(div);
  });
}

const insertNyEvents = (data) => {
  const wrapper = document.getElementById('nyEvents');
  const markup = data.events.map( e => {
    if (e.organizer.name === "Drag Brunch - New York"){
      const div = document.createElement('div');
      div.classList += "event";
      const name = document.createElement("h2");
      const nameText = document.createTextNode(e.name.text);
      name.appendChild(nameText);

      const description = document.createElement('p');
      const descriptionText = document.createTextNode(e.description.text);
      description.appendChild(descriptionText);

      const time = document.createElement('p');
      const timeText = document.createTextNode( e.start.local );
      time.appendChild(timeText);

      const organizer= document.createElement('p');
      const organizerText = document.createTextNode( e.organizer.name );
      organizer.appendChild(organizerText);

      const venue= document.createElement('p');
      const venueText = document.createTextNode( e.venue.name );
      venue.appendChild(venueText);

      div.appendChild(name);
      div.appendChild(description)
      div.appendChild(time)
      div.appendChild(venue)
      div.appendChild(organizer)
      wrapper.appendChild(div);
    }
  });
}


init();
