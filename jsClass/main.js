// var Class = function(){
// 	var klass= function(){
// 		this.init.apply(this,arguments);
// 		console.log(n);   // n is not define here, but the varible in function won't Instantiate until it called
// 		// nothismethod(); 
// 	};
// 	// klass.prototype.init=function(){};

// 	var n='123';

// 	// return this;  //this return Class object
// 	return klass;    // return new function, not inherited from Class prototype. this scope is different from Class
// };

var Class =function(parent){
	var klass=function(){
		this.init.apply(this,arguments);
	};
	klass.prototype.init=function(){};

	if(parent){
		// klass.prototype=parent; // this will reference window, it's not good!
		var subClass=function(){};
		subClass.prototype=parent.prototype;
		klass.prototype=new subClass;
	}

	return klass;
};

var Person=new Class;  // we can use 'new' cos Class return a 'function'

Person.prototype.init = function(){   // prototype is like a method pointer, once prototype has new method, all instante inherite it will get this method
	console.log("person init");
};
Person.prototype.call=function(){console.log("person call");}

var person= new Person; //only function can use 'new'

console.log(person);

var P=new Class(Person);

var person=new P;

person.call();

objPerson2={
	name:"zhang",
	test:function(){
		console.log(this.name);
	}
}

var objPerson = {
	name: "John Doe",
	age: 32,
	test: {
		name:"jianbo",
		show:function(){
		console.log(this.name);
	}}
};
var proxy=function(func,thisObject){
	return function(){
		return func.apply(thisObject,arguments);
	};
}
var proxy2=function(func,thisObject){
	return func.apply(thisObject,arguments);
};

var clicky={
	name:'clickyname',
	wasClicked:function(){
		console.log("WasClicked");
	},
	addListeners:function(){
		var self=this;
		$('#btn').click(proxy(objPerson2.test,this));
	}
}

$(document).ready(function(){
	clicky.addListeners();
})
