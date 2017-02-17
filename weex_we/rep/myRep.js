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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(1)
	var __weex_style__ = __webpack_require__(2)
	var __weex_script__ = __webpack_require__(3)

	__weex_define__('@weex-component/8b7c3f3fb7998c0279400200cbb5aab7', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/8b7c3f3fb7998c0279400200cbb5aab7',undefined,undefined)

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
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
	            "text_titBar"
	          ],
	          "attr": {
	            "value": "工作汇报"
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
	            "img_logo"
	          ],
	          "attr": {
	            "src": ""
	          }
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_txt"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "txt_black"
	              ],
	              "attr": {
	                "value": "我的工作日报"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_grey"
	              ],
	              "attr": {
	                "value": "12月11日"
	              }
	            }
	          ]
	        },
	        {
	          "type": "image",
	          "attr": {
	            "src": ""
	          }
	        }
	      ]
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_tit"
	      ],
	      "attr": {
	        "value": "今日工作计划"
	      }
	    },
	    {
	      "type": "textarea",
	      "classList": [
	        "textarea"
	      ],
	      "attr": {
	        "value": ""
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_tit"
	      ],
	      "attr": {
	        "value": "昨日工作总结"
	      }
	    },
	    {
	      "type": "textarea",
	      "classList": [
	        "textarea"
	      ]
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_tit"
	      ],
	      "attr": {
	        "value": "需要的协助"
	      }
	    },
	    {
	      "type": "textarea",
	      "classList": [
	        "textarea"
	      ],
	      "attr": {
	        "value": "aldjfalskdjflsdjflsadjfsl\n\t\tdkfsdkjflaskdjfksajdhfakl\n\t\tsdfhalksjdhfaklsjdhfaksdfaklsjdfhaklsdjhfklajsdhfkalsjdhfkl"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_time"
	      ],
	      "attr": {
	        "value": "提交时间"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_flex"
	      ],
	      "attr": {
	        "value": "还没有评论喔~"
	      }
	    },
	    {
	      "type": "list",
	      "shown": function () {return false}
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_act"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "div_act_item"
	          ],
	          "children": [
	            {
	              "type": "image"
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_grey"
	              ],
	              "attr": {
	                "value": "评论"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_act_item"
	          ],
	          "children": [
	            {
	              "type": "image"
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_grey"
	              ],
	              "attr": {
	                "value": "赞"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "div_act_item"
	          ],
	          "children": [
	            {
	              "type": "image"
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_grey"
	              ],
	              "attr": {
	                "value": "收藏"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  "div_titBar": {
	    "height": 100,
	    "backgroundColor": "#58D68D",
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "img_back": {
	    "height": 48,
	    "width": 48,
	    "borderWidth": 1,
	    "marginLeft": 10
	  },
	  "text_titBar": {
	    "flex": 1,
	    "textAlign": "center",
	    "fontSize": 30,
	    "paddingRight": 68,
	    "color": "#ffffff"
	  },
	  "div_tit": {
	    "height": 160,
	    "flexDirection": "row",
	    "borderTopWidth": 20,
	    "borderBottomWidth": 20,
	    "borderColor": "#ebedef",
	    "alignItems": "center"
	  },
	  "img_logo": {
	    "marginLeft": 40,
	    "height": 48,
	    "width": 48,
	    "borderWidth": 1,
	    "borderRadius": 50
	  },
	  "div_txt": {
	    "height": 100,
	    "flex": 1,
	    "marginLeft": 20,
	    "flexDirection": "column",
	    "justifyContent": "center"
	  },
	  "txt_black": {
	    "flex": 1,
	    "textAlign": "left",
	    "fontSize": 28
	  },
	  "txt_grey": {
	    "flex": 1,
	    "textAlign": "left",
	    "fontSize": 20,
	    "color": "#aaaaaa"
	  },
	  "txt_tit": {
	    "marginLeft": 40,
	    "fontSize": 26,
	    "marginTop": 20
	  },
	  "textarea": {
	    "minHeight": 60,
	    "marginLeft": 40
	  },
	  "txt_time": {
	    "fontSize": 12,
	    "color": "#aaaaaa",
	    "marginLeft": 20,
	    "padding": 20,
	    "borderBottomWidth": 1,
	    "borderColor": "#ebedef"
	  },
	  "txt_flex": {
	    "flex": 1,
	    "fontSize": 24,
	    "color": "#aaaaaa",
	    "textAlign": "center",
	    "marginTop": 40
	  },
	  "div_act": {
	    "height": 50,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "borderTopWidth": 1,
	    "borderColor": "#ebedef"
	  },
	  "div_act_item": {
	    "flex": 1,
	    "alignItems": "center",
	    "borderColor": "#ebedef",
	    "borderRightWidth": 1
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){"use strict";

	module.exports = {
		data: function () {return {
			navpageHeight: 112,
			devHeight: 960
		}}
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);