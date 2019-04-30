import SplashScreen from 'react-native-splash-screen';
import React from 'react';
import { StyleSheet, Text, Image, View, TextInput, AsyncStorage, Platform, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BackgroundContainer from './../components/backgroundcontainer';
import TextInputIcon from './../components/textinputicon';
import { COLOR_BLACK, COLOR_WHITE, COLOR_ROLONEXT_GREEN } from '../common/colours';
import Label from './../components/label';
import HorizontalLine from './../components/horizontalline';
import PrimaryButton from './../components/primarybutton';
import { Icon, Input } from 'react-native-elements';
import { apiConstants } from '../common/api';
import axios from 'axios';

class LoginScreen extends React.Component {
	constructor() {
		super();
		this.navigateScreen = this.navigateScreen.bind(this);
		this.resetNavigation = this.resetNavigation.bind(this);
		this.login = this.login.bind(this);

		//define state
		this.state = {
			email: 'fargherkeegan@gmail.com',
			password: '12345',
			submitting: false
		};
	}

	async componentWillMount() {
		//Check if user logged in already
		var isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
		var loggedin = isAuthenticated === true.toString();
		if (loggedin) {
			this.navigateScreen('Home');
		}
	}

	componentDidMount() {
		// SplashScreen.hide();
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
			let url = `${apiConstants.baseUrl}/users/verifylogin/${this.state.email}/${this.state.password}`;
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
		//success, store the users apitoken and other info
		AsyncStorage.setItem('isAuthenticated', true.toString());
		// AsyncStorage.setItem('UserId', data.CompanyUserModel.userModel.pklid.toString());
		// AsyncStorage.setItem('UserGuid', data.CompanyUserModel.userModel.sGuid);
		// AsyncStorage.setItem('CompanyGuid', data.CompanyUserModel.sCompanyGuid);
		// AsyncStorage.setItem(
		// 	'Name',
		// 	`${data.CompanyUserModel.userModel.sFirstname} ${data.CompanyUserModel.userModel.sLastname}`
		// );
		// AsyncStorage.setItem('Firstname', data.CompanyUserModel.userModel.sFirstname);
		// AsyncStorage.setItem('Lastname', data.CompanyUserModel.userModel.sLastname);
		// AsyncStorage.setItem('Email', data.CompanyUserModel.userModel.sEmail);
		this.navigateScreen('Home');
	}

	error(response) {
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
						<TextInputIcon
							text={this.state.email}
							name="email"
							color={COLOR_WHITE}
							autoCapitalize="none"
							type={'material'}
							keyboardType="email-address"
							placeholderTextColor={COLOR_WHITE}
							onChangeText={email => this.setState({ email: email })}
							placeholder="Email Address"
						/>
					</View>
					<View style={styles.inputContainerStyle}>
						<TextInputIcon
							text={this.state.password}
							name="lock-outline"
							color={COLOR_WHITE}
							type={'material'}
							autoCapitalize="none"
							onChangeText={password => this.setState({ password: password })}
							placeholderTextColor={COLOR_WHITE}
							secureTextEntry
							placeholder="Password"
						/>
					</View>
					<View style={styles.actionContainerStyle}>
						<PrimaryButton
							title={this.state.submitting ? 'PROCESSING...' : 'LOGIN'}
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
							onPress={() =>
								this.navigateScreen('SignUp', {
									showSuccessfulRegistration: () =>
										helpers.alert(
											'Success',
											'Please check your email address and follow the instructions to complete your registration..'
										)
								})
							}>
							Sign up here.
						</Label>
					</View>
				</View>
			</BackgroundContainer>
		);
	}
}

const styles = StyleSheet.create({
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
		flex: 0.7
	},
	inputContainerStyle: {
		paddingBottom: Platform.OS === 'ios' ? 10 : 5,
		marginBottom: Platform.OS === 'ios' ? 20 : 10
	},
	actionContainerStyle: {
		marginTop: 50
	}
});

export default LoginScreen;
