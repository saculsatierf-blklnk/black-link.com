import { jsPDF } from 'jspdf';
import { supabase } from '../_lib/supabase';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 255, g: 255, b: 255 };
};

// Extrator de Imagem Base64
const fetchImageBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
};

const baseProtocolos: Record<string, { imagem: string, copy: string }> = {
  "Harmonização Orofacial": { imagem: "/assets/servicos/harmonizacao.jpg", copy: "Arquitetura facial de elite. Proporções matemáticas para um rosto de impacto e sofisticação." },
  "Bioestimuladores": { imagem: "/assets/servicos/bioestimuladores.jpg", copy: "Redensificação dérmica avançada. O retorno do colágeno para uma sustentação impecável." },
  "Ultraformer III": { imagem: "/assets/servicos/ultraformer.jpg", copy: "Lifting não cirúrgico de alta precisão. Ancoragem muscular com tecnologia micro e macrofocada." },
  "Glass Skin": { imagem: "/assets/servicos/glass-skin.jpg", copy: "Textura de porcelana. Refinamento de poros e luminosidade absoluta para uma pele inconfundível." },
  "Fios PDO": { imagem: "/assets/servicos/fios-pdo.jpg", copy: "Sustentação biológica. Reposicionamento de tecidos com indução máxima de colágeno." },
  "Toxina Botulínica": { imagem: "/assets/servicos/toxina.jpg", copy: "Suavização inteligente. Expressões preservadas com a eliminação de marcas de fadiga." },
  "Rinomodelação": { imagem: "/assets/servicos/rinomodelacao.jpg", copy: "Reestruturação nasal não invasiva. Simetria e perfil perfeitamente alinhados." },
  "Transplante Capilar": { imagem: "/assets/servicos/transplante-capilar.jpg", copy: "Redensificação folicular de precisão. O resgate definitivo do volume e da moldura facial." },
  "Lentes de Porcelana": { imagem: "/assets/servicos/lentes.jpg", copy: "Sorriso de assinatura. Acabamento mirror effect com espessura mínima e resistência máxima." },
  "Implantes de Zircônia": { imagem: "/assets/servicos/implantes.jpg", copy: "A evolução metal-free. Integração óssea perfeita com estética gengival irretocável." },
  "Alinhadores Invisíveis": { imagem: "/assets/servicos/alinhadores.jpg", copy: "Ortodontia digital de alta performance. Movimentação milimétrica com invisibilidade total." },
  "Clareamento a Laser": { imagem: "/assets/servicos/clareamento.jpg", copy: "Fotobiomodulação estética. Brancura em níveis máximos com proteção estrutural do esmalte." },
  "Facetas em Resina": { imagem: "/assets/servicos/facetas-resina.jpg", copy: "Escultura manual de elite. Remodelagem imediata com polimento de alto brilho." },
  "Diagnóstico Digital": { imagem: "/assets/servicos/diagnostico-tech.jpg", copy: "Mapeamento 3D absoluto. Previsibilidade cirúrgica e planejamento milimétrico de cada detalhe." }
};

