sap.ui.define([
	"./BaseController",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, UIComponent, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.gyansys.ZTLRbinding.controller.Home", {
		onInit: function () {
			var oTable = this.getView().byId("packHeader"),
				oModel = new sap.ui.model.json.JSONModel();

			oModel.loadData("model/SalesOrder.json");
			oTable.setModel(oModel);
		},

		onHeaderPress: function (oEvt) {
			var oContext = oEvt.getSource().getBindingContext(),
				sPath = oContext.getPath(),
				aParameters = sPath.split("/");

			UIComponent.getRouterFor(this).navTo("Detail", {
				documentID: aParameters[2],
			});
		},

		onFilter: function (oEvent) {

			// build filter array
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("packHeader"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("docNumber", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		}
	});
});