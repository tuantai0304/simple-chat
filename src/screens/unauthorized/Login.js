import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { loginSuccess } from '../../actions/Authenticate';

import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';


const config = {
    apiKey: "AIzaSyCTeOxBXfzG5cBDfbSrn61UmbQ4DX9E0ho",
    authDomain: "learnreactnative-2432c.firebaseapp.com",
    databaseURL: "https://learnreactnative-2432c.firebaseio.com",
    projectId: "learnreactnative-2432c",
    storageBucket: "learnreactnative-2432c.appspot.com",
    messagingSenderId: "985626450608"
};
firebase.initializeApp(config);

const LoginButton = MKButton.coloredButton().withText('LOGIN').build();

class Login extends Component {

    static navigationOptions = {
        // headerMode: 'none',
    }

    state = {
        animating: false,
        error: null,
        email: '',
        password: '',
    };

    onLogin = async () => {
        try {
            this.setState({
                animating: true,
                error: null
            });
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw new Error('Please sign in before continue');
            }
            const tokenData = await AccessToken.getCurrentAccessToken();
            const token = tokenData.accessToken.toString();
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = await firebase.auth().signInWithCredential(credential);
            this.setState({
                animating: false,
                error: null
            });
            this.props.loginSuccess(user);
        } catch (error) {
            this.setState({
                animating: false,
                error: error.message
            });
        }
    };

    onButtonPress() {
        console.log('Button pressed');
        const { email, password } = this.state;
        // console.log(email);
        // console.log(password);

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onAuthSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        firebase.database().ref(`/users/${user.uid}/profile`).set({
                            name: user.displayName,
                            email: user.email,
                            avatar: user.photoURL
                        });
                    })
                    .then(this.onAuthSuccess.bind(this))
                    .catch(this.onAuthFailed.bind(this));
                // console.log('error');
            });
    }

    onAuthSuccess(user){
        this.setState( {
            email: '',
            password: '',
            error: '',
            loading: false,
        });

        this.props.loginSuccess(user);
    }

    onAuthFailed(){
        this.setState( {
            error: 'Authentication failed',
            loading: false,
        });

        console.log('error');
    }

    render() {
        const { form, fieldStyles, loginButtonArea, errorMessage, welcome, container } = styles;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'red' }}>Login Screen</Text>
                <ActivityIndicator
                    animating={this.state.animating}
                    color="#444"
                    size="large"
                />
                {
                    this.state.error ? (
                        <Text style={styles.error}>{this.state.error}</Text>
                    ) : null
                }

                {/* Add login form*/}
                <MKTextField
                    text={this.state.email}
                    onTextChange = {email => this.setState({ email: email })}
                    textInputStyle = {fieldStyles}
                    placeholder = {'Email...'}
                    tintColor = {MKColor.Teal}
                />
                <MKTextField
                    text={this.state.password}
                    onTextChange = {password => this.setState({ password: password })}
                    textInputStyle = {fieldStyles}
                    placeholder = {'Password...'}
                    tintColor = {MKColor.Teal}
                />

                <Text style={errorMessage}>
                    {this.state.error}
                </Text>

                {/*<View style={loginButtonArea}>*/}
                    {/*/!*{ this.renderLoader() }*!/*/}
                    {/*<LoginButton onPress = {this.onButtonPress.bind(this)} />*/}
                {/*</View>*/}

                <Button
                    onPress={this.onButtonPress.bind(this)}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />

                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#3b5998',
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#fff' }}>
                        Login with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    error: {
        fontSize: 18,
        color: 'red'
    },
    form: {
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
        marginTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
};

export default connect(state => ({
    logged: state.authentication.loggedIn,
    user: state.authentication.user
}), { loginSuccess })(Login);