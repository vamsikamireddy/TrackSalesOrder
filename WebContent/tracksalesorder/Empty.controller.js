sap.ui.controller("com.sndk.poc.tracksalesorder.Empty", {

onBeforeRendering:function(){
	var obj = this;
	var nameModel = new  sap.ui.model.json.JSONModel();
	var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
	var oDataModel = new sap.ui.model.odata.ODataModel(url);
	if(oDataModel!=null){
		var nquery = "GetName('X')" ;
		oDataModel.read(nquery,null,[],true,
		function(data){
			nameModel.setData(data);
			sap.ui.getCore().setModel(nameModel, "nameModel");
			
			obj.byId("header").setModel(nameModel);
		},
		function(err){
			var msg =  err.response.statusText;
			sap.m.MessageBox.show( 
				     msg,
				      sap.m.MessageBox.Icon.ERROR,
				      err.message,
				      [sap.m.MessageBox.Action.OK],
				      function() { / * do something * / }
					 );
			
		}
		);
	}
},

onClick : function(evt){
	
//	  if (! this._oPopover) {
//	      this._oPopover = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.LogPopover",this);
//	    }
//	  this._oPopover.openBy(evt.getSource());
	var oButton = evt.getSource();
	   if (!this._actionSheet) {
		      this._actionSheet = sap.ui.xmlfragment(
		        "com.sndk.poc.tracksalesorder.LogPopover",
		        this
		      );
		     // this.getView().addDependent(this._actionSheet);
		    }

		    this._actionSheet.openBy(oButton);
},


handleLogoutButton : function(oEvent) {
	 
	  this._actionSheet.close();
	  $.ajax({ 
	  type: "GET", 

	  url: "http://milsapidv21.sandisk.com:8032/sap/public/bc/icf/logoff"//Clear SSO cookies: SAP Provided service to do that 

	  }).done(function(data){ //Now clear the authentication header stored in the browser 
		  
		  sap.m.URLHelper.redirect("http://milsapidv21.sandisk.com:8032/sap/bc/ui5_ui5/sap/zcrm_trackorder/index.html?sap-client=100", false);
	  
		  if (!document.execCommand("ClearAuthenticationCache")) { 

	  //"ClearAuthenticationCache" will work only for IE. Below code for other browsers 

	

	  } 

	  }) 
}

});