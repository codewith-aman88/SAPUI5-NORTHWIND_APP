sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.northwind.amannorthwind.controller.View1", {
        onInit() {
        },

        onPressProducts: function () {
        this.getOwnerComponent().getRouter().navTo("RouteProducts");
        // console.log("pressed Products");
        },
        
        onPressCategories: function () {
        this.getOwnerComponent().getRouter().navTo("RouteCategories");
        },
        
        onPressSuppliers: function () {
        this.getOwnerComponent().getRouter().navTo("RouteSuppliers");
        },

        onOrderPress: function () {
        this.getOwnerComponent().getRouter().navTo("RouteOrders");
        },

        onRegionPress: function () {
        this.getOwnerComponent().getRouter().navTo("RouteRegions");
        }


    });
});