jQuery.sap.require("com.sndk.poc.util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui
		.controller(
				"com.sndk.poc.tracksalesorder.Master",
				{

					
					
					
					
					
		handleListItemPress : function(evt) {

			var context = evt.getSource().getBindingContext();
			if (context != null) {
						
						var place = context.toString();
						place = place.substring(place.lastIndexOf("/") + 1);
						var indexModel = new sap.ui.model.json.JSONModel();
						sap.ui.getCore().setModel(indexModel, "indexModel");
						indexModel.setData({
							index : "",
						});
						indexModel.setProperty("/index", place);
						var app = this.getView().app;
						if (app)
							var page = app.getPage("Detail");
						if (page) {
							page.oController.checkStatus(evt);
						}
						this.nav.to("Detail", context);
					}
				
			
		}	,		
					
		handleListSelect : function(evt) {


			var context = evt.getParameter("listItem").getBindingContext();
				if (context != null) {
							
							var place = context.toString();
							place = place.substring(place.lastIndexOf("/") + 1);
							var indexModel = new sap.ui.model.json.JSONModel();
							sap.ui.getCore().setModel(indexModel, "indexModel");
							indexModel.setData({
								index : "",
							});
							indexModel.setProperty("/index", place);
							var app = this.getView().app;
							if (app)
								var page = app.getPage("Detail");
							if (page) {
								page.oController.checkStatus(evt);
							}
							this.nav.to("Detail", context);
						}
					},


		handleFilterBy : function(evt) {
			if (!this._filterDialog)
					{
					this._filterDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.FilterDialog",this);
						}
						this._filterDialog.open();
					},

		handleSortBy : function(evt) {
			 	if (!this._sortDialog)
			 		{
					  this._sortDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.SortByDialog",this);
						}
						this._sortDialog.open();
					},
					
		handleFilter : function(evt){
						var mParams = evt.getParameters();
						var path;
						var key;
						var oFilter;
					 


						var aFilters = [];
						if(sap.ui.getCore().byId("switch").getState()){
							oFilter = new sap.ui.model.Filter("ExcepFlg", sap.ui.model.FilterOperator.EQ, "X");
						}else{
							oFilter = new sap.ui.model.Filter("ExcepFlg", sap.ui.model.FilterOperator.EQ, "");
						}
						aFilters.push(oFilter);

					jQuery.each(mParams.filterItems, function (i, oItem) {
						
						key = oItem.getKey();
						
						path = oItem.oParent.mProperties.key;
						if(path == "HeaderStatus" ){
						var oFilter = new sap.ui.model.Filter(path, sap.ui.model.FilterOperator.Contains, key);
						aFilters.push(oFilter);
						}
						});
					

						var list = this.getView().byId("list"); 
						var binding = list.getBinding("items").filter(aFilters);



						},
						
						
						handleSorting : function(evt){
							var params = evt.getParameters();
							var sorter = new sap.ui.model.Sorter(params.sortItem.mProperties.key, params.sortDescending);
							var list = this.getView().byId("list"); 
							list.getBinding("items").sort(sorter); 
							},



				handleSearch : function(evt) {
						// create model filter
						var filters = [];
						var query = evt.getParameter("query");
						if (query && query.length > 0) {
							var filter = new sap.ui.model.Filter("EndCustomer",
									sap.ui.model.FilterOperator.Contains, query);
							filters.push(filter);
						}

						var list = this.getView().byId("list");
						var binding = list.getBinding("items");
						binding.filter(filters);
					},


					handlePopoverPress : function(oEvent) {


						if (!this._oDialog) {
						this._oDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.Popover", this);
						}




						sap.ui.getCore().byId("EndDate").setValue("");
						sap.ui.getCore().byId("StartDate").setValue("");
						this._oDialog.open();


						},
						  
						  handleDonePress: function (oEvent) {
						 var mm , dd;
						 var _BusyDialog;
						 var obj = this;
						 oEvent.getSource().getParent().close();
						   jQuery.sap.require("sap.m.MessageToast");
						   var startDate = sap.ui.getCore().byId("StartDate").getDateValue();
						   var endDate = sap.ui.getCore().byId("EndDate").getDateValue();
						   if(startDate == null && endDate == null){
						    sap.m.MessageBox.show(
						     "StartDate and EndDate is empty.Please enter StartDate and EndDate", 
						     sap.m.MessageBox.Icon.ERROR,
						     "Error",
						     [sap.m.MessageBox.Action.OK],
						     function() { / * do something * / }
						);
						   }else if(startDate == null){
						    sap.m.MessageBox.show(
						     "StartDate is empty.Please enter StartDate", // Proper messaged required
						     sap.m.MessageBox.Icon.ERROR,
						     "Error",
						     [sap.m.MessageBox.Action.OK],
						     function() { / * do something * / }
						);
						   }else if(endDate == null){
						    sap.m.MessageBox.show(
						     "EndDate is empty.Please enter EndDate", 
						     sap.m.MessageBox.Icon.ERROR,
						     "Error",
						     [sap.m.MessageBox.Action.OK],
						     function() { / * do something * / }
						);
						   }else{
						    
						var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }); 
						var selectedEndDate = dateFormat.format(endDate);
						var selectedStartDate = dateFormat.format(startDate);
						var currentDate = new Date();
						 
						currentDate = dateFormat.format(currentDate);
						    if( selectedStartDate > currentDate | selectedEndDate > currentDate){
						    sap.m.MessageBox.show(
						     " Date selected is future date.Please enter a date on or before " + currentDate, 
						     sap.m.MessageBox.Icon.ERROR,
						     "Error",
						     [sap.m.MessageBox.Action.OK],
						     function() { / * do something * / }
						);
						    }else{
						       var displayFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-YYYY" });      
						  
						       var message = "Fetching data from " + displayFormat.format(startDate) + " to " + displayFormat.format(endDate) ;
						   
						   if (!this._BusyDialog) {
						this._BusyDialog = new sap.m.BusyDialog("BusyIndicator",   
						                {  
						                    showCancelButton :true,  
						                    title : "Please Wait..",  
						                    text : ""
						                    
						                }); 
						}
						   
						   this._BusyDialog.setText(message);
						   this._BusyDialog.open(); 
						   _BusyDialog = this._BusyDialog;


						   startDate = dateFormat.format(startDate) + "T00:00:00";
						   endDate = dateFormat.format(endDate) + "T00:00:00";
						   
						
						 
						    var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/"; 


						   var dataModel = sap.ui.getCore().getModel("myModel");



						   oDataModel = new sap.ui.model.odata.ODataModel(url);             
						 
						if(oDataModel != null)
						{
						var query=  "GetOrders?$filter=FromDate eq datetime'" + startDate + "' and ToDate eq datetime'" + endDate + "'";

						oDataModel.read(query, null, [], true, 
						function(data)
						{
						obj.getView().byId("list").removeSelections();

						_BusyDialog.close(); 
						obj.nav.to("Empty");
						 
						dataModel.setData(data);
						sap.ui.getCore().setModel(dataModel,"myModel");
						 
						},
						function(err)
						{
						_BusyDialog.close(); 
						 
						sap.m.MessageBox.show(
						err.response.statusText,
						     sap.m.MessageBox.Icon.ERROR,
						     err.message,
						     [sap.m.MessageBox.Action.OK],
						     function() { / * do something * / }
						);


						 
						});
						 
						}
						   } 
						   }
						 		  					  
						 },

					handleCancelPress : function(oEvent) {
						oEvent.getSource().getParent().close();
					},

					onBeforeRendering : function() {
						var currentdate = new Date();
						var d = new Date();
						var t = (d.getMonth() - 3) + 1;

						var priorDate = currentdate.getFullYear() + "-" + t
								+ "-" + currentdate.getDate();
																

						var fromdate = new Date(priorDate);

						var dateFormat = sap.ui.core.format.DateFormat
								.getDateInstance({
									pattern : "yyyy-MM-dd"
								});
						todate = dateFormat.format(currentdate) + "T00:00:00";
						fromdate = dateFormat.format(fromdate) + "T00:00:00";



						var detailModel = sap.ui.getCore().getModel("myModel");
						var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";

						var obj = this;

						oDataModel = new sap.ui.model.odata.ODataModel(url);

						if (oDataModel != null) {
							var query = "GetOrders?$filter=FromDate eq datetime'"
									+ fromdate
									+ "' and ToDate eq datetime'"
									+ todate + "'";

							oDataModel.read(query, null, [], true, function(
									data) {
								detailModel.setData(data);
								sap.ui.getCore().setModel(detailModel,"myModel");

								var result = detailModel.getProperty("/results");
							}, function(err) {
								alert("Failure");
								sap.m.MessageBox.show("Failed to connect",
										sap.m.MessageBox.Icon.ERROR, "Error",
										[ sap.m.MessageBox.Action.OK ],
										function() {
											/ * do something * /
										});

							});

						}

					}

				});