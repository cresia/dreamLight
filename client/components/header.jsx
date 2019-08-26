import React from 'react';

function Header(props) {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#">
          <img className = "logoImage" src={'https://t4.ftcdn.net/jpg/01/52/90/27/240_F_152902753_6ijd5N4BQFofY1Skllep9k85K0MWDOh9.jpg'} />
        </a>
        <ul className="navbar-nav">
          <h2 className= "headerTitle">{props.text}</h2>
        </ul>

        <div className= "itemText text-warning"> items
          <i className= "fas fa-cart-plus text-warning cartIcon">
            {props.cartItemCount}
          </i>

        </div>

      </div>
    </nav>

  );
}

export default Header;
