import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import VenuesList from './Components/VenuesList.js';

class App extends Component {

  state = {
    venues: [],
    infowindow: [],
    marker: [],
    map: {},
    style: require('./MapStyle.json')
  }
  
  componentDidMount() {
    this.getVenues();
    //set initMap function as global
    window.initMap = this.initMap;
    window.gm_authFailure = this.gm_authFailure;
  }

  //Create a script tag with google maps url
  loadMap = (url) => {
    const script = window.document.createElement('script');
    script.src = url;
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    document.body.appendChild(script);
    script.onerror = function () {
      alert('Failed to load Google Maps!');
    }
  }

  //Initialize google map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 54.6871555, lng: 25.2796514},
      zoom: 15,
      styles: this.state.style
    });

    //marker image
    var image = 'http://res.cloudinary.com/dcu12ytpp/image/upload/v1535457374/MapMarker_Marker_Inside_Pink_1_ehgq2p.png';

    //Map through venues array and create a marker and an infowindow for each venue
    this.state.venues.map(venue => {
      //Create marker for each venue
      const marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        title: venue.venue.name,
        icon: image,
        animation: window.google.maps.Animation.DROP
      });

      //Create an infowindow for each venue
      const infowindow = new window.google.maps.InfoWindow({
        content: venue.venue.name + '\n ' + venue.venue.location.address
      });

      this.setState({ 
        infowindow: this.state.infowindow.concat([infowindow])
      });

      this.setState({ 
        marker: this.state.marker.concat([marker])
      });

      this.setState({map: map});

      marker.addListener('click', function() {

        map.setCenter(marker.getPosition());
        map.setZoom(16);
        infowindow.open(map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        
        //Close infowindow after 4s
        setTimeout(function () {infowindow.close();
          }, 4000);

        //stop animation after 1s
        setTimeout(function () {
          marker.setAnimation(null);}, 1000);
                                  
      });

      // Close infowindow when the user clicks on the map
      map.addListener('click', function() {
          infowindow.close();
          marker.setAnimation(null);
          map.setCenter({lat: 54.6871555, lng: 25.2796514});
          map.setZoom(15);
       })
    })
  }

  gm_authFailure = () =>  {
    alert('Google Maps failed to load');
  };

  //Fetch venues from Foursquare API
  getVenues = () => {
    fetch('https://api.foursquare.com/v2/venues/explore?ll=54.6871555,25.2796514&section=arts&limit=20&client_id=Q4IHJEVQLQJ05AGABSEKEZGWTHGGURFQ2JW4AOZYHVXU5UIX&client_secret=XE00D13XAWZVJMPQEQNQYLJ3XUUYN3JEMFSYPVOTH0YSAQZ4&v=20180820')
      .then(response => response.json())
        .then(response => this.setState({venues: response.response.groups[0].items},
          //a callback function that loads google map
          this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyAcES-3fnf6KWMLzALjjuNv0VYMX9UmIZA&callback=initMap")))
          .catch((error) => {
            alert('Failed to load data from Foursquare ' + error);
            console.log(error);
          });
  }

  //Open infowindow when the list item is clicked in the sidebar
  handleClick = (e) => {
      for (let i = 0; i < this.state.venues.length; i++) {
        if (e.innerHTML === this.state.venues[i].venue.name){
          this.state.infowindow[i].open(this.state.map, this.state.marker[i]);
          this.state.marker[i].setAnimation(window.google.maps.Animation.BOUNCE);
          this.state.map.setCenter(this.state.marker[i].getPosition());
          this.state.map.setZoom(16);
          const self = this;
          (function (x) {
            setTimeout(function () { self.state.infowindow[x].close();
              self.state.marker[x].setAnimation(null);
            }, 10000);
        })(i);
        } else {
          this.state.infowindow[i].close();
          this.state.marker[i].setAnimation(null);
        }
      }
  }

  render() {
    
    return (
      <div className='app'>
        <Header />
        <main>
          <VenuesList venues={this.state.venues} 
                      handleclick={this.handleClick} 
                      markers={this.state.marker}
                      infowindows={this.state.infowindow}
                      map={this.state.map}
                      updateMarkers={this.updateMarkers}
          />
          <div id='map' role='application'></div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
