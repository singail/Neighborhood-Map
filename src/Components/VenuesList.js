import React, { Component } from 'react';
import '../App.css';

class VenuesList extends Component {
    state = {
        query: '',
        newList: [],
        newMarkers: [],
        noVenues: false
    }

    //Change the state of query when the user types into the search field
    updateQuery = (query) => {
        
        this.setState({query: query});
        //Filter venues that match the query
        let searchedVenues = this.props.venues.filter((venue) => {
                 return venue.venue.name.toLowerCase().indexOf(query) !== -1;
             });
        
        //Add filtered venues to array. If array is empty after filtering show a message instead of an empty list
        this.setState({newList: searchedVenues}, function () {
            if (this.state.newList.length === 0) {
                this.setState({noVenues: true});
            } else {
                this.setState({noVenues: false});
            }
        });

        //Filter markers that match the query
        let searchedMarkers = this.props.markers.filter((oneMarker) => {
            return oneMarker.title.toLowerCase().indexOf(query) !== -1;
           });

        //Add filtered markers to a new array and call update function
        this.setState({newMarkers: searchedMarkers}, function () {
            this.updateMarkers()
       });

       this.updateView();
    }

    //When the user types a new query, close infowindows, stop marker animation and recenter the map
    updateView = () => {
        this.props.infowindows.map(iw => iw.close());
        this.props.markers.map(marker => marker.setAnimation(null));
        this.props.map.setCenter({lat: 54.6871555, lng: 25.2796514});
        this.props.map.setZoom(15);
    }

    //Hide all markers and show only the ones that are searched
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
                {this.state.noVenues === true ? 
                    (<p>Sorry, no venues were found</p>)
                : (<div className='list'>
                    <ul>
                        {searchedVenues.map((venue) =>
                            <li tabIndex='0' className='list-item' aria-label={venue.venue.name} key={venue.venue.id} onClick={(e) => this.props.handleclick(e.target)}>{venue.venue.name}</li>)
                        }
                    </ul>
                </div>)}
            </div>
        );
      }
}
    
    export default VenuesList;
