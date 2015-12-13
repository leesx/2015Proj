define("home/slider.js", ["./_util.js"], function (t, e, n) {
    "use strict";
    var a = t("./_util.js"), s = -562.5 * a.w / 375, r = void 0;
    e.render = function (t, e, n) {
        function a(t) {
            return new WebKitCSSMatrix(getComputedStyle(t, null).WebkitTransform).e
        }

        function i() {
            var t = -(l * x) + s;
            h.css({
                "-webkit-transform": "translateX(" + t + "px) translateZ(0)",
                transform: "translateX(" + t + "px) translateZ(0)",
                "-webkit-transition": "-webkit-transform .3s ease-in",
                transition: "transform .3s ease-in"
            }).next().find(".J_Point").removeClass("active").eq(x % d).addClass("active"), (x >= d || 0 > x) && (x = x > 0 ? 0 : d - 1, t = -(l * x) + s, setTimeout(function () {
                h.css({
                    "-webkit-transform": "translateX(" + t + "px) translateZ(0)",
                    transform: "translateX(" + t + "px) translateZ(0)",
                    "-webkit-transition": "none",
                    transition: "none"
                }).next().find(".J_Point").removeClass("active").eq(x % d).addClass("active")
            }, 400)), o(x)
        }

        function o(t) {
            var e = h.children();
            e.eq(t + 2).removeClass("shadow"), e.eq(t + 1).addClass("shadow"), e.eq(t + 3).addClass("shadow")
        }

        var l = e.style.width, d = $(t).find(".J_SliderItem").size() - 4, f = 0, c = 0, u = {}, v = 0, h = $(".J_Slider"), m = Date.now || function () {
                return (new Date).getTime()
            }, w = 0, x = 0;
        $(".J_Slider").css({
            "-webkit-transform": "translateX(" + s + "px) translateZ(0)",
            transform: "translateX(" + s + "px) translateZ(0)",
            "-webkit-transition": "-webkit-transform .3s ease-in",
            transition: "transform .3s ease-in"
        }), $(".J_Slider").on("touchstart", function (t) {
            v = a($(this)[0]);
            var e = t.touches[0];
            t.touches && 1 === t.touches.length && u.x2 && (u.x2 = void 0, u.y2 = void 0), u.x1 = e.pageX, u.y1 = e.pageY, u.start = m(), $(this).css({
                "-webkit-transition": "none",
                transition: "none"
            }), r && clearInterval(r)
        }).on("touchmove", function (t) {
            var e = t.touches[0];
            return u.x2 = e.pageX, u.y2 = e.pageY, f = u.x1 - u.x2, c = u.y1 - u.y2, w || Math.abs(f) < Math.abs(c) ? void(w = 1) : (t.stopPropagation(), t.preventDefault(), void $(this).css({
                "-webkit-transform": "translateX(" + (v - f) + "px) translateZ(0)",
                transform: "translateX(" + (v - f) + "px) translateZ(0)"
            }))
        }).on("touchend", function (t) {
            var e = a($(this)[0]);
            if (x = e > 0 ? 0 : Math.floor((l / 2 + s - e) / l), u.end = m(), Math.abs(f) / (u.end - u.start) >= .5 && Math.abs(f) < l / 2) {
                var n = f > 0 ? 1 : -1;
                x += n, x = 0 >= x ? 0 : x, x = x >= d - 1 ? d - 1 : x
            }
            r = setInterval(function () {
                x++, i()
            }, 4e3), i(), u = {}, f = c = 0, w = 0
        }), r = setInterval(function () {
            x++, i()
        }, 4e3), o(0)
    }
});


