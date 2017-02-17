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

	__weex_define__('@weex-component/3728c341acbf3dd26b92ffe8da9de9c3', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/3728c341acbf3dd26b92ffe8da9de9c3',undefined,undefined)

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "style": {
	    "padding": 20,
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
	            "value": "工作汇报"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_save"
	          ],
	          "attr": {
	            "value": "保存草稿"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "date"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "div_to_txt"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "text_black"
	              ],
	              "style": {
	                "flex": 1
	              },
	              "attr": {
	                "value": "周报日期"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "text_grey"
	              ],
	              "attr": {
	                "value": "02月06日-02月12日"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": function () {return ['div_rad_border', 'select_' + (this.timeType==1)]},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "txt_rad_border"
	              ],
	              "attr": {
	                "value": "上周"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": function () {return ['div_rad_border', 'select_' + (this.timeType==2)]},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "txt_rad_border"
	              ],
	              "attr": {
	                "value": "本周"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": function () {return ['div_rad_border', 'select_' + (this.timeType==3)]},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "txt_rad_border"
	              ],
	              "attr": {
	                "value": "下周"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "text",
	      "classList": [
	        "txt_tit"
	      ],
	      "attr": {
	        "value": "本周工作计划"
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
	        "value": "上周工作总结"
	      }
	    },
	    {
	      "type": "textarea",
	      "classList": [
	        "textarea"
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_grey"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img_28"
	          ],
	          "attr": {
	            "src": ""
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "txt_time"
	          ],
	          "attr": {
	            "value": "最近保存时间"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "div_txt_img"
	      ],
	      "style": {
	        "borderBottomWidth": 1,
	        "borderColor": "#ebedef"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "text_black"
	          ],
	          "attr": {
	            "value": "选择图片"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_grey"
	          ],
	          "style": {
	            "textAlign": "left"
	          },
	          "attr": {
	            "value": function () {return '已添加' + (this.selectPic) + '张'}
	          }
	        },
	        {
	          "type": "image",
	          "classList": [
	            "img_32"
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
	        "div_txt_img"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "text_black"
	          ],
	          "attr": {
	            "value": "选择附件"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_grey"
	          ],
	          "attr": {
	            "value": function () {return '已添加' + (this.selectAttach) + '个'}
	          }
	        },
	        {
	          "type": "image",
	          "classList": [
	            "img_32"
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
	        "div_bottom"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "select_color_true"
	          ],
	          "attr": {
	            "value": "提交"
	          }
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
	  "text_save": {
	    "fontSize": 28,
	    "marginRight": 20,
	    "marginLeft": 20,
	    "color": "#ffffff"
	  },
	  "type": {
	    "marginTop": 112,
	    "flexDirection": "row",
	    "height": 60,
	    "borderBottomWidth": 1,
	    "borderColor": "#ebedef",
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "select_true": {
	    "backgroundColor": "#48C9B0"
	  },
	  "select_false": {
	    "backgroundColor": "#aaaaaa"
	  },
	  "div_rad_border": {
	    "height": 50,
	    "width": 90,
	    "marginLeft": 10,
	    "borderRadius": 60,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "txt_rad_border": {
	    "textAlign": "center",
	    "fontSize": 26,
	    "color": "#fafafa"
	  },
	  "date": {
	    "height": 130,
	    "flexDirection": "row",
	    "borderBottomWidth": 20,
	    "borderColor": "#ebedef",
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "div_to_txt": {
	    "height": 100,
	    "flex": 1,
	    "flexDirection": "column",
	    "justifyContent": "center"
	  },
	  "text_black": {
	    "marginLeft": 20,
	    "fontSize": 30,
	    "justifyContent": "center"
	  },
	  "txt_tit": {
	    "padding": 20,
	    "fontSize": 26
	  },
	  "text_grey": {
	    "color": "#aaaaaa",
	    "flex": 1,
	    "fontSize": 20,
	    "fontWeight": "bold",
	    "marginLeft": 20,
	    "justifyContent": "center"
	  },
	  "div_grey": {
	    "height": 70,
	    "flexDirection": "row",
	    "borderBottomWidth": 20,
	    "borderColor": "#ebedef",
	    "alignItems": "center"
	  },
	  "img_28": {
	    "height": 28,
	    "width": 28,
	    "marginLeft": 20,
	    "backgroundColor": "#aaaaaa"
	  },
	  "txt_time": {
	    "fontSize": 12,
	    "color": "#eeeeee",
	    "marginLeft": 20
	  },
	  "textarea": {
	    "minHeight": 100
	  },
	  "div_txt_img": {
	    "height": 80,
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "img_32": {
	    "height": 32,
	    "width": 32,
	    "marginRight": 20,
	    "backgroundColor": "#aaaaaa"
	  },
	  "select_color_true": {
	    "color": "#48C9B0"
	  },
	  "select_color_false": {
	    "color": "#aaaaaa"
	  },
	  "div_bottom": {
	    "height": 60,
	    "alignItems": "center",
	    "bottom": 0,
	    "borderTopWidth": 20,
	    "borderColor": "#ebedef",
	    "paddingTop": 20
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){"use strict";

	module.exports = {
		data: function () {return {
			navpageHeight: 112,
			isSelected: true,
			devHeight: 990,
			selectPic: 0,
			selectAttach: 0,
			timeType: 2
		}}
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);