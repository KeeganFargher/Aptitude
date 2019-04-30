//import library to help create component
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLOR_BLACK, COLOR_WHITE } from '../common/colours';
// import { FONT_PRIMARY } from '../common/fonts';

class TextInputIcon extends React.Component {
	render() {
		TextInputIcon.defaultProps = {
			color: COLOR_BLACK,
			onChangeText: null,
			keyboardType: 'default',
			text: ''
		};
		return (
			<View style={[styles.inputContainerStyle, { borderColor: this.props.color }]}>
				<Icon
					name={this.props.name}
					iconStyle={[styles.iconStyle, { color: this.props.color }]}
					type={this.props.type}
					size={20}
				/>
				<TextInput
					value={this.props.text}
					style={[styles.inputStyle, { color: this.props.color }]}
					autoCorrect={false}
					autoCapitalize="none"
					placeholderTextColor={this.props.placeholderTextColor}
					keyboardType={this.props.keyboardType}
					underlineColorAndroid="rgba(0,0,0,0)"
					secureTextEntry={this.props.secureTextEntry}
					placeholder={this.props.placeholder}
					onChangeText={this.props.onChangeText}
				/>
			</View>
		);
	}
}

//Styles
const styles = StyleSheet.create({
	inputContainerStyle: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		paddingBottom: 0,
		paddingLeft: 15,
		paddingRight: 15
	},
	inputStyle: {
		flex: 1,
		color: COLOR_WHITE
	},
	iconStyle: {
		paddingRight: 10,
		paddingBottom: 0,
		marginBottom: 0
	}
});

//make component available to other parts of the app
export default TextInputIcon;
