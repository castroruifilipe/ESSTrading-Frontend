import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import SwapIcon from 'react-icons/lib/md/swap-horiz';
import NumericInput from 'react-numeric-input';

import unidadeEnum from '../../../../../../constants/unidadeEnum';


class Spinner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            unidade: unidadeEnum.MONTANTE,
            preco: props.preco,
        };
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.preco !== prevState.preco) {
            return ({
                preco: nextProps.preco,
            });
        } else {
            return null;
        }
    }
    
    montante = 0;
    unidades = 0;

    onChange = (valueAsNumber, valueAsString, input) => {
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            this.montante = valueAsNumber;
            this.props.setValorInvestimento(valueAsNumber);
        } else {
            this.unidades = valueAsNumber;
            this.props.setUnidades(valueAsNumber);
        }
    }


    convertUnidades = () => {
        if (this.state.preco === null) {
            this.unidades = 0;
            this.montante = 0;
        } else {
            if (this.state.unidade === unidadeEnum.MONTANTE) {
                this.unidades = this.montante / this.state.preco;
            } else {
                this.montante = this.unidades * this.state.preco;
            }
        }
        this.setState(prevState => ({
            unidade: 1 - prevState.unidade,
        }));
    }

    render() {
        let value = this.montante;
        let buttonText = "UNIDADES";
        let labelText = "MONTANTE";
        if (this.state.unidade === unidadeEnum.UNIDADES) {
            value = this.unidades;
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
