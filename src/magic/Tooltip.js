/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 * 
 * version: 2.0
 * date: 2011/12/15
 * author: meizz
 */

///import baidu.lang.createClass;

///import baidu.object.extend;
///import baidu.dom.addClass;
///import baidu.dom.insertHTML;

///import magic.control.Popup;
///import magic.Background.$styleBox;
///import baidu.global.getZIndex;

///import baidu.page.getViewWidth;
///import baidu.page.getScrollLeft;

/**
 * TOOLTIP
 *
 * @namespace magic.Tooltip
 * @author meizz
 *
 * @param	{JSON}		options 	参数设置
 * @config	{Boolean}	autoHide 	[r/w]是否自动隐藏
 * @config  {Boolean}	visible 	[r]弹出层当前是否显示？
 * @config  {Boolean}	hideOnEscape[r/w]在用户按[ESC]键时是否隐藏当前弹出层
 * @config  {Number}	offsetX 	[r/w]定位时的偏移量，X方向
 * @config  {Number}	offsetY 	[r/w]定位时的偏移量，Y方向
 * @config  {Number|String}	top 	[r]弹出层的定位点
 * @config  {Number|String}	left	[r]弹出层的定位点 200|200px|50%|12em|12cm
 * @config  {Number|String}	width 	[r/w]弹出层的宽度，默认值 auto
 * @config  {Number|String}	height 	[r/w]弹出层的高度，默认值 auto
 *
 * @config	{String}	align		[r/w]箭头所处 左中右 的位置 left|center right
 * @config	{String}		bgColor 	[r/w]遮罩层背景色
 * @config  {Number}		opacity 	[r/w]背景层透明度，取值 0-1
 * @config  {HTMLElement}	container 	[r/w]遮罩层的容器，默认为 document.body
 */
(function(){
	magic.Tooltip = baidu.lang.createClass(function(options){
		var me = this;

		me.align = "left";	// left|center|right
		me.direction = "top";
		me.autoHide = false;
		me.styleBox = true;
		me.content = "";
		me.smartPosition = false;

		baidu.object.extend(me, options || {})

		var box = factory.produce();
		me.mappingDom("", box.getElement());
		me.mappingDom("content", box.getElement("content"));
		box.getElement().style.zIndex = baidu.global.getZIndex("popup");
		me.background = new magic.Background({coverable:true, styleBox:me.styleBox});
		me.background.render(me.getElement());
		var html= "<div class='arrow_top'></div><div class='arrow_bottom'></div>";
		var bgl = me.background.getElement();
		baidu.dom.insertHTML(bgl, "afterbegin", html);
		baidu.dom.addClass(bgl, "arrow_"+ me.align +" arrow_"+ me.direction);
		box.getElement("close").onclick=function(){me.hide(); return false;};
		me.setContent(me.content);

		me.on("dispose", function(){
			bgl.parentNode.removeChild(bgl);
			box.busy = false;
		});
	}, {
		type : "magic.Tooltip"
		,superClass : magic.control.Popup
	}).extend({
		render:function(){
			this.setSize([this.width, this.height]);
			this.show();
		}
	})

	// 工厂模式：重复使用popup壳体DOM，减少DOM的生成与销毁
	var factory = {list:[], produce : function(){
		for(var i=0, n=this.list.length; i<n; i++) {
			if (!this.list[i].busy) {
				this.list[i].busy = true;
				return this.list[i];
			}
		}
		var box = new magic.Base();
		baidu.dom.insertHTML(document.body, "afterbegin", [
			"<div class='tang-tooltip' id='",box.getId(),"' "
			,"style='position:absolute; display:none;'>"
			,	"<div class='tang-tooltip-close' id='",box.getId("close"),"'>"
			,		"<a href='#' onclick='return false'></a>"
			,	"</div>"
			,	"<div class='tang-foreground' id='",box.getId("content"),"'></div>"
			,"</div>"
		].join(""));
		box.busy = true;
		this.list.push(box);
		return box;
	}};
})();

//	20120114 meizz 实现了工厂模式，重复使用 Tooltip 的外壳，在 dispose 析构方法执行时回收DOM资源
