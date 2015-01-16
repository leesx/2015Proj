(function(e) {
    e.fn.krater = function(t) {
        var n = {
            raterOn: "http://web.r1.market.hiapk.com/webbackstage/images/Themes/Default_1/Images/stars_ond.gif",
            raterOff: "http://web.r1.market.hiapk.com/webbackstage/images/Themes/Default_1/Images/stars_offd.gif",
            starQuantity: 10,
            maxValue: 100,
            minValue: 0,
            defaultValue: 0,
            stepValue: 5,
            valueObj: "",
            valueObjTips: "",
            readOnly: !1,
            onMove: null,
            onClick: null
        };
        return t = t || {},
            e.extend(n, t),
            (n.maxValue - n.minValue) / n.stepValue < n.starQuantity && (n.stepValue = (n.maxValue - n.minValue) / n.starQuantity),
            this.each(function() {
                function u(e, t) {
                    var r = n.stepValue / (n.maxValue - n.minValue) * t;
                    return Math.ceil((e - 2) / r) * r
                }
                function a(e, t) {
                    var r = n.stepValue / (n.maxValue - n.minValue) * t;
                    return Math.ceil((e - 2) / t / (n.stepValue / (n.maxValue - n.minValue))) * n.stepValue + n.minValue
                }
                function f(e) {
                    return e < 11 ? "很差": e < 21 ? "差": e < 31 ? "一般": e < 41 ? "好": e < 51 ? "很好": "一般"
                }
                var t = e(this),
                    r = new Image;
                r.src = n.raterOff;
                var i = new Image;
                i.src = n.raterOn,
                    i.width = i.width == 0 ? 21: i.width,
                    i.height = i.height == 0 ? 21: i.height,
                    r.width = r.width == 0 ? 21: r.width,
                    r.height = r.height == 0 ? 21: r.height,
                    e(t).attr("readOnly", n.readOnly),
                        typeof e(t).attr("value") == "undefined" ? e(t).attr("value", n.defaultValue) : n.defaultValue = e(t).attr("value");
                var s = document.createElement("span"),
                    o = Math.max((n.defaultValue - n.minValue) / (n.maxValue - n.minValue), 0);
                n.valueObj && e("#" + n.valueObj) && e("#" + n.valueObj).attr("value", n.defaultValue),
                        r.width == 0 || r.height == 0 || i.width == 0 || i.height == 0 || i.width != r.width || i.height != r.height ? (e(s).css({
                    overflow: "hidden",
                    width: o * n.starQuantity * 10,
                    height: 13,
                    "background-color": "green",
                    display: "block"
                }), e(t).css({
                    overflow: "hidden",
                    width: n.starQuantity * 10 + 1,
                    height: 13,
                    "background-color": "grey",
                    display: "block"
                })) : (e(s).css({
                    overflow: "hidden",
                    width: o * n.starQuantity * i.width,
                    height: i.height + 2,
                    "background-image": "url(" + n.raterOn + ")",
                    "background-repreat": "repeat-x",
                    display: "block"
                }), e(t).css({
                    overflow: "hidden",
                    width: n.starQuantity * i.width - 4,
                    height: i.height - 2,
                    "background-image": "url(" + n.raterOff + ")",
                    "background-repreat": "repeat-x",
                    display: "block"
                })),
                    e(t).append(e(s)),
                    e(t).mousemove(function(t) {
                        if (e(this).attr("readOnly") == "true") return ! 1;
                        var r = e(this).position(),
                            i = e(this).offset(),
                            s = t.pageX - i.left,
                            o = t.pageY - i.top,
                            l = parseFloat(e(this).css("width")),
                            c = Math.ceil(u(s, l));
                        if (c == e(this).find("span").css("width")) return ! 0;
                        e(this).find("span").css({
                            width: c
                        }),
                            s = a(s, l),
                            n.valueObj && e("#" + n.valueObj) && e("#" + n.valueObj).attr("value", s),
                            n.onMove && n.onMove(s),
                            n.valueObjTips && e("#" + n.valueObjTips) && e("#" + n.valueObjTips).html(f(s))
                    }),
                    e(t).click(function(t) {
                        if (e(this).attr("readOnly") == "true") return ! 1;
                        var r = e(this).offset(),
                            i = t.pageX - r.left,
                            s = t.pageY - r.top,
                            o = parseFloat(e(this).css("width")),
                            l = Math.ceil(u(i, o));
                        if (l == e(this).find("span").css("width")) return ! 0;
                        e(this).find("span").css({
                            width: l
                        }),
                            i = a(i, o),
                            e(this).attr("value", i),
                            n.valueObj && e("#" + n.valueObj) && e("#" + n.valueObj).attr("value", i),
                            n.onClick && n.onClick(i),
                            n.valueObjTips && e("#" + n.valueObjTips) && e("#" + n.valueObjTips).html(f(i))
                    }),
                    e(t).mouseout(function(t) {
                        if (e(this).attr("readOnly") == "true") return ! 1;
                        var r = parseFloat(e(this).attr("value")) - n.minValue,
                            i = Math.ceil(r / (n.maxValue - n.minValue) * parseFloat(e(this).css("width")));
                        e(this).find("span").css({
                            width: i
                        });
                        var s = e(this).attr("value");
                        n.valueObj && e("#" + n.valueObj) && e("#" + n.valueObj).attr("value", s),
                            n.onMove && n.onMove(s),
                            n.valueObjTips && e("#" + n.valueObjTips) && e("#" + n.valueObjTips).html(f(s))
                    })
            })
    }
})(jQuery);