import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
	_displayFavoriteImage() {
		if (this.props.isFilmFavorite) {
			return(
				<Image
					style={styles.favorite_image}
					source={require('../Images/ic_favorite.png')}
				/>
			)
		}
	}

	render() {
		const {film, displayDetailForFilm} = this.props
		return(
			<TouchableOpacity 
				style={styles.main_container}
				onPress={() => displayDetailForFilm(film.id, film.title)}
				>
				<Image style={styles.image}
					style={styles.image}
					source={{uri: getImageFromApi(film.poster_path),}}
				/>
				<View style={styles.content_container}>
					<View style={styles.header_container}>
						{this._displayFavoriteImage()}
						<Text style={styles.title_text}>{film.title}</Text>
						<Text style={styles.vote_text}>{film.vote_average}</Text>
					</View>
					<View style={styles.description_container}>
						<Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
					</View>
					<View style={styles.date_container}>
						<Text style={styles.date_text}>Sorti le {film.release_date}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		height: 190,
		flexDirection: 'row'
	},
	image: {
		width: 120,
		height: 180,
		margin: 5,
		backgroundColor: 'gray'
	},
	content_container: {
		flexDirection: 'column',
		flex: 1,
		margin: 5
	},
	header_container: {
		flex: 3,
		flexDirection: 'row'
	},
	title_text: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		fontWeight: 'bold',
		paddingRight: 5
	},
	vote_text: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'right',
		color: '#a9a9a9'
	},
	description_container: {
		flex: 7
	},
	description_text: {
		fontStyle: 'italic',
		color: '#a9a9a9'
	},
	date_container:{
		flex: 1
	},
	date_text: {
		fontWeight: 'bold',
		fontSize: 14,
		textAlign: 'right'
	},
	favorite_image: {
		width: 20,
		height: 20,
		marginRight: 5
	}
})

export default FilmItem