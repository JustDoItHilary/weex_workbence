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

	var __weex_template__ = __webpack_require__(121)
	var __weex_style__ = __webpack_require__(122)
	var __weex_script__ = __webpack_require__(123)

	__weex_define__('@weex-component/84d65e8d857ebef3f1462e24aaf72eb5', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/84d65e8d857ebef3f1462e24aaf72eb5',undefined,undefined)

/***/ },

/***/ 121:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "style": {
	    "backgroundColor": "#ebedef",
	    "height": function () {return this.devHeight},
	    "position": "absolute"
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
	        "border_bottom"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "flex_center"
	          ],
	          "style": {
	            "borderRightWidth": 2,
	            "borderColor": "#eeeeee"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": function () {return ['text_center', 'select_' + (this.isSelected)]},
	              "attr": {
	                "value": "我的汇报"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "flex_center"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": function () {return ['text_center', 'select_' + (!this.isSelected)]},
	              "attr": {
	                "value": "团队汇报"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "list",
	      "style": {
	        "marginBottom": 80
	      },
	      "children": [
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": {
	            "expression": function () {return this.list},
	            "value": "item"
	          },
	          "shown": function () {return (this.item.type==1)},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "border_bottom"
	              ],
	              "style": {
	                "height": 160
	              },
	              "attr": {
	                "type": function () {return this.item.type},
	                "repid": function () {return this.item.repId},
	                "logo_src": function () {return this.item.logo_src},
	                "tit": function () {return this.item.tit},
	                "time": function () {return this.item.time},
	                "content": function () {return this.item.content},
	                "obj": function () {return this.item}
	              },
	              "events": {
	                "click": "myRep"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "img_center"
	                  ],
	                  "attr": {
	                    "src": ""
	                  }
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "flex_left"
	                  ],
	                  "children": [
	                    {
	                      "type": "div",
	                      "children": [
	                        {
	                          "type": "text",
	                          "attr": {
	                            "value": function () {return this.item.tit}
	                          }
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
	                        "text_content"
	                      ],
	                      "attr": {
	                        "value": function () {return this.item.time}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "rad_border",
	                    "text_content"
	                  ],
	                  "attr": {
	                    "repid": function () {return this.item.repId},
	                    "value": "删除"
	                  },
	                  "events": {
	                    "click": "delete"
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "classList": [
	            "sec_cell"
	          ],
	          "repeat": {
	            "expression": function () {return this.list},
	            "value": "item"
	          },
	          "shown": function () {return (this.item.type==2)},
	          "events": {
	            "click": "myRep"
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "flexDirection": "row",
	                "minHeight": 160,
	                "justifyContent": "center",
	                "alignItems": "center"
	              },
	              "attr": {
	                "type": function () {return this.item.type},
	                "repid": function () {return this.item.repId},
	                "logo_src": function () {return this.item.logo_src},
	                "tit": function () {return this.item.tit},
	                "time": function () {return this.item.time},
	                "content": function () {return this.item.content}
	              },
	              "events": {
	                "click": "myRep"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "logo"
	                  ],
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "img_center"
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
	                    "flex_left"
	                  ],
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "text_title"
	                      ],
	                      "attr": {
	                        "value": function () {return this.item.tit}
	                      }
	                    },
	                    {
	                      "type": "text",
	                      "classList": [
	                        "text_content"
	                      ],
	                      "attr": {
	                        "value": function () {return this.item.time}
	                      }
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "text",
	              "classList": [
	                "text_tit"
	              ],
	              "attr": {
	                "value": "今日工作计划："
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "text_mulit"
	              ],
	              "attr": {
	                "value": function () {return this.item.content}
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
	          "shown": function () {return (this.item.type==3)},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "else"
	              ],
	              "attr": {
	                "value": function () {return this.item.tit}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "text",
	      "classList": [
	        "select_true",
	        "text_new"
	      ],
	      "events": {
	        "click": "newRep"
	      },
	      "attr": {
	        "value": "新建"
	      }
	    }
	  ]
	}

/***/ },

