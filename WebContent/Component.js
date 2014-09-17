jQuery.sap.declare("com.sndk.poc.Component");

sap.ui.core.UIComponent.extend("com.sndk.poc.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "com.sndk.poc.tracksalesorder.App",
			type : "JS",
			viewData : { component : this }
		});

		
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
			});

			oView.setModel(i18nModel,"i18n");

		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
		isPhone : jQuery.device.is.phone,
		isNoPhone : !jQuery.device.is.phone,
		listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
		listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		
		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(oModel, "myModel");
		oView.setModel(oModel);

		// done
		return oView;
	}
});