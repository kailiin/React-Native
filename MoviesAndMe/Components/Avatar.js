import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { connect } from 'react-redux';

class Avatar extends React.Component {
	constructor(props){
		super(props)
	}
	
	_avatarClicked = () => {
		Alert.alert(
			"Alert",
			"Choisir un option",
			[{
				text: "Annuler",
				onPress: () => {}
			},
			{
				text: "Camera",
				onPress: () => openCamera()
			},
			{
				text: "Galerie",
				onPress: () => openLibraty()
			}]
		)

		const openCamera = () => {
			launchCamera({
				mediaType: 'photo',
				includeBase64: false,
				maxHeight: 200,
				maxWidth: 200,
			}, (response) => {
				console.log(response.assets);
				if (response.didCancel) {
					console.log("Utilisateur a annulé");
				}
				else if (response.errorMessage) {
					console.log("Erreur: ", response.errorMessage);
				}
				else if (response.errorCode){
					console.log("Erreur: ", response.errorCode);
				}
				else if (response.assets){
					console.log("Photo: ", response.assets);
					const uri_source = { uri: response.assets[0].uri }
					const action = { type: "SET_AVATAR", value: uri_source}
					this.props.dispatch(action)
				}
			})
		}

		const openLibraty = () => {
			launchImageLibrary({
				mediaType: 'photo',
				includeBase64: false,
				maxHeight: 200,
				maxWidth: 200,
			}, (response) => {
				console.log(response.assets);
				if (response.didCancel) {
					console.log("Utilisateur a annulé");
				}
				else if (response.errorMessage) {
					console.log("Erreur: ", response.errorMessage);
				}
				else if (response.errorCode){
					console.log("Erreur: ", response.errorCode);
				}
				else if (response.assets){
					console.log("Photo: ", response.assets);
					const uri_source = { uri: response.assets[0].uri }
					const action = { type: "SET_AVATAR", value: uri_source}
					this.props.dispatch(action)
				}
			})
		}
	}

	render(){
		return(
			<TouchableOpacity
			style={styles.touchableOpacity}
			onPress={this._avatarClicked}>
				<Image style={styles.avatar} source={this.props.avatar}/>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	touchableOpacity: {
		margin: 5,
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderColor: '#9B9B9B',
		borderWidth: 2
	}
})

const mapStateToProps = (state) =>{
	return {
		avatar: state.setAvatar.avatar
	}
}

export default connect(mapStateToProps) (Avatar)