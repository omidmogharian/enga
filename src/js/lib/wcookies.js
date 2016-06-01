/**
* @class WCookies
* a wrapper to use browser cookies better
*
*/
class  WCookies {
  /**
  * @method getItem
  * @param sKey {String}
  * @return 
  * @static
  */
  static getItem (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
  /**
  * @method setItem
  * @param sKey {String}
  * @param sValue {String}
  * @param vEnd {String}
  * @param sDomain {String}
  * @param bSecure {String}
  * @param sPath {String}
  * @return {Boolean}
  * @static
  */
  static setItem (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    /**
     * @property sExpires
     * @type String
     */
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
        var date = new Date();
        date.setTime(date.getTime()+(vEnd*60*60*1000));
        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires="+date.toUTCString();;
        break;
        case String:
        sExpires = "; expires=" + vEnd;
        break;
        case Date:
        sExpires = "; expires=" + vEnd.toUTCString();
        break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  }
  /**
  * @method removeItem
  * @param sKey {String}
  * @param sPath {String}
  * @param sDomain {String}
  * @return {Boolean}
  * @static
  */
  static removeItem (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  }
  /**
  * @method hasItem
  * @param sKey {String}
  * @return {Object}
  * @static
  */
  static hasItem (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
  /**
  * @method keys
  * @return {String}
  * @static
  */
  static keys () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
  }
}

export default WCookies


