import React from 'react';
import { Text, ActivityIndicator, ScrollView, View, Image, TouchableOpacity, Platform, Share} from 'react-native'
import { getImageFromApi, getFilmsDetailWithID } from '../API/TMDBApi'
import { StyleSheet} from 'react-native'
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			film: undefined,
			isLoading: false
		}
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.props.navigation.setOptions({
				headerRight: () => (
					<TouchableOpacity
					onPress={() => this._shareFilm()}>
					<Image
						style={styles.share_image}
						source={require('../Images/ic_share.ios.png')}/>
				</TouchableOpacity>
				)
			})
		}

		const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.filmID)
		if (favoriteFilmIndex !== -1) {
			this.setState({
				film: this.props.favoritesFilm[favoriteFilmIndex]
			})
			return
		}
		this.setState({ isLoading: true })
		getFilmsDetailWithID(this.props.route.params.filmID).then(data => {
			this.setState({
				film: data,
				isLoading: false
			})
		})
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

	_shareFilm() {
		const { film } = this.state
		Share.share({ title: film.title, message: film.overview})
	}

	_displayShareButtonAndroid() {
		const { film } = this.state
		if (film != undefined && Platform.OS === 'android') {
			return (
				<TouchableOpacity
					style={styles.share_toucheble_floating}
					onPress={() => this._shareFilm()}>
				<Image
					style={styles.share_image}
					source={require('../Images/ic_share.android.png')}/>
				</TouchableOpacity>
			)
		}
	}

	_toggleFavorite() {
		const action = { type: "TOGGLE_FAVORITE", value: this.state.film}
		this.props.dispatch(action)
	}

	_displayFavoriteImage() {
		var shouldEnlarge = false
		var sourceImage = require('../Images/ic_favorite_border.png')
		if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
			sourceImage = require('../Images/ic_favorite.png')
			shouldEnlarge = true
		}
		return(
			<EnlargeShrink shouldEnlarge={shouldEnlarge}>
				<Image
					style={styles.favorite_image}
					source={sourceImage}
				/>
			</EnlargeShrink>
		)
	}

	_displayFilmDetail() {
		const film = this.state.film
		if (this.state.film != undefined) {
			// console.log(film);
			return(
				<ScrollView style={styles.scrollview_container}>
					<Image style={styles.image}
					style={styles.image}
					source={{uri: getImageFromApi(film.backdrop_path),}}
					/>
					<Text style={styles.title_text}>{film.title}</Text>
					<TouchableOpacity
						style={styles.favorite_container}
						onPress={() => this._toggleFavorite()}>
						{this._displayFavoriteImage()}
					</TouchableOpacity>
					<Text style={styles.description_text}>{film.overview}</Text>
					<Text style={styles.other_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
					<Text style={styles.other_text}>Note : {film.vote_average} / 10</Text>
					<Text style={styles.other_text}>Nombre de votes : {film.vote_count}</Text>
					<Text style={styles.other_text}>Budget : {numeral(film.budget).format('0,0')}$</Text>
					<Text style={styles.other_text}>Genge(s) : {film.genres.map(
						function(genre) {return genre.name}).join(' / ')}
					</Text>
					<Text style={styles.other_text}>Companie(s) : {film.production_companies.map(
						function(companie) {return companie.name}).join(' / ')}
					</Text>
					{this._displayShareButtonAndroid()}
				</ScrollView>
			)
		}
	}

	render() {
		return (
			<View style={styles.main_container}>
				{this._displayFilmDetail()}
				{this._displayLoading()}
			</View>
	)}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	},
	loading_container: {
		flex: 1,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
	scrollview_container: {
		flex: 1
	},
	image: {
		height: 150,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray'
	},
	title_text: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
		flexWrap: 'wrap',
		margin: 5
	},
	description_text: {
		fontSize: 14,
		fontStyle: 'italic',
		margin: 5,
		marginBottom: 20,
		color: 'gray'
	},
	other_text: {
		marginTop: 5,
		marginLeft: 5,
		marginRight: 5
	},
	favorite_container: {
		alignItems: 'center'
	},
	favorite_image: {
		flex: 1,
		width: null,
		height: null
	},
	share_toucheble_floating:{
		position: 'absolute',
		width: 60,
		height: 60,
		right: 30,
		bottom: 30,
		borderRadius: 30,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center'
	},
	share_image: {
		width:30,
		height:30
	}
})

const mapStateToProps = (state) =>{
	return {
		favoritesFilm: state.toggleFavorite.favoritesFilm
	}
}
export default connect(mapStateToProps) (FilmDetail)