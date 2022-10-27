import React, { Component} from "react";

import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';


class NewSignup extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            activeItem:{
                username: '',
                email: '',
                password: '',
                passwordVerify: '',
            },
            errorFlag: false,
            errorMsg: null,
            successFlag: false,
            successMsg: null,

        }
    };

    handleSubmit = (item) => {
        this.setState({errorFlag:false, errorMsg: null})
        if (!item.username || !item.email || !item.password) {
            this.setState({errorFlag:true, errorMsg: 'please fill all the fields'})
        } else if (!(item.email.includes("@") && (item.email.includes(".com") || item.email.includes(".edu") || item.email.includes(".net") || item.email.includes(".org")))){
            this.setState({errorFlag:true, errorMsg: 'please enter a valid email address'})
        } else if (item.password!=item.passwordVerify) {
            this.setState({errorFlag:true, errorMsg: 'passwords do not match'})
        } else {
            axios
            .post(`https://music-rater-comp333.herokuapp.com/api/auth/register`, item)
            .then((res) => 
                this.setState({successFlag:true, successMsg: 'user registered successfully'})
            )
            .catch((e) =>
                this.setState({errorFlag:true, errorMsg: 'username already exists'})
            )
        }
        return;
    }
        // create method 
        

    handleChange = (e) => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
      
        this.setState({ activeItem });
      };
    

    toggleModal = () => {
        this.setState({loginModal: !this.state.loginModal});
    };

    render() {
        return(
            <main className="container">
                <h1 className="header">Account Sign Up</h1>
                <div className="card">
                    <Form>
                        <FormGroup>
                            <Label for="login-username">Username</Label>
                            <Input
                                type="text"
                                id="login-username"
                                name="username"
                                value={this.state.activeItem.username}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="login-email">Email</Label>
                            <Input
                                type="text"
                                id="login-email"
                                name="email"
                                value={this.state.activeItem.email}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="login-password">Password</Label>
                            <Input
                                type="password"
                                id="login-password"
                                name="password"
                                value={this.state.activeItem.password}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="login-password">Re-enter Password</Label>
                            <Input
                                type="password"
                                id="login-password-verify"
                                name="passwordVerify"
                                value={this.state.activeItem.passwordVerify}
                                onChange={this.handleChange}
                                placeholder=""
                            />
                        </FormGroup>
                    </Form>
                    <Button
                        color="success"
                        onClick={() => this.handleSubmit(this.state.activeItem)}
                    >
                        Register
                    </Button>
                    {this.state.errorFlag ? (
                        <p>{this.state.errorMsg}</p>
                    ) : null}
                    {this.state.successFlag ? (
                        <p className="successMessage">{this.state.successMsg}</p>
                    ) : null}
                </div>
            </main>
        );
    }
}

export default NewSignup;