define("home/_util.js", function (x, s, h) {
    "use strict";
    function w() {
        s.font = 16 * (s.rem = (s.size = document.documentElement.getBoundingClientRect()).width / 375), s.w = s.width = s.size.width, s.h = s.height = s.size.height
    }

    function e(x, h) {
        var e = x.width, t = x.height;
        w(), h = h || s.size;
        var i = h.width, n = (h.height, i / e);
        return {w: i, h: t * n, x: n}
    }

    function t(x, s) {
        return function (h) {
            H5Data.sendExpose("/jhs.15.22.6", h.data.trackParams, s), x.apply(this, arguments)
        }
    }

    var i = {};
    ~function () {
        var x = [{w: 120, h: 120, s: "m"}, {w: 220, h: 220, s: "b"}, {w: 100, h: 100, s: "s"}, {
            w: 80,
            h: 80,
            s: "sum"
        }, {w: 100, h: 100, s: "summ"}, {w: 64, h: 64, s: "summ2"}, {w: 150, h: 150, s: "search"}, {
            w: 16,
            h: 16,
            s: "16x16"
        }, {w: 20, h: 20, s: "20x20"}, {w: 24, h: 24, s: "24x24"}, {w: 30, h: 30, s: "30x30"}, {
            w: 32,
            h: 32,
            s: "32x32"
        }, {w: 36, h: 36, s: "36x36"}, {w: 40, h: 40, s: "40x40"}, {w: 48, h: 48, s: "48x48"}, {
            w: 50,
            h: 50,
            s: "50x50"
        }, {w: 63, h: 63, s: "60x30"}, {w: 60, h: 60, s: "60x60"}, {w: 60, h: 90, s: "60x90"}, {
            w: 64,
            h: 64,
            s: "64x64"
        }, {w: 70, h: 70, s: "70x70"}, {w: 70, h: 1e3, s: "70x1000"}, {w: 72, h: 72, s: "72x72"}, {
            w: 72,
            h: 72,
            s: "72x72xz"
        }, {w: 75, h: 75, s: "75x75"}, {w: 75, h: 100, s: "75x100"}, {w: 84, h: 84, s: "80x40"}, {
            w: 80,
            h: 60,
            s: "80x60"
        }, {w: 81, h: 65, s: "81x65"}, {w: 80, h: 80, s: "80x80"}, {w: 80, h: 80, s: "80x80xz"}, {
            w: 80,
            h: 1e3,
            s: "80x1000"
        }, {w: 88, h: 88, s: "88x88"}, {w: 88, h: 88, s: "88x88xz"}, {w: 90, h: 45, s: "90x45"}, {
            w: 90,
            h: 60,
            s: "90x60"
        }, {w: 90, h: 90, s: "90x90"}, {w: 90, h: 90, s: "90x90xz"}, {w: 90, h: 135, s: "90x135"}, {
            w: 96,
            h: 54,
            s: "96x54"
        }, {w: 100, h: 50, s: "100x50"}, {w: 100, h: 100, s: "100x100"}, {w: 100, h: 100, s: "100x100xz"}, {
            w: 100,
            h: 150,
            s: "100x150"
        }, {w: 100, h: 1e3, s: "100x1000"}, {w: 110, h: 90, s: "110x90"}, {w: 110, h: 110, s: "110x110"}, {
            w: 110,
            h: 110,
            s: "110x110xz"
        }, {w: 110, h: 1e4, s: "110x10000"}, {w: 112, h: 336, s: "112x336xz"}, {w: 115, h: 100, s: "115x100"}, {
            w: 120,
            h: 60,
            s: "120x60"
        }, {w: 120, h: 90, s: "120x90"}, {w: 120, h: 120, s: "120x120"}, {w: 120, h: 120, s: "120x120xz"}, {
            w: 120,
            h: 160,
            s: "120x160"
        }, {w: 121, h: 75, s: "121x75"}, {w: 121, h: 75, s: "121x75xz"}, {w: 125, h: 125, s: "125x125"}, {
            w: 128,
            h: 128,
            s: "128x128"
        }, {w: 130, h: 130, s: "130x130"}, {w: 140, h: 70, s: "140x70"}, {w: 140, h: 100, s: "140x100"}, {
            w: 140,
            h: 140,
            s: "140x140"
        }, {w: 140, h: 140, s: "140x140xz"}, {w: 142, h: 142, s: "142x142"}, {w: 145, h: 145, s: "145x145"}, {
            w: 145,
            h: 145,
            s: "145x145xz"
        }, {w: 150, h: 150, s: "150x150"}, {w: 150, h: 200, s: "150x200"}, {w: 150, h: 1e4, s: "150x10000"}, {
            w: 152,
            h: 152,
            s: "152x152xz"
        }, {w: 160, h: 80, s: "160x80"}, {w: 160, h: 90, s: "160x90"}, {w: 160, h: 160, s: "160x160"}, {
            w: 160,
            h: 160,
            s: "160x160xz"
        }, {w: 160, h: 180, s: "160x180"}, {w: 160, h: 240, s: "160x240"}, {w: 160, h: 240, s: "160x240xz"}, {
            w: 165,
            h: 5e3,
            s: "165x5000"
        }, {w: 170, h: 170, s: "170x170"}, {w: 170, h: 170, s: "170x170xz"}, {w: 170, h: 1e4, s: "170x10000"}, {
            w: 170,
            h: 120,
            s: "170x120"
        }, {w: 170, h: 120, s: "170x120xz"}, {w: 180, h: 90, s: "180x90"}, {w: 180, h: 180, s: "180x180"}, {
            w: 180,
            h: 180,
            s: "180x180xz"
        }, {w: 180, h: 230, s: "180x230"}, {w: 190, h: 43, s: "190x43"}, {w: 190, h: 190, s: "190x190"}, {
            w: 196,
            h: 196,
            s: "196x196"
        }, {w: 200, h: 100, s: "200x100"}, {w: 200, h: 140, s: "200x140xz"}, {w: 200, h: 200, s: "200x200"}, {
            w: 200,
            h: 200,
            s: "200x200xz"
        }, {w: 210, h: 140, s: "210x140"}, {w: 210, h: 210, s: "210x210"}, {w: 210, h: 1e3, s: "210x1000"}, {
            w: 220,
            h: 220,
            s: "220x220"
        }, {w: 220, h: 330, s: "220x330"}, {w: 220, h: 330, s: "220x330xz"}, {w: 220, h: 5e3, s: "220x5000"}, {
            w: 220,
            h: 1e4,
            s: "220x10000"
        }, {w: 240, h: 5e3, s: "240x5000"}, {w: 230, h: 87, s: "230x87"}, {w: 230, h: 230, s: "230x230"}, {
            w: 230,
            h: 230,
            s: "230x230xz"
        }, {w: 234, h: 234, s: "234x234"}, {w: 240, h: 240, s: "240x240"}, {w: 240, h: 240, s: "240x240xz"}, {
            w: 240,
            h: 1e4,
            s: "240x10000"
        }, {w: 250, h: 225, s: "250x225"}, {w: 250, h: 250, s: "250x250"}, {w: 260, h: 190, s: "260x190xz"}, {
            w: 264,
            h: 100,
            s: "264x100"
        }, {w: 270, h: 180, s: "270x180"}, {w: 270, h: 270, s: "270x270"}, {w: 270, h: 270, s: "270x270xz"}, {
            w: 270,
            h: 450,
            s: "270x450"
        }, {w: 270, h: 450, s: "270x450xz"}, {w: 280, h: 410, s: "280x410"}, {w: 284, h: 284, s: "284x284"}, {
            w: 288,
            h: 480,
            s: "288x480"
        }, {w: 288, h: 480, s: "288x480xz"}, {w: 290, h: 290, s: "290x290"}, {w: 290, h: 290, s: "290x290xz"}, {
            w: 290,
            h: 1e4,
            s: "290x10000"
        }, {w: 292, h: 292, s: "292x292"}, {w: 294, h: 430, s: "294x430"}, {w: 294, h: 430, s: "294x430xz"}, {
            w: 300,
            h: 1e3,
            s: "300x1000"
        }, {w: 304, h: 304, s: "304x304xz"}, {w: 308, h: 308, s: "308x308xz"}, {w: 310, h: 310, s: "310x310"}, {
            w: 310,
            h: 310,
            s: "310x310xz"
        }, {w: 300, h: 300, s: "300x300"}, {w: 315, h: 315, s: "315x315"}, {w: 320, h: 320, s: "320x320xz"}, {
            w: 320,
            h: 320,
            s: "320x320"
        }, {w: 320, h: 480, s: "320x480"}, {w: 320, h: 378, s: "320x378xz"}, {w: 320, h: 5e3, s: "320x5000"}, {
            w: 336,
            h: 112,
            s: "336x112xz"
        }, {w: 336, h: 336, s: "336x336"}, {w: 350, h: 350, s: "350x350"}, {w: 350, h: 1e3, s: "350x1000"}, {
            w: 360,
            h: 360,
            s: "360x360"
        }, {w: 360, h: 360, s: "360x360xz"}, {w: 400, h: 152, s: "400x152"}, {w: 400, h: 400, s: "400x400"}, {
            w: 420,
            h: 280,
            s: "420x280"
        }, {w: 430, h: 430, s: "430x430"}, {w: 430, h: 430, s: "430x430xz"}, {w: 440, h: 440, s: "440x440"}, {
            w: 450,
            h: 600,
            s: "450x600"
        }, {w: 450, h: 5e3, s: "450x5000"}, {w: 450, h: 1e4, s: "450x10000"}, {w: 460, h: 460, s: "460x460"}, {
            w: 460,
            h: 460,
            s: "460x460xz"
        }, {w: 468, h: 468, s: "468x468"}, {w: 480, h: 420, s: "480x420"}, {w: 480, h: 480, s: "480x480"}, {
            w: 485,
            h: 175,
            s: "485x175"
        }, {w: 490, h: 330, s: "490x330"}, {w: 490, h: 490, s: "490x490"}, {w: 500, h: 450, s: "500x450"}, {
            w: 500,
            h: 1e3,
            s: "500x1000"
        }, {w: 540, h: 540, s: "540x540"}, {w: 560, h: 370, s: "560x370"}, {w: 560, h: 560, s: "560x560"}, {
            w: 560,
            h: 840,
            s: "560x840"
        }, {w: 560, h: 840, s: "560x840xz"}, {w: 570, h: 570, s: "570x570"}, {w: 570, h: 1e4, s: "570x10000"}, {
            w: 580,
            h: 580,
            s: "580x580"
        }, {w: 580, h: 580, s: "580x580xz"}, {w: 580, h: 1e4, s: "580x10000"}, {w: 600, h: 600, s: "600x600"}, {
            w: 616,
            h: 616,
            s: "616x616xz"
        }, {w: 620, h: 1e4, s: "620x10000"}, {w: 640, h: 480, s: "640x480"}, {w: 640, h: 640, s: "640x640"}, {
            w: 640,
            h: 640,
            s: "640x640xz"
        }, {w: 660, h: 440, s: "660x440"}, {w: 670, h: 670, s: "670x670"}, {w: 720, h: 720, s: "720x720"}, {
            w: 728,
            h: 728,
            s: "728x728"
        }, {w: 760, h: 760, s: "760x760"}, {w: 790, h: 420, s: "790x420"}, {w: 790, h: 1e4, s: "790x10000"}, {
            w: 800,
            h: 220,
            s: "800x220xz"
        }, {w: 960, h: 960, s: "960x960"}, {w: 970, h: 970, s: "970x970"}, {w: 1e4, h: 220, s: "10000x220"}, {
            w: 1e4,
            h: 340,
            s: "10000x340"
        }, {w: 1e4, h: 170, s: "10000x170"}, {w: 1e4, h: 500, s: "10000x500"}], s = {};
        i.match = function (h, w, e) {
            var t = h + "x" + w;
            return s[t] ? s[t] : (e = e || -10, x.some(function (x) {
                var i = x.w, n = x.h, z = x.s;
                return "xz" !== z.substr(-2) ? i === h && n === w ? s[t] = z : i > h + e && n > w + e ? s[t] = z : void 0 : void 0
            }), s[t] ? s[t] : "970x970")
        }
    }();
    var n;
    window.addEventListener("resize", function () {
        clearTimeout(n), n = setTimeout(w, 300)
    }, !1), s.resize = w, w();
    s.cdn = function (x, s) {
        var h = Math.ceil(window.devicePixelRatio || 1);
        return "_" + i.match(Math.ceil(x) * h, Math.ceil(s) * h, 10) + "Q50.jpg"
    }, s.r2a = e, s.miniImg = "";
    var z = "mtop.ju.option.get", a = "mtop.ju.optionitem.get", o = "1.0";
    s.getOpts = function (x, s) {
        lib.mtop.request({api: z, v: o, data: x}, t(s, "options"), function (x) {
            s()
        })
    }, s.deprecate = t, s.getItems = function (x, s) {
        lib.mtop.request({api: a, v: o, data: x}, t(s, "items"), function (x) {
            s()
        })
    }, s.isTmallApp = !!~navigator.userAgent.indexOf("AliApp(TM"), s.isInAliApp = !!~navigator.userAgent.indexOf("AliApp("), s.ignoreHead = !0
});

