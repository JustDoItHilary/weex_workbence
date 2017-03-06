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

	__weex_define__('@weex-component/bd24a920be68ce06a0a9982972942224', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/bd24a920be68ce06a0a9982972942224',undefined,undefined)

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
	            "value": "公共文件"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "text_save"
	          ],
	          "events": {
	            "click": "click_morefunc"
	          },
	          "attr": {
	            "value": "更多"
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
	      "type": "list",
	      "classList": [
	        "list"
	      ],
	      "children": [
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": {
	            "expression": function () {return this.list},
	            "value": "item"
	          },
	          "classList": [
	            "div_cell"
	          ],
	          "style": {
	            "height": 80
	          },
	          "shown": function () {return (this.item.type==1)},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "div_select"
	              ],
	              "shown": function () {return this.isBatched},
	              "events": {
	                "click": "click_select"
	              },
	              "attr": {
	                "isselected": function () {return this.item.isSelected}
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "classList": function () {return ['img_select', 'isSelected_' + (this.item.isSelected)]},
	                  "attr": {
	                    "src": ""
	                  }
	                }
	              ]
	            },
	            {
	              "type": "image",
	              "classList": [
	                "img_logo"
	              ],
	              "attr": {
	                "src": function () {return this.item.src}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "txt_flex"
	              ],
	              "attr": {
	                "value": function () {return this.item.txt}
	              }
	            },
	            {
	              "type": "image",
	              "classList": [
	                "img_go"
	              ],
	              "attr": {
	                "src": function () {return this.item.src}
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": {
	            "expression": function () {return this.list},
	            "value": "item"
	          },
	          "classList": [
	            "div_cell"
	          ],
	          "style": {
	            "height": 120
	          },
	          "shown": function () {return (this.item.type==2)},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "div_select"
	              ],
	              "shown": function () {return this.isBatched},
	              "events": {
	                "click": "click_select"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "classList": function () {return ['img_select', 'isSelected_' + (this.item.isSelected)]},
	                  "attr": {
	                    "src": ""
	                  }
	                }
	              ]
	            },
	            {
	              "type": "image",
	              "classList": [
	                "img_logo"
	              ],
	              "attr": {
	                "src": function () {return this.item.img_src}
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
	                    "txt_flex"
	                  ],
	                  "attr": {
	                    "value": function () {return this.item.txt}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "txt_grey"
	                  ],
	                  "attr": {
	                    "value": function () {return (this.item.time) + '    ' + (this.item.size)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "image",
	              "classList": [
	                "img_go"
	              ],
	              "attr": {
	                "src": function () {return this.item.img_go}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "popup"
	      ],
	      "shown": function () {return this.isShowFunc},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "choice"
	          ],
	          "events": {
	            "click": "click_upload"
	          },
	          "attr": {
	            "value": "上传文件"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "choice"
	          ],
	          "events": {
	            "click": "click_batched"
	          },
	          "attr": {
	            "value": "批量操作"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "choice"
	          ],
	          "events": {
	            "click": "click_new"
	          },
	          "attr": {
	            "value": "新建文件夹"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "choice"
	          ],
	          "events": {
	            "click": "click_login"
	          },
	          "attr": {
	            "value": "登录网页版"
	          }
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
	    "backgroundColor": "#ebedef"
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
	    "marginLeft": 20,
	    "marginRight": 10
	  },
	  "div_search": {
	    "backgroundColor": "#ebedef",
	    "flex": 1,
	    "height": 50,
	    "borderRadius": 50,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "marginRight": 20
	  },
	  "txt_center": {
	    "textAlign": "center",
	    "color": "#cccccc",
	    "fontWeight": "bold",
	    "fontSize": 24
	  },
	  "list": {
	    "backgroundColor": "#ebedef"
	  },
	  "div_cell": {
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#ffffff",
	    "borderTopWidth": 1,
	    "borderColor": "#ebedef"
	  },
	  "img_logo": {
	    "height": 60,
	    "width": 60,
	    "marginLeft": 20,
	    "borderWidth": 1
	  },
	  "div_txt": {
	    "flex": 1,
	    "height": 80,
	    "justifyContent": "flex-start",
	    "alignItems": "flex-start"
	  },
	  "txt_flex": {
	    "flex": 1,
	    "textAlign": "left",
	    "marginLeft": 20,
	    "fontSize": 28
	  },
	  "txt_grey": {
	    "fontSize": 20,
	    "color": "#aaaaaa",
	    "textAlign": "left",
	    "marginLeft": 20
	  },
	  "popup": {
	    "position": "absolute",
	    "padding": 20,
	    "right": 0,
	    "top": 120,
	    "width": 200,
	    "height": 300,
	    "backgroundColor": "#273746",
	    "borderRadius": 10,
	    "opacity": 0.8,
	    "alignItems": "center"
	  },
	  "choice": {
	    "height": 60,
	    "width": 160,
	    "textAlign": "center",
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#cccccc",
	    "color": "#cccccc",
	    "fontSize": 28
	  },
	  "img_go": {
	    "height": 32,
	    "width": 32,
	    "borderWidth": 1,
	    "marginRight": 20
	  },
	  "div_select": {
	    "height": 32,
	    "width": 32,
	    "borderRadius": 100,
	    "backgroundColor": "#ebedef",
	    "marginLeft": 20,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "img_select": {
	    "height": 16,
	    "width": 16,
	    "backgroundColor": "#279999",
	    "borderRadius": 100
	  },
	  "isSelected_true": {
	    "backgroundColor": "#ff0000"
	  },
	  "isSelected_false": {
	    "backgroundColor": "#ebedef"
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
			isBatched: false,
			list: [{ type: 2, img_src: '', img_go: '', txt: '规章制度', time: '2017-02', size: '', isSelected: false }, { type: 2, img_src: '', img_go: '', txt: '办公指南', time: '2017-02', size: '', isSelected: false }, { type: 2, img_src: '', img_go: '', txt: '公司介绍', time: '2017-02', size: '', isSelected: false }]
		}},
		methods: {
			click_morefunc: function click_morefunc(e) {
				this.isShowFunc = !this.isShowFunc;
			},
			click_upload: function click_upload(e) {},
			click_batched: function click_batched(e) {
				this.isBatched = !this.isBatched;
			},
			click_new: function click_new(e) {},
			click_login: function click_login(e) {},
			click_select: function click_select(e) {
				e.target.attr.isSelected = !e.target.attr.isSelected;
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