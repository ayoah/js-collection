var __collection = function() {

    var _userAgent = navigator.userAgent.toLowerCase();
    var browser = {
            version: (_userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
            chrome: /chrome/.test(_userAgent),
            safari: /webkit/.test(_userAgent),
            opera: /opera/.test(_userAgent),
            msie: /msie/.test(_userAgent) && !/opera/.test(_userAgent),
            mozilla: /mozilla/.test(_userAgent) && !/(compatible|webkit)/.test(_userAgent),
            mobile: /Mobile/i.test(_userAgent),
            ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(_userAgent),
            iphone: /iphone/i.test(_userAgent),
            ipad: /ipad/i.test(_userAgent),
            android: /android/i.test(_userAgent) || /Linux/i.test(_userAgent)
        };

    trim = function (source) {
        var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
        return source.replace(trimer, "")
    };

    var engine = [
        "www.google.com.hk",
        "www.google.com",
        "www.baidu.com",
        "www.so.com",
        "www.sogou.com",
        "www.soso.com",
        "cn.bing.com",
        "glb.uc.cn",
        "so.360.cn",
        "www.youdao.com",
        "search.cn.yahoo.com",
        "www.jike.com",
        "pad.easou.com",
        "www.zhongsou.com",
        "image.baidu.com",
        "images.baidu.com",
        "m.baidu.com",
        "images.google.com",
        "images.google.com.hk",
        "m.sm.cn",
        "www.haosou.com"
    ];

    //获取屏幕高宽
    var getWindowInfo = function () {
        var a = {}, b = window["navigator"], c = window.screen;
        a.crs = c ? c.width + "x" + c.height : "-";
        return a
    };

    //获取来源
    var getReferer = function () {
        var a = a || {};
        var referrer = document.referrer;
        var rf_domain = referrer ? referrer.split("/")[2] : "";
        if (referrer) {
            if (rf_domain) {
                function getUrlParams(paramsName) {
                    var sReg = paramsName + "=([^&|/]*)";
                    var re = new RegExp(sReg, "gi");
                    re.exec(referrer);
                    var value = RegExp.$1;
                    if (value) {
                        return value
                    }
                    return ""
                }

                function parseKeywords(domain) {
                    if (!domain) {
                        return false
                    }
                    var searchTerms = "";
                    if (domain.indexOf("baidu.com") >= 0) {
                        var wd = getUrlParams("wd");
                        var kw = getUrlParams("kw");
                        var word = getUrlParams("word");
                        var wap_w = getUrlParams("w");
                        if (trim(wd)) {
                            return wd
                        } else if (trim(kw)) {
                            return kw
                        } else if (trim(word)) {
                            return word
                        } else if (trim(wap_w)) {
                            return wap_w
                        } else {
                            return searchTerms
                        }
                    } else if (domain.indexOf("so.360.cn") >= 0
                        || domain.indexOf("pad.easou.com") >= 0
                        || domain.indexOf("yahoo.com") >= 0
                        || domain.indexOf("youdao.com") >= 0
                        || domain.indexOf("bing.com") >= 0
                        || domain.indexOf("google") >= 0
                        || domain.indexOf("www.so.com") >= 0
                        || domain.indexOf("m.sm.cn") >= 0
                        || domain.indexOf("www.haosou.com") >= 0
                    ) {
                        searchTerms = trim(getUrlParams("q"))
                    } else if (domain.indexOf("sogou.com") >= 0) {
                        searchTerms = trim(getUrlParams("query"))
                    } else if (domain.indexOf("zhongsou.com") >= 0 || domain.indexOf("www.soso.com") >= 0) {
                        searchTerms = trim(getUrlParams("w"))
                    } else if (domain.indexOf("uc.cn") >= 0) {
                        searchTerms = trim(getUrlParams("keyword"))
                    }
                    if (domain.indexOf("baidu.com") < 0 && !searchTerms) {
                        return "ukn"
                    }
                    return searchTerms
                }

                for (var i = 0; i < engine.length; i++) {
                    if (rf_domain == engine[i] || rf_domain.indexOf("google") >= 0) {
                        var keywords = parseKeywords(rf_domain);
                        a.rnm = "";
                        a.rurl = rf_domain;
                        if (rf_domain == "192.168.40.29") {
                            a.rkw = "";
                            a.mrkw = keywords
                        } else {
                            a.rkw = keywords;
                            a.mrkw = keywords
                        }
                        break
                    } else {
                        a.rnm = "";
                        a.rurl = rf_domain;
                        a.rkw = ""
                    }
                    a.ref = referrer
                }
            }
        }
        return a
    };

    var generateUrl = function () {
        var url = encodeURIComponent(window.location.href)
        var referrer = getReferer()
        var uriArray = [];
        if (typeof referrer == "object") {
            for (var r in referrer) {
                var $r = referrer[r].replace(new RegExp("\r", "g"), "", referrer[r]);
                $r = $r.replace(new RegExp("\n", "g"), "", $r);
                uriArray.push(r + "=" + (r != "rkw" ? encodeURIComponent($r) : $r))
            }
        } else {
            uriArray.push("rurl=");
            uriArray.push("rkw=")
        }

        var winInfo = getWindowInfo();
        for (var i in winInfo) {
            uriArray.push(i + "=" + winInfo[i])
        }

        var uri =
            'url=' + url
            + '&' + uriArray.join('&')
            ;
        return uri;
    }

    var sendImage = function (uri) {
        var daceDomain = "http://192.168.40.29:3000";
        var host = daceDomain + "/a.gif?";
        var d = new Image(1, 1);
        d.src = host + uri;
        console.log(d.src)
        He(d, function () {
            He(d, "")
        })
    };

    var He = function (a, b) {
        return a.onload = b
    };

    var R = {
        sendEvent: function (eid, body) {
            if (eid) {
                if (body === undefined) {
                    body = ""
                }
                var uri = generateUrl();
                console.log(uri)
                sendImage(uri)
            } else {
                return false
            }
        }
    };
    return R
}(window);

__collection.sendEvent('view');