jQuery.ajax = (function(_ajax) {
    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }
    return function(o) {
        var url = o.url;
        if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {
            o.url = YQL;
            o.dataType = 'json';
            o.data = {
                q: query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),
                format: 'xml'
            };
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            o.success = (function(_success) {
                return function(data) {
                    if (_success) {
                        _success.call(this, {
                            responseText: (data.results[0] || '').replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }
                };
            })(o.success);
        }
        return _ajax.apply(this, arguments);
    };
})(jQuery.ajax);

function fbackSubmission() {
    $j("#fbackResponse").html("");
    var pText = $j("#f_text");
    var pReply = $j("#f_reply");
    var pUrl = $j("#f_url");
    if (pText.val() == "") {
        $j("#fbackResponse").html("Please specify some feedback");
        return false
    } else {
        var jQueryform = $j("#feedbackForm"),
            url = 'form=feedback';
        jQuery.post(url, {
            f_text: pText.val(),
            f_reply: pReply.val(),
            f_url: pUrl.val()
        }, function(data) {
            var d = data.split(":");
            if (d[0] == 1) {
                $j("#fBack").html("").html("<div align='center' style='color:#ccffff;'>" + d[1] + "</div>")
            }
            if (d[0] == 2) {
                $j("#fbackResponse").html(d[1])
            }
        })
    }
}

function qSearchUrl() {
    switch (qsUrl) {
        default:
            case "both":
            return "https://www.openwow.com/qsearch=";
        break;
        case "vanilla":
                case "tbc":
                case "wotlk":
                case "cata":
                case "mop":
                return "/qsearchSelf=";
            break;
    }
}

function lformCheck() {
    var user = $j("#userID");
    var pass = $j("#userPW");
    if (user.val() == "") {
        alert("Please enter a valid username");
        return false
    } else if (pass.val() == "") {
        alert("Please enter a valid password");
        return false
    }
}

function $(c) {
    if (arguments.length > 1) {
        var b = [];
        var a;
        for (var d = 0, a = arguments.length; d < a; ++d) {
            b.push($(arguments[d]))
        }
        return b
    }
    if (typeof c == "string") {
        c = ge(c)
    }
    return c
}

function $E(a) {
    if (!a) {
        if (typeof event != "undefined") {
            a = event
        } else {
            return null
        }
    }
    if (a.which) {
        a._button = a.which
    } else {
        a._button = a.button;
        if (Browser.ie) {
            if (a._button & 4) {
                a._button = 2
            } else {
                if (a._button & 2) {
                    a._button = 3
                }
            }
        } else {
            a._button = a.button + 1
        }
    }
    a._target = a.target ? a.target : a.srcElement;
    a._wheelDelta = a.wheelDelta ? a.wheelDelta : -a.detail;
    return a
}

function $A(c) {
    var e = [];
    for (var d = 0, b = c.length; d < b; ++d) {
        e.push(c[d])
    }
    return e
}
Function.prototype.bind = function() {
    var c = this,
        a = $A(arguments),
        b = a.shift();
    return function() {
        return c.apply(b, a.concat($A(arguments)))
    }
};

function strcmp(d, c) {
    if (d == c) {
        return 0
    }
    if (d == null) {
        return -1
    }
    if (c == null) {
        return 1
    }
    return d < c ? -1 : 1
}

function trim(a) {
    return a.replace(/(^\s*|\s*$)/g, "")
}

function rtrim(c, d) {
    var b = c.length;
    while (--b > 0 && c.charAt(b) == d) {}
    c = c.substring(0, b + 1);
    if (c == d) {
        c = ""
    }
    return c
}

function sprintf(b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace("$" + a, arguments[a])
    }
    return b
}

function sprintfa(b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace(new RegExp("\\$" + a, "g"), arguments[a])
    }
    return b
}

function sprintfo(c) {
    if (typeof c == "object" && c.length) {
        var a = c;
        c = a[0];
        var b;
        for (b = 1; b < a.length; ++b) {
            c = c.replace("$" + b, a[b])
        }
        return c
    }
}

function str_replace(e, d, c) {
    while (e.indexOf(d) != -1) {
        e = e.replace(d, c)
    }
    return e
}

function urlencode(a) {
    a = encodeURIComponent(a);
    a = str_replace(a, "+", "%2B");
    return a
}

function urlencode2(a) {
    a = encodeURIComponent(a);
    a = str_replace(a, "%20", "+");
    return a
}

function number_format(a) {
    a = "" + parseInt(a);
    if (a.length <= 3) {
        return a
    }
    return number_format(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3)
}

function in_array(c, g, h, e) {
    if (c == null) {
        return -1
    }
    if (h) {
        return in_arrayf(c, g, h, e)
    }
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (c[d] == g) {
            return d
        }
    }
    return -1
}

function in_arrayf(c, g, h, e) {
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (h(c[d]) == g) {
            return d
        }
    }
    return -1
}

function array_walk(d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        g = h(d[e], c, d, e);
        if (g != null) {
            d[e] = g
        }
    }
}

function array_apply(d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        h(d[e], c, d, e)
    }
}

function ge(a) {
    return document.getElementById(a)
}

function gE(a, b) {
    return a.getElementsByTagName(b)
}

function ce(c, b) {
    var a = document.createElement(c);
    if (b) {
        cOr(a, b)
    }
    return a
}

function de(a) {
    a.parentNode.removeChild(a)
}

function ae(a, b) {
    return a.appendChild(b)
}

function aef(a, b) {
    return a.insertBefore(b, a.firstChild)
}

function ee(a, b) {
    if (!b) {
        b = 0
    }
    while (a.childNodes[b]) {
        a.removeChild(a.childNodes[b])
    }
}

function ct(a) {
    return document.createTextNode(a)
}

function st(a, b) {
    if (a.firstChild && a.firstChild.nodeType == 3) {
        a.firstChild.nodeValue = b
    } else {
        aef(a, ct(b))
    }
}

function nw(a) {
    a.style.whiteSpace = "nowrap"
}

function rf() {
    return false
}

function rf2(a) {
    a = $E(a);
    if (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) {
        return
    }
    return false
}

function tb() {
    this.blur()
}

function ac(c, d) {
    var a = 0,
        g = 0,
        b;
    while (c) {
        a += c.offsetLeft;
        g += c.offsetTop;
        b = c.parentNode;
        while (b && b != c.offsetParent && b.offsetParent) {
            if (b.scrollLeft || b.scrollTop) {
                a -= (b.scrollLeft | 0);
                g -= (b.scrollTop | 0);
                break
            }
            b = b.parentNode
        }
        c = c.offsetParent
    }
    if (Lightbox.isVisible()) {
        d = true
    }
    if (d && !Browser.ie6) {
        var f = openDB_getScroll();
        a += f.x;
        g += f.y
    }
    var e = [a, g];
    e.x = a;
    e.y = g;
    return e
}

function aE(b, c, a) {
    if (Browser.ie) {
        b.attachEvent("on" + c, a)
    } else {
        b.addEventListener(c, a, false)
    }
}

function dE(b, c, a) {
    if (Browser.ie) {
        b.detachEvent("on" + c, a)
    } else {
        b.removeEventListener(c, a, false)
    }
}

function sp(a) {
    if (!a) {
        a = event
    }
    if (Browser.ie) {
        a.cancelBubble = true
    } else {
        a.stopPropagation()
    }
}

function sc(h, i, d, f, g) {
    var e = new Date();
    var c = h + "=" + escape(d) + "; ";
    e.setDate(e.getDate() + i);
    c += "expires=" + e.toUTCString() + "; ";
    if (f) {
        c += "path=" + f + "; "
    }
    if (g) {
        c += "domain=" + g + "; "
    }
    document.cookie = c;
    gc.C[h] = d
}

function dc(a) {
    sc(a, -1);
    gc.C[a] = null
}

function gc(f) {
    if (gc.I == null) {
        var e = unescape(document.cookie).split("; ");
        gc.C = {};
        for (var c = 0, a = e.length; c < a; ++c) {
            var g = e[c].indexOf("="),
                b, d;
            if (g != -1) {
                b = e[c].substr(0, g);
                d = e[c].substr(g + 1)
            } else {
                b = e[c];
                d = ""
            }
            gc.C[b] = d
        }
        gc.I = 1
    }
    if (!f) {
        return gc.C
    } else {
        return gc.C[f]
    }
}

function ns(a) {
    if (Browser.ie) {
        a.onfocus = tb;
        a.onmousedown = a.onselectstart = a.ondragstart = rf
    }
}

function eO(b) {
    for (var a in b) {
        delete b[a]
    }
}

function dO(a) {
    function b() {}
    b.prototype = a;
    return new b
};

function cO(f, c, b) {
    for (var e in c) {
        if (b && typeof c[e] == "object" && c[e].length) {
            f[e] = c[e].slice(0)
        } else {
            f[e] = c[e]
        }
    }
}

function cOr(f, c, b) {
    for (var e in c) {
        if (typeof c[e] == "object") {
            if (b && c[e].length) {
                f[e] = c[e].slice(0)
            } else {
                if (!f[e]) {
                    f[e] = {}
                }
                cOr(f[e], c[e], b)
            }
        } else {
            f[e] = c[e]
        }
    }
}
var Browser = {
    ie: !!(window.attachEvent && !window.opera),
    opera: !!window.opera,
    safari: navigator.userAgent.indexOf("Safari") != -1,
    gecko: navigator.userAgent.indexOf("Gecko") != -1 && navigator.userAgent.indexOf("KHTML") == -1
};
Browser.ie8 = Browser.ie && navigator.userAgent.indexOf("MSIE 8.0") != -1;
Browser.ie7 = Browser.ie && navigator.userAgent.indexOf("MSIE 7.0") != -1 && !Browser.ie8;
Browser.ie6 = Browser.ie && navigator.userAgent.indexOf("MSIE 6.0") != -1 && !Browser.ie7;
Browser.ie67 = Browser.ie6 || Browser.ie7;
navigator.userAgent.match(/Gecko\/([0-9]+)/);
Browser.geckoVersion = parseInt(RegExp.$1) | 0;
var OS = {
    windows: navigator.appVersion.indexOf("Windows") != -1,
    mac: navigator.appVersion.indexOf("Macintosh") != -1,
    linux: navigator.appVersion.indexOf("Linux") != -1
};
var DomContentLoaded = new function() {
    var a = [];
    this.now = function() {
        array_apply(a, function(b) {
            b()
        });
        DomContentLoaded = null
    };
    this.addEvent = function(b) {
        a.push(b)
    }
};

function openDB_getWindowSize() {
    var a = 0,
        b = 0;
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        a = document.documentElement.clientWidth;
        b = document.documentElement.clientHeight
    } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            a = document.body.clientWidth;
            b = document.body.clientHeight
        } else {
            if (typeof window.innerWidth == "number") {
                a = window.innerWidth;
                b = window.innerHeight
            }
        }
    }
    return {
        w: a,
        h: b
    }
}

function openDB_getScroll() {
    var a = 0,
        b = 0;
    if (typeof(window.pageYOffset) == "number") {
        a = window.pageXOffset;
        b = window.pageYOffset
    } else {
        if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            a = document.body.scrollLeft;
            b = document.body.scrollTop
        } else {
            if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                a = document.documentElement.scrollLeft;
                b = document.documentElement.scrollTop
            }
        }
    }
    return {
        x: a,
        y: b
    }
}

function openDB_getCursorPos(c) {
    var a, d;
    if (window.innerHeight) {
        a = c.pageX;
        d = c.pageY
    } else {
        var b = openDB_getScroll();
        a = c.clientX + b.x;
        d = c.clientY + b.y
    }
    return {
        x: a,
        y: d
    }
}

function openDB_scrollTo(c, b) {
    var l, k = openDB_getWindowSize(),
        m = openDB_getScroll(),
        i = k.w,
        e = k.h,
        g = m.x,
        d = m.y;
    c = $(c);
    if (b == null) {
        b = []
    } else {
        if (typeof b == "number") {
            b = [b]
        }
    }
    l = b.length;
    if (l == 0) {
        b[0] = b[1] = b[2] = b[3] = 0
    } else {
        if (l == 1) {
            b[1] = b[2] = b[3] = b[0]
        } else {
            if (l == 2) {
                b[2] = b[0];
                b[3] = b[1]
            } else {
                if (l == 3) {
                    b[3] = b[1]
                }
            }
        }
    }
    l = ac(c);
    var a = l[0] - b[3],
        h = l[1] - b[0],
        j = l[0] + c.offsetWidth + b[1],
        f = l[1] + c.offsetHeight + b[2];
    if (j - a > i || a < g) {
        g = a
    } else {
        if (j - i > g) {
            g = j - i
        }
    }
    if (f - h > e || h < d) {
        d = h
    } else {
        if (f - e > d) {
            d = f - e
        }
    }
    scrollTo(g, d)
}

function openDB_setTextNodes(c, b) {
    if (c.nodeType == 3) {
        c.nodeValue = b
    } else {
        for (var a = 0; a < c.childNodes.length; ++a) {
            openDB_setTextNodes(c.childNodes[a], b)
        }
    }
}

function openDB_setInnerHtml(e, d, b) {
    if (e.nodeName.toLowerCase() == b) {
        e.innerHTML = d
    } else {
        for (var c = 0; c < e.childNodes.length; ++c) {
            openDB_setInnerHtml(e.childNodes[c], d, b)
        }
    }
}

function openDB_getTextContent(c) {
    var a = "";
    for (var b = 0; b < c.childNodes.length; ++b) {
        if (c.childNodes[b].nodeValue) {
            a += c.childNodes[b].nodeValue
        } else {
            if (c.childNodes[b].nodeName == "BR") {
                if (Browser.ie) {
                    a += "\r"
                } else {
                    a += "\n"
                }
            }
        }
        a += openDB_getTextContent(c.childNodes[b])
    }
    return a
}

function openDB_setSelectedLink(c, b) {
    if (!openDB_setSelectedLink.groups) {
        openDB_setSelectedLink.groups = {}
    }
    var a = openDB_setSelectedLink.groups;
    if (a[b]) {
        a[b].className = a[b].className.replace("selected", "")
    }
    c.className += " selected";
    a[b] = c
}

function openDB_toggleDisplay(a) {
    if (a.style.display == "none") {
        a.style.display = "";
        return true
    } else {
        a.style.display = "none";
        return false
    }
}

function openDB_enableScroll(a) {
    if (!a) {
        aE(document, "mousewheel", openDB_enableScroll.F);
        aE(window, "DOMMouseScroll", openDB_enableScroll.F)
    } else {
        dE(document, "mousewheel", openDB_enableScroll.F);
        dE(window, "DOMMouseScroll", openDB_enableScroll.F)
    }
}
openDB_enableScroll.F = function(a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    }
    if (a.preventDefault) {
        a.preventDefault()
    }
    a.returnValue = false;
    a.cancelBubble = true;
    return false
};

function openDB_getGets() {
    if (openDB_getGets.C != null) {
        return openDB_getGets.C
    }
    var e = {};
    if (location.search) {
        var f = decodeURIComponent(location.search.substr(1)).split("&");
        for (var c = 0, a = f.length; c < a; ++c) {
            var g = f[c].indexOf("="),
                b, d;
            if (g != -1) {
                b = f[c].substr(0, g);
                d = f[c].substr(g + 1)
            } else {
                b = f[c];
                d = ""
            }
            e[b] = d
        }
    }
    openDB_getGets.C = e;
    return e
}

function openDB_createRect(d, c, a, b) {
    return {
        l: d,
        t: c,
        r: d + a,
        b: c + b
    }
}

function openDB_intersectRect(d, c) {
    return !(d.l >= c.r || c.l >= d.r || d.t >= c.b || c.t >= d.b)
}

function openDB_createRange(c, a) {
    range = {};
    for (var b = c; b <= a; ++b) {
        range[b] = b
    }
    return range
}

function openDB_sortIdArray(a, b, c) {
    a.sort(c ? function(e, d) {
        return strcmp(b[e][c], b[d][c])
    } : function(e, d) {
        return strcmp(b[e], b[d])
    })
}

function openDB_sortJsonArray(e, d, f, a) {
    var c = [];
    for (var b in e) {
        if (d[b] && (a == null || a(d[b]))) {
            c.push(b)
        }
    }
    if (f != null) {
        c.sort(f)
    } else {
        openDB_sortIdArray(c, d)
    }
    return c
}

function openDB_urlize(a, b) {
    a = str_replace(a, "'", "");
    a = trim(a);
    if (b) {
        a = str_replace(a, " ", "-")
    } else {
        a = a.replace(/[^a-z0-9]/i, "-")
    }
    a = str_replace(a, "--", "-");
    a = str_replace(a, "--", "-");
    a = rtrim(a, "-");
    a = a.toLowerCase();
    return a
}

function openDB_getLocale(a) {
    if (a && openDB_locale.id == 25) {
        return 0
    }
    return openDB_locale.id
}

function openDB_createReverseLookupJson(b) {
    var c = {};
    for (var a in b) {
        c[b[a]] = a
    }
    return c
}

function openDB_initHeader(c) {
    var l = ce("dl"),
        p = (c == 5);
    for (var k = 0, m = mn_path.length; k < m; ++k) {
        var g = ce("dt");
        var q = ce("a");
        var n = ce("ins");
        var h = ce("big");
        var f = ce("span");
        var o = mn_path[k][0];
        var j = (o == c);
        var e = (!j && mn_path[k][3]);
        if (p && o == 5) {
            e = true;
            mn_path[k][3] = mn_profiles
        }
        if (e) {
            q.menu = mn_path[k][3];
            q.onmouseover = Menu.show;
            q.onmouseout = Menu.hide
        } else {
            q.onmouseover = Menu._hide
        }
        if (mn_path[k][2]) {
            q.href = mn_path[k][2]
        } else {
            q.href = "javascript:;";
            ns(q);
            q.style.cursor = "default"
        }
        if (j) {
            q.className = "selected"
        }
        ae(h, ct(mn_path[k][1].charAt(0)));
        ae(n, h);
        ae(n, ct(mn_path[k][1].substr(1)));
        ae(q, n);
        ae(q, f);
        ae(g, q);
        ae(l, g)
    }
    ae(ge("ptewhjkst46"), l);
    var b = ge("kbl34h6b43");
    if (c != null && c >= 0 && c < mn_path.length) {
        switch (c) {
            case 0:
                Menu.addButtons(b, Menu.explode(mn_database));
                break;
            case 1:
                Menu.addButtons(b, mn_tools);
                break;
            case 2:
                Menu.addButtons(b, Menu.explode(mn_more));
                break;
            case 3:
                Menu.addButtons(b, Menu.explode(mn_forums));
                break;
            case 5:
                pr_initTopBarSearch();
                break
        }
    } else {
        ae(b, ct(String.fromCharCode(160)))
    }
    var r = ge("oh2345v5ks");
    var s = r.previousSibling;
    var d = r.parentNode;
    ns(s);
    s.onclick = function() {
        this.parentNode.onsubmit()
    };
    if (Browser.ie) {
        setTimeout(function() {
            r.value = ""
        }, 1)
    }
    if (r.value == "") {
        r.className = "search-database"
    }
    r.onmouseover = function() {
        if (trim(this.value) != "") {
            this.className = ""
        }
    };
    r.onfocus = function() {
        this.className = ""
    };
    r.onblur = function() {
        if (trim(this.value) == "") {
            this.className = "search-database";
            this.value = ""
        }
    };
    d.onsubmit = function() {
        var a = this.elements[0].value;
        if (trim(a) == "") {
            return false
        }
        this.submit()
    }
}

function openDB_getLoc(p, f) {
    var h = mn_path,
        c = null,
        k = null,
        o = 0,
        l = ge("locBox"),
        n = ce("div");
    ee(l);
    if (openDB_getLoc.lastIt) {
        openDB_getLoc.lastIt.checked = null
    }
    n.className = "path";
    if (f != null) {
        var m = ce("div");
        m.className = "path-right";
        var q = ce("a");
        q.href = "javascript:;";
        q.id = "fi_toggle";
        ns(q);
        q.onclick = fi_toggle;
        if (f) {
            q.className = "disclosure-on";
            ae(q, ct(LANG.fihide))
        } else {
            q.className = "disclosure-off";
            ae(q, ct(LANG.fishow))
        }
        ae(m, q);
        ae(l, m)
    }
    for (var g = 0; g < p.length; ++g) {
        var q, b, r = 0;
        for (var e = 0; e < h.length; ++e) {
            if (h[e][0] == p[g]) {
                r = 1;
                h = h[e];
                h.checked = 1;
                break
            }
        }
        if (!r) {
            o = 1;
            break
        }
        q = ce("a");
        b = ce("span");
        if (h[2]) {
            q.href = h[2];
            q.style.paddingLeft = "10px"
        } else {
            q.href = "javascript:;";
            ns(q);
            q.style.textDecoration = "none";
            q.style.color = "white";
            q.style.cursor = "default"
        }
        if (g < p.length - 1 && h[3]) {
            b.className = "locArrow"
        }
        ae(q, ct(h[4] == null ? h[1] : h[4]));
        if (g == 0) {
            q.menu = mn_path
        } else {
            q.menu = c[3]
        }
        q.onmouseover = Menu.show;
        q.onmouseout = Menu.hide;
        ae(b, q);
        ae(n, b);
        k = b;
        c = h;
        h = h[3];
        if (!h) {
            o = 1;
            break
        }
    }
    if (o && k) {
        k.className = ""
    } else {
        if (c && c[3]) {
            k.className = "locArrow";
            q = ce("a");
            b = ce("span");
            q.href = "javascript:;";
            ns(q);
            q.style.textDecoration = "none";
            q.style.paddingLeft = "4px";
            q.style.color = "white";
            q.style.cursor = "default";
            ae(q, ct("..."));
            q.menu = c[3];
            q.onmouseover = Menu.show;
            q.onmouseout = Menu.hide;
            ae(b, q);
            ae(n, b)
        }
    }
    var m = ce("div");
    m.className = "clear";
    ae(n, m);
    ae(l, n);
    openDB_getLoc.lastIt = c
}

function openDB_formatTimeElapsed(e) {
    function c(m, l, i) {
        if (i && LANG.timeunitsab[l] == "") {
            i = 0
        }
        if (i) {
            return m + " " + LANG.timeunitsab[l]
        } else {
            return m + " " + (m == 1 ? LANG.timeunitssg[l] : LANG.timeunitspl[l])
        }
    }
    var g = [31557600, 2629800, 604800, 86400, 3600, 60, 1];
    var a = [1, 3, 3, -1, 5, -1, -1];
    e = Math.max(e, 1);
    for (var f = 3, h = g.length; f < h; ++f) {
        if (e >= g[f]) {
            var d = f;
            var k = Math.floor(e / g[d]);
            if (a[d] != -1) {
                var b = a[d];
                e %= g[d];
                var j = Math.floor(e / g[b]);
                if (j > 0) {
                    return c(k, d, 1) + " " + c(j, b, 1)
                }
            }
            return c(k, d, 0)
        }
    }
    return "(n/a)"
}

function openDB_formatDateSimple(g, c) {
    function a(b) {
        return (b < 10 ? "0" + b : b)
    }
    var i = "",
        j = g.getDate(),
        f = g.getMonth() + 1,
        h = g.getFullYear();
    i += sprintf(LANG.date_simple, a(j), a(f), h);
    if (c == 1) {
        var k = g.getHours() + 1,
            e = g.getMinutes() + 1;
        i += LANG.date_at + a(k) + ":" + a(e)
    }
    return i
}

function openDB_cleanCharacterName(e) {
    var d = "";
    for (var c = 0, a = e.length; c < a; ++c) {
        var b = e.charAt(c).toLowerCase();
        if (b >= "a" && b <= "z") {
            d += b
        } else {
            d += e.charAt(c)
        }
    }
    return d
}

function openDB_createGlow(a, h) {
    var e = ce("span");
    for (var c = -1; c <= 1; ++c) {
        for (var b = -1; b <= 1; ++b) {
            var g = ce("div");
            g.style.position = "absolute";
            g.style.whiteSpace = "nowrap";
            g.style.left = c + "px";
            g.style.top = b + "px";
            if (c == 0 && b == 0) {
                g.style.zIndex = 4
            } else {
                g.style.color = "black";
                g.style.zIndex = 2
            }
            ae(g, ct(a));
            ae(e, g)
        }
    }
    e.style.position = "relative";
    e.className = "glow" + (h != null ? " " + h : "");
    var f = ce("span");
    f.style.visibility = "hidden";
    ae(f, ct(a));
    ae(e, f);
    return e
}

function openDB_createProgressBar(c) {
    if (c == null) {
        c = {}
    }
    if (!c.text) {
        c.text = " "
    }
    if (c.color == null) {
        c.color = "rep0"
    }
    if (c.width == null) {
        c.width = 100
    }
    var d, e;
    if (c.hoverText) {
        d = ce("a");
        d.href = "javascript:;"
    } else {
        d = ce("span")
    }
    d.className = "progressbar";
    if (c.text || c.hoverText) {
        e = ce("div");
        e.className = "progressbar-text";
        if (c.text) {
            var a = ce("del");
            ae(a, ct(c.text));
            ae(e, a)
        }
        if (c.hoverText) {
            var b = ce("ins");
            ae(b, ct(c.hoverText));
            ae(e, b)
        }
        ae(d, e)
    }
    e = ce("div");
    e.className = "progressbar-" + c.color;
    e.style.width = c.width + "%";
    ae(e, ct(String.fromCharCode(160)));
    ae(d, e);
    return d
}

function openDB_createReputationBar(g) {
    var f = openDB_createReputationBar.P;
    if (!g) {
        g = 0
    }
    g += 42000;
    if (g < 0) {
        g = 0
    } else {
        if (g > 84999) {
            g = 84999
        }
    }
    var e = g,
        h, b = 0;
    for (var d = 0, a = f.length; d < a; ++d) {
        if (f[d] > e) {
            break
        }
        if (d < a - 1) {
            e -= f[d];
            b = d + 1
        }
    }
    h = f[b];
    var c = {
        text: openDB_reputation_standings[b],
        hoverText: e + " / " + h,
        color: "rep" + b,
        width: parseInt(e / h * 100)
    };
    return openDB_createProgressBar(c)
}
openDB_createReputationBar.P = [36000, 3000, 3000, 3000, 6000, 12000, 21000, 999];

function openDB_createAchievementBar(a, c) {
    if (!a) {
        a = 0
    }
    var b = {
        text: a + (c > 0 ? " / " + c : ""),
        color: (c > 700 ? "rep7" : "ach" + (c > 0 ? 0 : 1)),
        width: (c > 0 ? parseInt(a / c * 100) : 100)
    };
    return openDB_createProgressBar(b)
}

function openDB_createCaptcha(c) {
    var b = ce("a");
    b.href = "javascript:;";
    b.className = "captcha";
    b.title = LANG.tooltip_captcha;
    if (c & 1) {
        b.style.marginLeft = b.style.marginRight = "auto"
    }
    if (Browser.ie6) {
        var d = ce("img");
        d.src = "captcha&foo=" + Math.random();
        ae(b, d);
        b.onclick = function() {
            de(this.firstChild);
            var a = ce("img");
            a.src = "captcha&foo=" + Math.random();
            ae(b, a);
            this.blur()
        }
    } else {
        b.style.backgroundImage = "url(captcha&foo=" + Math.random() + ")";
        b.onclick = function() {
            this.style.backgroundImage = "url(captcha&foo=" + Math.random() + ")"
        }
    }
    return b
}

function openDB_revealCaptcha(a) {}

function openDB_convertRatingToPercent(g, b, f, d) {
    var e = {
        12: 1.5,
        13: 12,
        14: 15,
        15: 5,
        16: 10,
        17: 10,
        18: 8,
        19: 14,
        20: 14,
        21: 14,
        22: 10,
        23: 10,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 10,
        29: 10,
        30: 10,
        31: 10,
        32: 14,
        33: 0,
        34: 0,
        35: 25,
        36: 10,
        37: 2.5,
        44: 3.756097412109376
    };
    if (g < 0) {
        g = 1
    } else {
        if (g > 80) {
            g = 80
        }
    }
    if ((b == 14 || b == 12 || b == 15) && g < 34) {
        g = 34
    }
    if ((b == 28 || b == 36) && (d == 2 || d == 6 || d == 7 || d == 11)) {
        e[b] /= 1.3
    }
    if (f < 0) {
        f = 0
    }
    var a;
    if (e[b] == null) {
        a = 0
    } else {
        var c;
        if (g > 70) {
            c = (82 / 52) * Math.pow((131 / 63), ((g - 70) / 10))
        } else {
            if (g > 60) {
                c = (82 / (262 - 3 * g))
            } else {
                if (g > 10) {
                    c = ((g - 8) / 52)
                } else {
                    c = 2 / 52
                }
            }
        }
        a = f / e[b] / c
    }
    return a
}

function openDB_setRatingLevel(f, e, b, c) {
    var d = prompt(sprintf(LANG.prompt_ratinglevel, 1, 80), e);
    if (d != null) {
        d |= 0;
        if (d != e && d >= 1 && d <= 80) {
            e = d;
            var a = openDB_convertRatingToPercent(e, b, c);
            a = (Math.round(a * 100) / 100);
            if (b != 12 && b != 37) {
                a += "%"
            }
            f.innerHTML = sprintf(LANG.tooltip_combatrating, a, e);
            f.onclick = openDB_setRatingLevel.bind(0, f, e, b, c)
        }
    }
}

function openDB_getMoneyHtml(c) {
    var b = 0,
        a = "";
    if (c >= 10000) {
        b = 1;
        a += '<span class="moneygold">' + Math.floor(c / 10000) + '</span>';
        c %= 10000
    }
    if (c >= 100) {
        if (b) {
            a += " "
        } else {
            b = 1
        }
        a += '<span class="moneysilver">' + Math.floor(c / 100) + "</span>";
        c %= 100
    }
    if (c >= 1) {
        if (b) {
            a += " "
        } else {
            b = 1
        }
        a += '<span class="moneycopper">' + c + "</span>"
    }
    return a
}

function openDB_getPatchVersion(e) {
    var d = openDB_getPatchVersion;
    var b = 0,
        c = d.T.length - 2,
        a;
    while (c > b) {
        a = Math.floor((c + b) / 2);
        if (e >= d.T[a] && e < d.T[a + 1]) {
            return d.V[a]
        }
        if (e >= d.T[a]) {
            b = a + 1
        } else {
            c = a - 1
        }
    }
    a = Math.ceil((c + b) / 2);
    return d.V[a]
}
openDB_getPatchVersion.V = ["1.12.0", "1.12.1", "1.12.2", "2.0.1", "2.0.3", "2.0.4", "2.0.5", "2.0.6", "2.0.7", "2.0.8", "2.0.10", "2.0.12", "2.1.0", "2.1.1", "2.1.2", "2.1.3", "2.2.0", "2.2.2", "2.2.3", "2.3.0", "2.3.2", "2.3.3", "2.4.0", "2.4.1", "2.4.2", "2.4.3", "3.0.2", "3.0.3", "3.0.8", "3.0.9", "3.1.0", "3.1.1", "3.1.2", "3.1.3", "???"];
openDB_getPatchVersion.T = [1153540800000, 1159243200000, 1160712000000, 1165294800000, 1168318800000, 1168578000000, 1168750800000, 1169528400000, 1171342800000, 1171602000000, 1173157200000, 1175572800000, 1179806400000, 1181016000000, 1182225600000, 1184040000000, 1190692800000, 1191297600000, 1191902400000, 1194930000000, 1199768400000, 1200978000000, 1206417600000, 1207022400000, 1210651200000, 1216094400000, 1223956800000, 1225774800000, 1232427600000, 1234242000000, 1239681600000, 1240286400000, 1242705600000, 1243915200000, 9999999999999];

function openDB_expandSite() {
    ge("wrapper").className = "nosidebar";
    var a = ge("topbar-expand");
    if (a) {
        de(a)
    }
    a = ge("sidebar");
    if (a) {
        de(a)
    }
}

function openDB_insertTag(d, a, i, j) {
    var b = $(d);
    b.focus();
    if (b.selectionStart != null) {
        var l = b.selectionStart,
            h = b.selectionEnd,
            k = b.scrollLeft,
            c = b.scrollTop;
        var g = b.value.substring(l, h);
        if (typeof j == "function") {
            g = j(g)
        }
        b.value = b.value.substr(0, l) + a + g + i + b.value.substr(h);
        b.selectionStart = b.selectionEnd = h + a.length;
        b.scrollLeft = k;
        b.scrollTop = c
    } else {
        if (document.selection && document.selection.createRange) {
            var f = document.selection.createRange();
            if (f.parentElement() != b) {
                return
            }
            var g = f.text;
            if (typeof j == "function") {
                g = j(g)
            }
            f.text = a + g + i
        }
    }
    if (b.onkeyup) {
        b.onkeyup()
    }
}

function openDB_getLocaleFromDomain(a) {
    var c = openDB_getLocaleFromDomain.L;
    if (a) {
        var b = a.indexOf(".");
        if (b != -1) {
            a = a.substring(0, b)
        }
    }
    return (c[a] ? c[a] : 0)
}
openDB_getLocaleFromDomain.L = {
    fr: 2,
    de: 3,
    es: 6,
    ru: 7,
    ptr: 25
};

function openDB_getDomainFromLocale(a) {
    var b;
    if (openDB_getDomainFromLocale.L) {
        b = openDB_getDomainFromLocale.L
    } else {
        b = openDB_getDomainFromLocale.L = openDB_createReverseLookupJson(openDB_getLocaleFromDomain.L)
    }
    return (b[a] ? b[a] : "www")
}

function openDB_getIdFromTypeName(a) {
    var b = openDB_getIdFromTypeName.L;
    return (b[a] ? b[a] : -1)
}
openDB_getIdFromTypeName.L = {
    npc: 1,
    object: 2,
    item: 3,
    itemset: 4,
    quest: 5,
    spell: 6,
    zone: 7,
    faction: 8,
    pet: 9,
    achievement: 10,
    profile: 100
};

function openDB_IngameLink(b, d, c) {
    prompt(LANG.message_ingamelink, '/script DEFAULT_CHAT_FRAME:AddMessage("\\124c' + b + "\\124H" + d + "\\124h[" + c + ']\\124h\\124r");')
}

function openDB_isEmailValid(a) {
    return a.match(/^([a-z0-9._-]+)(\+[a-z0-9._-]+)?(@[a-z0-9.-]+\.[a-z]{2,4})$/i) != null
}

function openDB_onAfterTyping(a, d, c) {
    var e;
    var b = function() {
        if (e) {
            clearTimeout(e);
            e = null
        }
        e = setTimeout(d, c)
    };
    a.onkeyup = b
}

function openDB_onClick(c, d) {
    var b = 0;

    function a(e) {
        if (b) {
            if (b != e) {
                return
            }
        } else {
            b = e
        }
        d(true)
    }
    c.oncontextmenu = function() {
        a(1);
        return false
    };
    c.onmouseup = function(f) {
        f = $E(f);
        if (f._button == 3 || f.shiftKey || f.ctrlKey) {
            a(2)
        } else {
            if (f._button == 1) {
                d(false)
            }
        }
        return false
    }
}

function openDB_createOrRegex(c) {
    var e = c.split(" "),
        d = "";
    for (var b = 0, a = e.length; b < a; ++b) {
        if (b > 0) {
            d += "|"
        }
        d += e[b]
    }
    return new RegExp("(" + d + ")", "gi")
}

