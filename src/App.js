import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  componentDidMount() {
    this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcES-3fnf6KWMLzALjjuNv0VYMX9UmIZA&callback=initMap");
    window.initMap = this.initMap;
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
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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
