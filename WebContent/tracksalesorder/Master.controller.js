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
						if (!this._filterDialog) {
							this._filterDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.FilterDialog",this);
						}
						var filterModel = sap.ui.getCore().getModel("filterModel");
						this._filterDialog.setModel(filterModel);
						this._filterDialog.open();
					},

					handleSortBy : function(evt) {
						if (!this._sortDialog) {
							this._sortDialog = sap.ui.xmlfragment("com.sndk.poc.tracksalesorder.SortByDialog",this);
						}
						this._sortDialog.open();
					},
					

					handleFilter : function(evt) {
						var mParams = evt.getParameters();
						var path;
						var key;
						var oFilter;

						var aFilters = [];
						jQuery.each(mParams.filterItems, function(i, oItem) {

							key = oItem.getKey();

							path = oItem.oParent.mProperties.key;
							if (path == "ExcepFlg") {
								oFilter = new sap.ui.model.Filter("ExcepFlg",
										sap.ui.model.FilterOperator.EQ, key);
								aFilters.push(oFilter)
							} else {
								var oFilter = new sap.ui.model.Filter(path,
										sap.ui.model.FilterOperator.Contains,
										key);
								aFilters.push(oFilter);
							}
						});
						var list = this.getView().byId("list");
						var binding = list.getBinding("items").filter(aFilters);
						this.getView().byId("list").removeSelections();
						if(!jQuery.device.is.phone){
							this.nav.to("Empty");
						}
					},

					handleSorting : function(evt){
							var params = evt.getParameters();
							var sorter = new sap.ui.model.Sorter(params.sortItem.mProperties.key, params.sortDescending);
							var list = this.getView().byId("list"); 
							list.getBinding("items").sort(sorter); 
					},



				handleSearch : function(evt) {
						var filters = [];
						var query = evt.getParameter("query");		

						// update list binding
						var list = this.getView().byId("list");		
						var binding = list.getBinding("items");
						
						
						binding.filter(
								!query? [] :[
								             new sap.ui.model.Filter(
								            		 [
								            		  new sap.ui.model.Filter("EndCustomer",sap.ui.model.FilterOperator.Contains, query),
								            		  new sap.ui.model.Filter("SOrd",sap.ui.model.FilterOperator.Contains, query)
								            		  
								            		  ]
								            		  )
								             ]
								);
						
					},
					
					handleLiveChange:function(evt){
						var filters = [];
						var query = evt.getParameter("newValue");
						
						var list = this.getView().byId("list");
						var binding = list.getBinding("items");
					
						
						binding.filter(
								!query? [] :[
								             new sap.ui.model.Filter(
								            		 [
								            		  new sap.ui.model.Filter("EndCustomer",sap.ui.model.FilterOperator.Contains, query),
								            		  new sap.ui.model.Filter("SOrd",sap.ui.model.FilterOperator.Contains, query)
								            		  
								            		  ]
								            		  )
								             ]
								);
						
						
						
						
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
						   
						
						   	var url = "/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
						    //var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/"; 


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
							dataModel.setData(data);
							sap.ui.getCore().setModel(dataModel,"myModel");
							if(!jQuery.device.is.phone){
								obj.nav.to("Empty");
							}
							
						 
						},
						function(err)
						{
						_BusyDialog.close(); 
						 
						sap.m.MessageBox.show(
						"Unable to fetch data from server",
						     sap.m.MessageBox.Icon.ERROR,
						     "Error",
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
				

						var fromdate;
						var todate;
						var busyDialog;
						var context;
						if (!this._BusyDialog) {
							this._BusyDialog = new sap.m.BusyDialog("BusyIndicator",   
			                {  
			                    showCancelButton :false,  
			                    title : "Please Wait..",  
			                    text : "Loading"
			                    
			                }); 
						}
						
						busyDialog = this._BusyDialog;
						
						this._BusyDialog.open();
						var subDate = getURLParameters("DATE");
						if (subDate) {
							fromdate = subDate;
							todate = subDate;
						} else {
							var currentdate = new Date();
							var todate = currentdate.getFullYear() + "-"
									+ (currentdate.getMonth() + 1) + "-"
									+ currentdate.getDate() + "T00:00:00";

							// get the date and time prior to three months from
							// today
							var d = new Date();
							var t = (d.getMonth() - 1) + 1;

							var fromdate = currentdate.getFullYear() + "-" + t
									+ "-" + currentdate.getDate() + "T00:00:00";

						}

						

						


						var detailModel = sap.ui.getCore().getModel("myModel");
						var url = "/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
						//var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";

						var obj = this;
						var statusList = [];
						 var pendingWith = [] ;
							

						oDataModel = new sap.ui.model.odata.ODataModel(url);


						if (oDataModel != null) {
							var query = "GetOrders?$filter=FromDate eq datetime'"
									+ fromdate
									+ "' and ToDate eq datetime'"
									+ todate + "'";

							oDataModel.read(query, null, [], true, function(data) {
									busyDialog.close();
									detailModel.setData(data);
									sap.ui.getCore().setModel(detailModel,"myModel");
									var model = sap.ui.getCore().getModel("myModel");
									var objects = model.getProperty("/results");
									var jsonModel = new sap.ui.model.json.JSONModel();
									
									if(objects instanceof Array){
										for(var i=0;i<objects.length;i++){
											
												if(statusList.length === 0 && !(objects[i].HeaderStatus == "") ){
													statusList.push({"HeaderStatus":objects[i].HeaderStatus});
												}
												if(pendingWith.length ===0 && !(objects[i].ApproverName == "") ){
													pendingWith.push({"ApproverName":objects[i].ApproverName});
												}
												
												
												
											
											if(!findDuplicate(statusList, objects[i],"HeaderStatus") && objects[i].HeaderStatus != "")
												{
												statusList.push({"HeaderStatus":objects[i].HeaderStatus});
												}
											
											if(!findDuplicate(pendingWith, objects[i],"ApproverName") && !(objects[i].ApproverName == "") )
											{
												pendingWith.push({"ApproverName":objects[i].ApproverName});
											}
											
											
											
											
										}
											
									jsonModel.setData({
											"Status" : statusList,
											"PendingWith" : pendingWith,
										});
										sap.ui.getCore().setModel(jsonModel,"filterModel");
										
										var sord = getURLParameters("SORD");
										if(sord){
									
									if(objects instanceof Array){
									
											for(var j=0;j<objects.length;j++){
													if(objects[j].SOrd == sord){
														var items = obj.byId("list").getItems();
														if(jQuery.device.is.phone){
															context =  items[j].getBindingContext();
														}else{
															obj.byId("list").setSelectedItem(items[j],true);
															context = obj.byId("list").getSelectedItem().getBindingContext();
																
														}
														
														
														if (context)  {
															
															var place = context.toString();
															place = place.substring(place.lastIndexOf("/") + 1);
															var indexModel = new sap.ui.model.json.JSONModel();
															sap.ui.getCore().setModel(indexModel, "indexModel");
															indexModel.setData({
																index : "",
															});
															indexModel.setProperty("/index", place);
															var app = obj.getView().app;
															if (app)
																var page = app.getPage("Detail");
															if (page) {
																page.oController.checkStatus();
															}
															obj.nav.to("Detail", context);
															break;
													}
														
														}

													}
											}
									}
									
									

									}



								
							}, function(err) {
								busyDialog.close();
								sap.m.MessageBox.show("Unable to fetch data from server",
										sap.m.MessageBox.Icon.ERROR, "Error",
										[ sap.m.MessageBox.Action.OK ],
										function() {
											/ * do something * /
										});

							});

						}
						
						
						

					}

				});
				function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
                	return arrParamValues[i];
             }
       }
       return null;
    }

}
			
function findDuplicate(arrayOfObjects,objectToFind, fieldToCheck )
{ 
	var isDuplicate = false;
	for(var j=0;j<arrayOfObjects.length;j++){
		if( arrayOfObjects[j][fieldToCheck] == objectToFind[fieldToCheck])  
		{
				isDuplicate = true;
				break;
				
			}
		
	 }
	return isDuplicate;
}