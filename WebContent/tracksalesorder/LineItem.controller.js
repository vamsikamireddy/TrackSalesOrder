sap.ui.controller("com.sndk.poc.tracksalesorder.LineItem", {

	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},


onBeforeRendering : function(){
var sdModel = sap.ui.getCore().getModel("sdModel");

this.getView().setModel(sdModel) ;
},

});