var sections = require('./sections');
var data = require('./data');

var routes = {
	init: function() {
		//
		routie('', function() {
			sections.displaySection("home");
			var input={
				query:"amsterdam/woonhuis",
				page:1,
				size:1
			};
			data.searchFunda(input);
		});
	}

};

module.exports = routes;