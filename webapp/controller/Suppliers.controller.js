// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller"
// // ], (Controller) => {
// //     "use strict";

// //     return Controller.extend("com.northwind.amannorthwind.controller.Suppliers", {
// //         onInit() {
// //         }
// //     });
// // });


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/Fragment",
//     "sap/m/Text",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], function (Controller, Fragment, Text, Filter, FilterOperator) {
//     "use strict";

//     return Controller.extend("com.northwind.amannorthwind.controller.Suppliers", {
//         onInit: function () {
//             // You can do any initialization here if needed
//         },

//         /* =========================================================== */
//         /* ================ Fragment: Lazy load & reuse ============== */
//         /* =========================================================== */

//         _getDialog: function () {
//             if (!this._pDialog) {
//                 this._pDialog = Fragment.load({
//                     id: this.getView().getId(),                      // IMPORTANT: scope fragment IDs to the view
//                     name: "com.northwind.amannorthwind.view.Dialog", // your Dialog.fragment.xml path
//                     controller: this
//                 }).then(function (oDialog) {
//                     this.getView().addDependent(oDialog);
//                     return oDialog;
//                 }.bind(this));
//             }
//             return this._pDialog;
//         },

//         /* =========================================================== */
//         /* ===================== Table Row Press ====================== */
//         /* =========================================================== */

//         onSupplierPress: function (oEvent) {
//             const oItem = oEvent.getSource();

//             // Default model context
//             let oCtx = oItem.getBindingContext();

//             // If you use a named model (e.g., "northwind"), uncomment the fallback:
//             // if (!oCtx) { oCtx = oItem.getBindingContext("northwind"); }

//             if (!oCtx) {
//                 // eslint-disable-next-line no-console
//                 console.error("No binding context found on pressed supplier row.");
//                 return;
//             }

//             const oSupplier = oCtx.getObject();

//             this._getDialog().then(function (oDialog) {
//                 this._fillDialog(oSupplier);
//                 oDialog.open();
//             }.bind(this)).catch(function (e) {
//                 // eslint-disable-next-line no-console
//                 console.error("Failed to open suppliers dialog:", e);
//             });
//         },

//         /* =========================================================== */
//         /* ===================== Fill Dialog Content ================== */
//         /* =========================================================== */

//         _fillDialog: function (oSupplier) {
//             const sViewId = this.getView().getId();
//             const oVBox = Fragment.byId(sViewId, "vBox"); // find control inside fragment scope

//             if (!oVBox) {
//                 // eslint-disable-next-line no-console
//                 console.error("VBox 'vBox' not found inside Dialog fragment. Check fragment ID scoping.");
//                 return;
//             }

//             oVBox.removeAllItems();

//             // Build content (keep simple Text items; you can switch to ObjectAttribute/ObjectIdentifier later)
//             oVBox.addItem(new Text({ text: "Supplier ID: " + (oSupplier.SupplierID ?? "") }));
//             oVBox.addItem(new Text({ text: "Company Name: " + (oSupplier.CompanyName ?? "") }));
//             oVBox.addItem(new Text({ text: "Contact Name: " + (oSupplier.ContactName ?? "") }));
//             oVBox.addItem(new Text({ text: "Contact Title: " + (oSupplier.ContactTitle ?? "") }));

//             // Address block
//             const aAddrLines = [
//                 oSupplier.Address,
//                 [oSupplier.City, oSupplier.Region, oSupplier.PostalCode].filter(Boolean).join(", "),
//                 oSupplier.Country
//             ].filter(Boolean);
//             if (aAddrLines.length) {
//                 oVBox.addItem(new Text({ text: "Address: " + aAddrLines.join(" | ") }));
//             }

//             // Contact block
//             if (oSupplier.Phone) { oVBox.addItem(new Text({ text: "Phone: " + oSupplier.Phone })); }
//             if (oSupplier.Fax)   { oVBox.addItem(new Text({ text: "Fax: " + oSupplier.Fax })); }
//             if (oSupplier.HomePage) {
//                 oVBox.addItem(new Text({ text: "Home Page: " + oSupplier.HomePage }));
//             }
//         },

