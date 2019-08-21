import React from 'React';

function pageTitle(props) {
  return (

    <React.Fragment>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            <img className = "logoImage" src={'https://t4.ftcdn.net/jpg/01/52/90/27/240_F_152902753_6ijd5N4BQFofY1Skllep9k85K0MWDOh9.jpg'} />
          </a>
          <ul className="navbar-nav">
            <h2 className= "headerTitle">{props.text}</h2>
          </ul>
        </div>
      </nav>

    </React.Fragment>

  );
}

export default pageTitle;
