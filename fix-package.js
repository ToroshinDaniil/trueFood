var fs = require('fs');

var filePath = 'node_modules/nuxt/lib/core/middleware/nuxt.js'
const from = "await this.nuxt.callHook('render:route', req.url, result)"
const to = "await this.nuxt.callHook('render:route', req.url, result, req)"

//прокачаем hook на сервере nuxt
try {
    var contents = fs.readFileSync(filePath, 'utf8');

    contents = contents.replace(from, to)

    fs.writeFileSync(filePath, contents)
} catch (e) {
    var contents = 'error read file';
}

console.log('ok 1.6.2');