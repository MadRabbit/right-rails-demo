/**
 * RightJS-UI: Autocompleter
 * http://rightjs.org/ui/autocompleter
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var Autocompleter=RightJS.Autocompleter=function(j,c){function l(a,b,d,e){if(c.Fx)if(d===undefined){d=this.options.fxName;if(e===undefined){e={duration:this.options.fxDuration,onFinish:c(this.fire).bind(this,b)};if(b==="hide")e.duration=(c.Fx.Durations[e.duration]||e.duration)/2}}c.Element.prototype[b].call(a,d,e);if(!c.Fx||!d)this.fire(b);return this}function m(a,b,d){var e=(this.reAnchor||(this.reAnchor=new c.Element("div",{"class":"rui-re-anchor"})).insert(this)).insertTo(a,"after").position(),
f=a.dimensions(),h=parseInt(a.getStyle("borderTopWidth")),i=parseInt(a.getStyle("borderLeftWidth")),q=parseInt(a.getStyle("borderRightWidth")),r=parseInt(a.getStyle("borderBottomWidth"));a=f.top-e.y+h;e=f.left-e.x+i;i=f.width-i-q;f=f.height-h-r;this.setStyle("visibility:hidden").show(null);if(b==="right")e+=i-this.size().x;else a+=f;this.moveTo(e,a);if(d)["left","right"].include(b)?this.setHeight(f):this.setWidth(i);this.setStyle("visibility:visible").hide(null)}var g=c,n=c.$,s=c.$w,t=c.Xhr,o=c.RegExp,
u=c.isArray,p=new c.Wrapper(c.Element,{initialize:function(a){this.$super("div",{"class":"rui-spinner"});this.dots=[];for(var b=0;b<(a||4);b++)this.dots.push(new c.Element("div"));this.dots[0].addClass("glowing");this.insert(this.dots);c(this.shift).bind(this).periodical(300)},shift:function(){if(this.visible()){var a=this.dots.pop();this.dots.unshift(a);this.insert(a,"top")}}}),k=new (function(a,b){if(!b){b=a;a="DIV"}var d=new c.Wrapper(c.Element.Wrappers[a]||c.Element,{initialize:function(e,f){this.key=
e;var h=[{"class":"rui-"+e}];this instanceof c.Input||this instanceof c.Form||h.unshift(a);this.$super.apply(this,h);if(c.isString(f))f=c.$(f);if(f instanceof c.Element){this._=f._;if("$listeners"in f)f.$listeners=f.$listeners;f={}}this.setOptions(f,this);return this},setOptions:function(e,f){f=f||this;c.Options.setOptions.call(this,c.Object.merge(e,eval("("+(f.get("data-"+this.key)||"{}")+")")));return this}});d=new c.Wrapper(d,b);c.Observer.createShortcuts(d.prototype,d.EVENTS||[]);return d})("UL",
{include:{show:function(a,b){this.constructor.current=this;return l.call(this,this,"show",a,b)},hide:function(a,b){this.constructor.current=null;return l.call(this,this,"hide",a,b)},showAt:function(a,b,d){this.hide(null).shownAt=a=c.$(a);m.call(this,a,b,d);return this.show()},toggleAt:function(a,b,d){return this.hidden()?this.showAt(a,b,d):this.hide()}},extend:{version:"2.0.0",EVENTS:s("show hide update load select done"),Options:{url:j.location.href,param:"search",method:"get",minLength:1,threshold:200,
cache:true,local:null,fxName:"slide",fxDuration:"short",spinner:"native",cssRule:"input[data-autocompleter]"}},initialize:function(a,b){this.input=n(a);this.$super("autocompleter",b).addClass("rui-dd-menu").onMousedown(this.clicked);this.input.autocompleter=this},destroy:function(){delete this.input.autocompleter;return this},prev:function(){return this.pick("prev")},next:function(){return this.pick("next")},done:function(a){if(a=a||this.first("li.current")){this.input.setValue(g(a.html()).stripTags());
this.fire("done")}return this.hide()},setOptions:function(a){this.$super(a,this.input);a=this.options;g(a.url).includes("%{search}")||(a.url+=(g(a.url).includes("?")?"&":"?")+a.param+"=%{search}")},pick:function(a){var b=this.children(),d=b.first("hasClass","current"),e=b.indexOf(d);if(a=="prev")d=e<1?b.last():b[e<0?0:e-1];else if(a=="next")d=e<0||e==b.length-1?b.first():b[e+1];return this.fire("select",{item:d.radioClass("current")})},clicked:function(a){this.done(a.stop().find("li"))},keypressed:function(){if(this.input.value().length>=
this.options.minLength){this.timeout&&this.timeout.cancel();this.timeout=g(this.trigger).bind(this).delay(this.options.threshold)}else return this.hide()},trigger:function(){this.timeout=null;this.cache=this.cache||{};var a=this.input.value(),b=this.options;if(a.length<b.minLength)return this.hide();if(this.cache[a])this.suggest(this.cache[a],a);else if(u(b.local))this.suggest(this.findLocal(a),a);else this.request=t.load(b.url.replace("%{search}",encodeURIComponent(a)),{method:b.method,spinner:this.getSpinner(),
onComplete:g(function(d){this.fire("load").suggest(d.text,a)}).bind(this)})},suggest:function(a,b){if(this.options.cache)this.cache[b]=a;if(a.blank())this.hide();else{this.update(a.replace(/<ul[^>]*>|<\/ul>/im,""));this.fire("update").showAt(this.input,"bottom","resize")}return this},findLocal:function(a){var b=new o("("+o.escape(a)+")","ig");return g(this.options.local).map(function(d){if(d.match(b))return"<li>"+d.replace(b,"<strong>$1</strong>")+"</li>"}).compact().join("")},getSpinner:function(){var a=
this.options,b=a.spinner;if(b=="native"){b=a.spinner=(new p(3)).insertTo(this);b.addClass("rui-autocompleter-spinner")}b instanceof p&&m.call(b,this.input,"right","resize");return b}});n(j).on({focus:function(a){if((a=a.target)&&a instanceof c.Element&&(a.autocompleter||a.match(k.Options.cssRule)))a.autocompleter||new k(a)},blur:function(a){(a=a.target?a.target.autocompleter:null)&&a.visible()&&a.hide()},keydown:function(a){var b=a.target?a.target.autocompleter:null;if(b&&b.visible()){var d={27:"hide",
38:"prev",40:"next",13:"done"}[a.keyCode];if(d){a.stop();b[d]()}}},keyup:function(a){var b=a.target?a.target.autocompleter:null;b&&!g([9,27,37,38,39,40,13]).include(a.keyCode)&&b.keypressed(a)}});j.write('<style type="text/css"> *.rui-dd-menu, *.rui-dd-menu li{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none} *.rui-dd-menu{display:none;position:absolute;z-index:9999;background:white;border:1px solid #BBB;border-radius:.2em;-moz-border-radius:.2em;-webkit-border-radius:.2em;box-shadow:#DDD .2em .2em .4em;-moz-box-shadow:#DDD .2em .2em .4em;-webkit-box-shadow:#DDD .2em .2em .4em} *.rui-dd-menu li{padding:.2em .4em;border-top:none;border-bottom:none;cursor:pointer} *.rui-dd-menu li.current{background:#DDD} *.rui-dd-menu li:hover{background:#EEE}dl.rui-dd-menu dt{padding:.3em .5em;cursor:default;font-weight:bold;font-style:italic;color:#444;background:#EEE}dl.rui-dd-menu dd li{padding-left:1.5em}div.rui-spinner,div.rui-spinner div{margin:0;padding:0;border:none;background:none;list-style:none;font-weight:normal;float:none;display:inline-block; *display:inline; *zoom:1;border-radius:.12em;-moz-border-radius:.12em;-webkit-border-radius:.12em}div.rui-spinner{text-align:center;white-space:nowrap;background:#EEE;border:1px solid #DDD;height:1.2em;padding:0 .2em}div.rui-spinner div{width:.4em;height:70%;background:#BBB;margin-left:1px}div.rui-spinner div:first-child{margin-left:0}div.rui-spinner div.glowing{background:#777}div.rui-re-anchor{margin:0;padding:0;background:none;border:none;float:none;display:inline;position:absolute;z-index:9999}.rui-autocompleter{border-top-color:#DDD !important;border-top-left-radius:0 !important;border-top-rui-radius:0 !important;-moz-border-radius-topleft:0 !important;-moz-border-radius-topright:0 !important;-webkit-border-top-left-radius:0 !important;-webkit-border-top-right-radius:0 !important}.rui-autocompleter-spinner{border:none !important;background:none !important;position:absolute;z-index:9999}.rui-autocompleter-spinner div{margin-top:.2em !important; *margin-top:0.1em !important}</style>');
return k}(document,RightJS);
