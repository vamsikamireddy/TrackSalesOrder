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
		this.byId("shipDate").setVisible(false);
		this.byId("shipDateTxt").setVisible(false);
		this.byId("trackingNo").setVisible(false);
		this.byId("trackingNoTxt").setVisible(false);
	}else{
		this.byId("shipDate").setVisible(true);
		this.byId("shipDateTxt").setVisible(true);
		this.byId("trackingNo").setVisible(true);
		this.byId("trackingNoTxt").setVisible(true);
	}


},

handleNavigation : function(evt){
	var model = sap.ui.getCore().getModel("modelDetail");
	var modelName = model.getProperty("/modelName");
	var modelPath = model.getProperty("/modelPath");

	var itemModel = sap.ui.getCore().getModel(modelName);
	this.getView().setModel(itemModel) ;
	if(modelPath.indexOf("Shipped") < 0){
		this.byId("shipDate").setVisible(false);
		this.byId("shipDateTxt").setVisible(false);
		this.byId("trackingNo").setVisible(false);
		this.byId("trackingNoTxt").setVisible(false);
	}else{
		this.byId("shipDate").setVisible(true);
		this.byId("shipDateTxt").setVisible(true);
		this.byId("trackingNo").setVisible(true);
		this.byId("trackingNoTxt").setVisible(true);
	}

},





});