/***/ 122:
/***/ function(module, exports) {

	module.exports = {
	  "div_titBar": {
	    "height": 100,
	    "width": 750,
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
	  "border_bottom": {
	    "height": 120,
	    "width": 750,
	    "borderBottomWidth": 20,
	    "borderColor": "#eeeeee",
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#ffffff"
	  },
	  "flex_center": {
	    "flex": 1,
	    "alignItems": "center",
	    "marginTop": 20,
	    "marginBottom": 20
	  },
	  "text_center": {
	    "fontSize": 32
	  },
	  "select_true": {
	    "color": "#58D68D"
	  },
	  "select_false": {
	    "color": "#aaaaaa"
	  },
	  "img_center": {
	    "width": 80,
	    "height": 80,
	    "backgroundColor": "#58D68D",
	    "borderRadius": 100,
	    "marginLeft": 20
	  },
	  "flex_left": {
	    "padding": 10,
	    "flex": 1,
	    "alignItems": "flex-start",
	    "marginLeft": 20
	  },
	  "rad_border": {
	    "borderWidth": 2,
	    "borderColor": "#ebedef",
	    "borderRadius": 10,
	    "textAlign": "center",
	    "height": 50,
	    "width": 90,
	    "margin": 20
	  },
	  "text_content": {
	    "color": "#bbbbbb",
	    "fontWeight": "normal",
	    "alignItems": "center"
	  },
	  "sec_cell": {
	    "borderBottomWidth": 20,
	    "borderColor": "#ebedef",
	    "backgroundColor": "#ffffff",
	    "width": 750,
	    "height": 360
	  },
	  "text_tit": {
	    "width": 720,
	    "height": 50,
	    "marginLeft": 30,
	    "fontSize": 32
	  },
	  "text_mulit": {
	    "height": 120,
	    "fontSize": 28,
	    "lines": 3,
	    "marginLeft": 30,
	    "marginRight": 30
	  },
	  "else": {
	    "textAlign": "center",
	    "fontSize": 32,
	    "color": "#bbbbbb",
	    "padding": 20
	  },
	  "text_new": {
	    "position": "absolute",
	    "height": 80,
	    "width": 750,
	    "paddingTop": 20,
	    "paddingBottom": 20,
	    "marginBottom": 0,
	    "bottom": 0,
	    "textAlign": "center",
	    "backgroundColor": "#ffffff",
	    "fontSize": 32
	  }
	}

/***/ },

/***/ 123:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var navigator = __weex_require__('@weex-module/navigator');
	var modal = __weex_require__('@weex-module/modal');
	var configModule = __weex_require__('@weex-module/configModule');
	var storage = __weex_require__('@weex-module/storage');
	module.exports = {
		data: function () {return {
			navpageHeight: 112,
			isSelected: true,
			devHeight: 990,
			scrollerHeight: 560,
			loading_display: 'show',
			refresh_display: 'show',
			baseUrl: 'file://assets/',
			weekly_list: [],
			list: [{ repId: 1, type: 1, logo_src: '', tit: '我的工作日报', time: '星期二', sign_src: '', content: '' }, { repId: 2, type: 2, logo_src: '', tit: '我的工作日报', time: '星期五', sign_src: '', content: ',mdfngs,gns,gnd,sandfLKFKSJHFLSKHFJLASKDFHAHLKSJDFHLAKSDJHFLASKDJHFLASKDJFHAKSLDJHFLKASJDHFALKSJDHFLKASJDHFLKASJDHFLKASDHFLKASDJHFLAKSJDHFLAKSJDFHLASKDFH;ASLDKFJA;SLDKGJAS;LDKGJSKGHKFJ;LFKAS' }, { repId: 3, type: 2, logo_src: '', tit: '我的工作日报', time: '星期五', sign_src: '', content: ',mdfngs,gns,gnd,sandf' }, { repId: 4, type: 2, logo_src: '', tit: '我的工作日报', time: '星期五', sign_src: '', content: ',mdfngs,gns,gnd,sandf' }, { repId: 5, type: 2, logo_src: '', tit: '我的工作日报', time: '星期五', sign_src: '', content: ',mdfngs,gns,gnd,sandf' }, { repId: 6, type: 3, logo_src: '', tit: '没有更多了哦~', time: '', sign_src: '', content: '' }]
		}},
		methods: {
			refresh: function refresh(e) {
				var self = this;
				self.refresh_display = 'show';
				self.currentIndex = 0;

				self.refresh_display = 'hide';
			},
			loading: function loading(e) {
				var self = this;
				this.loading_display = "show";
				self.refresh_display = 'show';

				self.loading_display = "hide";
				self.refresh_display = 'hide';
			},
			newRep: function newRep(e) {
				var config = this.$getConfig();
				var bundleUrl = config.bundleUrl;

				var url = 'http://192.168.100.140:8080/test_yn/ui/zhy/js/newWeekly.js' + '?devHeight=' + this.devHeight;

				var params = { 'url': url, 'animated': 'true' };
				navigator.push(params, function (ret) {
					modal.toast({ 'message': 'newRep', 'doation': 1 });
				});
			},
			myRep: function myRep(e) {
				var self = this;
				var tit = e.target.attr.tit || '';
				var repid = e.target.attr.repid || '';
				var type = e.target.attr.type || '';
				var logo_src = e.target.attr.logo_src || '';
				var time = e.target.attr.time || '';
				var content = e.target.attr.content || '';
				var obj = e.target.attr.obj;
				modal.toast({ 'message': 'REPID: ' + obj, 'doation': 1 });

				var url = 'http://192.168.100.140:8080/test_yn/ui/zhy/js/myRep.js';
				url = url + '?devHeight=' + self.devHeight + '&repid=' + repid + '&type=' + type + '&logo_src=' + logo_src + '&time=' + time + '&tit=' + tit + '&content=' + content;
				var params = { 'url': url, 'animated': 'true' };
			},
			getList: function getList(e) {
				var self = this;
			},
			delete: function _delete(e) {
				var self = this;
				modal.confirm({ 'message': '确定删除?', 'doation': 0.3 }, function (ret) {
					if (ret == 'OK') {
						var repid = e.target.attr.repid;
						var index;
						self.list.forEach(function (item, index) {
							if (repid == item.repId) {
								self.list.splice(index, 1);
							}
						});
					}
				});
			}
		},
		created: function created(e) {
			var self = this;

			storage.getAllKeys(function (e) {
				if (e.result == 'success' && e.data.length) {
					e.data.forEach(function (item) {
						if (item.indexOf('weekly_') > -1) {
							self.weekly_list.push(item);
						}
					});
					modal.toast({ 'message': self.weekly_list.length, 'doation': 1 });
				}
			});
		},
		ready: function ready(e) {
			if (this.$getConfig().env.platform != "iOS") {
				this.mainExtra = "mainExtraAndroid";
				configModule.getDevHeight(function (params) {
					var ratio = this.$getConfig().env.deviceWidth / 750;
					this.devHeight = params.height / ratio;
					__weex_require__('@weex-module/myModule').printLog(this.devHeight);
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