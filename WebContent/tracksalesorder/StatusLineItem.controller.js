sap.ui.controller("com.sndk.poc.tracksalesorder.StatusLineItem", {

	handleNavBack : function (evt) { 
		this.nav.back("StatusItem");
	},


onBeforeRendering : function(){
	var model = sap.ui.getCore().getModel("modelDetail");
	var modelName = model.getProperty("/modelName");
	var modelPath = model.getProperty("/modelPath");

	
	var itemModel = sap.ui.getCore().getModel(modelName);
	this.getView().setModel(itemModel) ;
	
	if(modelPath.indexOf("Shipped") < 0){
		this.byId("shipDate").setText("");
		this.byId("shipDateTxt").setText("");
		this.byId("trackingNo").setText("");
		this.byId("trackingNoTxt").setText("");
	}else{
		this.byId("shipDate").setText("ActualShip Date");
		this.byId("trackingNo").setText("Tracking No");
	}
	
},

handleNavigation : function(evt){
	var model = sap.ui.getCore().getModel("modelDetail");
	var modelName = model.getProperty("/modelName");
	var modelPath = model.getProperty("/modelPath");

	var itemModel = sap.ui.getCore().getModel(modelName);
	this.getView().setModel(itemModel) ;
	if(modelPath.indexOf("Shipped") < 0){
		this.byId("shipDate").setText("");
		this.byId("shipDateTxt").setText("");
		this.byId("trackingNo").setText("");
		this.byId("trackingNoTxt").setText("");
	}else{
		this.byId("shipDate").setText("ActualShip Date");
		this.byId("trackingNo").setText("Tracking No");
	}
}
	

//handleItemPress:function(evt){
//	var sdModel = sap.ui.getCore().getModel("sdModel");
//	this.getView().setModel(sdModel) ;
//}


});