//import library to help create component
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

class BackgroundContainer extends React.Component {
	render() {
		BackgroundContainer.defaultProps = {
			source: require('../assets/background2.png')
		};
		const resizeMode = 'stretch';
		return (
			<View style={styles.container}>
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Image
						style={{
							flex: 1,
							resizeMode
						}}
						source={
							!this.props.source ? BackgroundContainer.defaultProps.source : this.props.source
						}
					/>
				</View>
				<View
					style={{
						flex: 1,
						backgroundColor: 'transparent'
					}}>
					{this.props.children}
				</View>
			</View>
		);
	}
}

//Styles
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

//make component available to other parts of the app
export default BackgroundContainer;
