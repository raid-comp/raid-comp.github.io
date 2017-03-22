/* C:\Projects\Azeroth\Azeroth\Source\Curse.Azeroth.Web\..\..\..\Gandalf\Source\Curse.Gandalf.Web\Content\js\Gandalf\htmldiff.js */
(function() {
    window.HTMLDiff = (function() {
        function a(c, d) {
            this.a = c;
            this.b = d
        }
        a.prototype.diff = function() {
            var b;
            b = this.diff_list(this.tokenize(this.a), this.tokenize(this.b));
            this.update(this.a, b.filter(function(c) {
                var d, e;
                d = c[0], e = c[1];
                return d !== "+"
            }));
            return this.update(this.b, b.filter(function(c) {
                var d, e;
                d = c[0], e = c[1];
                return d !== "-"
            }))
        };
        a.prototype.parseTextNodes = function(d, b) {
            var c;
            c = function(m) {
                if (m == null) {
                    return false
                }
                var j, k, l, o, e, f, g, h, i;
                if (m.nodeType === 3) {
                    if (!/^\s*$/.test(m.nodeValue)) {
                        return b(m)
                    }
                } else {
                    i = (function() {
                        var n, p, q, r;
                        q = m.childNodes;
                        r = [];
                        for (n = 0, p = q.length; n < p; n++) {
                            j = q[n];
                            r.push(j)
                        }
                        return r
                    })();
                    for (e = 0, g = i.length; e < g; e++) {
                        o = i[e];
                        l = c(o);
                        if (l) {
                            for (f = 0, h = l.length; f < h; f++) {
                                k = l[f];
                                m.insertBefore(k, o)
                            }
                            m.removeChild(o)
                        }
                    }
                    return false
                }
            };
            return c(d)
        };
        a.prototype.tokenize = function(b) {
            var c;
            c = [];
            this.parseTextNodes(b, function(d) {
                c = c.concat(d.nodeValue.split(" "));
                return false
            });
            return c
        };
        a.prototype.update = function(d, b) {
            var c;
            c = 0;
            return this.parseTextNodes(d, function(l) {
                var h, i, j, k, m, n, o, p, q, e, f, g;
                o = c;
                h = c + (l.nodeValue.split(" ")).length;
                c = h;
                m = (function() {
                    var r, s, t, u, v;
                    t = b.slice(o, h);
                    v = [];
                    for (r = 0, s = t.length; r < s; r++) {
                        u = t[r], p = u[0], q = u[1];
                        if (p === "=") {
                            v.push(q)
                        } else {
                            v.push("<ins>" + q + "</ins>")
                        }
                    }
                    return v
                })();
                m = m.join(" ").replace(/<\/ins> <ins>/g, " ").replace(/<ins> /g, " <ins>").replace(/[ ]<\/ins>/g, "</ins> ").replace(/<ins><\/ins>/g, "");
                k = [];
                j = document.createTextNode("");
                k.push(j);
                g = m.split(/(<\/?ins>)/);
                for (e = 0, f = g.length; e < f; e++) {
                    n = g[e];
                    switch (n) {
                        case "<ins>":
                            i = document.createElement("ins");
                            k.push(i);
                            j = document.createTextNode("");
                            i.appendChild(j);
                            break;
                        case "</ins>":
                            j = document.createTextNode("");
                            k.push(j);
                            break;
                        default:
                            j.nodeValue = n
                    }
                }
                return k.filter(function(r) {
                    return !(r.nodeType === 3 && r.nodeValue === "")
                })
            })
        };
        a.prototype.diff_list = function(l, h) {
            var m, n, o, p, q, r, s, t, u, v, b, c, d, e, f, g;
            q = {};
            for (m = 0, c = l.length; m < c; m++) {
                v = l[m];
                if (!(v in q)) {
                    q[v] = []
                }
                q[v].push(m)
            }
            p = (function() {
                var i, j;
                j = [];
                for (m = 0, i = l.length; 0 <= i ? m < i : m > i; 0 <= i ? m++ : m--) {
                    j.push(0)
                }
                return j
            })();
            t = s = r = 0;
            for (n = 0, d = h.length; n < d; n++) {
                v = h[n];
                u = (function() {
                    var i, j;
                    j = [];
                    for (m = 0, i = l.length; 0 <= i ? m < i : m > i; 0 <= i ? m++ : m--) {
                        j.push(0)
                    }
                    return j
                })();
                g = (f = q[v]) != null ? f : [];
                for (b = 0, e = g.length; b < e; b++) {
                    o = g[b];
                    u[o] = (o && p[o - 1] ? 1 : 0) + 1;
                    if (u[o] > r) {
                        r = u[o];
                        t = o - r + 1;
                        s = n - r + 1
                    }
                }
                p = u
            }
            if (r === 0) {
                return [].concat((function() {
                    var i, j, k;
                    k = [];
                    for (i = 0, j = l.length; i < j; i++) {
                        v = l[i];
                        k.push(["-", v])
                    }
                    return k
                })(), (function() {
                    var i, j, k;
                    k = [];
                    for (i = 0, j = h.length; i < j; i++) {
                        v = h[i];
                        k.push(["+", v])
                    }
                    return k
                })())
            } else {
                return [].concat(this.diff_list(l.slice(0, t), h.slice(0, s)), (function() {
                    var i, j, k, w;
                    k = h.slice(s, (s + r));
                    w = [];
                    for (i = 0, j = k.length; i < j; i++) {
                        v = k[i];
                        w.push(["=", v])
                    }
                    return w
                })(), this.diff_list(l.slice(t + r), h.slice(s + r)))
            }
        };
        return a
    })()
}).call(this);

