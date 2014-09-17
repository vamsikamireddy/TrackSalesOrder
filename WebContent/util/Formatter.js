jQuery.sap.declare("com.sndk.poc.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

com.sndk.poc.util.Formatter = {
	
	_statusStateMap : {
		"Requestor Approved" : "Success",
		"Fully Confirmed" : "Success",
		"Sample Released" : "Success",
		"Business Manager Approved" : "Success",
		"Fully Shipped" : "Success",
		"Hold for Approval" : "Warning",
		"Submitted for Approval" : "Warning",
		"Partially Confirmed" : "Warning",
		"Partially Shipped" : "Warning",
		"Sample Rejected" : "Error",
		"Not Submitted" : "Error",
		"Cancelled" : "Error"
		
			},

	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		if(value != null){
		return bundle.getText(value, "?");
		}else{
			return;
		}
	}, 
	
	statusState :  function (value) {
		var map = com.sndk.poc.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	Iconchange : function (value) {
		if(value== "X"){
		return "icons/Order.png" ;
		}
		else{
		return "icons/Request.png " ;	
		}
	},
	
	
	Iconexception : function (value) {
		if(value== "X"){
		return "icons/exception.png" ;
		}
		else{
		return " " ;
		}
		},
	
	date : function (value) {
		var dateVal;
		if(value != null && value.indexOf(" ") != -1){
			value = value.split(" ");
			dateVal = value[0];
			return dateVal;
		}else
			return value;
		

//		if (dateVal) {
//			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd-MM-yyyy"}); 
//			var result = oDateFormat.format(new Date(dateVal));
//			return oDateFormat.format(new Date(dateVal));
//		} else {
//			return value;
//		}
	},
	

	
};