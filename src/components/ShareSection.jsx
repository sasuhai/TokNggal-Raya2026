import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MessageCircle, Copy, QrCode, Send } from 'lucide-react';
import './ShareSection.css';

const PAGE_URL = typeof window !== 'undefined' ? window.location.href : 'https://toknggal-raya2026.web.app';

const WHATSAPP_MSG = encodeURIComponent(
    `Assalamualaikum 🌙✨\n\nJom kita semua meriahkan!\n\n🎉 *Majlis Kesyukuran dan Sambutan Hari Raya*\n*Waris Keluarga Tok Nggal Batu Burok*\n\n📅 *19 April 2026 (Ahad)*\n🕐 *2:30 – 5:30 petang*\n📍 *Villa Arasy, No 2, Jalan 4 Keranji, Sepang, Selangor*\n\nDaftar kehadiran & rancang potluck di sini 👇\n${PAGE_URL}\n\nYuk hadir, semakin ramai semakin meriah! 🥳`
);

const ShareSection = () => {
    const handleWhatsApp = () => {
        window.open(`https://wa.me/?text=${WHATSAPP_MSG}`, '_blank');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(PAGE_URL).then(() => {
            const t = document.createElement('div');
            t.className = 'toast show';
            t.innerHTML = '✅ Link berjaya disalin!';
            document.body.appendChild(t);
            setTimeout(() => { t.className = 'toast'; setTimeout(() => t.remove(), 400); }, 3000);
        });
    };

    return (
        <section id="share" className="section share-section">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Jemput Keluarga ✦</div>
                    <h2 className="section-title">Sebarkan Maklumat</h2>
                    <p className="section-subtitle">Jemput semua waris keluarga Tok Nggal untuk meriahkan majlis bersama</p>
                </div>

                <div className="share-layout">
                    {/* Auto message preview */}
                    <div className="share-message-card glass-card reveal">
                        <div className="share-msg-header">
                            <MessageCircle size={20} style={{ color: '#25D366' }} />
                            <span>Auto-Message WhatsApp</span>
                        </div>
                        <div className="share-msg-preview">
                            <p>Assalamualaikum 🌙✨</p>
                            <br />
                            <p>Jom kita semua meriahkan!</p>
                            <br />
                            <p>🎉 <strong>Majlis Kesyukuran dan Sambutan Hari Raya</strong></p>
                            <p><strong>Waris Keluarga Tok Nggal Batu Burok</strong></p>
                            <br />
                            <p>📅 <strong>19 April 2026 (Ahad)</strong></p>
                            <p>🕐 <strong>2:30 – 5:30 petang</strong></p>
                            <p>📍 <strong>Villa Arasy, Sepang, Selangor</strong></p>
                            <br />
                            <p>Daftar kehadiran & rancang potluck di sini 👇</p>
                            <p className="share-link-preview">{PAGE_URL}</p>
                            <br />
                            <p>Yuk hadir, semakin ramai semakin meriah! 🥳</p>
                        </div>
                        <button className="btn btn-whatsapp btn-lg w-full" onClick={handleWhatsApp}>
                            <Send size={18} />
                            Hantar via WhatsApp
                        </button>
                    </div>

                    {/* QR & Copy */}
                    <div className="share-right reveal">
                        <div className="qr-card glass-card">
                            <div className="qr-header">
                                <QrCode size={20} style={{ color: 'var(--emerald-600)' }} />
                                <span>QR Code Majlis</span>
                            </div>
                            <div className="qr-wrapper">
                                <QRCodeSVG
                                    value={PAGE_URL}
                                    size={200}
                                    bgColor="transparent"
                                    fgColor="#065f46"
                                    level="H"
                                    includeMargin={true}
                                    imageSettings={{
                                        src: '',
                                        height: 24,
                                        width: 24,
                                        excavate: true,
                                    }}
                                />
                            </div>
                            <p className="qr-caption">Imbas kod QR untuk akses terus ke portal majlis</p>
                            <button className="btn btn-outline btn-lg w-full" onClick={handleCopy}>
                                <Copy size={18} />
                                Salin Link Majlis
                            </button>
                        </div>

                        <div className="share-tips">
                            <h4>💡 Tips Kongsi</h4>
                            <ul>
                                <li>📱 Hantar link ke group WhatsApp keluarga</li>
                                <li>🖨 Cetak QR code untuk tampal di masjid/surau</li>
                                <li>📲 Kongsikan di Facebook dan Instagram</li>
                                <li>💬 Forward kepada semua waris keluarga</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareSection;
