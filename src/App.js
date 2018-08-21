import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    venues: []
  }
  
  componentDidMount() {
    this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcES-3fnf6KWMLzALjjuNv0VYMX9UmIZA&callback=initMap");
    window.initMap = this.initMap;
    this.getVenues();
  }

  loadMap = (url) => {
    const script = window.document.createElement('script');
    script.src = url;
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 54.6871555, lng: 25.2796514},
      zoom: 15
    });
  }

  getVenues = () => {
    fetch('https://api.foursquare.com/v2/venues/search?ll=54.6871555,25.2796514&client_id=Q4IHJEVQLQJ05AGABSEKEZGWTHGGURFQ2JW4AOZYHVXU5UIX&client_secret=XE00D13XAWZVJMPQEQNQYLJ3XUUYN3JEMFSYPVOTH0YSAQZ4&v=20180820')
      .then(response => response.json())
        .then(data => this.setState({ venues: data }));
  }

  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }
}

export default App;