define("home/menu.js", function (e, o, n) {
    "use strict";
    var r = $("#J_Menu"), i = new XScroll({renderTo: r[0], scrollbarY: !1, scrollbarX: !1, lockX: !0, zoomType: "y"});
    i.render(), i.on("show", function () {
        r.addClass("more-wp-open")
    }).on("hide", function () {
        r.removeClass("more-wp-open")
    }).on("click", function (e) {
        $(e.target).fire("menutap")
    }).on("toggle", function () {
        r.toggleClass("more-wp-open")
    }), r.on("menutap", ".J_Tab", function (e) {
        i.fire("switchTo", +$(this).data("index") - 1), i.fire("hide")
    }).on("menutap", ".J_Mask,.J_MoreBd", function (e) {
        i.fire("hide")
    }), n.exports = i
});


define("home/index.js", ["./_util.js", "./menu.js", "./helper.js", "./slider.js"], function (t, e, n) {
    "use strict";
    function a() {
        var t = (location.href.split("#")[1] || "").substr(1).split(",");
        if ("all" !== t[0] && (t[0] || "").match(/^\d+$/))var e = t[0]; else var e = "all";
        return {id: e, page: t[1] || 0}
    }

    function i(t) {
        location.href = location.pathname + location.search + "#!" + t
    }

    var o, r = t("./_util.js"), s = function () {
        function e(t) {
            return ~t ? r.eq(t).data("id") : "all"
        }

        function n(t) {
            return ~t ? r.eq(t).data("catid") : "catelog_all"
        }

        function a(t, e) {
            function n(t) {
                return document.querySelector(t)
            }

            var a = {
                init: function () {
                    if (n('meta[name="spm-id"]')) {
                        var a = n('meta[name="spm-id"]').getAttribute("content"), i = "//wgo.mmstat.com/jhs." + a + "." + t + "." + e + "?", o = ["spm-cnt=" + a + ".0.0", "logtype=2", "cache=" + Math.random(), "autosend=1"], r = i + o.join("&");
                        (new Image).src = decodeURIComponent(r)
                    }
                }
            };
            a.init()
        }

        var i = t("./menu.js"), o = $("#J_Nav"), r = o.find(".J_TabItem"), s = o.find(".J_TabAll"), c = o.find(".J_MoreBtn"), d = new XScroll({
            renderTo: o.find(".J_TabsWp")[0],
            scrollbarX: !1,
            scrollbarY: !1,
            lockY: !0
        });
        d.render();
        var l, f;
        return d.on("click", function (t) {
            $(t.target).fire("navtap")
        }).on("switchTo", function (t) {
            if (i.fire("hide"), f = l, l = t, f !== l) {
                var n = r.removeClass("active")[t];
                if (s.removeClass("active"), !~t)return s.addClass("active"), void d.fire("switchChange", l, s, {
                    cur: l,
                    prev: f,
                    curId: e(l),
                    prevId: e(f)
                });
                var a = n.offsetLeft, o = d.width, c = d.containerWidth - d.width, u = a - o / 2 + n.offsetWidth / 2 < 0 ? 0 : a - o / 2 + n.offsetWidth / 2;
                u = u > c ? c : u, d.scrollX(u, "ease-out");
                var h = $(n).addClass("active");
                d.fire("switchChange", l, h, {cur: l, prev: f, curId: e(l), prevId: e(f)})
            }
        }).on("switchToId", function (t) {
            "all" === t && (a("nav", n(-1)), d.fire("switchTo", -1)), r.each(function (e) {
                $(this).data("id") == t && (a("nav", n($(this).index())), d.fire("switchTo", $(this).index()))
            })
        }).render(), i.on("hide", function () {
            c.removeClass("tab-more-open")
        }).on("show", function () {
            c.addClass("tab-more-open")
        }).on("toggle", function () {
            a("nav", "catelog_more"), c.toggleClass("tab-more-open")
        }).on("switchTo", function (t) {
            a("menu", n(t)), d.fire("switchTo", t)
        }), o.on("navtap", ".J_Tab", function (t) {
            a("nav", n($(this).index())), d.fire("switchTo", $(this).index())
        }).on("navtap", ".J_MoreBtn", function () {
            i.fire("toggle")
        }).on("navtap", ".J_TabAll", function (t) {
            a("nav", -1), d.fire("switchTo", -1)
        }), d
    }(), c = t("./helper.js"), d = navigator.userAgent, l = d.match(/Android\s(\d+\.\d+)/), f = d.match(/gngouua/i);
    $.getParams = function () {
        return o || (o = {}, location.search.slice(1).split("&").forEach(function (t, e) {
            try {
                t = t.split("="), e = decodeURIComponent(t[0]), t = decodeURIComponent(t[1]), t = {
                        "null": null,
                        undefined: void 0,
                        NaN: NaN,
                        Infinity: 1 / 0,
                        "true": !0,
                        "false": !1
                    }[t] || t, +t && (t = +t), o[e] = t
            } catch (n) {
            }
        })), o
    }, o = $.getParams(), $.fn.aHref = function (t) {
        if (!t)return this;
        var e = new RegExp("\\&*" + t + "\\=[^\\&]+?", "i"), n = new RegExp("\\&*" + t + "\\=[^\\&]*?", "i");
        return this.each(function () {
            var a = $(this), i = a.attr("href");
            i && !i.match(/javascript\:/i) && (i = i.split(/[\?\#]/), i[1] = i[1] || "", i[2] = i[2] ? "#" + i[2] : "", i[1].match(e) || (i[1] = i[1].replace(n, "") + "&" + t + "=" + (o[t] || "")), !i[0].match(/^https*\:/i) && i[0].match(/^\/{2}/) && (i[0] = location.protocol + i[0]), a.attr("href", i[0] + "?" + i[1].replace(/^\&/, "") + i[2]))
        })
    }, $("body").find("a").aHref("from");
    var u = "sticky", h = 10, p = d.match(/AppleWebKit\/(\S+?)\s*/);
    p = p ? p[1].replace(/\./g, "-") : "not-found";
    var m = $("html").addClass((r.ignoreHead ? "aliapp " : "") + " webkit-" + p);
    if (l && (m.addClass("android android-" + l[1].replace(/\./g, "-")), u = "", h = 20), f && m.addClass("android-jinli"), d.match(/ucbrowser/i) && m.addClass("ucbrowser"), d.match(/iPhone OS/)) {
        var v = (window.screen.width, window.screen.height), g = "";
        480 === v && (h = 35, g = "iphone4"), m.addClass("iphone " + g)
    }
    lib.mtop.config.subDomain = /waptest|daily/.test(location.host) ? "waptest" : /wapa/.test(location.host) ? "wapa" : "m";
    var w = new XList({
        renderTo: "#J_List",
        itemHeight: r.h,
        infiniteElements: "#J_List .widget",
        SROLL_ACCELERATION: h / 1e4,
        renderHook: function (t, e) {
            $(t).html(e.data).attr("data-spm", e.spmId || "").find("a").aHref("from"), e._mId && seajs.use(e._mId, function (n) {
                n.render(t, e, w), $(t).find("a").aHref("from")
            }), w.fire("loadimg")
        }
    });
    t("./slider.js");
    var _, T = new XList.Plugin.PullUp({bufferHeight: 40, height: 40, prefix: "pullup-"}).on("loading", function () {
        _ = _ && clearTimeout(_), _ = setTimeout(function () {
            var t, e = w._$lists[w._$id];
            e.lists.some(function (e) {
                return !(t = e).finished
            }) ? seajs.use(t._mId, function (e) {
                e.load(t, w, T)
            }) : e.footer || (e.footer = 1, w.appendDataSet(new XList.DataSet({
                data: [{
                    recycled: !0,
                    data: c.footerTpl,
                    style: {width: r.w, height: 118}
                }]
            })), T.complete(), w.unplug(T), w.render())
        }, 100)
    });
    w._$lists = {}, w._sticky = u, w.plug(T);
    var C, b = $("#gotop").on("click", function () {
        w.scrollY(0, 0, "none", 0), w.render()
    });
    w.on("complete", function (t, e, n) {
        n = n || 0, w._$id = t, n != w.getOffset().y && (w.scrollY(n, 0, "none", 0), w.render(), w.timer.y.stop()), w.unplug(T), w.plug(T), i(t), T.fire("loading"), w.fire("loadimg")
    }).on("scroll", function (t) {
        var e = w.getOffsetTop();
        e > -50 ? b.removeClass("show") : b.addClass("show"), w.fire("loadimg")
    }).on("loadimg", function () {
        C && clearTimeout(C), C = setTimeout(function () {
            $(".lazy-img").each(function () {
                var t = $(this);
                t.attr("src", t.data("src")).removeClass("lazy-img")
            })
        }, 200)
    }), $("#J_List").on("click", function (t) {
        if ($(t.target).attr("href")) {
            var e = $(t.target).attr("href");
            try {
                r.isInAliApp && window.WindVane && (WindVane.call("Base", "openWindow", {url: e}, function (t) {
                }, function (t) {
                    window.open(e, "_blank")
                }), t.preventDefault(), t.stopPropagation())
            } catch (t) {
            }
        }
    }), s.on("switchChange", function (t, e, n) {
        var a = w._$lists, i = n.curId, o = n.prevId;
        if (a[o]) {
            var r = a[o];
            r.$data = w.datasets, r.$y = -w.getOffset().y
        }
        if (w.datasets = [], w.render(), a[i]) {
            var s = a[i];
            return w.datasets = s.$data, void w.fire("complete", i, o, s.$y)
        }
        var d = "JU_WAP_";
        location.hostname.match(/\.wapa\./) && (location.search.match(/DEBUG\=3\.0/) ? d = "TEST_JU_WAP_" : location.search.match(/location\=([^&]+)/i) && (d = String(location.search.match(/location\=([^&]+)/i)[1]).toUpperCase()));
        var l = String(i).toUpperCase();
        l = "ALL" === l ? d + l : d + "CAT_" + l, lib.mtop.request({
            api: "mtop.ju.resource.page.get",
            v: "1.0",
            data: {location: l, version: "1.0"}
        }, function (t) {
            c.help(w, t, i, o)
        }, function (t) {
            c.help(w, {}, i, o)
        })
    }).fire("switchToId", a().id);
    var I;
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        I && clearTimeout(I), I = setTimeout(function () {
            r.resize(), w.datasets.forEach(function (t) {
                t.data.forEach(function (t) {
                    t._reload && t._reload()
                })
            }), w.render()
        }, 300)
    }, !1)
});