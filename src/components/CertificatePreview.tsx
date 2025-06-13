
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const CertificatePreview = ({ data }) => {
  return (
    <Card className="shadow-lg" id="certificate-preview">
      <CardContent className="p-0">
        {/* A4 size: 210mm x 297mm - using full width and height */}
        <div className="bg-white font-sans text-sm mx-auto" style={{ width: '210mm', height: '297mm', minHeight: '297mm' }}>
          {/* Main Border with padding */}
          <div className="border-4 border-black p-6 h-full flex flex-col">
            
            {/* Header with Logo and Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center bg-gray-100">
                <div className="text-lg font-bold text-gray-600">CS</div>
              </div>
              <h1 className="text-4xl font-bold text-center flex-1 mx-4">Material Certificate</h1>
              <div className="w-20"></div>
            </div>

            {/* Company and Party Information */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="font-bold mb-3 text-base">• COMPANY NAME - CS CASTINGS PVT. LTD.</div>
                <div className="font-bold text-base">• COMPANY ADDRESS- OPPO. POWER GRID, NEAR VILLAGE KUMBH, AMLOH ROAD, MANDI GOBINDGARH</div>
              </div>
              <div>
                <div className="font-bold mb-3 text-base">• Party NAME - {data.partyName}</div>
                <div className="font-bold text-base">• Party ADDRESS- {data.partyAddress}</div>
              </div>
            </div>

            {/* Document Details */}
            <div className="border-2 border-black p-4 mb-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-base">T.C NO : {data.tcNumber || 'AUTO-GENERATED'}</div>
                  <div className="text-base">Invoice NO : {data.invoiceNumber || 'AUTO-GENERATED'}</div>
                  <div className="text-base">Po : {data.purchaseOrder}</div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="text-base">Date : {format(data.date, 'dd/MM/yy')}</div>
                  <div className="text-base">Date : {format(data.date, 'dd/MM/yy')}</div>
                  <div className="text-base">Date : {format(data.date, 'dd/MM/yy')}</div>
                </div>
              </div>
            </div>

            {/* First Table - Material Information */}
            <div className="mb-6 flex-1">
              <table className="w-full border-collapse border-2 border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-3 text-base font-bold">S.no</th>
                    <th className="border border-black p-3 text-base font-bold">Roll no</th>
                    <th className="border border-black p-3 text-base font-bold">Roll Dimensions</th>
                    <th className="border border-black p-3 text-base font-bold">Grade</th>
                    <th className="border border-black p-3 text-base font-bold">Hardness</th>
                    <th className="border border-black p-3 text-base font-bold">Grade colour</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-3 text-center text-base">{index + 1}</td>
                      <td className="border border-black p-3 text-center text-base">{item.rollNo || '-'}</td>
                      <td className="border border-black p-3 text-center text-base">{item.rollSize || '-'}</td>
                      <td className="border border-black p-3 text-center text-base font-bold">{item.gradeType || '-'}</td>
                      <td className="border border-black p-3 text-center text-base">{item.hardness || '-'}</td>
                      <td className="border border-black p-3 text-center text-base">{item.color || '-'}</td>
                    </tr>
                  ))}
                  {/* Add more empty rows to fill the space */}
                  {[...Array(Math.max(0, 6 - data.items.length))].map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black p-3 text-base h-12">&nbsp;</td>
                      <td className="border border-black p-3 text-base">&nbsp;</td>
                      <td className="border border-black p-3 text-base">&nbsp;</td>
                      <td className="border border-black p-3 text-base">&nbsp;</td>
                      <td className="border border-black p-3 text-base">&nbsp;</td>
                      <td className="border border-black p-3 text-base">&nbsp;</td>
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
                    <th className="border border-black p-2 text-sm font-bold">ROLL No</th>
                    <th className="border border-black p-2 text-sm font-bold">C</th>
                    <th className="border border-black p-2 text-sm font-bold">SI</th>
                    <th className="border border-black p-2 text-sm font-bold">MN</th>
                    <th className="border border-black p-2 text-sm font-bold">S</th>
                    <th className="border border-black p-2 text-sm font-bold">P</th>
                    <th className="border border-black p-2 text-sm font-bold">CR</th>
                    <th className="border border-black p-2 text-sm font-bold">NI</th>
                    <th className="border border-black p-2 text-sm font-bold">MO</th>
                    <th className="border border-black p-2 text-sm font-bold">V</th>
                    <th className="border border-black p-2 text-sm font-bold">MG</th>
                    <th className="border border-black p-2 text-sm font-bold">CU</th>
                    <th className="border border-black p-2 text-sm font-bold">TI</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2 text-center text-sm">{item.rollNo || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.C || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.SI || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.MN || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.S || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.P || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.CR || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.NI || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.MO || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.V || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.MG || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.CU || '-'}</td>
                      <td className="border border-black p-2 text-center text-sm">{item.chemicalProperties.TI || '-'}</td>
                    </tr>
                  ))}
                  {/* Add more empty rows for chemical properties */}
                  {[...Array(Math.max(0, 6 - data.items.length))].map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="border border-black p-2 text-sm h-10">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
                      <td className="border border-black p-2 text-sm">&nbsp;</td>
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

            {/* Footer Signature - More space allocated */}
            <div className="text-right mt-auto pt-8">
              <div className="h-16 mb-4"></div>
              <div className="text-xl font-bold">AUTHORISED SIGNATORY</div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePreview;
