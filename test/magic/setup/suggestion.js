module("magic.setup.suggestion");

(function(){
	enSetup = function(){
		div = document.createElement("div");
		document.body.appendChild(div);
		$(div).attr("id", "one-suggestion");
		$(div).attr("class", "tt-suggestion");
		input = document.createElement("input");
		div.appendChild(input);
		$(input).attr("class", "tang-suggestion-input");
		$(input).attr("id", "tang-suggestion-input");
	};
	getContentByKey = function(key){
		if(key == "a")
			var content = "[{value:'a+1value',content:'a+1'},{value:'北海2value',content:'北海2'},{value:'北海3value',content:'北海3',disable:false},{value:'北海4value',content:'北海4',disable:true}, '北海5']";
		if(key == "b")
			var content = "[{value:'b+1value',content:'b+1'},{value:'北海6value',content:'北海6'}]";
		return eval(content);
	}
	getCurrentItem = function(s){
		return $(".tang-suggestion-current", s.getElement("suggestion")).text();
	}
})();

test('default params', function(){
	expect(55);
	stop();
	ua.importsrc("baidu.ajax.request", function(){
		ua.loadcss(upath + "suggestion/suggestion.css", function(){
			enSetup();
			var show = 0;
			var highlight = 0;
			var pick = 0;
			var options = {
				getData: function(key){
			        var me = this;
			        me.fire("ongetdata", key, getContentByKey(key));
			    },
		        onshow: function(){
		        	equals(baidu.dom.getPosition(this.getElement("suggestion")).top, baidu.dom.getPosition(this.getElement("input")).top + input.offsetHeight - 1, "The offsetX is right");
		        	equals(baidu.dom.getPosition(this.getElement("suggestion")).left, baidu.dom.getPosition(this.getElement("input")).left, "The offsetY is right");
		        	equals(this.getElement("suggestion").offsetWidth, input.offsetWidth, "The Width is right");
		        	
		        	equals(this.getDataByIndex(0).value, "a+1value", "The value is right");
		        	equals(this.getDataByIndex(1).value, "北海2value", "The value is right");
		        	equals(this.getDataByIndex(2).value, "北海3value", "The value is right");
		        	equals(this.getDataByIndex(3).value, "北海4value", "The value is right");
		        	equals(this.getDataByIndex(4).value, "北海5", "The value is right");
		        	
		        	setTimeout(function(){
		        		ua.keydown(input, {
							keyCode : 40
						});
		        	}, 0)
		        },
		        onhighlight: function(e, item){
		        	highlight ++;
		        	switch(highlight){
			        	case 1:
			        		equals(item.index, 0, "The highlight index is right");
				        	equals(item.data.value, "a+1value", "The highlight data is right");
			        		equals(getCurrentItem(s), "a+1", "The hightlight item is right");
			        		equals($(input).attr("value"), "a+1", "The input value is right");
			        		equals(this.selectedIndex, 0, "The selected index is right");
			        		break;
			        	case 2:
			        		equals(item.index, 1, "The highlight index is right");
				        	equals(item.data.value, "北海2value", "The highlight data is right");
			        		equals(getCurrentItem(s), "北海2", "The hightlight item is right");
			        		equals($(input).attr("value"), "北海2", "The input value is right");
			        		equals(this.selectedIndex, 1, "The selected index is right");
			        		break;
			        	case 3:
			        		equals(item.index, 2, "The highlight index is right");
				        	equals(item.data.value, "北海3value", "The highlight data is right");
			        		equals(getCurrentItem(s), "北海3", "The hightlight item is right");
			        		equals($(input).attr("value"), "北海3", "The input value is right");
			        		equals(this.selectedIndex, 2, "The selected index is right");
			        		break;
			        	case 4:
			        		equals(item.index, 4, "The highlight index is right");
				        	equals(item.data.value, "北海5", "The highlight data is right");
			        		equals(getCurrentItem(s), "北海5", "The hightlight item is right");
			        		equals($(input).attr("value"), "北海5", "The input value is right");
			        		equals(this.selectedIndex, 3, "The selected index is right");
			        		
			        		$(this._getItemDom(0)).mouseover();
			        		break;
			        	case 5:
			        		equals(item.index, 0, "The highlight index is right");
				        	equals(item.data.value, "a+1value", "The highlight data is right");
			        		equals(getCurrentItem(s), "a+1", "The hightlight item is right");
			        		equals($(input).attr("value"), "北海5", "The input value is right");//鼠标移到item上，输入框内容不随之变化
			        		equals(this.selectedIndex, 0, "The selected index is right");		
			        		break;
			        	default:
			        		ok(true);
			        		break;
		        	}
		        	if(highlight < 4){
		        		setTimeout(function(){
			        		ua.keydown(input, {
								keyCode : 40
							});
			        	}, 200)
		        	}
		        },
		        onmouseoveritem : function(e, item){
		        	equals(item.index, 0, "The mouseoutitem index is right");
		        	equals(item.data.value, "a+1value", "The mouseoutitem data is right");
		        	
		        	$(this._getItemDom(0)).click();  
		        },
		        onpick: function(e, item){
		        	pick ++;
		        	switch(pick){
		        	case 1:
		        		equals($(input).attr("value"), "a+1", "The input value is right");
		        		equals(item.index, 0, "The pick index is right");
			        	equals(item.data.value, "a+1value", "The pick data is right");
		        		break;
		        	case 2:
		        		equals($(input).attr("value"), "北海2", "The input value is right");
		        		equals(item.index, 1, "The pick index is right");
			        	equals(item.data.value, "北海2value", "The pick data is right");
		        		break;
		        	case 3:
		        		equals($(input).attr("value"), "北海3", "The input value is right");
		        		equals(item.index, 2, "The pick index is right");
		        		equals(item.data.value, "北海3value", "The pick data is right");
		        		break;
		        	case 4:
		        		equals($(input).attr("value"), "北海5", "The input value is right");
		        		equals(item.index, 4, "The pick index is right");
			        	equals(item.data.value, "北海5", "The pick data is right");
		        		break;
		        	case 5:
		        		equals($(input).attr("value"), "a+1", "The input value is right");//鼠标点击后，输入框内容变化
		        		equals(item.index, 0, "The pick index is right");
			        	equals(item.data.value, "a+1value", "The pick data is right");
		        		break;
		        	default:
		        		ok(true);
		        		break;
		        	}
		        },
		        onconfirm: function(e, item){
		        	equals(item.index, 0, "The confirm index is right");
		        	equals(item.data.value, "a+1value", "The confirm data is right");
		        },
		        onhide: function(){
		        	ok(!isShown(this.getElement("suggestion")), "hide");
		        	this.on("ondispose", function(){//不能在ondispose中写，因为ondispose在代码解绑监听函数之前运行，那时还有一些监听函数没有解绑
		        		var l2 = baidu.event._listeners.length;
			        	equals(l2, l1, "The events are un");
			        	equals(this.getElement("suggestion"), null, "The dom is clear");
			        	document.body.removeChild(div);
			        	start();
		        	})
		        	this.dispose();
		        },
		        ondispose: function(){
		        	
		        }
		    };
			var l1 = baidu.event._listeners.length;
			var s = magic.setup.suggestion('tang-suggestion-input', options);
			$("input").focus();
			$("input").attr("value", "a");
		});
	}, "baidu.ajax.request", "magic.setup.suggestion");
});

