const { db } = require('../util/admin')

exports.getAllTypes = (request, response) => {
	db
		.collection('types')
		.orderBy('name', 'desc')
		.get()
		.then((data) => {
			let types = []
			data.forEach((doc) => {
				types.push({
                    typeId: doc.id,
                    name: doc.data().name
				})
			})
			return response.json(types)
		})
		.catch((err) => {
			console.error(err)
			return response.status(500).json({ error: err.code})
		})
}