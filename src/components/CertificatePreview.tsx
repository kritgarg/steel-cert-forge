
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const CertificatePreview = ({ data }) => {
  const generateTCNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `CSCPL/${day}-${month}/${year.toString().slice(-2)}`;
  };

  const generateInvoiceNumber = () => {
    return `CSCPL-${Math.floor(Math.random() * 999) + 100}`;
  };

  return (
    <Card className="shadow-lg" id="certificate-preview">
      <CardContent className="p-0">
        <div className="bg-white p-6 font-mono text-sm">
          {/* Header */}
          <div className="border-2 border-black p-4 mb-0">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs">
                <div>GST NO: 23AAGCC1339D1ZE</div>
              </div>
              <div className="text-center flex-1">
                <h1 className="text-xl font-bold">MATERIAL CERTIFICATION</h1>
              </div>
              <div className="text-xs text-right">
                <div>MOBILE NO: 98551-11991</div>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
                  <div className="text-xs font-bold">CS</div>
                </div>
                <div>
                  <h2 className="text-lg font-bold">C.S.CASTINGS PVT.LTD.</h2>
                  <p className="text-xs">( A UNIT OF : HARDESH GROUP OF COMPANIES )</p>
                  <p className="text-xs mt-2">OFF POWER GRID, NEAR VILLAGE KUMBH</p>
                  <p className="text-xs">AMLOH ROAD, MANDI GOBINDGARH-147301</p>
                </div>
              </div>
              <div className="text-right text-xs">
                <div>T.C.NO: {generateTCNumber()}</div>
                <div>DATE: {format(data.date, 'dd/MM/yyyy')}</div>
                <div className="mt-4">INVOICE NO: {generateInvoiceNumber()}</div>
                <div>DATE: {format(data.date, 'dd/MM/yyyy')}</div>
              </div>
            </div>
          </div>

          {/* Chemical Properties Table */}
          <div className="border-l-2 border-r-2 border-black">
            <h3 className="text-center text-lg font-bold py-2 bg-gray-100">
              CHEMICAL PROPERTIES OF METALS
            </h3>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th className="border-r border-black p-2 text-xs">ROLL NO</th>
                  <th className="border-r border-black p-2 text-xs">ROLL SIZE</th>
                  <th className="border-r border-black p-2 text-xs">Material</th>
                  <th className="border-r border-black p-2 text-xs">C</th>
                  <th className="border-r border-black p-2 text-xs">MN</th>
                  <th className="border-r border-black p-2 text-xs">SI</th>
                  <th className="border-r border-black p-2 text-xs">S</th>
                  <th className="border-r border-black p-2 text-xs">P</th>
                  <th className="border-r border-black p-2 text-xs">CR</th>
                  <th className="border-r border-black p-2 text-xs">NI</th>
                  <th className="border-r border-black p-2 text-xs">MO</th>
                  <th className="border-r border-black p-2 text-xs">V</th>
                  <th className="p-2 text-xs">HARDNESS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2 text-center text-xs">{data.rollNo || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.rollSize || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs font-bold">{data.material}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.C || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.MN || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.SI || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.S || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.P || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.CR || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.NI || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.MO || '-'}</td>
                  <td className="border-r border-black p-2 text-center text-xs">{data.chemicalProperties.V || '-'}</td>
                  <td className="p-2 text-center text-xs">{data.hardness}</td>
                </tr>
                {/* Empty rows for spacing */}
                {[...Array(4)].map((_, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="border-r border-black p-2 text-xs">&nbsp;</td>
                    <td className="p-2 text-xs">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Information */}
          <div className="border-2 border-t-0 border-black p-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2 text-xs">
                <div><span className="font-bold">PARTY NAME:</span> {data.partyName}</div>
                <div><span className="font-bold">PARTY ADDRESS:</span> {data.partyAddress}</div>
                <div><span className="font-bold">P.O.:</span> {data.purchaseOrder}</div>
                <div><span className="font-bold">DATE:</span> {format(data.date, 'dd/MM/yyyy')}</div>
              </div>
              <div className="space-y-2 text-xs">
                <div><span className="font-bold">MATERIAL GRADE:</span> {data.material.toUpperCase()}</div>
                <div><span className="font-bold">COLOUR CODE:</span> RED</div>
                <div><span className="font-bold">{data.material.toUpperCase()}:</span> RED</div>
                <div className="text-right mt-8 font-bold">C.S.CASTINGS PVT.LTD.</div>
                <div className="text-right text-xs">AUTHORISED SIGNATORY</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatePreview;
