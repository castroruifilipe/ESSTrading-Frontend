import React, { Component } from 'react';
import { Media, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import withAuthorization from '../../../../higher-order_components/withAuthorization';
import * as routes from '../../../../constants/routes';
import cfdEnum from '../../../../constants/cfdEnum';
import { iex } from '../../../../IEXClient';


class AbrirCFD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoCFD: props.tipoCFD,
            logo: undefined,
        };
    }

    onSwitchChange = () => {
        this.setState(prevState => ({
            tipoCFD: 1 - prevState.tipoCFD,
        }));
    }

    componentWillMount() {
        iex.stockLogo(this.props.ativo.symbol)
            .then(stockLogo => {
                this.setState({
                    logo: stockLogo.url,
                });
            });
    }



    render() {
        let buttonGroup = undefined;
        let designacao = undefined;
        if (this.state.tipoCFD === cfdEnum.COMPRAR) {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange}>VENDER</Button>
                </ButtonGroup>;
            designacao = 'COMPRAR';

        } else {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange}>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>VENDER</Button>
                </ButtonGroup>;
            designacao = 'VENDER';
        }
        
        let imgLogo = "";
        if (this.state.logo) {
            imgLogo = <Media object src={this.state.logo} style={{maxWith: '64px', maxHeight: '64px'}}/>;
        }

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader >
                    {buttonGroup}
                </ModalHeader>
                <ModalBody>
                    <Media>
                        <Media left style={{margin: '5px 10px 5px 0px'}}>
                            {imgLogo}
                        </Media>
                        <Media body>
                            <span className="text-secondary">{designacao}</span> <span className="text-primary">{this.props.ativo.symbol}</span>
                        </Media>
                    </Media>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        );
    }
}

// const authCondition = (authUser) => !!authUser;
// export default withAuthorization(authCondition)(AbrirCFD);

export default AbrirCFD;
