const { db } = require('../util/admin')

exports.getAllReplies = (request, response) => {
	db
		.collection('replies')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let replies = []
			data.forEach((doc) => {
				replies.push({
                    replyId: doc.id,
                    rating: doc.data().rating,
					message: doc.data().message,
					createdAt: doc.data().createdAt,
				})
			})
			return response.json(replies)
		})
		.catch((err) => {
			console.error(err)
			return response.status(500).json({ error: err.code})
		})
}