/**
 * Copyright (c) 1998-2022 Oracle NetSuite GBU, Inc.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Oracle NetSuite. ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Oracle NetSuite.
 *
 * File  Name :         sdf_suitetax_example20.js
 * Script Name   :      SDF SuiteTax Example 20
 * Script Type   :      taxCalculationPlugin 
 * Script ID :          customscript_sdf_suitetax_example20
 *
 * Version     Date           Author
 * 0.10        26 Aug 2022    Daniel Goldenberg
 * 
 * Description: SuiteTax Engine example (with hardcoded taxationType and taxCode) 
 */

/**
 * @NApiVersion 2.0
 * @NScriptType taxCalculationPlugin 
 */
 define([],
 function() {
      function calculateTax(context) {
        log.debug( "SDF SuiteTax Example 20", "start");
         var input = context.input;
         var output = context.output;
         if (input.isTaxOutputOverridden())
             return;
         var _taxationType = '1';
         var _taxCode = '7';

         var _taxAmount = 0;
         var _taxRate = 10.0;
 
         var inputLines = input.lines;
         log.debug("SDF SuiteTax Example 20", "lineCount" + inputLines.length);
         for (var i = 0; i < inputLines.length; i++) {
             var item = inputLines[i];
             var price = item.amount;
             
             var lineRef = item.reference;
 
             var tax = (price * _taxRate/100); 
             _taxAmount += tax;
             var itemLineTax = output.createLine({lineReference: lineRef});		
             itemLineTax.addTaxDetail({
                  taxCode: _taxCode,
                  taxationType: _taxationType,
                  taxRate: _taxRate,
                  taxAmount: tax,
                  taxBasis: price,
                  taxCalculationDetail: 'Hardcoded example Tax'
                  });
             output.addLine({outputLine: itemLineTax});
             
         }
         output.setTaxSummaryLine({
             taxCode: _taxCode, 
             taxationType: _taxationType, 
             taxAmount: _taxAmount
             });
        log.debug( "SDF SuiteTax Example 20", "end");
     }
     return {
         calculateTax: calculateTax
     };  
 });