function openDB_addPages(l, b) {
    function o(q, d) {
        var i;
        if (q == b.page) {
            i = ce("span");
            i.className = "selected"
        } else {
            i = ce("a");
            i.href = (q > 1 ? b.url + b.sep + q + b.pound : b.url + b.pound)
        }
        ae(i, ct(d != null ? d : q));
        return i
    }
    if (!b.pound) {
        b.pound = ""
    }
    if (!b.sep) {
        b.sep = "."
    }
    if (b.allOrNothing && b.nPages <= 1) {
        return
    }
    var c = (b.align && b.align == "left");
    var e = ce("div"),
        k, p = ce("var");
    e.className = "pages";
    if (c) {
        e.className += " pages-left"
    }
    if (b.nPages > 1) {
        k = ce("div");
        k.className = "pages-numbers";
        var n = Math.max(2, b.page - 3);
        var h = Math.min(b.nPages - 1, b.page + 3);
        var m = [];
        if (b.page != b.nPages) {
            m.push(o(b.page + 1, LANG.lvpage_next + String.fromCharCode(8250)))
        }
        m.push(o(b.nPages));
        if (h < b.nPages - 1) {
            var a = ce("span");
            ae(a, ct("..."));
            m.push(a)
        }
        for (var g = h; g >= n; --g) {
            m.push(o(g))
        }
        if (n > 2) {
            var a = ce("span");
            ae(a, ct("..."));
            m.push(a)
        }
        m.push(o(1));
        if (b.page != 1) {
            m.push(o(b.page - 1, String.fromCharCode(8249) + LANG.lvpage_previous))
        }
        if (c) {
            m.reverse()
        }
        for (var g = 0, j = m.length; g < j; ++g) {
            ae(k, m[g])
        }
        k.firstChild.style.marginRight = "0";
        k.lastChild.style.marginLeft = "0"
    }
    var p = ce("var");
    ae(p, ct(sprintf(LANG[b.wording[b.nItems == 1 ? 0 : 1]], b.nItems)));
    if (b.nPages > 1) {
        var a = ce("span");
        ae(a, ct(String.fromCharCode(8211)));
        ae(p, a);
        var f = ce("a");
        f.className = "gotopage";
        f.href = "javascript:;";
        ns(f);
        if (Browser.ie) {
            ae(f, ct(" "))
        }
        f.onclick = function() {
            var d = prompt(sprintf(LANG.prompt_gotopage, 1, b.nPages), b.page);
            if (d != null) {
                d |= 0;
                if (d != b.page && d >= 1 && d <= b.nPages) {
                    document.location.href = (d > 1 ? b.url + b.sep + d + b.pound : b.url + b.pound)
                }
            }
        };
        f.onmouseover = function(d) {
            Tooltip.showAtCursor(d, LANG.tooltip_gotopage, 0, 0, "q")
        };
        f.onmousemove = Tooltip.cursorUpdate;
        f.onmouseout = Tooltip.hide;
        ae(p, f)
    }
    if (c) {
        ae(e, p);
        if (k) {
            ae(e, k)
        }
    } else {
        if (k) {
            ae(e, k)
        }
        ae(e, p)
    }
    ae(l, e)
}

function openDB_disclose(a, b) {
    b.className = "disclosure-" + (openDB_toggleDisplay(a) ? "on" : "off");
    return false
}

function co_addYourComment() {
    tabsContribute.focus(0);
    var a = gE(document.forms.addcomment, "textarea")[0];
    a.focus()
}

function co_cancelReply() {
    ge("replybox-generic").style.display = "none";
    document.forms.addcomment.elements.replyto.value = ""
}

function co_validateForm(b) {
    var a = gE(b, "textarea")[0];
    if (Listview.funcBox.coValidate(a)) {
        if (openDB_user.permissions & 1) {
            return true
        }
        return true
    }
    return false
}

function ss_submitAScreenshot() {
    tabsContribute.focus(1)
}

function ss_validateForm(a) {
    if (!a.elements.screenshotfile.value.length) {
        alert(LANG.message_noscreenshot);
        return false
    }
    return true
}

function ss_appendSticky() {
    var m = ge("infobox-sticky");
    var i = openDB_pageInfo.type;
    var h = openDB_pageInfo.typeId;
    var k = in_array(lv_screenshots, 1, function(a) {
        return a.sticky
    });
    if (k != -1) {
        var c = lv_screenshots[k];
        var l = ce("a");
        l.href = "#screenshots:id=" + c.id;
        l.onclick = function(a) {
            ScreenshotViewer.show({
                screenshots: lv_screenshots,
                pos: k
            });
            return rf2(a)
        };
        var f = ce("img"),
            e = Math.min(150 / c.width, 150 / c.height);
        f.src = "/upload/thumb/" + k.file;
        f.className = "border";
        ae(l, f);
        ae(m, l);
        var g = ce("div");
        var n = ce("small");
        l = ce("a");
        if (openDB_user.id > 0) {
            l.href = "javascript:;";
            l.onclick = ss_submitAScreenshot
        } else {
            l.href = "account=signin"
        }
        ae(l, ct(LANG.infobox_submitone));
        ae(n, l);
        ae(n, ct(" " + String.fromCharCode(160)));
        var j = ce("b");
        ae(j, ct("|"));
        ae(n, j);
        ae(n, ct(String.fromCharCode(160) + " "));
        l = ce("a");
        l.href = "javascript:;";
        l.onclick = function() {
            tabsRelated.focus(-1);
            return false
        };
        ae(l, ct(sprintf(LANG.infobox_showall, lv_screenshots.length)));
        ae(n, l);
        ae(g, n);
        ae(m, g)
    } else {
        var l;
        if (openDB_user.id > 0) {
            l = '<a href="javascript:;" onclick="ss_submitAScreenshot(); return false">'
        } else {
            l = '<a href="account=signin">'
        }
        m.innerHTML = sprintf(LANG.infobox_noneyet, l + LANG.infobox_submitone + "</a>")
    }
}

function su_addToSaved(b, a) {
    if (!b) {
        return
    }
    var d = gc("compare_groups"),
        c = "compare";
    if (!d || confirm(LANG.confirm_addtosaved)) {
        if (d) {
            b = d + ";" + b
        }
        sc("compare_groups", 20, b, "/", ".openwow.com")
    } else {
        c += "=" + b
    }
    if (a) {
        window.open(c)
    } else {
        location.href = c
    }
}

function Ajax(b, c) {
    if (!b) {
        return
    }
    var a;
    try {
        a = new XMLHttpRequest()
    } catch (d) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (d) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (d) {
                if (window.createRequest) {
                    a = window.createRequest()
                } else {
                    alert(LANG.message_ajaxnotsupported);
                    return
                }
            }
        }
    }
    this.request = a;
    cO(this, c);
    this.method = this.method || (this.params && "POST") || "GET";
    a.open(this.method, b, this.async == null ? true : this.async);
    a.onreadystatechange = Ajax.onReadyStateChange.bind(this);
    if (this.method.toUpperCase() == "POST") {
        a.setRequestHeader("Content-Type", (this.contentType || "application/x-www-form-urlencoded") + "; charset=" + (this.encoding || "UTF-8"))
    }
    a.send(this.params)
}
Ajax.onReadyStateChange = function() {
    if (this.request.readyState == 4) {
        if (this.request.status == 0 || (this.request.status >= 200 && this.request.status < 300)) {
            this.onSuccess != null && this.onSuccess(this.request, this)
        } else {
            this.onFailure != null && this.onFailure(this.request, this)
        }
        if (this.onComplete != null) {
            this.onComplete(this.request, this)
        }
    }
};

function openDB_ajaxIshRequest(b) {
    var c = document.getElementsByTagName("head")[0],
        a = openDB_getGets();
    if (a.refresh != null) {
        b += "&refresh"
    }
    ae(c, ce("script", {
        type: "text/javascript",
        src: b
    }))
}
var Menu = {
    iframes: [],
    divs: [],
    selection: [],
    show: function() {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu._show(this)
            } else {
                if (this.className.indexOf("open") == -1) {
                    this.className += " open"
                }
                Menu.timer = setTimeout(Menu._show.bind(0, this), 100)
            }
        } catch (a) {}
    },
    _show: function(b) {
        if (Menu.currentLink != b) {
            var a = ac(b);
            Menu._hide();
            Menu.selection = [-1];
            Menu.currentLink = b;
            Menu.showDepth(0, b.menu, a[0], a[1] + b.offsetHeight + 1, b.offsetHeight + 8, b.offsetWidth, a[1], false);
            if (b.className.indexOf("open") == -1) {
                b.className += " open"
            }
        } else {
            Menu.truncate(0);
            Menu.clean(0)
        }
    },
    showAtCursor: function(b, a, d) {
        clearTimeout(Menu.timer);
        Menu._hide();
        Menu.selection = [-1];
        Menu.currentLink = null;
        if (!(a && d)) {
            b = $E(b);
            var c = openDB_getCursorPos(b);
            a = c.x;
            d = c.y
        }
        if (Browser.ie6) {
            a -= 2;
            d -= 2
        }
        Menu.showDepth(0, this.menu, a, d, 0, 0, 0, true)
    },
    hide: function() {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu.timer = setTimeout(Menu._hide, 333)
            } else {
                this.className = this.className.replace("open", "")
            }
        } catch (a) {}
    },
    _hide: function() {
        for (var b = 0, a = Menu.selection.length; b < a; ++b) {
            Menu.divs[b].style.display = "none";
            Menu.divs[b].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[b].style.display = "none"
            }
        }
        Menu.selection = [];
        if (Menu.currentLink) {
            Menu.currentLink.className = Menu.currentLink.className.replace("open", "")
        }
        Menu.currentLink = null
    },
    sepOver: function() {
        var b = this.d;
        var a = b.i;
        Menu.truncate(a);
        Menu.clean(a);
        Menu.selection[a] = -1
    },
    elemOver: function() {
        var g = this.d;
        var f = g.i;
        var e = this.i;
        var a = this.k;
        var b = this.firstChild.className == "menusub";
        Menu.truncate(f + b);
        if (b && a != Menu.selection[f]) {
            var h = ac(this);
            Menu.selection[f + 1] = -1;
            Menu.showDepth(f + 1, g.menuArray[e][3], h[0], h[1] - 2, this.offsetHeight, this.offsetWidth - 3, 0, false)
        }
        Menu.clean(f);
        Menu.selection[f] = a;
        if (this.className.length) {
            this.className += " open"
        } else {
            this.className = "open"
        }
    },
    elemClick: function(a) {
        Menu._hide();
        a()
    },
    getIframe: function(a) {
        var b;
        if (Menu.iframes[a] == null) {
            b = ce("iframe");
            b.src = "javascript:0;";
            b.frameBorder = 0;
            ae(ge("layers"), b);
            Menu.iframes[a] = b
        } else {
            b = Menu.iframes[a]
        }
        return b
    },
    getDiv: function(a, b) {
        var c;
        if (Menu.divs[a] == null) {
            c = ce("div");
            c.className = "menu";
            ae(ge("layers"), c);
            Menu.divs[a] = c
        } else {
            c = Menu.divs[a]
        }
        c.i = a;
        c.menuArray = b;
        return c
    },
    showDepth: function(M, c, C, B, N, F, z, v) {
        var W, T = Menu.getDiv(M, c);
        while (T.firstChild) {
            de(T.firstChild)
        }
        var u = ce("table"),
            A = ce("tbody"),
            R = ce("tr"),
            e = ce("td"),
            P = ce("div"),
            J = ce("div");
        var I = 999;
        var b = openDB_getWindowSize(),
            l = openDB_getScroll(),
            f = b.w,
            n = b.h,
            V = l.x,
            O = l.y;
        if (N > 0 && (M > 0 || c.length > 20)) {
            if ((25 + 1) * c.length > n - 25 - z) {
                for (var L = 2; L < 4; ++L) {
                    if (N / L * c.length + 30 < n - z) {
                        break
                    }
                }
                I = Math.floor(c.length / L)
            }
        }
        var r = 0;
        var K = 0;
        for (var L = 0, t = c.length; L < t; ++L) {
            var Q = c[L];
            if (Q[0] == null) {
                var q = ce("span");
                q.className = "separator";
                ns(q);
                ae(q, ct(Q[1]));
                q.d = T;
                q.onmouseover = Menu.sepOver;
                ae(J, q)
            } else {
                var U = ce("a");
                U.d = T;
                U.k = K++;
                U.i = L;
                if (Q[2]) {
                    if (Menu.currentLink && Menu.currentLink.menuappend) {
                        if (Q[2].indexOf(Menu.currentLink.menuappend) == -1) {
                            U.href = Q[2] + Menu.currentLink.menuappend
                        } else {
                            U.href = Q[2]
                        }
                    } else {
                        if (typeof Q[2] == "function") {
                            U.href = "javascript:;";
                            U.onclick = Menu.elemClick.bind(0, Q[2]);
                            ns(U)
                        } else {
                            U.href = Q[2]
                        }
                    }
                } else {
                    U.href = "javascript:;";
                    U.style.cursor = "default";
                    ns(U)
                }
                U.onmouseover = Menu.elemOver;
                var G = ce("span"),
                    S = ce("span");
                if (Q[3] != null) {
                    G.className = "menusub"
                }
                if (Q.checked) {
                    S.className = "menucheck"
                }
                if (Q.newWindow) {
                    U.target = "_blank"
                }
                if (Q.className != null) {
                    G.className = Q.className
                }
                if (Q.tinyIcon) {
                    S.style.background = "url(https://cdn.openwow.com/" + qsUrl + "/icons/small/" + Q.tinyIcon.toLowerCase() + ".jpg) left center no-repeat"
                } else {
                    if (Q.socketColor) {
                        S.className += " socket-" + openDB_file_gems[Q.socketColor]
                    } else {
                        if (Q.smallIcon) {
                            U.style.padding = 0;
                            S.style.padding = "4px 18px 4px 28px";
                            S.style.background = "url(https://cdn.openwow.com/images/icon_border_small.gif) left center no-repeat transparent";
                            G.style.background = "url(https://cdn.openwow.com/" + qsUrl + "/icons/small/" + Q.smallIcon.toLowerCase() + ".jpg) 4px 3px no-repeat transparent"
                        }
                    }
                }
                ae(S, ct(Q[1]));
                ae(G, S);
                ae(U, G);
                ae(J, U)
            }
            if (r++ == I) {
                P.onmouseover = Menu.divOver;
                P.onmouseout = Menu.divOut;
                ae(P, J);
                if (!Browser.ie6) {
                    var H = ce("p");
                    ae(H, ce("em"));
                    ae(H, ce("var"));
                    ae(H, ce("strong"));
                    ae(H, P);
                    ae(e, H)
                } else {
                    ae(e, P)
                }
                ae(R, e);
                e = ce("td");
                H = ce("p");
                P = ce("div");
                J = ce("div");
                r = 0
            }
        }
        P.onmouseover = Menu.divOver;
        P.onmouseout = Menu.divOut;
        ae(P, J);
        if (!Browser.ie6) {
            if (I != 999) {
                var H = ce("p");
                ae(H, ce("em"));
                ae(H, ce("var"));
                ae(H, ce("strong"));
                ae(H, P);
                ae(e, H)
            } else {
                ae(T, ce("em"));
                ae(T, ce("var"));
                ae(T, ce("strong"));
                ae(e, P)
            }
        } else {
            ae(e, P)
        }
        ae(R, e);
        ae(A, R);
        ae(u, A);
        ae(T, u);
        T.style.left = T.style.top = "-2323px";
        T.style.display = "";
        var g = u.offsetWidth,
            o = u.offsetHeight,
            E = true,
            D = true;
        if (!Browser.ie6) {
            g += 5;
            o += 6
        }
        if (C + g > f + V || c.rightAligned) {
            E = false
        }
        if (E) {
            if (C + F + g > f) {
                C = Math.max(0, C - g)
            } else {
                if (M > 0) {
                    C += F
                }
            }
        } else {
            C = C + F - g;
            if (Browser.ie) {
                C -= 3
            }
        }
        if ((M > 0 || v) && B + o > n + O) {
            B = Math.max(O + 5, n + O - o)
        }
        T.style.left = C + "px";
        T.style.top = B + "px";
        if (Browser.ie6) {
            W = Menu.getIframe(M);
            W.style.left = C + "px";
            W.style.top = B + "px";
            W.style.width = g + "px";
            W.style.height = o + "px";
            W.style.display = "";
            W.style.visibility = "visible"
        }
        T.style.visibility = "visible";
        if (Browser.opera) {
            T.style.display = "none";
            T.style.display = ""
        }
    },
    divOver: function() {
        clearTimeout(Menu.timer)
    },
    divOut: function() {
        clearTimeout(Menu.timer);
        Menu.timer = setTimeout(Menu._hide, 333)
    },
    truncate: function(b) {
        var c;
        while (Menu.selection.length - 1 > b) {
            c = Menu.selection.length - 1;
            Menu.divs[c].style.display = "none";
            Menu.divs[c].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[c].style.display = "none"
            }
            Menu.selection.pop()
        }
    },
    clean: function(b) {
        for (var c = b; c < Menu.selection.length; ++c) {
            if (Menu.selection[c] != -1) {
                var e = gE(Menu.divs[c], "a")[Menu.selection[c]];
                if (e.className.indexOf("sub") != -1) {
                    e.className = "sub"
                } else {
                    e.className = ""
                }
                Menu.selection[c] = -1
            }
        }
    },
    append: function(b, c) {
        b[2] += c;
        if (b[3] != null) {
            Menu._append(b[3], c)
        }
    },
    _append: function(b, d) {
        var e, g = 0;
        for (var c = 0; c < b.length; ++c) {
            var f = b[c][2].indexOf("&filter=");
            if (f != -1 && d.indexOf("&filter=") == 0) {
                d = Menu._fixCollision(b[c][2].substr(f), d)
            }
            b[c][2] += d;
            if (b[c][3]) {
                Menu._append(b[c][3], d)
            }
        }
    },
    _splitFilter: function(b) {
        var g = b.substr(8).split(";"),
            c = {};
        for (var e = 0, a = g.length; e < a; ++e) {
            var h = g[e].indexOf("="),
                d, f;
            if (h != -1) {
                d = g[e].substr(0, h);
                f = g[e].substr(h + 1)
            } else {
                d = g[e];
                f = ""
            }
            c[d] = f
        }
        return c
    },
    _fixCollision: function(d, a) {
        var b = Menu._splitFilter(d),
            c = Menu._splitFilter(a);
        a = "";
        for (var e in c) {
            if (!b[e] && e != "sl" && e != "cl") {
                a += ";";
                a += e + "=" + c[e]
            }
        }
        return a
    },
    fixUrls: function(g, c, e, b, f) {
        if (!f) {
            f = 0
        }
        for (var d = 0, a = g.length; d < a; ++d) {
            if (g[d][2] == null) {
                g[d][2] = c + g[d][0] + (e ? e : "")
            }
            if (g[d][3]) {
                if (b == true || (typeof b == "object" && b[f] == true)) {
                    Menu.fixUrls(g[d][3], c, e, b, f + 1)
                } else {
                    Menu.fixUrls(g[d][3], c + g[d][0] + ".", e, b, f + 1)
                }
            }
        }
    },
    addButtons: function(h, g) {
        for (var e = 0, b = g.length; e < b; ++e) {
            if (g[e][0] == null) {
                continue
            }
            var c = ce("a"),
                f = ce("span");
            if (g[e][2]) {
                c.href = g[e][2]
            } else {
                c.href = "javascript:;";
                c.style.cursor = "default";
                c.style.textDecoration = "none";
                ns(c)
            }
            if (g[e][3] != null) {
                c.menu = g[e][3];
                c.onmouseover = Menu.show;
                c.onmouseout = Menu.hide
            } else {
                c.onmouseover = Menu._hide
            }
            ae(f, ct(g[e][1]));
            ae(c, f);
            ae(h, c)
        }
    },
    explode: function(f) {
        var d = [],
            e = null,
            c;
        for (var b = 0, a = f.length; b < a; ++b) {
            if (f[b][0] != null) {
                if (e != null) {
                    c.push(f[b])
                } else {
                    d.push(f[b])
                }
            }
            if (e != null && (f[b][0] == null || b == a - 1)) {
                d.push([0, e[1], , c])
            }
            if (f[b][0] == null) {
                e = f[b];
                c = []
            }
        }
        return d
    }
};

function Tabs(a) {
    cO(this, a);
    if (this.parent) {
        this.parent = $(this.parent)
    } else {
        return
    }
    this.oldMode = (Browser.geckoVersion > 20000000 && Browser.geckoVersion <= 20060414);
    this.selectedTab = -1;
    this.uls = [];
    this.tabs = [];
    this.nShows = 0;
    if (this.poundable == null) {
        this.poundable = 1
    }
    this.poundedTab = null;
    if (this.onLoad == null) {
        this.onLoad = Tabs.onLoad.bind(this)
    }
    if (this.onShow == null) {
        this.onShow = Tabs.onShow.bind(this)
    }
    if (this.onHide) {
        this.onHide = this.onHide.bind(this)
    }
}
Tabs.prototype = {
    add: function(a, d) {
        var c, b = this.tabs.length;
        c = {
            caption: a,
            index: b,
            owner: this
        };
        cO(c, d);
        this.tabs.push(c);
        return b
    },
    del: function(a) {
        if (this.tabs[a]) {
            ge("tab-" + this.tabs[a].id).style.display = "none";
            this.selectedTab = -1;
            this.uls = [];
            this.tabs.splice(a, 1);
            this.nShows = 0;
            while (this.parent.firstChild) {
                de(this.parent.firstChild)
            }
            this.flush()
        }
    },
    focus: function(a) {
        if (a < 0) {
            a = this.tabs.length + a
        }
        this.forceScroll = 1;
        gE(this.uls[this.oldMode ? 0 : 2], "a")[a].onclick({}, true);
        this.forceScroll = null
    },
    show: function(c, e) {
        var b;
        if (isNaN(c) || c < 0) {
            c = 0
        } else {
            if (c >= this.tabs.length) {
                c = this.tabs.length - 1
            }
        }
        if (e == null && c == this.selectedTab) {
            return
        }
        if (this.selectedTab != -1) {
            b = this.tabs[this.selectedTab];
            if (this.onHide && !this.onHide(b)) {
                return
            }
            if (b.onHide && !b.onHide()) {
                return
            }
        }++this.nShows;
        var a = this.oldMode ? 0 : 3;
        for (var d = 0; d <= a; ++d) {
            b = gE(this.uls[d], "a");
            if (this.selectedTab != -1) {
                b[this.selectedTab].className = ""
            }
            if (b[c] != null && b[c] != undefined) {
                b[c].className = "selected"
            } else {
                $j(".iclistingW").hide();
                break
            }
        }
        b = this.tabs[c];
        if (b.onLoad) {
            b.onLoad();
            b.onLoad = null
        }
        this.onShow(this.tabs[c], this.tabs[this.selectedTab]);
        if (b.onShow) {
            b.onShow(this.tabs[this.selectedTab])
        }
        this.selectedTab = c
    },
    flush: function(p) {
        if (this.oldMode) {
            var m, s, e, r;
            m = ce("ul");
            m.className = "old-tabs";
            for (var k = 0; k < this.tabs.length; ++k) {
                var f = this.tabs[k];
                s = ce("li");
                e = ce("div");
                r = ce("a");
                if (this.poundable) {
                    r.href = "#" + f.id
                } else {
                    r.href = "javascript:;"
                }
                ns(r);
                r.onclick = Tabs.onClick.bind(f, r);
                ae(r, ct(f.caption));
                ae(s, e);
                ae(s, r);
                ae(m, s)
            }
            this.uls[0] = m;
            ae(this.parent, m);
            var t = ce("div");
            t.style.cssFloat = t.style.styleFloat = "left";
            ae(this.parent, t)
        } else {
            var t, g, r, q, o, c;
            var n = ce("div");
            n.className = "tabs-container";
            o = ce("div");
            o.style.visibility = "hidden";
            this.uls[0] = ce("ul");
            this.uls[0].className = "tabs";
            ae(o, this.uls[0]);
            ae(n, o);
            o = ce("div");
            o.className = "tabs-levels";
            for (var k = 1; k <= 3; ++k) {
                c = ce("div");
                c.className = "tabs-level";
                this.uls[k] = ce("ul");
                this.uls[k].className = "tabs";
                this.uls[k].style.top = (-30 * (3 - k)) + "px";
                ae(c, this.uls[k]);
                ae(o, c)
            }
            ae(n, o);
            for (var k = 0; k < this.tabs.length; ++k) {
                var f = this.tabs[k];
                for (var h = 0; h <= 3; ++h) {
                    g = ce("li");
                    r = ce("a");
                    q = ce("b");
                    if (this.poundable) {
                        r.href = "#" + f.id
                    } else {
                        r.href = "javascript:;"
                    }
                    if (h > 0) {
                        ns(r);
                        r.onclick = Tabs.onClick.bind(f, r)
                    }
                    if (!Browser.ie6) {
                        o = ce("div");
                        ae(o, ct(f.caption));
                        ae(r, o)
                    }
                    ae(q, ct(f.caption));
                    ae(r, q);
                    ae(g, r);
                    ae(this.uls[h], g)
                }
            }
            ae(this.parent, n)
        }
        if (this.onLoad) {
            t = this.onLoad();
            if (t != null) {
                this.poundedTab = p = t
            }
        }
        this.show(p)
    },
    setTabName: function(d, c) {
        var a = this.oldMode ? 0 : 3;
        this.tabs[d].caption = c;
        for (var e = 0; e <= a; ++e) {
            var b = gE(this.uls[e], "a");
            openDB_setTextNodes(b[d], c)
        }
    },
    setTabPound: function(d, a) {
        if (!this.poundable) {
            return
        }
        var b = this.oldMode ? 0 : 3;
        for (var e = 0; e <= b; ++e) {
            var c = gE(this.uls[e], "a");
            c[d].href = "#" + this.tabs[d].id + ":" + a
        }
    },
    getSelectedTab: function() {
        return this.selectedTab
    }
};
Tabs.onClick = function(b, g, f) {
    if (f == null && this.index == this.owner.selectedTab) {
        return
    }
    var d = rf2(g);
    if (d == null) {
        return
    }
    this.owner.show(this.index, f);
    if (this.owner.poundable) {
        var c = b.href.indexOf("#");
        c != -1 && location.replace(b.href.substr(c))
    }
    return d
};
Tabs.onLoad = function() {
    if (!this.poundable || !location.hash.length) {
        return
    }
    var a = location.hash.substr(1).split(":")[0];
    if (a) {
        return in_array(this.tabs, a, function(b) {
            return b.id
        })
    }
};
Tabs.onShow = function(d, e) {
    var b;
    if (e) {
        ge("tab-" + e.id).style.display = "none"
    }
    b = ge("tab-" + d.id);
    b.style.display = "";
    if ((this.nShows == 1 && this.poundedTab != null && this.poundedTab >= 0) || this.forceScroll) {
        var c, a;
        if (this.__st) {
            c = this.__st;
            a = 15
        } else {
            c = b;
            a = this.parent.offsetHeight + 15
        }
        if (Browser.ie) {
            setTimeout(openDB_scrollTo.bind(this, c, a), 1)
        } else {
            openDB_scrollTo(c, a)
        }
    }
};
var Icon = {
    sizes: ["small", "medium", "large"],
    sizes2: [18, 36, 56],
    create: function(c, k, h, b, e, j) {
        var g = ce("div"),
            d = ce("ins"),
            f = ce("del");
        if (k == null) {
            k = 1
        }
        g.className = "icon" + Icon.sizes[k];
        ae(g, d);
        ae(g, f);
        Icon.setTexture(g, k, c);
        if (b) {
            var i = ce("a");
            i.href = b;
            ae(g, i)
        } else {
            g.ondblclick = Icon.onDblClick
        }
        Icon.setNumQty(g, e, j);
        return g
    },
    setTexture: function(d, c, b) {
        if (!b) {
            return
        }
        var a = d.firstChild.style;
        if (b.indexOf("?") != -1) {
            a.backgroundImage = "url(" + b + ")"
        } else {
            a.backgroundImage = "url(https://cdn.openwow.com/" + qsUrl + "/icons/" + Icon.sizes[c] + "/" + b.toLowerCase() + ".jpg)"
        }
        Icon.moveTexture(d, c, 0, 0)
    },
    moveTexture: function(d, c, a, e) {
        var b = d.firstChild.style;
        if (a || e) {
            b.backgroundPosition = (-a * Icon.sizes2[c]) + "px " + (-e * Icon.sizes2[c]) + "px"
        } else {
            if (b.backgroundPosition) {
                b.backgroundPosition = ""
            }
        }
    },
    setNumQty: function(e, c, f) {
        var b = gE(e, "span");
        for (var d = 0, a = b.length; d < a; ++d) {
            if (b[d]) {
                de(b[d])
            }
        }
        if (c != null && ((c > 1 && c < 2147483647) || c.length)) {
            b = openDB_createGlow(c, "q1");
            b.style.right = "0";
            b.style.bottom = "0";
            b.style.position = "absolute";
            ae(e, b)
        }
        if (f != null && f > 0) {
            b = openDB_createGlow("(" + f + ")", "q");
            b.style.left = "0";
            b.style.top = "0";
            b.style.position = "absolute";
            ae(e, b)
        }
    },
    getLink: function(a) {
        return gE(a, "a")[0]
    },
    onDblClick: function() {
        if (this.firstChild) {
            var b = this.firstChild.style;
            if (b.backgroundImage.length && b.backgroundImage.indexOf("url(https://openwow.com") == 0) {
                var c = b.backgroundImage.lastIndexOf("/"),
                    a = b.backgroundImage.indexOf(".jpg");
                if (c != -1 && a != -1) {
                    prompt("", b.backgroundImage.substring(c + 1, a))
                }
            }
        }
    }
};
var Tooltip = {
    create: function(h) {
        var f = ce("div"),
            k = ce("table"),
            b = ce("tbody"),
            e = ce("tr"),
            c = ce("tr"),
            a = ce("td"),
            j = ce("th"),
            i = ce("th"),
            g = ce("th");
        f.className = "tooltip";
        j.style.backgroundPosition = "top right";
        i.style.backgroundPosition = "bottom left";
        g.style.backgroundPosition = "bottom right";
        if (h) {
            a.innerHTML = h
        }
        ae(e, a);
        ae(e, j);
        ae(b, e);
        ae(c, i);
        ae(c, g);
        ae(b, c);
        ae(k, b);
        Tooltip.icon = ce("p");
        Tooltip.icon.style.visibility = "hidden";
        ae(Tooltip.icon, ce("div"));
        ae(f, Tooltip.icon);
        ae(f, k);
        return f
    },
    fix: function(d, b, f) {
        var e = gE(d, "table")[0],
            h = gE(e, "td")[0],
            g = h.childNodes;
        if (g.length >= 2 && g[0].nodeName == "TABLE" && g[1].nodeName == "TABLE") {
            g[0].style.whiteSpace = "nowrap";
            var a;
            if (g[1].offsetWidth > 300) {
                a = Math.max(300, g[0].offsetWidth) + 20
            } else {
                a = Math.max(g[0].offsetWidth, g[1].offsetWidth) + 20
            }
            if (a > 20) {
                d.style.width = a + "px";
                g[0].style.width = g[1].style.width = "100%";
                if (!b && d.offsetHeight > document.body.clientHeight) {
                    e.className = "shrink"
                }
            }
        }
        if (f) {
            d.style.visibility = "visible"
        }
    },
    fixSafe: function(c, b, a) {
        if (Browser.ie) {
            setTimeout(Tooltip.fix.bind(this, c, b, a), 1)
        } else {
            Tooltip.fix(c, b, a)
        }
    },
    append: function(c, b) {
        var c = $(c);
        var a = Tooltip.create(b);
        ae(c, a);
        Tooltip.fixSafe(a, 1, 1)
    },
    prepare: function() {
        if (Tooltip.tooltip) {
            return
        }
        var b = Tooltip.create();
        b.style.position = "absolute";
        b.style.left = b.style.top = "-2323px";
        var a = ge("layers");
        ae(a, b);
        Tooltip.tooltip = b;
        Tooltip.tooltipTable = gE(b, "table")[0];
        Tooltip.tooltipTd = gE(b, "td")[0];
        if (Browser.ie6) {
            b = ce("iframe");
            b.src = "javascript:0;";
            b.frameBorder = 0;
            ae(a, b);
            Tooltip.iframe = b
        }
    },
    set: function(b) {
        var a = Tooltip.tooltip;
        a.style.width = "550px";
        a.style.left = "-2323px";
        a.style.top = "-2323px";
        Tooltip.tooltipTd.innerHTML = b;
        a.style.display = "";
        Tooltip.fix(a, 0, 0)
    },
    moveTests: [
        [null, null],
        [null, false],
        [false, null],
        [false, false]
    ],
    move: function(m, l, d, n, c, a) {
        if (!Tooltip.tooltipTable) {
            return
        }
        var k = Tooltip.tooltip,
            g = Tooltip.tooltipTable.offsetWidth,
            b = Tooltip.tooltipTable.offsetHeight,
            o;
        k.style.width = g + "px";
        var j, e;
        for (var f = 0, h = Tooltip.moveTests.length; f < h; ++f) {
            o = Tooltip.moveTests[f];
            j = Tooltip.moveTest(m, l, d, n, c, a, o[0], o[1]);
            e = true;
            break
        }
        k.style.left = j.l + "px";
        k.style.top = j.t + "px";
        k.style.visibility = "visible";
        if (Browser.ie6 && Tooltip.iframe) {
            var o = Tooltip.iframe;
            o.style.left = j.l + "px";
            o.style.top = j.t + "px";
            o.style.width = g + "px";
            o.style.height = b + "px";
            o.style.display = "";
            o.style.visibility = "visible"
        }
    },
    moveTest: function(e, l, n, w, c, a, m, b) {
        var k = e,
            v = l,
            f = Tooltip.tooltip,
            i = Tooltip.tooltipTable.offsetWidth,
            p = Tooltip.tooltipTable.offsetHeight,
            g = openDB_getWindowSize(),
            j = openDB_getScroll(),
            h = g.w,
            o = g.h,
            d = j.x,
            u = j.y,
            t = d,
            s = u,
            r = d + h,
            q = u + o;
        if (m == null) {
            m = (e + n + i <= r)
        }
        if (b == null) {
            b = (l - p >= s)
        }
        if (m) {
            e += n + c
        } else {
            e = Math.max(e - i, t) - c
        }
        if (b) {
            l -= p + a
        } else {
            l += w + a
        }
        if (e < t) {
            e = t
        } else {
            if (e + i > r) {
                e = r - i
            }
        }
        if (l < s) {
            l = s
        } else {
            if (l + p > q) {
                l = Math.max(u, q - p)
            }
        }
        if (Tooltip.iconVisible) {
            if (k >= e - 48 && k <= e && v >= l - 4 && v <= l + 48) {
                l -= 48 - (v - l)
            }
        }
        return openDB_createRect(e, l, i, p)
    },
    show: function(f, e, d, b, c) {
        if (Tooltip.disabled) {
            return
        }
        if (!d || d < 1) {
            d = 1
        }
        if (!b || b < 1) {
            b = 1
        }
        if (c) {
            e = '<span class="' + c + '">' + e + "</span>"
        }
        var a = ac(f);
        Tooltip.prepare();
        Tooltip.set(e);
        Tooltip.move(a.x, a.y, f.offsetWidth, f.offsetHeight, d, b)
    },
    showAtCursor: function(d, f, c, a, b) {
        if (Tooltip.disabled) {
            return
        }
        if (!c || c < 10) {
            c = 10
        }
        if (!a || a < 10) {
            a = 10
        }
        if (b) {
            f = '<span class="' + b + '">' + f + "</span>"
        }
        d = $E(d);
        var g = openDB_getCursorPos(d);
        Tooltip.prepare();
        Tooltip.set(f);
        Tooltip.move(g.x, g.y, 0, 0, c, a)
    },
    showAtXY: function(d, a, e, c, b) {
        if (Tooltip.disabled) {
            return
        }
        Tooltip.prepare();
        Tooltip.set(d);
        Tooltip.move(a, e, 0, 0, c, b)
    },
    cursorUpdate: function(b, a, d) {
        if (Tooltip.disabled || !Tooltip.tooltip) {
            return
        }
        b = $E(b);
        if (!a || a < 10) {
            a = 10
        }
        if (!d || d < 10) {
            d = 10
        }
        var c = openDB_getCursorPos(b);
        Tooltip.move(c.x, c.y, 0, 0, a, d)
    },
    hide: function() {
        if (Tooltip.tooltip) {
            Tooltip.tooltip.style.display = "none";
            Tooltip.tooltip.visibility = "hidden";
            Tooltip.tooltipTable.className = "";
            if (Browser.ie6) {
                Tooltip.iframe.style.display = "none"
            }
            Tooltip.setIcon(null)
        }
    },
    setIcon: function(a) {
        Tooltip.prepare();
        if (a) {
            Tooltip.icon.style.backgroundImage = "url(https://cdn.openwow.com/" + qsUrl + "/icons/medium/" + a.toLowerCase() + ".jpg)";
            Tooltip.icon.style.visibility = "visible"
        } else {
            Tooltip.icon.style.backgroundImage = "none";
            Tooltip.icon.style.visibility = "hidden"
        }
        Tooltip.iconVisible = a ? 1 : 0
    }
};
var openDB_listviews = {};

