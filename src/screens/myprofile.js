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
	ScrollView
} from 'react-native';
import BackgroundContainer from './../components/backgroundcontainer';
import { COLOR_WHITE, COLOR_GREY, COLOR_ROLONEXT_GREEN, COLOR_BLACK } from '../common/colours';
import TextInputIcon from './../components/textinputicon';
import { Image, Input, Icon } from 'react-native-elements';
import Label from './../components/label';
import { Fumi, Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const screen = {
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
};
const width = screen.width - 30;

class MyProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
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
					<Label style={styles.name} color={'#e6e1dc'} fontSize={20} bold={true}>
						Keegan Fargher
					</Label>
				</ImageBackground>

				<ScrollView contentContainerStyle={styles.margins}>
					<Fumi
						label={'First Name'}
						iconClass={FontAwesomeIcon}
						iconName={'user'}
						iconColor={'#f95a25'}
						iconSize={20}
						iconWidth={40}
						inputPadding={16}
						style={styles.input}
					/>
					<Fumi
						label={'Surname'}
						iconClass={FontAwesomeIcon}
						iconName={'user'}
						iconColor={'#f95a25'}
						iconSize={20}
						iconWidth={40}
						inputPadding={16}
						style={styles.input}
					/>
					<Fumi
						label={'Email'}
						iconClass={FontAwesomeIcon}
						iconName={'envelope'}
						iconColor={'#f95a25'}
						iconSize={20}
						iconWidth={40}
						inputPadding={16}
						style={styles.input}
					/>
					<Fumi
						label={'Measurement Type'}
						iconClass={FontAwesomeIcon}
						iconName={'weight'}
						iconColor={'#f95a25'}
						iconSize={20}
						iconWidth={40}
						inputPadding={16}
						style={styles.input}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	input: {},
	container: {
		backgroundColor: '#f1f3f5'
	},
	name: {
		textAlign: 'center',
		fontWeight: 'bold',
		alignSelf: 'center',
		color: 'white',
		fontSize: 22
	},
	imageContainer: {
		padding: 30,
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
		color: COLOR_ROLONEXT_GREEN,
		fontSize: 18
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default MyProfile;
