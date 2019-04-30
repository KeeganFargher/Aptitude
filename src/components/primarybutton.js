import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLOR_ROLONEXT_GREEN, COLOR_WHITE } from '../common/colours';
import { titleFontStyles } from '../common/fontsizes';

class PrimaryButton extends React.Component {
	render() {
		PrimaryButton.defaultProps = {
			onPress: null,
			disabled: false,
			backgroundColor: COLOR_ROLONEXT_GREEN,
			color: COLOR_WHITE
		};
		return (
			<TouchableOpacity
				style={[
					styles.buttonContainerStyle,
					{
						backgroundColor: !this.props.backgroundColor
							? PrimaryButton.defaultProps.backgroundColor
							: this.props.backgroundColor
					}
				]}
				onPress={this.props.onPress}
				disabled={this.props.disabled}>
				<Text
					style={[
						titleFontStyles,
						{
							color: !this.props.color ? PrimaryButton.defaultProps.color : this.props.color
						}
					]}>
					{this.props.title}
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainerStyle: {
		marginLeft: 0,
		marginRight: 0,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		height: 50
	}
});

export default PrimaryButton;
