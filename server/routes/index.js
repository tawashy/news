const express   = require('express')
const router    = express.Router()
const News      = require("../ models/news")

router.get('/news', (req, res) => {

    const page = req.query.page && req.query.page > 0 ? req.query.page: undefined
    const id = req.query.id? { _id: req.query.id }: {}
    News.find(id).skip((page - 1) * 10).limit(10).exec( function(err, result) {
        if (err) return  res.status(404).send({error: "Not Found"});
        return res.json(result)
    })
})

module.exports = router;