/* C:\Projects\Azeroth\Azeroth\Source\Curse.Azeroth.Web\..\..\..\Gandalf\Source\Curse.Gandalf.Web\Content\js\Gandalf\CurseTip.js */
(function(b) {
    var c = document.getElementsByTagName("script"),
        d = c[c.length - 1].src;
    var f = function(g) {
        return g + "px"
    };
    var e = function(g, h) {
        this.x = g || 0;
        this.y = h || 0
    };
    var a = function() {
        a.prototype.initialize.apply(this, arguments)
    };
    a.Ready = false;
    a.bindEvent = function(j, g, k) {
        var i = this;
        if (g === "load") {
            var h = k;
            if (j.addEventListener) {
                g = "DOMContentLoaded";
                k = function() {
                    h.call(i);
                    i.Ready = true
                }
            } else {
                if (j.attachEvent) {
                    g = "onreadystatechange";
                    j = document;
                    k = function() {
                        if (document.readyState === "complete" && !i.Ready) {
                            h.call(i);
                            i.Ready = true
                        }
                    }
                } else {
                    g = "onload";
                    k = function() {
                        h.call(i);
                        i.Ready = true
                    }
                }
            }
        } else {
            if (!j.addEventListener && !j.attachEvent) {
                g = "on" + g
            }
        }
        if (g === "load" && document.readyState === "complete") {
            k.call(i)
        } else {
            if (j.addEventListener) {
                j.addEventListener(g, function(l) {
                    k.call(i, l)
                })
            } else {
                if (j.attachEvent) {
                    j.attachEvent(g, function(l) {
                        k.call(i, l)
                    })
                } else {
                    j[g] = function(l) {
                        k.call(i, l)
                    }
                }
            }
        }
        return this
    };
    a.unbindEvent = function(j, g, l) {
        var i = this,
            k;
        if (g === "load") {
            var h = l;
            if (j.removeEventListener) {
                g = "DOMContentLoaded";
                l = function() {
                    h.call(i);
                    i.Ready = true
                }
            } else {
                if (j.detachEvent) {
                    g = "onreadystatechange";
                    j = document;
                    l = function() {
                        if (document.readyState === "complete" && !i.Ready) {
                            h.call(i);
                            i.Ready = true
                        }
                    }
                } else {
                    g = "onload";
                    l = function() {
                        h.call(i);
                        i.Ready = true
                    }
                }
            }
        } else {
            if (!j.removeEventListener && !j.detachEvent) {
                g = "on" + g
            }
        }
        if (j.removeEventListener) {
            j.removeEventListener(g, function(m) {
                l.call(i, m)
            })
        } else {
            if (j.detachEvent) {
                j.detachEvent(g, function(m) {
                    l.call(i, m)
                })
            } else {
                j[g] = null
            }
        }
        return this
    };
    a.prototype = {
        Path: d,
        Cache: {},
        Options: {
            AdvancedTooltips: false,
            HashAliases: {},
            LoadingText: "Loading&hellip;",
            Namespace: "tooltip",
            Offset: new e(10, 10),
            Paths: [],
            ExtraRegexes: [],
            Url: null,
            WatchComplete: null
        },
        MousePosition: new e(0, 0),
        EventHandler: null,
        CurrentElement: null,
        CurrentTitle: null,
        Timeout: null,
        LastPosition: new e(),
        FirstParty: false,
        RegEx: null,
        MouseOverDocument: false,
        Disabled: false,
        initialize: function() {
            var g = this;
            switch (arguments.length) {
                case 0:
                    return false;
                    break;
                case 1:
                    if (typeof arguments[0] === "object") {
                        this.setOptions(arguments[0])
                    } else {
                        this.setOptions({
                            Url: arguments[0]
                        })
                    }
                    break;
                case 2:
                    this.setOptions({
                        Url: arguments[0],
                        Namespace: arguments[1]
                    });
                    break
            }
            var v = document.getElementsByTagName("script"),
                u = v[v.length - 1],
                r = u.src.match(/(?:.js\?)(.*)$/);
            if (r && r.length > 1) {
                var m = r[1].split(/\&/);
                for (var p in m) {
                    if (m.hasOwnProperty(p)) {
                        var k = m[p].split(/=/);
                        if (k[0] = "var" && k[1]) {
                            window[k[1]] = this
                        }
                    }
                }
            }
            if (this.Options.Url === undefined) {
                return false
            }
            if (window.addEventListener) {
                this.EventHandler = "addEventListener"
            }
            var t = /^.*?[\/\.]([^\.]+)\.(com|net|org|local|dev)$/,
                h = document.createElement("a"),
                j = document.createElement("a");
            h.href = this.Options.Url;
            j.href = document.location.href;
            try {
                this.FirstParty = (h.hostname.match(t)[1] === j.hostname.match(t)[1])
            } catch (o) {}
            var v = document.getElementsByTagName("script");
            for (var p = 0, q = v.length; p < q; p++) {
                var u = v[p];
                if (u.src.indexOf("-azeroth.") >= 0 && u.src.endsWith("/syndication/tt.js")) {
                    this.Path = u.src;
                    this.FirstParty = false;
                    break
                }
            }
            if (!this.FirstParty) {
                var n = document.createElement("link");
                n.type = "text/css";
                n.rel = "stylesheet";
                n.href = this.Path.substr(0, this.Path.indexOf("/js/")) + "/css/syndication/tt.css";
                document.getElementsByTagName("head")[0].appendChild(n)
            }
            var s = this.Options.Paths;
            s = s.length > 0 ? s.join("|") : "";
            s = s.replace(/\//, "\\/");
            this.RegEx = new RegExp(this.Options.Url.replace(t, "^(?:https?:)?//(?:[^\\.]+\\.)?$1\\.(?:com|net|org|local|dev)/" + (this.Options.Paths.length > 0 ? "(" + this.Options.Paths.join("|") + ")/([\\d]+(?:[\\w-]+)?)(?:\\?(simple|advanced))?(?:#(\\d+)-(\\d+))?" : "")));
            if (!a.Ready) {
                a.bindEvent.call(this, window, "load", this.watchElligibleElements)
            } else {
                this.watchElligibleElements()
            }
            window.CurseTips = window.CurseTips || {};
            while (window.CurseTips[this.Options.Namespace]) {
                this.Options.Namespace += "-" + new Date().getTime()
            }
            window.CurseTips[this.Options.Namespace] = this;
            a.bindEvent.call(this, document, "mouseover", function() {
                if (!this.MouseOverDocument) {
                    this.MouseOverDocument = true
                }
                return false
            });
            a.bindEvent.call(this, document, "mouseout", function() {
                if (this.MouseOverDocument) {
                    this.handleTooltipData();
                    this.MouseOverDocument = false
                }
                return
            });
            try {
                Cobalt.runOnHtmlInsert(function(i) {
                    g.watchElements(i.find("a[href], *[data-tooltip-href]"))
                })
            } catch (o) {}
        },
        disable: function() {
            this.Disabled = true
        },
        enable: function() {
            this.Disabled = false
        },
        toggle: function() {
            this.Disabled = !this.Disabled
        },
        setOptions: function(i) {
            var g = {};
            for (var h in this.Options) {
                if (this.Options.hasOwnProperty(h)) {
                    g[h] = this.Options[h]
                }
            }
            for (var h in i) {
                if (i.hasOwnProperty(h)) {
                    g[h] = i[h]
                }
            }
            this.Options = g
        },
        watchElligibleElements: function() {
            console.time("watchElligible");
            this._watchElements(this.getElligibleElements());
            console.timeEnd("watchElligible")
        },
        watchElements: function(g) {
            if (g.nodeName && !g.length) {
                g = [g]
            }
            g = this._processElements(g);
            if (g.length) {
                this._watchElements(g)
            }
        },
        _watchElements: function(h) {
            for (var j in h) {
                if (h.hasOwnProperty(j)) {
                    var g = h[j];
                    if (!g.nodeName) {
                        continue
                    }
                    a.bindEvent.call(this, g, "mouseover", this.createTooltip);
                    a.bindEvent.call(this, g, "mouseout", function(i) {
                        this.handleTooltipData();
                        a.unbindEvent.call(this, i.currentTarget, "mousemove", this.moveTooltip)
                    })
                }
            }
            if (typeof this.Options.WatchComplete === "function") {
                this.Options.WatchComplete(h)
            }
        },
        _getURLParams: function(m) {
            try {
                var k = m.split("?")[1].match(/(.*?)(#|$)/)[1].split("&")
            } catch (g) {
                return {}
            }
            var j = {};
            for (var h in m.split("?")[1].split("&")) {
                if (k.hasOwnProperty(h)) {
                    var l = k[h].split("=");
                    j[l[0]] = l[1]
                }
            }
            return j
        },
        _isValidToolipHref: function(l) {
            var m = l.split(/(\?|#)/)[0];
            var j = document.location.href.split(/(\?|#)/)[0];
            if (m === j) {
                var n = this._getURLParams(l);
                var k = this._getURLParams(document.location.href);
                for (var h in this.Options.Arguments) {
                    if (this.Options.Arguments.hasOwnProperty(h)) {
                        var g = this.Options.Arguments[h];
                        if (n[g] !== k[g]) {
                            return true
                        }
                    }
                }
                return false
            } else {
                return true
            }
        },
        _processElements: function(l) {
            var m = [];
            for (var p in l) {
                if (l.hasOwnProperty(p) && !isNaN(p)) {
                    var k = l[p],
                        o;
                    if (!k.nodeName) {
                        continue
                    }
                    try {
                        var o = k.getAttribute("data-tooltip-href") || k.href;
                        if (!this._isValidToolipHref(o)) {
                            continue
                        }
                    } catch (i) {}
                    if (!o) {
                        continue
                    }
                    try {
                        if (k.getAttribute("data-disable-tip") === "true") {
                            continue
                        }
                    } catch (i) {}
                    if (o[0] === "/" && o[1] !== "/") {
                        o = "//" + document.location.host + o
                    }
                    o = o.replace(/\/(#|\?|$)/, "$1").replace(/#$/, "");
                    for (var h in this.Options.HashAliases) {
                        if (this.Options.HashAliases.hasOwnProperty(h)) {
                            var g = o.split("#");
                            if (!g[1]) {
                                continue
                            }
                            if (g[1] === h) {
                                g[0] += (g[0].search(/\?/) >= 0 ? "&" : "?") + this.Options.HashAliases[h];
                                o = g[0];
                                k.setAttribute("data-tooltip-href", o)
                            }
                        }
                    }
                    if (this.FirstParty) {
                        if (o.search(new RegExp(document.location.host + document.location.pathname + "$")) > -1) {
                            continue
                        }
                    }
                    if (o.substr(0, 11) === "javascript:" || o.length === 0 || o === "#") {
                        continue
                    }
                    var r = o.match(this.RegEx);
                    if (r) {
                        k.setAttribute("data-tooltip-href", o);
                        if (r[3]) {
                            k.setAttribute("data-tooltip-mode", r[3])
                        }
                        if (r[4] && r[5]) {
                            k.setAttribute("data-tooltip-ver1", r[4]);
                            k.setAttribute("data-tooltip-ver2", r[5])
                        }
                        m.push(k)
                    } else {
                        var n = false;
                        for (var s in this.Options.ExtraRegexes) {
                            if (this.Options.ExtraRegexes.hasOwnProperty(s)) {
                                var q = o.match(this.Options.ExtraRegexes[s]);
                                if (!n && q) {
                                    k.setAttribute("data-tooltip-custom", "true");
                                    n = true;
                                    m.push(k)
                                }
                            }
                        }
                    }
                }
            }
            return m
        },
        getElligibleElements: function() {
            var k = [];
            if (document.querySelectorAll) {
                var j = document.querySelectorAll("a[href], *[data-tooltip-href]")
            } else {
                var g = document.getElementsByTagName("body")[0].getElementsByTagName("*"),
                    j = [];
                for (var l in g) {
                    if (g.hasOwnProperty(l)) {
                        var h = g[l];
                        if (h.nodeName === "A" || h.getAttribute("data-tooltip-href")) {
                            j.push(h)
                        }
                    }
                }
            }
            return this._processElements(j)
        },
        createTooltip: function(k) {
            if (this.Disabled || !k.currentTarget.getAttribute("data-tooltip-href")) {
                return false
            }
            var j, v = k.currentTarget,
                r = v.getAttribute("data-tooltip-href"),
                q = v.getAttribute("data-tooltip-custom"),
                n = r,
                s = null,
                p = null;
            if (!q) {
                var t = r.split(/\?/)[1];
                n = r.split(/\//), s = n.pop().match(/^(?:(\d+)(?:-[-\w]+?)?)(\?.*?)?(#.*)?$/), p = s && s.length > 1 ? s[1] : null
            }
            var g = [],
                m = null;
            this.MousePosition.x = k.clientX;
            this.MousePosition.y = k.clientY;
            if (!q) {
                if (s && s.length) {
                    for (var o = 2; o < s.length; o++) {
                        if (!s[o]) {
                            continue
                        }
                        switch (s[o][0]) {
                            case "?":
                                g = s[o].substr(1).split(/&/);
                                break;
                            case "#":
                                m = s[o];
                                break
                        }
                    }
                }
                if (!p) {
                    return false
                }
                n.push(p);
                n = n.join("/");
                if ((this.Options.AdvancedTooltips && v.getAttribute("data-tooltip-mode") !== "simple") || v.getAttribute("data-tooltip-mode") === "advanced") {
                    g.push("advanced=1")
                }
                g.push("callback=window.CurseTips['" + this.Options.Namespace + "'].handleTooltipData")
            }
            if (j = document.getElementById("db-tooltip-container")) {
                j.innerHTML = ""
            } else {
                j = document.createElement("div");
                j.id = "db-tooltip-container";
                document.getElementsByTagName("body")[0].appendChild(j)
            }
            j.className = this.Options.Namespace;
            if (v.getAttribute("data-tooltip-ver1") && v.getAttribute("data-tooltip-ver2")) {
                if (!q) {
                    n += "/dual-tooltip/" + v.getAttribute("data-tooltip-ver1") + "/" + v.getAttribute("data-tooltip-ver2")
                }
                j.className += " diff"
            } else {
                if (!q) {
                    n += "/tooltip"
                }
            }
            if (!q) {
                n += "?" + g.join("&");
                if (location.protocol !== "file:") {
                    n = n.replace(/^http(s)?:/, "")
                }
            }
            j.style.position = "fixed";
            j.style.zIndex = 9999;
            j.style.whiteSpace = "nowrap";
            var l = document.createElement("h3"),
                h = document.createElement("div"),
                w = document.createElement("div");
            l.style.display = "none";
            h.className = "body";
            w.className = "url";
            if (this.Options.ShowURL) {
                w.innerText = r.replace(/^http(s)?:\/\//, "")
            } else {
                w.style.display = "none"
            }
            j.appendChild(l);
            j.appendChild(h);
            j.appendChild(w);
            a.bindEvent.call(this, v, "mousemove", this.moveTooltip);
            if (this.Cache[document.location.protocol + n]) {
                this.handleTooltipData(this.Cache[document.location.protocol + n])
            } else {
                var u = document.createElement("script");
                u.src = n;
                u.setAttribute("data-tooltip-href", r);
                document.getElementsByTagName("head")[0].appendChild(u);
                h.innerHTML = this.Options.LoadingText;
                j.style.display = "block"
            }
        },
        handleTooltipData: function(j) {
            var h = document.getElementById("db-tooltip-container");
            if (!h) {
                return false
            }
            if (!j) {
                h.style.display = "none";
                return false
            }
            if (location.protocol === "file:") {
                j.Tooltip = j.Tooltip.replace(/src="\/\//g, 'src="http://')
            }
            this.Cache[j.Url] = j;
            if (h.className === this.Options.Namespace + " diff") {
                var n = document.createElement("div");
                n.innerHTML = j.Tooltip;
                var g = n.getElementsByClassName("db-tooltip");
                if (g.length > 2) {
                    var l = new HTMLDiff(g[1], g[2]);
                    l.diff();
                    j.Tooltip = n.innerHTML
                }
            }
            h.getElementsByClassName("body")[0].innerHTML = j.Tooltip;
            h.style.display = "block";
            var k = h.getElementsByClassName("db-description");
            for (var m in k) {
                if (k.hasOwnProperty(m) && k[m].style !== undefined) {
                    k[m].style.whiteSpace = "normal"
                }
            }
            this.moveTooltip()
        },
        moveTooltip: function(i) {
            if (i) {
                this.MousePosition.x = i.clientX;
                this.MousePosition.y = i.clientY
            } else {
                i = {
                    clientX: this.MousePosition.x,
                    clientY: this.MousePosition.y
                }
            }
            if (!this.Options.Offset.x || !this.Options.Offset.y) {
                this.Options.Offset = new e(10, 10)
            }
            var h = document.getElementById("db-tooltip-container"),
                j = h.offsetHeight,
                l = h.offsetWidth,
                k = i.clientX + this.Options.Offset.x,
                g = (window.innerHeight - i.clientY) + this.Options.Offset.y;
            if (i.clientY - j - this.Options.Offset.y < 0) {
                if (i.clientY + j + this.Options.Offset.y <= window.innerHeight) {
                    g -= j + (this.Options.Offset.y * 2)
                } else {
                    g -= (j / 2) - this.Options.Offset.y
                }
            }
            if (window.innerWidth - i.clientX - l - this.Options.Offset.x < this.Options.Offset.x) {
                k -= l + (this.Options.Offset.x * 2)
            }
            h.style.left = f(k);
            h.style.bottom = f(g)
        }
    };
    a.bindEvent(window, "load", function() {
        this.Ready = true
    });
    b.CurseTip = a
}(window || this));

/* C:\Projects\Azeroth\Azeroth\Source\Curse.Azeroth.Web\Content\js\Azeroth\AzerothTip.js */
var __tip = new CurseTip({
    Url: "http://www.wowdb.com",
    Namespace: "wowdb-tooltip",
    Paths: ["achievements", "affixes", "currencies", "garrison/abilities", "garrison/buildings", "garrison/followers", "garrison/missions", "garrison/ships", "items", "npcs", "orderhall/talents", "pet-abilities", "quests", "spells", "wod-talents", "world-events", ],
    Arguments: ["gems", "itemLevel", "enchantment", "reforge", "extragem", "upgradeNum", "setPieces", "bonusIDs", "spec", "artifactRank"],
    LoadingText: '<div class="wowdb-tooltip"><div class="db-tooltip"><div class="db-description" style="width: auto">Loading..</div></div></div>',
});

function WP_Stretch(a) {
    var b = 600;
    a.find(".db-description").each(function() {
        var e = jQuery(this);
        var c = e.width();
        var d = false;
        e.find(".tooltip-table tr, .db-title, h2, h3, .db-achievement-criteria > li").each(function() {
            var f = parseInt(jQuery(this).attr("data-height"), 10) || 25;
            while (jQuery(this).height() > f && c < b) {
                d = true;
                c += 10;
                e.width(c)
            }
        });
        if (d) {
            e.width(c + 20)
        }
    })
}
if (typeof Azeroth !== "undefined") {
    Azeroth.CurseTip = __tip
};