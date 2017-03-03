/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(109)
	var __weex_style__ = __webpack_require__(110)
	var __weex_script__ = __webpack_require__(111)

	__weex_define__('@weex-component/9a6cd766bec8b824c743a4e26398dab7', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/9a6cd766bec8b824c743a4e26398dab7',undefined,undefined)

/***/ },

/***/ 109:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "style": {
	    "height": function () {return this.devHeight}
	  },
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "div_titBar"
	      ],
	      "attr": {
	        "dataRole": "none"
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img_back"
	          ],
	          "attr": {
	            "src": ""
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_save"
	          ],
	          "attr": {
	            "value": "关闭"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_titBar"
	          ],
	          "attr": {
	            "value": "我的文件"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_save"
	          ],
	          "events": {
	            "click": "click_create"
	          },
	          "attr": {
	            "value": "创建共享"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_tit"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img_choice"
	          ],
	          "attr": {
	            "src": ""
	          }
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_search"
	          ],
	          "children": [
	            {
	              "type": "image",
	              "attr": {
	                "src": ""
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_center"
	              ],
	              "attr": {
	                "value": "搜索"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_content"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img_content"
	          ],
	          "attr": {
	            "src": ""
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_dialog"
	      ],
	      "shown": function () {return this.isCreated},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "div_dialog_tit"
	          ],
	          "children": [
	            {
	              "type": "image",
	              "style": {
	                "height": 32,
	                "width": 32,
	                "borderWidth": 1,
	                "margin": 20
	              },
	              "attr": {
	                "src": ""
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "value": "创建共享"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_input"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "attr": {
	                "value": "共享名称:"
	              }
	            },
	            {
	              "type": "input",
	              "style": {
	                "marginLeft": 20
	              },
	              "attr": {
	                "type": "text",
	                "autofocus": "true"
	              },
	              "events": {
	                "input": "input_name"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_finish"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "btn"
	              ],
	              "style": {
	                "borderColor": "#1E88E5"
	              },
	              "events": {
	                "click": "click_sure"
	              },
	              "attr": {
	                "value": "创建共享"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "btn"
	              ],
	              "events": {
	                "click": "click_cancel"
	              },
	              "attr": {
	                "value": "取消"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 110:
/***/ function(module, exports) {

	module.exports = {
	  "wrapper": {
	    "position": "absolute",
	    "width": 750,
	    "justifyContent": "center"
	  },
	  "div_titBar": {
	    "height": 100,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#ffffff"
	  },
	  "img_back": {
	    "height": 48,
	    "width": 48,
	    "borderWidth": 1,
	    "marginLeft": 20
	  },
	  "text_titBar": {
	    "flex": 1,
	    "textAlign": "center",
	    "fontSize": 30
	  },
	  "text_save": {
	    "fontSize": 28,
	    "marginRight": 20,
	    "marginLeft": 20,
	    "color": "#85C1E9"
	  },
	  "div_tit": {
	    "height": 70,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#ffffff",
	    "textAlign": "center"
	  },
	  "img_choice": {
	    "height": 48,
	    "width": 48,
	    "borderWidth": 1,
	    "marginLeft": 20
	  },
	  "div_search": {
	    "backgroundColor": "#ebedef",
	    "flex": 1,
	    "height": 50,
	    "borderRadius": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "marginLeft": 20,
	    "marginRight": 20
	  },
	  "txt_center": {
	    "textAlign": "center",
	    "color": "#cccccc",
	    "fontWeight": "bold",
	    "fontSize": 24
	  },
	  "div_content": {
	    "width": 750,
	    "backgroundColor": "#ebedef",
	    "borderWidth": 1,
	    "flex": 1
	  },
	  "div_dialog": {
	    "position": "absolute",
	    "width": 450,
	    "height": 200,
	    "marginLeft": 150,
	    "borderRadius": 20,
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "borderWidth": 1
	  },
	  "div_dialog_tit": {
	    "height": 60,
	    "flexDirection": "row",
	    "justifyContent": "flex-start",
	    "alignItems": "center",
	    "backgroundColor": "#ebedef",
	    "borderTopLeftRadius": 20,
	    "borderTopRightRadius": 20
	  },
	  "div_input": {
	    "flexDirection": "row",
	    "justifyContent": "flex-start",
	    "alignItems": "center",
	    "padding": 20
	  },
	  "div_finish": {
	    "flexDirection": "row",
	    "marginRight": 10,
	    "justifyContent": "flex-end",
	    "alignItems": "center"
	  },
	  "btn": {
	    "marginRight": 10,
	    "borderWidth": 1,
	    "paddingLeft": 20,
	    "paddingRight": 20,
	    "fontSize": 26,
	    "color": "#aaaaaa",
	    "borderRadius": 6
	  }
	}

/***/ },

/***/ 111:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var configModule = __weex_require__('@weex-module/configModule');
	var modal = __weex_require__('@weex-module/modal');
	module.exports = {
		data: function () {return {
			navpageHeight: 112,
			devHeight: 1160,
			isShowFunc: false,
			isCreated: false,
			list: [{ type: 1, img_src: '', img_go: '', txt: '我下载的', time: '', size: '', isSelected: false }, { type: 1, img_src: '', img_go: '', txt: '我上传的', time: '', size: '', isSelected: false }, { type: 1, img_src: '', img_go: '', txt: '我收藏的', time: '', size: '', isSelected: false }, { type: 2, img_src: '', img_go: '', txt: '产品介绍', time: '今天 10:06', size: '2.7M', isSelected: false }]
		}},
		methods: {
			click_create: function click_create(e) {
				this.isCreated = !this.isCreated;
			},
			click_cancel: function click_cancel(e) {
				this.isCreated = false;
			},
			click_sure: function click_sure(e) {
				this.isCreated = false;
			}

		},
		ready: function ready(e) {
			var self = this;
			self.getUrlParams();

			if (this.$getConfig().env.platform != "iOS") {
				this.mainExtra = "mainExtraAndroid";
				__weex_require__('@weex-module/myModule').printLog('getDevHeight');
				configModule.getDevHeight(function (params) {
					__weex_require__('@weex-module/myModule').printLog(params.height);
					var ratio = this.$getConfig().env.deviceWidth / 750;
					this.devHeight = params.height / ratio;
				}.bind(this));
			} else {
				if (this.$getConfig().env.deviceHeight < 1000) {
					this.scrollerHeight = 700;
				}
			}
		}
	};}
	/* generated by weex-loader */


/***/ }

/******/ });