import React from 'react';
// import { Modal, ModalBody } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
      // modal: false  ---- if using reactstrap
    };
    this.setMenu = this.setMenu.bind(this);
    // this.toggle = this.toggle.bind(this);
  }
  setMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  // toggle() {
  //   this.setState({ modal: !this.state.modal });
  // }

  render() {

    if (!this.state.showMenu) {
      return (
        // close the menu bar: it contains one for mobile and the second for website
        <>
          <div className="wrapHeader">
            <div className="toggleSpan">
              <div className="headerTitle menuBarImg" onClick={this.setMenu}>&#9776;</div>
              {/* <div className="headerTitle" onClick={() => { this.setMenu(); this.toggle(); }}>&#9776; </div> */}
              <div className="headerTitle">
                DreamLight
              </div>
              <div className="itemText" onClick={() => this.props.setViewItem('cart', {})}> {this.props.cartItemCount}
                <i onClick={() => this.props.setViewItem('cart', {})} className="fas fa-cart-plus text-dark cartIcon"></i>
              </div>

            </div>
          </div>

          <nav className="navbar navbar-expand-lg bg-light">
            <div className="navbar-collapse" id="navbarTogglerDemo01">
              <h2 className="headerTitle">{this.props.text}</h2>
              <ul className="headerIcons">
                <li className="nav-item mx-2">
                  <i onClick={() => this.props.setViewItem('home', {})} className="homeIcon text-dark fas fa-home" alt="home"></i>
                </li>
                <li className="nav-item mx-2">
                  <i onClick={() => this.props.setViewItem('catalog', {})} className="catalogIcon fas fa-th-list" alt="catalog"></i>
                </li>
                <li className="nav-item mx-2">
                  <div className="itemText" onClick={() => this.props.setViewItem('cart', {})}> {this.props.cartItemCount} items
                    <i onClick={() => this.props.setViewItem('cart', {})} className="fas fa-cart-plus text-dark cartIcon"></i>
                  </div>
                </li>
              </ul>

            </div>
          </nav>
        </>
      );

    } else {
      return (
        // open the menu if it's false using reactstrap
        <>
          {/* <div>
            <Modal className="nav-modal" isOpen={this.state.modal} onClick={() => { this.setMenu(); this.toggle(); }}>
              <ModalBody>
                <div className="closebtn" onClick={() => { this.setMenu(); this.toggle(); }}>&times;</div>
                <div className="sideNav">

                  <div onClick={() => { this.props.setViewItem('home', {}); this.toggle(); this.setMenu(); }} href="#">Home</div>
                  <div onClick={() => { this.props.setViewItem('catalog', {}); this.toggle(); this.setMenu(); }} href="#">Catalog</div>
                  <div onClick={() => { this.props.setViewItem('cart', {}); this.toggle(); this.setMenu(); }} href="#">Cart</div>
                </div>
              </ModalBody>

            </Modal>

          </div> */}

            <div className="wrapHeader">
              <div className="toggleSpan">
                <div className="headerTitle menuBarImg" onClick={this.setMenu}>&#9776;</div>
                {/* <div className="headerTitle" onClick={() => { this.setMenu(); this.toggle(); }}>&#9776; </div> */}
                <div className="headerTitle">
                  DreamLight
                </div>
                <div className="itemText" onClick={() => this.props.setViewItem('cart', {})}> {this.props.cartItemCount}
                  <i onClick={() => this.props.setViewItem('cart', {})} className="fas fa-cart-plus text-dark cartIcon"></i>
                </div>

              </div>
            </div>

            <div className="overlay" onClick={this.setMenu}>
              <div className="sidenav" id="mySideNav" >
                <div className="closebtn" onClick={this.setMenu}>&times;</div>

                <div className="menuLink" onClick={() => { this.props.setViewItem('home', {}); this.setMenu(); }} href="#">
                  <div className="homeIconMobile1 fas fa-home"></div>
                  <div className="iconTextMobile">Home</div>
                </div>

                <div className="menuLink" onClick={() => { this.props.setViewItem('catalog', {}); this.setMenu(); }} href="#">
                  <div className="homeIconMobile1 fas fa-th-list"></div>
                  <div className="iconTextMobile"> Catalog </div>
                </div>

                <div className="menuLink" onClick={() => { this.props.setViewItem('cart', {}); this.setMenu(); }} href="#">
                  <div className="homeIconMobile1 fas fa-cart-plus"></div>
                  <div className="iconTextMobile"> Cart </div>
                </div>

              </div>
            </div>

        </>
      );
    }
  }
}
export default Header;

// --------------------- this is the original code without implementing the menu bar ------------
// import React from 'react';
// function Header(props) {
//   return (
//     <nav className="navbar navbar-expand-lg bg-light">

//       <div className="navbar-collapse" id="navbarTogglerDemo01">
//         {/* <a className="navbar-brand" href="#">
//           <img className = "logoImage" src={'https://t4.ftcdn.net/jpg/01/52/90/27/240_F_152902753_6ijd5N4BQFofY1Skllep9k85K0MWDOh9.jpg'} />
//         </a> */}
//         <h2 className="headerTitle">{props.text}</h2>
//         <ul className="headerIcons">
//           <li className="nav-item">
//             <i onClick={() => props.setViewItem('home', {})} className="homeIcon text-dark fas fa-home" alt="home"></i>
//           </li>
//           <li className="nav-item">
//             <i onClick={() => props.setViewItem('catalog', {})} className="catalogIcon fas fa-th-list" alt="catalog"></i>
//           </li>
//           <li className="nav-item">
//             <div className="itemText" onClick={() => props.setViewItem('cart', {})}> {props.cartItemCount} items
//               <i onClick={() => props.setViewItem('cart', {})} className="fas fa-cart-plus text-dark cartIcon"></i>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
// export default Header;
