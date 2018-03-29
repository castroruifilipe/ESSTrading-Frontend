import React from 'react';

class Modal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			toClose: false
		};
	}

	close = () => {
		this.setState({
			toClose: true
		});
	}

	render() {
		if (!this.props.show || this.state.toClose) {
			return null;
		}

		return (
			<div>
				<div className="modal fade show" id="exampleModal" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.close}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{this.props.body}
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onButtonClick}>
									{this.props.buttonText}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Modal;