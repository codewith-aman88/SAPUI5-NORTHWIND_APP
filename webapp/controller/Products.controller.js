sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Text"
], (Controller, Fragment, Text) => {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.Products", {
        onInit() {},

        onItemPress(oEvent) {
            console.log("pressed Products");
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            const oProduct = oContext.getObject();
            const oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.northwind.amannorthwind.view.Dialog",
                    controller: this
                }).then(oDialog => {
                    this._oDialog = oDialog;
                    oView.addDependent(this._oDialog);
                    this._fillDialog(oProduct);
                    this._oDialog.open();
                });
            } else {
                this._fillDialog(oProduct);
                this._oDialog.open();
            }
        },

        _fillDialog(oProduct) {
            const oVBox = this.getView().byId("vBox");
            oVBox.removeAllItems();
            oVBox.addItem(new sap.m.Text({ text: "Product ID: " + oProduct.ProductID }));
            oVBox.addItem(new sap.m.Text({ text: "Product Name: " + oProduct.ProductName }));
            oVBox.addItem(new sap.m.Text({ text: "Unit Price: " + oProduct.UnitPrice }));
            oVBox.addItem(new sap.m.Text({ text: "Units In Stock: " + oProduct.UnitsInStock }));
        },

        onCloseDialog() {
            this._oDialog.close();
        }
    });
});

