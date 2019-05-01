import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONT_PRIMARY } from '../common/fonts';
import { COLOR_NEWSTRACK_GREY } from '../common/colours';

class Label extends React.Component {
	render() {
		Label.defaultProps = {
			onPress: null,
			paddingTop: 0,
			paddingBottom: 0,
			fontSize: 14,
			color: COLOR_NEWSTRACK_GREY,
			italics: false,
			bold: false,
			center: false,
			fontFamily: FONT_PRIMARY
		};

		return (
			<Text
				style={[
					this.props.style,
					{
						color: this.props.color,
						paddingTop: this.props.paddingTop,
						paddingBottom: this.props.paddingBottom,
						fontSize: this.props.fontSize,
						fontFamily: this.props.fontFamily,
						fontStyle: this.props.italics ? 'italic' : 'normal',
						fontWeight: this.props.bold ? 'bold' : 'normal',
						textAlign: this.props.center ? 'center' : 'left'
					}
				]}
				onPress={this.props.onPress}>
				{this.props.children}
			</Text>
		);
	}
}

export default Label;
