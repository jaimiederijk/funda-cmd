var sections = require('./sections');
var data = require('./data');

var routes = {
	init: function() {
		//
		routie('', function() {
			sections.displaySection("home");
			var input={
				query:"amsterdam",
				page:1,
				size:1
			};
			data.searchFunda(input,"crap");
		});
	}

};

module.exports = routes;