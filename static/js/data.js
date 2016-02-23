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