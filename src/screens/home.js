import React from 'react';
import { StyleSheet, Text, Image, View, TextInput, Platform, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import BackgroundContainer from './../components/backgroundcontainer';
import AsyncStorage from '@react-native-community/async-storage';
import { AreaChart, Grid, ProgressCircle, LineChart, XAxis, YAxis, Path } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Divider } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Label from './../components/label';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stepCount: 60
		};
	}

	navigateScreen(screen, params) {
		const { navigate } = this.props.navigation;
		navigate(screen, params);
	}

	renderActionButton() {
		return (
			<ActionButton buttonColor="#d35400">
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
		const HorizontalLine = ({ y }) => (
			<Line
				key={'zero-axis'}
				x1={'0%'}
				x2={'100%'}
				y1={y(50)}
				y2={y(50)}
				stroke={'grey'}
				strokeDasharray={[4, 8]}
				strokeWidth={2}
			/>
		);

		const Tooltip = ({ x, y }) => (
			<G x={x(5) - 75 / 2} key={'tooltip'} onPress={() => console.log('tooltip clicked')}>
				<G y={50}>
					<Rect height={40} width={75} stroke={'grey'} fill={'white'} ry={10} rx={10} />
					<Text
						x={75 / 2}
						dy={20}
						alignmentBaseline={'middle'}
						textAnchor={'middle'}
						stroke={'rgb(134, 65, 244)'}>
						{`${data[5]}ºC`}
					</Text>
				</G>
				<G x={75 / 2}>
					<Line y1={50 + 40} y2={y(data[5])} stroke={'grey'} strokeWidth={2} />
					<Circle
						cy={y(data[5])}
						r={6}
						stroke={'rgb(134, 65, 244)'}
						strokeWidth={2}
						fill={'white'}
					/>
				</G>
			</G>
		);

		return (
			<View style={styles.container}>
				<Label
					style={[styles.circleLabel, { marginBottom: 50 }]}
					color={'#cbd3db'}
					fontSize={24}
					fontFamily={'Raleway-Regular'}>
					ACTIVITY
				</Label>
				<AnimatedCircularProgress
					size={250}
					width={7}
					fill={this.state.stepCount}
					duration={3000}
					lineCap={'butt'}
					tintColor="#d35400"
					onAnimationComplete={() => console.log('onAnimationComplete')}
					backgroundColor="rgba(255, 255, 255, 0.5)">
					{fill => (
						<View style={{ alignItems: 'center' }}>
							<Label
								style={styles.circleLabel}
								color={'white'}
								fontSize={70}
								fontFamily={'Raleway-Thin'}>
								{Math.round(fill) + '%'}
							</Label>
							<Label
								style={styles.circleLabel}
								color={'#cbd3db'}
								fontSize={20}
								fontFamily={'Raleway-Regular'}>
								2 134 steps
							</Label>
						</View>
					)}
				</AnimatedCircularProgress>

				<View />
				{this.renderActionButton()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	circleLabel: {
		fontFamily: 'Raleway'
	},
	container: {
		padding: 15,
		paddingTop: 25,
		flex: 1,
		backgroundColor: '#34495e',
		alignItems: 'center'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	}
});

export default Home;
