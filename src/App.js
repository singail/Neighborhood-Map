import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Footer from './Footer.js';

class App extends Component {

  //Empty array of venues
  state = {
    venues: []
  }
  
  componentDidMount() {
    this.getVenues();
    //set initMap function as global
    window.initMap = this.initMap;
  }

  //Create a script tag with google maps url
  loadMap = (url) => {
    const script = window.document.createElement('script');
    script.src = url;
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);
  }

  //Initialize google map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 54.6871555, lng: 25.2796514},
      zoom: 16
    });

    //Map through venues array and create a marker and an infowindow for each venue
    this.state.venues.map(venue => {
      const marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        title: venue.venue.name
      })

      const infowindow = new window.google.maps.InfoWindow({
        content: venue.venue.name + ', ' + venue.venue.location.address
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
        //Close infowindow after 4s
        setTimeout(function () { infowindow.close(); }, 4000);
      });
  
    })
  }

  //Fetch venues from Foursquare API
  getVenues = () => {
    fetch('https://api.foursquare.com/v2/venues/explore?ll=54.6871555,25.2796514&client_id=Q4IHJEVQLQJ05AGABSEKEZGWTHGGURFQ2JW4AOZYHVXU5UIX&client_secret=XE00D13XAWZVJMPQEQNQYLJ3XUUYN3JEMFSYPVOTH0YSAQZ4&v=20180820')
      .then(response => response.json())
        .then(response => this.setState({venues: response.response.groups[0].items},
          //a callback function that loads google map
          this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcES-3fnf6KWMLzALjjuNv0VYMX9UmIZA&callback=initMap")))
  }

  render() {
    return (
      <div class='app'>
        <Header />
        <main>
          <div id='map'></div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
