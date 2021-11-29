const initialState = { avatar: require('../../Images/ic_avatar.png')}

function setAvatar(state = initialState, action) {
	let nextState

	switch (action.type) {
		case 'SET_AVATAR':
			nextState =  {
				...state,
				avatar: action.value
			}
			return nextState || state
		default:
			return state
	}
}

export default setAvatar