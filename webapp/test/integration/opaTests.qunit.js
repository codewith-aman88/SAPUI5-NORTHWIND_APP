/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["com/northwind/amannorthwind/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
