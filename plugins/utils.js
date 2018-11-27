import { api } from './api'
import DOMElement from './element'
import Config from '~/plugins/config'

let utils = class Utils {

    static phoneValidation(phone) {
        return Utils.validationLength(phone, 11)
    }

    static validationLength(value, length) {
        return (value + '').replace(/[ ,(,),\-,+,_]/g, '').length >= length
    }

    static clearPhone(phone, substr = true) {
        phone = (phone + '').replace(/[ ,(,),\-,+,_]/g, '')

        if (phone.length > 10 && substr) {
            phone = phone.substr(phone.length - 10)
        }

        return phone
    }

    static isAuthorized() {
        return true
    }

	static isSelfPage (url) {
	    return !(~(url+'').indexOf('http'))
    }

	static extractHostname (url) {
        var hostname;

        if (url.indexOf("://") > -1) {
          hostname = url.split('/')[2];
        }else {
          hostname = url.split('/')[0];
        }

        hostname = hostname.split(':')[0];

        hostname = hostname.split('?')[0];

        return hostname;
    }

	static returnError(classObject, field) {
		let errors = classObject.$vuerify.$errors[field]

        if (errors instanceof Array) {
            return errors[0]
        }

        return errors
    }

    static isClient() {
        return typeof window != 'undefined'
    }

    static isTouchDevice () {
        return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
    }

    static formPercent (percent) {
        return parseFloat(parseFloat(percent).toFixed(2))
    }

    static isAndroid() {

        if (!Utils.isClient()) {
            return false
        }

        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }

    static detectDevice (ua) {
        let $ = {
            device: 'pc'
        };

        if (/mobile/i.test(ua)) {
            $.Mobile = true;
        }

        if (/like Mac OS X/.test(ua)) {
            $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
            $.iPhone = /iPhone/.test(ua);
            $.iPad = /iPad/.test(ua);
        }

        if ($.Mobile && $.iPad) {
            $.Tablet = true;
        }

        if (/Android/.test(ua))
            $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

        if (/webOS\//.test(ua))
            $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

        if (/(Intel|PPC) Mac OS X/.test(ua))
            $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

        if (/Windows NT/.test(ua))
            $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

        if ($.Tablet) {
            $.device = 'tablet'
        } else if ($.Mobile) {
            $.device = 'phone'
        }

        return $
    }

    static isIE () {

        if (typeof window == 'undefined') {
            return false
        }

        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // Edge (IE 12+) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    static convertCurrency (from, to, amount) {

        let result = amount

        if (from == 'rub') {
            if (to == 'usd') {
                result = amount / 58
            } else {
                result = amount / 69
            }
        }

        if (from == 'usd') {
            if (to == 'rub') {
                result = amount * 58
            } else {
                result = amount * 0.84
            }
        }

        if (from == 'eur') {
            if (to == 'rub') {
                result = amount * 69
            } else {
                result = amount * 1.19
            }
        }

        return parseInt(result)
    }

    static animationEnd(element, callback) {
        var animation = "animationend"
        var transition = "transitionend"

        var t
        var el = document.createElement("fakeelement");

        var animations = {
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd",
            "animation": "animationend"
        }

        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in animations) {
            if (el.style[t] !== undefined) {
                animation = animations[t];
                break;
            }
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                transition = transitions[t];
                break;
            }
        }

        let ended = false

        let endAnimation = function() {
            element.removeEventListener(animation, endAnimation)
            element.removeEventListener(transition, endAnimation)

            if (ended) {
                return
            }

            ended = true

            setTimeout(callback, 0)
        }

        element.addEventListener(animation, endAnimation)

        element.addEventListener(transition, endAnimation, false)
    }

    static hasClass(classList, className) {
        return ~ classList.indexOf(className)
    }

    static declOfNum (number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
    }

    static lazyApiRequest(method, options, fakeRequest = false) {

        let timeout = 800

        //test
        if (fakeRequest) {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve('ok'), 200)
            })
        }
        //test

        let startTime = new Date().getTime()

        function getTimeout(startTime, timeout) {
            return timeout -= new Date().getTime() - startTime
        }

        return new Promise((resolve, reject) => api.dispatch(method, options).then(res => {
            timeout = getTimeout(startTime, timeout)

            if (!timeout) {
                return resolve(res)
            }

            setTimeout(() => resolve(res), timeout)

        }).catch(res => {


            console.log('Q1! Error catch xhr lazyApiRequest')

            timeout = getTimeout(startTime, timeout)

            if (!timeout) {
                return reject(res)
            }

            setTimeout(() => reject(res), timeout)
        }))
    }

    static getStorage() {
        var storageImpl;

         try {

            localStorage.setItem("storage", "");
            localStorage.removeItem("storage");
            storageImpl = localStorage;

         } catch (err) {
             //iphone 6s
             storageImpl = new Utils.LocalStorageAlternative();
         }

        return storageImpl;
    }

    static LocalStorageAlternative() {

        var structureLocalStorage = {};

        this.setItem = function (key, value) {
            structureLocalStorage[key] = value;
        }

        this.getItem = function (key) {
            if(typeof structureLocalStorage[key] != 'undefined' ) {
                return structureLocalStorage[key];
            }
            else {
                return null;
            }
        }

        this.removeItem = function (key) {
            structureLocalStorage[key] = undefined;
        }
    }

    static setImpersonal() {

        let impersonal = this.getImpersonal()

        if (typeof ga !== 'undefined') {
            ga('set', 'userId', impersonal);
        }

        return impersonal

        // @todo
        // axios.defaults.headers.common['impersonal'] = 'Basic ' + impersonal;
    }

    static getImpersonal () {
        const storage = Utils.getStorage()

        let impersonal = storage.getItem('impersonal');

        if (!impersonal) {

            impersonal = Utils.guid()

            storage.setItem('impersonal', impersonal)
        }

        return impersonal
    }

    static guid() {

        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

        return s4() + s4() + '-' + s4() + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }

    static objectValue(object, value) {

        var result = null

        if (typeof value === "undefined") {
            return result
        }

        function isObject(value) {
            return value && typeof(value) == "object";
        }

        if (!isObject(object)) {
            return result
        }

        function getValue (object, value) {

            if (!isObject(object)) {
                return null
            }

            return object[value] || null
        }

        const keys = value.split('.')

        result = object

        for (var i in keys) if (keys.hasOwnProperty(i)) {

            let key = keys[i]

            result = getValue(result, key)

            if (result == null) {
                break
            }
        }

        return result
    }

    static month2text(month, nominative = false) {

        let text = ''

        switch (+month) {
            case 1:
                return nominative ? 'январь' : 'января'
            case 2:
                return nominative ? 'февраль' : 'февраля'
            case 3:
                return nominative ? 'март' : 'марта'
            case 4:
                return nominative ? 'апрель' : 'апреля'
            case 5:
                return nominative ? 'май' : 'мая'
            case 6:
                return nominative ? 'июнь' : 'июня'
            case 7:
                return nominative ? 'июль' : 'июля'
            case 8:
                return nominative ? 'август' : 'августа'
            case 9:
                return nominative ? 'сентябрь' : 'сентября'
            case 10:
                return nominative ? 'октябрь' : 'октября'
            case 11:
                return nominative ? 'ноябрь' : 'ноября'
            case 12:
                return nominative ? 'декабрь' : 'декабря'
        }

        return text
    }

    static strPad(input, pad_length, pad_string, pad_type) {
        var half = '',
            pad_to_go;

        var str_pad_repeater = function(s, len) {
            var collect = '',
                i;

            while (collect.length < len)
                collect += s;
            collect = collect.substr(0, len);

            return collect;
        };

        if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
            pad_type = 'STR_PAD_RIGHT';
        }
        if ((pad_to_go = pad_length - input.length) > 0) {
            if (pad_type == 'STR_PAD_LEFT') {
                input = str_pad_repeater(pad_string, pad_to_go) + input;
            } else if (pad_type == 'STR_PAD_RIGHT') {
                input = input + str_pad_repeater(pad_string, pad_to_go);
            } else if (pad_type == 'STR_PAD_BOTH') {
                half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
                input = half + input + half;
                input = input.substr(0, pad_length);
            }
        }

        return input;
    }

    static isArray(value) {
        return Object.prototype.toString.call(value) === "[object Array]"
    }

    static DOM(element) {
        return new DOMElement(element)
    }

    static scrollToEl(id, time = 400) {

        const offset = $(id).offset()

        if (!offset) {
            return
        }

        $('html,body').animate({
            scrollTop: offset.top
        }, time)
    }


    static getScrollTop () {
        const supportPageOffset = window.pageXOffset !== undefined
        const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    }

    static gLayer (event, eventCategory, eventAction, filter = false) {

        if (typeof event !== 'object') {
            event = { event, eventCategory, eventAction }
        }

        // нужно фильтровать события по времени
        if (filter && !filterEvents.pushItem(event)) {
            return
        }

        (window.dataLayer || []).push(event)
    }

    static priceFormat (num, n = 0, x = 3, s = ' ', c) {

        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';

        num = parseFloat(num);

        num = num.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    }

    /*
     * сортировка
     * extractor - название колонки (если это массив объектов)
     * reverse - default=false сортировать в обратном порядке
     * */
    static sort (array, extractor, reverse) {

        if (!(array instanceof Array)) {
            return array;
        }

        extractor = extractor || null;
        reverse = reverse || false;

        if (extractor) {
            return sortWithExtractor(array, extractor, reverse);
        } else {
            return sort(array, reverse);
        }

        function sort(array, reverse) {
            var data = array.slice().sort();

            if (reverse) {
                data = data.reverse();
            }

            return data;
        }

        function sortWithExtractor(array, element, reverse) {

            var data = array.slice().sort(function (i, ii) {
                if (i[element] > ii[element]) {
                    return 1;
                } else if (i[element] < ii[element]) {
                    return -1;
                } else {
                    return 0;
                }
            });

            if (reverse) {
                data = data.reverse();
            }

            return data;
        }
    }

    /*
     * сортировка
     * extractor - название колонки (если это массив объектов)
     * reverse - default=false сортировать в обратном порядке
     * */
    static sortByString (items, extractor) {
        return items.sort((a,b) => {
            return a[extractor].localeCompare(b[extractor])
        })
    }

    static crc32 (str) {

        var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

        let crc

        if (typeof(crc) == "undefined") { crc = 0; }
        var x = 0;
        var y = 0;

        crc = crc ^ (-1);
        for( var i = 0, iTop = str.length; i < iTop; i++ ) {
            y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
            x = "0x" + table.substr( y * 9, 8 );
            crc = ( crc >>> 8 ) ^ x;
        }

        return crc ^ (-1);
    }

}

