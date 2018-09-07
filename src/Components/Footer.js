import React, { Component } from 'react';
import '../App.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className='footer'>
                    <p>2018. Created by Rimgaile. Udacity Front End Developer Nanodegree program. 
                        Data from <a href='https://developer.foursquare.com/' target="_blank"> GoogleFoursquare API</a>.
                        Map from <a href='https://developers.google.com/maps/documentation/' target="_blank"> Google Maps.</a>
                    </p>
                </div>
            </footer>
        );
      }
}
    
    export default Footer;
    