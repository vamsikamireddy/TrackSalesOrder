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
	this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
	
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
	this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
},

handleLogoutButton : function(oEvent) {
	 
	  this._actionSheet.close();
	  $.ajax({ 
	  type: "GET", 

	  url: "http://milsapidv21.sandisk.com:8032/sap/public/bc/icf/logoff"//Clear SSO cookies: SAP Provided service to do that 

	  }).done(function(data){ //Now clear the authentication header stored in the browser 
		  
		  sap.m.URLHelper.redirect("http://milsapidv21.sandisk.com:8032/sap/bc/ui5_ui5/sap/zcrm_trackorder/index.html?sap-client=100", false);
	  
		  if (!document.execCommand("ClearAuthenticationCache")) { 
		  } 

	  }) 
},


onClick : function(evt){
	
	var oButton = evt.getSource();
	if (!this._actionSheet) {
		      this._actionSheet = sap.ui.xmlfragment(
		        "com.sndk.poc.tracksalesorder.LogPopover",
		        this
		      );
		      
		    }

		this._actionSheet.openBy(oButton);
},



});