export const gerarDossiePdf = async (dados: any): Promise<string | null> => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  const themesData: Record<string, { bg: string, text: string, accent: string }> = {
    obsidian: { bg: '#030303', text: '#e5e7eb', accent: '#C5A059' },
    chrome: { bg: '#080808', text: '#f8fafc', accent: '#E2E8F0' },
    alabaster: { bg: '#F9F7F2', text: '#1A1A1A', accent: '#8E6D45' },
    emerald: { bg: '#05120B', text: '#F0F0F0', accent: '#E2E2E2' },
    royal: { bg: '#0A0F1A', text: '#FFFFFF', accent: '#C0C0C0' },
    vantablack: { bg: '#000000', text: '#a1a1aa', accent: '#ffffff' }
  };

  let selectedTheme = themesData[dados.theme] || themesData['obsidian'];

  const isClinicaBlk = dados.clinicName && dados.clinicName.toUpperCase().includes('BLK');
  if (isClinicaBlk) {
    selectedTheme = { bg: '#022c22', text: '#F4F1EA', accent: '#FFFFF0' }; 
  }

  const bgRgb = hexToRgb(selectedTheme.bg);
  const textRgb = hexToRgb(selectedTheme.text);
  const accentRgb = hexToRgb(selectedTheme.accent);

  const drawBackgroundAndFooter = (pageNumber: number) => {
    doc.setPage(pageNumber);
    doc.setFillColor(bgRgb.r, bgRgb.g, bgRgb.b);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
    doc.text("CONFIDENCIAL | BLACK LINK ECOSYSTEM | 2026", 105, 285, { align: "center" });
  };

  // --- CAPA DE LUXO ---
  drawBackgroundAndFooter(1);
  
  // Moldura Arquitetural de Elite (Dupla Borda)
  doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
  doc.setLineWidth(0.4);
  doc.rect(15, 15, 180, 267);
  doc.setLineWidth(0.1);
  doc.rect(17, 17, 176, 263);

  doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
  doc.setFont("helvetica", "normal"); 
  doc.setFontSize(12);
  doc.text("A R Q U I T E T U R A   D E   A U T O R I D A D E", 105, 90, { align: "center" });

  doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
  // Compatibilidade nativa do Time para o look Serif
  doc.setFont("times", "bold"); 
  doc.setFontSize(38);
  doc.text("DOSSIÊ DO PROJETO", 105, 120, { align: "center" });

  doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
  doc.setLineWidth(0.5);
  doc.line(80, 140, 130, 140);

  doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(`EXCLUSIVO PARA: ${(dados.clinicName || "CLÍNICA ELITE").toUpperCase()}`, 105, 165, { align: "center" });

  // --- ESTRATÉGIA ---
  doc.addPage();
  let pageCount = 2;
  drawBackgroundAndFooter(pageCount);
  let cursorY = 35;
  const marginX = 25;

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
  doc.text("I. ESTRATÉGIA DE POSICIONAMENTO", marginX, cursorY);
  cursorY += 8;
  doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
  doc.setLineWidth(0.2);
  doc.line(marginX, cursorY, 185, cursorY);
  cursorY += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
  
  const fontName = isClinicaBlk ? 'FORTUNE' : (dados.typography || 'VANGUARDA').toUpperCase();
  const textoEstrategia = `A tipografia ${fontName} e o espectro de cor selecionado foram arquitetados para ancorar a percepção de alto valor em ${dados.location || 'sua região'}. Esta combinação projeta autoridade incontestável para ${dados.ceoName || 'a liderança'}. O espaçamento e a hierarquia visual foram matematicamente projetados para conversão e distanciamento da concorrência.`;
  
  const linhasEstrategia = doc.splitTextToSize(textoEstrategia, 160);
  doc.text(linhasEstrategia, marginX, cursorY, { lineHeightFactor: 1.6 });
  cursorY += (linhasEstrategia.length * 6) + 18;

  // --- O INVENTÁRIO (MAGAZINE LAYOUT) ---
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
  doc.text("II. INVENTÁRIO DE PROTOCOLOS", marginX, cursorY);
  cursorY += 8;
  doc.line(marginX, cursorY, 185, cursorY);
  cursorY += 12;

  const listaProcessar = (dados.selectedProtocols && dados.selectedProtocols.length > 0) 
    ? dados.selectedProtocols 
    : Object.keys(baseProtocolos).slice(0,3);

  for (const protocolo of listaProcessar) {
    const dadosServico = baseProtocolos[protocolo];
    
    if (!dadosServico) {
      if (cursorY > 260) {
        doc.addPage();
        pageCount++;
        drawBackgroundAndFooter(pageCount);
        cursorY = 35;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
      doc.text(`— ${protocolo.toUpperCase()}`, marginX + 5, cursorY);
      cursorY += 10;
      continue;
    }

    // Se tiver dados na matriz (Foto + Texto), faz a injeção em Estilo "Magazine"
    // Margens generosas e quebra de página rigorosa para não engolir fotos grandes
    if (cursorY > 150) {
      doc.addPage();
      pageCount++;
      drawBackgroundAndFooter(pageCount);
      cursorY = 25;
    }

    // 1. Injetar Imagem em Formato Paisagem Absoluta (Estilo Editorial)
    const imgBase64 = await fetchImageBase64(dadosServico.imagem);
    if (imgBase64) {
      doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
      doc.setLineWidth(0.2);
      // Retângulo enorme
      const imgWidth = 160;
      const imgHeight = 90;
      doc.rect(marginX, cursorY, imgWidth, imgHeight);
      doc.addImage(imgBase64, 'JPEG', marginX + 0.5, cursorY + 0.5, imgWidth - 1, imgHeight - 1);
      cursorY += imgHeight + 12; // Avança o cursor
    } else {
      // Fallback
      doc.setFillColor(30, 30, 30);
      doc.rect(marginX, cursorY, 160, 90, 'F');
      cursorY += 102;
    }

    // 2. Títulos e Textos de Alta Hierarquia Visual
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.text(protocolo.toUpperCase(), marginX, cursorY);

    cursorY += 8;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
    const linhasCopy = doc.splitTextToSize(dadosServico.copy, 160);
    doc.text(linhasCopy, marginX, cursorY, { lineHeightFactor: 1.6 });

    cursorY += (linhasCopy.length * 6) + 24; // Espaçamento massivo para o próximo bloco
  }

  cursorY += 12;

  // --- ACELERAÇÃO E EXPANSÃO ---
  if (dados.expansionPillars && dados.expansionPillars.length > 0) {
    if (cursorY > 240) {
      doc.addPage();
      pageCount++;
      drawBackgroundAndFooter(pageCount);
      cursorY = 35;
    }
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.text("III. ACELERAÇÃO E EXPANSÃO", marginX, cursorY);
    cursorY += 8;
    doc.setDrawColor(accentRgb.r, accentRgb.g, accentRgb.b);
    doc.line(marginX, cursorY, 185, cursorY);
    cursorY += 12;
    dados.expansionPillars.forEach((pilar: string) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
      doc.text(`— ${pilar.toUpperCase()}`, marginX + 5, cursorY);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(accentRgb.r, accentRgb.g, accentRgb.b);
      doc.text("[ RESERVADO ]", 155, cursorY);
      cursorY += 10;
    });
  }

  // --- FINALIZAÇÃO E SUPABASE ---
  const nomeLimpo = (dados.clinicName || 'Elite')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();

  const timestamp = Date.now();
  const fileName = `dossie-${nomeLimpo}-${timestamp}.pdf`;

  try {
    const pdfBlob = doc.output('blob');
    const { error } = await supabase.storage.from('dossies').upload(fileName, pdfBlob, {
      contentType: 'application/pdf',
      upsert: true
    });

    if (error) {
      console.error('[X] Falha no Supabase:', error.message);
      doc.save(fileName);
      return null;
    }

    const { data: publicData } = supabase.storage.from('dossies').getPublicUrl(fileName);
    return encodeURI(publicData.publicUrl);

  } catch (error) {
    console.error('[X] Falha:', error);
    doc.save(fileName);
    return null;
  }
};
