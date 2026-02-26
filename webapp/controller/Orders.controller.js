sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Text",
    "sap/m/MessageBox"
], (Controller, Fragment, Text, MessageBox) => {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.Orders", {
        onInit() {},

        async onOrderPress(oEvent) {
            try {
                const oItem = oEvent.getSource();
                // If your model is named, use: oItem.getBindingContext("northwind")
                const oContext = oItem.getBindingContext();
                const oOrder = oContext?.getObject();
                const oView = this.getView();

                if (!oOrder) {
                    MessageBox.warning("No data found for the selected row.");
                    return;
                }

                // Lazy-load the dialog fragment once
                if (!this._oDialog) {
                    this._oDialog = await Fragment.load({
                        id: oView.getId(), // important: prefixes fragment control IDs with the view ID
                        type: "XML",
                        name: "com.northwind.amannorthwind.view.Dialog",
                        controller: this
                    });
                    oView.addDependent(this._oDialog);
                }

                // Fill and open
                this._fillDialog(oOrder);
                this._oDialog.open();

            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Dialog open failed:", err);
                MessageBox.error("Failed to open dialog. Check console for details.");
            }
        },

        _fillDialog(oOrder) {
            const oView = this.getView();

            // Because we loaded the fragment with id: oView.getId(),
            // the simple id "vBox" becomes <viewId>--vBox
            const oVBox = oView.byId("vBox") || sap.ui.getCore().byId(oView.createId("vBox"));
            if (!oVBox) {
                // eslint-disable-next-line no-console
                console.warn("VBox 'vBox' not found in Dialog fragment.");
                return;
            }

            oVBox.removeAllItems();

            oVBox.addItem(new Text({ text: "Order ID: " + (oOrder.OrderID ?? "") }));
            oVBox.addItem(new Text({ text: "Customer ID: " + (oOrder.CustomerID ?? "") }));
            oVBox.addItem(new Text({ text: "Employee ID: " + (oOrder.EmployeeID ?? "") }));
            oVBox.addItem(new Text({ text: "Order Date: " + (oOrder.OrderDate ?? "") }));
            oVBox.addItem(new Text({ text: "Freight: " + (oOrder.Freight ?? "") }));
            oVBox.addItem(new Text({ text: "Ship City: " + (oOrder.ShipCity ?? "") }));
            oVBox.addItem(new Text({ text: "Ship Country: " + (oOrder.ShipCountry ?? "") }));
        },

        onCloseDialog() {
            if (!this._oDialog) {
                // Try to get the dialog via the view's prefixed ID
                const oView = this.getView();
                const oDialog = oView.byId("dialogbox") || sap.ui.getCore().byId(oView.createId("dialogbox"));
                oDialog?.close();
                return;
            }
            this._oDialog.close();
        },

        onExit() {
            if (this._oDialog) {
                this._oDialog.destroy();
                this._oDialog = null;
            }
        }
    });
});