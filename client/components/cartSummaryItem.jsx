import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function CartSummaryItem(props) {
  // console.log('props from cartSummary Item: ', props);

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const name = 'details';
  const params = { id: props.idPropCartItem };

  function handleClick() {
    props.deleteItem(props.idPropCartItem);
    toggle();
  }

  function handleIncItem() {
    props.incCartItem(props.idPropCartItem, parseInt(props.quantity) + 1);
  }

  function handleDecItem() {
    props.decCartItem(props.idPropCartItem, parseInt(props.quantity) - 1);
  }

  return (
    <div className="container border">
      <div className="card-body row ">

        <div className="col">
          <img src={props.image} onClick={() => props.onClickImage(name, params)} className="card-img summaryImg" alt="item"/>
          {/* <img src={props.image} className="card-img summaryImg" alt="item" /> */}
        </div>

        <div className="col short">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text badge badge-primary">{(props.price / 100).toFixed(2)}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>

        <div className="col">
          <p>Quantity: {props.quantity}</p>

          <div className="col">
            <i onClick={handleIncItem} className="fas fa-plus-square"></i>
          </div>

          <div className="col">
            <i onClick={handleDecItem} className="fas fa-minus-square"></i>
          </div>
        </div>

        <div className="col">
          {/* <button type="button" onClick={handleClick} className="btn btn-danger">Delete</button> */}
          <Button color= "danger" onClick={toggle}> {buttonLabel} Delete </Button>
        </div>
        <div>
          <Modal isOpen={modal} toggle= {toggle} className={className}>
            <ModalHeader toggle={toggle}> Are you sure want to remove this item?  </ModalHeader>

            <ModalBody>
            This item will be remocved from your cart.
            </ModalBody>

            <ModalFooter>
              <Button color="danger" onClick={handleClick} > Remove </Button>{' '}
              <Button color="secondary" onClick={toggle}> Cancel </Button>
            </ModalFooter>

          </Modal>
        </div>

      </div>
    </div>
  );
}

export default CartSummaryItem;
