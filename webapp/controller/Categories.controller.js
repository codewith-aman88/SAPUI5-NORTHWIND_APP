sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Text"
], (Controller, Fragment, Text) => {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.Categories", {
        onInit() {},

         onItemPress(oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            const oCategory = oContext.getObject();
            const oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.northwind.amannorthwind.view.Dialog",
                    controller: this
                }).then(oDialog => {
                    this._oDialog = oDialog;
                    oView.addDependent(this._oDialog);
                    this._fillDialog(oCategory);
                    this._oDialog.open();
                });
            } else {
                this._fillDialog(oCategory);
                this._oDialog.open();
            }
        },

        _fillDialog(oCategory) {
            const oVBox = this.getView().byId("vBox"); 
            oVBox.removeAllItems();
            oVBox.addItem(new sap.m.Text({ text: "Category ID: " + oCategory.CategoryID }));
            oVBox.addItem(new sap.m.Text({ text: "Category Name: " + oCategory.CategoryName }));
            oVBox.addItem(new sap.m.Text({ text: "Description: " + oCategory.Description }));
        },

        onCloseDialog() {
            this._oDialog.close();
        }
    });
});




// /* webapp/controller/Categories.controller.js */
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/Fragment",
//     "sap/m/Text"
// ], function (Controller, Fragment, Text) {
//     "use strict";

//     return Controller.extend("com.northwind.amannorthwind.controller.Categories", {
//         onInit: function () {
//         },

//         _getDialog: function () {
//             if (!this._pDialog) {
//                 this._pDialog = Fragment.load({
//                     id: this.getView().getId(),
//                     name: "com.northwind.amannorthwind.view.Dialog",
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.getView().addDependent(oDialog);
//                     return oDialog;
//                 }.bind(this));
//             }
//             return this._pDialog;
//         },

//         onItemPress: function (oEvent) {
//             var oItem = oEvent.getSource();
//             var oCtx = oItem.getBindingContext(); // default model

//             // If using named model, fallback:
//             if (!oCtx) {
//                 oCtx = oItem.getBindingContext("northwind");
//             }
//             if (!oCtx) {
//                 // eslint-disable-next-line no-console
//                 console.error("No binding context found on pressed item (default or 'northwind').");
//                 return;
//             }

//             var oCategory = oCtx.getObject();

//             this._getDialog().then(function (oDialog) {
//                 this._fillDialog(oCategory);
//                 oDialog.open();
//             }.bind(this));
//         },

//         _fillDialog: function (oCategory) {
//             var sViewId = this.getView().getId();
//             var oVBox = Fragment.byId(sViewId, "vBox");

//             if (!oVBox) {
//                 // eslint-disable-next-line no-console
//                 console.error("VBox 'vBox' not found in Dialog fragment. Check IDs and fragment 'id' usage.");
//                 return;
//             }

//             oVBox.removeAllItems();

//             oVBox.addItem(new Text({ text: "Category ID: " + (oCategory.CategoryID ?? "") }));
//             oVBox.addItem(new Text({ text: "Category Name: " + (oCategory.CategoryName ?? "") }));
//             oVBox.addItem(new Text({ text: "Description: " + (oCategory.Description ?? "") }));
//         },

//         onCloseDialog: function () {
//             this._getDialog().then(function (oDialog) {
//                 oDialog.close();
//             });
//         },

//         onAfterCloseDialog: function () {
//             var sViewId = this.getView().getId();
//             var oVBox = Fragment.byId(sViewId, "vBox");
//             if (oVBox) {
//                 oVBox.removeAllItems();
//             }
//         },

//         onExit: function () {
//             if (this._pDialog) {
//                 this._pDialog.then(function (oDialog) {
//                     oDialog.destroy();
//                 });
//                 this._pDialog = null;
//             }
//         }
//     });
// });