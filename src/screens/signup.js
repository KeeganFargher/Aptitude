import StepIndicator from 'react-native-step-indicator';
import React from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TextInput,
	Platform,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import BackgroundContainer from './../components/backgroundcontainer';
import { COLOR_BLACK, COLOR_WHITE, COLOR_ROLONEXT_GREEN } from '../common/colours';
import AsyncStorage from '@react-native-community/async-storage';
import { Fumi, Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from './../components/primarybutton';
import Label from './../components/label';

const labels = ['Profile Information', 'Physiological Information', 'Set Goals'];
const colorUnfinished = 'rgba(255, 255, 255, 0.7)';
const colorLabel = 'rgba(255, 255, 255, 0.5)';
const colorFinished = '#d35400';

const customStyles = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 3,
	stepStrokeCurrentColor: colorFinished,
	stepStrokeWidth: 2,
	stepStrokeFinishedColor: colorFinished,
	stepStrokeUnFinishedColor: '#dedede',
	separatorFinishedColor: colorFinished,
	separatorUnFinishedColor: '#dedede',
	stepIndicatorFinishedColor: colorFinished,
	stepIndicatorUnFinishedColor: '#34495e',
	stepIndicatorCurrentColor: '#d35400',
	stepIndicatorLabelFontSize: 0,
	currentStepIndicatorLabelFontSize: 0,
	stepIndicatorLabelCurrentColor: 'transparent',
	stepIndicatorLabelFinishedColor: 'transparent',
	stepIndicatorLabelUnFinishedColor: 'transparent',
	labelColor: colorLabel,
	labelSize: 13,
	labelFontFamily: 'Raleway-Thin',
	currentStepLabelColor: colorFinished
};

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPosition: 0
		};
	}

	renderHeader() {
		return (
			<View>
				<Label style={styles.header} color={'#cbd3db'} fontSize={24} fontFamily={'Raleway-Regular'}>
					SIGN UP
				</Label>
				<View style={{ paddingLeft: 15, paddingRight: 15 }}>
					<StepIndicator
						stepCount={3}
						customStyles={customStyles}
						currentPosition={this.state.currentPosition}
						labels={labels}
					/>
				</View>
			</View>
		);
	}

	renderProfile() {
		if (this.state.currentPosition !== 0) {
			return null;
		}
		return (
			<View>
				<Fumi
					label={'First Name'}
					iconClass={FontAwesomeIcon}
					iconName={'user'}
					iconColor={'#f95a25'}
					iconSize={20}
					iconWidth={40}
					inputPadding={18}
					style={styles.input}
					inputStyle={styles.inputStyle}
					labelStyle={styles.labelStyle}
					value={''}
					onChangeText={text => {}}
				/>
				<Fumi
					label={'Last Name'}
					iconClass={FontAwesomeIcon}
					iconName={'user'}
					iconColor={'#f95a25'}
					iconSize={20}
					iconWidth={40}
					inputPadding={18}
					style={styles.input}
					inputStyle={styles.inputStyle}
					labelStyle={styles.labelStyle}
					value={''}
					onChangeText={text => {}}
				/>
				<Fumi
					label={'Email Address'}
					iconClass={FontAwesomeIcon}
					iconName={'envelope'}
					iconColor={'#f95a25'}
					iconSize={20}
					iconWidth={40}
					inputPadding={18}
					style={styles.input}
					inputStyle={styles.inputStyle}
					labelStyle={styles.labelStyle}
					value={''}
					onChangeText={text => {}}
				/>
			</View>
		);
	}

	renderPhysiological() {
		if (this.state.currentPosition != 1) {
			return null;
		}
		return (
			<View>
				<Fumi
					label={'Email Address'}
					iconClass={FontAwesomeIcon}
					iconName={'envelope'}
					iconColor={'#f95a25'}
					iconSize={20}
					iconWidth={40}
					inputPadding={18}
					style={styles.input}
					inputStyle={styles.inputStyle}
					labelStyle={styles.labelStyle}
					value={''}
					onChangeText={text => {}}
				/>
			</View>
		);
	}

	renderButton() {
		if (this.state.currentPosition !== labels.length - 1) {
			return (
				<PrimaryButton
					title={'NEXT'}
					backgroundColor={COLOR_ROLONEXT_GREEN}
					color={COLOR_WHITE}
					onPress={() => this.onPageChange(this.state.currentPosition + 1)}
				/>
			);
		} else {
			return (
				<PrimaryButton
					title={'SIGN UP'}
					disabled={this.state.submitting}
					backgroundColor={COLOR_ROLONEXT_GREEN}
					color={COLOR_WHITE}
					onPress={() => console.log('asdasd')}
				/>
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderHeader()}

				<View style={styles.form}>
					<Label
						style={[styles.header, {}]}
						color={'#d35400'}
						fontSize={18}
						fontFamily={'Raleway-Regular'}>
						{labels[this.state.currentPosition].toUpperCase()}
					</Label>

					{this.renderProfile()}
					{this.renderPhysiological()}

					{this.renderButton()}
				</View>
			</View>
		);
	}

	onPageChange(position) {
		this.setState({ currentPosition: position });
	}
}

const styles = {
	input: {
		backgroundColor: 'rgba(100, 117, 135, 0.5)',
		marginBottom: 15
	},
	inputStyle: { color: 'white' },
	labelStyle: {
		color: 'rgba(255, 255, 255, 0.8)'
	},
	header: {
		fontFamily: 'Raleway',
		marginBottom: 25,
		alignSelf: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: '#34495e',
		paddingTop: 30
	},
	form: {
		marginTop: 20,
		padding: 25,
		backgroundColor: 'rgba(100, 117, 135, 0.2)',
		flex: 1
	}
};

export default Signup;
