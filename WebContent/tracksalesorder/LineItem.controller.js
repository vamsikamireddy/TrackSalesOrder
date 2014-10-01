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
	this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
	if(jQuery.device.is.phone){
		this.byId("header").setText("");
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

	this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
	if(jQuery.device.is.phone){
		this.byId("header").setText("");
	}
},

handleLoginDetails:function(evt){
	this._actionSheet.close();
	if (! this._oDialog) {
	      this._oDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.LoginDetails", this);
	    }
	this._oDialog.setModel(sap.ui.getCore().getModel("nameModel"));
    this._oDialog.open();	
},

onDialogCloseButton: function (oEvent) {
    this._oDialog.close();
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

					onClick : function(evt) {

						var oButton = evt.getSource();
						if (!this._actionSheet) {
							this._actionSheet = sap.ui.xmlfragment(
									"com.sndk.poc.tracksalesorder.LogPopover",
									this);

						}

						this._actionSheet.openBy(oButton);
					},

});