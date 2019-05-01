import React from 'react';
import { StyleSheet, Text, Image, View, TextInput, Platform, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundContainer from './../components/backgroundcontainer';
import AsyncStorage from '@react-native-community/async-storage';
import { AreaChart, Grid, ProgressCircle, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Divider } from 'react-native-elements';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	navigateScreen(screen, params) {
		const { navigate } = this.props.navigation;
		navigate(screen, params);
	}

	renderActionButton() {
		return (
			<ActionButton buttonColor="rgba(231,76,60,1)">
				<ActionButton.Item
					buttonColor="#9b59b6"
					title="Set Goals"
					onPress={() => this.navigateScreen('Goals')}>
					<Icon name="md-checkmark" style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item
					buttonColor="#3498db"
					title="Log Weight"
					onPress={() => {
						this.navigateScreen('LogWeight');
					}}>
					<Icon name="md-body" style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item buttonColor="#1abc9c" title="All Tasks" onPress={() => {}}>
					<Icon name="md-done-all" style={styles.actionButtonIcon} />
				</ActionButton.Item>
			</ActionButton>
		);
	}

	render() {
		const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
		const axesSvg = { fontSize: 10, fill: 'grey' };
		const verticalContentInset = { top: 10, bottom: 10 };
		const xAxisHeight = 30;
		return (
			<View style={styles.container}>
				{/* <ProgressCircle
					strokeWidth={7}
					style={{ height: 200 }}
					progress={0.7}
					progressColor={'#d35400'}
					startAngle={-Math.PI * 0.7}
					endAngle={Math.PI * 0.7}
				/>
				<View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
					<YAxis
						data={data}
						style={{ marginBottom: xAxisHeight }}
						contentInset={verticalContentInset}
						svg={axesSvg}
					/>
					<View style={{ flex: 1, marginLeft: 10 }}>
						<LineChart
							style={{ flex: 1 }}
							data={data}
							contentInset={verticalContentInset}
							svg={{ stroke: 'rgb(134, 65, 244)' }}>
							<Grid />
						</LineChart>
						<XAxis
							style={{ marginHorizontal: -10, height: xAxisHeight }}
							data={data}
							formatLabel={(value, index) => index}
							contentInset={{ left: 10, right: 10 }}
							svg={axesSvg}
						/>
					</View>
				</View> */}
				{this.renderActionButton()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		paddingTop: 25,
		flex: 1,
		backgroundColor: '#f1f3f5'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	}
});

export default Home;
