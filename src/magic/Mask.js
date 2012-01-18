/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * version: 0.1
 * date: 2011/12/15
 * author: meizz
 */

///import magic.control.Layer;
///import baidu.lang.Event;
///import baidu.lang.inherits;

///import baidu.object.extend;
///import baidu.dom.g;
///import baidu.dom.insertHTML;
///import baidu.page.getWidth;
///import baidu.page.getHeight;
///import baidu.page.getScrollTop;
///import baidu.page.getScrollLeft;

///import baidu.browser.ie;
///import baidu.event.on;
///import baidu.event.un;

/**
 * 遮罩层
 *
 * @class magic.Mask
 * @author meizz, dron

 * @param	{JSON}			options 	参数设置
 * @config	{Boolean}		coverable	[r/w]对&lt;select&gt;、&lt;object&gt;、Flash 是否采取遮盖处理？
 * @config	{String}		bgColor 	[r/w]遮罩层背景色
 * @config  {Number}		opacity 	[r/w]背景层透明度，取值 0-1
 * @config  {HTMLElement}	container 	[r/w]遮罩层的容器，默认为 document.body
 */
(function(){
	
	magic.Mask = function(options){
		var me = this;
		magic.control.Layer.call(this);

		// [public property]
		me.zIndex = 999;
		me.opacity = 0.3;
		me.bgColor = "#000000";
		me.coverable = false;
		me.container = null;

		baidu.object.extend(me, options || {});
		me.container && (me.container = baidu.dom.g(me.container));

		// [private property]
		me.width = me.height = "100%";

		me.on("beforeshow", function(){
            // 避免重复
            if (me.box && me.box.busy) return;

			me.box = factory.produce();
			me.mappingDom("", me.box.getElement());
			var box = me.box.getElement();
			box.style.zIndex = me.zIndex;
			box.style.opacity= me.opacity;
			box.style.filter = "alpha(opacity=" + me.opacity * 100 + ")";
			box.style.backgroundColor = me.bgColor;
			(me.container || document.body).appendChild(me.box.getElement());
			me.setSize([me.width, me.height]);
		});

		function resize(){
			if (!me.container) {
				var mask = me.getElement();
				mask.style.display = "none";
				me.setSize([baidu.page.getWidth(), baidu.page.getHeight()]);
				mask.style.display = "";
			}
		}

		me.on("show", function(){
			resize();
			!me.container && baidu.event.on(window, "onresize", resize);
		});

		me.on("hide", function(){
			baidu.event.un(window, "onresize", resize);
			me.box && (me.box.busy = false);
			me.box = null;
		});

	};
	baidu.lang.inherits(magic.Mask, magic.control.Layer, "magic.Mask")

	// 工厂模式，重复使用DOM元素
    var factory = {list:[], produce : function(){
        for(var i=0, n=this.list.length; i<n; i++) {
            if (!this.list[i].busy) {
                this.list[i].busy = true;
                return this.list[i];
            }
        }
        var box = new magic.Base();
        baidu.dom.insertHTML(document.body, "afterbegin", 
            "<div id='"+box.getId()+"' style='top:0px;left:0px; position:absolute; display:none;'>"
			+(baidu.browser.ie < 7 ? "<iframe frameborder='0' id='"+box.getId("iframe")+"' style='"
			+"filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);border:none;"
			+"position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:-1' "
			+"src='about:blank'></iframe>" : "") +"</div>");
        box.busy = true;
        this.list.push(box);
        return box;
    }};
})();
