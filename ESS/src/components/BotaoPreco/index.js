import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { observe } from 'mobx';
import { compose } from 'recompose';

import { formatterPrice } from '../../constants/formatters';
import './style.css';


class BotaoPreco extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animation: '',
		}
	}

	disposer = observe(this.props.ativosStore.quotes, this.props.symbol, (change => {
		let price = change.newValue[this.props.price];
		let previousPrice = change.oldValue[this.props.price];

		if (price > previousPrice) {
			this.triggerAnimation('animateSubida')
		} else if (price < previousPrice) {
			this.triggerAnimation('animateDescida')
		}
	}));

	triggerAnimation(animation) {
		this.setState({ animation });
	}

	render() {
		let quote = this.props.ativosStore.quotes.get(this.props.symbol);
		if (!quote) {
			return "";
		}
		let price = quote[this.props.price];
		const { animation } = this.state;

		return (
			<Button color="light" type="button" className={"btnprice " + animation}
				onClick={this.props.onClickRow ? this.props.onClickRow(this.props.symbol)(this.props.tipoCFD) : () => { }}
				style={{ borderColor: '#e6e6e6', cursor: this.props.cursor || 'pointer' }} onAnimationEnd={() => this.setState({ 'animation': '' })}>
				<Badge color="primary" className="price">
					{this.props.label}
				</Badge>
				{formatterPrice.format(price)}
			</Button>
		)
	}
}

export default compose(
	inject('ativosStore'),
	observer
)(BotaoPreco);
