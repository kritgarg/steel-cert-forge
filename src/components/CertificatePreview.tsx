
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const CertificatePreview = ({ data }) => {
  return (
    <Card className="shadow-lg" id="certificate-preview">
      <CardContent className="p-0">
        <div className="bg-white p-8 font-sans text-sm">
          {/* Main Border */}
          <div className="border-4 border-black p-6">
            
            {/* Header with Logo and Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center bg-gray-100">
                <div className="text-sm font-bold text-gray-600">CS</div>
              </div>
              <h1 className="text-2xl font-bold text-center flex-1">Material Certificate</h1>
              <div className="w-16"></div> {/* Spacer for balance */}
            </div>

            {/* Company and Party Information */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="font-bold mb-2">• COMPANY NAME - CS CASTINGS PVT. LTD.</div>
                <div className="font-bold">• COMPANY ADDRESS- OPPO. POWER GRID, NEAR VILLAGE KUMBH, AMLOH ROAD, MANDI GOBINDGARH</div>
              </div>
              <div>
                <div className="font-bold mb-2">• Party NAME - {data.partyName}</div>
                <div className="font-bold">• Party ADDRESS- {data.partyAddress}</div>
              </div>
            </div>

            {/* Document Details */}
            <div className="border-2 border-black p-4 mb-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div>T.C NO : {data.tcNumber || 'AUTO-GENERATED'}</div>
                  <div>Invoice NO : {data.invoiceNumber || 'AUTO-GENERATED'}</div>
                  <div>Po : {data.purchaseOrder}</div>
                </div>
                <div className="space-y-2 text-right">
                  <div>Date : {format(data.date, 'dd/MM/yy')}</div>
                  <div>Date : {format(data.date, 'dd/MM/yy')}</div>
                  <div>Date : {format(data.date, 'dd/MM/yy')}</div>
                </div>
              </div>
            </div>

            {/* First Table - Material Information */}
            <div className="mb-6">
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-sm font-bold">S.no</th>
                    <th className="border border-black p-2 text-sm font-bold">Roll no</th>
                    <th className="border border-black p-2 text-sm font-bold">Roll Dimensions</th>
                    <th className="border border-black p-2 text-sm font-bold">Grade</th>
                    <th className="border border-black p-2 text-sm font-bold">Hardness</th>
                    <th className="border border-black p-2 text-sm font-bold">Grade colour</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2 text-center text-sm">{index + 1}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.rollNo || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.rollSize || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm font-bold">{item.gradeType || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.hardness || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.color || '-'}</td>
                    </tr>
                  ))}
                  {/* Add empty rows if needed */}
                  {[...Array(Math.max(0, 3 - data.items.length))].map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black p-2 text-sm h-8">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Second Table - Chemical Properties */}
            <div className="mb-8">
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-1 text-xs font-bold">ROLL No</th>
                    <th className="border border-black p-1 text-xs font-bold">C</th>
                    <th className="border border-black p-1 text-xs font-bold">SI</th>
                    <th className="border border-black p-1 text-xs font-bold">MN</th>
                    <th className="border border-black p-1 text-xs font-bold">S</th>
                    <th className="border border-black p-1 text-xs font-bold">P</th>
                    <th className="border border-black p-1 text-xs font-bold">CR</th>
                    <th className="border border-black p-1 text-xs font-bold">NI</th>
                    <th className="border border-black p-1 text-xs font-bold">MO</th>
                    <th className="border border-black p-1 text-xs font-bold">V</th>
                    <th className="border border-black p-1 text-xs font-bold">MG</th>
                    <th className="border border-black p-1 text-xs font-bold">CU</th>
                    <th className="border border-black p-1 text-xs font-bold">TI</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-1 text-center text-xs">{item.rollNo || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.C || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.SI || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.MN || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.S || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.P || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.CR || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.NI || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.MO || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.V || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.MG || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.CU || '-'}</td>
                      <td className="border border-black p-1 text-center text-xs">{item.chemicalProperties.TI || '-'}</td>
                    </tr>
                  ))}
                  {/* Add empty rows if needed */}
                  {[...Array(Math.max(0, 3 - data.items.length))].map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black p-1 text-xs h-6">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                      <td className="border border-black p-1 text-xs">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Signature */}
            <div className="text-right">
              <div className="text-lg font-bold">AUTHORISED SIGNATORY</div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePreview;
