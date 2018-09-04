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

    render() {
        //filter the list of venues by checking if query matches venue name
        let searchedVenues = this.props.venues.filter((venue) => {
             return venue.venue.name.toLowerCase().indexOf(this.state.query) !== -1;
            });

        return (
            <div className='sidebar'>
                <input type='text'
                    placeholder="Search for places in Vilnius"
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
                <div className='list'>
                    <ul>
                        {searchedVenues.map((venue) =>
                            <li key={venue.venue.id} onClick={(e) => this.props.handleclick(e.target)}>{venue.venue.name}</li>)
                        }
                    </ul>
                </div>
            </div>
        );
      }
}
    
    export default VenuesList;