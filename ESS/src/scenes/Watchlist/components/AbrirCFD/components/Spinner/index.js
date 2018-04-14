import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import SwapIcon from 'react-icons/lib/md/swap-horiz';
import NumericInput from 'react-numeric-input';

import unidadeEnum from '../../../../../../constants/unidadeEnum';


let montante = 0;
let unidades = 0;

class Spinner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unidade: unidadeEnum.MONTANTE,
        };
    }

    onChange = (valueAsNumber, valueAsString, input) => {
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            montante = valueAsNumber;
        } else {
            unidades = valueAsNumber;
        }
    }

    convertUnidades = () => {
        let precoAtivo = 1.4239;
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            unidades = montante / precoAtivo;
        } else {
            montante = unidades * precoAtivo;
        }
        this.setState(prevState => ({
            unidade: 1 - prevState.unidade,
        }));
    }

    render() {
        let value = montante;
        let buttonText = "UNIDADES";
        let labelText = "MONTANTE";
        if (this.state.unidade == unidadeEnum.UNIDADES) {
            value = unidades;
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
                            onChange={this.onChange} />
                    </div>

                    <div className="col-md-4 text-center" >
                        <Button outline color="primary" onClick={this.convertUnidades} size="sm">
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
