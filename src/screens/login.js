import SplashScreen from 'react-native-splash-screen';
import React from 'react';
import { StyleSheet, Text, Image, View, TextInput, Platform, Alert } from 'react-native';
import { COLOR_BLACK, COLOR_WHITE, COLOR_ROLONEXT_GREEN } from '../common/colours';
import { NavigationActions } from 'react-navigation';
import BackgroundContainer from './../components/backgroundcontainer';
import TextInputIcon from './../components/textinputicon';
import Label from './../components/label';
import HorizontalLine from './../components/horizontalline';
import PrimaryButton from './../components/primarybutton';
import { Icon, Input } from 'react-native-elements';
import { apiConstants } from '../common/api';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Fumi, Sae, Akira, Hideo } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class LoginScreen extends React.Component {
	constructor() {
		super();
		this.navigateScreen = this.navigateScreen.bind(this);
		this.resetNavigation = this.resetNavigation.bind(this);
		this.login = this.login.bind(this);

		this.state = {
			email: 'keeganfargher@gmail.com',
			password: '12345',
			submitting: false
		};
	}

	async componentWillMount() {
		var isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
		var loggedin = isAuthenticated === true.toString();
		if (loggedin) {
			// this.navigateScreen('Main');
		}
	}

	componentDidMount() {
		SplashScreen.hide();
	}

	resetNavigation(screen, params) {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: screen, params: params })]
		});
		this.props.navigation.dispatch(resetAction);
	}

	navigateScreen(screen, params) {
		const { navigate } = this.props.navigation;
		navigate(screen, params);
	}

	login() {
		if (this.state.email != '' || this.state.password != '') {
			this.setState({ submitting: true });
			const { email, password } = this.state;
			let url = `${apiConstants.baseUrl}/users/verifylogin/${email}/${password}`;
			console.log(url);
			axios
				.get(url)
				.then(this.success.bind(this))
				.catch(this.error.bind(this));
		} else {
			helpers.alert('', 'Please ensure you have entered your email and password.');
		}
	}

	success(response) {
		let data = response.data;

		this.setState({ submitting: false });
		AsyncStorage.setItem('data', JSON.stringify(data));
		AsyncStorage.setItem('isAuthenticated', true.toString());
		AsyncStorage.setItem('id', data.id);
		this.navigateScreen('Main');
	}

	error(response) {
		alert('Incorrect Login Details');
		this.setState({ submitting: false });
	}

	render() {
		return (
			<BackgroundContainer>
				<View style={styles.imageContainerStyle}>
					<Image
						style={{
							flex: 1,
							height: undefined,
							width: undefined
						}}
						source={require('../assets/rolonextlogo.png')}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.formContainerStyle}>
					<View style={styles.inputContainerStyle}>
						<Sae
							label={'Email Address'}
							iconClass={FontAwesomeIcon}
							iconName={'envelope'}
							iconColor={'white'}
							inputPadding={20}
							labelHeight={24}
							borderHeight={2}
							inputStyle={{ borderBottomColor: 'white', borderBottomWidth: 2 }}
							labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
							autoCapitalize={'none'}
							autoCorrect={false}
							onChangeText={email => this.setState({ email: email })}
							value={this.state.email}
						/>
					</View>
					<View style={styles.inputContainerStyle}>
						<Sae
							label={'Password'}
							iconClass={FontAwesomeIcon}
							iconName={'pencil'}
							iconColor={'white'}
							inputPadding={20}
							labelHeight={24}
							borderHeight={2}
							secureTextEntry
							inputStyle={{ borderBottomColor: 'white', borderBottomWidth: 2 }}
							labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
							autoCapitalize={'none'}
							autoCorrect={false}
							onChangeText={password => this.setState({ password: password })}
							value={this.state.password}
						/>
					</View>
					<View style={styles.actionContainerStyle}>
						<PrimaryButton
							title={this.state.submitting ? 'LOADING...' : 'LOGIN'}
							disabled={this.state.submitting}
							backgroundColor={COLOR_ROLONEXT_GREEN}
							color={COLOR_WHITE}
							onPress={() => this.login()}
						/>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Label
							color={COLOR_WHITE}
							paddingTop={20}
							onPress={() => this.navigateScreen('Signup')}>
							Sign up here.
						</Label>
					</View>
				</View>
			</BackgroundContainer>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		color: 'white',
		backgroundColor: 'rgba(255, 255, 255, 0.1)'
	},
	scrollViewStyle: {
		flex: 1
	},
	imageContainerStyle: {
		paddingLeft: 20,
		paddingRight: 20,
		flex: 0.3
	},
	formContainerStyle: {
		paddingTop: 20,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
		width: '100%',
		position: 'absolute',
		bottom: 0
	},
	inputContainerStyle: {
		paddingBottom: Platform.OS === 'ios' ? 10 : 5,
		marginBottom: Platform.OS === 'ios' ? 20 : 10
	},
	actionContainerStyle: {
		marginTop: 50
	},
	scene: {
		flex: 1
	}
});

export default LoginScreen;
