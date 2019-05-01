/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

/* --- SCREENS --- */
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import MyProfileScreen from './screens/myprofile';
import UpdateWeightScreen from './screens/updateweight';
import PhotographsScreen from './screens/photographs';
import GoalsScreen from './screens/goals';

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: 'transparent'
	},
	invisibleStyle: {
		display: 'none'
	},
	blueHeaderStyle: {
		backgroundColor: '#2c3e50'
	}
});

const TabNavigator = createBottomTabNavigator(
	{
		Images: {
			screen: PhotographsScreen,
			navigationOptions: {
				title: 'Capture Photographs'
			}
		},
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				title: 'Home'
			}
		},
		Profile: {
			screen: MyProfileScreen,
			navigationOptions: {
				title: 'My Profile'
			}
		}
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'Home') {
					iconName = `home`;
				} else if (routeName === 'Profile') {
					iconName = `user`;
				} else if (routeName === 'Images') {
					iconName = `camera`;
				}
				// iconName = 'users';

				return (
					<Icon name={iconName} type="font-awesome" size={horizontal ? 20 : 25} color={tintColor} />
				);
			},
			tabBarOnPress: ({ navigation, defaultHandler }) => {
				if (navigation.state.key == 'Profile') {
					navigation.navigate('MyProfile');
				} else if (navigation.state.key == 'Images') {
					navigation.navigate('Photographs');
				} else {
					defaultHandler();
				}
			}
		}),
		tabBarOptions: {
			activeTintColor: 'white',
			inactiveTintColor: '#bdc3c7',
			style: {
				backgroundColor: '#2c3e50'
			}
		}
	}
);

const Aptitude = createStackNavigator(
	{
		Login: {
			screen: LoginScreen,
			navigationOptions: {
				headerStyle: styles.invisibleStyle
			}
		},
		Home: {
			screen: createAppContainer(TabNavigator),
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'white',
				title: 'Home'
			}
		},
		MyProfile: {
			screen: MyProfileScreen,
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'white',
				title: 'My Profile'
			}
		},
		Main: {
			screen: createAppContainer(TabNavigator),
			navigationOptions: {
				headerStyle: styles.invisibleStyle
			}
		},
		LogWeight: {
			screen: UpdateWeightScreen,
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'white',
				title: 'Log Weight'
			}
		},
		Photographs: {
			screen: PhotographsScreen,
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'white',
				title: 'Photographs'
			}
		},
		Goals: {
			screen: GoalsScreen,
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'white',
				title: 'Set Goals'
			}
		}
	},
	{
		transitionConfig: () => ({
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;

				const translateX = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [layout.initWidth, 0, 0]
				});

				const opacity = position.interpolate({
					inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
					outputRange: [0, 1, 1, 0.3, 0]
				});

				return { opacity, transform: [{ translateX }] };
			}
		})
	}
);

export default createAppContainer(Aptitude);