//         /* =========================================================== */
//         /* ====================== Dialog Handlers ===================== */
//         /* =========================================================== */

//         onCloseDialog: function () {
//             this._getDialog().then(function (oDialog) {
//                 oDialog.close();
//             });
//         },

//         onAfterCloseDialog: function () {
//             // Optional: clear dialog content after each close
//             const sViewId = this.getView().getId();
//             const oVBox = Fragment.byId(sViewId, "vBox");
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
//         },

//         /* =========================================================== */
//         /* ====================== Optional: Search ==================== */
//         /* =========================================================== */

//         /**
//          * Live search suppliers by CompanyName or ContactName.
//          * Wire in the view: <SearchField liveChange=".searchSuppliers" />
//          */
//         searchSuppliers: function (oEvent) {
//             const sQuery = (oEvent.getParameter("newValue") || "").trim();
//             const oTable = this.byId("suppliersTable");
//             const oBinding = oTable.getBinding("items");

//             if (!oBinding) { return; }

//             let aFilters = [];
//             if (sQuery) {
//                 aFilters = [
//                     new Filter({ path: "CompanyName", operator: FilterOperator.Contains, value1: sQuery }),
//                     new Filter({ path: "ContactName", operator: FilterOperator.Contains, value1: sQuery })
//                 ];
//                 // OR the two fields together
//                 aFilters = [new Filter({ filters: aFilters, and: false })];
//             }

//             oBinding.filter(aFilters);
//         },

//         /* =========================================================== */
//         /* ====================== Optional: Refresh =================== */
//         /* =========================================================== */

//         /**
//          * Refresh the Suppliers binding. For OData V2, refresh() on the model or
//          * refresh on the binding depending on your cache/autoExpandSelect settings.
//          */
//         onRefresh: function () {
//             const oTable = this.byId("suppliersTable");
//             const oBinding = oTable && oTable.getBinding("items");
//             if (oBinding && oBinding.refresh) {
//                 oBinding.refresh(); // refresh binding (best for V2 list bindings)
//             } else {
//                 // fallback: refresh the whole model
//                 const oModel = this.getView().getModel(); // or getModel("northwind")
//                 if (oModel && oModel.refresh) {
//                     oModel.refresh(true);
//                 }
//             }
//         }
//     });
// });








// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ], (Controller) => {
//     "use strict";

