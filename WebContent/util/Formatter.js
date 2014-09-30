jQuery.sap.declare("com.sndk.poc.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

com.sndk.poc.util.Formatter = {

	_statusStateMap : {
		"Requestor Approved" : "Success",
		"Requestor Rejected" : "Error",
		"Requestor Returned" : "Warning",
		"Fully Confirmed" : "Success",
		"Sample Released" : "Success",
		"Business Manager Approved" : "Success",
		"Business Manager Rejected" : "Error",
		"Business Manager Returned" : "Warning",
		"Paying Org. Approved" : "Success",
		"Paying Org. Rejected" : "Error",
		"Paying Org. Returned" : "Warning",
		"Partially Rejected in ECC" : "Error",
		"Fully Shipped" : "Success",
		"Hold for Approval" : "Warning",
		"Submitted for Approval" : "Warning",
		"Partially Confirmed" : "Warning",
		"Partially Shipped" : "Warning",
		"Sample Rejected" : "Error",
		"Not Submitted" : "Error",
		"Cancelled" : "Error",
		"Fully Rejected in ECC" : "Error"

	},

	statusText : function(value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		if (value != null) {
			return bundle.getText(value, "?");
		} else {
			return;
		}
	},

	statusState : function(value) {
		var map = com.sndk.poc.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},

	Iconchange : function(value) {
		if (value == "X") {
			return "icons/Order.png";
		} else {
			return "icons/Request.png ";
		}
	},

	Iconexception : function(value) {
		if (value == "X") {
			return "icons/exception.png";
		} else {
			return " ";
		}
	},

	date : function(value) {
		var dateVal;
		if (value != null && value.indexOf(" ") != -1) {
			value = value.split(" ");
			dateVal = value[0];
			return dateVal;
		} else {
			return value;
		}
	},

	trail : function(value) {
		return parseInt(value);
	},

};