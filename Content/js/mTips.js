/**
 * LBS aTips
 * Date: 2015-10-25
 **/
!function () {
    window.Tips = {
        _create: function () {
            if (!this.BG) {
                var a = document.getElementsByTagName("body")[0], b = '<table><tr><td><div id="aTips_box"><div id="aTips_content"></div><div id="aTips_foot"><a href="javascript:;" id="aTips_cancel">鍙栨秷</a><a href="javascript:;" id="aTips_define">确定</a></div></div></td></tr></table>';
                this.BG = document.createElement("div"), this.BG.id = "aTips_wrap", this.BG.innerHTML = b, a.appendChild(this.BG), this.content = this.$("#aTips_content"), this.foot = this.$("#aTips_foot"), this.define = this.$("#aTips_define"), this.cancel = this.$("#aTips_cancel")
            }
        }, _show: function () {
            this._fix = !0, this.BG.style.display = "block", this._bind()
        }, _hide: function () {
            this._fix = !1, this.BG.style.display = "none", this._unbind()
        }, _define: function (a) {
            var b = this;
            this.define.onclick = function (c) {
                if (c.stopPropagation(), "function" == typeof a)return b._hide(), b.Bool = !0, void(a && a(b.Bool));
                var d = a.before && a.before(), e = !1;
                return d === !1 && (e = !0), e ? (c.stopPropagation(), !1) : (b._hide(), b.Bool = !0, void(a.after && a.after(b.Bool)))
            }
        }, _cancel: function (a) {
            var b = this;
            this.cancel.onclick = function (c) {
                return c.stopPropagation(), b._hide(), b.Bool = !1, "function" == typeof a ? void(a && a(b.Bool)) : void(a.after && a.after(b.Bool))
            }
        }, _bind: function () {
            this.BG.focus(), this._setEvent()
        }, _unbind: function () {
            this.BG.blur(), this.define.onclick = null, this.cancel.onclick = null, this._timer && clearTimeout(this._timer), this._timer = null
        }, _setEvent: function () {
            var a = this;
            this.on(this.BG, "touchmove", function (a) {
                a.preventDefault()
            }), this.on(this.define, "touchstart", function (b) {
                a.define.className.indexOf("aTips_hover") < 0 && (a.define.className += " aTips_hover")
            }), this.on(this.define, "touchend", function (b) {
                a.define.className = a.define.className.replace("aTips_hover", "").trim()
            }), this.on(this.cancel, "touchstart", function (b) {
                a.cancel.className.indexOf("aTips_hover") < 0 && (a.cancel.className += " aTips_hover")
            }), this.on(this.cancel, "touchend", function (b) {
                a.cancel.className = a.cancel.className.replace("aTips_hover", "").trim()
            })
        }, _setBtn: function (a, b) {
            switch (this.foot.style.display = "block", this.define.style.display = "", this.cancel.style.display = "", parseInt(a)) {
                case 1:
                    this.define.className = "aTips_define", this.cancel.style.display = "none", "function" == typeof b ? (this.define.innerText = "确定", this._define(function () {
                        b && b()
                    })) : (this.define.innerText = b.define || "确定", this._define(b));
                    break;
                case 2:
                    this.define.className = "", "function" == typeof b ? (this.define.innerText = "确定", this.cancel.innerText = "鍙栨秷", this._define(function (a) {
                        b && b(a)
                    }), this._cancel(function (a) {
                        b && b(a)
                    })) : (this.define.innerText = b.define || "确定", this.cancel.innerText = b.cancel || "鍙栨秷", this._define(b), this._cancel(b));
                    break;
                case 0:
                    this.foot.style.display = "none", this.define.style.display = "none", this.cancel.style.display = "none"
            }
        }, _setContent: function (a) {
            this.content.innerHTML = a + ""
        }, _setOption: function (a, b, c) {
            var d = "";
            this._create(), "string" == typeof a || "number" == typeof a ? (d = a || "", this._setBtn(b, function (a) {
                c && c(a)
            })) : (a = a || {}, d = a.content || "", this._setBtn(b, a)), this._setContent(d), this._show()
        }, _setTime: function (a, b) {
            var c = 0, d = this;
            c = "string" == typeof a ? b : a.time, parseInt(c) > 0 && (this._timer = setTimeout(function () {
                d._hide()
            }, 1e3 * c))
        }, _create2: function () {
            if (!this.loadBG) {
                var a = document.getElementsByTagName("body")[0];
                this.loadBG = document.createElement("div"), this.loadBG.id = "aTips_loadWrap", this.loadBG.innerHTML = '<table><tr><td><div id="aTips_loadBox"></div></td></tr></table>', a.appendChild(this.loadBG), this.loadBox = this.$("#aTips_loadBox"), this._bind2()
            }
        }, _bind2: function () {
            this.on(this.loadBG, "touchmove", function (a) {
                a.preventDefault()
            })
        }, _set2: function (a) {
            a = a || "鍔犺浇涓�", this._create2(), this.loadBox.innerText = a
        }, loadShow: function (a) {
            this._set2(a), this.loadBG.style.display = "block"
        }, loadHide: function () {
            this.loadBG.style.display = "none"
        }, on: function (a, b, c) {
            a.addEventListener(b, c, !1)
        }, off: function (a, b, c) {
            a.removeEventListener(b, c, !1)
        }, $: function (a) {
            return document.querySelector(a)
        }, alert: function (a, b) {
            this._setOption(a, 1, b)
        }, confirm: function (a, b) {
            this._setOption(a, 2, function (a) {
                b && b(a)
            })
        }, open: function (a, b) {
            this._setOption(a, 0), this._setTime(a, b)
        }, close: function () {
            this._hide()
        }
    }
}();
