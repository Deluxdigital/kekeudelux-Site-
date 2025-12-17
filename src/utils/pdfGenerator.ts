import jsPDF from "jspdf";

interface BudgetPDFData {
  code: string;
  clientName: string;
  serviceType: string;
  items: Array<{
    name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }>;
  discount: number;
  total_value: number;
  date: string;
  logoBase64?: string;
}

export const generateBudgetPDF = async (data: BudgetPDFData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Logo (if available)
  if (data.logoBase64) {
    try {
      doc.addImage(data.logoBase64, "PNG", 15, yPos, 40, 15);
      yPos += 20;
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  }

  // Header - Company Info
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Agência Delux", 15, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("CNPJ: 45.735.338/0001-20", 15, yPos);
  yPos += 5;
  doc.text("Email: agenciadelux20@gmail.com", 15, yPos);
  yPos += 10;

  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // Budget Code and Date
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Orçamento: ${data.code}`, 15, yPos);
  doc.text(`Data: ${data.date}`, pageWidth - 15, yPos, { align: "right" });
  yPos += 10;

  // Horizontal line
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // Client Info
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Cliente:", 15, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.clientName, 40, yPos);
  yPos += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Serviço:", 15, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.serviceType, 40, yPos);
  yPos += 10;

  // Horizontal line
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // Items Table Header
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Item", 15, yPos);
  doc.text("Qtd", pageWidth / 2 - 20, yPos);
  doc.text("Valor Unit.", pageWidth / 2 + 10, yPos);
  doc.text("Subtotal", pageWidth - 40, yPos, { align: "right" });
  yPos += 5;

  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 8;

  // Items
  doc.setFont("helvetica", "normal");
  data.items.forEach((item) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    doc.text(item.name, 15, yPos);
    doc.text(item.quantity.toString(), pageWidth / 2 - 20, yPos);
    doc.text(`R$ ${item.unit_price.toFixed(2)}`, pageWidth / 2 + 10, yPos);
    doc.text(`R$ ${item.subtotal.toFixed(2)}`, pageWidth - 40, yPos, { align: "right" });
    yPos += 7;
  });

  yPos += 3;
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 8;

  // Totals
  if (data.discount > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Desconto:", pageWidth - 80, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`- R$ ${data.discount.toFixed(2)}`, pageWidth - 40, yPos, { align: "right" });
    yPos += 7;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", pageWidth - 80, yPos);
  doc.text(`R$ ${data.total_value.toFixed(2)}`, pageWidth - 40, yPos, { align: "right" });
  yPos += 10;

  // Bottom line
  doc.setLineWidth(0.5);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 10;

  // Footer
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Agradecemos pela confiança!", pageWidth / 2, yPos, { align: "center" });
  yPos += 5;
  doc.text("agenciadelux20@gmail.com | CNPJ: 45.735.338/0001-20", pageWidth / 2, yPos, { align: "center" });

  // Save PDF
  doc.save(`Orcamento_${data.code}.pdf`);
};
