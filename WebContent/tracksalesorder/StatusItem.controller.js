sap.ui.controller("com.sndk.poc.tracksalesorder.StatusItem", {


	


	handleNavBack : function (evt) { 
		this.nav.back("Detail");
	},
	
	onBeforeRendering: function(evt) {
//		alert("StatusItem : onBeforeRendering");
		var keyModel = sap.ui.getCore().getModel("keyModel");
		var key = keyModel.getProperty("/key");
		
		var model = sap.ui.getCore().getModel("itemModel");
		this.getView().setModel(model) ;
		var itemModel = sap.ui.getCore().getModel("sdModel");
		this.byId("itmtable").setModel(itemModel);
		this.byId("idSubIconTabBar").setSelectedKey(key);
	
	},
	
	handleStatusIconPress:function(evt){
		//alert("StatusItem : Press");
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
	
	
//	handleLineItemPress : function(evt) {
//		var context = evt.getSource().getBindingContext();
//		var app = this.getView().app;
//		if (app)
//			var page = app.getPage("StatusLineItem");
//		if (page) {
//			page.oController.handleItemPress(evt);
//		}
//		this.nav.to("StatusLineItem", context);
//
//	},
	handleSubIconTabBarSelect:function(evt){
		 

		/*var context = evt.getSource().getBindingContext().sPath;
		var s = evt.getParameters().selectedItem, a = "T";
		var key = s.mProperties.key;
		var lineItemFilter = new sap.ui.model.Filter("Status",
				sap.ui.model.FilterOperator.EQ, key);
		if (key == "Shipped") {
			this.byId("ShippedItmTable").getBinding("items").filter(
					lineItemFilter);
		} else if (key == "Confirmed") {
			this.byId("ConfirmedItemsTable").getBinding("items").filter(
					lineItemFilter);
		}*/
		   
		
	}

});