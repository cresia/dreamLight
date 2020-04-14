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
    // <div className="container border">
    <div className="card-body sumCardBody border row">

      <div className="col-sm-3">
        <img src={props.image} onClick={() => props.onClickImage(name, params)} className="card-img summaryImg" alt="item"/>
        {/* <img src={props.image} className="card-img summaryImg" alt="item" /> */}
      </div>

      <div className="col-md-4 cartInfo">
        <div className="row">
          <h5 className="card-titleCart" onClick={() => props.onClickImage(name, params)}> {props.name}</h5>
        </div>

        <div className="row">
          <p className="card-textCartPrice">${(props.price / 100).toFixed(2)}</p>
          <p className="card-textShortDes">{props.shortDescription}</p>

        </div>

      </div>

      <div className="row cartButtonsSpace">

        <div className="col-sm-3">
          <i onClick={handleDecItem} className="far fa-minus-square minPlusCartSum "></i>
          {/* <i onClick={handleDecItem} className="far fa-minus-square minPlusCartSumDes1"></i> */}
        </div>

        <div className="col-md-3">
          <p className="quantityCartSum"> {props.quantity}</p>

        </div>

        <div className="col-md-3">
          <i onClick={handleIncItem} className="far fa-plus-square minPlusCartSum2"></i>
        </div>

        <div className="col-md-3">
          <Button className="delCartSum" color="danger" onClick={toggle}> {buttonLabel} Delete </Button>
        </div>
      </div>

      <div>
        <Modal isOpen={modal} toggle= {toggle} className={className}>
          <ModalHeader toggle={toggle}> Are you sure want to remove this item? </ModalHeader>

          <ModalBody>

            <div>
              <strong> {props.name} </strong> will be removed from your cart.
            </div>

          </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={handleClick} > Remove </Button>{' '}
            <Button color="secondary" onClick={toggle}> Cancel </Button>
          </ModalFooter>

        </Modal>
      </div>

    </div>
    // </div>
  );
}

export default CartSummaryItem;
