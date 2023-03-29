import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'

class Index extends Component
{
	constructor() {
		super();
		this.state = {
			users     : [
				{id : 1, nama : "Contoh 1", email : "contohsatu@gmail.com", username : "contohsatu"},
				{id : 2, nama : "Contoh 2", email : "contohdua@gmail.com", username : "contohdua"},
				{id : 3, nama : "Contoh 3", email : "contohtiga@gmail.com", username : "contohtiga"}
			],
			editUser : {}
		}
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}

	handleUpdateState(data, operation) {
		if (operation == 1) {
			this.setState(prevState => ({
				users : prevState.users.filter(user => {
					if(user.id == data.id)
						return Object.assign(user, data);
					else
						return user;
				})
			}))

			return;
		}

		var new_users = this.state.users.concat(data);
		this.setState({users : new_users})
	}

	handleEditUser(userId) {
		this.setState({
			editUser : this.state.users.find(x => x.id == userId)
		})
	}

	handleDeleteUser(id) {
		this.setState(prevState => ({
			users : prevState.users.filter((user, i) => {return i != id;})
		}))
		toastr.error('Data berhasil dihapus.', {position : 'top-right', heading: 'Done'});
	}

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Users </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add User </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> No </th>
                                    <th> Nama </th>
                                    <th> Email </th>
                                    <th> Username </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map((user, i) => (
                                <tr key={i}>
                                    <td> {i+1} </td>
                                    <td> {user.nama} </td>
                                    <td> {user.email} </td>
                                    <td> {user.username} </td>
                                    <td>
                                        <button className="btn btn-info btn-sm mr-2" onClick={this.handleEditUser.bind(this, user.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser.bind(this, i)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} user = {this.state.editUser} />
			</div>
        )
    }
}
export default Index