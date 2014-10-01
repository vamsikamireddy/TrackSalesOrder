sap.ui.controller("com.sndk.poc.tracksalesorder.StatusItem", {


	


	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},
	
	onBeforeRendering: function(evt) {
		var keyModel = sap.ui.getCore().getModel("keyModel");
		var key = keyModel.getProperty("/key");
		
		var model = sap.ui.getCore().getModel("itemModel");
		this.getView().setModel(model) ;
		var itemModel = sap.ui.getCore().getModel("sdModel");
		this.byId("itmtable").setModel(itemModel);
		this.byId("idSubIconTabBar").setSelectedKey(key);
		this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
		if(jQuery.device.is.phone){
			this.byId("header").setText("");
		}
	
	},
	
	handleStatusIconPress:function(evt){
		var keyModel = sap.ui.getCore().getModel("keyModel");
		var key = keyModel.getProperty("/key");
		
		var model = sap.ui.getCore().getModel("itemModel");
		this.getView().setModel(model) ;
		var itemModel = sap.ui.getCore().getModel("sdModel");
		this.byId("itmtable").setModel(itemModel);
		if(this.byId("idSubIconTabBar").getSelectedKey() == key){
			
		}else {
			this.byId("idSubIconTabBar").setSelectedKey(key);
		}
		this.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
		if(jQuery.device.is.phone){
			this.byId("header").setText("");
		}
	},
	
	handleStatusLineItemPress:function(evt){
		var path = evt.getSource().getBindingContext().sPath;
		var context =  evt.getSource().getBindingContext();
		var model = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(model, "modelDetail");
		model.setData({
			modelName : "",
			modelPath : ""
		});
		
		if(path.indexOf("results") != -1){
			var status = evt.getSource().getBindingContext().getModel().getProperty(path + "/Status");
			model.setProperty("/modelName", "sdModel");
			model.setProperty("/modelPath", status);
		}else{
			model.setProperty("/modelName", "itemModel");
			model.setProperty("/modelPath",path);
		}
		
		var app = this.getView().app;
		if (app)
			var page = app.getPage("StatusLineItem");
		if (page) {
			page.oController.handleNavigation(evt);
		}
		this.nav.to("StatusLineItem", context);
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

	
	

	handleSubIconTabBarSelect:function(evt){

	}

});