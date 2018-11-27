const path = require('path')

module.exports = {

    argMode: function () {

        var args = process.argv.slice(2);

        if (!args[0]) {
            return 'DEV'
        }

        switch (args[0]) {
            case 'production':
                return 'PRODUCTION'
            case 'test':
                return 'TEST'
            case 'stage':
                return 'STAGE'
            case 'home':
                return 'HOME'
            case 'dev':
            default:
                return 'DEV'
        }
    },

    isDevMode () {
        return !!(~['DEV', 'HOME'].indexOf(this.argMode()))
    },

    formPath: function (cmp) {

        if(path.sep == '/') { // linux
            return path.resolve(__dirname, cmp)
        }

        // windows
        return path.resolve(__dirname, cmp)
            .split(path.sep)
            .join('\\\\');
    },

    ieVersion: function (req) {

        if (!req) {
            return null
        }

        if (!req.headers) {
            return null
        }

        if (!req.headers['user-agent']) {
            return null
        }

        var res = req.headers['user-agent'].match(/MSIE (.*?);/)

        if (!res) {
            return null
        }

        if (typeof res[1] != 'undefined') {
            return parseInt(res[1])
        }
    }
}
