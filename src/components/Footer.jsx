import React from 'react';
import { Heart, Moon } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">🌙</div>
                        <div>
                            <div className="footer-title">Tok Nggal Batu Burok</div>
                            <div className="footer-subtitle">Majlis Hari Raya 2026</div>
                        </div>
                    </div>
                    <div className="footer-links">
                        <button onClick={() => scrollTo('#rsvp')}>Daftar Hadir</button>
                        <button onClick={() => scrollTo('#potluck')}>Potluck</button>
                        <button onClick={() => scrollTo('#sumbangan')}>Sumbangan</button>
                        <button onClick={() => scrollTo('#venue')}>Lokasi</button>
                    </div>
                </div>

                <div className="footer-gold-divider">✦ ✦ ✦</div>

                <div className="footer-event">
                    <p>📅 19 April 2026 (Ahad) &nbsp;|&nbsp; 🕐 2:30 – 5:30 petang &nbsp;|&nbsp; 📍 Villa Arasy, Sepang, Selangor</p>
                </div>

                <div className="footer-arabic">
                    <span>اللَّهُمَّ انْفَعْنَا وَانْفَعْ بِنَا وَزِدْنَا عِلْمًا</span>
                </div>

                <div className="footer-bottom">
                    <p>Dibina dengan <Heart size={14} style={{ display: 'inline', color: '#f87171' }} /> untuk keluarga Tok Nggal Batu Burok</p>
                    <p className="footer-copy">© 2026 Portal Rasmi Perhimpunan Keluarga Tok Nggal &nbsp;·&nbsp; <a href="/admin" style={{ color: 'var(--gold-400)' }}>Admin</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
