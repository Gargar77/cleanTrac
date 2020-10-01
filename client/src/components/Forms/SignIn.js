import React, {Component} from 'react';
import Input from '../UI/Input/Input';
class signInForm extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email address',
                    name:'auth[email]'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid:false,
                touched:false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password',
                    name:'auth[password]'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false,
            }
        }
    }

    checkValidity(value,rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.max.length && isValid
        }


        return isValid;
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }

    render() {

        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.props.submit} className ="form signin">
                {formElementsArr.map( formEl => (
                    <Input 
                        key={formEl.id}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event)=> this.inputChangedHandler(event,formEl.id)}
                    />

                ))}
                <button type="submit" className="button">Login</button>
            </form>
        );

        return (
            <div className="signin-container">
                {form}
            </div>
            
        );
    }
   
        // <form onSubmit={props.submit} className="form signin">
        //      <label htmlFor="username-input">Email</label>
        //     <input
        //         className="form__input"
        //         id="username-input"
        //         type="email"
        //         name="auth[email]"
        //     />
        //     <label htmlFor="password-input">Password</label>
        //     <input
        //         className="form__input"
        //         type="password"
        //         name="auth[password]"
        //         id="password-input"
        //     />
        //     <button type="submit" className="button">Login</button>
        // </form>
}

export default signInForm;