function Listview(a) {
    cO(this, a);
    if (this.id) {
        var m = (this.tabs ? "tab-" : "lv-") + this.id;
        if (this.parent) {
            var k = ce("div");
            k.id = m;
            ae($(this.parent), k);
            this.container = k
        } else {
            this.container = ge(m)
        }
    } else {
        return
    }
    if (this.template && Listview.templates[this.template]) {
        this.template = Listview.templates[this.template]
    } else {
        return
    }
    openDB_listviews[this.id] = this;
    if (this.data == null) {
        this.data = []
    }
    if (this.poundable == null) {
        if (this.template.poundable != null) {
            this.poundable = this.template.poundable
        } else {
            this.poundable = true
        }
    }
    if (this.searchable == null) {
        if (this.template.searchable != null) {
            this.searchable = this.template.searchable
        } else {
            this.searchable = false
        }
    }
    if (this.filtrable == null) {
        if (this.template.filtrable != null) {
            this.filtrable = this.template.filtrable
        } else {
            this.filtrable = false
        }
    }
    if (this.data.length == 1) {
        this.filtrable = false;
        this.searchable = false
    }
    if (this.searchable && this.searchDelay == null) {
        if (this.template.searchDelay != null) {
            this.searchDelay = this.template.searchDelay
        } else {
            this.searchDelay = 333
        }
    }
    if (this.hideBands == null) {
        this.hideBands = this.template.hideBands
    }
    if (this.hideNav == null) {
        this.hideNav = this.template.hideNav
    }
    if (this.hideHeader == null) {
        this.hideHeader = this.template.hideHeader
    }
    if (this.hideCount == null) {
        this.hideCount = this.template.hideCount
    }
    if (this.computeDataFunc == null && this.template.computeDataFunc != null) {
        this.computeDataFunc = this.template.computeDataFunc
    }
    if (this.createCbControls == null && this.template.createCbControls != null) {
        this.createCbControls = this.template.createCbControls
    }
    if (this.template.onBeforeCreate != null) {
        if (this.onBeforeCreate == null) {
            this.onBeforeCreate = this.template.onBeforeCreate
        } else {
            this.onBeforeCreate = [this.template.onBeforeCreate, this.onBeforeCreate]
        }
    }
    if (this.onAfterCreate == null && this.template.onAfterCreate != null) {
        this.onAfterCreate = this.template.onAfterCreate
    }
    if (this.createNote == null && this.template.createNote != null) {
        this.createNote = this.template.createNote
    }
    if (this.customFilter == null && this.template.customFilter != null) {
        this.customFilter = this.template.customFilter
    }
    if (this.customFilter) {
        this.customFilter = this.customFilter.bind(this)
    }
    if (this.clip == null && this.template.clip != null) {
        this.clip = this.template.clip
    }
    if (this.mode == null) {
        this.mode = this.template.mode
    }
    if (this.nItemsPerPage == null) {
        if (this.template.nItemsPerPage != null) {
            this.nItemsPerPage = this.template.nItemsPerPage
        } else {
            this.nItemsPerPage = 50
        }
    }
    this.nItemsPerPage |= 0;
    if (this.nItemsPerPage <= 0) {
        this.nItemsPerPage = 0
    }
    this.nFilters = 0;
    this.resetRowVisibility();
    if (this.mode == Listview.MODE_TILED) {
        if (this.nItemsPerRow == null) {
            var q = this.template.nItemsPerRow;
            this.nItemsPerRow = (q != null ? q : 4)
        }
        this.nItemsPerRow |= 0;
        if (this.nItemsPerRow <= 1) {
            this.nItemsPerRow = 1
        }
    } else {
        this.nItemsPerRow = 1
    }
    this.columns = [];
    for (var e = 0, j = this.template.columns.length; e < j; ++e) {
        var p = this.template.columns[e],
            c = {};
        cO(c, p);
        this.columns.push(c)
    }
    if (this.extraCols != null) {
        for (var e = 0, j = this.extraCols.length; e < j; ++e) {
            var l = null;
            var b = this.extraCols[e];
            if (b.after || b.before) {
                var h = in_array(this.columns, (b.after ? b.after : b.before), function(d) {
                    return d.id
                });
                if (h != -1) {
                    l = (b.after ? h + 1 : h - 1)
                }
            }
            if (l == null) {
                l = this.columns.length
            }
            this.columns.splice(l, 0, b)
        }
    }
    this.visibility = [];
    var n = [],
        o = [];
    if (this.visibleCols != null) {
        array_walk(this.visibleCols, function(d) {
            n[d] = 1
        })
    }
    if (this.hiddenCols != null) {
        array_walk(this.hiddenCols, function(d) {
            o[d] = 1
        })
    }
    for (var e = 0, j = this.columns.length; e < j; ++e) {
        var b = this.columns[e];
        if (n[b.id] != null || (!b.hidden && o[b.id] == null)) {
            this.visibility.push(e)
        }
    }
    if (this.sort == null && this.template.sort) {
        this.sort = this.template.sort.slice(0)
    } else {
        if (this.sort != null) {
            var g = this.sort;
            this.sort = [];
            for (var e = 0, j = g.length; e < j; ++e) {
                var b = parseInt(g[e]);
                if (isNaN(b)) {
                    var f = 0;
                    if (g[e].charAt(0) == "-") {
                        f = 1;
                        g[e] = g[e].substring(1)
                    }
                    var h = in_array(this.columns, g[e], function(d) {
                        return d.id
                    });
                    if (h != -1) {
                        if (f) {
                            this.sort.push(-(h + 1))
                        } else {
                            this.sort.push(h + 1)
                        }
                    }
                } else {
                    this.sort.push(b)
                }
            }
        } else {
            this.sort = []
        }
    }
    if (this.tabs) {
        this.tabIndex = this.tabs.add(this.getTabName(), {
            id: this.id,
            onLoad: this.initialize.bind(this)
        })
    } else {
        this.initialize()
    }
}
Listview.MODE_DEFAULT = 0;
Listview.MODE_CHECKBOX = 99;
Listview.MODE_DIV = 2;
Listview.MODE_TILED = 3;
var nd = 1;
Listview.prototype = {
    initialize: function() {
        if (this.data.length) {
            if (this.computeDataFunc != null) {
                for (var d = 0, a = this.data.length; d < a; ++d) {
                    this.computeDataFunc(this.data[d])
                }
            }
        }
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.updateSortIndex();
        var b;
        if (this.onBeforeCreate != null) {
            if (typeof this.onBeforeCreate == "function") {
                b = this.onBeforeCreate()
            } else {
                for (var d = 0; d < this.onBeforeCreate.length; ++d) {
                    (this.onBeforeCreate[d].bind(this))()
                }
            }
        }
        this.noData = ce("div");
        this.noData.className = "listview-nodata text";
        if (this.mode == Listview.MODE_DIV) {
            this.mainContainer = this.mainDiv = ce("div");
            this.mainContainer.className = "listview-mode-div"
        } else {
            this.mainContainer = this.table = ce("table");
            this.table.setAttribute("cellpadding", "0");
            this.table.setAttribute("cellspacing", "0");
            this.thead = ce("thead");
            this.tbody = ce("tbody");
            if (this.mode == Listview.MODE_TILED) {
                this.table.className = "listview-mode-tiled";
                var e = (100 / this.nItemsPerRow) + "%",
                    f = ce("colgroup"),
                    c;
                for (var d = 0; d < this.nItemsPerRow; ++d) {
                    c = ce("col");
                    c.style.width = e;
                    ae(f, c)
                }
                ae(this.mainContainer, f)
            } else {
                this.table.className = "listview-mode-default";
                this.createHeader();
                this.updateSortArrow()
            }
            ae(this.table, this.thead);
            ae(this.table, this.tbody);
            if (this.mode == Listview.MODE_CHECKBOX && Browser.ie) {
                setTimeout(Listview.cbIeFix.bind(this), 1)
            }
        }
        this.createBands();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.applySort();
        this.refreshRows();
        if (this.onAfterCreate != null) {
            this.onAfterCreate(b)
        }
    },
    createHeader: function() {
        var h = ce("tr");
        if (this.mode == Listview.MODE_CHECKBOX) {
            var g = ce("th"),
                j = ce("div"),
                c = ce("a");
            g.style.width = "33px";
            c.href = "javascript:;";
            c.className = "listview-cb";
            ns(c);
            ae(c, ct(String.fromCharCode(160)));
            ae(j, c);
            ae(g, j);
            ae(h, g)
        }
        for (var f = 0, b = this.visibility.length; f < b; ++f) {
            var e = this.visibility[f],
                d = this.columns[e],
                g = ce("th");
            j = ce("div"), c = ce("a"), outerSpan = ce("span"), innerSpan = ce("span");
            d.__th = g;
            c.href = "javascript:;";
            if (this.filtrable && (d.filtrable == null || d.filtrable)) {
                c.onmouseup = Listview.headerClick.bind(this, d, e);
                c.onclick = c.oncontextmenu = rf
            } else {
                c.onclick = this.sortBy.bind(this, e + 1)
            }
            c.onmouseover = Listview.headerOver.bind(this, c, d);
            c.onmouseout = Tooltip.hide;
            ns(c);
            if (d.width != null) {
                g.style.width = d.width
            }
            if (d.align != null) {
                g.style.textAlign = d.align
            }
            if (d.span != null) {
                g.colSpan = d.span
            }
            ae(innerSpan, ct(d.name));
            ae(outerSpan, innerSpan);
            ae(c, outerSpan);
            ae(j, c);
            ae(g, j);
            ae(h, g)
        }
        if (this.hideHeader) {
            this.thead.style.display = "none"
        }
        ae(this.thead, h)
    },
    createBands: function() {
        var h = ce("div"),
            j = ce("div"),
            k = ce("div"),
            i = ce("div");
        this.bandTop = h;
        this.bandBot = j;
        this.noteTop = k;
        this.noteBot = i;
        h.className = "listview-band-top";
        j.className = "listview-band-bottom";
        this.navTop = this.createNav(true);
        this.navBot = this.createNav(false);
        k.className = i.className = "listview-note";
        if (this.note) {
            k.innerHTML = this.note
        } else {
            if (this.createNote) {
                this.createNote(k, i)
            }
        }
        if (!k.firstChild && this.mode != Listview.MODE_CHECKBOX) {
            ae(k, ct(String.fromCharCode(160)))
        }
        if (this.mode != Listview.MODE_CHECKBOX) {
            ae(i, ct(String.fromCharCode(160)))
        }
        ae(h, this.navTop);
        if (this.searchable) {
            var l = this.updateFilters.bind(this, true),
                d = (this._truncated ? "search-within-results2" : "search-within-results"),
                c = ce("span"),
                b = ce("em"),
                g = ce("a"),
                f = ce("input");
            c.className = "listview-qSearch";
            ae(c, b);
            g.href = "javascript:;";
            g.onclick = function() {
                var a = this.nextSibling;
                a.value = "";
                a.className = d;
                l()
            };
            g.style.display = "none";
            ae(g, ce("span"));
            ae(c, g);
            ns(g);
            f.setAttribute("type", "text");
            f.className = d;
            f.style.width = (this._truncated ? "19em" : "15em");
            openDB_onAfterTyping(f, l, this.searchDelay);
            f.onmouseover = function() {
                if (trim(this.value) != "") {
                    this.className = ""
                }
            };
            f.onfocus = function() {
                this.className = ""
            };
            f.onblur = function() {
                if (trim(this.value) == "") {
                    this.className = d;
                    this.value = ""
                }
            };
            if (Browser.ie) {
                setTimeout(function() {
                    f.value = ""
                }, 1)
            }
            ae(c, f);
            this.qSearchBox = f;
            this.qSearchGlass = b;
            this.qSearchClear = g
        }
        ae(h, k);
        ae(j, this.navBot);
        ae(j, i);
        if (this.mode == Listview.MODE_CHECKBOX) {
            if (this.note) {
                k.style.paddingBottom = "5px"
            }
            this.cbBarTop = this.createCbBar(true);
            this.cbBarBot = this.createCbBar(false);
            ae(h, this.cbBarTop);
            ae(j, this.cbBarBot);
            if (!this.noteTop.firstChild && !this.cbBarTop.firstChild) {
                this.noteTop.innerHTML = "&nbsp;"
            }
            if (!this.noteBot.firstChild && !this.cbBarBot.firstChild) {
                this.noteBot.innerHTML = "&nbsp;"
            }
            if (this.noteTop.firstChild && this.cbBarTop.firstChild) {
                this.noteTop.style.paddingBottom = "6px"
            }
            if (this.noteBot.firstChild && this.cbBarBot.firstChild) {
                this.noteBot.style.paddingBottom = "6px"
            }
        }
        if (this.hideBands & 1) {
            h.style.display = "none"
        }
        if (this.hideBands & 2) {
            j.style.display = "none"
        }
        $j(this.container).append(this.bandTop);
        if (this.clip) {
            var e = ce("div");
            e.className = "listview-clip";
            e.style.width = this.clip.w + "px";
            e.style.height = this.clip.h + "px";
            this.clipDiv = e;
            ae(e, this.mainContainer);
            ae(e, this.noData);
            ae(this.container, e)
        } else {
            ae(this.container, this.mainContainer);
            ae(this.container, this.noData)
        }
        ae(this.container, this.bandBot)
    },
    createNav: function(g) {
        var c = ce("div"),
            d = ce("a"),
            b = ce("a"),
            a = ce("a"),
            j = ce("a"),
            i = ce("span"),
            h = ce("b"),
            f = ce("b"),
            e = ce("b");
        c.className = "listview-nav";
        d.href = b.href = a.href = j.href = "javascript:;";
        ae(d, ct(String.fromCharCode(171) + LANG.lvpage_first));
        ae(b, ct(String.fromCharCode(8249) + LANG.lvpage_previous));
        ae(a, ct(LANG.lvpage_next + String.fromCharCode(8250)));
        ae(j, ct(LANG.lvpage_last + String.fromCharCode(187)));
        ns(d);
        ns(b);
        ns(a);
        ns(j);
        d.onclick = this.firstPage.bind(this);
        b.onclick = this.previousPage.bind(this);
        a.onclick = this.nextPage.bind(this);
        j.onclick = this.lastPage.bind(this);
        ae(h, ct("a"));
        ae(f, ct("a"));
        ae(e, ct("a"));
        ae(i, h);
        ae(i, ct(LANG.hyphen));
        ae(i, f);
        ae(i, ct(LANG.lvpage_of));
        ae(i, e);
        ae(c, d);
        ae(c, b);
        ae(c, i);
        ae(c, a);
        ae(c, j);
        if (g) {
            if (this.hideNav & 1) {
                c.style.display = "none"
            }
        } else {
            if (this.hideNav & 2) {
                c.style.display = "none"
            }
        }
        return c
    },
    createCbBar: function(a) {
        var b = ce("div");
        if (this.createCbControls) {
            this.createCbControls(b, a)
        }
        if (b.firstChild) {
            b.className = "listview-withselected" + (a ? "" : "2")
        }
        return b
    },
    refreshRows: function() {
        var a = (this.mode == Listview.MODE_DIV ? this.mainContainer : this.tbody);
        ee(a);
        if (this.nRowsVisible == 0) {
            if (!this.filtered) {
                this.bandTop.style.display = this.bandBot.style.display = "none";
                this.mainContainer.style.display = "none"
            }
            this.noData.style.display = "";
            this.showNoData();
            return
        }
        var n, b, c;
        if (!(this.hideBands & 1)) {
            this.bandTop.style.display = ""
        }
        if (!(this.hideBands & 2)) {
            this.bandBot.style.display = ""
        }
        if (this.nItemsPerPage > 0) {
            n = this.rowOffset;
            b = Math.min(n + this.nRowsVisible, n + this.nItemsPerPage);
            if (this.filtered && this.rowOffset > 0) {
                for (var f = 0, g = 0; f < this.data.length && g < this.rowOffset; ++f) {
                    var o = this.data[f];
                    if (o.__hidden || o.__deleted) {
                        ++n
                    } else {
                        ++g
                    }
                }
                b += (n - this.rowOffset)
            }
        } else {
            n = 0;
            b = this.nRowsVisible
        }
        var h = b - n;
        if (this.mode == Listview.MODE_DIV) {
            for (var e = 0; e < h; ++e) {
                var f = n + e,
                    o = this.data[f];
                if (!o) {
                    break
                }
                if (o.__hidden || o.__deleted) {
                    ++h;
                    continue
                }
                ae(this.mainDiv, this.getDiv(f))
            }
        } else {
            if (this.mode == Listview.MODE_TILED) {
                var d = 0,
                    l = ce("tr");
                for (var e = 0; e < h; ++e) {
                    var f = n + e,
                        o = this.data[f];
                    if (!o) {
                        break
                    }
                    if (o.__hidden || o.__deleted) {
                        ++h;
                        continue
                    }
                    ae(l, this.getCell(f));
                    if (++d == this.nItemsPerRow) {
                        ae(this.tbody, l);
                        if (e + 1 < h) {
                            l = ce("tr")
                        }
                        d = 0
                    }
                }
                if (d != 0) {
                    for (; d < 4; ++d) {
                        var m = ce("td");
                        m.className = "empty-cell";
                        ae(l, m)
                    }
                    ae(this.tbody, l)
                }
            } else {
                for (var e = 0; e < h; ++e) {
                    var f = n + e,
                        o = this.data[f];
                    if (!o) {
                        break
                    }
                    if (o.__hidden || o.__deleted) {
                        ++h;
                        continue
                    }
                    ae(this.tbody, this.getRow(f))
                }
            }
        }
        this.mainContainer.style.display = "";
        this.noData.style.display = "none"
    },
    showNoData: function() {
        var b = this.noData;
        ee(b);
        var a = -1;
        if (this.template.onNoData) {
            a = (this.template.onNoData.bind(this, b))()
        }
        if (a == -1) {
            ae(this.noData, ct(this.filtered ? LANG.lvnodata2 : LANG.lvnodata))
        }
    },
    getDiv: function(a) {
        var b = this.data[a];
        if (b.__div == null) {
            this.createDiv(b, a)
        }
        return b.__div
    },
    createDiv: function(b, a) {
        var c = ce("div");
        b.__div = c;
        (this.template.compute.bind(this, b, c, a))()
    },
    getCell: function(a) {
        var b = this.data[a];
        if (b.__div == null) {
            this.createCell(b, a)
        }
        return b.__td
    },
    createCell: function(b, a) {
        var c = ce("td");
        b.__td = c;
        (this.template.compute.bind(this, b, c, a))();
        if (this.template.getItemLink) {
            c.onclick = this.itemClick.bind(this, b)
        }
        if (Browser.ie6) {
            c.onmouseover = Listview.itemOver;
            c.onmouseout = Listview.itemOut
        }
    },
    getRow: function(a) {
        var b = this.data[a];
        if (b.__tr == null) {
            this.createRow(b)
        }
        return b.__tr
    },
    createRow: function(j) {
        var g = ce("tr");
        if (nd % 2) {
            g.className = "odd"
        } else {
            g.className = "even"
        }++nd;
        j.__tr = g;
        if (this.mode == Listview.MODE_CHECKBOX) {
            var c = ce("td");
            if (!j.__nochk) {
                c.className = "listview-cb";
                c.onclick = Listview.cbCellClick;
                var b = ce("input");
                ns(b);
                b.type = "checkbox";
                b.onclick = Listview.cbClick;
                if (j.__chk) {
                    b.checked = true;
                    if (Browser.ie) {
                        b.defaultChecked = true
                    }
                }
                j.__cb = b;
                ae(c, b)
            }
            ae(g, c)
        }
        for (var d = 0, e = this.visibility.length; d < e; ++d) {
            var f = this.visibility[d],
                a = this.columns[f],
                c = ce("td"),
                h;
            if (a.align != null) {
                c.style.textAlign = a.align
            }
            if (a.compute) {
                h = (a.compute.bind(this, j, c, g, f))()
            } else {
                if (j[a.value] != null) {
                    h = j[a.value]
                } else {
                    h = -1
                }
            }
            if (h != -1 && h != null) {
                c.insertBefore(ct(h), c.firstChild)
            }
            ae(g, c)
        }
        if (this.mode == Listview.MODE_CHECKBOX && j.__chk) {
            g.className = "checked"
        }
        if (this.template.getItemLink) {
            g.onclick = this.itemClick.bind(this, j)
        }
        if (Browser.ie6) {
            g.onmouseover = Listview.itemOver;
            g.onmouseout = Listview.itemOut
        }
    },
    itemClick: function(d, c) {
        c = $E(c);
        var a = 0,
            b = c._target;
        while (b && a < 3) {
            if (b.nodeName == "A") {
                return
            }
            b = b.parentNode
        }
        location.href = this.template.getItemLink(d)
    },
    validatePage: function() {
        var c = this.nItemsPerPage,
            b = this.rowOffset,
            a = this.nRowsVisible;
        if (b < 0) {
            this.rowOffset = 0
        } else {
            this.rowOffset = this.getRowOffset(b + c > a ? a - 1 : b)
        }
    },
    getRowOffset: function(b) {
        var a = this.nItemsPerPage;
        return (a > 0 && b > 0 ? Math.floor(b / a) * a : 0)
    },
    resetRowVisibility: function() {
        for (var b = 0, a = this.data.length; b < a; ++b) {
            this.data[b].__hidden = false
        }
        this.filtered = false;
        this.rowOffset = 0;
        this.nRowsVisible = this.data.length
    },
    getColText: function(b, a) {
        if (a.getVisibleText) {
            return a.getVisibleText(b)
        }
        if (a.getValue) {
            return a.getValue(b)
        }
        if (a.value) {
            return b[a.value]
        }
        if (a.compute) {
            return a.compute(b)
        }
        return ""
    },
    updateFilters: function(d) {
        Tooltip.hide();
        this.resetRowVisibility();
        var w, q, c;
        if (this.searchable) {
            w = trim(this.qSearchBox.value);
            if (w) {
                this.qSearchGlass.style.display = "none";
                this.qSearchClear.style.display = "";
                w = w.toLowerCase().replace(/\s+/g, " ");
                q = w.split(" ");
                c = q.length
            } else {
                this.qSearchGlass.style.display = "";
                this.qSearchClear.style.display = "none"
            }
        }
        if (!w && this.nFilters == 0 && this.customFilter == null) {
            if (d) {
                this.updateNav();
                this.refreshRows()
            }
            return
        }
        var z = {
            1: function(i, j) {
                return i > j
            },
            2: function(i, j) {
                return i == j
            },
            3: function(i, j) {
                return i < j
            },
            4: function(i, j) {
                return i >= j
            },
            5: function(i, j) {
                return i <= j
            },
            6: function(i, k, j) {
                return k <= i && i <= j
            }
        };
        var p = {
            1: function(j, i, k) {
                return i > k
            },
            2: function(j, i, k) {
                return j <= k && k <= i
            },
            3: function(j, i, k) {
                return j < k
            },
            4: function(j, i, k) {
                return i >= k
            },
            5: function(j, i, k) {
                return j <= k
            },
            6: function(j, i, B, k) {
                return B <= i && j <= k
            }
        };
        var o = 0;
        for (var u = 0, v = this.data.length; u < v; ++u) {
            var g = this.data[u],
                m = 0;
            nSearchMatches = 0, matches = [];
            g.__hidden = true;
            if (this.customFilter && !this.customFilter(g)) {
                continue
            }
            for (var t = 0, h = this.visibility.length; t < h; ++t) {
                var n = this.visibility[t];
                var e = this.columns[n];
                if (e.__filter) {
                    var a = e.__filter,
                        b = false;
                    if (e.type == null || e.type == "num") {
                        var r = null;
                        if (e.getValue) {
                            r = e.getValue(g)
                        } else {
                            if (e.value) {
                                r = parseFloat(g[e.value])
                            }
                        }
                        if (!r) {
                            r = 0
                        }
                        b = (z[a.type])(r, a.value, a.value2)
                    } else {
                        if (e.type == "range") {
                            var A = e.getMinValue(g),
                                y = e.getMaxValue(g);
                            b = (p[a.type])(A, y, a.value, a.value2)
                        } else {
                            var l = this.getColText(g, e);
                            if (l) {
                                l = l.toString().toLowerCase();
                                if (a.invert) {
                                    b = l.match(a.regex) != null
                                } else {
                                    var x = 0;
                                    for (var s = 0, f = a.words.length; s < f; ++s) {
                                        if (l.indexOf(a.words[s]) != -1) {
                                            ++x
                                        } else {
                                            break
                                        }
                                    }
                                    b = (x == a.words.length)
                                }
                            }
                        }
                    }
                    if (a.invert) {
                        b = !b
                    }
                    if (b) {
                        ++m
                    } else {
                        break
                    }
                }
                if (w) {
                    var l = this.getColText(g, e);
                    if (l) {
                        l = l.toString().toLowerCase();
                        for (var s = 0, f = q.length; s < f; ++s) {
                            if (!matches[s]) {
                                if (l.indexOf(q[s]) != -1) {
                                    matches[s] = 1;
                                    ++nSearchMatches
                                }
                            }
                        }
                    }
                }
            }
            if ((this.nFilters == 0 || m == this.nFilters) && (!w || nSearchMatches == c)) {
                g.__hidden = false;
                ++o
            }
        }
        this.filtered = (o < this.data.length);
        this.nRowsVisible = o;
        if (d) {
            this.updateNav();
            this.refreshRows()
        }
    },
    changePage: function() {
        this.validatePage();
        this.refreshRows();
        this.updateNav();
        this.updatePound();
        var a = openDB_getScroll(),
            b = ac(this.container);
        if (a.y > b[1]) {
            scrollTo(a.x, b[1])
        }
    },
    firstPage: function() {
        this.rowOffset = 0;
        this.changePage();
        return false
    },
    previousPage: function() {
        this.rowOffset -= this.nItemsPerPage;
        this.changePage();
        return false
    },
    nextPage: function() {
        this.rowOffset += this.nItemsPerPage;
        this.changePage();
        return false
    },
    lastPage: function() {
        this.rowOffset = 99999999;
        this.changePage();
        return false
    },
    addSort: function(a, c) {
        var b = in_array(a, Math.abs(c), function(d) {
            return Math.abs(d)
        });
        if (b != -1) {
            c = a[b];
            a.splice(b, 1)
        }
        a.splice(0, 0, c)
    },
    sortBy: function(a) {
        if (a <= 0 || a > this.columns.length) {
            return
        }
        if (Math.abs(this.sort[0]) == a) {
            this.sort[0] = -this.sort[0]
        } else {
            var b = -1;
            if (this.columns[a - 1].type == "text") {
                b = 1
            }
            this.addSort(this.sort, b * a)
        }
        this.applySort();
        this.refreshRows();
        this.updateSortArrow();
        this.updatePound()
    },
    applySort: function() {
        if (this.sort.length == 0) {
            return
        }
        Listview.sort = this.sort;
        Listview.columns = this.columns;
        if (this.indexCreated) {
            this.data.sort(Listview.sortIndexedRows)
        } else {
            this.data.sort(Listview.sortRows)
        }
        this.updateSortIndex()
    },
    setSort: function(b, c, a) {
        if (this.sort.toString() != b.toString()) {
            this.sort = b;
            this.applySort();
            if (c) {
                this.refreshRows()
            }
            if (a) {
                this.updatePound()
            }
        }
    },
    readPound: function() {
        if (!this.poundable || !location.hash.length) {
            return
        }
        var b = location.hash.substr(1);
        if (this.tabs) {
            var g = b.indexOf(":");
            if (g == -1) {
                return
            }
            b = b.substr(g + 1)
        }
        var a = parseInt(b);
        if (!isNaN(a)) {
            this.rowOffset = a;
            this.validatePage();
            if (this.poundable != 2) {
                var d = [];
                var f = b.match(/(\+|\-)[0-9]+/g);
                if (f != null) {
                    for (var c = f.length - 1; c >= 0; --c) {
                        var e = parseInt(f[c]) | 0;
                        var b = Math.abs(e);
                        if (b <= 0 || b > this.columns.length) {
                            break
                        }
                        this.addSort(d, e)
                    }
                    this.setSort(d, false, false)
                }
            }
            if (this.tabs) {
                this.tabs.setTabPound(this.tabIndex, this.getTabPound())
            }
        }
    },
    updateSortArrow: function() {
        if (!this.sort.length || !this.thead) {
            return
        }
        var a = in_array(this.visibility, Math.abs(this.sort[0]) - 1);
        if (a == -1) {
            return
        }
        if (this.mode == Listview.MODE_CHECKBOX) {
            a += 1
        }
        var b = this.thead.firstChild.childNodes[a].firstChild.firstChild.firstChild;
        if (this.lsa && this.lsa != b) {
            this.lsa.className = ""
        }
        b.className = (this.sort[0] < 0 ? "sortdesc" : "sortasc");
        this.lsa = b
    },
    updateSortIndex: function() {
        var b = this.data;
        for (var c = 0, a = b.length; c < a; ++c) {
            b[c].__si = c
        }
        this.indexCreated = true
    },
    updateTabName: function() {
        if (this.tabs && this.tabIndex != null) {
            this.tabs.setTabName(this.tabIndex, this.getTabName())
        }
    },
    updatePound: function() {
        if (!this.poundable) {
            return
        }
        var a = this.getTabPound();
        if (this.tabs) {
            this.tabs.setTabPound(this.tabIndex, a);
            location.replace("#" + this.id + ":" + a)
        } else {
            location.replace("#" + a)
        }
    },
    updateNav: function() {
        var e = [this.navTop, this.navBot],
            j = this.nItemsPerPage,
            h = this.rowOffset,
            d = this.nRowsVisible,
            g = 0,
            b = 0,
            f = 0,
            k = 0;
        if (d > 0) {
            if (!(this.hideNav & 1)) {
                e[0].style.display = ""
            }
            if (!(this.hideNav & 2)) {
                e[1].style.display = ""
            }
        } else {
            e[0].style.display = e[1].style.display = "none"
        }
        if (j) {
            if (h > 0) {
                b = 1;
                if (h >= j + j) {
                    g = 1
                }
            }
            if (h + j < d) {
                f = 1;
                if (h + j + j < d) {
                    k = 1
                }
            }
        }
        for (var c = 0; c < 2; ++c) {
            var a = e[c].childNodes;
            a[0].style.display = (g ? "" : "none");
            a[1].style.display = (b ? "" : "none");
            a[3].style.display = (f ? "" : "none");
            a[4].style.display = (k ? "" : "none");
            a = a[2].childNodes;
            a[0].firstChild.nodeValue = h + 1;
            a[2].firstChild.nodeValue = j ? Math.min(h + j, d) : d;
            a[4].firstChild.nodeValue = d
        }
    },
    getTabName: function() {
        var a = this.name,
            b = this.data.length;
        if (b > 0 && !this.hideCount) {
            a += sprintf(LANG.qty, b)
        }
        return a
    },
    getTabPound: function() {
        var a = "";
        a += this.rowOffset;
        if (this.poundable != 2 && this.sort.length) {
            a += ("+" + this.sort.join("+")).replace(/\+\-/g, "-")
        }
        return a
    },
    getCheckedRows: function() {
        var d = [];
        for (var c = 0, a = this.data.length; c < a; ++c) {
            var b = this.data[c];
            if ((b.__cb && b.__cb.checked) || (!b.__cb && b.__chk)) {
                d.push(b)
            }
        }
        return d
    },
    deleteRows: function(c) {
        if (!c || !c.length) {
            return
        }
        for (var b = 0, a = c.length; b < a; ++b) {
            var d = c[b];
            if (!d.__hidden && !d.__hidden) {
                this.nRowsVisible -= 1
            }
            d.__deleted = true
        }
        this.updateTabName();
        if (this.rowOffset >= this.nRowsVisible) {
            this.previousPage()
        } else {
            this.refreshRows();
            this.updateNav()
        }
    },
    setData: function(a) {
        this.data = a;
        this.indexCreated = false;
        this.resetRowVisibility();
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.applySort();
        this.updateSortArrow();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.refreshRows()
    },
    getClipDiv: function() {
        return this.clipDiv
    },
    getNoteTopDiv: function() {
        return this.noteTop
    },
    focusSearch: function() {
        this.qSearchBox.focus()
    },
    clearSearch: function() {
        this.qSearchBox.value = ""
    },
    createIndicator: function(b, e, g) {
        if (!this.noteIndicators) {
            this.noteIndicators = ce("div");
            this.noteIndicators.className = "listview-indicators";
            $j(this.noteIndicators).insertBefore($j(this.noteTop))
        }
        var d = this.tabClick;
        $j(this.noteIndicators).append($j('<span class="indicator"></span>').html(b).append(!e ? "" : $j('<a class="indicator-x" style="outline: none">[x]</a>').attr("href", (typeof e == "function" ? "javascript:;" : e)).click(function() {
            if (d) {
                d()
            }
            if (typeof e == "function") {
                e()
            }
        })).css("cursor", (typeof g == "function" ? "pointer" : null)).click(function() {
            if (d) {
                d()
            }
            if (typeof g == "function") {
                g()
            }
        }));
        $j(this.noteTop).css("padding-top", "7px")
    },
    removeIndicators: function() {
        if (this.noteIndicators) {
            $(this.noteIndicators).remove();
            this.noteIndicators = null
        }
        $j(this.noteTop).css("padding-top", "")
    }
};
Listview.sortRows = function(e, d) {
    var j = Listview.sort,
        k = Listview.columns;
    for (var h = 0, c = j.length; h < c; ++h) {
        var g, f = k[Math.abs(j[h]) - 1];
        if (f.sortFunc) {
            g = f.sortFunc(e, d, j[h])
        } else {
            g = strcmp(e[f.value], d[f.value])
        }
        if (g != 0) {
            return g * j[h]
        }
    }
    return 0
}, Listview.sortIndexedRows = function(d, c) {
    var g = Listview.sort,
        h = Listview.columns,
        e = h[Math.abs(g[0]) - 1],
        f;
    if (e.sortFunc) {
        f = e.sortFunc(d, c, g[0])
    } else {
        f = strcmp(d[e.value], c[e.value])
    }
    if (f != 0) {
        return f * g[0]
    }
    return (d.__si - c.__si)
}, Listview.cbSelect = function(b) {
    for (var d = 0, a = this.data.length; d < a; ++d) {
        var c = this.data[d];
        var f = b;
        if (!c.__nochk && c.__tr) {
            var e = c.__tr.firstChild.firstChild;
            if (f == null) {
                f = !e.checked
            }
            if (e.checked != f) {
                e.checked = f;
                c.__tr.className = (e.checked ? "checked" : "");
                if (Browser.ie) {
                    e.defaultChecked = f;
                    if (Browser.ie6) {
                        (Listview.itemOut.bind(c.__tr))()
                    }
                }
            }
        } else {
            if (f == null) {
                f = true
            }
        }
        c.__chk = f
    }
};
Listview.cbClick = function(a) {
    setTimeout(Listview.cbUpdate.bind(0, 0, this, this.parentNode.parentNode), 1);
    sp(a)
};
Listview.cbCellClick = function(a) {
    setTimeout(Listview.cbUpdate.bind(0, 1, this.firstChild, this.parentNode), 1);
    sp(a)
};
Listview.cbIeFix = function() {
    var d = gE(this.tbody, "tr");
    for (var c = 0, a = d.length; c < a; ++c) {
        var b = d[c].firstChild.firstChild;
        if (b) {
            b.checked = b.defaultChecked = false
        }
    }
};
Listview.cbUpdate = function(c, a, b) {
    if (c) {
        a.checked = !a.checked
    }
    b.className = (a.checked ? "checked" : "");
    if (Browser.ie) {
        a.defaultChecked = a.checked;
        if (Browser.ie6) {
            (Listview.itemOver.bind(b))()
        }
    }
};
Listview.itemOver = function() {
    this.style.backgroundColor = (this.className == "checked" ? "#2C2C2C" : "#202020")
};
Listview.itemOut = function() {
    this.style.backgroundColor = (this.className == "checked" ? "#242424" : "transparent")
};
Listview.headerClick = function(a, b, c) {
    c = $E(c);
    if (c._button == 3 || c.shiftKey || c.ctrlKey) {
        Tooltip.hide();
        setTimeout(Listview.headerFilter.bind(this, a, null), 1)
    } else {
        this.sortBy(b + 1)
    }
    return false
};
Listview.headerFilter = function(c, f) {
    var j = "";
    if (c.__filter) {
        if (c.__filter.invert) {
            j += "!"
        }
        j += c.__filter.text
    }
    if (f == null) {
        var f = prompt(sprintf(LANG.prompt_colfilter1 + (c.type == "text" ? LANG.prompt_colfilter2 : LANG.prompt_colfilter3), c.name), j)
    }
    if (f != null) {
        var e = {
            text: "",
            type: -1
        };
        f = trim(f.replace(/\s+/g, " "));
        if (f) {
            if (f.charAt(0) == "!" || f.charAt(0) == "-") {
                e.invert = 1;
                f = f.substr(1)
            }
            if (c.type == "text") {
                e.type = 0;
                e.text = f;
                if (e.invert) {
                    e.regex = openDB_createOrRegex(f)
                } else {
                    e.words = f.toLowerCase().split(" ")
                }
            } else {
                var i, b;
                if (f.match(/(>|=|<|>=|<=)\s*([0-9\.]+)/)) {
                    i = parseFloat(RegExp.$2);
                    if (!isNaN(i)) {
                        switch (RegExp.$1) {
                            case ">":
                                e.type = 1;
                                break;
                            case "=":
                                e.type = 2;
                                break;
                            case "<":
                                e.type = 3;
                                break;
                            case ">=":
                                e.type = 4;
                                break;
                            case "<=":
                                e.type = 5;
                                break
                        }
                        e.value = i;
                        e.text = RegExp.$1 + " " + i
                    }
                } else {
                    if (f.match(/([0-9\.]+)\s*\-\s*([0-9\.]+)/)) {
                        i = parseFloat(RegExp.$1);
                        b = parseFloat(RegExp.$2);
                        if (!isNaN(i) && !isNaN(b)) {
                            if (i > b) {
                                var g = i;
                                i = b;
                                b = g
                            }
                            if (i == b) {
                                e.type = 2;
                                e.value = i;
                                e.text = "= " + i
                            } else {
                                e.type = 6;
                                e.value = i;
                                e.value2 = b;
                                e.text = i + " - " + b
                            }
                        }
                    } else {
                        var d = f.toLowerCase().split(" ");
                        if (d.length == 1 && !isNaN(i = parseFloat(d[0]))) {
                            e.type = 2;
                            e.value = i;
                            e.text = "= " + i
                        } else {
                            if (c.type == "text") {
                                e.type = 0;
                                e.text = f;
                                if (e.invert) {
                                    e.regex = openDB_createOrRegex(f)
                                } else {
                                    e.words = d
                                }
                            }
                        }
                    }
                }
            }
            if (e.type == -1) {
                alert(LANG.message_invalidfilter);
                return
            }
        }
        if (!c.__filter || e.text != c.__filter.text || e.invert != c.__filter.invert) {
            var h = c.__th.firstChild.firstChild;
            if (f && e.text) {
                if (!c.__filter) {
                    h.className = "q5";
                    ++(this.nFilters)
                }
                c.__filter = e
            } else {
                if (c.__filter) {
                    h.className = "";
                    --(this.nFilters)
                }
                c.__filter = null
            }
            this.updateFilters(1)
        }
    }
};
Listview.headerOver = function(b, c, f) {
    var d = "";
    d += '<b class="q1">' + (c.tooltip ? c.tooltip : c.name) + "</b>";
    if (c.__filter) {
        d += "<br />" + sprintf((c.__filter.invert ? LANG.tooltip_colfilter2 : LANG.tooltip_colfilter1), c.__filter.text)
    }
    d += '<br /><span class="q2">' + LANG.tooltip_lvheader1 + "</span>";
    if (this.filtrable && (c.filtrable == null || c.filtrable)) {
        d += '<br /><span class="q2">' + (Browser.opera ? LANG.tooltip_lvheader3 : LANG.tooltip_lvheader2) + "</span>"
    }
};
Listview.extraCols = {
    cost: {
        id: "cost",
        name: LANG.cost,
        getValue: function(a) {
            return (a.cost[3] ? a.cost[3][0][1] : 0) || a.cost[2] || a.cost[1] || a.cost[0]
        },
        compute: function(a, b) {
            Listview.funcBox.appendMoney(b, a.cost[0], null, a.cost[1], a.cost[2], a.cost[3])
        },
        sortFunc: function(d, c, e) {
            var g = 0,
                f = 0;
            if (d.cost[3] != null) {
                array_walk(d.cost[3], function(a, b, j, h) {
                    g += Math.pow(10, h) + a[1]
                })
            }
            if (c.cost[3] != null) {
                array_walk(c.cost[3], function(a, b, j, h) {
                    f += Math.pow(10, h) + a[1]
                })
            }
            return strcmp(g, f) || strcmp(d.cost[2], c.cost[2]) || strcmp(d.cost[1], c.cost[1]) || strcmp(d.cost[0], c.cost[0])
        }
    },
    count: {
        id: "count",
        name: LANG.count,
        width: "11%",
        value: "count",
        compute: function(b, c) {
            if (!(this._totalCount > 0 || b.outof > 0)) {
                return
            }
            if (b.outof) {
                var a = ce("div");
                a.className = "small q0";
                ae(a, ct(sprintf(LANG.lvdrop_outof, b.outof)));
                ae(c, a)
            }
            return b.count
        },
        getVisibleText: function(a) {
            var b = a.count;
            if (a.outof) {
                b += " " + a.outof
            }
            return b
        }
    },
    percent: {
        id: "percent",
        name: "%",
        width: "10%",
        value: "percent",
        compute: function(a, b) {
            if (a.count == -1) {
                return "??"
            }
            if (a.percent >= 1.95) {
                return a.percent.toFixed(0)
            } else if (a.percent < 0) {
                return ((-1 * a.percent) + ' (' + LANG.types[5][0] + ')')
            } else {
                return parseFloat(a.percent.toFixed(1))
            }
        },
        sortFunc: function(d, c, e) {
            return strcmp(Math.abs(d.percent), Math.abs(c.percent))
        },
        getVisibleText: function(a) {
            if (a.count == -1) {
                return "??"
            }
            if (a.percent >= 1.95) {
                return a.percent.toFixed(0)
            } else if (a.percent < 0) {
                return ((-1 * a.percent) + ' (' + LANG.types[5][0] + ')')
            } else {
                return parseFloat(a.percent.toFixed(1))
            }
        }
    },
    stock: {
        id: "stock",
        name: LANG.stock,
        width: "10%",
        value: "stock",
        compute: function(a, b) {
            if (a.stock > 0) {
                return a.stock
            } else {
                b.style.fontFamily = "Verdana, sans-serif";
                return String.fromCharCode(8734)
            }
        },
        getVisibleText: function(a) {
            if (a.stock > 0) {
                return a.stock
            } else {
                return String.fromCharCode(8734) + " infinity"
            }
        }
    },
    mode: {
        id: "mode",
        name: "Mode",
        after: "name",
        type: "text",
        compute: function(b, c) {
            if (b.modes && b.modes.mode) {
                if ((b.modes.mode & 120) == 120 || (b.modes.mode & 3) == 3) {
                    return LANG.pr_note_all
                }
                return Listview.extraCols.mode.getVisibleText(b)
            }
        },
        getVisibleText: function(g) {
            var b = !!(g.modes.mode & 26);
            var h = !!(g.modes.mode & 97);
            var f = !!(g.modes.mode & 40);
            var c = !!(g.modes.mode & 80);
            var e;
            if (f && !c) {
                e = 10
            } else {
                if (c && !f) {
                    e = 25
                }
            }
            var d;
            if (b && !h) {
                d = "normal"
            } else {
                if (h && !b) {
                    d = "heroic"
                }
            }
            if (d) {
                if (e) {
                    return sprintf(LANG["tab_" + d + "X"], e)
                } else {
                    return LANG["tab_" + d]
                }
            }
            if (e) {
                return sprintf(LANG.lvzone_xman, e)
            }
            return LANG.pr_note_all
        },
        sortFunc: function(d, c, e) {
            return -strcmp(d.modes.mode, c.modes.mode)
        }
    }
};
Listview.funcBox = {
    createSimpleCol: function(c, d, a, b) {
        return {
            id: c,
            name: LANG[d],
            width: a,
            value: b
        }
    },
    initLootTable: function(b) {
        var a;
        if (this._totalCount != null) {
            a = this._totalCount
        } else {
            a = b.outof
        }
        if (a == 0) {
            if (b.count != -1) {} else {}
        } else {}(Listview.funcBox.initModeFilter.bind(this, b))()
    },
    assocArrCmp: function(e, d, c) {
        if (e == null) {
            return -1
        } else {
            if (d == null) {
                return 1
            }
        }
        var h = Math.max(e.length, d.length);
        for (var g = 0; g < h; ++g) {
            if (e[g] == null) {
                return -1
            } else {
                if (d[g] == null) {
                    return 1
                }
            }
            var f = strcmp(c[e[g]], c[d[g]]);
            if (f != 0) {
                return f
            }
        }
        return 0
    },
    assocBinFlags: function(d, a) {
        var c = [];
        for (var b in a) {
            if (!isNaN(b) && (d & 1 << b - 1)) {
                c.push(b)
            }
        }
        c.sort(function(f, e) {
            return strcmp(a[f], a[e])
        });
        return c
    },
    location: function(f, g) {
        if (f.location == null) {
            return -1
        }
        for (var d = 0, b = f.location.length; d < b; ++d) {
            if (d > 0) {
                ae(g, ct(LANG.comma))
            }
            var e = f.location[d];
            if (e == -1) {
                ae(g, ct(LANG.ellipsis))
            } else {
                var c = ce("a");
                c.className = "q1";
                c.href = "zone=" + e;
                ae(c, ct(openDB_zones[e]));
                ae(g, c)
            }
        }
    },
    arrayText: function(b, e) {
        if (b == null) {
            return
        }
        var d = "";
        for (var c = 0, a = b.length; c < a; ++c) {
            if (c > 0) {
                d += " "
            }
            if (!e[b[c]]) {
                continue
            }
            d += e[b[c]]
        }
        return d
    },
    createCenteredIcons: function(k, f, t, o) {
        if (k != null) {
            var n = ce("div"),
                b = ce("div");
            ae(document.body, n);
            if (t && (k.length != 1 || o != 2)) {
                var m = ce("div");
                m.style.position = "relative";
                m.style.width = "1px";
                var p = ce("div");
                p.className = "q0";
                p.style.position = "absolute";
                p.style.right = "2px";
                p.style.lineHeight = "26px";
                p.style.fontSize = "11px";
                p.style.whiteSpace = "nowrap";
                ae(p, ct(t));
                ae(m, p);
                ae(n, m);
                n.style.paddingLeft = $j(p).width() + "px"
            }
            var j = openDB_items;
            if (o == 1) {
                j = openDB_spells
            }
            for (var g = 0, l = k.length; g < l; ++g) {
                var q;
                if (k[g] == null) {
                    q = ce("div");
                    q.style.width = q.style.height = "26px"
                } else {
                    var e, h;
                    if (typeof k[g] == "object") {
                        e = k[g][0];
                        h = k[g][1]
                    } else {
                        e = k[g]
                    }
                    if (e) {
                        q = j.createIcon(e, 0, h)
                    } else {
                        q = Icon.create("inventoryslot_empty", 0, null, "javascript:;")
                    }
                }
                if (k.length == 1 && o == 2) {
                    if (e && openDB_items[e]) {
                        ee(n);
                        var u = openDB_items[e],
                            r = ce("a"),
                            c = ce("span");
                        c.style.paddingTop = "4px";
                        r.href = "/item=" + e;
                        r.className = "q" + u.quality + " icontiny";
                        r.style.backgroundImage = "url(https://cdn.openwow.com/" + qsUrl + "/icons/tiny/" + u.icon.toLowerCase() + ".gif)";
                        r.style.whiteSpace = "nowrap";
                        st(r, u["name_enus"]);
                        ae(c, r);
                        if (h > 1) {
                            ae(c, ct(" (" + h + ")"))
                        }
                        if (t) {
                            var m = ce("span");
                            m.className = "q0";
                            m.style.fontSize = "11px";
                            m.style.whiteSpace = "nowrap";
                            ae(m, ct(t));
                            ae(n, m);
                            c.style.paddingLeft = $j(p).width() + "px"
                        }
                        ae(n, c)
                    }
                } else {
                    q.style.cssFloat = q.style.styleFloat = "left";
                    ae(n, q);
                    n.style.margin = "0 auto";
                    n.style.textAlign = "left";
                    n.style.width = (26 * k.length) + "px"
                }
            }
            b.className = "clear";
            ae(f, n);
            ae(f, b);
            return true
        }
    },
    createSocketedIcons: function(b, e, c, g, n) {
        var m = 0,
            k = ce("div"),
            a = ce("div");
        for (var f = 0, h = b.length; f < h; ++f) {
            var l, j = c[f];
            if (!c || !j) {
                l = Icon.create(null, 0, null, "javascript:;")
            } else {
                if (openDB_items[j]) {
                    l = openDB_items.createIcon(j, 0)
                } else {
                    l = Icon.create(openDB_gems[j].icon, 0, null, "item=" + j)
                }
            }
            l.className += " iconsmall-socket-" + openDB_file_gems[b[f]] + (!c || !j ? "-empty" : "");
            l.style.cssFloat = l.style.styleFloat = "left";
            if (g && g[f]) {
                l.insertBefore(ce("var"), l.childNodes[1]);
                ++m
            }
            ae(k, l)
        }
        k.style.margin = "0 auto";
        k.style.textAlign = "left";
        k.style.width = (26 * b.length) + "px";
        a.className = "clear";
        ae(e, k);
        ae(e, a);
        if (n && m == b.length) {
            k = ce("div");
            k.style.paddingTop = "4px";
            ae(k, ct(n));
            ae(e, k)
        }
    },
    getItemType: function(c, a, b) {
        if (b != null && openDB_item_subsubclasses[c] != null && openDB_item_subsubclasses[c][a] != null) {
            return {
                url: "items=" + c + "." + a + "." + b,
                text: openDB_item_subsubclasses[c][a][b]
            }
        }
        if (openDB_item_subclasses[c] != null) {
            return {
                url: "items=" + c + "." + a,
                text: openDB_item_subclasses[c][a]
            }
        } else {
            return {
                url: "items=" + c,
                text: openDB_item_classes[c]
            }
        }
    },
    getQuestCategory: function(a) {
        if (a > 0) {
            return openDB_zones[a]
        } else {
            return openDB_quest_sorts[a]
        }
    },
    getFactionCategory: function(b, a) {
        if (b) {
            return openDB_faction_categories[b]
        } else {
            return openDB_faction_categories[a]
        }
    },
    createTextRange: function(b, a) {
        b |= 0;
        a |= 0;
        if (b > 1 || a > 1) {
            if (b != a && a > 0) {
                return b + "-" + a
            } else {
                return b + ""
            }
        }
        return null
    },
    coReport: function(c, d, f) {
        if (!openDB_user.id || !openDB_report_reasons[f]) {
            return
        }
        var a = "";
        if (f == 4) {
            a = prompt(LANG.prompt_details, "")
        } else {
            if (!confirm(sprintf((c == 0 ? LANG.confirm_report : LANG.confirm_report2), openDB_report_reasons[f]))) {
                return
            }
        }
        if (a != null) {
            var e = "report&type=" + c + "&typeid=" + d.id + "&reason=" + f;
            if (a) {
                e += "&reasonmore=" + urlencode(a)
            }
            new Ajax(e);
            var b = ce("span");
            ae(b, ct(LANG.lvcomment_reported));
            this.parentNode.replaceChild(b, this)
        }
    },
    coReportClick: function(b, a, c) {
        this.menu = [
            [2, openDB_report_reasons[2], Listview.funcBox.coReport.bind(this, a, b, 2)],
            [1, openDB_report_reasons[1], Listview.funcBox.coReport.bind(this, a, b, 1)],
            [3, openDB_report_reasons[3], Listview.funcBox.coReport.bind(this, a, b, 3)],
            [4, openDB_report_reasons[4], Listview.funcBox.coReport.bind(this, a, b, 4)]
        ];
        if (a == 1 && b.op && typeof openDB_pageInfo != "undefined" && !openDB_pageInfo.sticky) {
            this.menu.splice(3, 0, [0, openDB_report_reasons[0], Listview.funcBox.coReport.bind(this, a, b, 0)])
        }(Menu.showAtCursor.bind(this, c))()
    },
    coGetColor: function(c, a) {
        if (c.user && openDB_customColors[c.user]) {
            return " comment-" + openDB_customColors[c.user]
        }
        switch (a) {
            case -1:
                var b = c.divPost.childNodes[1].className.match(/comment-([a-z]+)/);
                if (b != null) {
                    return " comment-" + b[1]
                }
                break;
            case 3:
            case 4:
                if (c.roles & 56) {
                    return " comment-green"
                } else {
                    if (c.roles & 64) {
                        return " comment-gold"
                    }
                }
                break
        }
        if (c.roles & 2) {
            return " comment-blue"
        } else {
            if (c.rating >= 10) {
                return " comment-green"
            } else {
                if (c.rating < 0) {
                    return " comment-bt"
                }
            }
        }
        return ""
    },
    coToggleVis: function(b) {
        this.firstChild.nodeValue = (openDB_toggleDisplay(b.divBody) ? LANG.lvcomment_hide : LANG.lvcomment_show);
        var a = b.divHeader.firstChild.lastChild;
        if (b.ratable) {
            a.style.display = ""
        } else {
            if (b.deleted || b.purged) {
                a.style.fontWeight = "normal";
                a.className = "q10";
                a.innerHTML = (b.deleted ? LANG.lvcomment_deleted : LANG.lvcomment_purged);
                a.style.display = ""
            }
        }
        openDB_toggleDisplay(b.divLinks);
        if (b.lastEdit != null) {
            openDB_toggleDisplay(b.divLastEdit)
        }
    },
    coDisplayRating: function(d, c) {
        if (typeof(d._ratingMode) == "undefined") {
            d._ratingMode = 0
        }
        if (typeof(Listview._ratings) == "undefined") {
            Listview._ratings = {}
        }
        var a = $j(c);
        var e = d._ratingMode;
        if (e == 0) {
            if (d.rating < 0) {
                a.text(d.rating)
            } else {
                a.text("+" + d.rating)
            }
        }
        if (e == 1) {
            if (Listview._ratings[d.id] !== undefined) {
                var b = Listview._ratings[d.id];
                a.text("+" + b.up + " / -" + b.down)
            } else {
                $.ajax({
                    url: "/form=comment&method=rating&id=" + d.id,
                    dataType: "json",
                    success: function(i, f, h, g) {
                        if (f.success) {
                            Listview._ratings[i] = f;
                            this.text("+" + f.up + " / -" + f.down)
                        } else {
                            this.text("Error!")
                        }
                    }.bind(a, d.id)
                });
                a.html('<img src="https://cdn.openwow.com/images/ajax.gif" />')
            }
        }
    },
    coToggleRating: function(b, a) {
        if (typeof(b._ratingMode) == "undefined") {
            b._ratingMode = 0
        }
        if (++b._ratingMode > 1) {
            b._ratingMode = 0
        }
        Listview.funcBox.coDisplayRating(b, a)
    },
    coRate: function(f, a) {
        if (a == 0) {
            var d = 5;
            if (openDB_user.roles & U_GROUP_ADMIN) {
                d = 25
            } else {
                if (openDB_user.roles & U_GROUP_BUREAU) {
                    d = 15
                }
            }
            var e = prompt(sprintf(LANG.prompt_customrating, d, d), 0);
            if (e == null) {
                return
            } else {
                e |= 0;
                if (e != 0 && Math.abs(e) <= d) {
                    a = e
                }
            }
            if (a == 0) {
                return
            }
        } else {
            if (openDB_user.roles & U_GROUP_COMMENTS_MODERATOR) {
                a *= 5
            }
        }
        f.rating += a;
        f.raters.push([openDB_user.id, a]);
        var b = f.divHeader.firstChild;
        Tooltip.hide();
        b = b.childNodes[b.childNodes.length - 3];
        var c = ge("commentrating" + f.id);
        Listview.funcBox.coDisplayRating(f, c);
        de(b.nextSibling);
        de(b.nextSibling);
        $.post("/form=comment&method=rate", {
            id: f.id,
            rating: a
        }, function(g) {
            if (g == "0") {} else {
                if (g == "1") {
                    $(b).html(LANG.tooltip_banned_rating)
                } else {
                    if (g == "3") {
                        $(b).html(LANG.tooltip_too_many_votes)
                    } else {
                        $(b).html(LANG.genericerror)
                    }
                }
            }
            AchievementCheck()
        })
    },
    coRate: function(e, a) {
        if (a == 0) {
            var c = 5;
            if (openDB_user.roles & 2) {
                c = 25
            } else {
                if (openDB_user.roles & 16) {
                    c = 15
                }
            }
            var d = prompt(sprintf(LANG.prompt_customrating, c, c), 0);
            if (d == null) {
                return
            } else {
                d |= 0;
                if (d != 0 && Math.abs(d) <= c) {
                    a = d
                }
            }
            if (a == 0) {
                return
            }
        } else {
            if (openDB_user.roles & 26) {
                a *= 5
            }
        }
        new Ajax("/form=comment&method=rate&id=" + e.id + "&rating=" + a);
        e.rating += a;
        var b = e.divHeader.firstChild;
        b = b.childNodes[b.childNodes.length - 3];
        b.lastChild.firstChild.nodeValue = (e.rating > 0 ? "+" : "") + e.rating;
        Tooltip.hide();
        de(b.nextSibling);
        de(b.nextSibling)
    },
    coDelete: function(a) {
        if (a.purged) {
            alert(LANG.message_cantdeletecomment)
        } else {
            if (confirm(LANG.confirm_deletecomment)) {
                new Ajax("form=comment&method=delete&id=" + a.id);
                this.deleteRows([a])
            }
        }
    },
    coDetach: function(a) {
        if (a.replyTo == 0) {
            alert(LANG.message_cantdetachcomment)
        } else {
            if (confirm(LANG.confirm_detachcomment)) {
                new Ajax("form=comment&method=detach&id=" + a.id);
                a.replyTo = 0;
                alert(LANG.message_commentdetached)
            }
        }
    },
    coEdit: function(g, e, c) {
        if (!c) {
            g.divBody.style.display = "none";
            g.divResponse.style.display = "none";
            g.divLinks.firstChild.style.display = "none"
        } else {
            g.divBody.hide();
            g.divResponse.hide()
        }
        var f = $j("<div/>");
        f.addClass("comment-edit");
        g.divEdit = f[0];
        if (e == -1) {
            if (openDB_users[g.user] != null) {
                g.roles = openDB_users[g.user].roles
            }
        }
        var a = Listview.funcBox.coEditAppend(f, g, e, c);
        var b = $j("<div/>");
        b.addClass("comment-edit-buttons");
        var d = $j("<button/>", {
            text: LANG.compose_save
        });
        d.click(Listview.funcBox.coEditButton.bind(d[0], g, true, e, c));
        b.append(d);
        b.append(ct(" "));
        d = $j("<button/>", {
            text: LANG.compose_cancel
        });
        d.click(Listview.funcBox.coEditButton.bind(d[0], g, false, e, c));
        b.append(d);
        f.append(b);
        f.insertAfter(g.divBody);
        a.focus()
    },
    coEditAppend: function(u, d, t, G, g) {
        var l = Listview.funcBox.coGetCharLimit(t);
        if (t == 1 || t == 3 || t == 4) {
            d.user = openDB_user.name;
            d.roles = openDB_user.roles;
            d.rating = 1
        } else {
            if (t == 2) {
                d.roles = openDB_user.roles;
                d.rating = 1
            }
        }
        if (g) {
            d.roles &= ~U_GROUP_PENDING
        }
        if (t == -1 || t == 0) {
            var o = $j("<div/>", {
                text: LANG.compose_mode
            });
            o.addClass("comment-edit-modes");
            var z = $j("<a/>", {
                href: "javascript:;",
                text: LANG.compose_edit
            });
            z.click(Listview.funcBox.coModeLink.bind(z[0], 1, t, d));
            z.addClass("selected");
            o.append(z);
            o.append(ct("|"));
            var I = $j("<a/>", {
                href: "javascript:;",
                text: LANG.compose_preview
            });
            I.click(Listview.funcBox.coModeLink.bind(I[0], 2, t, d));
            o.append(I);
            u.append(o)
        }
        var a = $j("<div/>", {
            css: {
                display: "none"
            }
        });
        a.addClass("text comment-body" + Listview.funcBox.coGetColor(d, t, G));
        var n = $j("<div/>");
        n.addClass("comment-edit-body");
        var k = $j('<div style="float: left" />');
        k.addClass("toolbar");
        var e = $j('<div style="float: left" />');
        e.addClass("menu-buttons");
        var m = $j("<textarea/>", {
            val: d.body,
            rows: 10,
            css: {
                clear: "left"
            }
        });
        m.addClass("comment-editbox");
        switch (t) {
            case 1:
                m.attr("name", "commentbody");
                break;
            case 2:
                m.attr({
                    name: "desc",
                    originalValue: d.body
                });
                break;
            case 3:
                m.attr("name", "body");
                break;
            case 4:
                m.attr({
                    name: "sig",
                    originalValue: d.body,
                    rows: 3
                });
                m.css("height", "auto");
                break
        }
        if (t != -1 && t != 0) {
            var h = $j("<h3/>"),
                J = $j("<a/>"),
                F = $j("<div/>"),
                E = $j("<div/>"),
                j = screen.availWidth <= 480;
            var f = Listview.funcBox.coLivePreview.bind(m[0], d, t, F[0]);
            J.addClass("disclosure-" + (j ? "off" : "on"));
            J.text(LANG.compose_livepreview);
            h.append(J);
            J.attr("href", "javascript:;");
            h.addClass("first");
            E.addClass("pad");
            a.append(h);
            a.append(F);
            a.append(E);
            openDB_onAfterTyping(m[0], f, 50);
            m.focus(function() {
                f();
                a.css("display", (j ? "none" : ""));
                if (t != 4) {
                    m.css("height", "14em")
                }
            })
        } else {
            if (t != 4) {
                m.focus(function() {
                    m.css("height", "14em")
                })
            }
        }
        var D = [{
            id: "b",
            title: LANG.markup_b,
            pre: "[b]",
            post: "[/b]"
        }, {
            id: "i",
            title: LANG.markup_i,
            pre: "[i]",
            post: "[/i]"
        }, {
            id: "u",
            title: LANG.markup_u,
            pre: "[u]",
            post: "[/u]"
        }, {
            id: "s",
            title: LANG.markup_s,
            pre: "[s]",
            post: "[/s]"
        }, {
            id: "small",
            title: LANG.markup_small,
            pre: "[small]",
            post: "[/small]"
        }, {
            id: "url",
            title: LANG.markup_url,
            nopending: true,
            onclick: function() {
                var i = prompt(LANG.prompt_linkurl, "https://");
                if (i) {
                    openDB_insertTag(m[0], "[url=" + i + "]", "[/url]")
                }
            }
        }, {
            id: "quote",
            title: LANG.markup_quote,
            pre: "[quote]",
            post: "[/quote]"
        }, {
            id: "code",
            title: LANG.markup_code,
            pre: "[code]",
            post: "[/code]"
        }, {
            id: "ul",
            title: LANG.markup_ul,
            pre: "[ul]\n[li]",
            post: "[/li]\n[/ul]",
            rep: function(i) {
                return i.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "ol",
            title: LANG.markup_ol,
            pre: "[ol]\n[li]",
            post: "[/li]\n[/ol]",
            rep: function(i) {
                return i.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "li",
            title: LANG.markup_li,
            pre: "[li]",
            post: "[/li]"
        }];
        if (!G) {
            for (var B = 0, C = D.length; B < C; ++B) {
                var q = D[B];
                if (t == 4 && q.id == "quote") {
                    break
                }
                if (q.nopending) {
                    continue
                }
                var v = $j("<button/>", {
                    click: function(i, L) {
                        L.preventDefault();
                        (i.onclick != null ? i.onclick : openDB_insertTag.bind(0, m[0], i.pre, i.post, i.rep))()
                    }.bind(null, q)
                });
                v[0].setAttribute("type", "button");
                var K = $j("<img/>");
                v.attr("title", q.title);
                K.attr("src", "https://cdn.openwow.com/images/pixel.gif");
                K.addClass("toolbar-" + q.id);
                v.append(K);
                k.append(v)
            }
        } else {
            for (var B = 0, C = D.length; B < C; ++B) {
                var q = D[B];
                if ((openDB_user.rolls & U_GROUP_PENDING) && q.nopending) {
                    continue
                }
                var H = "tb-" + q.id;
                var v = $j("<button/>", {
                    click: function(i, L) {
                        L.preventDefault();
                        (i.onclick != null ? i.onclick : openDB_insertTag.bind(0, m[0], i.pre, i.post, i.rep))()
                    }.bind(null, q),
                    "class": H,
                    title: q.title
                });
                v[0].setAttribute("type", "button");
                v.append("<ins/>");
                k.append(v)
            }
            k.addClass("formatting button sm")
        }
        var r = function(L, i) {
            var M = prompt(sprintf(LANG.markup_prompt, L), "");
            if (M != null) {
                openDB_insertTag(m[0], "[" + i + "=" + (parseInt(M) || 0) + "]", "")
            }
        };
        var c = [
            [0, LANG.markup_links, , [
                [9, LANG.types[10][0] + "...", r.bind(null, LANG.types[10][1], "achievement")],
                [7, LANG.types[8][0] + "...", r.bind(null, LANG.types[8][1], "faction")],
                [0, LANG.types[3][0] + "...", r.bind(null, LANG.types[3][1], "item")],
                [1, LANG.types[4][0] + "...", r.bind(null, LANG.types[4][1], "itemset")],
                [2, LANG.types[1][0] + "...", r.bind(null, LANG.types[1][1], "npc")],
                [3, LANG.types[2][0] + "...", r.bind(null, LANG.types[2][1], "object")],
                [8, LANG.types[9][0] + "...", r.bind(null, LANG.types[9][1], "pet")],
                [4, LANG.types[5][0] + "...", r.bind(null, LANG.types[5][1], "quest")],
                [5, LANG.types[6][0] + "...", r.bind(null, LANG.types[6][1], "spell")],
                [6, LANG.types[7][0] + "...", r.bind(null, LANG.types[7][1], "zone")]
            ]]
        ];
        n.append(k);
        n.append(e);
        n.append($j('<div style="clear: left" />'));
        n.append(m);
        n.append($j("<br/>"));
        if (t == 4) {
            n.append(ct(sprintf(LANG.compose_limit2, l, 3)))
        } else {
            n.append(ct(sprintf(LANG.compose_limit, l)))
        }
        var A = $j('<span class="comment-remaining"> ' + sprintf(LANG.compose_remaining, l - d.body.length) + "</span>");
        n.append(A);
        m.keyup(Listview.funcBox.coUpdateCharLimit.bind(0, m, A, l));
        m.keydown(Listview.funcBox.coUpdateCharLimit.bind(0, m, A, l));
        u.append(n);
        u.append($j("<br/>"));
        u.append(a);
        return m
    },
    coLivePreview: function(f, e, a, b) {
        if (b != 1 && a.style.display == "none") {
            return
        }
        var c = this,
            i = Listview.funcBox.coGetCharLimit(e),
            g = (c.value.length > i ? c.value.substring(0, i) : c.value);
        if (e == 4) {
            var h;
            if ((h = g.indexOf("\n")) != -1 && (h = g.indexOf("\n", h + 1)) != -1 && (h = g.indexOf("\n", h + 1)) != -1) {
                g = g.substring(0, h)
            }
        }
        var d = Markup.toHtml(g, {
            mode: Markup.MODE_COMMENT,
            roles: f.roles
        });
        if (d) {
            a.innerHTML = d
        } else {
            a.innerHTML = '<span class="q6">...</span>'
        }
    },
    coEditButton: function(f, d, e) {
        if (d) {
            var a = gE(f.divEdit, "textarea")[0];
            if (!Listview.funcBox.coValidate(a, e)) {
                return
            }
            if (a.value != f.body) {
                var c = 0;
                if (f.lastEdit != null) {
                    c = f.lastEdit[1]
                }++c;
                f.lastEdit = [openDB_serverTime, c, openDB_user.name];
                Listview.funcBox.coUpdateLastEdit(f);
                var b = Listview.funcBox.coGetCharLimit(e);
                f.divBody.innerHTML = Markup.toHtml((a.value.length > b ? a.value.substring(0, b) : a.value), {
                    mode: Markup.MODE_COMMENT,
                    roles: f.roles
                });
                f.body = a.value;
                if (e == -1) {} else {
                    new Ajax("/form=comment&method=edit&id=" + f.id, {
                        method: "POST",
                        params: "commentbody=" + urlencode(f.body)
                    })
                }
            }
        }
        f.divBody.style.display = "";
        f.divLinks.firstChild.style.display = "";
        de(f.divEdit);
        f.divEdit = null
    },
    coGetCharLimit: function(a) {
        switch (a) {
            case 0:
            case 1:
            case 2:
                return 7500;
            case 4:
                return 250;
            default:
                return 15000
        }
    },
    coModeLink: function(e, b, f) {
        var j = Listview.funcBox.coGetCharLimit(e);
        var c = Markup.MODE_COMMENT;
        array_walk(gE(this.parentNode, "a"), function(k) {
            k.className = ""
        });
        this.className = "selected";
        var d = gE(this.parentNode.parentNode, "textarea")[0],
            i = d.parentNode,
            a = i.previousSibling;
        if (b == 4) {
            c = Markup.MODE_SIGNATURE
        }
        switch (e) {
            case 1:
                i.style.display = "";
                a.style.display = "none";
                i.firstChild.focus();
                break;
            case 2:
                i.style.display = "none";
                var g = (d.value.length > j ? d.value.substring(0, j) : d.value);
                if (b == 4) {
                    var h;
                    if ((h = g.indexOf("\n")) != -1 && (h = g.indexOf("\n", h + 1)) != -1 && (h = g.indexOf("\n", h + 1)) != -1) {
                        g = g.substring(0, h)
                    }
                }
                a.innerHTML = Markup.toHtml(g, {
                    mode: c,
                    roles: f.roles
                });
                a.style.display = "";
                break
        }
    },
    coReply: function(b) {
        document.forms.addcomment.elements.replyto.value = b.replyTo;
        var a = ge("replybox-generic");
        gE(a, "span")[0].innerHTML = b.user;
        a.style.display = "";
        co_addYourComment()
    },
    coValidate: function(a, c) {
        c |= 0;
        if (c == 1 || c == -1) {
            if (trim(a.value).length < 1) {
                alert(LANG.message_forumposttooshort);
                return false
            }
        } else {
            if (trim(a.value).length < 10) {
                alert(LANG.message_commenttooshort);
                return false
            }
        }
        var b = Listview.funcBox.coGetCharLimit(c);
        if (a.value.length > b) {
            if (!confirm(sprintf(c == 1 ? LANG.confirm_forumposttoolong : LANG.confirm_commenttoolong, b, a.value.substring(b - 30, b)))) {
                return false
            }
        }
        return true
    },
    coCustomRatingOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_customrating, 0, 0, "q")
    },
    coPlusRatingOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_uprate, 0, 0, "q2")
    },
    coMinusRatingOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_downrate, 0, 0, "q10")
    },
    coSortDate: function(a) {
        a.nextSibling.nextSibling.className = "";
        a.className = "selected";
        this.mainDiv.className += " listview-aci";
        this.setSort([1], true, false)
    },
    coSortHighestRatedFirst: function(a) {
        a.previousSibling.previousSibling.className = "";
        a.className = "selected";
        this.mainDiv.className = this.mainDiv.className.replace("listview-aci", "");
        this.setSort([-3, 2], true, false)
    },
    coUpdateCharLimit: function(a, b, c) {
        var d = $(a).val();
        if (d.length > c) {
            $j(a).val(d.substring(0, c))
        } else {
            $j(b).html(" " + sprintf(LANG.compose_remaining, c - d.length)).removeClass("q10");
            if (d.length == c) {
                $j(b).addClass("q10")
            }
        }
    },
    coUpdateLastEdit: function(f) {
        var b = f.divLastEdit;
        if (!b) {
            return
        }
        if (f.lastEdit != null) {
            var e = f.lastEdit;
            b.childNodes[1].firstChild.nodeValue = e[2];
            b.childNodes[1].href = "javscript:;";
            var c = new Date(e[0]);
            var d = (openDB_serverTime - c) / 1000;
            if (b.childNodes[3].firstChild) {
                de(b.childNodes[3].firstChild)
            }
            Listview.funcBox.coFormatDate(b.childNodes[3], d, c);
            var a = "";
            if (f.rating != null) {}
            if (e[1] > 1) {
                a += LANG.dash + sprintf(LANG.lvcomment_nedits, e[1])
            }
            b.childNodes[4].nodeValue = a;
            b.style.display = ""
        } else {
            b.style.display = "none"
        }
    },
    coFormatDate: function(f, e, b, g, h) {
        var d;
        if (e < 2592000) {
            var a = sprintf(LANG.date_ago, openDB_formatTimeElapsed(e));
            var c = new Date();
            c.setTime(b.getTime() + (openDB_localTime - openDB_serverTime));
            f.style.cursor = "help";
            f.title = c.toLocaleString()
        } else {
            a = LANG.date_on + openDB_formatDateSimple(b, g)
        }
        if (h == 1) {
            a = a.substr(0, 1).toUpperCase() + a.substr(1)
        }
        d = ct(a);
        ae(f, d)
    },
    ssCellOver: function() {
        this.className = "screenshot-caption-over"
    },
    ssCellOut: function() {
        this.className = "screenshot-caption"
    },
    ssCellClick: function(b, d) {
        d = $E(d);
        if (d.shiftKey || d.ctrlKey) {
            return
        }
        var a = 0,
            c = d._target;
        while (c && a < 3) {
            if (c.nodeName == "A") {
                return
            }
            if (c.nodeName == "IMG") {
                break
            }
            c = c.parentNode
        }
        ScreenshotViewer.show({
            screenshots: this.data,
            pos: b
        })
    },
    moneyHonorOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_honorpoints, 0, 0, "q")
    },
    moneyArenaOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_arenapoints, 0, 0, "q")
    },
    moneyAchievementOver: function(a) {
        Tooltip.showAtCursor(a, LANG.tooltip_achievementpoints, 0, 0, "q")
    },
    appendMoney: function(g, a, f, m, j, c, l) {
        var k, h = 0;
        if (a >= 10000) {
            h = 1;
            k = ce("span");
            k.className = "moneygold";
            ae(k, ct(Math.floor(a / 10000)));
            ae(g, k);
            a %= 10000
        }
        if (a >= 100) {
            if (h) {
                ae(g, ct(" "))
            } else {
                h = 1
            }
            k = ce("span");
            k.className = "moneysilver";
            ae(k, ct(Math.floor(a / 100)));
            ae(g, k);
            a %= 100
        }
        if (a >= 1 || f != null) {
            if (h) {
                ae(g, ct(" "))
            } else {
                h = 1
            }
            k = ce("span");
            k.className = "moneycopper";
            ae(k, ct(a));
            ae(g, k)
        }
        if (m != null && m != 0) {
            if (h) {
                ae(g, ct(" "))
            } else {
                h = 1
            }
            k = ce("span");
            k.className = "money" + (m < 0 ? "horde" : "alliance") + " tip";
            k.onmouseover = Listview.funcBox.moneyHonorOver;
            k.onmousemove = Tooltip.cursorUpdate;
            k.onmouseout = Tooltip.hide;
            ae(k, ct(number_format(Math.abs(m))));
            ae(g, k)
        }
        if (j >= 1) {
            if (h) {
                ae(g, ct(" "))
            } else {
                h = 1
            }
            k = ce("span");
            k.className = "moneyarena tip";
            k.onmouseover = Listview.funcBox.moneyArenaOver;
            k.onmousemove = Tooltip.cursorUpdate;
            k.onmouseout = Tooltip.hide;
            ae(k, ct(number_format(j)));
            ae(g, k)
        }
        if (c != null) {
            for (var b = 0; b < c.length; ++b) {
                if (h) {
                    ae(g, ct(" "))
                } else {
                    h = 1
                }
                var n = c[b][0];
                var e = c[b][1];
                k = ce("a");
                k.href = "item=" + n;
                k.className = "moneyitem";
                k.style.backgroundImage = "url(https://cdn.openwow.com/" + qsUrl + "/icons/tiny/" + openDB_items.getIcon(n).toLowerCase() + ".gif)";
                ae(k, ct(e));
                ae(g, k)
            }
        }
        if (l != null) {
            if (h) {
                ae(g, ct(" "))
            } else {
                h = 1
            }
            k = ce("span");
            k.className = "moneyachievement tip";
            k.onmouseover = Listview.funcBox.moneyAchievementOver;
            k.onmousemove = Tooltip.cursorUpdate;
            k.onmouseout = Tooltip.hide;
            ae(k, ct(number_format(l)));
            ae(g, k)
        }
    },
    getUpperSource: function(a, b) {
        switch (a) {
            case 2:
                if (b.z) {
                    return LANG.source_zonedrop
                }
                break;
            case 4:
                return LANG.source_quests;
            case 5:
                return LANG.source_vendors
        }
        return openDB_sources[a]
    },
    getLowerSource: function(a, d, c) {
        switch (a) {
            case 3:
                if (d.p && openDB_sources_pvp[d.p]) {
                    return {
                        text: openDB_sources_pvp[d.p]
                    }
                }
                break
        }
        switch (c) {
            case 0:
            case 1:
            case 2:
                if (d.z) {
                    var b = {
                        url: "zone=" + d.z,
                        text: openDB_zones[d.z]
                    };
                    if (d.t && a == 5) {
                        b.pretext = LANG.lvitem_vendorin
                    }
                    if (d.dd) {
                        if (d.dd == 1) {
                            b.posttext = LANG.lvitem_normal
                        } else {
                            if (d.dd == 2) {
                                b.posttext = LANG.lvitem_heroic
                            }
                        }
                    }
                    return b
                }
                break;
            case 5:
                return {
                    url: "quests=" + d.c2 + "." + d.c,
                    text: Listview.funcBox.getQuestCategory(d.c)
                };
                break;
            case 6:
                if (d.c && d.s) {
                    return {
                        url: "spells=" + d.c + "." + d.s,
                        text: openDB_spell_skills[d.s]
                    }
                } else {
                    return {
                        url: "spells=0",
                        text: "??"
                    }
                }
                break
        }
    },
    initModeFilter: function(c) {
        if (this._lootModes == null) {
            this._lootModes = {
                99: 0
            }
        }
        if (this._distinctModes == null) {
            this._distinctModes = {
                99: 0
            }
        }
        if ((!c.modes || c.modes.mode == 4) && c.classs != 12 && c.percent < 1) {
            this._lootModes[99]++;
            this._distinctModes[99]++
        } else {
            if (c.modes) {
                for (var b = -2; b <= 4; ++b) {
                    if (this._lootModes[b] == null) {
                        this._lootModes[b] = 0
                    }
                    if (c.modes.mode & 1 << parseInt(b) + 2) {
                        this._lootModes[b]++
                    }
                }
                if (this._distinctModes[c.modes.mode] == null) {
                    this._distinctModes[c.modes.mode] = 0
                }
                this._distinctModes[c.modes.mode]++
            }
        }
    },
    addModeIndicator: function() {
        var b = 0;
        for (var l in this._distinctModes) {
            if (this._distinctModes[l]) {
                b++
            }
        }
        if (b < 2) {
            return
        }
        var e = location.hash.match(/:mode=([^:]+)/),
            d = [0, -1, -2, 1, 3, 2, 4, 99],
            o = {
                "-2": LANG.tab_heroic,
                "-1": LANG.tab_normal,
                0: LANG.tab_noteworthy,
                1: sprintf(LANG.tab_normalX, 10),
                2: sprintf(LANG.tab_normalX, 25),
                3: sprintf(LANG.tab_heroicX, 10),
                4: sprintf(LANG.tab_heroicX, 25),
                99: ""
            };
        var n = function(j, i, f) {
            openDB_setSelectedLink(this, "lootmode");
            g.customPound = g.id + (i != null ? ":mode=" + openDB_urlize(o[i].replace(" ", "")) : "");
            g.customFilter = function(r) {
                return Listview.funcBox.filterMode(r, g._totalCount, j)
            };
            g.updateFilters(1);
            g.applySort();
            g.refreshRows();
            if (f) {
                g.updatePound(1)
            }
        };
        var g = this,
            c = [],
            p;
        p = $j("<a><span>" + LANG.pr_note_all + "</span></a>");
        p[0].f = n.bind(p[0], null, null, 1);
        p.click(p[0].f);
        var k = n.bind(p[0], null, null, 0);
        k();
        c.push($j('<span class="indicator-mode"></span>').append(p).append($j("<b>" + LANG.pr_note_all + "</b>")));
        for (var h = 0, m = d.length; h < m; ++h) {
            var l = d[h];
            if (!this._lootModes[l]) {
                continue
            }
            p = $j("<a><span>" + o[l] + "</span> (" + this._lootModes[l] + ")</a>");
            p[0].f = n.bind(p[0], 1 << l + 2, l, 1);
            p.click(p[0].f);
            if (l == 0) {
                k = n.bind(p[0], 1 << l + 2, l, 0)
            }
            if (l < -1 || l > 2) {
                p.addClass("icon-heroic")
            }
            c.push($j('<span class="indicator-mode"></span>').append(p).append($("<b" + (l < -1 || l > 2 ? ' class="icon-heroic"' : "") + ">" + o[l] + " (" + this._lootModes[l] + ")</b>")));
            if (e && e[1] == openDB_urlize(o[l].replace(" ", ""))) {
                (p[0].f)()
            }
        }
        var q = false;
        for (var l = 0, m = c.length; l < m; ++l) {
            p = $j("a", c[l]);
            if (!$j("span", p).html() && c.length == 3) {
                q = true
            } else {
                this.createIndicator(c[l], null, p[0].f)
            }
        }
        if (q) {
            k()
        }
        $j(this.noteTop).append($j('<div class="clear"></div>'))
    },
    filterMode: function(e, c, d) {
        if (c != null && e.count != null) {
            if (e._count == null) {
                e._count = e.count
            }
            var b = e._count;
            if (d != null && e.modes[d]) {
                b = e.modes[d].count;
                c = e.modes[d].outof
            }
            e.__tr = null;
            e.count = b;
            e.outof = c;
            if (c) {
                e.percent = b / c * 100
            } else {
                e.percent = b
            }
        }
        return (d != null ? ((!e.modes || e.modes.mode == 4) && e.classs != 12 && e.percent < 1 ? (d == 32) : (e.modes && (e.modes.mode & d))) : true)
    },
    addSubclassIndicator: function() {
        var k = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var h in openDB_item_classes) {
            b.push({
                i: h,
                n: openDB_item_classes[h]
            })
        }
        b.sort(function(i, f) {
            return strcmp(i.n, f.n)
        });
        var m = function(i, f) {
            openDB_setSelectedLink(this, "itemclass");
            d.customPound = d.id + (i != null ? ":type=" + i : "");
            d.customFilter = function(j) {
                return i == null || i == j.classs
            };
            d.updateFilters(1);
            d.applySort();
            d.refreshRows();
            if (f) {
                d.updatePound(1)
            }
        };
        var d = this,
            c = [],
            n;
        n = $j("<a><span>" + LANG.pr_note_all + "</span></a>");
        n[0].f = m.bind(n[0], null, 1);
        n.click(n[0].f);
        var g = m.bind(n[0], null, 0);
        g();
        c.push($j('<span class="indicator-mode"></span>').append(n).append($j("<b>" + LANG.pr_note_all + "</b>")));
        for (var e = 0, l = b.length; e < l; ++e) {
            var h = b[e].i;
            if (!this._itemClasses[h]) {
                continue
            }
            n = $j("<a><span>" + openDB_item_classes[h] + "</span> (" + this._itemClasses[h] + ")</a>");
            n[0].f = m.bind(n[0], h, 1);
            n.click(n[0].f);
            c.push($j('<span class="indicator-mode"></span>').append(n).append($j("<b>" + openDB_item_classes[h] + " (" + this._itemClasses[h] + ")</b>")));
            if (k && k[1] == openDB_urlize(h)) {
                (n[0].f)()
            }
        }
        if (c.length > 2) {
            for (var h = 0, l = c.length; h < l; ++h) {
                this.createIndicator(c[h], null, $j("a", c[h])[0].f)
            }
            $j(this.noteTop).css("padding-bottom", "12px");
            $j(this.noteIndicators).append($j('<div class="clear"></div>')).insertAfter($j(this.navTop))
        }
    },
    addStatisticIndicator: function() {
        var h = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var g in openDB_achievement_types) {
            b.push({
                i: g,
                n: openDB_achievement_types[g]
            })
        }
        b.sort(function(i, f) {
            return $WH.strcmp(i.n, f.n)
        });
        var m = function(i, f) {
            openDB_setSelectedLink(this, "achievType");
            c.customPound = c.id + (i != null ? ":type=" + i : "");
            c.customFilter = function(j) {
                return i == null || i == j.type
            };
            c.updateFilters(1);
            c.applySort();
            c.refreshRows();
            if (f) {
                c.updatePound(1)
            }
        };
        var c = this,
            l = [],
            n;
        n = $j("<a><span>" + LANG.pr_note_all + "</span></a>");
        n[0].f = m.bind(n[0], null, 1);
        n.click(n[0].f);
        var e = m.bind(n[0], null, 0);
        e();
        l.push($j('<span class="indicator-mode"></span>').append(n).append($j("<b>" + LANG.pr_note_all + "</b>")));
        for (var d = 0, k = b.length; d < k; ++d) {
            var g = b[d].i;
            if (!this._achievTypes[g]) {
                continue
            }
            n = $j("<a><span>" + openDB_achievement_types[g] + "</span> (" + this._achievTypes[g] + ")</a>");
            n[0].f = m.bind(n[0], g, 1);
            n.click(n[0].f);
            l.push($j('<span class="indicator-mode"></span>').append(n).append($j("<b>" + openDB_achievement_types[g] + " (" + this._achievTypes[g] + ")</b>")));
            if (h && h[1] == g) {
                (n[0].f)()
            }
        }
        if (l.length > 2) {
            for (var g = 0, k = l.length; g < k; ++g) {
                this.createIndicator(l[g], null, $j("a", l[g])[0].f)
            }
            $j(this.noteTop).append($j('<div class="clear"></div>'))
        }
    },
    addQuestIndicator: function() {
        var g = location.hash.match(/:type=([^:]+)/);
        var j = function(i, f) {
            openDB_setSelectedLink(this, "questType");
            k.customPound = k.id + (i != null ? ":type=" + i : "");
            k.customFilter = function(l) {
                return i == null || (l._type & 1 << i - 1)
            };
            k.updateFilters(1);
            k.applySort();
            k.refreshRows();
            if (f) {
                k.updatePound(1)
            }
        };
        var k = this,
            e = [],
            c;
        c = $j("<a><span>" + LANG.pr_note_all + "</span></a>");
        c[0].f = j.bind(c[0], null, 1);
        c.click(c[0].f);
        var h = j.bind(c[0], null, 0);
        h();
        e.push($j('<span class="indicator-mode"></span>').append(c).append($j("<b>" + LANG.pr_note_all + "</b>")));
        for (var d = 1; d <= 4; ++d) {
            if (!this._questTypes[d]) {
                continue
            }
            c = $j("<a><span>" + openDB_quest_indicators[d] + "</span> (" + this._questTypes[d] + ")</a>");
            c[0].f = j.bind(c[0], d, 1);
            c.click(c[0].f);
            e.push($j('<span class="indicator-mode"></span>').append(c).append($j("<b>" + openDB_quest_indicators[d] + " (" + this._questTypes[d] + ")</b>")));
            if (g && g[1] == d) {
                (c[0].f)()
            }
        }
        if (e.length > 2) {
            for (var d = 0, b = e.length; d < b; ++d) {
                this.createIndicator(e[d], null, $j("a", e[d])[0].f)
            }
            $j(this.noteTop).css("padding-bottom", "12px");
            $j(this.noteIndicators).append($j('<div class="clear"></div>')).insertAfter($(this.navTop))
        }
    }
};
Listview.templates = {
    faction: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(d, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(d);
                ae(b, ct(d.name));
                if (d.expansion) {
                    var c = ce("span");
                    c.className = (d.expansion == 1 ? "bc-icon" : "wotlk-icon");
                    ae(c, b);
                    ae(e, c)
                } else {
                    ae(e, b)
                }
            },
            getVisibleText: function(a) {
                var b = a.name;
                if (a.expansion == 1) {
                    b += " bc"
                } else {
                    if (a.expansion == 2) {
                        b += "wotlk wrath"
                    }
                }
                return b
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            width: "10%",
            compute: function(b, c) {
                if (b.side) {
                    var a = ce("span");
                    a.className = (b.side == 1 ? "alliance-icon" : "horde-icon");
                    ae(a, ct(openDB_sides[b.side]));
                    ae(c, a)
                }
            },
            getVisibleText: function(a) {
                if (a.side) {
                    return openDB_sides[a.side]
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_sides[d.side], openDB_sides[c.side])
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function(d, e) {
                if (d.category2 != null) {
                    e.className = "small q1";
                    var b = ce("a"),
                        c = "factions=" + d.category2;
                    if (d.category) {
                        c += "." + d.category
                    }
                    b.href = c;
                    ae(b, ct(Listview.funcBox.getFactionCategory(d.category, d.category2)));
                    ae(e, b)
                }
            },
            getVisibleText: function(a) {
                return Listview.funcBox.getFactionCategory(a.category, a.category2)
            },
            sortFunc: function(d, c, f) {
                var e = Listview.funcBox.getFactionCategory;
                return strcmp(e(d.category, d.category2), e(c.category, c.category2))
            }
        }],
        getItemLink: function(a) {
            return "?faction=" + a.id
        }
    },
    item: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function(q, g, o) {
                if (q.upgraded) {
                    o.className = "upgraded"
                }
                var j = ce("td");
                j.style.width = "1px";
                j.style.padding = "0";
                j.style.borderRight = "none";
                var k = null,
                    r = null;
                if (q.stack != null) {
                    k = Listview.funcBox.createTextRange(q.stack[0], q.stack[1])
                }
                if (q.avail != null) {
                    r = q.avail
                }
                if (q.id) {
                    ae(j, openDB_items.createIcon(q.id, (this.iconSize == null ? 1 : this.iconSize), k, r))
                }
                ae(o, j);
                g.style.borderLeft = "none";
                var p = ce("a");
                p.className = "q" + (7 - parseInt(q.name.charAt(0)));
                p.style.fontFamily = "Verdana, sans-serif";
                p.href = this.template.getItemLink(q);
                if (q.rel) {
                    Icon.getLink(j.firstChild).rel = q.rel;
                    p.rel = q.rel
                }
                ae(p, ct(q.name.substring(1)));
                var b = ce("div");
                ae(b, p);
                if (q.reqclass) {
                    var m = ce("div");
                    m.className = "small2";
                    var f = Listview.funcBox.assocBinFlags(q.reqclass, openDB_chr_classes);
                    for (var j = 0, l = f.length; j < l; ++j) {
                        if (j > 0) {
                            ae(m, ct(", "))
                        }
                        var p = ce("a");
                        p.href = "javascript:;";
                        p.className = "c" + f[j];
                        st(p, openDB_chr_classes[f[j]]);
                        ae(m, p)
                    }
                    ae(b, m)
                }
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (q.source != null && q.source.length == 1) {
                        if (q.reqclass) {
                            ae(m, ct(LANG.dash))
                        } else {
                            var m = ce("div");
                            m.className = "small2"
                        }
                        var e = (q.sourcemore ? q.sourcemore[0] : {});
                        var n = 0;
                        if (e.t) {
                            n = e.t;
                            var p = ce("a");
                            if (e.q != null) {
                                p.className = "q" + e.q
                            } else {
                                p.className = "q1"
                            }
                            p.href = "/" + openDB_types[e.t] + "=" + e.ti;
                            if (e.n.length <= 30) {
                                ae(p, ct(e.n))
                            } else {
                                p.title = e.n;
                                ae(p, ct(trim(e.n.substr(0, 27)) + "..."))
                            }
                            ae(m, p)
                        } else {
                            ae(m, ct(Listview.funcBox.getUpperSource(q.source[0], e)))
                        }
                        var h = Listview.funcBox.getLowerSource(q.source[0], e, n);
                        if (h != null) {
                            ae(m, ct(LANG.hyphen));
                            if (h.pretext) {
                                ae(m, ct(h.pretext))
                            }
                            if (h.url) {
                                var p = ce("a");
                                p.className = "q1";
                                p.href = h.url;
                                ae(p, ct(h.text));
                                ae(m, p)
                            } else {
                                ae(m, ct(h.text))
                            }
                            if (h.posttext) {
                                ae(m, ct(h.posttext))
                            }
                        }
                        ae(b, m)
                    }
                }
                if (q.heroic || q.reqrace || q.eliteitem || q.raidfinder) {
                    b.style.position = "relative";
                    var m = ce("div");
                    m.className = "small";
                    m.style.fontStyle = "italic";
                    m.style.position = "absolute";
                    m.style.right = m.style.bottom = "3px";
                    if (q.heroic) {
                        var t = ce("span");
                        t.className = "q2";
                        ae(t, ct(LANG.lvitem_heroicitem));
                        ae(m, t)
                    }
                    if (q.raidfinder) {
                        var t = ce("span");
                        t.className = "q2";
                        ae(t, ct(LANG.lvitem_raidfinderitem));
                        ae(m, t)
                    }
                    if (q.eliteitem) {
                        var t = ce("span");
                        t.className = "q2";
                        ae(t, ct(LANG.lvitem_eliteitem));
                        ae(m, t)
                    }
                    if (q.reqrace) {
                        if ((q.reqrace & 1791) != 1101 && (q.reqrace & 1791) != 690) {
                            if (q.heroic) {
                                ae(m, ce("br"));
                                m.style.bottom = "-6px"
                            }
                            var c = Listview.funcBox.assocBinFlags(q.reqrace, openDB_chr_races);
                            for (var j = 0, l = c.length; j < l; ++j) {
                                if (j > 0) {
                                    ae(m, ct(", "))
                                }
                                var p = ce("a");
                                p.href = "/race=" + c[j];
                                st(p, openDB_chr_races[c[j]]);
                                ae(m, p)
                            }
                            m.className += "q1"
                        }
                    }
                    ae(b, m)
                }
                ae(g, b)
            },
            getVisibleText: function(c) {
                var e = c.name.substring(1);
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (c.source != null && c.source.length == 1) {
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                    }
                }
                return e
            }
        }, {
            id: "level",
            name: LANG.level,
            value: "level"
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            value: "reqlevel",
            compute: function(a, b) {
                if (a.reqlevel > 1) {
                    return a.reqlevel
                }
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function(a, c) {
                if (a.side && a.side != 3) {
                    var b = ce("span");
                    b.className = (a.side == 1 ? "alliance-icon" : "horde-icon");
                    b.onmouseover = function(d) {
                        Tooltip.showAtCursor(d, openDB_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = Tooltip.cursorUpdate;
                    b.onmouseout = Tooltip.hide;
                    ae(c, b)
                }
            },
            getVisibleText: function(a) {
                if (a.side) {
                    return openDB_sides[a.side]
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_sides[d.side], openDB_sides[c.side])
            }
        }, {
            id: "dps",
            name: LANG.dps,
            value: "dps",
            compute: function(a, b) {
                return (a.dps || 0).toFixed(1)
            },
            hidden: true
        }, {
            id: "speed",
            name: LANG.speed,
            value: "speed",
            compute: function(a, b) {
                return (a.speed || 0).toFixed(2)
            },
            hidden: true
        }, {
            id: "armor",
            name: LANG.armor,
            value: "armor",
            compute: function(a, b) {
                if (a.armor > 0) {
                    return a.armor
                }
            },
            hidden: true
        }, {
            id: "slot",
            name: LANG.slot,
            type: "text",
            compute: function(a, b) {
                nw(b);
                return openDB_item_slots[a.slot]
            },
            getVisibleText: function(a) {
                return openDB_item_slots[a.slot]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_item_slots[d.slot], openDB_item_slots[c.slot])
            },
            hidden: true
        }, {
            id: "slots",
            name: LANG.slots,
            value: "nslots",
            hidden: true
        }, {
            id: "skill",
            name: LANG.skill,
            value: "skill",
            hidden: true
        }, {
            id: "glyph",
            name: LANG.glyphtype,
            type: "text",
            value: "glyph",
            compute: function(a, b) {
                if (a.glyph) {
                    return openDB_item_glyphs[a.glyph]
                }
            },
            getVisibleText: function(a) {
                return openDB_item_glyphs[a.glyph]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_item_glyphs[d.glyph], openDB_item_glyphs[c.glyph])
            },
            hidden: true
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            compute: function(k, d) {
                if (this.iconSize == 0) {
                    d.className = "small"
                }
                if (k.source != null) {
                    if (k.source.length == 1) {
                        nw(d);
                        var c = (k.sourcemore ? k.sourcemore[0] : {});
                        var h = 0;
                        if (c.t) {
                            h = c.t;
                            var j = ce("a");
                            if (c.q != null) {
                                j.className = "q" + c.q
                            } else {
                                j.className = "q1"
                            }
                            j.href = openDB_types[c.t] + "=" + c.ti;
                            if (this.iconSize == 0 || c.n.length <= 20) {
                                ae(j, ct(c.n))
                            } else {
                                j.title = c.n;
                                ae(j, ct(trim(c.n.substr(0, 17)) + "..."))
                            }
                            ae(d, j)
                        } else {
                            ae(d, ct(Listview.funcBox.getUpperSource(k.source[0], c)))
                        }
                        var f = Listview.funcBox.getLowerSource(k.source[0], c, h);
                        if (this.iconSize != 0 && f != null) {
                            var b = ce("div");
                            b.className = "small2";
                            if (f.pretext) {
                                ae(b, ct(f.pretext))
                            }
                            if (f.url) {
                                var j = ce("a");
                                j.className = "q1";
                                j.href = f.url;
                                ae(j, ct(f.text));
                                ae(b, j)
                            } else {
                                ae(b, ct(f.text))
                            }
                            if (f.posttext) {
                                ae(b, ct(f.posttext))
                            }
                            ae(d, b)
                        }
                    } else {
                        var l = "";
                        for (var e = 0, g = k.source.length; e < g; ++e) {
                            if (e > 0) {
                                l += LANG.comma
                            }
                            l += openDB_sources[k.source[e]]
                        }
                        return l
                    }
                }
            },
            getVisibleText: function(c) {
                if (c.source != null) {
                    if (c.source.length == 1) {
                        var e = "";
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                        return e
                    } else {
                        return Listview.funcBox.arrayText(c.source, openDB_sources)
                    }
                }
            },
            sortFunc: function(f, d) {
                var g = Listview.funcBox.assocArrCmp(f.source, d.source, openDB_sources);
                if (g != 0) {
                    return g
                }
                var e = (f.sourcemore && f.source.length == 1 ? f.sourcemore[0].n : null),
                    c = (d.sourcemore && d.source.length == 1 ? d.sourcemore[0].n : null);
                return strcmp(e, c)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function(d, e) {
                e.className = "small q1";
                nw(e);
                var b = ce("a");
                var c = Listview.funcBox.getItemType(d.classs, d.subclass, d.subsubclass);
                b.href = c.url;
                ae(b, ct(c.text));
                ae(e, b)
            },
            getVisibleText: function(a) {
                return Listview.funcBox.getItemType(a.classs, a.subclass, a.subsubclass).text
            },
            sortFunc: function(d, c, f) {
                var e = Listview.funcBox.getItemType;
                return strcmp(e(d.classs, d.subclass, d.subsubclass).text, e(c.classs, c.subclass, c.subsubclass).text)
            }
        }],
        getItemLink: function(a) {
            return "item=" + a.id
        },
        onBeforeCreate: function() {
            var b = false;
            for (var c = 0, a = this.data.length; c < a; ++c) {
                var d = this.data[c];
                if (d.slot > 0 && d.slot != 18) {
                    ++b
                } else {
                    d.__nochk = 1
                }
            }
            if (b > 0) {
                this.mode = 1;
                this._nComparable = b
            }
        },
        createCbControls: function(d, c) {
            if (!c && this._nComparable < 15) {
                return
            }
            var b = ce("input"),
                a = ce("input");
            b.type = a.type = "button";
            b.value = LANG.button_compare;
            a.value = LANG.button_deselect;
            b.onclick = this.template.compareItems.bind(this);
            a.onclick = Listview.cbSelect.bind(this, false);
            ae(d, b);
            ae(d, a)
        },
        compareItems: function() {
            var b = this.getCheckedRows();
            if (!b.length) {
                return
            }
            var a = "";
            array_walk(b, function(c) {
                a += c.id + ";"
            });
            su_addToSaved(rtrim(a, ";"))
        }
    },
    itemset: {
        sort: [1, 2],
        nItemsPerPage: 75,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(c, g) {
                var b = ce("a");
                b.className = "q" + (7 - parseInt(c.name.charAt(0)));
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name.substring(1)));
                var f = ce("div");
                f.style.position = "relative";
                ae(f, b);
                if (c.heroic) {
                    var e = ce("div");
                    e.className = "small q2";
                    e.style.fontStyle = "italic";
                    e.style.position = "absolute";
                    e.style.right = "3px";
                    e.style.bottom = "3px";
                    ae(e, ct(LANG.lvitem_heroicitem));
                    ae(f, e)
                }
                if (c.elite) {
                    var e = ce("div");
                    e.className = "small q2";
                    e.style.fontStyle = "italic";
                    e.style.position = "absolute";
                    e.style.right = "3px";
                    e.style.bottom = "3px";
                    ae(e, ct(LANG.lvitem_eliteitem));
                    ae(f, e)
                }
                if (c.raidfinder) {
                    var e = ce("div");
                    e.className = "small q2";
                    e.style.fontStyle = "italic";
                    e.style.position = "absolute";
                    e.style.right = "3px";
                    e.style.bottom = "3px";
                    ae(e, ct(LANG.lvitem_raidfinderitem));
                    ae(f, e)
                }
                ae(g, f);
                if (c.note) {
                    var e = ce("div");
                    e.className = "small";
                    ae(e, ct(openDB_itemset_notes[c.note]));
                    ae(g, e)
                }
            },
            getVisibleText: function(b) {
                var c = b.name.substring(1);
                if (b.note) {
                    c += " " + openDB_itemset_notes[b.note]
                }
                return c
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function(b) {
                return b.minlevel
            },
            getMaxValue: function(b) {
                return b.maxlevel
            },
            compute: function(b, c) {
                if (b.minlevel > 0 && b.maxlevel > 0) {
                    if (b.minlevel != b.maxlevel) {
                        return b.minlevel + LANG.hyphen + b.maxlevel
                    } else {
                        return b.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function(d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "pieces",
            name: LANG.pieces,
            getValue: function(b) {
                return b.pieces.length
            },
            compute: function(b, c) {
                c.style.padding = "0";
                Listview.funcBox.createCenteredIcons(b.pieces, c)
            },
            sortFunc: function(d, c) {
                var f = (d.pieces != null ? d.pieces.length : 0);
                var e = (c.pieces != null ? c.pieces.length : 0);
                return strcmp(f, e)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function(b, c) {
                return openDB_itemset_types[b.type]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_itemset_types[d.type], openDB_itemset_types[c.type])
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            width: "20%",
            getVisibleText: function(e) {
                var f = "";
                if (e.reqclass) {
                    var d = Listview.funcBox.assocBinFlags(e.reqclass, openDB_chr_classes);
                    for (var c = 0, b = d.length; c < b; ++c) {
                        if (c > 0) {
                            f += LANG.comma
                        }
                        f += openDB_chr_classes[d[c]]
                    }
                }
                return f
            },
            compute: function(h, k) {
                if (h.reqclass) {
                    var f = Listview.funcBox.assocBinFlags(h.reqclass, openDB_chr_classes);
                    var j = ce("div");
                    j.style.width = (26 * f.length) + "px";
                    j.style.margin = "0 auto";
                    for (var e = 0, b = f.length; e < b; ++e) {
                        var g = Icon.create("class_" + openDB_file_classes[f[e]], 0, null, "javascript:;");
                        g.style.cssFloat = g.style.styleFloat = "left";
                        var c = openDB_chr_classes[f[e]];
                        $j(g).mouseover(function(d) {
                            Tooltip.showAtCursor(d, c, 0, 0, "q")
                        }).mousemove(function(d) {
                            Tooltip.cursorUpdate(d)
                        }).mouseout(function() {
                            Tooltip.hide()
                        });
                        ae(j, g)
                    }
                    ae(k, j)
                }
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, openDB_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, openDB_chr_classes), openDB_chr_classes)
            }
        }],
        getItemLink: function(b) {
            return "/itemset=" + b.id
        }
    },
    npc: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(c, f) {
                if (c.boss) {
                    f.className = "boss-padded-icon"
                }
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                ae(f, b);
                if (c.tag != null) {
                    var e = ce("div");
                    e.className = "small";
                    ae(e, ct("<" + c.tag + ">"));
                    ae(f, e)
                }
            },
            getVisibleText: function(a) {
                var b = a.name;
                if (a.tag) {
                    b += " <" + a.tag + ">"
                }
                if (a.boss) {
                    b += " boss skull"
                }
                return b
            },
            sortFunc: function(d, c, e) {
                return strcmp(c.boss, d.boss) || strcmp(d.name, c.name)
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function(a) {
                return a.minlevel
            },
            getMaxValue: function(a) {
                return a.maxlevel
            },
            compute: function(a, c) {
                if (a.classification) {
                    var b = ce("div");
                    b.className = "small";
                    ae(b, ct(openDB_npc_classifications[a.classification]));
                    ae(c, b)
                }
                if (a.classification == 3 || a.maxlevel == 9999) {
                    return "??"
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
                return -1
            },
            getVisibleText: function(a) {
                var b = "";
                if (a.classification) {
                    b += " " + openDB_npc_classifications[a.classification]
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    b += " ";
                    if (a.maxlevel == 9999) {
                        b += "??"
                    } else {
                        if (a.minlevel != a.maxlevel) {
                            b += a.minlevel + LANG.hyphen + a.maxlevel
                        } else {
                            b += a.minlevel
                        }
                    }
                }
                return b
            },
            sortFunc: function(d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel) || strcmp(d.classification, c.classification)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel) || strcmp(d.classification, c.classification)
                }
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function(a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function(a) {
                return Listview.funcBox.arrayText(a.location, openDB_zones)
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, openDB_zones)
            }
        }, {
            id: "react",
            name: LANG.react,
            type: "text",
            width: "10%",
            value: "react",
            filtrable: 0,
            compute: function(b, g) {
                if (b.react == null) {
                    return -1
                }
                var d = [LANG.lvnpc_alliance, LANG.lvnpc_horde];
                var f = 0;
                for (var a = 0; a < 2; ++a) {
                    if (b.react[a] != null) {
                        if (f++ > 0) {
                            ae(g, ct(" "))
                        }
                        var e = ce("span");
                        e.className = (b.react[a] < 0 ? "q10" : (b.react[a] > 0 ? "q2" : "q"));
                        ae(e, ct(d[a]));
                        ae(g, e)
                    }
                }
            }
        }, {
            id: "skin",
            name: LANG.skin,
            type: "text",
            value: "skin",
            compute: function(c, d) {
                if (c.skin) {
                    var b = ce("a");
                    b.className = ((isset("openDB_thottbot") && openDB_thottbot) ? "q" : "q1");
                    b.href = "/npcs&filter=cr=35;crs=0;crv=" + c.skin;
                    ae(b, ct(c.skin));
                    ae(d, b)
                }
            },
            hidden: 1
        }, {
            id: "petfamily",
            name: LANG.petfamily,
            type: "text",
            width: "12%",
            compute: function(c, d) {
                d.className = "q1";
                var b = ce("a");
                b.href = "/pet=" + c.family;
                ae(b, ct(openDB_pet_families[c.family]));
                ae(d, b)
            },
            getVisibleText: function(a) {
                return openDB_pet_families[a.family]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_pet_families[d.family], openDB_pet_families[c.family])
            },
            hidden: 1
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function(c, d) {
                d.className = "small q1";
                var b = ce("a");
                b.href = "/npcs=" + c.type;
                ae(b, ct(openDB_npc_types[c.type]));
                ae(d, b)
            },
            getVisibleText: function(a) {
                return openDB_npc_types[a.type]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_npc_types[d.type], openDB_npc_types[c.type])
            }
        }],
        getItemLink: function(a) {
            return "/npc=" + a.id
        }
    },
    object: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(c, d) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                ae(d, b)
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function(a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function(a) {
                return Listview.funcBox.arrayText(a.location, openDB_zones)
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, openDB_zones)
            }
        }, {
            id: "skill",
            name: LANG.skill,
            width: "10%",
            value: "skill",
            hidden: true
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function(c, d) {
                d.className = "small q1";
                var b = ce("a");
                b.href = "objects=" + c.type;
                ae(b, ct(openDB_object_types[c.type]));
                ae(d, b)
            },
            getVisibleText: function(a) {
                return openDB_object_types[a.type]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_object_types[d.type], openDB_object_types[c.type])
            }
        }],
        getItemLink: function(a) {
            return "object=" + a.id
        }
    },
    quest: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(j, f) {
                var l = $j("<a/>", {
                    css: {
                        "font-family": "Verdana, sans serif"
                    },
                    href: this.template.getItemLink(j),
                    text: j.name
                });
                var b = $j("<div/>");
                b.append(l);
                if (j.reqclass) {
                    var k = $j("<div/>", {
                        "class": "small2"
                    });
                    var e = Listview.funcBox.assocBinFlags(j.reqclass, openDB_chr_classes);
                    for (var g = 0, h = e.length; g < h; ++g) {
                        if (g > 0) {
                            k.append(", ")
                        }
                        var l = $j("<a/>", {
                            href: "javascript:;",
                            "class": "c" + e[g],
                            text: openDB_chr_classes[e[g]]
                        });
                        k.append(l)
                    }
                    b.append(k)
                }
                if (j.historical || (j.wflags & 32) || (j.reqrace && j.reqrace != -1)) {
                    b.css("position", "relative");
                    var k = $j("<div/>", {
                        "class": "small",
                        css: {
                            "font-style": "italic",
                            position: "absolute",
                            right: "3px",
                            bottom: "3px",
                            "text-align": "right"
                        }
                    });
                    if (j.historical) {
                        var m = $j("<span/>", {
                            css: {
                                color: "red"
                            },
                            text: LANG.lvquest_removed
                        });
                        k.append(m)
                    }
                    if (j.wflags & 32) {
                        if (j.historical) {
                            k.append($j("<br/>"));
                            b.css("height", "33px")
                        }
                        var m = $j("<span/>", {
                            text: LANG.lvquest_autoaccept
                        });
                        if (j.wflags & 64) {
                            m.css("color", "red").append(" " + LANG.lvquest_hostile)
                        }
                        k.append(m)
                    }
                    if (j.reqrace && j.reqrace != -1) {
                        var c = Listview.funcBox.assocBinFlags(j.reqrace, openDB_chr_races);
                        if (c.length && (j.historical || (j.wflags & 32))) {
                            k.append($j("<br/>"));
                            b.css("height", "33px")
                        }
                        for (var g = 0, h = c.length; g < h; ++g) {
                            if (g > 0) {
                                k.append(", ")
                            }
                            var l = $j("<a/>", {
                                "class": "q1",
                                href: "javascript:;",
                                text: openDB_chr_races[c[g]]
                            });
                            k.append(l)
                        }
                    }
                    b.append(k)
                }
                $j(f).append(b)
            }
        }, {
            id: "level",
            name: LANG.level,
            value: "level",
            compute: function(a, c) {
                if (a.type || a.daily || a.weekly) {
                    var b = ce("div");
                    b.className = "small";
                    nw(b);
                    if (a.daily) {
                        if (a.type) {
                            ae(b, ct(sprintf(LANG.lvquest_daily, openDB_quest_types[a.type])))
                        } else {
                            ae(b, ct(LANG.daily))
                        }
                    } else {
                        if (a.weekly) {
                            if (a.type) {
                                ae(b, ct(sprintf(LANG.lvquest_weekly, openDB_quest_types[a.type])))
                            } else {
                                ae(b, ct(LANG.weekly))
                            }
                        } else {
                            if (a.type) {
                                ae(b, ct(openDB_quest_types[a.type]))
                            }
                        }
                    }
                    ae(c, b)
                }
                return a.level
            },
            getVisibleText: function(a) {
                var b = "";
                if (a.type) {
                    b += " " + openDB_quest_types[a.type]
                }
                if (a.daily) {
                    b += " " + LANG.daily
                } else {
                    if (a.weekly) {
                        b += " " + LANG.weekly
                    }
                }
                if (a.level) {
                    b += " " + a.level
                }
                return b
            },
            sortFunc: function(d, c, e) {
                return strcmp(d.level, c.level) || strcmp(d.type, c.type)
            }
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            value: "reqlevel"
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function(a, c) {
                if (a.side && a.side != 3) {
                    var b = ce("span");
                    b.className = (a.side == 1 ? "alliance-icon" : "horde-icon");
                    b.onmouseover = function(d) {
                        Tooltip.showAtCursor(d, openDB_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = Tooltip.cursorUpdate;
                    b.onmouseout = Tooltip.hide;
                    ae(c, b)
                } else {
                    if (!a.side) {
                        ae(c, ct("??"))
                    }
                }
            },
            getVisibleText: function(a) {
                if (a.side) {
                    return openDB_sides[a.side]
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_sides[d.side], openDB_sides[c.side])
            }
        }, {
            id: "rewards",
            name: LANG.rewards,
            compute: function(b, g) {
                var a = (b.itemchoices != null || b.itemrewards != null);
                if (a) {
                    var f, e;
                    if (b.itemchoices && b.itemchoices.length > 1) {
                        f = LANG.lvquest_pickone;
                        if (b.itemrewards && b.itemrewards.length > 0) {
                            e = LANG.lvquest_alsoget
                        }
                    }
                    Listview.funcBox.createCenteredIcons(b.itemchoices, g, f, 2);
                    Listview.funcBox.createCenteredIcons(b.itemrewards, g, e, 2)
                }
                if (b.titlereward && openDB_titles[b.titlereward]) {
                    var d = openDB_titles[b.titlereward]["name_" + Locale.getName()];
                    d = d.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
                    var c = ce("a");
                    c.className = "q1";
                    c.href = "/title=" + b.titlereward;
                    c.innerHTML = d;
                    ae(g, c);
                    ae(g, ce("br"))
                }
            },
            getVisibleText: function(a) {
                var b = "";
                if (a.itemchoices && a.itemchoices.length) {
                    b += " " + LANG.lvquest_pickone;
                    if (a.itemrewards && a.itemrewards.length) {
                        b += " " + LANG.lvquest_alsoget
                    }
                }
                if (a.titlereward && openDB_titles[a.titlereward]) {
                    b += " " + openDB_titles[a.titlereward]["name_" + Locale.getName()]
                }
                return b
            },
            sortFunc: function(d, c, f) {
                var i = (d.itemchoices != null ? d.itemchoices.length : 0) + (d.itemrewards != null ? d.itemrewards.length : 0);
                var h = (c.itemchoices != null ? c.itemchoices.length : 0) + (c.itemrewards != null ? c.itemrewards.length : 0);
                var e = (d.titlereward && openDB_titles[d.titlereward] ? openDB_titles[d.titlereward]["name_" + Locale.getName()] : "");
                var g = (c.titlereward && openDB_titles[c.titlereward] ? openDB_titles[c.titlereward]["name_" + Locale.getName()] : "");
                return strcmp(i, h) || strcmp(e, g)
            }
        }, {
            id: "experience",
            name: "Exp",
            value: "xp"
        }, {
            id: "money",
            name: "Money",
            compute: function(a, b) {
                if (a.money > 0 || a.currencyrewards != null) {
                    if (a.money > 0) {
                        Listview.funcBox.appendMoney(b, a.money);
                        if (a.currencyrewards != null) {
                            ae(b, ct(" + "))
                        }
                    }
                    if (a.currencyrewards != null) {
                        Listview.funcBox.appendMoney(b, null, a.side, null, a.currencyrewards)
                    }
                }
            },
            getVisibleText: function(a) {
                var c = "";
                for (var b = 0; b < a.currencyrewards.length; ++b) {
                    if (openDB_gatheredcurrencies[a.currencyrewards[b][0]]) {
                        c += " " + openDB_gatheredcurrencies[a.currencyrewards[b][0]]["name_" + Locale.getName()]
                    }
                }
                return c
            },
            sortFunc: function(d, c, e) {
                var g = 0,
                    f = 0;
                if (d.currencyrewards && d.currencyrewards.length) {
                    $.each(d.currencyrewards, function(a, b) {
                        g += b[1]
                    })
                }
                if (c.currencyrewards && c.currencyrewards.length) {
                    $.each(c.currencyrewards, function(a, b) {
                        f += b[1]
                    })
                }
                return strcmp(g, f) || strcmp(d.money, c.money)
            }
        }, {
            id: "reputation",
            name: LANG.reputation,
            width: "14%",
            value: "id",
            hidden: true
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            compute: function(c, d) {
                if (c.category != 0) {
                    d.className = "small q1";
                    var b = ce("a");
                    b.href = "/quests=" + c.category2 + "." + c.category;
                    ae(b, ct(Listview.funcBox.getQuestCategory(c.category)));
                    ae(d, b)
                }
            },
            getVisibleText: function(a) {
                return Listview.funcBox.getQuestCategory(a.category)
            },
            sortFunc: function(d, c, f) {
                var e = Listview.funcBox.getQuestCategory;
                return strcmp(e(d.category), e(c.category))
            }
        }],
        getItemLink: function(a) {
            return "/quest=" + a.id
        }
    },
    spell: {
        sort: ["name", "skill", "level"],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function(j, g, m) {
                var h = ce("td"),
                    p;
                h.style.width = "44px";
                h.style.padding = "0";
                h.style.borderRight = "none";
                if (j.creates != null) {
                    p = openDB_items.createIcon(j.creates[0], 1, Listview.funcBox.createTextRange(j.creates[1], j.creates[2]))
                } else {
                    p = openDB_spells.createIcon(j.id, 1)
                }
                p.style.cssFloat = p.style.styleFloat = "left";
                ae(h, p);
                ae(m, h);
                g.style.borderLeft = "none";
                var b = ce("div");
                var o = ce("a");
                var n = j.name.charAt(0);
                if (n != "@") {
                    o.className = "q" + (7 - parseInt(n))
                }
                o.style.fontFamily = "Verdana, sans-serif";
                o.href = this.template.getItemLink(j);
                ae(o, ct(j.name.substring(1)));
                ae(b, o);
                if (j.rank) {
                    var l = ce("div");
                    l.className = "small2";
                    ae(l, ct(j.rank));
                    ae(b, l)
                }
                if (this.showRecipeClass && j.reqclass) {
                    var l = ce("div");
                    l.className = "small2";
                    var f = Listview.funcBox.assocBinFlags(j.reqclass, openDB_chr_classes);
                    for (var h = 0, k = f.length; h < k; ++h) {
                        if (h > 0) {
                            ae(l, ct(", "))
                        }
                        var o = ce("a");
                        o.href = "javascript:;";
                        o.className = "c" + f[h];
                        st(o, openDB_chr_classes[f[h]]);
                        ae(l, o)
                    }
                    ae(b, l)
                }
                if (j.reqrace) {
                    b.style.position = "relative";
                    var l = ce("div");
                    l.className = "small";
                    l.style.fontStyle = "italic";
                    l.style.position = "absolute";
                    l.style.right = l.style.bottom = "3px";
                    if ((j.reqrace & 1791) == 1101) {
                        ae(l, ct(openDB_sides[1]))
                    } else {
                        if ((j.reqrace & 1791) == 690) {
                            ae(l, ct(openDB_sides[2]))
                        } else {
                            var e = Listview.funcBox.assocBinFlags(j.reqrace, openDB_chr_races);
                            l.className += "q1";
                            for (var h = 0, k = e.length; h < k; ++h) {
                                if (h > 0) {
                                    ae(l, ct(LANG.comma))
                                }
                                var o = ce("a");
                                o.href = "javascript:;";
                                st(o, openDB_chr_races[e[h]]);
                                ae(l, o)
                            }
                        }
                    }
                    ae(b, l)
                }
                ae(g, b)
            },
            getVisibleText: function(c) {
                var f = c.name;
                if (c.rank) {
                    f += " " + c.rank
                }
                if (c.reqclass) {
                    var e = Listview.funcBox.assocBinFlags(c.reqclass, openDB_chr_classes);
                    for (var d = 0, b = e.length; d < b; ++d) {
                        if (d > 0) {
                            f += LANG.comma
                        }
                        f += openDB_chr_classes[e[d]]
                    }
                }
                if (c.reqrace) {
                    f += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(c.reqrace, openDB_chr_races), openDB_chr_races)
                }
                return f
            }
        }, {
            id: "tier",
            name: LANG.tier,
            width: "10%",
            value: "level",
            compute: function(c, e) {
                if (c.level > 0) {
                    var b = (!this._petTalents ? 10 : 20),
                        d = (!this._petTalents ? 5 : 12);
                    return Math.floor((c.level - b) / d) + 1
                }
            },
            hidden: true
        }, {
            id: "level",
            name: LANG.level,
            width: "10%",
            value: "level",
            compute: function(b, c) {
                if (b.level > 0) {
                    return b.level
                }
            },
            hidden: true
        }, {
            id: "trainingcost",
            name: LANG.cost,
            width: "10%",
            hidden: true,
            getValue: function(b) {
                if (b.trainingcost) {
                    return b.trainingcost
                }
            },
            compute: function(b, c) {
                if (b.trainingcost) {
                    Listview.funcBox.appendMoney(c, b.trainingcost)
                }
            },
            sortFunc: function(d, c, e) {
                if (d.trainingcost == null) {
                    return -1
                } else {
                    if (c.trainingcost == null) {
                        return 1
                    }
                }
                if (d.trainingcost < c.trainingcost) {
                    return -1
                } else {
                    if (d.trainingcost > c.trainingcost) {
                        return 1
                    }
                }
                return 0
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            hidden: true,
            width: "20%",
            getVisibleText: function(c) {
                var f = "";
                if (c.reqclass) {
                    var e = Listview.funcBox.assocBinFlags(c.reqclass, openDB_chr_classes);
                    for (var d = 0, b = e.length; d < b; ++d) {
                        if (d > 0) {
                            f += LANG.comma
                        }
                        f += openDB_chr_classes[e[d]]
                    }
                }
                return f
            },
            compute: function(e, k) {
                if (e.reqclass) {
                    var g = Listview.funcBox.assocBinFlags(e.reqclass, openDB_chr_classes);
                    var j = ce("div");
                    j.style.width = (26 * g.length) + "px";
                    j.style.margin = "0 auto";
                    for (var f = 0, b = g.length; f < b; ++f) {
                        var h = Icon.create("class_" + openDB_file_classes[g[f]], 0, null, "/class=" + g[f]);
                        h.style.cssFloat = h.style.styleFloat = "left";
                        var c = openDB_chr_classes[g[f]];
                        $(h).mouseover(function(d) {
                            Tooltip.showAtCursor(d, c, 0, 0, "q")
                        }).mousemove(function(d) {
                            Tooltip.cursorUpdate(d)
                        }).mouseout(function() {
                            Tooltip.hide()
                        });
                        ae(j, h)
                    }
                    ae(k, j)
                }
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, openDB_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, openDB_chr_classes), openDB_chr_classes)
            }
        }, {
            id: "singleclass",
            name: LANG.classs,
            type: "text",
            hidden: true,
            width: "15%",
            compute: function(b, f) {
                if (b.reqclass) {
                    var c = Listview.funcBox.assocBinFlags(b.reqclass, openDB_chr_classes);
                    var d = c[0];
                    var e = $("<a>").css("background-image", 'url(https://cdn.openwow.com/' + qsUrl + '/icons/tiny/class_' + openDB_file_classes[d] + '.gif")').addClass("icontiny tinyspecial").addClass("c" + d).attr("href", "/class=" + d).text(openDB_chr_classes[d]);
                    $(f).append(e)
                }
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, openDB_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, openDB_chr_classes), openDB_chr_classes)
            }
        }, {
            id: "glyphtype",
            name: LANG.glyphtype,
            type: "text",
            hidden: true,
            width: "10%",
            compute: function(b, c) {
                if (b.glyphtype) {
                    return openDB_item_glyphs[b.glyphtype]
                }
            }
        }, {
            id: "guildlevel",
            name: LANG.guildlevel,
            width: "10%",
            value: "guildlevel",
            compute: function(b, c) {
                if (b.guildlevel > 0) {
                    return b.guildlevel
                }
            },
            hidden: true
        }, {
            id: "schools",
            name: LANG.school,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function(b, f) {
                var e = "";
                var d = b.schools ? b.schools : b.school;
                for (var c = 0; c < 32; ++c) {
                    if (!(d & (1 << c))) {
                        continue
                    }
                    if (e != "") {
                        e += ", "
                    }
                    e += openDB_spell_resistances[c]
                }
                return e
            },
            sortFunc: function(d, c, e) {
                return strcmp(this.compute(d), this.compute(c))
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function(b, c) {
                if (openDB_spell_types[b.cat]) {
                    return openDB_spell_types[b.cat][b.type]
                }
                return b.type
            },
            sortFunc: function(d, c, e) {
                var g = (openDB_spell_types[d.cat] ? openDB_spell_types[d.cat][d.type] : d.type),
                    f = (openDB_spell_types[c.cat] ? openDB_spell_types[c.cat][c.type] : d.type);
                return strcmp(d.cat, c.cat) || strcmp(g, f)
            }
        }, {
            id: "reagents",
            name: LANG.reagents,
            width: "9%",
            getValue: function(b) {
                return (b.reagents ? b.reagents.length : 0)
            },
            compute: function(h, e) {
                var b = (h.reagents != null);
                if (b) {
                    e.style.padding = "0";
                    var l = ce("div");
                    var k = h.reagents;
                    l.style.width = (44 * k.length) + "px";
                    l.style.margin = "0 auto";
                    for (var f = 0, j = k.length; f < j; ++f) {
                        var c = k[f][0];
                        var g = k[f][1];
                        var m = openDB_items.createIcon(c, 1, g);
                        m.style.cssFloat = m.style.styleFloat = "left";
                        ae(l, m)
                    }
                    ae(e, l)
                }
            },
            sortFunc: function(d, c) {
                var f = (d.reagents != null ? d.reagents.length : 0);
                var e = (c.reagents != null ? c.reagents.length : 0);
                if (f > 0 && f == e) {
                    return strcmp(d.reagents.toString(), c.reagents.toString())
                } else {
                    return strcmp(f, e)
                }
            }
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            width: "12%",
            hidden: true,
            compute: function(c, f) {
                if (c.source != null) {
                    var e = "";
                    for (var d = 0, b = c.source.length; d < b; ++d) {
                        if (d > 0) {
                            e += LANG.comma
                        }
                        e += openDB_sources[c.source[d]]
                    }
                    return e
                }
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(d.source, c.source, openDB_sources)
            }
        }, {
            id: "branch",
            name: LANG.branch,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function(b, c) {
                if (b.project) {
                    if (openDB_project_branches[b.project.branch]) {
                        $(c).append(openDB_project_branches[b.project.branch] + "<br />")
                    }
                    $(c).append("<small" + (!b.project.rarity ? ' class="q0"' : "") + ">" + openDB_project_rarity[b.project.rarity || 0] + "</small>")
                }
            },
            getVisibleText: function(b) {
                var c = "";
                if (b.project) {
                    if (openDB_project_branches[b.project.branch]) {
                        c += openDB_project_branches[b.project.branch] + " "
                    }
                    c += openDB_project_rarity[b.project.rarity || 0]
                }
                return c
            },
            sortFunc: function(d, c, e) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                return strcmp(openDB_project_branches[d.project.branch], openDB_project_branches[c.project.branch]) || -strcmp(d.project.rarity, c.project.rarity)
            }
        }, {
            id: "fragments",
            name: LANG.fragments,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function(b, d) {
                if (b.project) {
                    var c = $("<a/>", {
                        href: "javascript:;",
                        text: b.project.ncurrency
                    });
                    c.addClass("q1");
                    if (openDB_gatheredcurrencies[b.project.currency]) {
                        c.addClass("icontinyr tip");
                        c.css("background-image", "url(https://cdn.openwow.com/" + qsUrl + "/icons/tiny/" + openDB_gatheredcurrencies[b.project.currency].icon[0].toLowerCase() + ".gif)");
                        c.mouseover(function(f) {
                            Tooltip.showAtCursor(f, openDB_gatheredcurrencies[b.project.currency]["name_" + Locale.getName()], 0, 0, "q")
                        });
                        c.mousemove(Tooltip.cursorUpdate);
                        c.mouseout(Tooltip.hide)
                    }
                    $(d).append(c)
                }
            },
            sortFunc: function(d, c, e) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                return strcmp(d.project.ncurrency, c.project.ncurrency) || strcmp(d.project.currency, c.project.currency)
            }
        }, {
            id: "keystone",
            name: LANG.keystone,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function(b, e) {
                if (b.project && b.project.nkeystones && openDB_items[b.project.keystone]) {
                    e.style.padding = "0";
                    var c = ce("div");
                    c.style.width = "44px";
                    c.style.margin = "0 auto";
                    ae(c, openDB_items.createIcon(b.project.keystone, 1, b.project.nkeystones));
                    ae(e, c)
                }
            },
            getVisibleText: function(b) {
                if (b.project && b.project.nkeystones && openDB_items[b.project.keystone]) {
                    return openDB_items[b.project.keystone]["name_" + Locale.getName()]
                }
            },
            sortFunc: function(d, c, g) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                var f = d.project.nkeystones && openDB_items[d.project.keystone] ? openDB_items[d.project.keystone]["name_" + Locale.getName()] : "";
                var e = c.project.nkeystones && openDB_items[c.project.keystone] ? openDB_items[c.project.keystone]["name_" + Locale.getName()] : "";
                return strcmp(f, e) || strcmp(d.project.nkeystones, c.project.nkeystones)
            }
        }, {
            id: "skill",
            name: LANG.skill,
            type: "text",
            width: "16%",
            getValue: function(b) {
                return b.learnedat
            },
            compute: function(j, g, m, r) {
                if (j.skill != null) {
                    this.skillsColumn = r;
                    var c = ce("div");
                    c.className = "small";
                    if (j.cat == -7 && j.pettype != null) {
                        j.skill = [];
                        var q = {
                            0: 410,
                            1: 409,
                            2: 411
                        };
                        for (var h = 0, k = j.pettype.length; h < k; ++h) {
                            j.skill.push(q[j.pettype[h]])
                        }
                    }
                    for (var h = 0, k = j.skill.length; h < k; ++h) {
                        if (h > 0) {
                            ae(c, ct(LANG.comma))
                        }
                        if (j.skill[h] == -1) {
                            ae(c, ct(LANG.ellipsis))
                        } else {
                            if (in_array([7, -2, -3, -5, -6, -7, 11, 9], j.cat) != -1) {
                                var o = ce("a");
                                o.className = "q1";
                                if (in_array([-5, -6], j.cat) != -1) {
                                    o.href = "/spells=" + j.cat
                                } else {
                                    o.href = "/spells=" + j.cat + "." + ((j.reqclass && (j.cat == 7 || j.cat == -2)) ? (j.reqclass) + "." : "") + j.skill[h]
                                }
                                var e = openDB_getGets();
                                var f = (e.spells ? e.spells.split(".") : [false, false]);
                                if (j.reqclass && (j.cat == 7 || j.cat == -2)) {
                                    if (h < 1 && (j.reqclass != f[1])) {
                                        var b = ce("a");
                                        b.className = "q0";
                                        b.href = "/spells=" + j.cat + "." + j.reqclass;
                                        ae(b, ct(openDB_chr_classes[j.reqclass]));
                                        ae(c, b);
                                        ae(c, ce("br"))
                                    }
                                }
                                ae(o, ct(j.cat == -7 && j.pettype != null ? openDB_pet_types[j.pettype[h]] : openDB_spell_skills[j.skill[h]]));
                                ae(c, o)
                            } else {
                                ae(c, ct(openDB_spell_skills[j.skill[h]]))
                            }
                        }
                    }
                    if (j.learnedat > 0) {
                        ae(c, ct(" ("));
                        var d = ce("span");
                        if (j.learnedat == 9999) {
                            d.className = "q0";
                            ae(d, ct("??"))
                        } else {
                            if (j.learnedat > 0) {
                                ae(d, ct(j.learnedat));
                                d.style.fontWeight = "bold"
                            }
                        }
                        ae(c, d);
                        ae(c, ct(")"))
                    }
                    ae(g, c);
                    if (j.colors != null) {
                        this.columns[r].type = null;
                        var l = j.colors,
                            p = 0;
                        for (var h = 0; h < l.length; ++h) {
                            if (l[h] > 0) {
                                ++p;
                                break
                            }
                        }
                        if (p > 0) {
                            p = 0;
                            c = ce("div");
                            c.className = "small";
                            c.style.fontWeight = "bold";
                            for (var h = 0; h < l.length; ++h) {
                                if (l[h] > 0) {
                                    if (p++ > 0) {
                                        ae(c, ct(" "))
                                    }
                                    var n = ce("span");
                                    n.className = "r" + (h + 1);
                                    ae(n, ct(l[h]));
                                    ae(c, n)
                                }
                            }
                            ae(g, c)
                        }
                    }
                }
            },
            getVisibleText: function(b) {
                var c = Listview.funcBox.arrayText(b.skill, openDB_spell_skills);
                if (b.learnedat > 0) {
                    c += " " + (b.learnedat == 9999 ? "??" : b.learnedat)
                }
                return c
            },
            sortFunc: function(e, c) {
                if (e.reqclass && c.reqclass) {
                    var h = strcmp(openDB_chr_classes[(1 + Math.log(e.reqclass) / Math.LN2)], openDB_chr_classes[(1 + Math.log(c.reqclass) / Math.LN2)]);
                    if (h) {
                        return h
                    }
                }
                var d = [e.learnedat, c.learnedat];
                for (var g = 0; g < 2; ++g) {
                    var j = (g == 0 ? e : c);
                    if (d[g] == 9999 && j.colors != null) {
                        var f = 0;
                        while (j.colors[f] == 0 && f < j.colors.length) {
                            f++
                        }
                        if (f < j.colors.length) {
                            d[g] = j.colors[f]
                        }
                    }
                }
                var k = strcmp(d[0], d[1]);
                if (k != 0) {
                    return k
                }
                if (e.colors != null && c.colors != null) {
                    for (var f = 0; f < 4; ++f) {
                        k = strcmp(e.colors[f], c.colors[f]);
                        if (k != 0) {
                            return k
                        }
                    }
                }
                if (e.pettype != null & c.pettype != null) {
                    return Listview.funcBox.assocArrCmp(e.pettype, c.pettype, openDB_pet_types)
                }
                return Listview.funcBox.assocArrCmp(e.skill, c.skill, openDB_spell_skills)
            }
        }, {
            id: "skillup",
            name: LANG.skillpoints,
            width: "10%",
            value: "nskillup",
            compute: function(b, c) {
                if (b.nskillup > 0) {
                    return b.nskillup
                }
            },
            hidden: true
        }],
        getItemLink: function(b) {
            return "/spell=" + b.id
        }
    },
    zone: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(c, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                if (c.expansion) {
                    var d = ce("span");
                    d.className = (c.expansion == 1 ? "bc-icon" : "wotlk-icon");
                    ae(d, b);
                    ae(e, d)
                } else {
                    ae(e, b)
                }
            },
            getVisibleText: function(a) {
                var b = a.name;
                if (a.expansion == 1) {
                    b += " bc"
                } else {
                    if (a.expansion == 2) {
                        b += "wotlk wrath"
                    }
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function(a) {
                return a.minlevel
            },
            getMaxValue: function(a) {
                return a.maxlevel
            },
            compute: function(a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
            },
            sortFunc: function(d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "territory",
            name: LANG.territory,
            type: "text",
            width: "13%",
            compute: function(a, c) {
                var b = ce("span");
                switch (a.territory) {
                    case 0:
                        b.className = "alliance-icon";
                        break;
                    case 1:
                        b.className = "horde-icon";
                        break;
                    case 4:
                        b.className = "ffapvp-icon";
                        break
                }
                ae(b, ct(openDB_zone_territories[a.territory]));
                ae(c, b)
            },
            getVisibleText: function(a) {
                return openDB_zone_territories[a.territory]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_zone_territories[d.territory], openDB_zone_territories[c.territory])
            }
        }, {
            id: "instancetype",
            name: LANG.instancetype,
            type: "text",
            compute: function(a, d) {
                if (a.instance > 0) {
                    var b = ce("span");
                    if ((a.instance >= 1 && a.instance <= 5) || a.instance == 7) {
                        b.className = "instance-icon" + a.instance
                    }
                    if (a.nplayers == -2) {
                        a.nplayers = "10/25"
                    }
                    var c = openDB_zone_instancetypes[a.instance];
                    if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        c += " (";
                        if (a.instance == 4) {
                            c += sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            c += sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                        c += ")"
                    }
                    ae(b, ct(c));
                    ae(d, b)
                }
            },
            getVisibleText: function(a) {
                if (a.instance > 0) {
                    var b = openDB_zone_instancetypes[a.instance];
                    if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        if (a.instance == 4) {
                            b += " " + sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            b += " " + sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                    }
                    return b
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_zone_instancetypes[d.instance], openDB_zone_instancetypes[c.instance]) || strcmp(d.instance, c.instance) || strcmp(d.nplayers, c.nplayers)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function(c, d) {
                d.className = "small q1";
                var b = ce("a");
                b.href = "zones=" + c.category;
                ae(b, ct(openDB_zone_categories[c.category]));
                ae(d, b)
            },
            getVisibleText: function(a) {
                return openDB_zone_categories[a.category]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_zone_categories[d.category], openDB_zone_categories[c.category])
            }
        }],
        getItemLink: function(a) {
            return "zone=" + a.id
        }
    },
    holiday: {
        sort: [2],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function(c, d) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.template.getItemLink(c);
                ae(b, ct(c.name));
                ae(d, b)
            },
            getVisibleText: function(a) {
                return a.name
            }
        }, {
            id: "date",
            name: LANG.date,
            type: "text",
            width: "16%",
            allText: true,
            compute: function(b, e) {
                if (b.startDate && b.endDate) {
                    var c = ce("span");
                    if (b.today);
                    c.style.color = "#00bb00";
                    var d = b.startDate,
                        a = b.endDate;
                    if (d != a) {
                        ae(c, ct(d + LANG.hyphen + a))
                    } else {
                        ae(c, ct(d))
                    }
                    ae(e, c)
                }
            },
            getVisibleText: function(b) {
                if (b.startDate && b.endDate) {
                    var d = b.startDate,
                        a = b.endDate;
                    if (d != a) {
                        return d + LANG.hyphen + a
                    } else {
                        return d
                    }
                }
                return ""
            },
            sortFunc: function(e, c, g) {
                if (e.startDate && c.startDate) {
                    return (e.startDate < c.startDate) ? -1 : (e.startDate > c.startDate) ? 1 : 0
                } else {
                    return e.startDate ? -1 : c.startDate ? 1 : 0
                }
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function(d, e) {
                e.className = "small q1";
                var b = ce("a"),
                    c = "events=" + d.category;
                b.href = c;
                ae(b, ct(openDB_holiday_categories[d.category]));
                ae(e, b)
            },
            getVisibleText: function(a) {
                return openDB_holiday_categories[a.category]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_holiday_categories[d.category], openDB_holiday_categories[c.category])
            },
            hidden: true
        }],
        getItemLink: function(a) {
            return "event=" + a.id
        }
    },
    comment: {
        sort: [1],
        mode: 2,
        nItemsPerPage: 40,
        poundable: 2,
        columns: [{
            value: "number"
        }, {
            value: "id"
        }, {
            value: "rating"
        }],
        compute: function(J, ac, ab) {
            var ag, I = new Date(J.date),
                Y = (openDB_serverTime - I) / 1000,
                h = (openDB_user.roles) != 0,
                ad = J.rating < 0 || J.purged || J.deleted || (J.__minPatch && openDB_getPatchVersion.T[J.__minPatch] > I),
                U = h || (J.user.toLowerCase() == openDB_user.name.toLowerCase() && !openDB_user.commentban),
                L = U && J.deleted == 0,
                d = U && J.replyTo != J.id,
                W = J.purged == 0 && J.deleted == 0 && openDB_user.id && J.user.toLowerCase() != openDB_user.name.toLowerCase() && in_array(J.raters, openDB_user.id, function(i) {
                    return i[0]
                }) == -1 && !openDB_user.ratingban,
                p = J.rating >= 0 && (openDB_user.id == 0 || W || openDB_user.ratingban),
                G = openDB_users[J.user];
            J.ratable = W;
            var aa = ac;
            var N = ce("div");
            var z = ce("div");
            var t = ce("em");
            J.divHeader = N;
            J.divBody = z;
            J.divLinks = t;
            aa.className = "comment-wrapper";
            if (J.indent) {
                aa.className += " comment-indent"
            }
            if (ad) {
                aa.className += " comment-collapsed"
            }
            ac = ce("div");
            ac.className = "comment comment" + (ab % 2);
            ae(aa, ac);
            N.className = "comment-header";
            ae(ac, N);
            var n = ce("em");
            n.className = "comment-rating";
            if (ad) {
                var D = ce("a");
                D.href = "javascript:;";
                D.onclick = Listview.funcBox.coToggleVis.bind(D, J);
                ae(D, ct(LANG.lvcomment_show));
                ae(n, D);
                ae(n, ct(" " + String.fromCharCode(160) + " "))
            }
            var A = ce("b");
            var v = ce("a");
            v.href = "javascript:;";
            ae(v, ct(LANG.lvcomment_rating));
            var E = ce("span");
            E.id = "commentrating" + J.id;
            Listview.funcBox.coDisplayRating(J, E);
            v.onclick = Listview.funcBox.coToggleRating.bind(this, J, E);
            ae(v, E);
            ae(A, v);
            ae(n, A);
            ae(n, ct(" "));
            var S = ce("span");
            var q = ce("a"),
                af = ce("a");
            if (W) {
                q.href = af.href = "javascript:;";
                q.onclick = Listview.funcBox.coRate.bind(q, J, 1);
                af.onclick = Listview.funcBox.coRate.bind(af, J, -1);
                if (h) {
                    var R = ce("a");
                    R.href = "javascript:;";
                    R.onclick = Listview.funcBox.coRate.bind(R, J, 0);
                    R.onmouseover = Listview.funcBox.coCustomRatingOver;
                    R.onmousemove = Tooltip.cursorUpdate;
                    R.onmouseout = Tooltip.hide;
                    ae(R, ct("[~]"));
                    ae(S, R);
                    ae(S, ct(" "))
                }
            } else {
                if (openDB_user.ratingban) {
                    q.href = af.href = "javascript:;"
                } else {
                    q.href = af.href = "/login=log"
                }
            }
            ae(q, ct("[+]"));
            if (!openDB_user.ratingban) {
                q.onmouseover = Listview.funcBox.coPlusRatingOver;
                af.onmouseover = Listview.funcBox.coMinusRatingOver;
                q.onmousemove = af.onmousemove = Tooltip.cursorUpdate;
                q.onmouseout = af.onmouseout = Tooltip.hide
            } else {
                openDB_addTooltip(q, LANG.tooltip_banned_rating, "q");
                openDB_addTooltip(af, LANG.tooltip_banned_rating, "q")
            }
            ae(af, ct("[-]"));
            ae(S, af);
            ae(S, ct(" "));
            ae(S, q);
            ae(n, S);
            if (!p) {
                S.style.display = "none"
            }
            ae(N, n);
            t.className = "comment-links";
            var c = false;
            if (U) {
                var b = ce("span");
                var Q = ce("a");
                ae(Q, ct(LANG.lvcomment_edit));
                Q.onclick = Listview.funcBox.coEdit.bind(this, J, 0, false);
                ns(Q);
                Q.href = "javascript:;";
                ae(b, Q);
                c = true;
                ae(t, b)
            }
            if (L) {
                var u = ce("span");
                var F = ce("a");
                if (c) {
                    ae(u, ct("|"))
                }
                ae(F, ct(LANG.lvcomment_delete));
                F.onclick = Listview.funcBox.coDelete.bind(this, J);
                ns(F);
                F.href = "javascript:;";
                ae(u, F);
                c = true;
                ae(t, u)
            }
            if (d) {
                var P = ce("span");
                var k = ce("a");
                if (c) {
                    ae(P, ct("|"))
                }
                ae(k, ct(LANG.lvcomment_detach));
                k.onclick = Listview.funcBox.coDetach.bind(this, J);
                ns(k);
                k.href = "javascript:;";
                ae(P, k);
                c = true;
                ae(t, P)
            }
            if (ae) {
                var K = ce("span");
                var m = ce("a");
                if (c) {
                    ae(K, ct("|"))
                }
                ae(m, ct(LANG.lvcomment_report));
                m.className = ("icon-report");
                m.href = "javascript:;";
                ae(K, m);
                c = true;
                ae(t, K)
            }
            if (!openDB_user.commentban) {
                var l = ce("span");
                var o = ce("a");
                if (c) {
                    ae(l, ct("|"))
                }
                ae(o, ct(LANG.lvcomment_reply));
                if (openDB_user.id > 0) {
                    o.onclick = Listview.funcBox.coReply.bind(this, J);
                    o.href = "javascript:;"
                } else {
                    o.href = "/login=log"
                }
                ae(l, o);
                c = true;
                ae(t, l)
            }
            if (ad) {
                z.style.display = "none";
                t.style.display = "none"
            }
            ae(N, t);
            var C = ce("var");
            ae(C, ct(LANG.lvcomment_by));
            aUser = ce("a");
            aUser.href = "javascript:;";
            ae(aUser, ct(J.user));
            ae(C, aUser);
            ae(C, ct(" "));
            var a = ce("a");
            a.className = "q0";
            a.id = "comments:id=" + J.id;
            a.href = "#" + a.id;
            Listview.funcBox.coFormatDate(a, Y, I, 0, 1);
            ae(C, a);
            if (G != null && G.avatar) {
                var j = Icon.createUser(G.avatar, G.avatarmore, 0, null, ((G.roles) ? (G.border ? 2 : 1) : 0));
                j.style.marginRight = "3px";
                j.style.cssFloat = j.style.styleFloat = "left";
                ae(N, j);
                C.style.lineHeight = "26px"
            }
            ae(N, C);
            z.className = "text comment-body" + Listview.funcBox.coGetColor(J);
            if (J.indent) {
                z.className += " comment-body-indent"
            }
            var V = 0,
                B = (this.id == "english-comments" ? "www" : "");
            z.innerHTML = Markup.toHtml(J.body, {
                allow: V,
                mode: Markup.MODE_COMMENT,
                roles: J.roles,
                locale: B
            });
            ae(ac, z);
            var H = ce("div");
            H.className = "text comment-body";
            if (J.indent) {
                H.className += " comment-body-indent"
            }
            if (J.response) {
                H.innerHTML = Markup.toHtml("[div][/div][response=" + J.responseuser + " roles=" + J.responseroles + "]" + J.response + "[/response]", {
                    allow: Markup.CLASS_STAFF,
                    roles: J.responseroles,
                    uid: "resp-" + J.id
                })
            }
            ae(ac, H);
            J.divResponse = H;
            if (J.roles == 0 || openDB_user.roles) {
                var X = ce("div");
                J.divLastEdit = X;
                X.className = "comment-lastedit";
                ae(X, ct(LANG.lvcomment_lastedit));
                var w = ce("a");
                ae(w, ct(" "));
                ae(X, w);
                ae(X, ct(" "));
                var O = ce("span");
                ae(X, O);
                ae(X, ct(" "));
                Listview.funcBox.coUpdateLastEdit(J);
                if (ad) {
                    X.style.display = "none"
                }
                ae(ac, X)
            }
        },
        createNote: function(b) {
            var g = ce("small");
            if (!openDB_user.commentban) {
                var m = ce("a");
                if (openDB_user.id > 0) {
                    m.href = "javascript:;";
                    m.onclick = co_addYourComment
                } else {
                    m.href = "/login=log"
                }
                ae(m, ct(LANG.lvcomment_add));
                ae(g, m);
                var e = ce("span");
                e.style.padding = "0 5px";
                e.style.color = "white";
                ae(e, ct("|"));
                ae(g, e)
            }
            ae(g, ct(LANG.lvcomment_sort));
            var n = ce("a");
            n.href = "javascript:;";
            ae(n, ct(LANG.lvcomment_sortdate));
            n.onclick = Listview.funcBox.coSortDate.bind(this, n);
            ae(g, n);
            ae(g, ct(LANG.comma));
            var o = ce("a");
            o.href = "javascript:;";
            ae(o, ct(LANG.lvcomment_sortrating));
            o.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, o);
            ae(g, o);
            var h = 1;
            if (h == "2") {
                o.onclick()
            } else {
                n.onclick()
            }
            ae(b, g)
        },
        onNoData: function(c) {
            var a = "<b>" + LANG.lvnodata_co1 + '</b><div class="pad2"></div>';
            if (openDB_user.id > 0) {
                var b = LANG.lvnodata_co2;
                b = b.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
                a += b
            } else {
                var b = LANG.lvnodata_co3;
                b = b.replace("<a>", '<a href="/login=log">');
                b = b.replace("<a>", '<a href="/login=reg">');
                a += b
            }
            c.style.padding = "1.5em 0";
            c.innerHTML = a
        },
        onBeforeCreate: function() {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = in_array(this.data, parseInt(RegExp.$1), function(b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return this.data[a]
            }
        },
        onAfterCreate: function(a) {
            if (a != null) {
                var b = a.__div;
                this.tabs.__st = b;
                b.firstChild.style.border = "1px solid #505050"
            }
        }
    },
    commentpreview: {
        sort: [4],
        nItemsPerPage: 75,
        columns: [{
            id: "subject",
            name: LANG.subject,
            align: "left",
            value: "subject",
            compute: function(f, e) {
                var b = ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(f);
                ae(b, ct(f.subject));
                ae(e, b);
                if (LANG.types[f.type]) {
                    var c = ce("div");
                    c.className = "small";
                    ae(c, ct(LANG.types[f.type][0]));
                    ae(e, c)
                }
            }
        }, {
            id: "preview",
            name: LANG.preview,
            align: "left",
            width: "50%",
            value: "preview",
            compute: function(g, f, b) {
                var c = ce("div");
                c.className = "crop";
                if (g.rating >= 10) {
                    c.className += " comment-green"
                }
                ae(c, ct(Markup.removeTags(g.preview, {
                    mode: Markup.MODE_ARTICLE
                })));
                ae(f, c);
                if (g.rating || g.deleted || g.purged) {
                    c = ce("div");
                    c.className = "small3";
                    if (g.rating) {
                        ae(c, ct(LANG.lvcomment_rating + (g.rating > 0 ? "+" : "") + g.rating))
                    }
                    var a = ce("span"),
                        e = "";
                    a.className = "q10";
                    if (g.deleted) {
                        e = LANG.lvcomment_deleted
                    } else {
                        if (g.purged) {
                            e = LANG.lvcomment_purged
                        }
                    }
                    ae(a, ct(e));
                    ae(c, a);
                    b.__status = a;
                    ae(f, c)
                }
            }
        }, {
            id: "author",
            name: LANG.author,
            value: "user",
            compute: function(d, c) {
                c.className = "q1";
                var b = ce("a");
                b.href = "javascript:;";
                ae(b, ct(d.user));
                ae(c, b)
            }
        }, {
            id: "posted",
            name: LANG.posted,
            width: "16%",
            value: "elapsed",
            compute: function(e, d) {
                var a = new Date(e.date),
                    c = (openDB_serverTime - a) / 1000;
                var b = ce("span");
                openDB_formatDate(b, c, a, 0, 1);
                ae(d, b)
            }
        }],
        getItemLink: function(a) {
            return openDB_getCommentDomain(a.domain) + "/" + (a.url ? a.url : openDB_types[a.type] + "=" + a.typeId) + (a.id != null ? "#comments:id=" + a.id : "")
        }
    },
    screenshot: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function(k, e, l) {
            var u, o = new Date(k.date),
                f = (openDB_serverTime - o) / 1000;
            e.className = "screenshot-cell";
            e.vAlign = "bottom";
            var q = ce("a");
            q.href = "#screenshots:id=" + k.id;
            q.onclick = rf2;
            var v = ce("img"),
                t = Math.min(150 / k.width, 150 / k.height);
            v.src = "/upload/thumb/" + k.file;
            ae(q, v);
            ae(e, q);
            var p = ce("div");
            p.className = "screenshot-cell-user";
            var m = (k.user != null && k.user.length);
            if (m) {
                q = ce("a");
                q.href = "javascript:;";
                ae(q, ct(k.user));
                ae(p, ct(LANG.lvscreenshot_from));
                ae(p, q);
                ae(p, ct(" "))
            }
            var j = ce("span");
            if (m) {} else {}
            ae(p, j);
            ae(e, p);
            p = ce("div");
            p.style.position = "relative";
            p.style.height = "1em";
            if (openDB_getLocale(true) != 0 && k.caption) {
                k.caption = ""
            }
            var h = (k.caption != null && k.caption.length);
            var g = (k.subject != null && k.subject.length);
            if (h || g) {
                var r = ce("div");
                r.className = "screenshot-caption";
                if (g) {
                    var c = ce("small");
                    ae(c, ct(LANG.types[k.type][0] + LANG.colon));
                    var b = ce("a");
                    ae(b, ct(k.subject));
                    b.href = openDB_types[k.type] + "=" + k.typeId;
                    ae(c, b);
                    ae(r, c);
                    if (h && k.caption.length) {
                        ae(c, ct(" (...)"))
                    }
                    ae(c, ce("br"))
                }
                if (h) {
                    aE(e, "mouseover", Listview.funcBox.ssCellOver.bind(r));
                    aE(e, "mouseout", Listview.funcBox.ssCellOut.bind(r));
                    var n = ce("span");
                    n.innerHTML = k.caption;
                    ae(r, n)
                }
                ae(p, r)
            }
            aE(e, "click", Listview.funcBox.ssCellClick.bind(this, l));
            ae(e, p)
        },
        createNote: function(d) {
            if (typeof openDB_pageInfo == "object" && openDB_pageInfo.type > 0) {
                var c = ce("small");
                var b = ce("a");
                if (openDB_user.id > 0) {
                    b.href = "javascript:;";
                    b.onclick = ss_submitAScreenshot
                } else {
                    b.href = "account=signin"
                }
                ae(b, ct(LANG.lvscreenshot_submit));
                ae(c, b);
                ae(d, c)
            }
        },
        onNoData: function(c) {
            if (typeof openDB_pageInfo == "object" && openDB_pageInfo.type > 0) {
                var a = "<b>" + LANG.lvnodata_ss1 + '</b><div class="pad2"></div>';
                if (openDB_user.id > 0) {
                    var b = LANG.lvnodata_ss2;
                    b = b.replace("<a>", '<a href="javascript:;" onclick="ss_submitAScreenshot()" onmousedown="return false">');
                    a += b
                } else {
                    var b = LANG.lvnodata_ss3;
                    b = b.replace("<a>", '<a href="/account=signin">');
                    b = b.replace("<a>", '<a href="/login=reg">');
                    a += b
                }
                c.style.padding = "1.5em 0";
                c.innerHTML = a
            } else {
                return -1
            }
        },
        onBeforeCreate: function() {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = in_array(this.data, parseInt(RegExp.$1), function(b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return a
            }
        },
        onAfterCreate: function(a) {
            if (a != null) {
                setTimeout((function() {
                    ScreenshotViewer.show({
                        screenshots: this.data,
                        pos: a
                    })
                }).bind(this), 1)
            }
        }
    },
    pet: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function(b, k, g) {
                var e = ce("td");
                e.style.width = "1px";
                e.style.padding = "0";
                e.style.borderRight = "none";
                ae(e, Icon.create(b.icon, 0));
                ae(g, e);
                k.style.borderLeft = "none";
                var j = ce("div");
                var c = ce("a");
                c.style.fontFamily = "Verdana, sans-serif";
                c.href = this.template.getItemLink(b);
                ae(c, ct(b.name));
                if (b.expansion) {
                    var f = ce("span");
                    f.className = (b.expansion == 1 ? "bc-icon" : "wotlk-icon");
                    ae(f, c);
                    ae(j, f)
                } else {
                    ae(j, c)
                }
                if (b.exotic) {
                    j.style.position = "relative";
                    var h = ce("div");
                    h.className = "small";
                    h.style.fontStyle = "italic";
                    h.style.position = "absolute";
                    h.style.right = "3px";
                    h.style.bottom = "0px";
                    ae(h, ct(LANG.lvpet_exotic));
                    ae(j, h)
                }
                ae(k, j)
            },
            getVisibleText: function(a) {
                var b = a.name;
                if (a.expansion == 1) {
                    b += " bc"
                } else {
                    if (a.expansion == 2) {
                        b += "wotlk wrath"
                    }
                }
                if (a.exotic) {
                    b += " " + LANG.lvpet_exotic
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function(a) {
                return a.minlevel
            },
            getMaxValue: function(a) {
                return a.maxlevel
            },
            compute: function(a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function(d, c, e) {
                if (e > 0) {
                    return strcmp(d.minlevel, c.minlevel) || strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return strcmp(d.maxlevel, c.maxlevel) || strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "damage",
            name: LANG.damage,
            value: "damage",
            compute: function(a, b) {
                ae(b, this.template.getStatPct(a.damage))
            }
        }, {
            id: "armor",
            name: LANG.armor,
            value: "armor",
            compute: function(a, b) {
                ae(b, this.template.getStatPct(a.armor))
            }
        }, {
            id: "health",
            name: LANG.health,
            value: "health",
            compute: function(a, b) {
                ae(b, this.template.getStatPct(a.health))
            }
        }, {
            id: "abilities",
            name: LANG.abilities,
            type: "text",
            getValue: function(b) {
                if (!b.spells) {
                    return ""
                }
                if (b.spells.length > 0) {
                    var d = "";
                    for (var c = 0, a = b.spells.length; c < a; ++c) {
                        if (b.spells[c]) {
                            d += openDB_spells[b.spells[c]]["name_" + openDB_locale.name]
                        }
                    }
                    return d
                }
            },
            compute: function(a, b) {
                if (!a.spells) {
                    return ""
                }
                if (a.spells.length > 0) {
                    b.style.padding = "0";
                    Listview.funcBox.createCenteredIcons(a.spells, b, "", 1)
                }
            },
            sortFunc: function(d, c) {
                if (!d.spells || !c.spells) {
                    return 0
                }
                return strcmp(d.spellCount, c.spellCount) || strcmp(d.spells, c.spells)
            },
            hidden: true
        }, {
            id: "diet",
            name: LANG.diet,
            type: "text",
            compute: function(a, e) {
                if (e) {
                    e.className = "small"
                }
                var b = 0,
                    c = "";
                for (var d in openDB_pet_foods) {
                    if (a.diet & d) {
                        if (b++ > 0) {
                            c += LANG.comma
                        }
                        c += openDB_pet_foods[d]
                    }
                }
                return c
            },
            sortFunc: function(d, c) {
                return strcmp(c.foodCount, d.foodCount) || Listview.funcBox.assocArrCmp(d.diet, c.diet, openDB_pet_foods)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function(b, d) {
                if (b.type != null) {
                    d.className = "small q1";
                    var c = ce("a");
                    c.href = "pets=" + b.type;
                    ae(c, ct(openDB_pet_types[b.type]));
                    ae(d, c)
                }
            },
            getVisibleText: function(a) {
                if (a.type != null) {
                    return openDB_pet_types[a.type]
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_pet_types[d.type], openDB_pet_types[c.type])
            }
        }],
        getItemLink: function(a) {
            return "pet=" + a.id
        },
        getStatPct: function(b) {
            var a = ce("span");
            if (!isNaN(b) && b > 0) {
                a.className = "q2";
                ae(a, ct("+" + b + "%"))
            } else {
                if (!isNaN(b) && b < 0) {
                    a.className = "q10";
                    ae(a, ct(b + "%"))
                }
            }
            return a
        }
    },
    achievement: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function(c, j, g) {
                var b = null;
                if (c.who && c.completed) {
                    b = "who=" + c.who + "&when=" + c.completed.getTime()
                }
                var f = ce("td");
                f.style.width = "1px";
                f.style.padding = "0";
                f.style.borderRight = "none";
                ae(f, openDB_achievements.createIcon(c.id, 1));
                Icon.getLink(f.firstChild).rel = b;
                ae(g, f);
                j.style.borderLeft = "none";
                var e = ce("a");
                e.style.fontFamily = "Verdana, sans-serif";
                e.href = this.template.getItemLink(c);
                e.rel = b;
                ae(e, ct(c.name));
                ae(j, e);
                if (c.description != null) {
                    var h = ce("div");
                    h.className = "small";
                    ae(h, ct(c.description));
                    ae(j, h)
                }
            },
            getVisibleText: function(a) {
                var b = a.name;
                if (a.description) {
                    b += " " + a.description
                }
                return b
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            width: "15%",
            compute: function(b, d) {
                if (b.zone) {
                    var c = ce("a");
                    c.className = "q1";
                    c.href = "zone=" + b.zone;
                    ae(c, ct(openDB_zones[b.zone]));
                    ae(d, c)
                }
            },
            getVisibleText: function(a) {
                return Listview.funcBox.arrayText(a.zone, openDB_zones)
            },
            sortFunc: function(d, c, e) {
                return Listview.funcBox.assocArrCmp(d.zone, c.zone, openDB_zones)
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            width: "10%",
            compute: function(a, c) {
                if (a.side) {
                    var b = ce("span");
                    if (a.side == 1) {
                        b.className = "alliance-icon"
                    } else {
                        if (a.side == 2) {
                            b.className = "horde-icon"
                        }
                    }
                    ae(b, ct(openDB_sides[a.side]));
                    ae(c, b)
                } else {
                    return -1
                }
            },
            getVisibleText: function(a) {
                if (a.side) {
                    return openDB_sides[a.side]
                }
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_sides[d.side], openDB_sides[c.side])
            }
        }, {
            id: "points",
            name: LANG.points,
            type: "number",
            width: "10%",
            value: "points",
            compute: function(a, b) {
                if (a.points) {
                    Listview.funcBox.appendMoney(b, 0, null, 0, 0, 0, a.points)
                }
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function(b, d) {
                d.className = "small q1";
                var c = ce("a");
                c.href = "achievements=" + b.category;
                ae(c, ct(openDB_achievement_categories[b.category]));
                ae(d, c)
            },
            getVisibleText: function(a) {
                return openDB_achievement_categories[a.category]
            },
            sortFunc: function(d, c, e) {
                return strcmp(openDB_achievement_categories[d.category], openDB_achievement_categories[c.category])
            },
            hidden: true
        }],
        getItemLink: function(a) {
            return "achievement=" + a.id
        }
    }
};
Menu.fixUrls(mn_items, "items=");
Menu.fixUrls(mn_itemSets, "itemsets=");
Menu.fixUrls(mn_npcs, "npcs=");
Menu.fixUrls(mn_objects, "objects=");
Menu.fixUrls(mn_quests, "quests=");
Menu.fixUrls(mn_spells, "spells=");
Menu.fixUrls(mn_zones, "zones=");
Menu.fixUrls(mn_pets, "pets=");
Menu.fixUrls(mn_factions, "factions=");
Menu.fixUrls(mn_achievements, "achievements=", null, true);
var openDB_dev = false;
var openDB_locale = {
    id: 0,
    name: "enus"
};
var openDB_localTime = new Date();
var openDB_items = {};
var openDB_quests = {};
var openDB_spells = {};
var openDB_achievements = {};
var openDB_users = {};
var openDB_types = {
    1: "npc",
    2: "object",
    3: "item",
    4: "itemset",
    5: "quest",
    6: "spell",
    7: "zone",
    8: "faction",
    9: "pet",
    10: "achievement"
};
var openDB_locales = {
    0: "enus",
    2: "frfr",
    3: "dede",
    6: "eses",
    8: "ruru",
    25: "ptr"
};
var openDB_file_races = {
    10: "bloodelf",
    11: "draenei",
    3: "dwarf",
    7: "gnome",
    1: "human",
    4: "nightelf",
    2: "orc",
    6: "tauren",
    8: "troll",
    5: "scourge"
};
var openDB_file_classes = {
    6: "deathknight",
    11: "druid",
    3: "hunter",
    8: "mage",
    2: "paladin",
    5: "priest",
    4: "rogue",
    7: "shaman",
    9: "warlock",
    1: "warrior"
};
var openDB_file_genders = {
    0: "male",
    1: "female"
};
var openDB_file_factions = {
    1: "alliance",
    2: "horde"
};
var openDB_file_gems = {
    1: "meta",
    2: "red",
    4: "yellow",
    6: "orange",
    8: "blue",
    10: "purple",
    12: "green",
    14: "prismatic"
};
var openDB_customColors = {
    Miyari: "pink"
};
openDB_items.add = function(b, a) {
    if (openDB_items[b] != null) {
        cO(openDB_items[b], a)
    } else {
        openDB_items[b] = a
    }
};
openDB_items.getIcon = function(a) {
    if (openDB_items[a] != null) {
        return openDB_items[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
openDB_items.createIcon = function(d, b, a, c) {
    return Icon.create(openDB_items.getIcon(d), b, null, "item=" + d, a, c)
};
openDB_spells.getIcon = function(a) {
    if (openDB_spells[a] != null) {
        return openDB_spells[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
openDB_spells.createIcon = function(d, b, a, c) {
    return Icon.create(openDB_spells.getIcon(d), b, null, "spell=" + d, a, c)
};
openDB_achievements.getIcon = function(a) {
    if (openDB_achievements[a] != null) {
        return openDB_achievements[a].icon
    } else {
        return "inv_misc_questionmark"
    }
};
openDB_achievements.createIcon = function(d, b, a, c) {
    return Icon.create(openDB_achievements.getIcon(d), b, null, "achievement=" + d, a, c)
};
var $utilGrp = new function() {
    var e, D, H, q, J, B, z, g = 0,
        C = {},
        f = {},
        c = {},
        G = 0,
        E = 1,
        h = 2,
        r = 3,
        F = 4,
        s = 1,
        j = 2,
        v = 3,
        y = 5,
        t = 6,
        m = 10,
        i = 100,
        o = 15,
        x = 15,
        p = {
            1: [C, "npc"],
            2: [f, "object"],
            3: [openDB_items, "item"],
            5: [openDB_quests, "quest"],
            6: [openDB_spells, "spell"],
            10: [openDB_achievements, "achievement"],
            100: [c, "profile"]
        };

    function K() {
        aE(document, "mouseover", u)
    }

    function n(O) {
        var P = openDB_getCursorPos(O);
        B = P.x;
        z = P.y
    }

    function M(aa, W) {
        if (aa.nodeName != "A" && aa.nodeName != "AREA") {
            return -2323
        }
        if (!aa.href.length) {
            return
        }
        if (aa.rel.indexOf("np") != -1) {
            return
        }
        var T, S, Q, P, U = {};
        q = U;
        var AB;
        var O = function(ab, af, ad) {
            if (af == "buff" || af == "sock") {
                U[af] = true
            } else {
                if (af == "rand" || af == "ench" || af == "lvl" || af == "c") {
                    U[af] = parseInt(ad)
                } else {
                    if (af == "gems" || af == "pcs") {
                        U[af] = ad.split(":")
                    } else {
                        if (af == "who" || af == "domain") {
                            U[af] = ad
                        } else {
                            if (af == "when") {
                                U[af] = new Date(parseInt(ad))
                            }
                        }
                    }
                }
            }
        };
        S = 2;
        Q = 3;
        P = aa.href.match(/()(item|quest|spell|achievement|npc|object)=([^&#]+)/);
        AB = aa.href;
        if (P == null && aa.rel) {
            T = 0;
            S = 1;
            Q = 2;
            P = aa.rel.match(/(item|quest|spell|achievement|npc|object).?([^&#]+)/);
            AB = aa.href;
        }
        if (aa.rel) {
            aa.rel.replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g, O);
            if (U.gems && U.gems.length > 0) {
                var V;
                for (V = Math.min(3, U.gems.length - 1); V >= 0; --V) {
                    if (parseInt(U.gems[V])) {
                        break
                    }
                }++V;
                if (V == 0) {
                    delete U.gems
                } else {
                    if (V < U.gems.length) {
                        U.gems = U.gems.slice(0, V)
                    }
                }
            }
        }
        if (P) {
            var Z, R = "www";
            J = aa;
            if (U.domain) {
                R = U.domain
            } else {
                if (T && P[T]) {
                    R = P[T]
                }
            }
            Z = openDB_locale.id;
            if (aa.href.indexOf("#") != -1 && document.location.href.indexOf(P[S] + "=" + P[Q]) != -1) {
                return
            }
            g = (aa.parentNode.className.indexOf("icon") == 0 ? 1 : 0);
            if (!aa.onmouseout) {
                if (g == 0) {
                    aa.onmousemove = a
                }
                aa.onmouseout = L
            }
            n(W);
            var Y = openDB_getIdFromTypeName(P[S]),
                X = P[Q];
            if (Y == i && !openDB_dev) {
                Z = 0
            }
            w(Y, X, Z, U, AB)
        }
    }

    function u(Q) {
        Q = $E(Q);
        var P = Q._target;
        var O = 0;
        while (P != null && O < 3 && M(P, Q) == -2323) {
            P = P.parentNode;
            ++O
        }
    }

    function a(O) {
        O = $E(O);
        n(O);
        Tooltip.move(B, z, 0, 0, o, x)
    }

    function L() {
        e = null;
        J = null;
        Tooltip.hide()
    }

    function I(O) {
        return (q.buff ? "buff_" : "tooltip_") + openDB_locales[O]
    }

    function k(P, R, Q) {
        var O = p[P][0];
        if (O[R] == null) {
            O[R] = {}
        }
        if (O[R].status == null) {
            O[R].status = {}
        }
        if (O[R].status[Q] == null) {
            O[R].status[Q] = G
        }
    }

    function w(P, T, R, S, AB) {
        if (!S) {
            S = {}
        }
        var Q = d(T, S);
        e = P;
        D = Q;
        H = R;
        q = S;
        k(P, Q, R);
        var O = p[P][0];
        if (O[Q].status[R] == F || O[Q].status[R] == r) {
            N(O[Q][I(R)], O[Q].icon)
        } else {
            if (O[Q].status[R] == E) {
                N(LANG.tooltip_loading)
            } else {
                b(P, T, R, null, S, AB)
            }
        }
    }

    function b(W, S, X, Q, T, AB) {
        var O = d(S, T);
        var V = p[W][0];
        if (V[O].status[X] != G && V[O].status[X] != h) {
            return
        }
        V[O].status[X] = E;
        if (!Q) {
            V[O].timer = setTimeout(function() {
                l.apply(this, [W, O, X])
            }, 333)
        }
        var R = "";
        for (var U in T) {
            if (U != "rand" && U != "ench" && U != "gems" && U != "sock") {
                continue
            }
            if (typeof T[U] == "object") {
                R += "&" + U + "=" + T[U].join(":")
            } else {
                if (U == "sock") {
                    R += "&sock"
                } else {
                    R += "&" + U + "=" + T[U]
                }
            }
        }
        var full = AB.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i);
        var su = full[1];
        if (su == "www") {
            su = "wotlk";
        }
        var P = "//" + su + ".openwow.com/" + p[W][1] + "=" + S + "&power=true";
        openDB_ajaxIshRequest(P)
    }

    function N(R, S) {
        if (J._fixTooltip) {
            R = J._fixTooltip(R, e, D, J)
        }
        if (!R) {
            R = LANG["tooltip_" + openDB_types[e] + "notfound"];
            S = "inv_misc_questionmark"
        } else {
            if (q != null) {
                if (q.pcs && q.pcs.length) {
                    var T = 0;
                    for (var Q = 0, P = q.pcs.length; Q < P; ++Q) {
                        var O;
                        if (O = R.match(new RegExp("<span><!--si([0-9]+:)*" + q.pcs[Q] + "(:[0-9]+)*-->"))) {
                            R = R.replace(O[0], '<span class="q8"><!--si' + q.pcs[Q] + "-->");
                            ++T
                        }
                    }
                    if (T > 0) {
                        R = R.replace("(0/", "(" + T + "/");
                        R = R.replace(new RegExp("<span>\\(([0-" + T + "])\\)", "g"), '<span class="q2">($1)')
                    }
                }
                if (q.c) {
                    R = R.replace(/<span class="c([0-9]+?)">(.+?)<\/span><br \/>/g, '<span class="c$1" style="display: none">$2</span>');
                    R = R.replace(new RegExp('<span class="c(' + q.c + ')" style="display: none">(.+?)</span>', "g"), '<span class="c$1">$2</span><br />')
                }
                if (q.lvl) {
                    R = R.replace(/\(<!--r([0-9]+):([0-9]+):([0-9]+)-->([0-9.%]+)(.+?)([0-9]+)\)/g, function(X, Z, Y, W, U, ab, V) {
                        var aa = openDB_convertRatingToPercent(q.lvl, Y, W);
                        aa = (Math.round(aa * 100) / 100);
                        if (Y != 12 && Y != 37) {
                            aa += "%"
                        }
                        return "(<!--r" + q.lvl + ":" + Y + ":" + W + "-->" + aa + ab + q.lvl + ")"
                    })
                }
                if (q.who && q.when) {
                    R = R.replace("<table><tr><td><br />", '<table><tr><td><br /><span class="q2">' + sprintf(LANG.tooltip_achievementcomplete, q.who, q.when.getMonth() + 1, q.when.getDate(), q.when.getFullYear()) + "</span><br /><br />");
                    R = R.replace(/class="q0"/g, 'class="r3"')
                }
            }
        }
        if (g == 1) {
            Tooltip.setIcon(null);
            Tooltip.show(J, R)
        } else {
            Tooltip.setIcon(S);
            Tooltip.showAtXY(R, B, z, o, x)
        }
    }

    function l(P, R, Q) {
        if (e == P && D == R && H == Q) {
            N(LANG.tooltip_loading);
            var O = p[P][0];
            O[R].timer = setTimeout(function() {
                A.apply(this, [P, R, Q])
            }, 3850)
        }
    }

    function A(P, R, Q) {
        var O = p[P][0];
        O[R].status[Q] = h;
        if (e == P && D == R && H == Q) {
            N(LANG.tooltip_noresponse)
        }
    }

    function d(P, O) {
        return P + (O.rand ? "r" + O.rand : "") + (O.ench ? "e" + O.ench : "") + (O.gems ? "g" + O.gems.join(",") : "") + (O.sock ? "s" : "")
    }
    this.reg = function(Q, S, R, P) {
        var O = p[Q][0];
        k(Q, S, R);
        if (O[S].timer) {
            clearTimeout(O[S].timer);
            O[S].timer = null
        }
        cO(O[S], P);
        if (O[S].status[R] == E) {
            if (O[S][I(R)]) {
                O[S].status[R] = F
            } else {
                O[S].status[R] = r
            }
        }
        if (e == Q && S == D && H == R) {
            N(O[S][I(R)], O[S].icon)
        }
    };
    this.regNpc = function(Q, P, O) {
        this.reg(s, Q, P, O)
    };
    this.regObject = function(Q, P, O) {
        this.reg(j, Q, P, O)
    };
    this.regItem = function(Q, P, O) {
        this.reg(v, Q, P, O)
    };
    this.regQuest = function(Q, P, O) {
        this.reg(y, Q, P, O)
    };
    this.regSpell = function(Q, P, O) {
        this.reg(t, Q, P, O)
    };
    this.regAchievement = function(Q, P, O) {
        this.reg(m, Q, P, O)
    };
    this.regProfile = function(Q, P, O) {
        this.reg(i, Q, P, O)
    };
    this.req = function(O, S, Q, R) {
        if (!R) {
            R = {}
        }
        var P = d(S, R);
        k(O, P, Q);
        b(O, S, Q, 1, R)
    };
    this.reqItem = function(P, O) {
        this.req(v, P, openDB_locale.id, O)
    };
    this.reqSpell = function(O) {
        this.req(t, O, openDB_locale.id)
    };
    this.getStatus = function(P, R, Q) {
        var O = p[P][0];
        if (O[R] != null) {
            return O[R].status[Q]
        } else {
            return G
        }
    };
    this.getItemStatus = function(P, O) {
        this.getStatus(v, P, O)
    };
    this.getSpellStatus = function(P, O) {
        this.getStatus(t, P, O)
    };
    K()
};
var qSearch = new function() {
    var currentTextbox, lastSearch = {},
        lastDiv, timer, prepared, container, cancelNext, hasData, summary, selection;

    function setText(textbox, txt) {
        textbox.value = txt;
        textbox.selectionStart = textbox.selectionEnd = txt.length
    }

    function colorDiv(div, fromOver) {
        if (lastDiv) {
            lastDiv.className = lastDiv.className.replace("qSearch-sel", "")
        }
        lastDiv = div;
        lastDiv.className += " qSearch-sel";
        selection = div.i;
        if (!fromOver) {
            show();
            setTimeout(setText.bind(0, currentTextbox, openDB_getTextContent(div.firstChild.firstChild.childNodes[1])), 1);
            cancelNext = 1
        }
    }

    function aOver() {
        colorDiv(this.parentNode.parentNode, 1)
    }

    function isVisible() {
        if (!container) {
            return false
        }
        return container.style.display != "none"
    }

    function adjust(fromResize) {
        if (fromResize == 1 && !isVisible()) {
            return
        }
        if (currentTextbox == null) {
            return
        }
        var c = ac(currentTextbox);
        container.style.left = (c[0] - 2 + 10) + "px";
        container.style.top = (c[1] + currentTextbox.offsetHeight + 1) + "px";
        container.style.width = currentTextbox.offsetWidth + 13 + "px"
    }

    function prepare() {
        if (prepared) {
            return
        }
        prepared = 1;
        container = ce("div");
        container.className = "qSearch";
        container.style.display = "none";
        ae(ge("layers"), container);
        aE(window, "resize", adjust.bind(0, 1));
        aE(document, "click", hide)
    }

    function show() {
        if (container && !isVisible()) {
            adjust();
            container.style.display = ""
        }
    }

    function hide() {
        if (container) {
            container.style.display = "none"
        }
    }

    function boldify(match) {
        return "<b>" + match + "</b>"
    }

    function display(textbox, search, suggz, dataz) {
        prepare();
        show();
        lastA = null;
        hasData = 1;
        selection = null;
        while (container.firstChild) {
            de(container.firstChild)
        }
        if (!Browser.ie6) {
            ae(container, ce("em"));
            ae(container, ce("var"));
            ae(container, ce("strong"))
        }
        var create = ce("div");
        create.className = "top";
        var tex = ce("p");
        tex.innerHTML = "Most relevent search results...";
        ae(create, tex);
        ae(container, create);
        search = search.replace(/[^a-z0-9\-]/i, " ");
        search = trim(search.replace(/\s+/g, " "));
        var regex = openDB_createOrRegex(search);
        for (var i = 0, len = suggz.length; i < len; ++i) {
            var pos = suggz[i].lastIndexOf("(");
            if (pos != -1) {
                suggz[i] = suggz[i].substr(0, pos - 1)
            }
            var type = dataz[i][0],
                typeId = dataz[i][1],
                expan = dataz[i][2],
                param1 = dataz[i][3],
                param2 = dataz[i][4],
                cont = ce("div"),
                cont2 = ce("div"),
                a = ce("a"),
                sp = ce("i"),
                sp2 = ce("span"),
                div = ce("div"),
                div2 = ce("div");
            div.i = i;
            a.onmouseover = aOver;
            if (textbox._summary) {
                a.href = "javascript:;";
                a.onmousedown = Summary.addGroupItem.bind(openDB_summaries[textbox._summary], textbox._type, typeId);
                a.onclick = rf;
                a.rel = openDB_types[type] + "=" + typeId
            } else {
                if (textbox._profileslots) {
                    a.href = "javascript:;";
                    a.onmousedown = void(0);
                    a.onclick = rf;
                    a.rel = openDB_types[type] + "=" + typeId
                } else {
                    if (expan.length > 2) {
                        a.href = "https://" + expan + ".openwow.com/" + openDB_types[type] + "=" + typeId
                    } else {
                        a.href = "https://" + qsUrl + ".openwow.com/" + openDB_types[type] + "=" + typeId
                    }
                }
            }
            if (textbox._append) {
                a.rel += textbox._append
            }
            if (type == 3 && param2 != null) {
                a.className += " q" + param2
            }
            if ((type == 3 || type == 6 || type == 9 || type == 10) && param1) {
                div.className += " qSearch-ico";
                div.style.backgroundImage = "url(https://cdn.openwow.com/" + qsUrl + "/icons/small/" + param1.toLowerCase() + ".jpg)"
            } else {
                if (type == 5 && param1 >= 1 && param1 <= 2) {
                    div.className += " qSearch-ico-" + (param1 == 1 ? "alliance" : "horde")
                }
            }
            if (i % 2) {
                cont.className += " odd"
            }
            if (!textbox._summary && !textbox._profileslots) {
                ae(sp, ct(LANG.types[type][0]))
            }
            ae(a, sp);
            var buffer = suggz[i];
            buffer = buffer.replace(regex, boldify);
            sp2.innerHTML = buffer;
            ae(a, sp2);
            if (type == 6 && param2) {
                ae(a, ct(" (" + param2 + ")"))
            }
            cont.className = "qSearch-ico-" + expan;
            if (expan.length > 2) {
                cont2.className = "expcont";
            }
            ae(div2, a);
            ae(div, div2);
            ae(cont2, div);
            ae(cont, cont2);
            ae(container, cont);
        }
    }

    function receive(xhr, opt) {
        var text;
        if (typeof xhr.responseText == "string") {
            response = xhr.responseText;
            text = response.substring(response.indexOf('<p>') + 3, response.indexOf('</p>'));
        } else {
            text = xhr;
        }
        if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
            return
        }
        var a = eval(text);
        var search = a[0];
        if (search == opt.search) {
            if ((opt.textbox._summary || opt.textbox._profileslots) && a.length == 9) {
                for (var i = 0, len = a[8].length; i < len; ++i) {
                    if (opt.textbox._summary && in_array(openDB_summaries[opt.textbox._summary].data, a[8][i].id, function(x) {
                            return x.id
                        }) == -1) {
                        openDB_summaries[opt.textbox._summary].data.push(a[8][i]);
                        openDB_items.add(a[8][i].id, {
                            icon: a[8][i].icon
                        })
                    } else {
                        if (opt.textbox._profileslots) {
                            var _ = {};
                            _["name_" + openDB_locale.name] = a[8][i].name.substring(1);
                            cO(_, {
                                quality: parseInt(a[8][i].name.charAt(0)),
                                icon: a[8][i].icon,
                                displayid: a[8][i].displayid,
                                jsonequip: {},
                                itemset: 0
                            });
                            cO(_.jsonequip, a[8][i]);
                            openDB_items.add(a[8][i].id, _)
                        }
                    }
                }
                a.splice(8, 1)
            }
            if (a.length == 8) {
                display(opt.textbox, search, a[1], a[7])
            } else {
                hide()
            }
        }
    }

    function fetch(textbox, search) {
        var url1 = qSearchUrl() + urlencode(search);
        if (textbox._type) {
            url1 += "&type=" + textbox._type
        }
        if (textbox._profileslots) {
            url1 += "&slots=" + textbox._profileslots.join(":")
        }
        jQuery.ajax({
            url: url1,
            type: 'GET',
            success: function(res) {
                receive(res, {
                    textbox: textbox,
                    search: search
                });
            }
        });
    }

    function preFetch(textbox, search) {
        if (cancelNext) {
            cancelNext = 0;
            return
        }
        hasData = 0;
        if (timer > 0) {
            clearTimeout(timer);
            timer = 0
        }
        timer = setTimeout(fetch.bind(0, textbox, search), 333)
    }

    function cycle(dir) {
        if (!isVisible()) {
            if (hasData) {
                show()
            }
            return
        }
        var firstNode = (container.childNodes[0].nodeName == "EM" ? container.childNodes[3] : container.firstChild);
        var bakDiv = dir ? firstNode : container.lastChild;
        if (lastDiv == null) {
            colorDiv(bakDiv)
        } else {
            var div = dir ? lastDiv.nextSibling : lastDiv.previousSibling;
            if (div) {
                if (div.nodeName == "STRONG") {
                    div = container.lastChild
                }
                colorDiv(div)
            } else {
                colorDiv(bakDiv)
            }
        }
    }

    function onKeyUp(e) {
        e = $E(e);
        var textbox = e._target;
        switch (e.keyCode) {
            case 48:
            case 96:
            case 107:
            case 109:
                if (Browser.gecko && e.ctrlKey) {
                    adjust(textbox);
                    break
                }
                break;
            case 13:
                if ((textbox._summary || textbox._profileslots) && hasData && isVisible()) {
                    var div = container.childNodes[(Browser.ie6 ? 0 : 3) + (selection | 0)];
                    div.firstChild.firstChild.onmousedown();
                    hide();
                    if (textbox._summary) {
                        openDB_summaries.compare.toggleOptions()
                    }
                    return
                }
                break
        }
        var search = trim(textbox.value.replace(/\s+/g, " "));
        if (search == lastSearch[textbox.id]) {
            return
        }
        lastSearch[textbox.id] = search;
        if (search.length) {
            preFetch(textbox, search)
        } else {
            hide()
        }
    }

    function onKeyDown(e) {
        e = $E(e);
        var textbox = e._target;
        switch (e.keyCode) {
            case 27:
                hide();
                break;
            case 38:
                cycle(0);
                break;
            case 40:
                cycle(1);
                break
        }
    }

    function onFocus(e) {
        e = $E(e);
        var textbox = e._target;
        if (textbox != document) {
            currentTextbox = textbox
        }
    }
    this.attach = function(textbox) {
        if (textbox.getAttribute("autocomplete") == "off") {
            return
        }
        textbox.setAttribute("autocomplete", "off");
        aE(textbox, "focus", onFocus);
        aE(textbox, "keyup", onKeyUp);
        aE(textbox, Browser.opera ? "keypress" : "keydown", onKeyDown)
    };
    this.reset = function(textbox) {
        lastSearch[textbox.id] = null;
        textbox.value = "";
        hasData = 0;
        hide()
    };
    this.hide = function() {
        hide()
    }
};
var Lightbox = new function() {
    var d, m, n, h = {},
        c = {},
        i, f;

    function o() {
        aE(d, "click", e);
        aE(document, Browser.opera ? "keypress" : "keydown", g);
        aE(window, "resize", a);
        if (Browser.ie6) {
            aE(window, "scroll", j)
        }
    }

    function l() {
        dE(d, "click", e);
        dE(document, Browser.opera ? "keypress" : "keydown", g);
        dE(window, "resize", a);
        if (Browser.ie6) {
            dE(window, "scroll", j)
        }
    }

    function b() {
        if (i) {
            return
        }
        i = 1;
        var p = ge("layers");
        d = ce("div");
        d.className = "lightbox-overlay";
        m = ce("div");
        m.className = "lightbox-outer";
        n = ce("div");
        n.className = "lightbox-inner";
        d.style.display = m.style.display = "none";
        ae(p, d);
        ae(m, n);
        ae(p, m)
    }

    function g(p) {
        p = $E(p);
        switch (p.keyCode) {
            case 27:
                e();
                break
        }
    }

    function a(p) {
        if (p != 1234) {
            if (c.onResize) {
                c.onResize()
            }
        }
        d.style.height = document.body.offsetHeight + "px";
        if (Browser.ie6) {
            j()
        }
    }

    function j() {
        var q = openDB_getScroll().y,
            p = openDB_getWindowSize().h;
        m.style.top = (q + p / 2) + "px"
    }

    function e() {
        l();
        if (c.onHide) {
            c.onHide()
        }
        d.style.display = m.style.display = "none";
        openDB_enableScroll(true)
    }

    function k() {
        d.style.display = m.style.display = h[f].style.display = ""
    }
    this.setSize = function(p, q) {
        n.style.visibility = "hidden";
        n.style.width = p + "px";
        n.style.height = q + "px";
        n.style.left = -parseInt(p / 2) + "px";
        n.style.top = -parseInt(q / 2) + "px";
        n.style.visibility = "visible"
    };
    this.show = function(t, s, p) {
        c = s || {};
        b();
        o();
        if (f != t && h[f] != null) {
            h[f].style.display = "none"
        }
        f = t;
        var r = 0,
            q;
        if (h[t] == null) {
            r = 1;
            q = ce("div");
            ae(n, q);
            h[t] = q
        } else {
            q = h[t]
        }
        if (c.onShow) {
            c.onShow(q, r, p)
        }
        a(1234);
        k();
        openDB_enableScroll(false)
    };
    this.reveal = function() {
        k()
    };
    this.hide = function() {
        e()
    };
    this.isVisible = function() {
        return (d && d.style.display != "none")
    }
};
var openDB_screenshots = {};
var ScreenshotViewer = new function() {
    var z, k, e, y, B, c, o, q = 0,
        u, b, n, i, w, x, t, h, v, j;

    function g(C) {
        var F = z[k];
        var D = Math.max(50, Math.min(618, openDB_getWindowSize().h - 72 - C));
        if (q != 1 || F.id || F.resize) {
            c = Math.min(772 / F.width, 618 / F.height);
            B = Math.min(772 / F.width, D / F.height)
        } else {
            c = B = 1
        }
        if (c > 1) {
            c = 1
        }
        if (B > 1) {
            B = 1
        }
        e = Math.round(B * F.width);
        y = Math.round(B * F.height);
        var E = Math.max(480, e);
        Lightbox.setSize(E + 20, y + 52 + C);
        if (Browser.ie6) {
            n.style.width = E + "px";
            if (z.length > 1) {
                w.style.height = x.style.height = y + "px"
            } else {
                t.style.height = y + "px"
            }
        }
        if (C) {
            i.firstChild.width = e;
            i.firstChild.height = y
        }
    }

    function d(E) {
        var D = z[E],
            C = "#screenshots:";
        if (q == 0) {
            C += "id=" + D.id
        } else {
            C += u + ":" + (E + 1)
        }
        return C
    }

    function s(F) {
        if (F && (B == c) && openDB_getWindowSize().h > b.offsetHeight) {
            return
        }
        b.style.visibility = "hidden";
        var C = z[k],
            I = (C.width > 772 || C.height > 618);
        g(0);
        var E = ("/upload/" + C.file);
        var J = '<img src="' + E + '" width="' + e + '" height="' + y + '"';
        if (Browser.ie6) {
            J += ' galleryimg="no"'
        }
        J += ">";
        i.innerHTML = J;
        if (!F) {
            h.href = "/upload/" + C.file
            if (!C.user && typeof openDB_pageInfo == "object") {
                C.user = openDB_pageInfo.username
            }
            var L = (C.date && C.user),
                K = (z.length > 1);
            if (L) {
                var H = new Date(C.date),
                    N = (openDB_serverTime - H) / 1000;
                var M = v.firstChild.childNodes[1];
                M.href = "user=" + C.user;
                M.innerHTML = C.user;
                var P = v.firstChild.childNodes[3];
                while (P.firstChild) {
                    de(P.firstChild)
                }
                v.firstChild.style.display = ""
            } else {
                v.firstChild.style.display = "none"
            }
            var P = v.childNodes[1];
            if (K) {
                var O = "";
                if (L) {
                    O += LANG.dash
                }
                O += (k + 1) + LANG.lvpage_of + z.length;
                P.innerHTML = O;
                P.style.display = ""
            } else {
                P.style.display = "none"
            }
            v.style.display = (L || K ? "" : "none");
            if (openDB_getLocale(true) != 0 && C.caption) {
                C.caption = ""
            }
            var D = (C.caption != null && C.caption.length);
            var G = (C.subject != null && C.subject.length && C.type && C.typeId);
            if (D || G) {
                var J = "";
                if (G) {
                    J += LANG.types[C.type][0] + LANG.colon;
                    J += '<a href="' + openDB_types[C.type] + "=" + C.typeId + '">';
                    J += C.subject;
                    J += "</a>"
                }
                if (D) {
                    if (G) {
                        J += LANG.dash
                    }
                    J += C.caption
                }
                j.innerHTML = J;
                j.style.display = ""
            } else {
                j.style.display = "none"
            }
            if (z.length > 1) {
                w.href = d(r(-1));
                x.href = d(r(1));
                w.style.display = x.style.display = "";
                t.style.display = "none"
            } else {
                w.style.display = x.style.display = "none";
                t.style.display = ""
            }
            location.replace(d(k))
        }
        Lightbox.reveal();
        if (j.offsetHeight > 18) {
            g(j.offsetHeight - 18)
        }
        b.style.visibility = "visible"
    }

    function r(C) {
        var D = k;
        D += C;
        if (D < 0) {
            D = z.length - 1
        } else {
            if (D >= z.length) {
                D = 0
            }
        }
        return D
    }

    function a() {
        k = r(-1);
        s();
        return false
    }

    function p() {
        k = r(1);
        s();
        return false
    }

    function m(C) {
        C = $E(C);
        switch (C.keyCode) {
            case 37:
                a();
                break;
            case 39:
                p();
                break
        }
    }

    function f() {
        s(1)
    }

    function l() {
        if (z.length > 1) {
            dE(document, "keyup", m)
        }
        if (o && q == 0) {
            if (o.indexOf(":id=") != -1) {
                o = "#screenshots"
            }
            location.replace(o)
        } else {
            location.replace("#.")
        }
    }

    function A(C, G, D) {
        if (typeof D.screenshots == "string") {
            z = openDB_screenshots[D.screenshots];
            q = 1;
            u = D.screenshots
        } else {
            z = D.screenshots;
            q = 0;
            u = null
        }
        b = C;
        k = 0;
        if (D.pos && D.pos >= 0 && D.pos < z.length) {
            k = D.pos
        }
        if (G) {
            C.className = "screenshotviewer";
            n = ce("div");
            n.className = "screenshotviewer-screen";
            w = ce("a");
            x = ce("a");
            w.className = "screenshotviewer-prev";
            x.className = "screenshotviewer-next";
            w.href = "javascript:;";
            x.href = "javascript:;";
            var I = ce("span");
            ae(I, ce("b"));
            ae(w, I);
            var I = ce("span");
            ae(I, ce("b"));
            ae(x, I);
            w.onclick = a;
            x.onclick = p;
            t = ce("a");
            t.className = "screenshotviewer-cover";
            t.href = "javascript:;";
            t.onclick = Lightbox.hide;
            var I = ce("span");
            ae(I, ce("b"));
            ae(t, I);
            if (Browser.ie6) {
                ns(w);
                ns(x);
                w.onmouseover = x.onmouseover = t.onmouseover = function() {
                    this.firstChild.style.display = "block"
                };
                w.onmouseout = x.onmouseout = t.onmouseout = function() {
                    this.firstChild.style.display = ""
                }
            }
            ae(n, w);
            ae(n, x);
            ae(n, t);
            i = ce("div");
            ae(n, i);
            ae(C, n);
            var H = ce("a");
            H.className = "screenshotviewer-close";
            H.href = "javascript:;";
            H.onclick = Lightbox.hide;
            ae(H, ce("span"));
            ae(C, H);
            h = ce("a");
            h.className = "screenshotviewer-original";
            h.href = "javascript:;";
            h.target = "_blank";
            ae(h, ce("span"));
            ae(C, h);
            v = ce("div");
            v.className = "screenshotviewer-from";
            var E = ce("span");
            ae(E, ct(LANG.lvscreenshot_from));
            ae(E, ce("a"));
            ae(E, ct(" "));
            ae(E, ce("span"));
            ae(v, E);
            ae(v, ce("span"));
            ae(C, v);
            j = ce("div");
            j.className = "screenshotviewer-caption";
            ae(C, j);
            var F = ce("div");
            F.className = "clear";
            ae(C, F)
        }
        o = location.hash;
        if (z.length > 1) {
            aE(document, "keyup", m)
        }
        s()
    }
    this.checkPound = function() {
        if (location.hash && location.hash.indexOf("#screenshots") == 0) {
            if (!openDB_listviews.screenshots) {
                var D = location.hash.split(":");
                if (D.length == 3) {
                    var E = openDB_screenshots[D[1]],
                        C = parseInt(D[2]);
                    if (E && C >= 1 && C <= E.length) {
                        ScreenshotViewer.show({
                            screenshots: D[1],
                            pos: C - 1
                        })
                    }
                }
            }
        }
    };
    this.show = function(C) {
        Lightbox.show("screenshotviewer", {
            onShow: A,
            onHide: l,
            onResize: f
        }, C)
    };
    DomContentLoaded.addEvent(this.checkPound)
};

function openBook(D) {
    if (!D.parent || !D.pages || D.pages.length == 0) {
        return
    }
    D.parent = $(D.parent);
    var E, A, B;
    this.nPages = D.pages.length;
    this.parent = $(D.parent);
    this.parent.className += " book";
    E = ce("div");
    E.className = "header";
    if (this.nPages == 1) {
        E.style.display = "none"
    }
    ns(E);
    B = ce("div");
    B.style.visibility = "hidden";
    B.className = "previous";
    A = ce("a");
    A.appendChild(ct(String.fromCharCode(8249) + LANG.book_previous));
    A.href = "javascript:;";
    A.onclick = this.previous.bind(this);
    B.appendChild(A);
    E.appendChild(B);
    B = ce("div");
    B.style.visibility = "hidden";
    B.className = "next";
    A = ce("a");
    A.appendChild(ct(LANG.book_next + String.fromCharCode(8250)));
    A.href = "javascript:;";
    A.onclick = this.next.bind(this);
    B.appendChild(A);
    E.appendChild(B);
    B = ce("b");
    B.appendChild(ct("1"));
    E.appendChild(B);
    E.appendChild(ct(LANG.book_of));
    B = ce("b");
    B.appendChild(ct(this.nPages));
    E.appendChild(B);
    D.parent.appendChild(E);
    for (var C = 0; C < this.nPages; ++C) {
        E = ce("div");
        E.className = "page";
        E.style.display = "none";
        E.innerHTML = D.pages[C];
        D.parent.appendChild(E)
    }
    this.page = 1;
    this.changePage(D.page || 1)
}
openBook.prototype = {
    changePage: function(B) {
        if (B < 1) {
            B = 1
        } else {
            if (B > this.nPages) {
                B = this.nPages
            }
        }
        var A = this.parent.childNodes;
        A[this.page].style.display = "none";
        A[B].style.display = "";
        this.page = B;
        A = A[0].childNodes;
        A[0].style.visibility = (B == 1) ? "hidden" : "visible";
        A[1].style.visibility = (B == this.nPages) ? "hidden" : "visible";
        A[2].innerHTML = B
    },
    next: function() {
        this.changePage(this.page + 1)
    },
    previous: function() {
        this.changePage(this.page - 1)
    }
};
var Markup = {
    MODE_COMMENT: 1,
    MODE_ARTICLE: 2,
    MODE_QUICKFACTS: 3,
    MODE_SIGNATURE: 4,
    simpleTags: {
        img: 1,
        pad: 1,
        item: 1,
        spell: 1
    },
    _prepare: function(D, C) {
        Markup.tags = [];
        Markup.links = [];
        Markup.nTags = 0;
        Markup.nLinks = 0;
        D = D.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        D = D.replace(/^(\s*)|\r|(\s*)$/g, "");
        D = D.replace(/\n(\s+)\n/g, "\n\n");
        var B = "b|i|u|s|small";
        var A = "b|i|u|s|small|url";
        switch (C) {
            case Markup.MODE_ARTICLE:
                Markup.maps = [];
                D = D.replace(/(.)?\[toggler\s*[\s+=:]\s*(.+?)\]/gi, function(F, E, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup._yank(H, [
                            ["id", "[a-z0-9]+"]
                        ]);
                        Markup.tags.push({
                            name: "toggler",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                D = D.replace(/(.)?\[div\s*[\s+=:]\s*(.+?)\]/gi, function(F, E, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup._yank(H, [
                            ["id", "[a-z0-9]+"],
                            ["hidden", ""]
                        ]);
                        Markup.tags.push({
                            name: "div",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                D = D.replace(/(.)?\[img\s*[\s+=:]\s*(.+?)\]/gi, function(F, E, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup._yank(H, [
                            ["src", "\\S+"],
                            ["width", "[0-9]+"],
                            ["height", "[0-9]+"],
                            ["float", "left|right"]
                        ]);
                        Markup.tags.push({
                            name: "img",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                D = D.replace(/(.)?\[map\s*[\s+=:]\s*(.+?)\]/gi, function(F, E, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup._yank(H, [
                            ["zone", "[0-9]+[a-z]?"],
                            ["source", "\\S+"]
                        ]);
                        Markup.tags.push({
                            name: "map",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                D = D.replace(/(.)?\[pin\s*[\s+=:]\s*(.+?)\]/gi, function(F, E, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup._yank(H, [
                            ["x", "[0-9]{1,2}(\\.[0-9])?"],
                            ["y", "[0-9]{1,2}(\\.[0-9])?"],
                            ["url", "\\S+"],
                            ["type", "[0-9]+"]
                        ]);
                        Markup.tags.push({
                            name: "pin",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                B += "|h3|minibox";
                A += "|h3|minibox|toggler|div|map|pin";
            case Markup.MODE_QUICKFACTS:
                D = D.replace(/(.)?\[color\s*[\s+=:]\s*(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|q[0-8]?|#[a-f0-9]{6})\]/gi, function(F, E, G) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        Markup.tags.push({
                            name: "color",
                            color: false,
                            other: (G).toLowerCase()
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                D = D.replace(/(.)?\[item\s*[\s+=:]\s*(\d+?)\]/gi, function(F, E, I, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup.tags.push({
                            name: (I).toLowerCase(),
                            close: false,
                            other: H
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                B += "|pad";
                A += "|color";
            case Markup.MODE_COMMENT:
                D = D.replace(/(.)?\[quote(\s*[\s+=:]\s*([^\]]+?))?\]/gi, function(F, E, I, H) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        var G = Markup.tags.push({
                            name: "quote",
                            close: false,
                            other: H
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                });
                B += "|code|ul|ol|li";
                A += "|code|quote|ul|ol|li";
            default:
                D = D.replace(/(.)?\[url\s*[\s+=:]\s*([^\]]+?)\]/gi, function(F, E, G) {
                    if (E == "\\") {
                        return F.substr(1)
                    } else {
                        Markup.tags.push({
                            name: "url",
                            close: false,
                            other: G
                        });
                        return (E || "") + "<t" + (Markup.nTags++) + ">"
                    }
                })
        }
        D = D.replace(new RegExp("(.)?\\[(" + B + ")\\]", "gi"), function(F, E, G) {
            if (E == "\\") {
                return F.substr(1)
            } else {
                Markup.tags.push({
                    name: (G).toLowerCase(),
                    close: false,
                    other: ""
                });
                return (E || "") + "<t" + (Markup.nTags++) + ">"
            }
        });
        D = D.replace(new RegExp("(.)?\\[/(" + A + ")\\]", "gi"), function(F, E, G) {
            if (E == "\\") {
                return F.substr(1)
            } else {
                Markup.tags.push({
                    name: (G).toLowerCase(),
                    close: true,
                    other: ""
                });
                return (E || "") + "<t" + (Markup.nTags++) + ">"
            }
        });
        D = D.replace(/(https?:\/\/|www\.)([\/_a-z0-9\%\?#@\-\+~&=;:'\(\)]|\.\S|,\S)+/gi, function(E) {
            Markup.links.push(E);
            return "<l" + (Markup.nLinks++) + ">"
        });
        return D
    },
    _parseCode: function(G, K, E) {
        var B = [],
            I = [],
            D = "",
            C;
        var F = G.length;
        while (E < F) {
            if (G.charAt(E) == "<" && G.charAt(E + 1) == "t") {
                if (D.length) {
                    if (K == "ol" || K == "ul") {
                        if (trim(D).length) {
                            I.push(["<text>", D])
                        }
                    } else {
                        if (K != "map") {
                            B.push(["<text>", D])
                        }
                    }
                    D = ""
                }
                E += 2;
                C = "";
                while (G.charAt(E) != ">") {
                    C += G.charAt(E);
                    ++E
                }++E;
                var L = Markup.tags[parseInt(C)];
                if (L.close) {
                    if (L.name == K) {
                        break
                    }
                } else {
                    var H = Markup.simpleTags[L.name] != null;
                    var J = [];
                    if (!H) {
                        var A = Markup._parseCode(G, L.name, E);
                        J = A[0];
                        E = A[1]
                    }
                    if (J.length || H) {
                        if (L.name == "url" && !Markup._isUrlSafe(L.other)) {
                            L.name = "<node>"
                        }
                        if (K == "ol" || K == "ul") {
                            if (L.name == "li") {
                                I = Markup._cleanNodes(I);
                                if (I.length) {
                                    B.push(["li", I]);
                                    I = []
                                }
                                B.push(["li", J])
                            } else {
                                I.push([L.name, J, L.other])
                            }
                        } else {
                            if (K == "map") {
                                if (L.name == "pin") {
                                    B.push(["pin", J, L.other])
                                }
                            } else {
                                if (L.name == "li") {
                                    B.push(["<node>", J, L.other])
                                } else {
                                    if (L.name != "pin") {
                                        B.push([L.name, J, L.other])
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                D += G.charAt(E);
                ++E
            }
        }
        if (D.length) {
            if (K == "ol" || K == "ul") {
                if (trim(D).length) {
                    I.push(["<text>", D])
                }
            } else {
                if (K != "map") {
                    B.push(["<text>", D])
                }
            }
        }
        I = Markup._cleanNodes(I);
        if (I.length) {
            B.push(["li", I]);
            I = []
        }
        return [B, E]
    },
    _cleanNodes: function(B) {
        var D = [];
        for (var C = 0, A = B.length; C < A; ++C) {
            if (B[C][0] == "<text>") {
                if (C == 0) {
                    B[C][1] = B[C][1].replace(/^\n+/g, "")
                }
                if (C == B.length - 1) {
                    B[C][1] = B[C][1].replace(/\n+$/g, "")
                }
                if (B[C][1] != "") {
                    D.push(B[C])
                }
            } else {
                D.push(B[C])
            }
        }
        return D
    },
    _yank: function(D, C) {
        var E = {};
        D = " " + D + " ";
        for (var B = 0, A = C.length; B < A; ++B) {
            if (C[B][1] == "") {
                D = D.replace(new RegExp("\\s" + C[B][0] + "\\s", "ig"), function(F) {
                    E[C[B][0]] = true;
                    return " "
                })
            } else {
                D = D.replace(new RegExp("\\s" + C[B][0] + "\\s*[\\s=:]\\s*(" + C[B][1] + ")\\s", "ig"), function(G, F) {
                    E[C[B][0]] = F;
                    return " "
                })
            }
        }
        return E
    },
    _isUrlSafe: function(A) {
        if (!A) {
            return true
        }
        return !A.match(/^[a-z0-9]+?:/i) || A.match(/^https?:/i)
    },
    _htmlmize: function(B) {
        var G = "";
        for (var D = 0, A = B.length; D < A; ++D) {
            switch (B[D][0]) {
                case "<text>":
                    G += B[D][1];
                    break;
                case "<node>":
                    G += Markup._htmlmize(B[D][1]);
                    break;
                case "minibox":
                    G += '<div class="minibox">' + Markup._htmlmize(B[D][1]) + "</div>";
                    break;
                case "code":
                    G += '<pre class="code">' + Markup._htmlmize(B[D][1]) + "</pre>";
                    break;
                case "quote":
                    G += '<div class="quote">';
                    if (B[D][2]) {
                        var H = trim(B[D][2]);
                        if (H.length > 0) {
                            G += "<small><b>";
                            if (H.match(/[^a-z0-9]/i) == null && H.length >= 4 && H.length <= 16) {
                                G += '<a href="user=' + H + '">' + H + "</a>"
                            } else {
                                G += H
                            }
                            G += "</b> " + LANG.markup_said + '</small><div class="pad"></div>'
                        }
                    }
                    G += Markup._htmlmize(B[D][1]) + "</div>";
                    break;
                case "url":
                    G += '<a href="' + B[D][2] + '"';
                    if (B[D][2].indexOf("openwow.com") == -1 && B[D][2].substr(0, 5) == "http:") {
                        G += ' target="_blank"'
                    }
                    G += ">" + Markup._htmlmize(B[D][1]) + "</a>";
                    break;
                case "li":
                    G += "<li><div>" + Markup._htmlmize(B[D][1]) + "</div></li>";
                    break;
                case "u":
                    G += "<ins>" + Markup._htmlmize(B[D][1]) + "</ins>";
                    break;
                case "s":
                    G += "<del>" + Markup._htmlmize(B[D][1]) + "</del>";
                    break;
                case "pad":
                    G += '<div class="pad">' + Markup._htmlmize(B[D][1]) + "</div>";
                    break;
                case "color":
                    G += "<span " + ((B[D][2].charAt(0) == "q") ? 'class="' : 'style="color: ') + B[D][2] + '">' + Markup._htmlmize(B[D][1]) + "</span>";
                    break;
                case "toggler":
                    var F = B[D][2];
                    if (F.id != null) {
                        G += "<a href=\"javascript:;\" class=\"disclosure-" + (F.hidden ? "on" : "off") + " onmousedown=\"return false\" onclick=\"this.className=\"disclosure-" + (openDB_toggleDisplay(+"ge('ov4io23-" + F.id + "')") ? 'on' : 'off') + ">" + Markup._htmlmize(B[D][1]) + "</a>"
                    }
                    break;
                case "div":
                    var F = B[D][2];
                    if (F.id != null) {
                        G += '<div id="ov4io23-' + F.id + '"';
                        if (F.hidden) {
                            G += ' style="display: none"'
                        }
                        G += ">" + Markup._htmlmize(B[D][1]) + "</div>"
                    }
                    break;
                case "img":
                    var F = B[D][2];
                    if (F.src != "" && Markup._isUrlSafe(F.src)) {
                        G += '<img src="' + F.src + '" alt="" class="border"';
                        if (F.width) {
                            G += ' width="' + F.width + '"'
                        }
                        if (F.height) {
                            G += ' height="' + F.height + '"'
                        }
                        G += ' style="margin: 8px;';
                        if (F["float"]) {
                            G += " float: " + F["float"]
                        }
                        G += '" />'
                    }
                    break;
                case "item":
                    G += '<a href="item=' + B[D][2] + '">(Item #' + B[D][2] + ")</a>";
                    break;
                case "spell":
                    G += '<a href="spell=' + B[D][2] + '">(Spell #' + B[D][2] + ")</a>";
                    break;
                case "map":
                    var F = B[D][2];
                    if (F.zone != null) {
                        var E = Markup._htmlmize(B[D][1]);
                        G += '<a href="javascript:;" onclick="Markup.mapperPreview(' + Markup.maps.length + ')">(Map: Zone #' + parseInt(F.zone) + ", " + E.length + " pin" + (E.length == 1 ? "" : "s") + ")</a>";
                        Markup.maps.push([F.zone, E])
                    }
                    break;
                case "pin":
                    var F = B[D][2];
                    if (!Markup._isUrlSafe(F.url)) {
                        F.url = ""
                    }
                    if (G == "") {
                        G = []
                    }
                    var C = Markup._htmlmize(B[D][1]).replace(/\n/g, "<br />");
                    if (F.url && F.url.indexOf("npc=") != -1) {
                        C = '<b class="q">' + C + '</b><br/ ><span class="q2">Click to view this NPC</span>'
                    }
                    G.push([parseFloat(F.x || 0), parseFloat(F.y || 0), {
                        label: C,
                        url: F.url,
                        type: F.type
                    }]);
                    break;
                default:
                    G += "<" + B[D][0] + ">" + Markup._htmlmize(B[D][1]) + "</" + B[D][0] + ">"
            }
        }
        return G
    },
    _tagless: function(B) {
        var E = "";
        for (var C = 0, A = B.length; C < A; ++C) {
            switch (B[C][0]) {
                case "<text>":
                    E += B[C][1];
                    break;
                case "img":
                    var D = B[C][2];
                    if (D.src != "" && Markup._isUrlSafe(D.src)) {
                        E += "(Image: " + D.src + ")"
                    }
                    break;
                case "item":
                    E += "(Item #" + B[C][2] + ")";
                    break;
                case "spell":
                    E += "(Spell #" + B[C][2] + ")";
                    break;
                case "map":
                    E += "(Map)";
                    break;
                case "pin":
                    break;
                default:
                    E += Markup._tagless(B[C][1])
            }
        }
        return E
    },
    toHtml: function(D, C) {
        C = C || {};
        C.root = C.root || "";
        if (C.mode != null && C.mode != Markup.MODE_SIGNATURE) {
            D = D.replace(/\s*\[(ol|ul|h3)\]/ig, function(F, E) {
                return "[" + E + "]"
            });
            D = D.replace(/\[\/(ol|ul|h3|minibox|code|quote)\]\s*/ig, function(F, E) {
                return "[/" + E + "]"
            });
            D = D.replace(/\s*\[(pad)\]\s*/ig, function(F, E) {
                return "[" + E + "]"
            })
        }
        D = Markup._prepare(D, C.mode);
        var A = Markup._parseCode(D, C.root, 0)[0];
        var B = Markup._htmlmize(A);
        B = B.replace(/<l([0-9]+)>/g, function(G, E) {
            var F = Markup.links[parseInt(E)];
            return '<a href="' + F.replace(/^www/, "https://www") + (F.indexOf("openwow.com") == -1 ? '" target="_blank">' : '">') + (F.length > 100 ? F.substr(0, 97) + "..." : F) + "</a>"
        });
        B = B.replace(/\n/g, "<br />");
        return B
    },
    removeTags: function(D, C) {
        C = C || {};
        C.root = C.root || "";
        if (C.mode != null && C.mode != Markup.MODE_SIGNATURE) {
            D = D.replace(/\s*\[(ol|ul|h3)\]\s?/ig, function(F, E) {
                return " [" + E + "]"
            });
            D = D.replace(/\s?\[\/(ol|ul|h3|minibox|code|quote)\]\s*/ig, function(F, E) {
                return "[/" + E + "]"
            });
            D = D.replace(/\s*\[(pad)\]\s*/ig, function(F, E) {
                return "[" + E + "]"
            })
        }
        D = Markup._prepare(D, C.mode);
        var A = Markup._parseCode(D, C.root, 0)[0];
        var B = Markup._tagless(A);
        B = B.replace(/<l([0-9]+)>/g, function(G, E) {
            var F = Markup.links[parseInt(E)];
            return F
        });
        B = B.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
        return B
    },
    mapperPreview: function(C) {
        try {
            window.mapper = Markup.maps[C];
            var B = window.open("edit=mapperpreview", "mapperpreview", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=800,height=540");
            B.focus()
        } catch (A) {}
    }
};