utils.URL = {
    GET: function( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
}

utils.Cookie = {
    getCookie: function (name) {

        if (typeof document === 'undefined') {
            return null
        }

      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
   },
   setCookie: function (name, value, options) {
       options = options || {};

       var expires = options.expires;

       if (typeof expires == "number" && expires) {
         var d = new Date();
         d.setTime(d.getTime() + expires * 1000);
         expires = options.expires = d;
       }
       if (expires && expires.toUTCString) {
         options.expires = expires.toUTCString();
       }

       value = encodeURIComponent(value);

       var updatedCookie = name + "=" + value;

       for (var propName in options) {
         updatedCookie += "; " + propName;
         var propValue = options[propName];
         if (propValue !== true) {
           updatedCookie += "=" + propValue;
         }
       }

       document.cookie = updatedCookie;
   },
   deleteCookie: function (name) {
      utils.Cookie.setCookie(name, "", {
        expires: -1
      })
   },
   getNodeCookie (request) {
        var list = {}
        var rc = request.headers.cookie

        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=')
            list[parts.shift().trim()] = decodeURI(parts.join('='))
        })

        return list
   },
   setNodeCookie (response, name, value, options) {
        options = options || {}

        var expires = options.expires

        if (typeof expires == "number" && expires) {
            var d = new Date()
            d.setTime(d.getTime() + expires * 1000)
            expires = options.expires = d
        }

        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString()
        }

        value = encodeURIComponent(value)

        var updatedCookie = name + "=" + value

        for (var propName in options) {
            updatedCookie += "; " + propName

            var propValue = options[propName]

            if (propValue !== true) {
                updatedCookie += "=" + propValue
            }
        }

        response.setHeader('Set-Cookie', updatedCookie)
   },

   setActiveCityCookie (result, {req, res}) {

        if (!result) {
            return
        }

        if (!result['id']) {
            return
        }

        var options = {
            path: '/',
            expires: 60*60*24*30*365 // на год
        }

        function clearHost (host) {

            host = host + ''

            host = host.replace('https://www.', '.')
            host = host.replace('http://www.', '.')
            host = host.replace('https://', '.')
            host = host.replace('http://', '.')

            if (host[0] !== '.') {
                host = '.' + host
            }

            return host
        }

        if (Config.env !== 'DEV') {
            options['domain'] = clearHost(Config.frontHost)
        }

        Utils.Cookie.setNodeCookie(res, 'selectedCity', result['id'], options)
   }
}

class FilterGEvents {

    constructor(element) {
        this.items = []
    }

    clearOld () {
        const ttl = 30 * 1000 //seconds

        const currentTimestamp = new Date().getTime()

        this.items = this.items.filter(item => currentTimestamp <= item.timestamp + ttl)
    }

    pushItem (item) {

        this.clearOld()

        const { event, eventCategory, eventAction, eventLabel } = item

        let issetThis = false

        for (var i in this.items) {

            let it = this.items[i]

            if (
                it.event == event &&
                it.eventCategory == eventCategory &&
                it.eventAction == eventAction &&
                it.eventLabel == eventLabel
            )
            {
                issetThis = true
                break
            }
        }

        if (issetThis) {
            return null
        }

        this.items.push(Object.assign({}, item, {timestamp: new Date().getTime() }))

        return true
    }
}

let filterEvents = new FilterGEvents()

export default utils
