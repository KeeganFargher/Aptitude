import React from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ActivityIndicator,
	ImageBackground,
	ScrollView,
	KeyboardAvoidingView,
	Picker
} from 'react-native';
import BackgroundContainer from './../components/backgroundcontainer';
import { COLOR_WHITE, COLOR_GREY, COLOR_ROLONEXT_GREEN, COLOR_BLACK } from '../common/colours';
import TextInputIcon from './../components/textinputicon';
import { Image, Input, Icon } from 'react-native-elements';
import Label from './../components/label';
import { Fumi, Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { apiConstants } from '../common/api';
import axios from 'axios';
import { Header } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const screen = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
};
const width = screen.width - 30;

class MyProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: {
				name: ' ',
				surname: ' ',
				email: ' ',
				measurementTypeId: '',
				weight: 0,
				height: 0
			}
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			saveProfileSettings: this._saveProfileSettings
		});
		this.setState({ loading: false });
	}

	componentWillMount() {
		this.getUser();
	}

	/* Save button in the header */
	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: (
				<TouchableOpacity style={{ marginRight: 20 }}>
					<Text style={styles.saveText} onPress={navigation.getParam('saveProfileSettings')}>
						Save
					</Text>
				</TouchableOpacity>
			)
		};
	};

	_saveProfileSettings = () => {
		this.setState({ loading: true });
		let url = `${apiConstants.baseUrl}/Users/update/${this.state.data.id}`;
		axios
			.put(url, this.state.data)
			.then(() => this._onSaveProfileSettingsSuccess())
			.catch(err => alert(err))
			.finally(() => this.setState({ loading: false }));
	};

	_onSaveProfileSettingsSuccess() {
		AsyncStorage.setItem('data', JSON.stringify(this.state.data));
		this.props.navigation.goBack();
	}

	async getUser() {
		let data = await AsyncStorage.getItem('data');
		data = JSON.parse(data);
		this.setState({
			data: data
		});
	}

	getFullName() {
		return this.state.data.name + ' ' + this.state.data.surname;
	}

	getWeight() {
		const weight = this.state.data.weight;
		if (weight == null) {
			return '';
		}
		return weight.toString();
	}

	getHeight() {
		const height = this.state.data.height;
		if (height == null) {
			return '';
		}
		return height.toString();
	}

	getWeightLabel() {
		let user = this.state.data;
		let measurement = user.measurementTypeId;
		let mass = measurement === '1e003c947cab42a6a3b9adee57861e80' ? 'kilograms' : 'pounds';
		return `Weight (${mass})`;
	}

	getHeightLabel() {
		let user = this.state.data;
		let measurement = user.measurementTypeId;
		let length = measurement === '1e003c947cab42a6a3b9adee57861e80' ? 'centimeters' : 'inches';
		return `Height (${length})`;
	}

	updatePicker(itemValue) {
		const data = this.state.data;
		const imperialValue = '442f81879dc34561a812aff4fd68dac3';
		let weight = data.weight;
		let height = data.height;

		if (itemValue === imperialValue && data.measurementTypeId != itemValue) {
			weight *= 2.205;
			height *= 2.54;
		} else {
			weight /= 2.205;
			height /= 2.54;
		}
		data.measurementTypeId = itemValue;
		data.weight = weight.toFixed(1);
		data.height = height.toFixed(1);
		this.setState({ data: data });
	}

	render() {
		return (
			<View style={styles.container}>
				<Spinner
					visible={this.state.loading}
					textContent={'Busy...'}
					textStyle={styles.spinnerTextStyle}
				/>

				<ImageBackground
					style={styles.imageContainer}
					source={require('../assets/profile-background.png')}>
					<TouchableHighlight style={styles.imageView} onPress={this._openImagePicker}>
						<Image
							style={styles.image}
							source={{ uri: 'https://randomuser.me//api//portraits//women//68.jpg' }}
							PlaceholderContent={<ActivityIndicator />}
						/>
					</TouchableHighlight>
					<Label style={styles.name} color={'#e6e1dc'} fontSize={18} bold={true}>
						{this.getFullName()}
					</Label>
				</ImageBackground>

				<ScrollView contentContainerStyle={styles.margins}>
					<KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 20} behavior="height">
						<Label style={styles.header} color={'rgba(0,0,0,0.7)'} fontSize={16} bold={true}>
							Profile Information
						</Label>
						<Fumi
							key={'First Name'}
							label={'First Name'}
							iconClass={FontAwesomeIcon}
							iconName={'user'}
							iconColor={'#f95a25'}
							iconSize={20}
							iconWidth={40}
							inputPadding={16}
							inputStyle={styles.input}
							value={this.state.data.name}
							onChangeText={text => {
								let data = this.state.data;
								data.name = text;
								this.setState({ data: data });
							}}
						/>
						<Fumi
							key={'Surname'}
							label={'Surname'}
							iconClass={FontAwesomeIcon}
							iconName={'user'}
							iconColor={'#f95a25'}
							iconSize={20}
							iconWidth={40}
							inputPadding={16}
							inputStyle={styles.input}
							value={this.state.data.surname}
							onChangeText={text => {
								let data = this.state.data;
								data.surname = text;
								this.setState({ data: data });
							}}
						/>
						<Fumi
							key={'email'}
							label={'Email'}
							iconClass={FontAwesomeIcon}
							iconName={'envelope'}
							iconColor={'#f95a25'}
							iconSize={20}
							iconWidth={40}
							inputPadding={16}
							inputStyle={styles.input}
							value={this.state.data.email}
							onChangeText={text => {
								let data = this.state.data;
								data.email = text;
								this.setState({ data: data });
							}}
						/>

						<Label
							style={[styles.header, { marginTop: 15 }]}
							color={'rgba(0,0,0,0.7)'}
							fontSize={16}
							bold={true}>
							Measurement Type
						</Label>
						<Picker
							selectedValue={this.state.data.measurementTypeId}
							mode={'dialog'}
							style={styles.picker}
							onValueChange={(itemValue, itemIndex) => {
								this.updatePicker(itemValue);
							}}>
							<Picker.Item label="Metric" value="1e003c947cab42a6a3b9adee57861e80" />
							<Picker.Item label="Imperial" value="442f81879dc34561a812aff4fd68dac3" />
						</Picker>

						<Label
							style={[styles.header, { marginTop: 15 }]}
							color={'rgba(0,0,0,0.7)'}
							fontSize={16}
							bold={true}>
							Physiological Information
						</Label>
						<Fumi
							key={'Weight'}
							label={this.getWeightLabel()}
							iconClass={FontAwesomeIcon}
							iconName={'balance-scale'}
							keyboardType="numeric"
							iconColor={'#f95a25'}
							iconSize={20}
							iconWidth={40}
							inputPadding={16}
							inputStyle={styles.input}
							value={this.getWeight()}
							onChangeText={text => {
								let data = this.state.data;
								data.weight = text;
								this.setState({ data: data });
							}}
						/>
						<Fumi
							key={'Height'}
							label={this.getHeightLabel()}
							iconClass={FontAwesomeIcon}
							iconName={'wrench'}
							keyboardType="numeric"
							iconColor={'#f95a25'}
							iconSize={20}
							iconWidth={40}
							inputPadding={16}
							inputStyle={styles.input}
							value={this.getHeight()}
							onChangeText={text => {
								let data = this.state.data;
								data.height = text;
								this.setState({ data: data });
							}}
						/>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		color: 'black'
	},
	picker: {
		height: 50,
		backgroundColor: 'white'
	},
	container: {
		backgroundColor: '#f1f3f5',
		flex: 1
	},
	name: {
		textAlign: 'center',
		fontWeight: 'bold',
		alignSelf: 'center',
		color: 'white',
		fontSize: 22
	},
	header: {
		textAlign: 'center',
		fontWeight: 'bold',
		alignSelf: 'center',
		marginBottom: 5,
		marginTop: 5
	},
	imageContainer: {
		padding: 20,
		backgroundColor: 'transparent'
	},
	margins: {
		padding: 15,
		backgroundColor: '#f1f3f5'
	},
	imageView: {
		width: width * 0.35 + 4,
		height: width * 0.35 + 4,
		borderRadius: (width * 0.35) / 2,
		borderColor: COLOR_GREY,
		borderWidth: 3,
		alignSelf: 'center',
		overflow: 'hidden',
		marginBottom: 15
	},
	image: {
		width: width * 0.35,
		height: width * 0.35,
		resizeMode: 'stretch'
	},
	textArea: {
		fontSize: 14,
		color: '#ffffff'
	},
	saveText: {
		color: 'white',
		fontSize: 18
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default MyProfile;
