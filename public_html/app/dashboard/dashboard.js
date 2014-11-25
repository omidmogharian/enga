define(function() {
	
	function Dashboard() {}
	
	//By overwriting init function you can extned or totally change module initilization 
	//Dashboard.prototype.init function init() {engaModule.init.call(this)}

	// this function will be called after inilizing module in init function
	Dashboard.prototype.postInit =function postInit() {
		//Here do what ever you want
		//with this.getNgModule() you have current angular module
		//in this.getProprety() you have all confing data
		return this;
	};

	ns.app || (ns.app ={});
	return ns.app.Dashboard = Dashboard;
})