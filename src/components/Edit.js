import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor() {
		super();
		this.state = { errors : [], user_id : '', nama : '', email : '', username : '' }
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}

	UNSAFE_componentWillReceiveProps(user_data) {
		this.setState({
			user_id : user_data.user.id,
			nama : user_data.user.nama,
			email : user_data.user.email,
			username : user_data.user.username
		})
	}

	handleInputFieldChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleUpdateUser(e) {
		e.preventDefault()

		const data = {
			id : this.state.user_id,
			nama : this.state.nama,
			email : this.state.email,
			username : this.state.username
		}

		if (!this.checkValidation(data)) {
			this.reset();
			this.props.updateState(data, 1);
			document.getElementById("closeEditModal").click();
			toastr.warn('Data berhasil diubah.', {position : 'top-right', heading: 'Done'});
		}
	}

    checkValidation(fields) {
    	var error = {};
    	if (fields.nama.length == 0) {
    		error.nama = ['Nama tidak boleh kosong.'];
    	}
    	if (fields.email.length == 0) {
    		error.email = ['Email tidak boleh kosong.'];
    	}
    	if (fields.username.length == 0) {
    		error.username = ['Username tidak boleh kosong.'];
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
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
				        <form onSubmit={this.handleUpdateUser}>
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
				        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
				        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
				      		</div>
				   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit