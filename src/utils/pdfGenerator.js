
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const generatePDF = async (formData) => {
  try {
    const element = document.getElementById('certificate-preview');
    if (!element) {
      throw new Error('Certificate preview element not found');
    }

    // Configure html2canvas for better quality with A4 dimensions
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF with A4 dimensions in portrait mode
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    // Use full A4 dimensions
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
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
