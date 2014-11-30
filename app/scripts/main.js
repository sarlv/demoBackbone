(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {}
	}

	Backbone.history.start({
		pushState: false
	});

	App.Routers.Pages = Backbone.Router.extend({
		routes: {
			'main': 'main',
			'about': 'about'
		},

		main: function() {
			var listView = new App.Views.List();
		},

		about: function() {
			var listPage = new App.Views.Page();
		}
	});

	App.Models.List = Backbone.Model.extend({
		defaults: {
			title: '',
			priority: 0
		}
	});

	App.Collections.List = Backbone.Collection.extend({
		model: App.Models.List,
		url: '/data.json'
	});

	App.Views.List = Backbone.View.extend({
		el: '.wrapper',

		template: _.template( $('#list').html() ),

		collection: new App.Collections.List(),

		initialize: function() {
			this.render();
		},

		render: function() {

			var self = this,
			    obj = this.collection.fetch();
			
			this.$el.html('<h1>Main page!</h1>');

			obj.then(function( models ) {
				_.each(models, function( model ) {
					self.$el.append( self.template( model ) , self);
				});

			});

			return this;

		}
	});

	App.Views.Page = Backbone.View.extend({
		el: '.wrapper',

		events: {
			'click h1': 'addStyle'
		},

		initialize: function() {
			this.render();
		},

		render: function() {

			this.$el.html('<h1>About page!</h1>');

			return this;

		},

		addStyle: function() {
			alert('Hi');
		}
	});

	var page = new App.Routers.Pages();


}());



















