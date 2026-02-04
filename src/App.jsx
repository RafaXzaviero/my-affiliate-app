import React, { useState } from 'react';
import { 
  Copy, 
  FileText, 
  Sparkles, 
  Trash2, 
  CheckCircle, 
  Moon,
  Sun,
  Printer,
  Settings
} from 'lucide-react';

/**
 * Komponen Utama Aplikasi Affiliate Script Generator
 * Fitur: Dark Mode, Generate Script, Export PDF, & Copy Clipboard
 */
export default function App() {
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productBenefits, setProductBenefits] = useState('');
  
  const [settings, setSettings] = useState({
    quantity: 3,
    style: 'viral', // Default style
  });

  const [results, setResults] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fungsi utama untuk generate script konten
  const generateScripts = () => {
    if (!productUrl || !productName) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newScripts = [];
      const benefitsArray = productBenefits 
        ? productBenefits.split(',').map(b => b.trim()) 
        : ['Kualitas premium', 'Praktis digunakan', 'Harga terjangkau'];
      
      for (let i = 0; i < settings.quantity; i++) {
        const scriptContent = createContent(
          settings.style, 
          productName, 
          productUrl, 
          benefitsArray, 
          i
        );
        
        newScripts.push({
          id: Date.now() + i,
          content: scriptContent,
          type: settings.style
        });
      }

      setResults(newScripts);
      setIsGenerating(false);
    }, 1000);
  };

  const createContent = (style, name, url, benefits, index) => {
    const benefit = benefits[index % benefits.length];
    
    const hooks = {
      viral: ["SUMPAH BARU TAU!", "Racun TikTok check!", "Wajib punya buat kalian!", "Stop scroll dulu!"],
      formal: ["Rekomendasi produk terbaik.", "Solusi efisien untuk Anda.", "Ulasan mendalam hari ini.", "Tingkatkan kualitas hidup Anda."],
      storytelling: ["Jujur, awalnya aku ragu...", "Dulu susah banget cari ini...", "Aku nemu rahasia baru...", "Routine harian aku berubah..."]
    };

    const selectedHooks = hooks[style] || hooks.viral;
    const h = selectedHooks[index % selectedHooks.length];

    if (style === 'formal') {
      return `[${h}]\n\nMemperkenalkan ${name}. Produk ini menawarkan keunggulan utama yaitu ${benefit}.\n\nFitur Unggulan:\n1. Efisiensi Tinggi\n2. Desain Ergonomis\n3. Penawaran Terbatas\n\nInformasi selengkapnya silakan kunjungi: ${url}`;
    } else if (style === 'storytelling') {
      return `${h}\n\nGak nyangka banget setelah pakai ${name}, masalah aku soal ${benefit} langsung beres. Bener-bener game changer buat rutinitas aku.\n\nKalian yang punya masalah sama, wajib coba sih.\n\nLink produk ada di sini ya: ${url}`;
    } else {
      return `[${h}]\n\nGuys, kenalin ${name}. Keunggulannya itu ${benefit}.\n\nKenapa harus beli?\n1. Sangat membantu\n2. Desain keren\n3. Lagi diskon!\n\nCek di sini: ${url}`;
    }
  };

  const handleCopy = (text, id) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Gagal menyalin', err);
    }
    document.body.removeChild(textArea);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Script Export - ${productName}</title>
      <style>
        body { font-family: sans-serif; padding: 40px; line-height: 1.5; color: #333; }
        .card { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
        h1 { color: #4f46e5; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        pre { white-space: pre-wrap; word-wrap: break-word; font-size: 14px; }
      </style></head><body>
      <h1>Script Promosi: ${productName}</h1>
      ${results.map((r, i) => `<div class="card"><strong>Script #${i+1} (${r.type.toUpperCase()})</strong><br/><pre>${r.content}</pre></div>`).join('')}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const theme = {
    bg: isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800',
    card: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
    input: isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-100 border-slate-200 text-slate-900',
    muted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    btnGhost: isDarkMode ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' : 'bg-slate-50 border-slate-200 hover:bg-slate-100',
    btnActive: 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
      {/* Navbar / Header */}
      <header className="bg-indigo-600 p-6 text-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText size={28} />
          <div>
            <h1 className="text-xl font-bold leading-none">Affiliate Script Generator</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-widest mt-1">Portofolio Project</p>
          </div>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-300"/> : <Moon size={20}/>}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sisi Kiri: Input Form & Settings */}
        <section className="space-y-6 h-fit">
          <div className={`p-8 rounded-3xl border shadow-xl ${theme.card}`}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles size={22} className="text-indigo-500"/> Detail Produk
            </h2>
            <div className="space-y-5">
              <div>
                <label className={`text-xs font-bold uppercase mb-2 block ${theme.muted}`}>Nama Produk</label>
                <input 
                  type="text"
                  placeholder="Misal: Lampu Tidur Proyektor" 
                  className={`w-full p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition ${theme.input}`}
                  value={productName} onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label className={`text-xs font-bold uppercase mb-2 block ${theme.muted}`}>Link Produk / Affiliate</label>
                <input 
                  type="text"
                  placeholder="https://shope.ee/..." 
                  className={`w-full p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition ${theme.input}`}
                  value={productUrl} onChange={(e) => setProductUrl(e.target.value)}
                />
              </div>
              <div>
                <label className={`text-xs font-bold uppercase mb-2 block ${theme.muted}`}>Keunggulan (Pisahkan Koma)</label>
                <textarea 
                  placeholder="Hemat listrik, 7 pilihan warna, Remote control" 
                  className={`w-full p-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-28 resize-none transition ${theme.input}`}
                  value={productBenefits} onChange={(e) => setProductBenefits(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border shadow-xl ${theme.card}`}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings size={22} className="text-indigo-500"/> Opsi Gaya Bahasa
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {['viral', 'formal', 'storytelling'].map((style) => (
                <button
                  key={style}
                  onClick={() => setSettings({ ...settings, style })}
                  className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                    settings.style === style ? theme.btnActive : theme.btnGhost
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            
            <button 
              onClick={generateScripts}
              disabled={isGenerating || !productName}
              className={`w-full mt-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition transform active:scale-95 ${
                isGenerating || !productName 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isGenerating ? "Menganalisis..." : "Generate Script"}
            </button>
          </div>
        </section>

        {/* Sisi Kanan: Output */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Hasil Variasi Konten</h2>
            {results.length > 0 && (
              <button 
                onClick={handleExportPDF} 
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-lg"
              >
                <Printer size={16}/> Simpan PDF
              </button>
            )}
          </div>
          
          {results.length === 0 ? (
            <div className={`h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center ${theme.muted} ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white/50'}`}>
              <FileText size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Belum ada script yang dibuat.</p>
              <p className="text-xs">Isi form di samping untuk memulai.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results.map((item) => (
                <div key={item.id} className={`p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md ${theme.card}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded">Style: {item.type}</span>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleCopy(item.content, item.id)} 
                        className={`transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'}`}
                        title="Copy ke Clipboard"
                      >
                        {copiedId === item.id ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20}/>}
                      </button>
                      <button 
                        onClick={() => setResults(results.filter(r => r.id !== item.id))} 
                        className={`transition-colors ${isDarkMode ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500'}`}
                        title="Hapus"
                      >
                        <Trash2 size={20}/>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className={`text-center py-10 text-xs font-medium ${theme.muted}`}>
        &copy; {new Date().getFullYear()} Affiliate Script Generator - Built with React & Tailwind
      </footer>
    </div>
  );
}