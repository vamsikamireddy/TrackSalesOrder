sap.ui.controller("com.sndk.poc.tracksalesorder.LineItem", {

	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},


onBeforeRendering : function(evt){
	
	var model = sap.ui.getCore().getModel("statusModel");
	var status = model.getProperty("/itemStatus");
	
	if(status == "Shipped" ){
		this.byId("shipDate").setVisible(true);
		this.byId("shipDateTxt").setVisible(true);
		this.byId("trackingNo").setVisible(true);
		this.byId("trackingNoTxt").setVisible(true);

	}else{
		this.byId("shipDate").setVisible(false);
		this.byId("shipDateTxt").setVisible(false);
		this.byId("trackingNo").setVisible(false);
		this.byId("trackingNoTxt").setVisible(false);

	}


},

handleItemPress:function(evt){
	var sdModel = sap.ui.getCore().getModel("sdModel");
	this.getView().setModel(sdModel) ;
	var model = sap.ui.getCore().getModel("statusModel");
	var status  = model.getProperty("/itemStatus");
	
	if(status == "Shipped" ){
		this.byId("shipDate").setVisible(true);
		this.byId("shipDateTxt").setVisible(true);
		this.byId("trackingNo").setVisible(true);
		this.byId("trackingNoTxt").setVisible(true);

	}else{
		this.byId("shipDate").setVisible(false);
		this.byId("shipDateTxt").setVisible(false);
		this.byId("trackingNo").setVisible(false);
		this.byId("trackingNoTxt").setVisible(false);

	}


},



				

});