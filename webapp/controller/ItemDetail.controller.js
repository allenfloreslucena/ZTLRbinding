sap.ui.define([
	"./BaseController",
	"sap/ui/core/UIComponent"
], function (BaseController, UIComponent) {
	"use strict";

	return BaseController.extend("com.gyansys.ZTLRbinding.controller.ItemDetail", {

		onInit: function () {
			UIComponent.getRouterFor(this).getRoute("ItemDetail").attachPatternMatched(this._onDetailMatched, this);
		},

		_onDetailMatched: function (oEvent) {
			var oView = this.getView(),
				sDocumentIndex = oEvent.getParameter("arguments")["documentID"],
				sItemIndex = oEvent.getParameter("arguments")["itemID"];

			oView.bindElement({
				path: "/salesOrder/" + sDocumentIndex + "/items/" + sItemIndex,
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