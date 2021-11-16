const API_TOKEN = "463769c17ffdf5df53af1f7655243ddb"

export function getFilmsFromApiWithSearchedText (text, page) {
	const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page

	return fetch(url)
	.then((reponse) => reponse.json())
	.catch((error) => console.log(error))
}

export function getImageFromApi (name) {
	return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmsDetailWithID (id) {
	return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
	.then((reponse) => reponse.json())
	.catch((error) => console.log(error))
}