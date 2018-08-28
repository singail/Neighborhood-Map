import React, { Component } from 'react';
import './App.css';

class Header extends Component {
    toggleOpen = () => {
        const menu = window.document.querySelector('.sidebar');
        menu.classList.toggle('open');
    }

    render() {
        return (
            <header>
                <div className='header'>
                    <div id='hamburger-menu' onClick={this.toggleOpen}>
                        <div className='menu'></div>
                        <div className='menu'></div>
                        <div className='menu'></div>
                    </div>
                    <p>Places to visit in Vilnius</p>
                </div>
          </header>
        );
      }
}
    
    export default Header;
    