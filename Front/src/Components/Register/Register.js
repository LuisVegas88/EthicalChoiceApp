import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }

        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    firstNameHandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    lastNameHandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    emailHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submitHandler = (event) => {
        alert(`${this.state.firstName} ${this.state.lastName} Registered Successfully!`)
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })
        event.preventDefault()
    }

    render(){

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Registro de usuario</h1>
                    <label>Nombre: </label>
                    <input type="text" value={this.state.firstName} onChange={this.firstNameHandler} />
                    <label>Apellido: </label>
                    <input type="text" value={this.state.lastName} onChange={this.lastNameHandler} />
                    <label>e-mail: </label>
                    <input type="text" value={this.state.email} onChange={this.emailHandler} />
                    <label>Password: </label>
                    <input type="text" value={this.state.password} onChange={this.passwordHandler} />

                    <input type="submit" value="Enviar" />

                </form>

            </div>
        )
    }

}

export default Register