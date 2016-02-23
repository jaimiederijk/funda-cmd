(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var data = {
	config : {
		fundaBaseUrl:"http://funda.kyrandia.nl",
		fundaKey:"e2d60e885b8742d4b0648300e3703bd7"
	},
	searchFunda : function (input,target) {//input should be a object that contains query , pagnumber(page) and pagesize(size)
		var query = input;
		var sections = require('./sections');
		var url = this.config.fundaBaseUrl + '/feeds/Aanbod.svc/json/' + this.config.fundaKey + '/?type=koop&zo=/' + input.query + '/&page='+ input.page + '&pagesize=' + input.size;

		promise.get(url).then(function(error, text, xhr){
			if (error) {
		        alert('Error ' + xhr.status);
		        return;
		    }
		    console.log(text)
		    self[target] = JSON.parse(text);
		    sections.renderHouses(self[target]);
		})
	},
	requestGeoLocationIP:function () {
		var geoData = {
			city : geoplugin_city(),
			longitude : geoplugin_longitude(),
			latitude : geoplugin_latitude()
		};
		return geoData;
	},

};

module.exports = data;
},{"./sections":6}],2:[function(require,module,exports){
var data = require('./data');
var map;

var googleMap = {
	getCordinates : function(target) {
		var myLatLng = {
		      lat: data[target].latitude,
		      lng: data[target].longitude
		};
		return myLatLng
	},
	setupMap : function () {
		if (document.getElementById('map-canvas')){

		    // Coordinates to center the map
		    var myLatlng = new google.maps.LatLng(0,0);

		    // Other options for the map, pretty much selfexplanatory
		    var mapOptions = {
		        zoom: 1,
		        center: myLatlng,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

		    // Attach a map to the DOM Element, with the defined settings
			map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions );

		}
	},
	setupMarker : function (target) {
		var image = {
			url: "static/images/dot.png",
		    scaledSize: new google.maps.Size(20, 20), // scaled size
		    origin: new google.maps.Point(0,0), // origin
		    anchor: new google.maps.Point(0, 0) // anchor
		};

		var marker = new google.maps.Marker({
		    position: this.getCordinates(target),
		    map: map,
		    title: target,
		    icon: image
		});
	}
};

module.exports = googleMap;
},{"./data":1}],3:[function(require,module,exports){
var htmlElements = {
	body: document.querySelector('body'),
	navLi: document.querySelectorAll('nav li'),
	sections: document.querySelectorAll('section'),
	houses: document.querySelectorAll('#houses-template'),
	home: document.querySelector('#start')
};

module.exports = htmlElements;
},{}],4:[function(require,module,exports){
//(function(){
	'use strict';

	var routes = require('./routes');
	var ui = require('./ui');
	var sections = require('./sections');
	var googleMap = require('./googleMap');


	var app = {
		init: function() {
			// sections.firstHideAllSections();
			routes.init();
			//googleMap.setupMap();
			//sections.refreshIssMarker.markerInterval();
			//ui.setupEvents();
			//ui.setupGestures();
		}
	};

	app.init();

//})();
},{"./googleMap":2,"./routes":5,"./sections":6,"./ui":7}],5:[function(require,module,exports){
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
},{"./data":1,"./sections":6}],6:[function(require,module,exports){
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
},{"./data":1,"./htmlElements":3}],7:[function(require,module,exports){
var htmlElements = require('./htmlElements');
var sections = require('./sections');

var ui = {
	setupEvents : function () {
		document.addEventListener("touchstart", function(){}, true)
		htmlElements.movieSearch.addEventListener("submit", function () {
				sections.setupMovieSearched(event.target[0].value);
		});
	},
	setupGestures : function () {
		var hammertime = new Hammer(htmlElements.body);
		hammertime.on('swiperight', function(ev) {
		    ui.switchSection("right");			    
		});
		hammertime.on('swipeleft', function(ev) {
		    ui.switchSection("left");			    
		});
	},
	switchSection : function (direction) {
		var newShow;
		var newSection;
		var current = _.findIndex(htmlElements.navLi, function(item) {
			return item.dataset.section==window.location.hash;
		})			
		if ( direction === "right" ) {
			newShow = current == htmlElements.navLi.length-1 ? 0 : current+1;	
		} else if ( direction === "left" ) {
			newShow = current == 0 ? htmlElements.navLi.length-1 : current-1;
		}
		newSection = htmlElements.navLi[newShow].dataset.section;
		routie(newSection);
	}
}

module.exports = ui;
},{"./htmlElements":3,"./sections":6}]},{},[4]);
