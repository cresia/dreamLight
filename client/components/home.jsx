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

            <Button color="dark" onClick={toggle}> Agree </Button>
          </ModalFooter>

        </Modal>
      </div>

      <div className="homeBody">
        <h1 className="landingHeader">
          Let There Be Light Shining In The Darkness
        </h1>

      </div>

      <button type="button" className="btn btn-dark enterSiteButton" onClick={() => props.setViewItem('catalog', {})}>
        <div className="enterSiteText">
          Enter Site
        </div>
      </button>

    </>
  );
};

export default Home;
