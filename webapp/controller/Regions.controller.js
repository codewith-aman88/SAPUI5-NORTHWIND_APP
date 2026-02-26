sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Text"
], function (Controller, Fragment, Text) {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.Regions", {
        onInit: function () {},

        // Lazy-load and reuse the dialog fragment
        _getDialog: function () {
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: this.getView().getId(),                      // scope fragment IDs to the view
                    name: "com.northwind.amannorthwind.view.Dialog", // your Dialog.fragment.xml path
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            return this._pDialog;
        },

        // Row press handler
        onRegionPress: function (oEvent) {
            const oItem = oEvent.getSource();

            // Default model context
            let oCtx = oItem.getBindingContext();

            // If you use a named model, uncomment:
            // if (!oCtx) { oCtx = oItem.getBindingContext("northwind"); }

            if (!oCtx) {
                // eslint-disable-next-line no-console
                console.error("No binding context on pressed region row.");
                return;
            }

            const oRegion = oCtx.getObject();

            this._getDialog().then(function (oDialog) {
                this._fillDialog(oRegion);
                oDialog.open();
            }.bind(this)).catch(function (e) {
                // eslint-disable-next-line no-console
                console.error("Failed to open Regions dialog:", e);
            });
        },

        // Fill dialog content
        _fillDialog: function (oRegion) {
            const sViewId = this.getView().getId();
            const oVBox = Fragment.byId(sViewId, "vBox"); // get VBox inside fragment scope

            if (!oVBox) {
                // eslint-disable-next-line no-console
                console.error("VBox 'vBox' not found in Dialog fragment. Check fragment ID scoping.");
                return;
            }

            oVBox.removeAllItems();

            oVBox.addItem(new Text({ text: "Region ID: " + (oRegion.RegionID ?? "") }));
            oVBox.addItem(new Text({ text: "Region Description: " + (oRegion.RegionDescription ?? "") }));

            // If you later expand Territories, you can show count here:
            // if (Array.isArray(oRegion.Territories)) {
            //     oVBox.addItem(new Text({ text: "Territories: " + oRegion.Territories.length }));
            // }
        },

        onCloseDialog: function () {
            this._getDialog().then(function (oDialog) {
                oDialog.close();
            });
        },

        onAfterCloseDialog: function () {
            const sViewId = this.getView().getId();
            const oVBox = Fragment.byId(sViewId, "vBox");
            if (oVBox) {
                oVBox.removeAllItems(); // optional: clear previous content
            }
        },

        onExit: function () {
            if (this._pDialog) {
                this._pDialog.then(function (oDialog) { oDialog.destroy(); });
                this._pDialog = null;
            }
        }
    });
});