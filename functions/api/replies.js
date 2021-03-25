const { db } = require('../util/admin')

const cors = require('cors')({origin: true})

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
					type: doc.data().type,
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

exports.createOneReply = (request, response) => {
	cors(request, response, () => {
		if (request.body.message.trim() === '') {
			return response.status(400).json({ message: 'Must not be empty' });
		}
			
		const newReply = {
			message: request.body.message,
			rating: request.body.rating,
			type: request.body.type,
			createdAt: new Date().toISOString()
		}
		db
			.collection('replies')
			.add(newReply)
			.then((doc)=>{
				const responseReply = newReply;
				responseReply.id = doc.id;
				return response.json(responseReply);
			})
			.catch((err) => {
				response.status(500).json({ error: 'Something went wrong' });
				console.error(err);
			});
	})
};

exports.deleteOneReply = (request, response) => {
	cors(request, response, () => {
		// if (request.body.replyId.trim() === '') {
		// 	return response.status(400).json({ replyId: 'Must not be empty' });
		// }
		db
			.collection('replies')
			.doc(request.body.replyId)
			.delete()
			.then((doc) => {
				return response.json(request.body.replyId)
			})
			.catch((err) => {
				response.status(500).json({ error: 'something went wrong' })
				console.log(err)
			})

	})

}