// import React from 'react';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Home = props => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => {
    setModal(!modal);

  };

  return (
    <>
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}> Welcome to DreamLight! </ModalHeader>

        <ModalBody>
          Thank you for visiting the site. This website is for commercial purposes only. No items are for sale.
        </ModalBody>

        <ModalFooter>

          <Button color="secondary" onClick={toggle}> Agree </Button>
        </ModalFooter>

      </Modal>
    </div>

      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-caption d-none d-md-block">
          <h1>
            Let There Be Light Shining In The Darkness
          </h1>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img className="d-block w-100" src={'http://www.pptbackgrounds.org/uploads/light-stars-decoration-powerpoint-backgrounds.jpg'} alt="First slide"/>
          </div>

          <div className="carousel-item">
            <img className="d-block w-100" src={'/images/starA1.jpeg'} alt="Second slide"/>
          </div>

          <div className="carousel-item">
            <img className="d-block w-100" src={'https://img.grouponcdn.com/deal/2x6GtAt8ci1HnSdAGJsBtnTwV1Vb/2x-1000x600/v1/c700x420.jpg'} alt="Third slide"/>
          </div>

        </div>

        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>

      <h1>
        Pick Your Design!
      </h1>

      <button type="button" className="btn btn-primary mt-4 ml-2 mb-2" onClick= { () => props.setViewItem('catalog', {})}> Enter Site</button>

    </>
  );
};

export default Home;
