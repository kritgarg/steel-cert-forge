
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import CertificatePreview from "../components/CertificatePreview";
import { generatePDF } from "../utils/pdfGenerator";

const Index = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    partyName: '',
    partyAddress: '',
    purchaseOrder: '',
    items: [{
      rollNo: '',
      rollSize: '',
      material: '',
      chemicalProperties: {
        C: '',
        MN: '',
        SI: '',
        S: '',
        P: '',
        CR: '',
        NI: '',
        MO: '',
        V: '',
        MG: '',
        CU: ''
      },
      hardness: ''
    }]
  });

  const [showPreview, setShowPreview] = useState(false);

  const materialOptions = [
    'Adamite',
    'Accicular', 
    'Alloy',
    'Mild Steel',
    'Cast Iron'
  ];

  const chemicalElements = ['C', 'MN', 'SI', 'S', 'P', 'CR', 'NI', 'MO', 'V', 'MG', 'CU'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (itemIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, index) => 
        index === itemIndex ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleChemicalPropertyChange = (itemIndex, element, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, index) => 
        index === itemIndex ? {
          ...item,
          chemicalProperties: {
            ...item.chemicalProperties,
            [element]: value
          }
        } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        rollNo: '',
        rollSize: '',
        material: '',
        chemicalProperties: {
          C: '',
          MN: '',
          SI: '',
          S: '',
          P: '',
          CR: '',
          NI: '',
          MO: '',
          V: '',
          MG: '',
          CU: ''
        },
        hardness: ''
      }]
    }));
  };

  const removeItem = (itemIndex) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, index) => index !== itemIndex)
      }));
    }
  };

  const validateForm = () => {
    if (!formData.partyName) {
      toast({ title: "Error", description: "Please enter party name", variant: "destructive" });
      return false;
    }
    
    const hasValidItem = formData.items.some(item => 
      item.material && item.hardness
    );
    
    if (!hasValidItem) {
      toast({ title: "Error", description: "Please fill at least one complete item with material and hardness", variant: "destructive" });
      return false;
    }
    
    return true;
  };

  const handleGenerateCertificate = () => {
    if (validateForm()) {
      setShowPreview(true);
      toast({ title: "Success", description: "Certificate preview generated successfully!" });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(formData);
      toast({ title: "Success", description: "PDF downloaded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate PDF", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Material Certificate Generator</h1>
          <p className="text-slate-600">Generate professional material certification documents</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-lg">
            <CardHeader className="bg-slate-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificate Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Party Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b pb-2">Party Information</h3>
                
                <div>
                  <Label htmlFor="partyName">Party Name</Label>
                  <Input
                    id="partyName"
                    placeholder="Enter party name"
                    value={formData.partyName}
                    onChange={(e) => handleInputChange('partyName', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="partyAddress">Party Address</Label>
                  <Textarea
                    id="partyAddress"
                    placeholder="Enter complete address"
                    value={formData.partyAddress}
                    onChange={(e) => handleInputChange('partyAddress', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaseOrder">Purchase Order Number</Label>
                    <Input
                      id="purchaseOrder"
                      placeholder="Enter PO number"
                      value={formData.purchaseOrder}
                      onChange={(e) => handleInputChange('purchaseOrder', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Certificate Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => handleInputChange('date', date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-700 border-b pb-2">Material Items</h3>
                  <Button
                    onClick={addItem}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                {formData.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="border-2 border-slate-200">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-600">Item {itemIndex + 1}</h4>
                        {formData.items.length > 1 && (
                          <Button
                            onClick={() => removeItem(itemIndex)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Basic Item Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Material Type</Label>
                          <Select 
                            value={item.material} 
                            onValueChange={(value) => handleItemChange(itemIndex, 'material', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                            <SelectContent>
                              {materialOptions.map(material => (
                                <SelectItem key={material} value={material}>{material}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Hardness</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 52-53"
                            value={item.hardness}
                            onChange={(e) => handleItemChange(itemIndex, 'hardness', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label>Roll Number</Label>
                          <Input
                            placeholder="e.g., 240"
                            value={item.rollNo}
                            onChange={(e) => handleItemChange(itemIndex, 'rollNo', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label>Roll Size</Label>
                          <Input
                            placeholder="e.g., 520X800/240X320/220X200"
                            value={item.rollSize}
                            onChange={(e) => handleItemChange(itemIndex, 'rollSize', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Chemical Properties */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-slate-600">Chemical Properties</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {chemicalElements.map(element => (
                            <div key={element}>
                              <Label>{element}</Label>
                              <Input
                                type="number"
                                step="0.001"
                                placeholder="0.000"
                                value={item.chemicalProperties[element]}
                                onChange={(e) => handleChemicalPropertyChange(itemIndex, element, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleGenerateCertificate}
                  className="flex-1 bg-slate-800 hover:bg-slate-700"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Certificate
                </Button>
                
                {showPreview && (
                  <Button 
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="space-y-4">
            {showPreview ? (
              <CertificatePreview data={formData} />
            ) : (
              <Card className="shadow-lg h-96 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Certificate preview will appear here</p>
                  <p className="text-sm">Fill the form and click "Generate Certificate"</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
