var data = require('./data');
var htmlElements = require('./htmlElements');


var sections = {
	hideAllSections : function () {
		var sections = htmlElements.sections;
		for (var i = 0; i < sections.length; i++) { //hide all sections via loop
			sections[i].classList.remove("show");
			sections[i].classList.add("hidden");
			//sections[i].classList.remove("notransition");
		};
	},
	displaySection : function (sectionName) {
		this.hideAllSections();
		var section = htmlElements[sectionName];
		section.classList.remove("hidden");
		section.classList.add("show");
	},
	renderHouses : function (data) {
		var temp = htmlElements.houses;
		var housesData = data;
		debugger
		Transparency.render(temp, housesData.objects);
	}
};

module.exports = sections;