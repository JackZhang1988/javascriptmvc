
$(document).ready(function(){
	this.appname="appname";
	document.getElementById("btn").addEventListener('click',function(e){
		alert(this.appname);
	},false);

	$('#btn2').click($.proxy(function(){ 
		alert(this.appname);
	},this))

	// $("div ul li").click(function(){
	// 	console.log($(this).html());
	// });

	$("#delegateDiv ul").delegate("li","click",function(){
		console.log($(this).html());
	});

	$(".myEvent").trigger("myTrigger");

	$(".myEvent").bind("myTrigger",function(){});
	$("#tabs").iTabs("#tabContent");

	$("#pubsub").on("click",function(){
		PubSub.publish('mysub');
	});
});

$.fn.iTabs=function(control){
	var element = $(this);
	var control=$(control);

	element.delegate("li","click",function(){
		var tabName=$(this).attr("data-tab");
		element.trigger("change.tab",tabName);
	});

	element.bind("change.tab",function(e,tabName){
		element.find('li').removeClass("active");
		element.find(">[data-tab='"+tabName+"']").addClass("active");
		control.find(">[data-tab]").removeClass("active");
		control.find(">[data-tab='"+tabName+"']").addClass('active');
	});

	element.bind("change.tab",function(e,tabName){
		window.location.hash=tabName;
	});

	$(window).bind("hashchange",function(){
		var tabName=window.location.hash.slice(1);
		$("#tabs").trigger("change.tab",tabName);
	});

	var firstname=element.find("li:first").attr("data-tab");
	element.trigger("change.tab",firstname);

	return this;
}

var PubSub={
	subscribe:function(ev,callback){
		var calls=this._callbacks || (this._callbacks={});

		(this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);

		return this;
	},
	publish:function(){
		var args=Array.prototype.slice.call(arguments,0);

		var ev=args.shift();

		var list,calls,i,l;
		if(!(call=this._callbacks)) return this;
		if(!(list=this._callbacks[ev])) return this;

		for(i=0; i<list.length; i++){
			list[i].apply(this,args);
		}
		return this;
	}
}

PubSub.subscribe("mysub",function(){
	alert("mysub triggered!");
});

print();
