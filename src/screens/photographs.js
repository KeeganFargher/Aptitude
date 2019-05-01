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
import ImagePicker from 'react-native-image-picker';

const screen = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
};
const imageWidth = screen.width / 3 - 8;

class Photographs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			image: {
				data: '../assets/default_profile.jpg',
				fileName: '',
				height: 0,
				width: 0,
				timestamp: ''
			},
			data: {},
			images: []
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			openImagePicker: this.openImagePicker
		});
	}

	componentWillMount() {
		this.getUser().then(() => {
			this.getImages();
		});
	}

	/* Save button in the header */
	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: (
				<TouchableOpacity style={{ marginRight: 20 }}>
					<Text style={styles.saveText} onPress={navigation.getParam('openImagePicker')}>
						Capture
					</Text>
				</TouchableOpacity>
			)
		};
	};

	openImagePicker = () => {
		const options = {
			title: 'Capture meal or workout',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			},
			quality: 0.4,
			maxHeight: 500,
			maxWidth: 500
		};

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				alert(response.uri);
			} else {
				this.setState({
					image: response
				});
				this.uploadImage();
			}
		});
	};

	uploadImage() {
		let url = `${apiConstants.baseUrl}/Photo/upload`;
		let image = this.state.image;
		image.userId = this.state.data.id;

		this.setState({ loading: true });

		axios
			.post(url, image)
			.then(() => this.onSave())
			.catch(err => alert(err))
			.finally(() => this.setState({ loading: false }));
	}

	onSave() {
		let images = this.state.images;
		images.unshift(this.state.image);
		this.setState({ images: images });
	}

	async getUser() {
		let data = await AsyncStorage.getItem('data');
		data = JSON.parse(data);
		this.setState({
			data: data
		});
	}

	async getImages() {
		const id = this.state.data.id;
		let url = `${apiConstants.baseUrl}/Photo/getall/${id}`;
		console.log(url);

		this.setState({ loading: true });
		axios
			.get(url)
			.then(this.onGetImageSuccess.bind(this))
			.catch(err => alert(err))
			.finally(() => this.setState({ loading: false }));
	}

	onGetImageSuccess(response) {
		this.setState({ images: response.data });
	}

	renderImages() {
		const images = this.state.images;
		return images.map((image, index) => {
			const width = imageWidth;
			const height = imageWidth;
			const uri = {
				uri: `data:${image.type};base64,${image.data}`
			};
			return (
				<Image
					key={index}
					style={{
						width,
						height,
						flexWrap: 'wrap',
						margin: 2,
						justifyContent: 'center'
					}}
					source={uri}
					PlaceholderContent={<ActivityIndicator />}
				/>
			);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Spinner
					visible={this.state.loading}
					textContent={'Busy...'}
					textStyle={styles.spinnerTextStyle}
				/>
				<ScrollView contentContainerStyle={styles.containerImages}>{this.renderImages()}</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {},
	container: {
		flex: 1,
		padding: 0,
		paddingTop: 5,
		paddingBottom: 20,
		backgroundColor: '#f1f3f5'
	},
	containerImages: {
		flexGrow: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	saveText: {
		color: 'white',
		fontSize: 18
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default Photographs;
