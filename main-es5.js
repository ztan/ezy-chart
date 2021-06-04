(function () {
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! C:\work\projects\sandbox\ezy-chart-app\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "RnhZ":
    /*!**************************************************!*\
      !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
      \**************************************************/

    /*! no static exports found */

    /***/
    function RnhZ(module, exports, __webpack_require__) {
      var map = {
        "./af": "K/tc",
        "./af.js": "K/tc",
        "./ar": "jnO4",
        "./ar-dz": "o1bE",
        "./ar-dz.js": "o1bE",
        "./ar-kw": "Qj4J",
        "./ar-kw.js": "Qj4J",
        "./ar-ly": "HP3h",
        "./ar-ly.js": "HP3h",
        "./ar-ma": "CoRJ",
        "./ar-ma.js": "CoRJ",
        "./ar-sa": "gjCT",
        "./ar-sa.js": "gjCT",
        "./ar-tn": "bYM6",
        "./ar-tn.js": "bYM6",
        "./ar.js": "jnO4",
        "./az": "SFxW",
        "./az.js": "SFxW",
        "./be": "H8ED",
        "./be.js": "H8ED",
        "./bg": "hKrs",
        "./bg.js": "hKrs",
        "./bm": "p/rL",
        "./bm.js": "p/rL",
        "./bn": "kEOa",
        "./bn-bd": "loYQ",
        "./bn-bd.js": "loYQ",
        "./bn.js": "kEOa",
        "./bo": "0mo+",
        "./bo.js": "0mo+",
        "./br": "aIdf",
        "./br.js": "aIdf",
        "./bs": "JVSJ",
        "./bs.js": "JVSJ",
        "./ca": "1xZ4",
        "./ca.js": "1xZ4",
        "./cs": "PA2r",
        "./cs.js": "PA2r",
        "./cv": "A+xa",
        "./cv.js": "A+xa",
        "./cy": "l5ep",
        "./cy.js": "l5ep",
        "./da": "DxQv",
        "./da.js": "DxQv",
        "./de": "tGlX",
        "./de-at": "s+uk",
        "./de-at.js": "s+uk",
        "./de-ch": "u3GI",
        "./de-ch.js": "u3GI",
        "./de.js": "tGlX",
        "./dv": "WYrj",
        "./dv.js": "WYrj",
        "./el": "jUeY",
        "./el.js": "jUeY",
        "./en-au": "Dmvi",
        "./en-au.js": "Dmvi",
        "./en-ca": "OIYi",
        "./en-ca.js": "OIYi",
        "./en-gb": "Oaa7",
        "./en-gb.js": "Oaa7",
        "./en-ie": "4dOw",
        "./en-ie.js": "4dOw",
        "./en-il": "czMo",
        "./en-il.js": "czMo",
        "./en-in": "7C5Q",
        "./en-in.js": "7C5Q",
        "./en-nz": "b1Dy",
        "./en-nz.js": "b1Dy",
        "./en-sg": "t+mt",
        "./en-sg.js": "t+mt",
        "./eo": "Zduo",
        "./eo.js": "Zduo",
        "./es": "iYuL",
        "./es-do": "CjzT",
        "./es-do.js": "CjzT",
        "./es-mx": "tbfe",
        "./es-mx.js": "tbfe",
        "./es-us": "Vclq",
        "./es-us.js": "Vclq",
        "./es.js": "iYuL",
        "./et": "7BjC",
        "./et.js": "7BjC",
        "./eu": "D/JM",
        "./eu.js": "D/JM",
        "./fa": "jfSC",
        "./fa.js": "jfSC",
        "./fi": "gekB",
        "./fi.js": "gekB",
        "./fil": "1ppg",
        "./fil.js": "1ppg",
        "./fo": "ByF4",
        "./fo.js": "ByF4",
        "./fr": "nyYc",
        "./fr-ca": "2fjn",
        "./fr-ca.js": "2fjn",
        "./fr-ch": "Dkky",
        "./fr-ch.js": "Dkky",
        "./fr.js": "nyYc",
        "./fy": "cRix",
        "./fy.js": "cRix",
        "./ga": "USCx",
        "./ga.js": "USCx",
        "./gd": "9rRi",
        "./gd.js": "9rRi",
        "./gl": "iEDd",
        "./gl.js": "iEDd",
        "./gom-deva": "qvJo",
        "./gom-deva.js": "qvJo",
        "./gom-latn": "DKr+",
        "./gom-latn.js": "DKr+",
        "./gu": "4MV3",
        "./gu.js": "4MV3",
        "./he": "x6pH",
        "./he.js": "x6pH",
        "./hi": "3E1r",
        "./hi.js": "3E1r",
        "./hr": "S6ln",
        "./hr.js": "S6ln",
        "./hu": "WxRl",
        "./hu.js": "WxRl",
        "./hy-am": "1rYy",
        "./hy-am.js": "1rYy",
        "./id": "UDhR",
        "./id.js": "UDhR",
        "./is": "BVg3",
        "./is.js": "BVg3",
        "./it": "bpih",
        "./it-ch": "bxKX",
        "./it-ch.js": "bxKX",
        "./it.js": "bpih",
        "./ja": "B55N",
        "./ja.js": "B55N",
        "./jv": "tUCv",
        "./jv.js": "tUCv",
        "./ka": "IBtZ",
        "./ka.js": "IBtZ",
        "./kk": "bXm7",
        "./kk.js": "bXm7",
        "./km": "6B0Y",
        "./km.js": "6B0Y",
        "./kn": "PpIw",
        "./kn.js": "PpIw",
        "./ko": "Ivi+",
        "./ko.js": "Ivi+",
        "./ku": "JCF/",
        "./ku.js": "JCF/",
        "./ky": "lgnt",
        "./ky.js": "lgnt",
        "./lb": "RAwQ",
        "./lb.js": "RAwQ",
        "./lo": "sp3z",
        "./lo.js": "sp3z",
        "./lt": "JvlW",
        "./lt.js": "JvlW",
        "./lv": "uXwI",
        "./lv.js": "uXwI",
        "./me": "KTz0",
        "./me.js": "KTz0",
        "./mi": "aIsn",
        "./mi.js": "aIsn",
        "./mk": "aQkU",
        "./mk.js": "aQkU",
        "./ml": "AvvY",
        "./ml.js": "AvvY",
        "./mn": "lYtQ",
        "./mn.js": "lYtQ",
        "./mr": "Ob0Z",
        "./mr.js": "Ob0Z",
        "./ms": "6+QB",
        "./ms-my": "ZAMP",
        "./ms-my.js": "ZAMP",
        "./ms.js": "6+QB",
        "./mt": "G0Uy",
        "./mt.js": "G0Uy",
        "./my": "honF",
        "./my.js": "honF",
        "./nb": "bOMt",
        "./nb.js": "bOMt",
        "./ne": "OjkT",
        "./ne.js": "OjkT",
        "./nl": "+s0g",
        "./nl-be": "2ykv",
        "./nl-be.js": "2ykv",
        "./nl.js": "+s0g",
        "./nn": "uEye",
        "./nn.js": "uEye",
        "./oc-lnc": "Fnuy",
        "./oc-lnc.js": "Fnuy",
        "./pa-in": "8/+R",
        "./pa-in.js": "8/+R",
        "./pl": "jVdC",
        "./pl.js": "jVdC",
        "./pt": "8mBD",
        "./pt-br": "0tRk",
        "./pt-br.js": "0tRk",
        "./pt.js": "8mBD",
        "./ro": "lyxo",
        "./ro.js": "lyxo",
        "./ru": "lXzo",
        "./ru.js": "lXzo",
        "./sd": "Z4QM",
        "./sd.js": "Z4QM",
        "./se": "//9w",
        "./se.js": "//9w",
        "./si": "7aV9",
        "./si.js": "7aV9",
        "./sk": "e+ae",
        "./sk.js": "e+ae",
        "./sl": "gVVK",
        "./sl.js": "gVVK",
        "./sq": "yPMs",
        "./sq.js": "yPMs",
        "./sr": "zx6S",
        "./sr-cyrl": "E+lV",
        "./sr-cyrl.js": "E+lV",
        "./sr.js": "zx6S",
        "./ss": "Ur1D",
        "./ss.js": "Ur1D",
        "./sv": "X709",
        "./sv.js": "X709",
        "./sw": "dNwA",
        "./sw.js": "dNwA",
        "./ta": "PeUW",
        "./ta.js": "PeUW",
        "./te": "XLvN",
        "./te.js": "XLvN",
        "./tet": "V2x9",
        "./tet.js": "V2x9",
        "./tg": "Oxv6",
        "./tg.js": "Oxv6",
        "./th": "EOgW",
        "./th.js": "EOgW",
        "./tk": "Wv91",
        "./tk.js": "Wv91",
        "./tl-ph": "Dzi0",
        "./tl-ph.js": "Dzi0",
        "./tlh": "z3Vd",
        "./tlh.js": "z3Vd",
        "./tr": "DoHr",
        "./tr.js": "DoHr",
        "./tzl": "z1FC",
        "./tzl.js": "z1FC",
        "./tzm": "wQk9",
        "./tzm-latn": "tT3J",
        "./tzm-latn.js": "tT3J",
        "./tzm.js": "wQk9",
        "./ug-cn": "YRex",
        "./ug-cn.js": "YRex",
        "./uk": "raLr",
        "./uk.js": "raLr",
        "./ur": "UpQW",
        "./ur.js": "UpQW",
        "./uz": "Loxo",
        "./uz-latn": "AQ68",
        "./uz-latn.js": "AQ68",
        "./uz.js": "Loxo",
        "./vi": "KSF8",
        "./vi.js": "KSF8",
        "./x-pseudo": "/X5v",
        "./x-pseudo.js": "/X5v",
        "./yo": "fzPg",
        "./yo.js": "fzPg",
        "./zh-cn": "XDpg",
        "./zh-cn.js": "XDpg",
        "./zh-hk": "SatO",
        "./zh-hk.js": "SatO",
        "./zh-mo": "OmwH",
        "./zh-mo.js": "OmwH",
        "./zh-tw": "kOpN",
        "./zh-tw.js": "kOpN"
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = "RnhZ";
      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var ezy_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ezy-chart */
      "z9fm");

      function AppComponent_div_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ezy-chart", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("datasets", ctx_r0.datasets)("labels", ctx_r0.labels)("type", ctx_r0.type)("colorsFor", ctx_r0.colorsFor)("currency", ctx_r0.currencyMode ? "USD" : undefined)("percentage", ctx_r0.showPercentage);
        }
      }

      function AppComponent_div_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ezy-echart", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("datasets", ctx_r1.datasets)("labels", ctx_r1.labels)("type", ctx_r1.type)("colorsFor", ctx_r1.colorsFor)("currency", ctx_r1.currencyMode ? "USD" : undefined)("percentage", ctx_r1.showPercentage);
        }
      }

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent() {
          _classCallCheck(this, AppComponent);

          this.datasets = [{
            data: [12, 19, 3, 5, 2, 3],
            label: 'series 1'
          }];
          this.labels = ['sample 1', 'sample 2', 'sample 3', 'sample 4', 'sample 5', 'sample 6'];
          this.type = 'bar';
          this.colorsFor = 'auto';
          this.timeScale = false;
          this.currencyMode = false;
          this.showPercentage = false;
          this.engine = 'chartjs';
        }

        _createClass(AppComponent, [{
          key: "addData",
          value: function addData() {
            var _this = this;

            this.labels.push("sample ".concat(this.labels.length + 1));
            this.datasets.forEach(function (ds) {
              var data = ds.data || [];
              data.push(_this._getRandomDataItem(data.length));
            });
          }
        }, {
          key: "addSeries",
          value: function addSeries() {
            if (this.datasets.length) {
              var data = new Array((this.datasets[0].data || []).length);

              for (var i = 0; i < data.length; i++) {
                data[i] = this._getRandomDataItem(i);
              }

              var ds = {
                data: data,
                label: "series ".concat(this.datasets.length + 1)
              };

              if (this.type === 'line' && this.engine === 'chartjs') {
                this._configLineSpecificProperties(ds);
              }

              this.datasets.push(ds);
            }
          }
        }, {
          key: "removeData",
          value: function removeData() {
            if (this.labels.length > 1) {
              this.labels.pop();
              this.datasets.map(function (ds) {
                return ds.data;
              }).filter(function (d) {
                return d.length > 1;
              }).forEach(function (d) {
                return d.pop();
              });
            }
          }
        }, {
          key: "removeSeries",
          value: function removeSeries() {
            if (this.datasets.length > 1) {
              this.datasets.pop();
            }
          }
        }, {
          key: "chartTypeChanged",
          value: function chartTypeChanged() {
            var _this2 = this;

            this.colorsFor = 'auto';
            this.timeScale = false;
            this.scaleChanged();

            if (this.type === 'line' && this.engine === 'chartjs') {
              this.datasets.forEach(function (ds) {
                return _this2._configLineSpecificProperties(ds);
              });
            } else {
              this.datasets = this.datasets.map(function (ds) {
                return {
                  data: ds.data,
                  label: ds.label
                };
              });
            }
          }
        }, {
          key: "scaleChanged",
          value: function scaleChanged() {
            var _this3 = this;

            var dataPoints = 0;
            this.datasets.forEach(function (ds) {
              var data = ds.data || [];
              dataPoints = Math.max(dataPoints, data.length);
              data.forEach(function (d, i) {
                if (typeof d === 'number' && _this3.timeScale) {
                  data[i] = {
                    y: d,
                    x: moment__WEBPACK_IMPORTED_MODULE_0___default()().add(-i, 'year')
                  };
                } else if (!_this3.timeScale && typeof d !== 'number') {
                  data[i] = d.y;
                }
              });
            });
            this.labels = [];

            if (!this.timeScale) {
              for (var i = 0; i < dataPoints; i++) {
                this.labels.push("sample ".concat(this.labels.length + 1));
              }
            }
          }
        }, {
          key: "_configLineSpecificProperties",
          value: function _configLineSpecificProperties(ds) {
            ds.fill = false;
            ds.pointRadius = 8;
            ds.pointHoverRadius = 10;
            ds.lineTension = 0.1;
          }
        }, {
          key: "_getRandomDataItem",
          value: function _getRandomDataItem(dsIndex) {
            var n = Number((Math.random() * 20).toFixed(1));

            if (this.timeScale) {
              return {
                y: n,
                x: moment__WEBPACK_IMPORTED_MODULE_0___default()().add(-dsIndex, 'year')
              };
            } else {
              return n;
            }
          }
        }, {
          key: "sampleTemplate",
          get: function get() {
            var chartTag = this.engine === 'chartjs' ? 'ezy-chart' : 'ezy-echart';
            var templ = "<".concat(chartTag, " type=\"").concat(this.type, "\" [datasets]=\"datasets\"");

            if (this.labels && this.labels.length) {
              templ += ' [labels]="labels"';
            }

            if (this.colorsFor !== 'auto') {
              templ += " colorsFor=\"".concat(this.colorsFor, "\"");
            }

            if (this.currencyMode) {
              templ += ' currency="USD"';
            }

            if (this.showPercentage === 'only') {
              templ += ' percentage="only"';
            } else if (this.showPercentage) {
              templ += ' [percentage]="true"';
            }

            templ += "></".concat(chartTag, ">");
            return templ;
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["ezy-chart-app-root"]],
        decls: 111,
        vars: 31,
        consts: [[1, "col-form-label"], [1, "form-check", "form-check-inline"], [1, "form-check-label"], ["type", "radio", "name", "engine", "value", "chartjs", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "name", "engine", "value", "echarts", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "row"], [1, "col-lg-6"], [3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [1, "row", "align-items-center"], [1, "form-group", "col-lg-6"], ["for", "chartType", 1, "col-form-label"], ["id", "chartType", 1, "form-control", 3, "ngModel", "ngModelChange", "change"], [3, "value"], ["type", "radio", "name", "colorsFor", "value", "auto", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "name", "colorsFor", "value", "series", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "name", "colorsFor", "value", "data", 1, "form-control", 3, "ngModel", "ngModelChange"], ["type", "radio", "name", "colorsFor", "value", "none", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "form-check", "col-lg-3"], [1, "form-check-label", "d-flex", "align-items-center"], ["type", "checkbox", 1, "form-check-input", "mt-0", 3, "ngModel", "disabled", "ngModelChange", "change"], ["type", "checkbox", 1, "form-check-input", "mt-0", 3, "ngModel", "ngModelChange"], [1, "form-check", "col-lg-6"], ["type", "radio", "name", "showPercentage", 1, "form-control", 3, "value", "ngModel", "ngModelChange"], ["type", "radio", "name", "showPercentage", "value", "only", 1, "form-control", 3, "ngModel", "ngModelChange"], [1, "btn", "btn-default", "mb-1", 3, "click"], [1, "form-group"], [1, "form-control", "pre-scrollable"], [1, "col"], [3, "datasets", "labels", "type", "colorsFor", "currency", "percentage"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Engine");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_5_listener($event) {
              return ctx.engine = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Chart.js ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_9_listener($event) {
              return ctx.engine = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " EChart ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, AppComponent_div_14_Template, 2, 6, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, AppComponent_div_15_Template, 2, 6, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "label", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Chart type");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "select", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_20_listener($event) {
              return ctx.type = $event;
            })("change", function AppComponent_Template_select_change_20_listener() {
              return ctx.chartTypeChanged();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Bar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Horizontal Bar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Line");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Pie");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Doughnut");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "Polar Area");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "option", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Radar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Colors for");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "input", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_41_listener($event) {
              return ctx.colorsFor = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, " Auto ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "input", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_45_listener($event) {
              return ctx.colorsFor = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, " Series ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "input", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_49_listener($event) {
              return ctx.colorsFor = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, " Data ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "input", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_53_listener($event) {
              return ctx.colorsFor = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, " None ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "label", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "input", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_57_listener($event) {
              return ctx.timeScale = $event;
            })("change", function AppComponent_Template_input_change_57_listener() {
              return ctx.scaleChanged();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "Time scale");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "label", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "input", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_62_listener($event) {
              return ctx.currencyMode = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "Currency mode");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "div", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](67, "Show percentage");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "input", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_71_listener($event) {
              return ctx.showPercentage = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](72, " False ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](74, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "input", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_75_listener($event) {
              return ctx.showPercentage = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](76, " True ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](77, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](78, "label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](79, "input", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_input_ngModelChange_79_listener($event) {
              return ctx.showPercentage = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](80, " Only ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](81, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_81_listener() {
              return ctx.addData();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](82, "Add data point");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](83, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_83_listener() {
              return ctx.removeData();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](84, "Remove data point");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](85, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_85_listener() {
              return ctx.addSeries();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](86, "Add data series");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "button", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_Template_button_click_87_listener() {
              return ctx.removeSeries();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](88, "Remove data series");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](89, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](90, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](91, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](92, "Datasets");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](93, "pre", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](94, "code");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](95);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](96, "json");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](97, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](98, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](99, "Labels");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](100, "pre", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](101, "code");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](102);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](103, "json");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](104, "div", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](105, "div", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](106, "label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](107, "Template code");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](108, "pre", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](109, "code");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](110);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.engine);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.engine);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngSwitch", ctx.engine);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngSwitchCase", "chartjs");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.type);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "bar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "horizontalBar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "line");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "pie");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "doughnut");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "polarArea");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", "radar");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.colorsFor);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.colorsFor);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.colorsFor);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.colorsFor);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.timeScale)("disabled", ctx.type !== "line");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.currencyMode);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", false)("ngModel", ctx.showPercentage);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", true)("ngModel", ctx.showPercentage);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.showPercentage);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](96, 27, ctx.datasets));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](103, 29, ctx.labels));

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.sampleTemplate);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchDefault"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], ezy_chart__WEBPACK_IMPORTED_MODULE_4__["ChartComponent"], ezy_chart__WEBPACK_IMPORTED_MODULE_4__["EChartComponent"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["JsonPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var ezy_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ezy-chart */
      "z9fm");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], ezy_chart__WEBPACK_IMPORTED_MODULE_2__["ChartsModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], ezy_chart__WEBPACK_IMPORTED_MODULE_2__["ChartsModule"]]
        });
      })();
      /***/

    },

    /***/
    "z9fm":
    /*!**********************************************!*\
      !*** ./dist/ezy-chart/fesm2015/ezy-chart.js ***!
      \**********************************************/

    /*! exports provided: CHART_DEFAULT_COLORS, ChartComponent, ChartsModule, EChartComponent */

    /***/
    function z9fm(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CHART_DEFAULT_COLORS", function () {
        return CHART_DEFAULT_COLORS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChartComponent", function () {
        return ChartComponent;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChartsModule", function () {
        return ChartsModule;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EChartComponent", function () {
        return EChartComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /**
       * @internal
       */


      var DEFAULT_COLORS = [[236, 64, 122], [92, 107, 192], [38, 198, 218], [255, 238, 88], [156, 204, 101], [0, 102, 204], [102, 153, 204], [102, 0, 204], [204, 102, 204], [204, 255, 204], [255, 0, 102], [255, 99, 132], [54, 162, 235], [255, 206, 86], [151, 187, 205], [220, 220, 220], [247, 70, 74], [70, 191, 189], [253, 180, 92], [148, 159, 177], [77, 83, 96], [230, 25, 75], [60, 180, 75], [255, 225, 25], [0, 130, 200], [245, 130, 48], [145, 30, 180], [70, 240, 240], [240, 50, 230], [210, 245, 60], [250, 190, 190], [0, 128, 128], [230, 190, 255], [170, 110, 40], [255, 250, 200], [128, 0, 0], [170, 255, 195], [128, 128, 0], [255, 215, 180], [0, 0, 128], [128, 128, 128]];
      /**
       * @internal
       */

      function replaceDefaultColors(colors) {
        (colors || []).forEach(function (a, i) {
          return DEFAULT_COLORS[i] = a;
        });
      }
      /**
       * @internal
       */


      function generateColors(definedColors, totalNum) {
        var defaultIdx = 0;
        var colors = [];

        if (definedColors.length < totalNum) {
          definedColors = [].concat(_toConsumableArray(definedColors), _toConsumableArray(new Array(totalNum - definedColors.length)));
        }

        definedColors.forEach(function (val) {
          var col = parseColor(val);

          if (!col) {
            col = DEFAULT_COLORS[defaultIdx++] || getRandomColor();
          }

          colors.push(col);
        });
        return colors;
      }
      /**
       * @internal
       */


      function parseColor(input) {
        if (!input) {
          return undefined;
        }

        var m = input.match(/^#([0-9a-f]{6})$/i);

        if (m) {
          return [parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16)];
        } else {
          m = input.match(/^#([0-9a-f]{3})$/i);

          if (m) {
            return [parseInt(m[1].charAt(0), 16) * 0x11, parseInt(m[1].charAt(1), 16) * 0x11, parseInt(m[1].charAt(2), 16) * 0x11];
          } else {
            m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);

            if (m) {
              return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
            } else {
              console.error('Color ' + input + ' could not be parsed.');
              return undefined;
            }
          }
        }
      }
      /**
       * @internal
       */


      function generateColorsAsStrings(definedColors, totalNum) {
        return generateColors(definedColors, totalNum).map(function (c) {
          return "rgba(".concat(c[0], ", ").concat(c[1], ", ").concat(c[2], ", 0.8)");
        });
      }
      /**
       * @internal
       */


      function rgba(colour, alpha) {
        return 'rgba(' + colour.concat(alpha).join(',') + ')';
      }
      /**
       * @internal
       */


      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      /**
       * @internal
       */


      function getRandomColor() {
        return [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
      }
      /**
       * @internal
       */


      function formatChartColorsForSeries(colors, type) {
        return colors.map(function (color) {
          return {
            hoverBackgroundColor: rgba(color, 0.6),
            backgroundColor: rgba(color, 1),
            borderColor: type === 'line' ? rgba(color, 0.6) : 'rgba(255, 255, 255, 0.3)',
            pointBackgroundColor: rgba(color, 0.6),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: rgba(color, 1),
            pointHoverBorderColor: rgba(color, 0.8)
          };
        });
      }
      /**
       * @internal
       */


      function generateColorsBySeries(definedColors, totalNum, type) {
        return formatChartColorsForSeries(generateColors(definedColors || [], totalNum), type);
      }
      /**
       * @internal
       */


      function formatChartColorsForData(colors, type) {
        return {
          hoverBackgroundColor: colors.map(function (color) {
            return rgba(color, 0.6);
          }),
          backgroundColor: colors.map(function (color) {
            return rgba(color, 1);
          }),
          borderColor: colors.map(function (color) {
            return type === 'line' ? rgba(color, 0.6) : 'rgba(255, 255, 255, 0.3)';
          }),
          pointBackgroundColor: colors.map(function (color) {
            return rgba(color, 1);
          }),
          pointBorderColor: colors.map(function (color) {
            return '#fff';
          }),
          pointHoverBackgroundColor: colors.map(function (color) {
            return rgba(color, 1);
          }),
          pointHoverBorderColor: colors.map(function (color) {
            return rgba(color, 0.8);
          })
        };
      }
      /**
       * @internal
       */


      function generateColorsByDataPoints(definedColors, totalNum, type) {
        return formatChartColorsForData(generateColors(definedColors || [], totalNum), type);
      }
      /**
       * @internal
       */


      function cloneDeep(item) {
        if (!item) {
          return item;
        } // null, undefined values check


        var types = [Number, String, Boolean];
        var result; // normalizing primitives if someone did new String('aaa'), or new Number('444');

        types.forEach(function (type) {
          if (item instanceof type) {
            result = type(item);
          }
        });

        if (typeof result === 'undefined') {
          if (Object.prototype.toString.call(item) === '[object Array]') {
            result = [];
            item.forEach(function (child, index, array) {
              result[index] = cloneDeep(child);
            });
          } else if (typeof item === 'object') {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode === 'function') {
              result = item.cloneNode(true);
            } else if (!item.prototype) {
              // check that this is a literal
              if (item instanceof Date) {
                result = new Date(item);
              } else {
                // it is an object literal
                result = {}; // tslint:disable-next-line: forin

                for (var i in item) {
                  result[i] = cloneDeep(item[i]);
                }
              }
            } else {
              // depending what you would like here,
              // just keep the reference, or create new object
              if (false) {} else {
                result = item;
              }
            }
          } else {
            result = item;
          }
        }

        return result;
      }
      /**
       * @internal
       */


      function isEqual() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var i;
        var l;
        var leftChain;
        var rightChain;

        function compare2Objects(x, y) {
          var p; // remember that NaN === NaN returns false
          // and isNaN(undefined) returns true

          if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
          } // Compare primitives and functions.
          // Check if both arguments link to the same object.
          // Especially useful on the step where we compare prototypes


          if (x === y) {
            return true;
          } // Works in case when functions are created in constructor.
          // Comparing dates is a common scenario. Another built-ins?
          // We can even handle functions passed across iframes


          if (typeof x === 'function' && typeof y === 'function' || x instanceof Date && y instanceof Date || x instanceof RegExp && y instanceof RegExp || x instanceof String && y instanceof String || x instanceof Number && y instanceof Number) {
            return x.toString() === y.toString();
          } // At last checking prototypes as good as we can


          if (!(x instanceof Object && y instanceof Object)) {
            return false;
          }

          if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
          }

          if (x.constructor !== y.constructor) {
            return false;
          }

          if (x.prototype !== y.prototype) {
            return false;
          } // Check for infinitive linking loops


          if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
          } // Quick checking of one object being a subset of another.
          // todo: cache the structure of arguments[0] for performance


          for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
            } else if (typeof y[p] !== typeof x[p]) {
              return false;
            }
          } // tslint:disable-next-line: forin


          for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
              return false;
            } else if (typeof y[p] !== typeof x[p]) {
              return false;
            }

            switch (typeof x[p]) {
              case 'object':
              case 'function':
                leftChain.push(x);
                rightChain.push(y);

                if (!compare2Objects(x[p], y[p])) {
                  return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

              default:
                if (x[p] !== y[p]) {
                  return false;
                }

                break;
            }
          }

          return true;
        }

        if (args.length < 1) {
          return true; // Die silently? Don't know how to handle such case, please help...
        }

        for (i = 1, l = args.length; i < l; i++) {
          leftChain = []; // Todo: this can be cached

          rightChain = [];

          if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
          }
        }

        return true;
      }
      /**
       * @internal
       *
       * @param n number to format
       * @param digitsInfo digits info
       * @param lessThanHint inaccuracy indicator
       * @param formatter the formatter
       * @returns formatted string
       */


      function formatNumber(n, digitsInfo, lessThanHint, formatter, isPercentPipe) {
        if (lessThanHint && digitsInfo) {
          var accuracy = 1 / Math.pow(10, (isPercentPipe ? 2 : 0) + Number(digitsInfo.match(/\.[0-9]+\-([0-9]+)/)[1]));

          if (n < accuracy) {
            return lessThanHint + formatter(accuracy);
          } else if (isPercentPipe) {
            var h = formatter(1);
            var s = formatter(n);

            if (n < 1 && h === s) {
              return lessThanHint + h;
            } else {
              return s;
            }
          }
        }

        return formatter(n);
      }
      /**
       * @internal
       */


      function formatPercentage(p, digitsInfo, lessThanHint) {
        var pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["PercentPipe"](moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale());
        return formatNumber(p, digitsInfo, lessThanHint, function (n) {
          return pipe.transform(n, digitsInfo);
        }, true);
      }
      /**
       * @internal
       */


      function formatScale(val, currency) {
        var n = Number(val);

        if (n === 0) {
          return '0';
        }

        var base = '';

        if (n >= 1000) {
          n = n / 1000;
          base = 'K';
        }

        if (n >= 1000) {
          n = n / 1000;
          base = 'M';
        }

        return (formatMoney(n, currency, undefined) || '').replace(/\.0+?$/, '') + base;
      }
      /**
       * @internal
       */


      function formatMoney(val, currency, digitInfo, lessThanHint) {
        if (val && currency) {
          var pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["CurrencyPipe"](moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale());
          return formatNumber(val, digitInfo, lessThanHint, function (n) {
            return pipe.transform(n, currency, 'symbol-narrow', digitInfo);
          });
        }
      }
      /**
       * @internal
       */


      function formatDecimal(p, digitsInfo, lessThanHint) {
        var pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"](moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale());
        return formatNumber(p, digitsInfo, lessThanHint, function (n) {
          return pipe.transform(n, digitsInfo);
        });
      } // tslint:disable-next-line:directive-class-suffix


      var BaseChart = /*#__PURE__*/function () {
        function BaseChart(_zone) {
          var _this4 = this;

          _classCallCheck(this, BaseChart);

          this._zone = _zone;
          this._params = {};
          this._prevParams = {};
          this._wndEvSubs = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(window, 'resize').subscribe(function () {
            _this4._resized = true;

            _this4._doCheck(500);
          });
        }
        /**
         * An array of strings, corresponding to Chart.ChartConfiguration.data.labels
         * @property
         */


        _createClass(BaseChart, [{
          key: "isParamChanged",
          value: function isParamChanged(property) {
            return !isEqual(this._params[property], this._prevParams[property]);
          }
        }, {
          key: "resetParamsChangeState",
          value: function resetParamsChangeState() {
            this._prevParams = cloneDeep(this._params);
          }
        }, {
          key: "ngDoCheck",
          value: function ngDoCheck() {
            if (!this._resized) {
              this._doCheck(50);
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this._wndEvSubs.unsubscribe();

            this._onDestroy();
          }
        }, {
          key: "_doCheck",
          value: function _doCheck(deferred) {
            var _this5 = this;

            if (this._debounceTimer) {
              clearTimeout(this._debounceTimer);
              this._debounceTimer = null;
            }

            this._zone.runOutsideAngular(function () {
              _this5._debounceTimer = setTimeout(function () {
                _this5._checkUpdate(_this5._resized);

                _this5._resized = false;
              }, deferred);
            });
          }
        }, {
          key: "labels",
          set: function set(l) {
            this._params.labels = l;
          },
          get: function get() {
            return this._params.labels;
          }
          /**
           * The chart type, corresponding to Chart.ChartConfiguration.type
           * @default 'bar'
           * @property
           */

        }, {
          key: "type",
          set: function set(t) {
            this._params.type = t;
          },
          get: function get() {
            return this._params.type;
          }
          /**
           * An array of Chart.ChartDataSets, corresponding to Chart.ChartConfiguration.data.datasets
           * @property
           */

        }, {
          key: "datasets",
          set: function set(ds) {
            this._params.datasets = ds;
          },
          get: function get() {
            return this._params.datasets;
          }
          /**
           * An array of strings in hex, rgb, or rgba format, to define the base colors of datasets, or the data points of each dataset. If this
           * property is absent, or the colors defined are less than the number of datasets (or the data points of each dataset), the missing
           * colors will be assigned from the default palette
           * @property
           */

        }, {
          key: "colors",
          set: function set(c) {
            this._params.colors = c;
          },
          get: function get() {
            return this._params.colors;
          }
          /**
           * Specify what the colors (either defined or generated) are for.
           *  * 'series' - each color corresponds to a dataset
           *  * 'data' - each color corresponds to a data point of each dataset
           *  * 'auto' - use 'series' for chart types 'bar', 'horizontalBar' and 'line'; and use 'data' for other chart types
           *  * 'none' - turn off the color generator. Use this value if colors are specified via #options
           * @default 'auto'
           * @property
           */

        }, {
          key: "colorsFor",
          set: function set(cf) {
            this._params.colorsFor = cf;
          },
          get: function get() {
            return this._params.colorsFor;
          }
          /**
           * The aspect ratio of the chart
           * @default 2
           * @property
           */

        }, {
          key: "ratio",
          set: function set(r) {
            this._params.ratio = r;
          },
          get: function get() {
            return this._params.ratio;
          }
          /**
           * Specify how to display the legend
           *  * if the value is a boolean, it corresponds to Chart.ChartConfiguration.options.legend.display
           *  * if the value is 'auto', the legend will be arranged automatically. For example, the legend will be hidden if the chart area is
           *    too small
           *  * if the value is of type Chart.ChartLegendOptions, it corresponds to Chart.ChartConfiguration.options.legend.position
           *  * if the value is of type Chart.ChartLegendOptions, it corresponds to Chart.ChartConfiguration.options.legend
           * @default 'auto'
           * @property
           */

        }, {
          key: "legend",
          set: function set(l) {
            this._params.legend = l;
          },
          get: function get() {
            return this._params.legend;
          }
          /**
           * An ISO 4217 currency code. If specified, it will be used to format the scales of the main axis, as well as the values in the tooltips.
           * @property
           */

        }, {
          key: "currency",
          set: function set(curr) {
            this._params.currency = curr;
          },
          get: function get() {
            return this._params.currency;
          }
          /**
           * The digit info of the output template, used to format numbers in scales. Please refer to https://angular.io/api/common/DecimalPipe
           * for its usage.
           * @property
           */

        }, {
          key: "digits",
          set: function set(d) {
            this._params.digits = d;
          },
          get: function get() {
            return this._params.digits;
          }
          /**
           * The digit info of the output template, used to format numbers in scales. Please refer to https://angular.io/api/common/DecimalPipe
           * for its usage.
           * @property
           */

        }, {
          key: "percentDigits",
          set: function set(d) {
            this._params.percentDigits = d;
          },
          get: function get() {
            return this._params.percentDigits;
          }
          /**
           * Corresponds to Chart.ChartConfiguration.options. This overrides any other settings.
           * @property
           */

        }, {
          key: "options",
          set: function set(opt) {
            this._params.options = opt;
          },
          get: function get() {
            return this._params.options;
          }
          /**
           * A moment.js format string. When specified, the X axis will be configured with time scales, and this value will be used to format the
           * tooltips.
           * @property
           */

        }, {
          key: "timeFormat",
          set: function set(tf) {
            this._params.timeFormat = tf;
          },
          get: function get() {
            return this._params.timeFormat;
          }
          /**
           * Specify whether to show the overall percentage values in the popover tooltips.
           * @property
           */

        }, {
          key: "percentage",
          set: function set(p) {
            this._params.percentage = p;
          },
          get: function get() {
            return this._params.percentage;
          }
          /**
           * Shows an approximate indicator when the decimal value is less than the minimal value that can be
           * accurately represented based on the digits info.
           *
           * @example 'less than ' => 'less than xx%'
           * @example '<' => '<xx%'
           *
           * @property
           */

        }, {
          key: "lessThanHint",
          set: function set(p) {
            this._params.lessThanHint = p;
          },
          get: function get() {
            return this._params.lessThanHint;
          }
        }, {
          key: "paramsChanged",
          get: function get() {
            return !isEqual(this._params, this._prevParams);
          }
        }]);

        return BaseChart;
      }();

      BaseChart.ɵfac = function BaseChart_Factory(t) {
        return new (t || BaseChart)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      };

      BaseChart.ɵdir = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"])({
        type: BaseChart,
        inputs: {
          labels: "labels",
          type: "type",
          datasets: "datasets",
          colors: "colors",
          colorsFor: "colorsFor",
          ratio: "ratio",
          legend: "legend",
          currency: "currency",
          digits: "digits",
          percentDigits: "percentDigits",
          options: "options",
          timeFormat: "timeFormat",
          percentage: "percentage",
          lessThanHint: "lessThanHint"
        }
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(BaseChart, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"]
        }], function () {
          return [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
          }];
        }, {
          labels: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          type: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          datasets: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          colors: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          colorsFor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          ratio: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          legend: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          currency: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          digits: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          percentDigits: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          timeFormat: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          percentage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          lessThanHint: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }]
        });
      })();

      var _c0 = ["chartContainer"];
      /**
       * @internal
       */

      var MULTI_SERIES_BY_DEFAULT = ['line', 'bar', 'horizontalBar', 'radar'];
      /**
       * @internal
       */

      function getTooltipLabelCallBack(currency, percentage, digitInfo, percentDigitInfo, lessThanHint, type) {
        return function (tooltipItem, data) {
          var labels = [];
          var ds = data.datasets;
          var label = ds.length > 1 ? ds[tooltipItem.datasetIndex || 0].label || '' : '';

          if (label && type === 'both') {
            labels.push(label);
          }

          if (type === 'label') {
            return label;
          }

          var dsData = ds[tooltipItem.datasetIndex || 0].data || [];
          var point = dsData[tooltipItem.index || 0];
          var value = typeof point === 'number' ? point : Array.isArray(point) ? point[0] : point.y;

          if (percentage !== 'only') {
            if (currency) {
              labels.push(formatMoney(value, currency, digitInfo, lessThanHint));
            } else if (digitInfo && typeof value === 'number') {
              labels.push(formatDecimal(value, digitInfo, lessThanHint));
            } else {
              labels.push(tooltipItem.yLabel || value);
            }
          }

          if (percentage) {
            var perc = typeof value === 'number' ? value : 0;
            var total = dsData.reduce(function (p, d) {
              return p + (typeof d === 'number' ? d : d.y);
            }, 0);
            labels.push(formatPercentage(total ? perc / total : 0, percentDigitInfo || digitInfo || '1.0-2', lessThanHint));
          }

          return labels.join(' : ');
        };
      }

      function splitWords(text, maxLength) {
        var words = [];
        var word = '';
        text.split(' ').forEach(function (w) {
          word = [word, w].join(' ');

          if (word.length > maxLength) {
            words.push(word);
            word = '';
          }
        });

        if (word) {
          words.push(word);
        }

        return words;
      }
      /**
       * @internal
       */


      function getTooltipTitleCallBack(horizontal) {
        return function (tooltipItems, data) {
          // Pick first xLabel for now
          var title = '';
          var labels = data.labels || [];
          var labelCount = labels.length;

          if (tooltipItems.length > 0) {
            var item = tooltipItems[0];

            if (item.xLabel || horizontal && item.yLabel) {
              title = (horizontal ? item.yLabel : item.xLabel) || '';
            } else if (labelCount > 0 && item.index || 0 < labelCount) {
              title = labels[item.index || 0];
            }
          }

          return splitWords(title, 15);
        };
      }

      if (typeof Chart !== 'undefined') {
        Chart.pluginService.register({
          afterEvent: function afterEvent(chartInstance, chartEvent) {
            var legend = chartInstance.legend;
            var canvas = chartInstance.canvas;
            var x = chartEvent.x;
            var y = chartEvent.y;
            var cursorStyle = 'default';

            if (x <= legend.right && x >= legend.left && y <= legend.bottom && y >= legend.top) {
              var _iterator = _createForOfIteratorHelper(legend.legendHitBoxes),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var box = _step.value;

                  if (x <= box.left + box.width && x >= box.left && y <= box.top + box.height && y >= box.top) {
                    cursorStyle = 'pointer';
                    break;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            if (canvas) {
              canvas.style.cursor = cursorStyle;
            }
          }
        });
      }

      var ChartComponent = /*#__PURE__*/function (_BaseChart) {
        _inherits(ChartComponent, _BaseChart);

        var _super = _createSuper(ChartComponent);

        function ChartComponent(zone) {
          var _this6;

          _classCallCheck(this, ChartComponent);

          _this6 = _super.call(this, zone);
          _this6._config = {};
          _this6._prevConfig = {};
          return _this6;
        }

        _createClass(ChartComponent, [{
          key: "_onDestroy",
          value: function _onDestroy() {
            if (this._chart) {
              this._chart.destroy();
            }
          }
        }, {
          key: "_checkUpdate",
          value: function _checkUpdate(resized) {
            var dataOrParamsChanged = false;

            if (this.paramsChanged) {
              this._applyConfig();

              dataOrParamsChanged = true;
            }

            dataOrParamsChanged = dataOrParamsChanged || JSON.stringify(this._config.data) !== JSON.stringify(this._prevConfig.data);

            var configChanged = JSON.stringify(this._config.options) !== JSON.stringify(this._prevConfig.options) || this._config.type !== this._prevConfig.type;

            configChanged = configChanged || this.isParamChanged('colorsFor');
            configChanged = configChanged || this.isParamChanged('colors');
            configChanged = configChanged || this.isParamChanged('percentage');
            configChanged = configChanged || this.isParamChanged('currency');
            configChanged = configChanged || this.isParamChanged('timeFormat');

            if (dataOrParamsChanged || configChanged) {
              this._refresh(configChanged);

              this._checkSize();
            } else if (resized) {
              this._checkSize();
            }
          }
        }, {
          key: "_refresh",
          value: function _refresh(configChanged) {
            this._prevConfig = cloneDeep(this._config);
            this.resetParamsChangeState();

            if (configChanged || !this._chart) {
              if (this._chart) {
                this._chart.destroy();
              }

              var cfg = cloneDeep(this._prevConfig);

              this._applyColors(this.colors || [], this.colorsFor || 'auto', (cfg.data || {}).datasets || []);

              this._createNewChart(cfg);
            } else {
              this._chart.config.data = cloneDeep(this._config.data || {});

              this._applyColors(this.colors || [], this.colorsFor || 'auto', this._chart.config.data.datasets || []);

              this._chart.update();
            }
          }
        }, {
          key: "_createNewChart",
          value: function _createNewChart(cfg) {
            var _this7 = this;

            this._zone.runOutsideAngular(function () {
              var container = _this7._chartContainer.nativeElement;
              var nodes = container.getElementsByTagName('canvas');

              if (nodes.length) {
                container.removeChild(nodes.item(0));
              }

              var canvas = document.createElement('canvas');
              container.appendChild(canvas);
              cfg.plugins = _this7.plugins;
              _this7._chart = new Chart(canvas, cfg);
            });
          }
        }, {
          key: "_checkSize",
          value: function _checkSize() {
            if (!this._chart) {
              return;
            }

            var cfg = this._chart.config;
            var width = this._chart.chartArea.right - this._chart.chartArea.left;
            var height = this._chart.chartArea.bottom - this._chart.chartArea.top;
            var legendOpt = (cfg.options || {}).legend || {};

            if ((this.legend || 'auto') === 'auto') {
              if ((width < 140 || height < 140) && legendOpt.display) {
                this._chart.destroy();

                legendOpt.display = false;

                this._createNewChart(cfg);
              } else if (width > 150 && height > 150 && !legendOpt.display && this._config.options.legend && this._config.options.legend.display) {
                this._refresh(true);
              }
            }
          }
        }, {
          key: "_applyConfig",
          value: function _applyConfig() {
            var _this8 = this;

            var multiType = MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0;
            this._config.type = this.type || 'bar';
            this._config.options = this._config.options || {};
            this._config.options.legend = this._config.options.legend || {};
            this._config.data = this._config.data || {};
            var ds = this._config.data.datasets = cloneDeep(this.datasets || []);

            if (!ds.some(function (d) {
              return d.label ? true : false;
            })) {
              if (multiType) {
                this._config.options.legend.display = false;
              }
            }

            var labels = this._config.data.labels = cloneDeep(this.labels || []);
            (this._config.options || {}).aspectRatio = this.ratio || 2;
            var legend = this.legend === false ? false : this.legend || 'auto';

            if (typeof legend === 'string' && ['top', 'right', 'bottom', 'left'].indexOf(legend) >= 0) {
              this._config.options.legend.position = legend;
            } else if (typeof legend === 'boolean') {
              this._config.options.legend.display = legend;
            } else if (typeof legend === 'object') {
              this._config.options.legend = cloneDeep(legend);
            } else if (legend === 'auto') {
              var multiPoints = ds.every(function (d) {
                return (d.data || []).length > 1;
              });
              this._config.options.legend.display = multiType && ds.length > 1 || multiPoints && !multiType;
              this._config.options.legend.position = multiType && this.type !== 'radar' ? 'top' : 'right';
            }

            this._config.options.scales = {};

            if (this.currency) {
              var curr = this.currency;

              if (multiType) {
                var axes = {
                  ticks: {
                    callback: function callback(val) {
                      return formatScale(val, curr);
                    }
                  }
                };

                if (ds.every(function (d) {
                  return _this8._isYAxisAllNumbers(Array.isArray(d.data) ? d.data : typeof d.data === 'number' ? [d.data] : []);
                })) {
                  if (this.type !== 'horizontalBar') {
                    this._config.options.scales.yAxes = [axes];
                  } else {
                    this._config.options.scales.xAxes = [axes];
                  }
                }
              }
            }

            var timeScaleConfigured = false;
            this._config.options.tooltips = this._config.options.tooltips || {};

            if (this.type === 'line') {
              var isTimeScale = ds.every(function (d) {
                return (d.data || []).every(function (item) {
                  return item.x ? moment__WEBPACK_IMPORTED_MODULE_2___default()(item.x).isValid() : false;
                });
              });

              if (isTimeScale) {
                this._config.options.scales = this._config.options.scales || {};
                var minTime;
                ds.reduce(function (p, c) {
                  return [].concat(_toConsumableArray(p), _toConsumableArray(c.data));
                }, []).map(function (p) {
                  return moment__WEBPACK_IMPORTED_MODULE_2___default()(p.x);
                }).forEach(function (m) {
                  if (!minTime || minTime.isAfter(m)) {
                    minTime = m;
                  }
                });
                ds.every(function (d) {
                  return (d.data || []).every(function (item) {
                    return item.x ? moment__WEBPACK_IMPORTED_MODULE_2___default()(item.x).isValid() : false;
                  });
                });
                this._config.options.scales.xAxes = [{
                  type: 'time',
                  time: {
                    tooltipFormat: this.timeFormat || 'L',
                    min: minTime ? minTime.toISOString() : undefined
                  }
                }];
                timeScaleConfigured = true;
              }

              this._config.options.tooltips.mode = 'index';
              this._config.options.tooltips.intersect = false;
            } else {
              this._config.options.tooltips.mode = 'nearest';
              this._config.options.tooltips.intersect = true;
            }

            if (ds.length === 0 || (ds[0].data || []).length === 0) {} else if ((ds[0].data || []).length > labels.length && !timeScaleConfigured) {
              console.warn('ezy-chart: wrong number of labels. ');
            }

            if (!this._config.options.scales || Object.keys(this._config.options.scales).length === 0) {
              var opt = {};
              Object.keys(this._config.options || {}).filter(function (k) {
                return k !== 'scales';
              }).forEach(function (k) {
                return opt[k] = _this8._config.options[k];
              });
              this._config.options = opt;
            }

            var splitLabel = (this.type === 'pie' || this.type === 'doughnut') && ds.length > 1;
            this._config.options.tooltips.callbacks = this._config.options.tooltips.callbacks || {};
            this._config.options.tooltips.callbacks.label = getTooltipLabelCallBack(this.currency, this.percentage || false, this.digits, this.percentDigits, this.lessThanHint, splitLabel ? 'label' : 'both');

            if (splitLabel) {
              this._config.options.tooltips.callbacks.afterLabel = getTooltipLabelCallBack(this.currency, this.percentage || false, this.digits, this.percentDigits, this.lessThanHint, 'afterLabel');
            } else {
              this._config.options.tooltips.callbacks.afterLabel = function () {
                return '';
              };
            }

            this._config.options.tooltips.callbacks.title = getTooltipTitleCallBack(this.type === 'horizontalBar');

            if (this.options) {
              Object.keys(this.options).forEach(function (k) {
                if (_this8.options[k] || _this8.options[k] === 0) {
                  _this8._config.options[k] = _this8.options[k];
                }
              });
            }
          }
        }, {
          key: "_isYAxisAllNumbers",
          value: function _isYAxisAllNumbers(data) {
            return data.every(function (d) {
              return !d || typeof d === 'number' || !Array.isArray(d) && typeof d.y === 'number';
            });
          }
        }, {
          key: "_applyColors",
          value: function _applyColors(colors, colorsFor, datasets) {
            var _this9 = this;

            if (colorsFor === 'auto') {
              if (MULTI_SERIES_BY_DEFAULT.indexOf(this.type || 'bar') >= 0) {
                colorsFor = 'series';
              } else {
                colorsFor = 'data';
              }
            }

            if (colorsFor === 'series') {
              var colorGroups = generateColorsBySeries(colors, datasets.length, this.type || 'bar');
              datasets.forEach(function (ds, i) {
                Object.keys(colorGroups[i]).forEach(function (k) {
                  return ds[k] = colorGroups[i][k];
                });
              });
            } else if (colorsFor === 'data') {
              var _iterator2 = _createForOfIteratorHelper(datasets),
                  _step2;

              try {
                var _loop = function _loop() {
                  var ds = _step2.value;
                  var colorGroup = generateColorsByDataPoints(colors, (ds.data || []).length, _this9.type || 'bar');
                  Object.keys(colorGroup).forEach(function (k) {
                    return ds[k] = colorGroup[k];
                  });
                };

                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _loop();
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }]);

        return ChartComponent;
      }(BaseChart);

      ChartComponent.ɵfac = function ChartComponent_Factory(t) {
        return new (t || ChartComponent)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      };

      ChartComponent.ɵcmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"])({
        type: ChartComponent,
        selectors: [["ezy-chart"]],
        viewQuery: function ChartComponent_Query(rf, ctx) {
          if (rf & 1) {
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"])(_c0, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
          }

          if (rf & 2) {
            var _t;

            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx._chartContainer = _t.first);
          }
        },
        inputs: {
          plugins: "plugins"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
        decls: 2,
        vars: 0,
        consts: [["chartContainer", ""]],
        template: function ChartComponent_Template(rf, ctx) {
          if (rf & 1) {
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "div", null, 0);
          }
        },
        encapsulation: 2,
        changeDetection: 0
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ChartComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'ezy-chart',
            template: " <div #chartContainer></div> ",
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
          }]
        }], function () {
          return [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
          }];
        }, {
          plugins: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
          }],
          _chartContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['chartContainer', {
              read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
              "static": true
            }]
          }]
        });
      })();

      var _c0$1 = ["chartContainer"];

      var EChartComponent = /*#__PURE__*/function (_BaseChart2) {
        _inherits(EChartComponent, _BaseChart2);

        var _super2 = _createSuper(EChartComponent);

        function EChartComponent(zone) {
          var _this10;

          _classCallCheck(this, EChartComponent);

          _this10 = _super2.call(this, zone);
          _this10._echartsOptions = {};
          _this10._typeMap = {
            bar: 'bar',
            horizontalBar: 'bar',
            doughnut: 'pie',
            pie: 'pie',
            line: 'line'
          };
          return _this10;
        }

        _createClass(EChartComponent, [{
          key: "_checkUpdate",
          value: function _checkUpdate(resized) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (this._chartContainer && !this._chart) {
                        this._createChart();
                      } else if (resized && !this.paramsChanged) {
                        this._recalculateSize();
                      }

                      if (this.paramsChanged) {
                        this._applyOptions();

                        this.resetParamsChangeState();

                        this._recalculateSize();
                      }

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "_onDestroy",
          value: function _onDestroy() {
            if (this._chart && !this._chart.isDisposed()) {
              this._chart.dispose();
            }
          }
        }, {
          key: "_recalculateSize",
          value: function _recalculateSize() {
            if (this._chartContainer) {
              var div = this._chartContainer.nativeElement;
              var height = Math.max(div.clientWidth / (this.ratio || 2), 240);
              div.style.height = "".concat(height, "px");

              if (this._chart) {
                this._chart.resize();

                if (this._echartsOptions.legend) {
                  var opt = this._chart.getOption();

                  if (div.clientWidth <= 240 || div.clientHeight <= 240) {
                    opt.legend = undefined;
                  } else {
                    opt.legend = cloneDeep(this._echartsOptions.legend);
                  }

                  this._chart.setOption(opt, true);
                }
              }
            }
          }
        }, {
          key: "_createChart",
          value: function _createChart() {
            this._chart = echarts.init(this._chartContainer.nativeElement);
          }
        }, {
          key: "_applyOptions",
          value: function _applyOptions() {
            var _this11 = this;

            var ds = this.datasets || [];
            this._echartsOptions = {};
            var mainType = this.type || 'bar';
            var series = ds.map(function (v) {
              return {
                name: v.name || typeof v.label === 'string' ? v.label : '',
                type: _this11._typeMap[v.type || mainType] || v.type || mainType,
                data: (v.data || []).map(function (d) {
                  return _this11._mapDataItem(d, _this11.timeFormat);
                })
              };
            });
            var isTime = series.some(function (s) {
              return s.data.some(function (d) {
                return d.name && moment__WEBPACK_IMPORTED_MODULE_2___default()(d.name).isValid();
              });
            });
            var labels = this.labels || [];
            var timeAxis = [{
              type: 'time'
            }];
            var catAxis = [{
              data: labels,
              type: 'category'
            }];
            var valAxis = [{
              type: 'value'
            }];
            var tooltip = {
              axisPointer: {
                type: 'shadow'
              }
            };
            tooltip.formatter = this._formatTooltip.bind(this, this.currency, this.percentage, this.digits, this.percentDigits, this.lessThanHint);

            if (this.currency) {
              valAxis[0].axisLabel = {
                formatter: function formatter(value) {
                  return formatScale(value, _this11.currency);
                }
              };
            }

            this._echartsOptions = {
              series: series,
              tooltip: tooltip
            };

            if (mainType === 'horizontalBar') {
              this._echartsOptions.yAxis = catAxis;
              this._echartsOptions.xAxis = valAxis;
              this._echartsOptions.tooltip['trigger'] = 'axis';
            } else if (mainType === 'line' || mainType === 'bar') {
              this._echartsOptions.xAxis = isTime ? timeAxis : catAxis;
              this._echartsOptions.yAxis = valAxis;
              this._echartsOptions.tooltip['trigger'] = 'axis';
            } else if (this._typeMap[mainType] === 'pie') {
              this._definePieShape(series, labels, mainType === 'doughnut');
            }

            if (this.legend !== false) {
              this._echartsOptions.legend = this._generateLegendOptions(series.length > 1, this._typeMap[mainType] === 'pie');
            }

            this._defineColors(series, this._typeMap[mainType] === 'pie');

            var opt = cloneDeep(this._echartsOptions || {});
            Object.keys(this.options || {}).forEach(function (k) {
              if (_this11.options[k] || _this11.options[k] === 0) {
                opt[k] = _this11.options[k];
              }
            });

            this._chart.setOption(opt, true);
          }
        }, {
          key: "_mapDataItem",
          value: function _mapDataItem(item, timeFormat) {
            if (typeof item === 'number') {
              return {
                value: item
              };
            }

            if (!item) {
              return undefined;
            }

            if (item.x && moment__WEBPACK_IMPORTED_MODULE_2___default()(item.x).isValid() && typeof item.y === 'number') {
              var m = moment__WEBPACK_IMPORTED_MODULE_2___default()(item.x);
              return {
                name: moment__WEBPACK_IMPORTED_MODULE_2___default()(item.x).format(timeFormat || 'L'),
                value: ["".concat(m.get('year'), "-").concat(m.get('month'), "-").concat(m.get('day')), item.y]
              };
            }

            return item;
          }
        }, {
          key: "_definePieShape",
          value: function _definePieShape(series, labels, makeDoughnut) {
            var r = 0;
            var step = 80;

            if (makeDoughnut) {
              r = 40;
            }

            step = (80 - r) / series.length;
            series.forEach(function (s) {
              s.data.forEach(function (d, i) {
                return d.name = labels[i];
              });
              s.radius = ["".concat(r, "%"), "".concat(r + step - 1, "%")];
              r = r + step;
              s.label = {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: makeDoughnut ? true : false,
                  textShadowColor: 'grey',
                  textShadowOffsetY: 1
                }
              };
              s['avoidLabelOverlap'] = false;
            });
          }
        }, {
          key: "_defineColors",
          value: function _defineColors(series, pieLike) {
            var _this12 = this;

            var cf = this.colorsFor || 'auto';

            if (cf === 'auto') {
              if (pieLike) {
                cf = 'data';
              } else {
                cf = 'series';
              }
            }

            if (cf === 'series') {
              var colors = generateColorsAsStrings(this.colors || [], series.length);
              series.forEach(function (s, i) {
                return s['color'] = colors[i];
              });
            } else if (cf === 'data') {
              series.forEach(function (s) {
                var colors = generateColorsAsStrings(_this12.colors || [], s.data.length);
                s.data.forEach(function (d, i) {
                  return d.itemStyle = {
                    color: colors[i]
                  };
                });
              });
            }
          }
        }, {
          key: "_formatTooltip",
          value: function _formatTooltip(currencyCode, percent, digitInfo, percentDigitInfo, lessThanHint, param) {
            var formatParam = function formatParam(p) {
              var l = "<div class=\"ezy-echart-tooltip-item\"><span class=\"ezy-echart-series-indicator\" style=\"background-color: ".concat(p.color, "\"></span>\n\t\t\t ").concat(p.seriesName, ": ");
              var percentOnly = percent === 'only' && p.percent;
              var showPercent = percent && p.percent;
              var v = Array.isArray(p.data.value) ? p.data.value[1] : p.data.value;

              if (!percentOnly) {
                if (currencyCode) {
                  l += formatMoney(v, currencyCode, digitInfo, lessThanHint);
                } else {
                  l += formatDecimal(v, digitInfo, lessThanHint);
                }
              }

              if (showPercent) {
                l += "<span> ".concat(formatPercentage(p.percent / 100, percentDigitInfo || digitInfo || '1.0-2', lessThanHint), "%</span>");
              }

              l += '</div>';
              return l;
            };

            var str = '<div style="max-width: 35vw; white-space:normal">';

            if (Array.isArray(param)) {
              str += "<strong>".concat(param[0].name, "</strong><br/>");
              str += "".concat(param.map(function (p) {
                return formatParam(p);
              }).join(''));
            } else {
              str += "<strong>".concat(param.name, "</strong><br/>");
              str += "".concat(formatParam(param));
            }

            return str + '</div>';
          }
        }, {
          key: "_generateLegendOptions",
          value: function _generateLegendOptions(multiSeries, pieLike) {
            var l = this.legend || 'auto';

            if (l === 'auto' && (multiSeries || pieLike) || typeof this.legend === 'string') {
              var legend = {};

              if (l === 'auto' && pieLike) {
                legend.x = 'left';
              }

              if (['left', 'right', 'top', 'bottom'].indexOf(l) >= 0) {
                legend.x = l;
              }

              if (legend.x === 'left' || legend.x === 'right') {
                legend.orient = 'vertical';
              }

              return legend;
            } else if (typeof this.legend === 'object') {
              return this.legend;
            }
          }
        }]);

        return EChartComponent;
      }(BaseChart);

      EChartComponent.ɵfac = function EChartComponent_Factory(t) {
        return new (t || EChartComponent)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      };

      EChartComponent.ɵcmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"])({
        type: EChartComponent,
        selectors: [["ezy-echart"]],
        viewQuery: function EChartComponent_Query(rf, ctx) {
          if (rf & 1) {
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"])(_c0$1, 3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
          }

          if (rf & 2) {
            var _t;

            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"])(_t = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"])()) && (ctx._chartContainer = _t.first);
          }
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
        decls: 2,
        vars: 0,
        consts: [["chartContainer", ""]],
        template: function EChartComponent_Template(rf, ctx) {
          if (rf & 1) {
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(0, "div", null, 0);
          }
        },
        styles: ["\n\t\t\t.ezy-echart-series-indicator {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tborder-radius: 10px;\n\t\t\t\tborder-width: 1px;\n\t\t\t\tborder-style: solid;\n\t\t\t\tborder-color: white;\n\t\t\t\twidth: 10px;\n\t\t\t\theight: 10px;\n\t\t\t}\n\t\t\t.ezy-echart-tooltip-item {\n\t\t\t\ttext-indent: -13px;\n\t\t\t\tpadding-left: 13px;\n\t\t\t}\n\t\t"],
        encapsulation: 2,
        changeDetection: 0
      });

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(EChartComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'ezy-echart',
            template: " <div #chartContainer></div> ",
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: ["\n\t\t\t.ezy-echart-series-indicator {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tborder-radius: 10px;\n\t\t\t\tborder-width: 1px;\n\t\t\t\tborder-style: solid;\n\t\t\t\tborder-color: white;\n\t\t\t\twidth: 10px;\n\t\t\t\theight: 10px;\n\t\t\t}\n\t\t\t.ezy-echart-tooltip-item {\n\t\t\t\ttext-indent: -13px;\n\t\t\t\tpadding-left: 13px;\n\t\t\t}\n\t\t"]
          }]
        }], function () {
          return [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
          }];
        }, {
          _chartContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['chartContainer', {
              read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
              "static": true
            }]
          }]
        });
      })();

      var CHART_DEFAULT_COLORS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ezy-chart-default-colours');

      var ChartsModule = function ChartsModule(defaultColors) {
        _classCallCheck(this, ChartsModule);

        if (defaultColors) {
          replaceDefaultColors(defaultColors);
        }
      };

      ChartsModule.ɵmod = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"])({
        type: ChartsModule
      });
      ChartsModule.ɵinj = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"])({
        factory: function ChartsModule_Factory(t) {
          return new (t || ChartsModule)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(CHART_DEFAULT_COLORS, 8));
        },
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"])(ChartsModule, {
          declarations: [ChartComponent, EChartComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
          exports: [ChartComponent, EChartComponent]
        });
      })();

      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(ChartsModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            declarations: [ChartComponent, EChartComponent],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
            exports: [ChartComponent, EChartComponent]
          }]
        }], function () {
          return [{
            type: undefined,
            decorators: [{
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
              type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
              args: [CHART_DEFAULT_COLORS]
            }]
          }];
        }, null);
      })();
      /*
       * Public API Surface of ezy-chart
       */

      /**
       * Generated bundle index. Do not edit.
       */

      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map