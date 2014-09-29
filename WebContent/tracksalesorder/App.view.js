sap.ui.jsview("com.sndk.poc.tracksalesorder.App", {

	getControllerName: function () {
		return "com.sndk.poc.tracksalesorder.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display 
		this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp();

		
		// load the master page
		var master = sap.ui.xmlview("Master", "com.sndk.poc.tracksalesorder.Master");
		master.app = this.app;
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the empty page
		var empty = sap.ui.xmlview("Empty", "com.sndk.poc.tracksalesorder.Empty");
		this.app.addPage(empty, false);
		
		// load the detail page
		var detail = sap.ui.xmlview("Detail", "com.sndk.poc.tracksalesorder.Detail");
		detail.app = this.app;
		detail.getController().nav = this.getController();
		this.app.addPage(detail, false);
		
		var statusItem = sap.ui.xmlview("StatusItem", "com.sndk.poc.tracksalesorder.StatusItem");
		statusItem.app = this.app;
		statusItem.getController().nav = this.getController();
		this.app.addPage(statusItem, false);
		
		var lineItem = sap.ui.xmlview("LineItem", "com.sndk.poc.tracksalesorder.LineItem");
		lineItem.getController().nav = this.getController();
		this.app.addPage(lineItem, false);
		
		// done
		return this.app;
	}
});