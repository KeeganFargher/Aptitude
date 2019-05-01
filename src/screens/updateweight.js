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
	KeyboardAvoidingView
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

const screen = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
};
const width = screen.width - 30;

class UpdateWeight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: {}
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			logWeight: this.logWeight
		});
	}

	componentWillMount() {
		this.getUser();
	}

	/* Save button in the header */
	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: (
				<TouchableOpacity style={{ marginRight: 20 }}>
					<Text style={styles.saveText} onPress={navigation.getParam('logWeight')}>
						Save
					</Text>
				</TouchableOpacity>
			)
		};
	};

	logWeight = () => {
		this.setState({ loading: true });
		let url = `${apiConstants.baseUrl}/userweight/updateweight`;
		const data = {
			userId: this.state.data.id,
			weight: this.state.data.weight
		};
		axios
			.post(url, data)
			.then(() => this.onLogWeightSuccess())
			.catch(err => alert(err))
			.finally(() => this.setState({ loading: false }));
	};

	onLogWeightSuccess() {
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

	getWeight() {
		const weight = this.state.data.weight;
		if (weight == null) {
			return '';
		}
		return weight.toString();
	}

	getWeightLabel() {
		let user = this.state.data;
		let measurement = user.measurementTypeId;
		let mass = measurement === '1e003c947cab42a6a3b9adee57861e80' ? 'kilograms' : 'pounds';
		return `Weight (${mass})`;
	}

	render() {
		return (
			<View style={styles.container}>
				<Spinner
					visible={this.state.loading}
					textContent={'Saving...'}
					textStyle={styles.spinnerTextStyle}
				/>

				<Fumi
					key={'Log Weight'}
					label={this.getWeightLabel()}
					iconClass={FontAwesomeIcon}
					keyboardType="numeric"
					iconName={'child'}
					iconColor={'#f95a25'}
					iconSize={20}
					iconWidth={40}
					inputPadding={16}
					style={styles.input}
					value={this.getWeight()}
					onChangeText={text => {
						let data = this.state.data;
						data.weight = text;
						this.setState({ data: data });
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f1f3f5'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	saveText: {
		color: 'white',
		fontSize: 18
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default UpdateWeight;
