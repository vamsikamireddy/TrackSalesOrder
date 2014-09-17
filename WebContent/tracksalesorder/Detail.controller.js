jQuery.sap.require("com.sndk.poc.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");


sap.ui.controller("com.sndk.poc.tracksalesorder.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
		  	  
		  handleLinkPress : function (evt) {
			  var id;
			  var woid;
			  var approverName = evt.oSource.mProperties.text;
			  

			  	var apprvModel = sap.ui.getCore().getModel("apprvlModel");
			  	var oData = apprvModel.getProperty("/results");
			  	


				
				for(var i=0;i<oData.length;i++){
					if(oData[i].Approver == approverName){
						id = oData[i].ApproverId;
						woid = oData[i].SOrd;
						break;
					}
				}
				var idModel = new  sap.ui.model.json.JSONModel();
				var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
				var obj = this;
				var oDataModel = new sap.ui.model.odata.ODataModel(url);
				if(oDataModel!=null){

					var query = "GetEmail('" + id + "')";
					oDataModel.read(query,null,[],true,
					function(data){						
						idModel.setData(data);
						sap.ui.getCore().setModel(idModel, "idModel");
						var email = idModel.getProperty("/EMail");
						  
						  sap.m.URLHelper.triggerEmail(email, " Workorder Notification : " +woid+ " " );
								  					  
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
						nav.to("Empty");
					}
					);
				}	
		  },  
		  
		  
		  HandleImagePress : function(evt) {
			  	var context = evt.oParent.oBindingContexts.sPath;
				var myModel1 = sap.ui.getCore().getModel("apprvlModel");
				var comment = myModel1.getProperty("/Approver");
			  
			  sap.m.MessageBox.show( comment,
					  				sap.m.MessageBox.Icon.INFORMATION,
					  				"Comments",
					  				[sap.m.MessageBox.Action.OK]);
		  },
		  
		  handleViewExcPress : function(evt) {
			  
			  sap.m.MessageBox.show( "comment",
		  				sap.m.MessageBox.Icon.INFORMATION,
		  				"Exception Reasons",
		  				[sap.m.MessageBox.Action.OK]);
		  },
		  
		  handleLineItemPress : function(evt) {
			  var context = evt.getSource().getBindingContext();
				this.nav.to("LineItem", context);
			  
		  },
		  
		  handleRowSelection:function(evt){
			  var currentRowContext = oEvent.getParameter("rowContext"); 
			  var selSysId = oSystemDetailsML.getProperty("Approver Name", currentRowContext);
			 // var selDesc = oSystemDetailsML.getProperty("", currentRowContext);
		  },
		  
		  checkStatus: function(evt){			  
			  
				var myModel = sap.ui.getCore().getModel("indexModel");
				var index = myModel.getProperty("/index");
				     

				var myModel = sap.ui.getCore().getModel("myModel");
				var check = myModel.getProperty("/results");
				var status = check[index].InSD;
				var excptn = check[index].ExcepFlg;
				var ord = check[index].SOrd;
				
			//   Begin of Approval History Tab
				
				var apprvlModel = new  sap.ui.model.json.JSONModel();
				var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
				var obj = this;
				var oDataModel = new sap.ui.model.odata.ODataModel(url);
				if(oDataModel!=null){

					var query = "GetOrdApprovers?$filter=SOrd eq '" + ord + "'";
					oDataModel.read(query,null,[],true,
					function(data){
						
						apprvlModel.setData(data);
						sap.ui.getCore().setModel(apprvlModel, "apprvlModel");
						obj.byId("approvalHistory").setModel(apprvlModel);

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
						nav.to("Empty");
					}
					);
				}
				

			//   Begin of Ship To Address Tab
				
				var shipModel = new  sap.ui.model.json.JSONModel();
			
				if(oDataModel!=null){

					var shpquery = "GetOrdPartners?$filter=SOrd eq '" + ord + "'";
					oDataModel.read(shpquery,null,[],true,
					function(data){		
						
						for(var j=0;j<data.results.length;j++){
							if(data.results[j].CustType == "Ship to"){
								shipModel.setData(data.results[j]);
								break;
							}
								
						}
						
						
						sap.ui.getCore().setModel(shipModel, "shipModel");
						obj.byId("SupplierForm").setModel(shipModel);

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
						nav.to("Empty");
					}
					);
				}

				//   End of Ship To Address Tab
				var filters = [];
			
				var exceptionFilter = new sap.ui.model.Filter("ItemException", sap.ui.model.FilterOperator.NE, "");
				filters.push(exceptionFilter);
				//  Begin of Sales Order Line Items & Exception Tab

				var sdModel = new  sap.ui.model.json.JSONModel();
				if(oDataModel!=null){
					var sdquery = "GetOrdDetail?$filter=SOrd eq '" + ord + "'";
					oDataModel.read(sdquery,null,[],true,
					function(data){
						

						sdModel.setData(data);
						sap.ui.getCore().setModel(sdModel, "sdModel");
						obj.byId("itmtable").setModel(sdModel);
						obj.byId("exception").setModel(sdModel);
						//obj.byId("exception").bindRows("/results",null,null,filters);
						obj.byId("exception").getBinding("rows").filter(filters);
//						obj.byId("itmtable").bindRows({  
//						     path: '/results',  
//						     template: null,  
//						     sorter: null,  
//						     filters:  [new sap.ui.model.Filter("ItemException", sap.ui.model.FilterOperator.EQ, "")]  
//						}); 
//						obj.byId("exception").bindRows({  
//						     path: '/results',  
//						     template: null,  
//						     sorter: null,  
//						     filters:  [new sap.ui.model.Filter("ItemException", sap.ui.model.FilterOperator.NE, "")]  
//						}); 
						
						
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
						nav.to("Empty");
					}
					);
				}

				//  End of Sales Order Line Items Tab		

				var gtsts = this.byId("IconTabBar").getSelectedKey();
				
				if (status ==""){
					status = "Y";					
				}
				
				if (excptn == "X"){
					excptn = "Z";
						}
				
			 if (status =="X" && excptn == "Z") {
				 this.byId("exceptionid").setVisible(true);
				 this.byId("sditem").setVisible(true);
					if (excptn != gtsts){
						this.byId("IconTabBar").setSelectedKey(excptn);
						this.byId("exceptionid").setKey(excptn);
					}
				}
				
				else if (status == "X" && excptn == ""){
					this.byId("exceptionid").setVisible(false);
					this.byId("sditem").setVisible(true);
					if (status != gtsts){				
					this.byId("IconTabBar").setSelectedKey(status);
					this.byId("sditem").setKey(status);
				}
				}
				
				else{
					this.byId("exceptionid").setVisible(false);
					this.byId("sditem").setVisible(false);
					if (status != gtsts){
					this.byId("IconTabBar").setSelectedKey(status);
					this.byId("approval").setKey(status);
					
				}
					
				}
			 if (status == "X") {

					this.byId("StatusText").setText("Approved Order") ;

					}
					else{
					this.byId("StatusText").setText("Sample Request") ;
					}
					
		 },
	
		 
	onBeforeRendering:function(){
		
		
		var indexModel = sap.ui.getCore().getModel("indexModel");
		var index = indexModel.getProperty("/index");
		     

		var myModel = sap.ui.getCore().getModel("myModel");
		
		var check = myModel.getProperty("/results");
		var ord = check[index].SOrd;

		
//   Begin of Approval History Tab
		
var apprvlModel = new  sap.ui.model.json.JSONModel();
var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
var obj = this;
var oDataModel = new sap.ui.model.odata.ODataModel(url);
if(oDataModel!=null){

	var query = "GetOrdApprovers?$filter=SOrd eq '" + ord + "'";
	oDataModel.read(query,null,[],true,
	function(data){
		
		apprvlModel.setData(data);
		sap.ui.getCore().setModel(apprvlModel, "apprvlModel");
		obj.byId("approvalHistory").setModel(apprvlModel);
		 	
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
		nav.to("Empty");
	}
	);
}

//   End of Approval History Tab

//   Begin of Ship To Address Tab
var index;
var shipModel = new  sap.ui.model.json.JSONModel();

if(oDataModel!=null){

	var shpquery = "GetOrdPartners?$filter=SOrd eq '" + ord + "'";
	oDataModel.read(shpquery,null,[],true,
	function(data){		
		for(var j=0;j<data.results.length;j++){
			
			if(data.results[j].CustType == "Ship to"){
				shipModel.setData(data.results[j]);
				break;
			}
				
		}
		
		
		sap.ui.getCore().setModel(shipModel, "shipModel");
		obj.byId("SupplierForm").setModel(shipModel);
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
		nav.to("Empty");
	}
	);
}

//   End of Ship To Address Tab


//  Begin of Sales Order Line Items & Exception Tab

var sdModel = new  sap.ui.model.json.JSONModel();
if(oDataModel!=null){
	var sdquery = "GetOrdDetail?$filter=SOrd eq '" + ord + "'";
	oDataModel.read(sdquery,null,[],true,
	function(data){
		
		sdModel.setData(data);
		sap.ui.getCore().setModel(sdModel, "sdModel");
		obj.byId("itmtable").setModel(sdModel);
		obj.byId("exception").setModel(sdModel);
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
		nav.to("Empty");
	}
	);
}

//  End of Sales Order Line Items Tab		
		

		var status = check[index].InSD;
		var excptn = check[index].ExcepFlg;
		
		
		if (status =="X" && excptn == "X") {
			this.byId("exceptionid").setVisible(true);
				this.byId("IconTabBar").setSelectedKey(excptn);
				this.byId("exceptionid").setKey(excptn);
				this.byId("sditem").setVisible(true);
		}
		else if (status == "X" && excptn == ""){
			this.byId("exceptionid").setVisible(false);
			this.byId("sditem").setVisible(true);
			this.byId("IconTabBar").setSelectedKey(status);
			this.byId("sditem").setKey(status);
		}
		else{
			this.byId("exceptionid").setVisible(false);
			this.byId("sditem").setVisible(false);
			status = "Y";
			this.byId("IconTabBar").setSelectedKey(status);
			this.byId("approval").setKey(status);
		}
		if (status == "X") {

			this.byId("StatusText").setText("Approved Order") ;

			}
			else{
			this.byId("StatusText").setText("Sample Request") ;
			}
		}
		
		

});