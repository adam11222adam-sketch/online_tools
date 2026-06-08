import { geoData, ToolGeo } from './geoData';

export type ToolCategory = 'pdf' | 'image' | 'qr' | 'daily';

export interface Tool {
  slug: string;
  category: ToolCategory;
  icon: string; // lucide icon name
  acceptedFormats?: string[];
  maxFileSize?: string;
  popular?: boolean;
  geo: ToolGeo;
}

export const tools = [
  // PDF Tools
  { slug: 'merge-pdf', category: 'pdf' as const, icon: 'FilePlus2', acceptedFormats: ['.pdf'], maxFileSize: '50MB', popular: true },
  { slug: 'split-pdf', category: 'pdf' as const, icon: 'Scissors', acceptedFormats: ['.pdf'], maxFileSize: '50MB', popular: true },
  { slug: 'compress-pdf', category: 'pdf' as const, icon: 'FileDown', acceptedFormats: ['.pdf'], maxFileSize: '50MB', popular: true },
  { slug: 'rotate-pdf', category: 'pdf' as const, icon: 'RotateCw', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  { slug: 'delete-pdf-pages', category: 'pdf' as const, icon: 'FileX2', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  { slug: 'organize-pdf', category: 'pdf' as const, icon: 'ArrowUpDown', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  { slug: 'images-to-pdf', category: 'pdf' as const, icon: 'ImagePlus', acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'], maxFileSize: '20MB', popular: true },
  { slug: 'pdf-to-jpg', category: 'pdf' as const, icon: 'Image', acceptedFormats: ['.pdf'], maxFileSize: '50MB', popular: true },
  { slug: 'protect-pdf', category: 'pdf' as const, icon: 'Lock', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  { slug: 'unlock-pdf', category: 'pdf' as const, icon: 'Unlock', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  // Image Tools
  { slug: 'png-to-jpg', category: 'image' as const, icon: 'FileImage', acceptedFormats: ['.png'], maxFileSize: '20MB', popular: true },
  { slug: 'jpg-to-png', category: 'image' as const, icon: 'FileImage', acceptedFormats: ['.jpg', '.jpeg'], maxFileSize: '20MB' },
  { slug: 'image-to-webp', category: 'image' as const, icon: 'FileImage', acceptedFormats: ['.jpg', '.jpeg', '.png'], maxFileSize: '20MB' },
  { slug: 'webp-to-image', category: 'image' as const, icon: 'FileImage', acceptedFormats: ['.webp'], maxFileSize: '20MB' },
  { slug: 'compress-image', category: 'image' as const, icon: 'Minimize2', acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'], maxFileSize: '20MB', popular: true },
  { slug: 'resize-image', category: 'image' as const, icon: 'Maximize2', acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'], maxFileSize: '20MB' },
  { slug: 'crop-image', category: 'image' as const, icon: 'Crop', acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'], maxFileSize: '20MB' },
  { slug: 'rotate-image', category: 'image' as const, icon: 'RotateCcw', acceptedFormats: ['.jpg', '.jpeg', '.png', '.webp'], maxFileSize: '20MB' },
  { slug: 'extract-images-from-pdf', category: 'image' as const, icon: 'Images', acceptedFormats: ['.pdf'], maxFileSize: '50MB' },
  // QR & Barcode Tools
  { slug: 'qr-link', category: 'qr' as const, icon: 'QrCode', popular: true },
  { slug: 'qr-text', category: 'qr' as const, icon: 'QrCode' },
  { slug: 'qr-whatsapp', category: 'qr' as const, icon: 'MessageCircle' },
  { slug: 'qr-wifi', category: 'qr' as const, icon: 'Wifi' },
  { slug: 'barcode-generator', category: 'qr' as const, icon: 'Barcode' },
  // Daily Tools
  { slug: 'password-generator', category: 'daily' as const, icon: 'KeyRound', popular: true },
  { slug: 'word-counter', category: 'daily' as const, icon: 'Hash' },
  { slug: 'base64-converter', category: 'daily' as const, icon: 'Binary' },
  { slug: 'url-encoder-decoder', category: 'daily' as const, icon: 'Link2' },
  { slug: 'text-cleaner', category: 'daily' as const, icon: 'Eraser' },
].map(tool => {
  const g = geoData[tool.slug];
  if (!g) {
    throw new Error(`Missing geo data for tool: ${tool.slug}`);
  }
  return {
    ...tool,
    geo: g
  };
}) satisfies Tool[];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools.filter((t) => t.category === tool.category && t.slug !== slug).slice(0, limit);
}

export const categories: { key: ToolCategory; icon: string }[] = [
  { key: 'pdf', icon: 'FileText' },
  { key: 'image', icon: 'Image' },
  { key: 'qr', icon: 'QrCode' },
  { key: 'daily', icon: 'Wrench' },
];
