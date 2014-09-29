sap.ui.controller("com.sndk.poc.tracksalesorder.LineItem", {

	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},


onBeforeRendering : function(evt){
	
	var model = sap.ui.getCore().getModel("statusModel");
	var status = model.getProperty("/itemStatus");
	
	if(status == "Shipped" ){
		this.byId("shipDate").setText("ActualShip Date");
		this.byId("trackingNo").setText("Tracking No");
	}else{
		
		this.byId("shipDate").setText("");
		this.byId("shipDateTxt").setText("");
		this.byId("trackingNo").setText("");
		this.byId("trackingNoTxt").setText("");
	}
//	var sdModel = sap.ui.getCore().getModel("sdModel");
//this.getView().setModel(sdModel) ;
},

handleItemPress:function(evt){
	var sdModel = sap.ui.getCore().getModel("sdModel");
	this.getView().setModel(sdModel) ;
	var model = sap.ui.getCore().getModel("statusModel");
	var status  = model.getProperty("/itemStatus");
	
	if(status == "Shipped" ){
		this.byId("shipDate").setText("ActualShip Date");
		this.byId("trackingNo").setText("Tracking No");
	}else{
		
		this.byId("shipDate").setText("");
		this.byId("shipDateTxt").setText("");
		this.byId("trackingNo").setText("");
		this.byId("trackingNoTxt").setText("");
	}
}

});