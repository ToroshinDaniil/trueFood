//https://github.com/felixge/node-formidable
const formidable = require('formidable')
const fs = require('fs');
const sizeOf = require('image-size');
const utils = require('./utils')

module.exports = function (req, res) {

    this.validTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/svg+xml',
        'application/pdf',
        'application/msword',
        'application/octet-stream',
        'application/excel',
        'application/vnd.ms-excel',
        'application/x-excel',
        'application/x-msexcel',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'video/mp4'
    ];

    //result
    this.errors = []
    this.files = []

    //queue
    this.queueFiles = []
    this.currentQueueFileIndex = 0

    this.init = function () {

        var form = new formidable.IncomingForm();
            form.uploadDir = utils.formPath('/var/www/uploads');
            form.maxFieldsSize = 2 * 1024 * 1024; //2mb
            form.keepExtensions = true;

        form.parse(req, function(err, fields, files) {

            for (var i in files) if (files.hasOwnProperty(i)) {

                this.queueFiles.push(files[i])
            }

            this.processFile()

        }.bind(this))
    },

    this.processFile = function () {

        if (typeof this.queueFiles[this.currentQueueFileIndex] == 'undefined') {

            this.onFinished();

            return
        }

        var file = this.queueFiles[this.currentQueueFileIndex]

        if (!~this.validTypes.indexOf(file.type)) {

            this.errors.push('Invalid type '+ file.name)

            //remove
            this.currentQueueFileIndex++;

            fs.unlink(file.path, this.processFile.bind(this))

            return
        }

        sizeOf(file.path, function (err, size) {

          if (!err) {

              var sizeObj = {
                  width: size.width,
                  height: size.height,
                  type: size.type
              }
          }

          var filename = file.path.split('/')

          filename = filename[filename.length-1]

          this.files.push(Object.assign({}, {
              path: '/_static/uploads/'+ filename,
              filename: filename
          }, sizeObj));

          this.currentQueueFileIndex++;

          this.processFile()

      }.bind(this));

    },

    this.onFinished = function () {

        this.queueFiles = []

        let statusCode = 200

        if (this.errors.length) {

            statusCode = 415;
        }

        res.writeHead(statusCode, {'content-type': 'application/json'});

        res.end(JSON.stringify({
            status: !this.errors.length,
            errors: this.errors,
            files: this.files
        }));

        this.files = []
        this.errors = []
    }

    this.init();
}
