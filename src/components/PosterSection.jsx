import React from 'react';
import { Share2, MessageCircle, Copy } from 'lucide-react';
import './PosterSection.css';

const SHARE_MSG = encodeURIComponent(
    `Assalamualaikum 🌙✨\n\nJom kita semua meriahkan *Majlis Kesyukuran dan Sambutan Hari Raya Waris Keluarga Tok Nggal Batu Burok* 🎉\n\n📅 19 April 2026 (Ahad)\n🕐 2:30 petang – 5:30 petang\n📍 Villa Arasy, No 2, Jalan 4 Keranji, Sepang, Selangor\n\nKlik link untuk daftar dan rancang potluck bersama:\n${window.location.href}`
);

const PosterSection = () => {
    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${SHARE_MSG}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        const t = document.createElement('div');
        t.className = 'toast show';
        t.innerHTML = '✅ Link telah disalin!';
        document.body.appendChild(t);
        setTimeout(() => { t.className = 'toast'; setTimeout(() => t.remove(), 400); }, 3000);
    };

    return (
        <section id="poster" className="section poster-section bg-islamic">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Jemputan Rasmi ✦</div>
                    <h2 className="section-title">Kad Jemputan Digital</h2>
                    <p className="section-subtitle">Sebarkan kepada seluruh waris keluarga Tok Nggal</p>
                </div>

                <div className="poster-layout reveal">
                    {/* Poster card */}
                    <div className="poster-card glass-card">
                        <div className="poster-inner">
                            <div className="poster-top-ribbon">✦ KAD JEMPUTAN ✦</div>
                            <div className="poster-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                            <div className="poster-salam">Assalamualaikum w.b.t.</div>

                            <div className="poster-title-block">
                                <div className="poster-subtitle">Majlis Kesyukuran dan Sambutan</div>
                                <div className="poster-title-main">Hari Raya</div>
                                <div className="poster-waris">Waris Keluarga</div>
                                <div className="poster-family-name">Tok Nggal Batu Burok</div>
                            </div>

                            <div className="poster-gold-bar">✦ ✦ ✦</div>

                            <div className="poster-details">
                                <div className="poster-detail-row">
                                    <span className="poster-detail-icon">📅</span>
                                    <div>
                                        <div className="poster-detail-label">Tarikh</div>
                                        <div className="poster-detail-value">19 April 2026 (Ahad)</div>
                                    </div>
                                </div>
                                <div className="poster-detail-row">
                                    <span className="poster-detail-icon">🕐</span>
                                    <div>
                                        <div className="poster-detail-label">Masa</div>
                                        <div className="poster-detail-value">2:30 petang – 5:30 petang</div>
                                    </div>
                                </div>
                                <div className="poster-detail-row">
                                    <span className="poster-detail-icon">📍</span>
                                    <div>
                                        <div className="poster-detail-label">Lokasi Majlis</div>
                                        <div className="poster-detail-value">Villa Arasy</div>
                                        <div className="poster-detail-sub">No 2, Jalan 4 Keranji, Sepang, Selangor</div>
                                    </div>
                                </div>
                                <div className="poster-detail-row">
                                    <span className="poster-detail-icon">👗</span>
                                    <div>
                                        <div className="poster-detail-label">Tema Pakaian</div>
                                        <div className="poster-detail-value">Baju Raya / Tradisional</div>
                                    </div>
                                </div>
                            </div>

                            <div className="poster-doa">
                                "Kehadiran dan doa restu <strong>amat kami</strong> harapkan"
                            </div>
                            <div className="poster-emojis">🪔 🌙 ✨ 🎋 🏮</div>
                        </div>
                    </div>

                    {/* Share actions */}
                    <div className="poster-actions reveal">
                        <div className="share-intro">
                            <Share2 size={28} style={{ color: 'var(--emerald-600)' }} />
                            <h3>Sebarkan Kepada Semua!</h3>
                            <p>Jemput seluruh waris keluarga Tok Nggal menyertai majlis yang penuh bermakna ini.</p>
                        </div>

                        <div className="share-stats">
                            <div className="mini-stat">📱 Kongsikan melalui WhatsApp</div>
                            <div className="mini-stat">🔗 Salin link untuk dikongsi</div>
                            <div className="mini-stat">📸 Simpan dan sebarkan poster</div>
                        </div>

                        <button className="btn btn-whatsapp btn-lg w-full" onClick={shareWhatsApp}>
                            <MessageCircle size={20} />
                            Sebarkan via WhatsApp
                        </button>

                        <button className="btn btn-outline btn-lg w-full" onClick={copyLink}>
                            <Copy size={20} />
                            Salin Link Majlis
                        </button>

                        <div className="poster-reminder">
                            💡 <strong>Peringatan:</strong> Sila daftar kehadiran dan rancang potluck anda bersama seluruh keluarga!
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PosterSection;
