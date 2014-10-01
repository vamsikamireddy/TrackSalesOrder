jQuery.sap.require("com.sndk.poc.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui
		.controller(
				"com.sndk.poc.tracksalesorder.Detail",
				{

					handleNavButtonPress : function(evt) {
						this.nav.back("Master");
					},

					handleLinkPress : function(evt) {
						var id;
						var woid;
						var approverName = evt.oSource.mProperties.text;

						var apprvModel = sap.ui.getCore().getModel(
								"apprvlModel");
						var oData = apprvModel.getProperty("/results");

						for ( var i = 0; i < oData.length; i++) {
							if (oData[i].Approver == approverName) {
								id = oData[i].ApproverId;
								woid = oData[i].SOrd;
								break;
							}
						}
						var idModel = new sap.ui.model.json.JSONModel();
						var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
						var obj = this;
						var oDataModel = new sap.ui.model.odata.ODataModel(url);
						if (oDataModel != null) {

							var query = "GetEmail('" + id + "')";
							oDataModel.read(query, null, [], true, function(
									data) {
								idModel.setData(data);
								sap.ui.getCore().setModel(idModel, "idModel");
								var email = idModel.getProperty("/EMail");

								sap.m.URLHelper.triggerEmail(email,
										" Workorder Notification : " + woid
												+ " ");

							}, function(err) {
								var msg = err.response.statusText;
								sap.m.MessageBox.show("Unable to fetch Email ID from server",
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[ sap.m.MessageBox.Action.OK ],
										function() {
											/ * do something * /
										});
								
							});
						}
					},

					HandleImagePress : function(evt) {
						var model = evt.getSource().getModel();
						var path = evt.getSource().getBindingContext()
								.getPath();
						var obj = model.getProperty(path);
						var comment = obj.ApproverComment;
						sap.m.MessageBox.show(comment,
								sap.m.MessageBox.Icon.INFORMATION, "Comments",
								[ sap.m.MessageBox.Action.OK ]);
					},

					handleViewExcPress : function(evt) {
						var model = evt.getSource().getModel();
						var path = evt.getSource().getBindingContext()
								.getPath();
						var obj = model.getProperty(path);
						var exceptionReason = obj.ItemException;
						
						
						var excepTypes="";
						if(exceptionReason.indexOf(",")!= -1){
							exceptionReason = exceptionReason.split(",");
							var i = 0;
							
							while(i <exceptionReason.length){
								excepTypes = excepTypes + exceptionReason[i] + "\n";
								i++;
							}
						}else{
							excepTypes = exceptionReason;
						}
						sap.m.MessageBox.show(excepTypes,
								sap.m.MessageBox.Icon.INFORMATION,
								"Exception Reasons",
								[ sap.m.MessageBox.Action.OK ]);
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

					handleLineItemPress : function(evt) {
						var context = evt.getSource().getBindingContext();
						var path =  evt.getSource().getBindingContext().getPath();
						var status = evt.getSource().getBindingContext().getModel().getProperty(path + "/Status");
						
						var model = new sap.ui.model.json.JSONModel();
						sap.ui.getCore().setModel(model, "statusModel");
						model.setData({
							itemStatus : status
						});
						
						var app = this.getView().app;
						if (app)
							var page = app.getPage("LineItem");
						if (page) {
							page.oController.handleItemPress(evt);
						}
						this.nav.to("LineItem", context);

					},

					handleIconTabBarSelect : function(e) {
						var context = e.getSource().getBindingContext().sPath;
						var selectedKey = e.getParameters().selectedItem.mProperties.key; 
						var keyModel = new sap.ui.model.json.JSONModel();
						sap.ui.getCore().setModel(keyModel, "keyModel");
						keyModel.setData({
							key : "",
						});
						keyModel.setProperty("/key", selectedKey);
						var app = this.getView().app;
						if (app)
							var page = app.getPage("StatusItem");
						if (page) {
							page.oController.handleStatusIconPress(e);
						}
						this.nav.to("StatusItem", context);
					},

					checkStatus : function(evt) {

						var myModel = sap.ui.getCore().getModel("indexModel");
						var index = myModel.getProperty("/index");

						var myModel = sap.ui.getCore().getModel("myModel");
						var check = myModel.getProperty("/results");
						var status = check[index].InSD;
						var excptn = check[index].ExcepFlg;
						var createdBy = check[index].CreatedBy;
						var payingOrg = check[index].PayingOrg ;
						var onBehalfOf = check[index].ReqOnBehalf ;
						var pendingWith = 	check[index].ApproverName ;
						var pendingDays = check[index].PendingDays;
						var ord = check[index].SOrd;
						
						
						if(payingOrg != ""){
							this.byId("payingOrg").setText("Paying Org.: " + payingOrg) ;
						}else{
							this.byId("payingOrg").setText("") ;
						}
						if(onBehalfOf != ""){
							this.byId("onBehalf").setText("On behalf of: " + onBehalfOf) ;
						}else{
							this.byId("onBehalf").setText("") ;
						}
						if(pendingWith != ""){
							this.byId("pendingwith").setText("Pending With:" + pendingWith) ;
						}else{
							this.byId("pendingwith").setText("") ;
						}
						if(pendingDays != "") {
							this.byId("daysin").setText("Days in Current Status:" + pendingDays) ;
						}else{
							this.byId("daysin").setText("") ;
						}
						
						 

						// Begin of Approval History Tab

						var apprvlModel = new sap.ui.model.json.JSONModel();
						var url = "http://milsapidv21.sandisk.com:8032/sap/opu/odata/sap/Z_SNDK_ORDERTRACK_SRV/";
						var obj = this;
						var oDataModel = new sap.ui.model.odata.ODataModel(url);
						if (oDataModel != null) {

							var query = "GetOrdApprovers?$filter=SOrd eq '"
									+ ord + "'";
							oDataModel.read(query, null, [], true, function(
									data) {

								apprvlModel.setData(data);
								sap.ui.getCore().setModel(apprvlModel,
										"apprvlModel");
								obj.byId("approvalHistory").setModel(
										apprvlModel);

							}, function(err) {
								var msg = err.response.statusText;
								sap.m.MessageBox.show("Unable to fetch approver history",
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[ sap.m.MessageBox.Action.OK ],
										function() {
											/ * do something * /
										});
								
							});
						}

						// Begin of Ship To Address Tab

						var shipModel = new sap.ui.model.json.JSONModel();
						if (oDataModel != null) {
							var shpquery = "GetOrdPartners?$filter=SOrd eq '"
									+ ord + "'";
							oDataModel.read(shpquery, null, [], true, function(
									data) {
								for ( var j = 0; j < data.results.length; j++) {
									if (data.results[j].CustType == "Ship to") {
										shipModel.setData(data.results[j]);
									}
									
								}

								sap.ui.getCore().setModel(shipModel,"shipModel");
								obj.byId("SupplierForm").setModel(shipModel);
								

							}, function(err) {
								var msg = err.response.statusText;
								sap.m.MessageBox.show("Unable to fetch ShipTo Address details",
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[ sap.m.MessageBox.Action.OK ],
										function() {
											/ * do something * /
										});
								
							});
						}

						// End of Ship To Address Tab
						var itemModel = new sap.ui.model.json.JSONModel();

						var shippedItems = {
							"count" : 0,
							"visible" : false,
							"items" : []
						};
						var confirmedItems = {
							"count" : 0,
							"visible" : false,
							"items" : []
						};
						var unconfirmedItems = {
								"count" : 0,
								"visible" : false,
								"items" : []
							};
						var rejectedItems = {
							"count" : 0,
							"visible" : false,
							"items" : []
						};
					
						

						// Begin of Sales Order Line Items & Exception Tab
						var exceptionFilter = new sap.ui.model.Filter(
								"ItemException",
								sap.ui.model.FilterOperator.NE, "");
						var sdModel = new sap.ui.model.json.JSONModel();
						if (oDataModel != null) {
							var sdquery = "GetOrdDetail?$filter=SOrd eq '"
									+ ord + "'";
							oDataModel.read(sdquery,null,[],true,
											function(data) {
												sdModel.setData(data);
												sap.ui.getCore().setModel(sdModel, "sdModel");

												var model = sap.ui.getCore().getModel("sdModel");
												var objects = model.getProperty("/results");
												obj.byId("subHeader").setCount(objects.length);

												if (objects instanceof Array) {
													for ( var i = 0; i < objects.length; i++) {
														switch (objects[i].Status) {
														case 'Confirmed':
															confirmedItems.count = confirmedItems.count + 1;
															confirmedItems.visible = true;
															confirmedItems.items
																	.push(objects[i]);
															break;
														case 'Shipped':
															shippedItems.count = shippedItems.count + 1;
															shippedItems.visible = true;
															shippedItems.items
																	.push(objects[i]);
															break;
														case 'Unconfirmed':
															unconfirmedItems.count = unconfirmedItems.count + 1;
															unconfirmedItems.visible = true;
															unconfirmedItems.items
																	.push(objects[i]);
															break;
														case 'Rejected':
															rejectedItems.count = rejectedItems.count + 1;
															rejectedItems.visible = true;
															rejectedItems.items.push(objects[i]);
															break;

														}

													}
												}

												itemModel
														.setData({
															"Confirmed" : confirmedItems,
															"Shipped" : shippedItems,
															"Rejected" : rejectedItems,
															"Unconfirmed" : unconfirmedItems,
															"totalcount" : objects.length
														});
												sap.ui.getCore().setModel(itemModel, "itemModel");
												obj.byId("IdShipped").setModel(itemModel);
												obj.byId("IdConfirmed").setModel(itemModel);
												obj.byId("IdUnconfirmed").setModel(itemModel);
												obj.byId("IdRejected").setModel(itemModel);
												

												obj.byId("itmtable").setModel(sdModel);
												obj.byId("exception").setModel(sdModel);
												obj.byId("exception").getBinding("items").filter(exceptionFilter);

											},
											function(err) {
												var msg = err.response.statusText;
												sap.m.MessageBox
														.show(
																"Unable to fetch Sales Order Lineitem details",
																sap.m.MessageBox.Icon.ERROR,
																"Error",
																[ sap.m.MessageBox.Action.OK ],
																function() {
																	/ * do something * /
																});
												
											});
						}

						// End of Sales Order Line Items Tab
						

						
						obj.byId("header").setModel(sap.ui.getCore().getModel("nameModel"));
						if(jQuery.device.is.phone){
							obj.byId("header").setText("");
						}
						

						var gtsts = this.byId("IconTabBar").getSelectedKey();

						if (status == "") {
							status = "Y";
						}

						if (excptn == "X") {
							excptn = "Z";
						}

						if (status == "X" && excptn == "Z") {
							this.byId("exceptionid").setVisible(true);
							this.byId("sditem").setVisible(true);
							if (excptn != gtsts) {
								this.byId("IconTabBar").setSelectedKey(excptn);
								this.byId("exceptionid").setKey(excptn);
							}
						}

						else if (status == "X" && excptn == "") {
							this.byId("exceptionid").setVisible(false);
							this.byId("sditem").setVisible(true);
							if (status != gtsts) {
								this.byId("IconTabBar").setSelectedKey(status);
								this.byId("sditem").setKey(status);
							}
						}

						else {
							this.byId("exceptionid").setVisible(false);
							this.byId("sditem").setVisible(false);
							if (status != gtsts) {
								this.byId("IconTabBar").setSelectedKey(status);
								this.byId("approval").setKey(status);

							}

						}
						if (status == "X") {

							this.byId("statusText").setNumber("Approved Order");

						} else {
							this.byId("statusText").setNumber("Sample Request");
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
					}
					



				});



