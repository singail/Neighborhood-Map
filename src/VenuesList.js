import React, { Component } from 'react';
import './App.css';

class VenuesList extends Component {
    state = {
        query: '',
        newList: [],
        newMarkers: []
    }

    //Change the state of query when the user types into the search field
    updateQuery = (query) => {
        
        this.setState({query: query})
        let searchedVenues = this.props.venues.filter((venue) => {
                 return venue.venue.name.toLowerCase().indexOf(query) !== -1;
             });
        
        this.setState({newList: searchedVenues})

        let searchedMarkers = this.props.markers.filter((oneMarker) => {
            return oneMarker.title.toLowerCase().indexOf(query) !== -1;
           });
        this.setState({newMarkers: searchedMarkers}, function () {
            this.updateMarkers()
       }) 
    }

    //Hides all markers and shows only the ones that are searched
    updateMarkers = () => {
        this.props.markers.map((marker) => {
            marker.setVisible(false);
        })
        this.state.newMarkers.map((newMarker) => {
            newMarker.setVisible(true);
        })
    }

    // //not working on images
    // setImageAttributes = () => {
    //     const images = window.document.getElementsByClassName('img');
    //     console.log(images);
    //     [...images].forEach(image => {image.removeAttribute('alt'); image.setAttribute('alt', 'marker');});
    // }

    render() {
        //filter the list of venues by checking if query matches venue name
        let searchedVenues = this.props.venues.filter((venue) => {
             return venue.venue.name.toLowerCase().indexOf(this.state.query) !== -1;
            });

        return (
            <div className='sidebar'>
                <input aria-label='search field' 
                    type='text'
                    placeholder="Search for places"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
                <div className='list'>
                    <ul>
                        {searchedVenues.map((venue) =>
                            <li tabIndex='0' className='list-item' aria-label={venue.venue.name} key={venue.venue.id} onClick={(e) => this.props.handleclick(e.target)}>{venue.venue.name}</li>)
                        }
                    </ul>
                </div>
            </div>
        );
      }
}
    
    export default VenuesList;
