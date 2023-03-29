import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Create extends Component
{
	constructor() {
		super();
		this.state = { errors : [], nama : '', email : '', username : '' }
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertUser = this.handleInsertUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}

	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleInsertUser(e) {
		e.preventDefault()

		const data = {
			id : Math.floor(Math.random() * 100),
			nama : this.state.nama,
			email : this.state.email,
			username : this.state.username
		}

		if ( !this.checkValidation(data) ) {
			this.reset();
			this.props.updateState(data, 0);
			document.getElementById("closeAddModal").click();
			toastr.success('Data berhasil ditambahkan.', {position : 'top-right', heading: 'Done'});
		}
	}

	checkValidation(fields) {
		var error = {};
    	if (fields.nama.length == 0) {
    		error.nama = ['This field is required!'];
    	}
    	if (fields.email.length == 0) {
    		error.email = ['This field is required!'];
    	}
    	if (fields.username.length == 0) {
    		error.username = ['This field is required!'];
    	}

		this.setState({
			errors : error
		})

		if (fields.username.length == 0 || fields.nama.length == 0 || fields.email.length == 0) {
			return true;
		} else {
			return false;
		}
    }

    reset() {
        this.setState(this.baseState);
    }

	hasErrorFor(fieldName) {
		return !!this.state.errors[fieldName];
	}

	renderErrorFor(fieldName) {
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
		return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">New user</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
				        <form onSubmit={this.handleInsertUser}>
				      		<div className="modal-body">
				          		<div className="form-group">
				            		<label htmlFor="nama" className="col-form-label">Nama:</label>
				            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('nama') ? 'is-invalid' : ''}`}
				            		 id="nama" name="nama" placeholder="Nama" onChange={this.handleInputFieldChange} value={this.state.nama}/>
				            		{this.renderErrorFor('nama')}
				          		</div>
				          		<div className="form-group">
				            		<label htmlFor="email" className="col-form-label">Email:</label>
				            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
				            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
				            		{this.renderErrorFor('email')}
				          		</div>
				          		<div className="form-group">
				            		<label htmlFor="username" className="col-form-label">Username:</label>
				            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('username') ? 'is-invalid' : ''}`}
				            		 id="username" name="username" placeholder="Username" onChange={this.handleInputFieldChange} value={this.state.username}/>
				            		{this.renderErrorFor('username')}
				         	 		</div>
				      		</div>
				      		<div className="modal-footer">
				        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
				        		<button type="submit" className="btn btn-primary btn-sm">Save User</button>
				      		</div>
						</form>
					</div>
				</div>
			</div>
        )
    }
}
export default Create