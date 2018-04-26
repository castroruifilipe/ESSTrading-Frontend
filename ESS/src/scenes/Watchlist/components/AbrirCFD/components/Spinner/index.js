import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import SwapIcon from 'react-icons/lib/md/swap-horiz';
import NumericInput from 'react-numeric-input';

import unidadeEnum from '../../../../../../constants/unidadeEnum';


class Spinner extends Component {

    render() {
        let value = this.props.montante;
        let buttonText = "UNIDADES";
        let labelText = "MONTANTE";
        if (this.props.unidade === unidadeEnum.UNIDADES) {
            value = this.props.unidades;
            buttonText = "MONTANTE";
            labelText = "UNIDADES";
        }

        return (
            <div className="container">
                <Row className="align-items-center h-100">
                    <div className="col-md-3" >
                        <span>{labelText}</span>
                    </div>

                    <div className="col-md-5 col-md-offset-6">
                        <NumericInput mobile className="form-control"
                            min={0} precision={2}
                            value={value}
                            onChange={this.props.onChange} />
                    </div>

                    <div className="col-md-4 text-center" >
                        <Button outline color="primary" onClick={this.props.convertUnidades} size="sm">
                            <SwapIcon className="lead" />
                            {buttonText}
                        </Button>
                    </div>
                </Row>
            </div>

        );
    }


}

export default Spinner;
