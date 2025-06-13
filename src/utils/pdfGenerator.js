
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const generatePDF = async (formData) => {
  try {
    const element = document.getElementById('certificate-preview');
    if (!element) {
      throw new Error('Certificate preview element not found');
    }

    // Configure html2canvas for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit the image properly
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10; // Small margin from top
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Generate filename with party name and date
    const dateStr = format(formData.date, 'dd-MM-yyyy');
    const partyName = formData.partyName ? formData.partyName.replace(/[^a-zA-Z0-9]/g, '_') : 'Unknown_Party';
    const filename = `${partyName}_${dateStr}.pdf`;
    
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
