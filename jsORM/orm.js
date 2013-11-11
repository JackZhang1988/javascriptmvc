var Model = {
	inherited:function(){},
	created: function(){},

	extend:function(o){
		var extended = o.extended;
		$.extend(this,o);
		if(extended){
			extend(this);
		}
	},
	include:function(o){
		var included = o.included;
		jQuery.extend(this.prototype,o);
		if(included){
			include(this);
		}
	},

	prototype:{
		init: function(){}
	},
	create: function(){
		var object= Object.create(this);
		object.parent=this;
		object.prototype = object.fn = Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},
	init:function() {
		var instance = Object.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance,arguments);
		return instance;
	}
}

Model.extend({
    find:function(id){
        return this.records[id] ;
    }
});

Model.include({
    init:function(attrs){},
    load:function(attributes){}
});
Model.records = {};
Model.include({
    newRecord:true,
    create:function(){
        this.newRecord = false;
        this.parent.records[this.id] = this;
    },
    destroy:function(){
        delete this.parent.records[this.id];
    }
})

Model.include({
    update: function(){
        this.parent.records[this.id] =this;
    }
});

Model.include({
    save:function(){
        this.newRecord ? this.create() : this.update();
    }
})
var Asset = Model.create();

var asset = Asset.init();
asset.name = "same, same";
asset.id=1;
asset.save();

var asset2 = Asset.init();
asset2.name= "differnt";
asset2.id=2;
asset2.save();

console.log(Asset.find(2).name);
