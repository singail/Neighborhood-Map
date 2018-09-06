import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
    toggleOpen = () => {
        const menu = window.document.querySelector('.sidebar');
        menu.classList.toggle('open');
        const listItems = window.document.getElementsByClassName('list-item');
        if (menu.classList.contains('open') === true) {
            [...listItems].forEach(item => item.setAttribute("tabIndex", "0"));
        } else {
            [...listItems].forEach(item => item.setAttribute("tabIndex", "-1"));
        }
    }

    render() {
        return (
            <header>
                <div className='header'>
                    <div tabIndex='0' aria-label='navigation' role='navigation' id='hamburger-menu' onClick={this.toggleOpen}>
                        <div className='menu'></div>
                        <div className='menu'></div>
                        <div className='menu'></div>
                    </div>
                    <p tabIndex='0'>Places to visit in Vilnius</p>
                </div>
          </header>
        );
      }
}
    
    export default Header;
    