import  {modules} from './app.conf'

var app = {modules: modules};
app.name = 'jorge';

app.main = function (ngapp) {
  ngapp.value('version', '0.1')
    .run(function ($rootScope) {
      $rootScope.findMax = function (dataArray, elements) {

        let maxAbs = 0;
        if (Array.isArray(dataArray[0][elements])) {
          for (let i = 0; i < dataArray.length; i++) {
            let max = 0;


            for (let j = 0; j < dataArray[i][elements].length; j++) {

              max += dataArray[i][elements][j];

            }
            if (max > maxAbs) {
              maxAbs = max
            }
          }
        }
        else if (typeof dataArray[0][elements] === 'number') {
          for (let i = 0; i < dataArray.length; i++) {
            if (maxAbs < dataArray[i][elements]) {
              maxAbs = dataArray[i][elements];
            }
          }
        }
        // console.log(maxAbs, 'maxsabs' + elements);
        return maxAbs
      };

    })
    .config([
      '$compileProvider',
      '$routeProvider',
      function ($compileProvider, $routeProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto):|^javascript:;$/);
        // fixes the old url version of stuart
        $routeProvider.
        when('/report/:rcode', {
          redirectTo: function (routeParams) {
            return '/channel-analyse/report/' + routeParams.rcode
          }
        }).
        when('/report/:rcode/:lang', {
          redirectTo: function (routeParams) {
            return '/channel-analyse/report/' + routeParams.rcode + '/' + routeParams.lang
          }
        });
      }
    ])

    .filter('key', function () {

      return function (obj, index) {
        obj = obj || {};
        index = index || 0

        return typeof(obj) == "object" ? Object.keys(obj)[index] : obj;
      };
    })

    .filter('value', function () {

      return function (obj, index) {
        obj = obj || {};
        index = index || 0

        return typeof(obj) == "object" ? obj[Object.keys(obj)[index]] : "";
      };
    })

    .filter('countpad', function () {

      return function (inp) {
        return (typeof(inp) == "number" && inp != "") ? " (" + inp + ")" : "";

      };
    })

    .filter('truncate', function () {

      return function (str, length) {
        str = str || "";
        length = length || 30

        return str.length > length ? str.substring(0, length + 1) + " ..." : str;
      };
    })

    .filter('replace', function () {

      return function (str, search, replace) {
        str = str || "";
        search = search || "";
        replace = replace || "";

        return str.replace(search, replace);
      };
    })
    .filter('dnumber', ['$routeParams', function ($routeParams) {

      return function (inpt, n) {
        n = n || 0;
        let separator = ',';
        let decimal = '.';
        if ($routeParams.lang == 'DE') {
          separator = '.';
          decimal = ',';
        }
        let num = inpt.toFixed(n).replace(/(\d)(?=(\d{3})+\.)/g, "$1" + separator);
        return num.substring(0, num.length - n - 1) + (num.substring(num.length - n, num.length) == "00" ? "" : decimal + num.substring(num.length - n, num.length))

      };
    }])
    .filter('intextnumber', ['$filter', function ($filter) {
      return function (text, wrapperClass) {
        //accept english format number change it accordingly via dnumber
        let dnumber = $filter('dnumber');
        let expression = /\s(\d[\d,\.]+)/g;
        let replaceArray = [];
        let r;
        while ((r = expression.exec(text)) != null) {

          replaceArray.push({value: r[1], index: r.index + 1});
        }
        if (replaceArray.length==0)
          return text

        let tmptxt = "";
        for (var i = 0; i < replaceArray.length; i++) {
          let toreplace = dnumber(parseFloat(replaceArray[i].value.replace(',', '')), 2);
          if (wrapperClass)
            if (text.charAt(replaceArray[i].index+replaceArray[i].value.length)=='%') {
              toreplace += '%';
              replaceArray[i].value += '%';
            }
          toreplace = "<span class='" + wrapperClass + "'>" + toreplace + "</span>";


          //text = text.replace(replaceArray[i].value, toreplace);
          let start = (i != 0 ) ? replaceArray[i].index : 0;
          let end = (i + 1 < replaceArray.length ) ? replaceArray[i + 1].index : text.length;

          tmptxt += text.substring(start, replaceArray[i].index) + toreplace
            + text.substring(replaceArray[i].index + replaceArray[i].value.length, end)
        }

        return tmptxt

      }
    }])
    .filter('bignumber', ['$filter', function ($filter) {
      return function (inpt) {
        let dnumber = $filter('dnumber')
        return inpt >= 1000000 ? dnumber((inpt / 1000000), 1) + 'M' : (inpt > 1000 ? dnumber((inpt / 1000), 1) + 'K' : dnumber(inpt, 2));
      }
    }])

    .filter('number_separator',function(){
      return function(inpt) {
        return inpt.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
      }})
    .filter('noHTML', function () {
      return function(text) {
        return text
          .replace(/&amp;/g, '&')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&ndash;/g, '-')
          .replace(/&mdash;/g, '_')
          .replace(/&euro;/g, '€');
      }
    })
    .filter('noURL', function () {
      return function(text) {
        if((text.indexOf('<http://')>-1)&&(text.indexOf('|')>-1)&&(text.indexOf('>')>-1)){
          let pos1=text.indexOf('<http://');
          let pos2=text.indexOf('|');
          let pos3=text.indexOf('>');
          let text2= text.substring(0,pos1)+ text.substring(pos2+1,pos3)+text.substring(pos3+1,text.length);
          return text
            .replace(text, text2);
        }
        else
          return text;
      }

    })

};

export default app
