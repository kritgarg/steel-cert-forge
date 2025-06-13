import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, RotateCcw, FileText, Plus, Download } from "lucide-react";
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
    invoiceNumber: '',
    poDate: new Date(),
    tcNumber: '',
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    rollNo: '',
    rollSize: '',
    gradeType: '',
    color: '',
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
      CU: '',
      TI: ''
    },
    hardness: ''
  });

  const [showPreview, setShowPreview] = useState(false);

  // Refs for input navigation
  const inputRefs = useRef({});

  const gradeOptions = [
    'Adamite',
    'Accicular', 
    'Alloy',
    'Mild Steel',
    'Cast Iron'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrentItemChange = (field, value) => {
    setCurrentItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChemicalPropertyChange = (element, value) => {
    setCurrentItem(prev => ({
      ...prev,
      chemicalProperties: {
        ...prev.chemicalProperties,
        [element]: value
      }
    }));
  };

  const handleKeyPress = (event, nextField) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (nextField && inputRefs.current[nextField]) {
        inputRefs.current[nextField].focus();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date(),
      partyName: '',
      partyAddress: '',
      purchaseOrder: '',
      invoiceNumber: '',
      poDate: new Date(),
      tcNumber: '',
      items: []
    });
    setCurrentItem({
      rollNo: '',
      rollSize: '',
      gradeType: '',
      color: '',
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
        CU: '',
        TI: ''
      },
      hardness: ''
    });
    setShowPreview(false);
    toast({ title: "Success", description: "Form reset successfully!" });
  };

  const addItemToList = () => {
    if (!currentItem.gradeType) {
      toast({ title: "Error", description: "Please select a grade type before adding", variant: "destructive" });
      return;
    }

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...currentItem }]
    }));

    // Reset current item
    setCurrentItem({
      rollNo: '',
      rollSize: '',
      gradeType: '',
      color: '',
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
        CU: '',
        TI: ''
      },
      hardness: ''
    });

    toast({ title: "Success", description: "Item added to list!" });
  };

  const generateBill = () => {
    if (!formData.partyName) {
      toast({ title: "Error", description: "Please enter party name", variant: "destructive" });
      return;
    }
    
    if (formData.items.length === 0) {
      toast({ title: "Error", description: "Please add at least one item", variant: "destructive" });
      return;
    }
    
    setShowPreview(true);
    toast({ title: "Success", description: "Certificate preview generated successfully!" });
  };

  const downloadPDF = async () => {
    try {
      await generatePDF(formData);
      toast({ title: "Success", description: "PDF downloaded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate PDF", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Material Certification</h1>
          <div className="flex gap-4">
            <Button 
              onClick={resetForm}
              variant="outline" 
              className="flex items-center gap-2 px-6 py-3 text-lg"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </Button>
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button 
                  onClick={generateBill}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 text-lg"
                >
                  <FileText className="h-5 w-5" />
                  Generate Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between text-xl">
                    Certificate Preview
                    <Button onClick={downloadPDF} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </DialogTitle>
                </DialogHeader>
                <CertificatePreview data={formData} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information */}
          <Card className="h-fit">
            <div className="bg-slate-700 text-white p-6 rounded-t-lg">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Basic Information
              </h2>
            </div>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-700">
                  Party Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  ref={el => inputRefs.current['partyName'] = el}
                  placeholder="Enter party name"
                  value={formData.partyName}
                  onChange={(e) => handleInputChange('partyName', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'partyAddress')}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">Party Address</Label>
                <Textarea
                  ref={el => inputRefs.current['partyAddress'] = el}
                  placeholder="Enter complete address"
                  value={formData.partyAddress}
                  onChange={(e) => handleInputChange('partyAddress', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'purchaseOrder')}
                  className="mt-2 text-base"
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">Purchase Order</Label>
                <Input
                  ref={el => inputRefs.current['purchaseOrder'] = el}
                  placeholder="e.g., POT23456"
                  value={formData.purchaseOrder}
                  onChange={(e) => handleInputChange('purchaseOrder', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'invoiceNumber')}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">Invoice Number</Label>
                <Input
                  ref={el => inputRefs.current['invoiceNumber'] = el}
                  placeholder="e.g., INV123456"
                  value={formData.invoiceNumber}
                  onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'tcNumber')}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium text-gray-700">PO Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2 h-12 text-base",
                          !formData.poDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {formData.poDate ? format(formData.poDate, "MMM do, yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.poDate}
                        onSelect={(date) => handleInputChange('poDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-700">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2 h-12 text-base",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {formData.date ? format(formData.date, "MMM do, yyyy") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => handleInputChange('date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">T.C. Number</Label>
                <Input
                  ref={el => inputRefs.current['tcNumber'] = el}
                  placeholder="CSCPL/13-06/25"
                  value={formData.tcNumber}
                  onChange={(e) => handleInputChange('tcNumber', e.target.value)}
                  className="mt-2 h-12 text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Material Details */}
          <Card className="h-fit">
            <div className="bg-slate-700 text-white p-6 rounded-t-lg">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Material Details
              </h2>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium text-gray-700">Grade Type</Label>
                  <Select 
                    value={currentItem.gradeType} 
                    onValueChange={(value) => handleCurrentItemChange('gradeType', value)}
                  >
                    <SelectTrigger className="mt-2 h-12 text-base">
                      <SelectValue placeholder="Select grade type" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-700">Roll Number</Label>
                  <Input
                    ref={el => inputRefs.current['rollNumber'] = el}
                    placeholder="Enter roll number"
                    value={currentItem.rollNo}
                    onChange={(e) => handleCurrentItemChange('rollNo', e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'rollSize')}
                    className="mt-2 h-12 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium text-gray-700">Roll Size</Label>
                  <Input
                    ref={el => inputRefs.current['rollSize'] = el}
                    placeholder="e.g., 520X800/240X320"
                    value={currentItem.rollSize}
                    onChange={(e) => handleCurrentItemChange('rollSize', e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'hardness')}
                    className="mt-2 h-12 text-base"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-700">Hardness</Label>
                  <Input
                    ref={el => inputRefs.current['hardness'] = el}
                    placeholder="Enter hardness value"
                    value={currentItem.hardness}
                    onChange={(e) => handleCurrentItemChange('hardness', e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'color')}
                    className="mt-2 h-12 text-base"
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700">Color</Label>
                <Input
                  ref={el => inputRefs.current['color'] = el}
                  placeholder="Enter color"
                  value={currentItem.color}
                  onChange={(e) => handleCurrentItemChange('color', e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'C')}
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-4 block">Chemical Properties</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">C</Label>
                      <Input
                        ref={el => inputRefs.current['C'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.C}
                        onChange={(e) => handleChemicalPropertyChange('C', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'MN')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">MN</Label>
                      <Input
                        ref={el => inputRefs.current['MN'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.MN}
                        onChange={(e) => handleChemicalPropertyChange('MN', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'SI')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">SI</Label>
                      <Input
                        ref={el => inputRefs.current['SI'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.SI}
                        onChange={(e) => handleChemicalPropertyChange('SI', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'S')}
                        className="text-base h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">S</Label>
                      <Input
                        ref={el => inputRefs.current['S'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.S}
                        onChange={(e) => handleChemicalPropertyChange('S', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'P')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">P</Label>
                      <Input
                        ref={el => inputRefs.current['P'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.P}
                        onChange={(e) => handleChemicalPropertyChange('P', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'CR')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">CR</Label>
                      <Input
                        ref={el => inputRefs.current['CR'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.CR}
                        onChange={(e) => handleChemicalPropertyChange('CR', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'NI')}
                        className="text-base h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">NI</Label>
                      <Input
                        ref={el => inputRefs.current['NI'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.NI}
                        onChange={(e) => handleChemicalPropertyChange('NI', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'MO')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">MO</Label>
                      <Input
                        ref={el => inputRefs.current['MO'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.MO}
                        onChange={(e) => handleChemicalPropertyChange('MO', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'V')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">V</Label>
                      <Input
                        ref={el => inputRefs.current['V'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.V}
                        onChange={(e) => handleChemicalPropertyChange('V', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'MG')}
                        className="text-base h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">MG</Label>
                      <Input
                        ref={el => inputRefs.current['MG'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.MG}
                        onChange={(e) => handleChemicalPropertyChange('MG', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'CU')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">CU</Label>
                      <Input
                        ref={el => inputRefs.current['CU'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.CU}
                        onChange={(e) => handleChemicalPropertyChange('CU', e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'TI')}
                        className="text-base h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">TI</Label>
                      <Input
                        ref={el => inputRefs.current['TI'] = el}
                        placeholder="0.000"
                        value={currentItem.chemicalProperties.TI}
                        onChange={(e) => handleChemicalPropertyChange('TI', e.target.value)}
                        className="text-base h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={addItemToList}
                className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 h-12 text-base"
              >
                <Plus className="h-5 w-5" />
                Add Item to List
              </Button>
            </CardContent>
          </Card>

          {/* Add Items Section */}
          <Card className="h-fit">
            <div className="bg-slate-700 text-white p-6 rounded-t-lg">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Add Items ({formData.items.length})
              </h2>
            </div>
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-4">Items Added</h3>
                {formData.items.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText className="h-20 w-20 mx-auto text-gray-300 mb-6" />
                    <p className="text-gray-500 text-lg">No items added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {formData.items.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 text-left">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900 text-lg">Item {index + 1}</h4>
                          <Button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                items: prev.items.filter((_, i) => i !== index)
                              }));
                            }}
                            variant="outline"
                            size="sm"
                            className="text-base"
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="text-base text-gray-600 space-y-2">
                          <div><span className="font-medium">Grade:</span> {item.gradeType}</div>
                          <div><span className="font-medium">Roll:</span> {item.rollNo} ({item.rollSize})</div>
                          <div><span className="font-medium">Hardness:</span> {item.hardness}</div>
                          <div><span className="font-medium">Color:</span> {item.color}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
