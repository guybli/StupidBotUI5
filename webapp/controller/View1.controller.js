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
			oTest.loadData("model/feed.json");
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
				Author:  oUser.firstName + " " + oUser.lastName ,
				AuthorPicUrl: "./images/aw.jpeg",
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
			
		var url = "/wolf" + "/v1/result?appid=38L3WU-A34E8TKXA7&i=";
			var command = "what+time+is+it";
			var oModel = this.getView().getModel();
			var oFormat = DateFormat.getDateTimeInstance({
				style: "medium"
			});
			var oDate = new Date();
			var sDate = oFormat.format(oDate);
			
			
			var oTest = this.getView().getModel("reference");

			var oEntry;
			try {
				// create new entry
			var sValue = oEvent.getParameter("value");
				var aEntries = "";
			
				$.ajax({
				url: url+sValue,
				type: "GET",
				data: "",
				async: false,
				success: function(data) {
					 	console.log("wolf: " + data);
					 	sValue = data;
					 	
					 	oEntry = {
				Author:  "WolframAlpha" ,
				AuthorPicUrl: "./images/wolfy.png",
				Type: "Reply",
				Date: "" + sDate,
				Text: sValue
			};
			
				},
				error: function(jqXHR, textStatus, errorThrown) {
					MessageToast.show(jqXHR.responseText,{duration:3000}); //, "ERROR", "Service call error");
					aEntries = oModel.getData().EntryCollection;
					
				oEntry.Date = sDate;
				oEntry.Typr = "Reply";
				}
			}, this);
			} catch (err) {
				var oEntry = oTest.getData().EntryCollection.pop() ;
				
			} finally {
			var aEntries = oModel.getData().EntryCollection;
			aEntries.unshift(oEntry);
			oModel.setData({
				EntryCollection: aEntries
			});
				
			}
			
				


		}
	});

});