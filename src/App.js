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

/* --- SCREENS --- */
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import MyProfileScreen from './screens/myprofile';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: 'transparent'
	},
	invisibleStyle: {
		display: 'none'
	},
	blueHeaderStyle: {
		backgroundColor: 'blue'
	}
});

const TabNavigator = createBottomTabNavigator(
	{
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
				}
				// iconName = 'users';

				return (
					<Icon name={iconName} type="font-awesome" size={horizontal ? 20 : 25} color={tintColor} />
				);
			}
			// tabBarOnPress: ({ navigation, defaultHandler }) => {
			// 	if (navigation.state.key == 'Settings') {
			// 		navigation.navigate('SettingsModal');
			// 	} else {
			// 		defaultHandler();
			// 	}
			// }
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
				headerStyle: styles.invisibleStyle
			}
		},
		MyProfile: {
			screen: MyProfileScreen,
			navigationOptions: {
				headerStyle: styles.blueHeaderStyle,
				headerTintColor: 'yellow',
				title: 'My Profile'
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
