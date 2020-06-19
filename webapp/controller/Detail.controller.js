sap.ui.define([
	"./BaseController",
	"sap/ui/core/UIComponent"
], function (BaseController, UIComponent) {
	"use strict";

	return BaseController.extend("com.gyansys.ZTLRbinding.controller.Detail", {
		onInit: function () {
			// var oTable = this.getView().byId("packItem"),
			// 	oModel = new sap.ui.model.json.JSONModel();

			// oModel.loadData("model/SalesOrder.json");
			// oTable.setModel(oModel);
			UIComponent.getRouterFor(this).getRoute("Detail").attachPatternMatched(this._onDetailMatched, this);
		},

		onItemPress: function (oEvt) {
			var oContext = oEvt.getSource().getBindingContext("salesOrder"),
				sPath = oContext.getPath(),
				aParameters = sPath.split("/");
				
			UIComponent.getRouterFor(this).navTo("ItemDetail", {
				documentID: aParameters[2],
				itemID: aParameters[4]
			});
		},

		_onDetailMatched: function (oEvent) {
			var oView = this.getView(),
				sDocumentIndex = oEvent.getParameter("arguments")["documentID"];

			oView.bindElement({
				path: "/salesOrder/" + sDocumentIndex,
				model: "salesOrder",
				events: {
					change: this._onBindingChange.bind(this)
				}
			});
		},

		_onBindingChange: function () {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("salesOrder"),
				sPath = oElementBinding.getPath();

			// if the path to the data does not exist we navigate to the not found page
			if (!oView.getModel("salesOrder").getObject(sPath)) {
				UIComponent.getRouterFor(this).getTargets().display("NotFound");
			}
		}
	});
});