test("all params", function(){
	expect(31);
	stop();
	enSetup();
	var highlight = 0;
	var mouseover = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        offset:{
        	'offsetX' : 200,
        	'offsetY' : 200,
        	'width' : 200
        },
        prependHTML : '写在下拉框列表前面的HTML写在下拉框列表前面的HTML',
        appendHTML : '<span>写在下拉框列表后面的HTML写在下拉框列表后面的HTML</span>',
        holdHighLight : true,
        onshow: function(){
        	var s = this;
        	equals(baidu.dom.getPosition(this.getElement("suggestion")).top, baidu.dom.getPosition(this.getElement("input")).top + input.offsetHeight + 200, "The offsetX is right");
        	equals(baidu.dom.getPosition(this.getElement("suggestion")).left, baidu.dom.getPosition(this.getElement("input")).left + 200, "The offsetY is right");
        	equals(this.getElement("suggestion").offsetWidth, 200, "The Width is right");
        	
        	setTimeout(function(){
        		ua.mouseover(s._getItemDom(0));
        	}, 0);
        },
        onhighlight: function(e, item){	
    		highlight++;
    		
    		if(highlight == 1){
    			equals(item.index, 0, "The highlight index is right");
            	equals(item.data.value, "a+1value", "The highlight data is right");
        		equals(getCurrentItem(s), "a+1", "The hightlight item is right");
        		equals($(input).attr("value"), "a", "The input value is right");//鼠标mouseover，input框中内容没有更改
        		equals(this.selectedIndex, 0, "The selected index is right");
    		}
    		
    		if(highlight == 2){
    			equals(item.index, 2, "The highlight index is right");
            	equals(item.data.value, "北海3value", "The highlight data is right");
        		equals(getCurrentItem(s), "北海3", "The hightlight item is right");
        		equals($(input).attr("value"), "a", "The input value is right");//鼠标mouseover，input框中内容没有更改
        		equals(this.selectedIndex, 2, "The selected index is right");
    		}
        },
        onmouseoveritem : function(e, item){
        	var s = this;
        	mouseover ++;
        	if(mouseover == 1){
        		equals(item.index, 0, "The mouseoveritem index is right");
            	equals(item.data.value, "a+1value", "The mouseoveritem data is right");
        	}
        	if(mouseover == 2){
        		equals(item.index, 2, "The mouseoveritem index is right");
            	equals(item.data.value, "北海3value", "The mouseoveritem data is right");
        	}
        	
    		if(mouseover == 1)
    			setTimeout(function(){
    				ua.mouseout(s._getItemDom(0));
            	}, 0);
        	if(mouseover == 2)
        		setTimeout(function(){
        			ua.click(s._getItemDom(2));
            	}, 0);
        },
        onmouseoutitem: function(e, item){
        	equals(item.index, 0, "The mouseoutitem index is right");
        	equals(item.data.value, "a+1value", "The mouseoutitem data is right");
        	equals(getCurrentItem(s), "a+1", "The hightlight item is right");//鼠标移出后，highlight依然存在
        	
        	setTimeout(function(){
        		ua.mouseover(s._getItemDom(2));
        	}, 0);
        },
        onmouseclick: function(e,item){
        	equals(item.index, 2, "The mouseclick index is right");
        	equals(item.data.value, "北海3value", "The mouseclick data is right");
        },
        onbeforepick:function(e, item){
        	equals($(input).attr("value"), "a", "The input value is right");//触发onbeforepick的时候，input的值还没有改变
    		equals(item.index, 2, "The beforepick index is right");
    		equals(item.data.value, "北海3value", "The beforepick data is right");
        },
        onpick: function(e, item){
        	equals($(input).attr("value"), "北海3", "The input value is right");
    		equals(item.index, 2, "The pick index is right");
    		equals(item.data.value, "北海3value", "The pick data is right");
        },
        onconfirm: function(e, item){
        	equals(item.index, 2, "The confirm index is right");
        	equals(item.data.value, "北海3value", "The confirm data is right");
        },
        onhide: function(){
        	ok(!isShown(this.getElement("suggestion")), "hide");
        	this.dispose();
    		document.body.removeChild(div);
        	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("getData & show & render", function(){
	expect(24);
	stop();
	enSetup();
	var show = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	show ++;
        	if(show == 1){
        		equals(this.dataCache.a.length, 5, "The dataCache is right");
            	equals(this.dataCache.a[0].content, "a+1", "The dataCache is right");
            	equals(this.currentData.length, 5, "The currentData is right");
            	equals(this.currentData[0].content, "a+1", "The currentData is right");
            	equals(this.currentQuery, "a", "The currentQuery is right")
            	equals(this.getElement("suggestion").className, "tang-popup  tang-suggestion-popup", "The class is right");
            	ok(isShown(this.getElement("suggestion")), "The suggestion is show");
            	equals(this.selectedIndex, -1, "The selectedIndex is right");
            	$("input").attr("value", "b");
        	}
        	if(show == 2){
        		equals(this.dataCache.b.length, 2, "The dataCache is right");
            	equals(this.dataCache.b[0].content, "b+1", "The dataCache is right");
            	equals(this.currentData.length, 2, "The currentData is right");
            	equals(this.currentData[0].content, "b+1", "The currentData is right");
            	equals(this.currentQuery, "b", "The currentQuery is right")
            	equals(this.getElement("suggestion").className, "tang-popup  tang-suggestion-popup", "The class is right");
            	ok(isShown(this.getElement("suggestion")), "The suggestion is show");
            	equals(this.selectedIndex, -1, "The selectedIndex is right");
            	$("input").attr("value", "a");
        	}
        	if(show == 3){
        		equals(this.dataCache.a.length, 5, "The dataCache is right");
            	equals(this.dataCache.a[0].content, "a+1", "The dataCache is right");
            	equals(this.currentData.length, 5, "The currentData is right");
            	equals(this.currentData[0].content, "a+1", "The currentData is right");
            	equals(this.currentQuery, "a", "The currentQuery is right")
            	equals(this.getElement("suggestion").className, "tang-popup  tang-suggestion-popup", "The class is right");
            	ok(isShown(this.getElement("suggestion")), "The suggestion is show");
            	equals(this.selectedIndex, -1, "The selectedIndex is right");
            	this.dispose();
            	document.body.removeChild(div);
            	start();
        	}
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("hide", function(){
	expect(12);
	stop();
	enSetup();
	var show = 0;
	var hide = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	show++;
        	if(show == 1){
        		ua.keydown(input, {
					keyCode : 40
				});
        	}
        	if(show == 2){
        		this.holdHighLight = true;
        		setTimeout(function(){
            		ua.mouseover(s._getItemDom(2));
            	}, 0);
        	}
        },
        onhighlight: function(){
        	setTimeout(function(){
        		s.hide();
        	}, 0);
        },
        onhide:function(){
        	hide++;
        	ok(!this.isShowing(), "The isShowing() is right");
        	ok(!isShown(this.getElement("suggestion")), "The suggestion is hide");
        	if(hide == 1){
        		equals(this.selectedIndex, -1, "The selectedIndex is right");
        		equals($(input).attr("value"), "a+1", "The input value is right");
        		equals(this.getInputValue(), "a+1", "The input value is right");
        		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
        		$("input").attr("value", "a");
        	}
        	if(hide == 2){
        		equals(this.selectedIndex, -1, "The selectedIndex is right");
        		equals($(input).attr("value"), "北海3", "The input value is right");
        		equals(this.getInputValue(), "北海3", "The input value is right");
        		equals(this.oldInputValue, "北海3", "The oldInputValue is right");
            	setTimeout(function(){
            		s.dispose();
                	document.body.removeChild(div);
                	start();
            	}, 0);
        	}
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("highLight & clearHighLight", function(){
	expect(10);
	stop();
	enSetup();
	var highlight = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		s.highLight(0);
        	}, 0);
        },
        onhighlight: function(){
        	highlight++;
        	if(highlight == 1){
        		equals(getCurrentItem(s), "a+1", "The hightlight item is right");
        		equals(this.selectedIndex, 0, "The selectedIndex is right");
        		setTimeout(function(){
            		s.highLight(1);
            	}, 0);
        	}
        	if(highlight == 2){
        		equals(getCurrentItem(s), "北海2", "The hightlight item is right");
        		equals(this.selectedIndex, 1, "The selectedIndex is right");
        		setTimeout(function(){
            		s.highLight(3);
            	}, 0);
        		setTimeout(function(){
            		s.highLight(4);
            	}, 0);
        	}
        	if(highlight == 3){
        		equals(getCurrentItem(s), "北海5", "The hightlight item is right");
        		equals(this.selectedIndex, 3, "The selectedIndex is right");
        		this.dispose();
            	document.body.removeChild(div);
            	start();
        	}
        },
        onclearhighlight: function(){//调用highlight4次，实际触发onhighlight2次，调用clearhighlight2次
        	equals(getCurrentItem(s), "", "The onclearhighlight item is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("pick", function(){
	expect(4);
	stop();
	enSetup();
	var show = 0;
	var highlight = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
            	s.pick(1);
        	} ,0);
        },
        onbeforepick: function(){
        	equals($(input).attr("value"), "a", "The input value is right");
	   		equals(this.oldInputValue, "a", "The oldInputValue is right");
        },
        onpick: function(){
        	equals($(input).attr("value"), "北海2", "The input value is right");
        	equals(this.oldInputValue, "北海2", "The oldInputValue is right");
	   		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("confirm", function(){
	expect(3);
	stop();
	enSetup();
	var show = 0;
	var highlight = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	this.confirm(1);
        },
        onconfirm: function(){
        	equals($(input).attr("value"), "北海2", "The input value is right");
        	equals(this.oldInputValue, "北海2", "The oldInputValue is right");
        },
        onhide: function(){
        	equals(this.selectedIndex, -1, "The selectedIndex is right");
        	this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("mouse event pick", function(){
	expect(16);
	stop();
	enSetup();
	var show = 0;
	var mouseover = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		ua.mouseover(s._getItemDom(0));
        	}, 0);
        },
        onmouseoveritem: function(e, item){
        	mouseover ++;
        	if(mouseover == 1){
        		equals($(input).attr("value"), "a", "The input value is right");
        		equals(this.oldInputValue, "a", "The oldInputValue is right");
        		equals(this.selectedIndex, 0, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.mouseover(s._getItemDom(1));
            	}, 0);
        	}
        	if(mouseover == 2){
        		equals($(input).attr("value"), "a", "The input value is right");
        		equals(this.oldInputValue, "a", "The oldInputValue is right");
        		equals(this.selectedIndex, 1, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.mouseover(s._getItemDom(3));
            	}, 0);
        	}
        	if(mouseover == 3){
        		equals($(input).attr("value"), "a", "The input value is right");
        		equals(this.oldInputValue, "a", "The oldInputValue is right");
        		equals(this.selectedIndex, 1, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.mouseout(s._getItemDom(1));
            	}, 0);

        	}
        	if(mouseover == 4){
        		equals($(input).attr("value"), "a", "The input value is right");
        		equals(this.oldInputValue, "a", "The oldInputValue is right");
        		equals(this.selectedIndex, 2, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.click(s._getItemDom(2));
            	}, 0);
        	}
        },
        onmouseoutitem: function(){
        	ok(true);
        	setTimeout(function(){
        		ua.mouseover(s._getItemDom(2));
        	}, 0);
        },
        onhide : function(){
        	equals($(input).attr("value"), "北海3", "The input value is right");
    		equals(this.oldInputValue, "北海3", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("mouse event,hide", function(){
	expect(9);
	stop();
	enSetup();
	var show = 0;
	var mouseover = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		ua.mouseover(s._getItemDom(0));
        	}, 0);
        },
        onmouseoveritem: function(e, item){
        	mouseover ++;
        	if(mouseover == 1){
        		equals($(input).attr("value"), "a", "The input value is right");
        		equals(this.oldInputValue, "a", "The oldInputValue is right");
        		equals(this.selectedIndex, 0, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.mouseout(s._getItemDom(0));
            	}, 0);
        	}
        },
        onmouseoutitem: function(e, item){
        	equals($(input).attr("value"), "a", "The input value is right");
    		equals(this.oldInputValue, "a", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		var div2 = document.createElement("div");
    		document.body.appendChild(div2);
    		$(div2).css("position","absolute").css('height', "20px").css("width", "20px").css("top", "0").css("left", "100");
        	ua.click(div2);
        },
        onhide : function(){
        	equals($(input).attr("value"), "a", "The input value is right");//mouseover之后，input框中的内容没有变化
    		equals(this.oldInputValue, "a", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("key event,enter", function(){
	expect(12);
	stop();
	enSetup();
	var highlight = 0;
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		ua.keydown(input, {
					keyCode : 40
				});
        	}, 0);
        },
        onhighlight: function(){
        	highlight ++;
        	if(highlight == 1){
        		equals($(input).attr("value"), "a+1", "The input value is right");
        		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
        		equals(this.selectedIndex, 0, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.keydown(input, {
    					keyCode : 40
    				});
            	}, 200);
        	}
        	if(highlight == 2){
        		equals($(input).attr("value"), "北海2", "The input value is right");
        		equals(this.oldInputValue, "北海2", "The oldInputValue is right");
        		equals(this.selectedIndex, 1, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.keydown(input, {
    					keyCode : 38
    				});
            	}, 200);
        	}
        	if(highlight == 3){
        		equals($(input).attr("value"), "a+1", "The input value is right");
        		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
        		equals(this.selectedIndex, 0, "The selectedIndex is right");
        		setTimeout(function(){
            		ua.keydown(input, {
    					keyCode : 13
    				});
            	}, 200);
        	}
        },
        onhide : function(){
        	equals($(input).attr("value"), "a+1", "The input value is right");
    		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("key event,esc", function(){
	expect(6);
	stop();
	enSetup();
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		ua.keydown(input, {
					keyCode : 40
				});
        	}, 0);
        },
        onhighlight: function(){
    		equals($(input).attr("value"), "a+1", "The input value is right");
    		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
    		equals(this.selectedIndex, 0, "The selectedIndex is right");
    		setTimeout(function(){
    			ua.keydown(input, {
					keyCode : 27
				});
        	}, 200);
        	
        },
        onhide : function(){
        	equals($(input).attr("value"), "a+1", "The input value is right");
    		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("key event,tab", function(){
	expect(6);
	stop();
	enSetup();
	var options = {
		getData: function(key){
	        var me = this;
	        me.fire("ongetdata", key, getContentByKey(key));
	    },
        onshow: function(){
        	setTimeout(function(){
        		ua.keydown(input, {
					keyCode : 40
				});
        	}, 0);
        },
        onhighlight: function(){
    		equals($(input).attr("value"), "a+1", "The input value is right");
    		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
    		equals(this.selectedIndex, 0, "The selectedIndex is right");
    		setTimeout(function(){
    			ua.keydown(input, {
					keyCode : 9
				});
        	}, 200);
        	
        },
        onhide : function(){
        	equals($(input).attr("value"), "a+1", "The input value is right");
    		equals(this.oldInputValue, "a+1", "The oldInputValue is right");
    		equals(this.selectedIndex, -1, "The selectedIndex is right");
    		this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});

test("getElement", function(){
	expect(3);
	stop();
	enSetup();
	var options = {
        getData: function(key){
            var me = this;
            me.fire("ongetdata", key, getContentByKey(key));
        },
        onshow: function(){
        	equals(this.getElement("").id, "tang-suggestion-input", "The getElement()is right");
        	equals(this.getElement("input").id, "tang-suggestion-input", "The getElement()is right");
        	equals(this.getElement("suggestion").className, "tang-popup  tang-suggestion-popup", "The getElement()is right");
        	this.dispose();
	       	document.body.removeChild(div);
	       	start();
        }
	}
	var s = magic.setup.suggestion('tang-suggestion-input', options);
	$("input").focus();
	$("input").attr("value", "a");
});