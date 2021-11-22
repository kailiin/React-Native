import React from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';

const SearchStack = createNativeStackNavigator()
const FavoriteStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

function SearchStackNavigator() {
	return (
		<SearchStack.Navigator>
			<SearchStack.Screen
				name = "Search"
				component = {Search}
				options = {{ title: "Recherche"}}
			/>
			<SearchStack.Screen
				name = "FilmDetail"
				component = {FilmDetail}
				options = {({navigation, route}) => ({title: route.params.name}) }
			/>
		</SearchStack.Navigator>
	);
}

function FavoriteStackNavigator() {
	return (
		<FavoriteStack.Navigator>
			<FavoriteStack.Screen
				name = "Favorite"
				component = {Favorites}
				options = {{title: "Favoris"}}
			/>
			<SearchStack.Screen
				name = "FilmDetail"
				component = {FilmDetail}
				options = {({navigation, route}) => ({title: route.params.name}) }
			/>
		</FavoriteStack.Navigator>
	)
}

export default function Navigation() {
	return (
	  <NavigationContainer>
		<Tab.Navigator>
			<Tab.Screen
				name = "TabSearch"
				component = {SearchStackNavigator}
				options= {{
					title: "Recherche", 
					headerShown:false,
					tabBarIcon: () => {
						return <Image
							source={require('../Images/ic_search.png')}
							style={styles.icon}
						/>
					},
					tabBarActiveBackgroundColor: '#DDDDDD'
				}}
			/>
			<Tab.Screen
				name = "TabFavorites"
				component = {FavoriteStackNavigator}
				options= {{
					title: "Favoris",
					headerShown: false,
					tabBarIcon: () => {
						return <Image
							source={require('../Images/ic_favorite.png')}
							style={styles.icon}
						/>
					},
					tabBarActiveBackgroundColor: '#DDDDDD'
				}}
			/>
		</Tab.Navigator>
	  </NavigationContainer>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30
	}
})
