import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Dimensions,
    StyleSheet,
    ImageBackground
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs'

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/background.jpg';

import validate from '../../utility/validation';

class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
            controls: {
                email: {
                    value: '',
                    valid: false,
                    validationRules: {
                        isEmail: true
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6
                    }
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    }
                }
            }
        }

        this.updateStyles = this.updateStyles.bind(this);
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    updateStyles(dims) {
        this.setState({viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'});
    }

    loginHandler() {
        startMainTabs();
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
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue)
                    }
                }
            };
        });
    }

    render() {
        console.log(this.state.controls.email.value);
        let headingText = null;

        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>Log In</HeadingText>
                </MainText>
            );
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello!')} >Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            style={styles.input} 
                            placeholder="E-Mail Address" 
                            value={this.state.controls.email.value} 
                            onChangeText={val => this.changeHandler('email', val)}
                        />
                        <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                            <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Password" 
                                    value={this.state.controls.password.value}
                                    onChangeText={val => this.changeHandler('password', val)}
                                />
                            </View>
                            <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                <DefaultInput 
                                    style={styles.input} 
                                    placeholder="Confirm Password" 
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={val => this.changeHandler('confirmPassword', val)}
                                />
                            </View>
                        </View>
                    </View>
                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
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

export default AuthScreen;