//     return Controller.extend("com.northwind.amannorthwind.controller.Suppliers", {
//         onInit() {
//         }
//     });
// });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Fragment, Text, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.Suppliers", {
        onInit: function () {
            // You can do any initialization here if needed
        },

        /* =========================================================== */
        /* ================ Fragment: Lazy load & reuse ============== */
        /* =========================================================== */

        _getDialog: function () {
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: this.getView().getId(),                      // IMPORTANT: scope fragment IDs to the view
                    name: "com.northwind.amannorthwind.view.Dialog", // your Dialog.fragment.xml path
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            return this._pDialog;
        },

        /* =========================================================== */
        /* ===================== Table Row Press ====================== */
        /* =========================================================== */

        onSupplierPress: function (oEvent) {
            const oItem = oEvent.getSource();

            // Default model context
            let oCtx = oItem.getBindingContext();

            // If you use a named model (e.g., "northwind"), uncomment the fallback:
            // if (!oCtx) { oCtx = oItem.getBindingContext("northwind"); }

            if (!oCtx) {
                // eslint-disable-next-line no-console
                console.error("No binding context found on pressed supplier row.");
                return;
            }

            const oSupplier = oCtx.getObject();

            this._getDialog().then(function (oDialog) {
                this._fillDialog(oSupplier);
                oDialog.open();
            }.bind(this)).catch(function (e) {
                // eslint-disable-next-line no-console
                console.error("Failed to open suppliers dialog:", e);
            });
        },

        /* =========================================================== */
        /* ===================== Fill Dialog Content ================== */
        /* =========================================================== */

        _fillDialog: function (oSupplier) {
            const sViewId = this.getView().getId();
            const oVBox = Fragment.byId(sViewId, "vBox"); // find control inside fragment scope

            if (!oVBox) {
                // eslint-disable-next-line no-console
                console.error("VBox 'vBox' not found inside Dialog fragment. Check fragment ID scoping.");
                return;
            }

            oVBox.removeAllItems();

            // Build content (keep simple Text items; you can switch to ObjectAttribute/ObjectIdentifier later)
            oVBox.addItem(new Text({ text: "Supplier ID: " + (oSupplier.SupplierID ?? "") }));
            oVBox.addItem(new Text({ text: "Company Name: " + (oSupplier.CompanyName ?? "") }));
            oVBox.addItem(new Text({ text: "Contact Name: " + (oSupplier.ContactName ?? "") }));
            oVBox.addItem(new Text({ text: "Contact Title: " + (oSupplier.ContactTitle ?? "") }));

            // Address block
            const aAddrLines = [
                oSupplier.Address,
                [oSupplier.City, oSupplier.Region, oSupplier.PostalCode].filter(Boolean).join(", "),
                oSupplier.Country
            ].filter(Boolean);
            if (aAddrLines.length) {
                oVBox.addItem(new Text({ text: "Address: " + aAddrLines.join(" | ") }));
            }

            // Contact block
            if (oSupplier.Phone) { oVBox.addItem(new Text({ text: "Phone: " + oSupplier.Phone })); }
            if (oSupplier.Fax)   { oVBox.addItem(new Text({ text: "Fax: " + oSupplier.Fax })); }
            if (oSupplier.HomePage) {
                oVBox.addItem(new Text({ text: "Home Page: " + oSupplier.HomePage }));
            }
        },

        /* =========================================================== */
        /* ====================== Dialog Handlers ===================== */
        /* =========================================================== */

        onCloseDialog: function () {
            this._getDialog().then(function (oDialog) {
                oDialog.close();
            });
        },

        onAfterCloseDialog: function () {
            // Optional: clear dialog content after each close
            const sViewId = this.getView().getId();
            const oVBox = Fragment.byId(sViewId, "vBox");
            if (oVBox) {
                oVBox.removeAllItems();
            }
        },

        onExit: function () {
            if (this._pDialog) {
                this._pDialog.then(function (oDialog) {
                    oDialog.destroy();
                });
                this._pDialog = null;
            }
        },

        /* =========================================================== */
        /* ====================== Optional: Search ==================== */
        /* =========================================================== */

        /**
         * Live search suppliers by CompanyName or ContactName.
         * Wire in the view: <SearchField liveChange=".searchSuppliers" />
         */
        searchSuppliers: function (oEvent) {
            const sQuery = (oEvent.getParameter("newValue") || "").trim();
            const oTable = this.byId("suppliersTable");
            const oBinding = oTable.getBinding("items");

            if (!oBinding) { return; }

            let aFilters = [];
            if (sQuery) {
                aFilters = [
                    new Filter({ path: "CompanyName", operator: FilterOperator.Contains, value1: sQuery }),
                    new Filter({ path: "ContactName", operator: FilterOperator.Contains, value1: sQuery })
                ];
                // OR the two fields together
                aFilters = [new Filter({ filters: aFilters, and: false })];
            }

            oBinding.filter(aFilters);
        },

        /* =========================================================== */
        /* ====================== Optional: Refresh =================== */
        /* =========================================================== */

        /**
         * Refresh the Suppliers binding. For OData V2, refresh() on the model or
         * refresh on the binding depending on your cache/autoExpandSelect settings.
         */
        onRefresh: function () {
            const oTable = this.byId("suppliersTable");
            const oBinding = oTable && oTable.getBinding("items");
            if (oBinding && oBinding.refresh) {
                oBinding.refresh(); // refresh binding (best for V2 list bindings)
            } else {
                // fallback: refresh the whole model
                const oModel = this.getView().getModel(); // or getModel("northwind")
                if (oModel && oModel.refresh) {
                    oModel.refresh(true);
                }
            }
        }
    });
});