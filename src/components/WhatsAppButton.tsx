// WhatsAppButton.tsx — Floating WhatsApp CTA (all pages)
// MENA primary contact channel — highest-conversion addition

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '9647506777762';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.45)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.45)';
      }}
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}
