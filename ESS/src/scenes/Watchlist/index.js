import React, { Component } from 'react';
// import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

import * as routes from '../../constants/routes';

//import './style.css';

// const BaseContainer = props =>
//     <div
//         style={{
//             display: 'inline-block',
//             paddingTop: 16,
//             paddingBottom: 16,
//             width: 240,
//             ...props.style
//         }}
//     >
//         {props.children}
//     </div>;




// const SideNavWithAlerts = () =>
//     <SideNav
//         hoverBgColor="#232a2f"
//         hoverColor="red"
//         highlightBgColor="#00acac"
//         defaultSelected="products"
//         highlightColor="#FFF">
//         <div />
//         <Nav id="dashboard">
//             <NavText> Dashboard </NavText>
//         </Nav>

//         <Nav id="products">
//             <NavText> Products </NavText>
//         </Nav>
//         <Nav id="orders">
//             <NavText>
//                 {' '}<span style={{ paddingRight: 6 }}>Orders</span>{' '}
//                 <span
//                     style={{
//                         textAlign: 'center',
//                         lineHeight: '16px',
//                         height: 16,
//                         width: 16,
//                         margin: '0 auto',
//                         borderRadius: '50%',
//                         fontSize: 9,
//                         display: 'inline-block',
//                         color: '#FFF',
//                         background: '#ff5b57'
//                     }}
//                 >
//                     10
//                 </span>
//             </NavText>
//         </Nav>

//         <Nav id="customers">
//             <NavText> Customers </NavText>
//             <Nav id="dashboard2">
//                 <NavText> Search </NavText>
//             </Nav>
//             <Nav
//                 id="sales2"
//                 onNavClick={() => {
//                     console.log('Promote clicked!', arguments);
//                 }}
//             >
//                 <NavText> Promote </NavText>
//             </Nav>
//             <Nav id="products2">
//                 <NavText> Social Media </NavText>
//             </Nav>
//         </Nav>
//         <Nav
//             id="sales"
//             onNavClick={() => {
//                 console.log('Sales clicked!', arguments);
//             }}
//         >
//         </Nav>
//         <Nav id="deliveries">
//             <NavText> Deliveries </NavText>
//         </Nav>
//     </SideNav>;



class Watchlist extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div style={{ display: 'flex' }}>

                {/* <BaseContainer
                    style={{
                        fontSize: 12,
                        background: '#2d353c',
                        color: '#a8acb1',
                        paddingTop: 0
                    }}>
                    <div style={{ display: 'flex', padding: 16, background: '#1a2229' }}>
                        <div style={{ width: 40, height: 40 }}>
                            <img
                                src="https://e27.co/img/profiles/15483/profile_pic.png"
                                style={{ borderRadius: '30px', width: 40, height: 40 }}
                            />
                        </div>
                        <div style={{ paddingLeft: 6, paddingTop: 6 }}>
                            <div style={{ fontSize: 12, color: '#E5E5E5' }}>
                                {' '}Warren Mira{' '}
                            </div>
                            <div style={{ fontSize: 11 }}> Ninja Developer </div>
                        </div>
                    </div>
                    <SideNavWithAlerts />
                </BaseContainer> */}

            </div>

        );


    }

}


export default Watchlist;