import React from "react";
import { View, Button, TextInput, FlatList, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import FilmList from "./FilmList"
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends React.Component {

	constructor(propos) {
		super(propos)
		this.state = { 
			films: [],
			isLoading: false
		}
		this.page = 0
		this.totalPage = 0
		this.searchedText = ""
	}

	_loadFilms = () => {
		if (this.searchedText.length > 0) {
			this.setState({isLoading: true})
			getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data =>{
				this.page = data.page
				this.totalPage = data.total_pages
				this.setState({ 
					films: [...this.state.films, ...data.results],
					isLoading: false
				})
			});
		}
		
	}

	_searchFilms() {
		this.page = 0
		this.totalPage = 0
		this.setState({
			films: [],
		}, () => {this._loadFilms()})
	}

	_searchedTextChange(text) {
		this.searchedText = text
	}

	_displayLoading() {
		if (this.state.isLoading) {
			return(
				<View style={styles.loading_container}>
					<ActivityIndicator size="large" color="#0000ff"/>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.main_container}>
				<TextInput
					style={styles.textinput}
					placeholder='Titre du film'
					onChangeText={(text) => this._searchedTextChange(text)} 
					onSubmitEditing={() => this._searchFilms()}
				/>
				<Button title='Rechercher' onPress={() => this._searchFilms()}/>
				<FilmList
					films = {this.state.films}
					navigation= {this.props.navigation}
					loadFilms = {this._loadFilms}
					page = {this.page}
					totalPage = {this.totalPage}
					favoriteList = {false}
				/>
				{this._displayLoading()}
			</View>
		)
	}
	}
	
const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		marginTop: 20
	},
	textinput: {
		marginLeft: 5,
		marginRight: 5,
		height: 50,
		borderColor: '#000000',
		borderWidth: 1,
		paddingLeft: 5
	},
	loading_container: {
		left: 0,
		right: 0,
		top: 80,
		bottom: 0,
		backgroundColor: 'white',
		opacity: 0.7,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Search