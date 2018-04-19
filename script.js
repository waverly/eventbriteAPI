console.clear()

const oAuthToken = 'BZ5BPRFK34EMD52YME3A';
// endpoints
const me = `https://www.eventbriteapi.com/v3/users/me/?token=${oAuthToken}`;
const ownedEvents = `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${oAuthToken}`;

let ownedEventsData;

// create div for owned ownedevents
const insertOwnedEvents = (data) => {
  const wrapper = document.getElementById('wrapper');
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

    const organizerId = document.createElement('p');
    const organizerText = document.createTextNode( e.organizer_id );
    organizerId.appendChild(organizerText);

    div.appendChild(name);
    div.appendChild(description)
    div.appendChild(time)
    div.appendChild(organizerId)
    wrapper.appendChild(div);
  });

  // wrapper.appendChild(markup);
}


const init = () => {

  console.log('in init');
  fetch(ownedEvents)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    ownedEventsData = myJson;
    console.log(ownedEventsData.events);
    insertOwnedEvents(ownedEventsData);
    // console.log(myJson);
  });
}




init();
