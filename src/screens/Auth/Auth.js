import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Keyboard,
    TextInput,
    Dimensions,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs'

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/background.jpg';

import validate from '../../utility/validation';

import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            authMode: 'login',
            controls: {
                email: {
                    value: '',
                    valid: false,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                    touched: false
                }
            }
        };

        [
            'loginHandler',
            'updateStyles',
            'switchAuthModeHandler'
        ].map(fn => this[fn] = this[fn].bind(this));
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles(dims) {
        this.setState({ viewMode: dims.window.height > 500 ? 'portrait' : 'landscape' });
    }

    loginHandler() {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };

        this.props.onLogin(authData);

        startMainTabs();
    }

    switchAuthModeHandler() {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    }

    changeHandler(key, value) {
        let connectedValue = {};

        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;

            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        this.setState(prevState => {
            return {
                confirmPassword: {
                    ...prevState.controls.confirmPassword,
                    valid: key === 'password'
                        ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                        : prevState.controls.confirmPassword.valid
                },
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            };
        });
    }

    render() {
        let headingText = null;
        let confirmPasswordControl = null;

        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>
                        {this.state.authMode === 'login' ? 'Log In' : 'Sign Up'}
                    </HeadingText>
                </MainText>
            );
        }

        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        secureTextEntry
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={this.state.controls.confirmPassword.value}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        onChangeText={val => this.changeHandler('confirmPassword', val)}
                    />
                </View>
            );
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}
                    >
                        Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Log In'}
                    </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                autoCorrect={false}
                                style={styles.input}
                                autoCapitalize="none"
                                placeholder="E-Mail Address"
                                keyboardType="email-address"
                                value={this.state.controls.email.value}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                onChangeText={val => this.changeHandler('email', val)}
                            />
                            <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer}
                            >
                                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                    ? styles.portraitPasswordWrapper
                                    : styles.landscapePasswordWrapper}
                                >
                                    <DefaultInput
                                        secureTextEntry
                                        style={styles.input}
                                        placeholder="Password"
                                        value={this.state.controls.password.value}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        onChangeText={val => this.changeHandler('password', val)}
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.loginHandler}
                        disabled={
                            !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                            !this.state.controls.email.valid ||
                            !this.state.controls.password.valid
                        }
                    >
                        Submit
                    </ButtonWithBackground>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%'
    },
    landscapePasswordWrapper: {
        width: '45%'
    },
    portraitPasswordWrapper: {
        width: '100%'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: authData => dispatch(tryAuth(authData))
    };
};

export default connect(null, mapDispatchToProps)(AuthScreen);