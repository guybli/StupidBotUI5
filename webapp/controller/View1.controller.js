sap.ui.define([
	
	'jquery.sap.global',
	'sap/m/MessageToast',
	'sap/ui/core/format/DateFormat',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(jQuery, MessageToast, DateFormat, Controller, JSONModel) {
	"use strict";

	return Controller.extend("UI5ChatBot.controller.View1", {

		onInit: function() {
// set user model
	var userModel = new sap.ui.model.json.JSONModel("/services/userapi/currentUser");
		this.getView().setModel(userModel, "userapi");

			// set mock model

			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			var oTest = new JSONModel();
			oTest.loadData("/webapp/model/feed.json");
			oTest.attachRequestCompleted(oTest,function() {

						var oModel = this.getView().getModel();
			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			var oEntry = oTest.getData().EntryCollection.pop() ;
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
				var aEntries = oModel.getData().EntryCollection;
			var ilength = oModel.getData().EntryCollection.length;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});


			});

			var oDate = new Date();
			var sDate = oFormat.format(oDate);

			var oEntryCollection = {
				"EntryCollection": []
			};

			var oModel = new JSONModel(oEntryCollection);
			this.getView().setModel(oTest, "reference");
			this.getView().setModel(oModel);
			
			

		},

		onPost: function(oEvent) {
			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			var oUser =  this.getView().getModel("userapi").getData();
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			// create new entry
			var sValue = oEvent.getParameter("value");
			var oEntry = {
				Author:  oUser.username ,
				AuthorPicUrl: "/webapp/images/Gareth.jpg",
				Type: "Reply",
				Date: "" + sDate,
				Text: sValue
			};

			// update model
			var oModel = this.getView().getModel();
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});

			this._getNextQuesiton(oEvent);
		},



		_getNextQuesiton: function(oEvent) {
			var oModel = this.getView().getModel();
			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			
			var oTest = this.getView().getModel("reference");

			var oEntry = oTest.getData().EntryCollection.pop() ;
			oEntry.AuthorPicUrl = "/webapp/images/aw.jpeg";                 
			//	oTest.setData("index",index++);
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
				var aEntries = oModel.getData().EntryCollection;
			var ilength = oModel.getData().EntryCollection.length;
			jQuery.sap.delayedCall(2000, this, function() {
				aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
			});

		


		}
	});

});