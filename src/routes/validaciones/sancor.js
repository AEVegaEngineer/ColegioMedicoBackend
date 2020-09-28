var conn = require("../../configs/db");
var express = require("express");
var router = express.Router();
var soap = require("strong-soap").soap;
var url = "https://testservicios.sancorsalud.com.ar/Autorizador/WSDL/HL7v24";
var requestArgs = {
    symbol: "IBM",
};
var WSDL = soap.WSDL;
var options = {};

module.exports = (req, res) => {
    WSDL.open(url, options, function (err, wsdl) {
        // You should be able to get to any information of this WSDL from this object. Traverse
        // the WSDL tree to get  bindings, operations, services, portTypes, messages,
        // parts, and XSD elements/Attributes.

        // Set the wsdl object in the cache. The key (e.g. 'stockquotewsdl')
        // can be anything, but needs to match the parameter passed into soap.createClient()
        var clientOptions = {
            WSDL_CACHE: {
                stockquotewsdl: wsdl,
            },
        };
        soap.createClient("stockquotewsdl", clientOptions, function (
            err,
            client
        ) {
            var method = client["StockQuote"]["StockQuoteSoap"]["GetQuote"];
            method(requestArgs, function (err, result, envelope, soapHeader) {
                //response envelope
                console.log("Response Envelope: \n" + envelope);
                //'result' is the response body
                console.log("Result: \n" + JSON.stringify(result));
            });
        });
    });
};
