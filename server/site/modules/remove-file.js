const fs = require('fs');
const utils = require('./utils')

module.exports = function (req, res) {

    this.init = function () {

        if (!req.body || !req.body.path) {

            res.writeHead(400, {'content-type': 'application/json'})

            res.end()

            return
        }

        let file = req.body.path.split('/').reverse()[0]

        const filePath = utils.formPath('../../uploads/'+  file)

        fs.unlink(filePath, this.onFinished.bind(this))
    }

    this.onFinished = function (arg) {

        res.writeHead(200, {'content-type': 'application/json'});

        res.end(JSON.stringify({
            status: true,
        }));
    }

    this.init();
}
