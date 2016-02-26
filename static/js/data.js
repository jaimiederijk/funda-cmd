var data = {
	config : {
		fundaBaseUrl:"http://funda.kyrandia.nl",
		fundaKey:"e2d60e885b8742d4b0648300e3703bd7"
	},
	positiveQueries: [],
	negativeQueries: [],
	//newQuery: {},
	seenList: [],
	addQueries : function (posorneg) {
		this[posorneg].push({
			soort:data.currentHouse.ObjectType,
			kamers:data.currentHouse.AantalKamers,
			woonoppervlakte:data.currentHouse.WoonOppervlakte,
			perceeloppervlakte:data.currentHouse.PerceelOppervlakte,
			energielabel:data.currentHouse.Energielabel.Label,
			prijs:data.currentHouse.KoopPrijs
		})
	},
	createNewQuery : function () {
		var input={};
		var queryCreator = require('./queryCreator');
		var city = geoplugin_city();
		var soort = queryCreator.soort()
		var query; 
		if (city =="") {
			city="amsterdam"
		}
		query = city + "/" + soort + "/" + queryCreator.kamers() + "/" + queryCreator.woonoppervlakte() + "/" + queryCreator.perceeloppervlakte() + "/" + queryCreator.prijs();
		if (soort=="woonhuis") {
			query += "/" + queryCreator.energielabel();
		}
		input = {
			query:query,
			page:1,
			size:25
		}
		this.searchFunda(input)
	},
	searchFunda : function (input) {//input should be a object that contains query , pagnumber(page) and pagesize(size)
		var query = input;
		var sections = require('./sections');
		var url = this.config.fundaBaseUrl + '/feeds/Aanbod.svc/json/' + this.config.fundaKey + '/?type=koop&zo=/' + input.query + '/&page='+ input.page + '&pagesize=' + input.size;
		var self = this;
		promise.get(url).then(function(error, text, xhr){
			if (error) {
		        alert('Error ' + xhr.status);
		        return;
		    }
		    // console.log(text)
		    self.searchedHouses = JSON.parse(text);
		    self.filterHasShown(self.searchedHouses);
		    //sections.renderHouses();
		})
	},
	filterHasShown : function(searchedHouses) {

		var goodArray = _.filter( searchedHouses.Objects,function(item) {
			return !_.contains(data.seenList, item.id); 
		});
		var id = goodArray[0].Id;
		this.getFundaObject(id);
	},
	getFundaObject : function (id) {//
		var sections = require('./sections');
		var url = this.config.fundaBaseUrl + '/feeds/Aanbod.svc/json/detail/' + this.config.fundaKey + '/koop/' + id + '/';
		var self = this;
		promise.get(url).then(function(error, text, xhr){
			if (error) {
		        console.log('Error ' + xhr.status);
		        return;
		    }
		    // console.log(text)
		    self.currentHouse = JSON.parse(text);
		    sections.renderHouses(self.currentHouse);
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