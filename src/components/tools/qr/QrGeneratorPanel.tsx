'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import type { Tool } from '@/lib/tools';
import { 
  QrCode, 
  Link as LinkIcon, 
  AlignLeft, 
  MessageSquare, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Sliders, 
  AlertTriangle 
} from 'lucide-react';

interface Props {
  tool: Tool;
}

export default function QrGeneratorPanel({ tool }: Props) {
  const t = useTranslations('common');
  const tPremium = useTranslations('premium');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // QR Content states depending on tool slug
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  
  // WhatsApp states
  const [countryCode, setCountryCode] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // Styling / Tuning states
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(300);
  const [qrMargin, setQrMargin] = useState(4); // default medium
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Interactive UI states
  const [copied, setCopied] = useState(false);
  const [whatsappLinkCopied, setWhatsappLinkCopied] = useState(false);
  const [qrContent, setQrContent] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync inputs to final QR Content representation
  useEffect(() => {
    setValidationError(null);

    if (tool.slug === 'qr-link') {
      if (!urlInput.trim()) {
        setQrContent('');
        return;
      }
      // Auto prepend https:// if missing
      let finalUrl = urlInput.trim();
      if (!/^https?:\/\//i.test(finalUrl)) {
        // If it looks like a relative domain or path without protocol
        finalUrl = 'https://' + finalUrl;
      }
      setQrContent(finalUrl);

    } else if (tool.slug === 'qr-text') {
      if (!textInput.trim()) {
        setQrContent('');
        return;
      }
      if (textInput.length > 1000) {
        setValidationError(tPremium('textTooLong'));
      }
      setQrContent(textInput);

    } else if (tool.slug === 'qr-whatsapp') {
      const cleanCountry = countryCode.replace(/\D/g, '');
      const cleanPhone = phoneInput.replace(/\D/g, '');

      if (!cleanCountry) {
        setValidationError(tPremium('enterCountryCode'));
        setQrContent('');
        return;
      }
      if (!cleanPhone) {
        setValidationError(tPremium('enterPhoneNumber'));
        setQrContent('');
        return;
      }
      if (cleanPhone.length < 5) {
        setValidationError(tPremium('shortPhoneNumber'));
      }

      const fullPhone = cleanCountry + cleanPhone;
      let waUrl = `https://wa.me/${fullPhone}`;
      if (whatsappMessage.trim()) {
        waUrl += `?text=${encodeURIComponent(whatsappMessage.trim())}`;
      }
      setQrContent(waUrl);
    }
  }, [tool.slug, urlInput, textInput, countryCode, phoneInput, whatsappMessage, tPremium]);

  // Render QR Code onto the Canvas in real-time
  useEffect(() => {
    if (!qrContent || !canvasRef.current) return;

    const renderQr = async () => {
      try {
        await QRCode.toCanvas(canvasRef.current, qrContent, {
          width: qrSize,
          margin: qrMargin,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorCorrection,
        });
      } catch (err) {
        console.error('Error rendering QR Code:', err);
      }
    };

    renderQr();
  }, [qrContent, qrSize, qrMargin, fgColor, bgColor, errorCorrection]);

  const handleDownloadPng = () => {
    if (!canvasRef.current || !qrContent) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr_${tool.slug}_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSvg = async () => {
    if (!qrContent) return;
    try {
      const svgString = await QRCode.toString(qrContent, {
        type: 'svg',
        width: qrSize,
        margin: qrMargin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr_${tool.slug}_${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export QR SVG', err);
    }
  };

  const handleCopyValue = () => {
    if (!qrContent) return;
    navigator.clipboard.writeText(qrContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyWhatsappLink = () => {
    if (tool.slug !== 'qr-whatsapp' || !qrContent) return;
    navigator.clipboard.writeText(qrContent);
    setWhatsappLinkCopied(true);
    setTimeout(() => setWhatsappLinkCopied(false), 2000);
  };

  const handleResetSettings = () => {
    setFgColor('#000000');
    setBgColor('#ffffff');
    setQrSize(300);
    setQrMargin(4);
    setErrorCorrection('M');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Input Fields and Customizer Tuning Controls */}
      <div className="lg:col-span-7 space-y-6">
        {/* Input Card */}
        <div className="bg-card/75 border border-border/80 p-6 sm:p-7 rounded-3xl backdrop-blur-md shadow-lg space-y-5">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {tool.slug === 'qr-link' ? <LinkIcon className="w-5 h-5" /> : 
               tool.slug === 'qr-text' ? <AlignLeft className="w-5 h-5" /> : 
               <MessageSquare className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                {tool.slug === 'qr-link' ? tPremium('qrLinkTitle') :
                 tool.slug === 'qr-text' ? tPremium('qrTextTitle') :
                 tPremium('qrWhatsappTitle')}
              </h3>
              <p className="text-xs text-muted mt-0.5">
                {tool.slug === 'qr-link' ? tPremium('qrLinkDesc') :
                 tool.slug === 'qr-text' ? tPremium('qrTextDesc') :
                 tPremium('qrWhatsappDesc')}
              </p>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4 space-y-4">
            {/* LINK MODE */}
            {tool.slug === 'qr-link' && (
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-foreground">{tPremium('webLink')}</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={tPremium('webLinkPlaceholder')}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all text-left placeholder:text-muted/40 font-medium"
                />
                <span className="block text-[11px] text-muted">{tPremium('webLinkHelp')}</span>
              </div>
            )}

            {/* TEXT MODE */}
            {tool.slug === 'qr-text' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-semibold text-foreground">{t('text') || 'النص'}</label>
                  <span className={`text-xs font-bold ${textInput.length > 800 ? 'text-warning' : 'text-muted'}`}>
                    {tPremium('charCounter', { count: textInput.length })}
                  </span>
                </div>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={t('textPlaceholder') || 'أدخل نص الرسالة...'}
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all placeholder:text-muted/40 font-medium text-sm resize-none"
                />
                {textInput.length > 800 && (
                  <div className="p-3.5 bg-warning/10 border border-warning/20 rounded-xl text-xs font-semibold text-warning flex items-start space-x-2 rtl:space-x-reverse leading-relaxed">
                    <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                    <span>{tPremium('textWarning')}</span>
                  </div>
                )}
              </div>
            )}

            {/* WHATSAPP MODE */}
            {tool.slug === 'qr-whatsapp' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-foreground">{tPremium('countryCode')}</label>
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      placeholder={tPremium('countryCodePlaceholder')}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all placeholder:text-muted/40 font-medium text-center"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-sm font-semibold text-foreground">{tPremium('phoneNumber')}</label>
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder={tPremium('phoneNumberPlaceholder')}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all placeholder:text-muted/40 font-medium text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">{tPremium('customMessage')}</label>
                  <textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder={tPremium('customMessagePlaceholder')}
                    rows={2}
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-primary transition-all placeholder:text-muted/40 font-medium text-sm resize-none"
                  />
                </div>

                {qrContent && !validationError && (
                  <div className="bg-surface border border-border/40 p-4 rounded-2xl space-y-2">
                    <span className="block text-xs font-semibold text-muted">{tPremium('whatsappLinkResult')}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse min-w-0 bg-card border border-border/40 rounded-xl px-3.5 py-2.5">
                      <span className="text-xs text-primary font-semibold truncate flex-grow text-left direction-ltr">
                        {qrContent}
                      </span>
                      <button
                        onClick={handleCopyWhatsappLink}
                        className="p-1.5 hover:bg-surface-hover hover:text-primary text-muted rounded-lg transition-colors cursor-pointer flex-shrink-0"
                      >
                        {whatsappLinkCopied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {validationError && (
              <div className="p-3.5 bg-danger/10 text-danger border border-danger/20 rounded-2xl text-xs font-semibold flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="w-4.5 h-4.5 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Customizer Card */}
        <div className="bg-card/75 border border-border/80 p-6 sm:p-7 rounded-3xl backdrop-blur-md shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <Sliders className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-bold text-foreground">{tPremium('customizeQr')}</h4>
            </div>
            <button
              onClick={handleResetSettings}
              className="text-xs text-muted hover:text-danger hover:underline font-semibold flex items-center space-x-1 rtl:space-x-reverse cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{tPremium('reset')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-border/30">
            {/* Color controls */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{tPremium('qrColor')}</label>
                <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-border bg-surface cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={fgColor.toUpperCase()}
                    onChange={(e) => setFgColor(e.target.value)}
                    maxLength={7}
                    className="flex-grow px-3 py-2 rounded-xl border border-border bg-surface text-xs font-bold text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{tPremium('bgColor')}</label>
                <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-border bg-surface cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={bgColor.toUpperCase()}
                    onChange={(e) => setBgColor(e.target.value)}
                    maxLength={7}
                    className="flex-grow px-3 py-2 rounded-xl border border-border bg-surface text-xs font-bold text-foreground focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Size & Options controls */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{tPremium('qrSize')}</label>
                <select
                  value={qrSize}
                  onChange={(e) => setQrSize(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-surface text-xs font-bold text-foreground focus:outline-none"
                >
                  <option value={200}>200 × 200 px</option>
                  <option value={300}>300 × 300 px</option>
                  <option value={500}>500 × 500 px</option>
                  <option value={1000}>1000 × 1000 px</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{tPremium('qrMargin')}</label>
                <select
                  value={qrMargin}
                  onChange={(e) => setQrMargin(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-surface text-xs font-bold text-foreground focus:outline-none"
                >
                  <option value={0}>{tPremium('qrMarginNone')}</option>
                  <option value={2}>{tPremium('qrMarginSmall')}</option>
                  <option value={4}>{tPremium('qrMarginMedium')}</option>
                  <option value={8}>{tPremium('qrMarginLarge')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">{tPremium('errorCorrection')}</label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-surface text-xs font-bold text-foreground focus:outline-none"
                >
                  <option value="L">{tPremium('ecLow')} (7%)</option>
                  <option value="M">{tPremium('ecMedium')} (15%)</option>
                  <option value="Q">{tPremium('ecHigh')} (25%)</option>
                  <option value="H">{tPremium('ecVeryHigh')} (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time QR Live Preview Panel */}
      <div className="lg:col-span-5">
        <div className="bg-card/75 border border-border/80 p-6 sm:p-7 rounded-3xl backdrop-blur-md shadow-lg flex flex-col items-center justify-center sticky top-6">
          <span className="text-xs font-bold text-muted mb-4 uppercase tracking-wider">
            {tPremium('qrCodePreview')}
          </span>

          <div className="w-full aspect-square max-w-[280px] bg-surface rounded-2xl flex items-center justify-center border border-border/30 shadow-inner relative overflow-hidden p-4">
            {qrContent ? (
              <canvas ref={canvasRef} className="max-w-full max-h-full shadow-md rounded-lg" />
            ) : (
              <div className="text-center p-6 flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center text-muted-light border border-border/40">
                  <QrCode className="w-8 h-8 stroke-[1.25]" />
                </div>
                <span className="text-xs text-muted font-semibold max-w-[180px] leading-relaxed">
                  {tPremium('enterDetailsToViewQr')}
                </span>
              </div>
            )}
          </div>

          {qrContent && (
            <div className="w-full mt-6 space-y-3">
              <button
                onClick={handleDownloadPng}
                className="w-full flex items-center justify-center space-x-2.5 rtl:space-x-reverse px-4 py-3 rounded-xl btn-primary text-sm font-bold shadow-md cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Download className="w-4 h-4" />
                <span>{tPremium('downloadPng')}</span>
              </button>
              <button
                onClick={handleDownloadSvg}
                className="w-full flex items-center justify-center space-x-2.5 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground text-sm font-bold transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-primary" />
                <span>{tPremium('downloadSvg')}</span>
              </button>
              <button
                onClick={handleCopyValue}
                className="w-full flex items-center justify-center space-x-2.5 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground text-sm font-bold transition-all duration-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-success">{t('copied') || 'تم النسخ'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{tool.slug === 'qr-link' ? tPremium('copyWhatsappLink').replace('واتساب', 'الرابط') : t('copy') || 'نسخ المحتوى'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
