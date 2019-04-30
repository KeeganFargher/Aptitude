import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../common/colours';

class HorizontalLine extends React.Component {
	render() {
		HorizontalLine.defaultProps = {
			color: COLOR_WHITE
		};

		return (
			<View
				style={[
					styles.lineStyle,
					{
						borderColor: !this.props.color ? HorizontalLine.defaultProps.color : this.props.color
					}
				]}
			/>
		);
	}
}

const styles = StyleSheet.create({
	lineStyle: {
		marginTop: 20,
		marginBottom: 10,
		borderBottomWidth: 1
	}
});

export default HorizontalLine;
