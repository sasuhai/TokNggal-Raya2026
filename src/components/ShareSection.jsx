import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MessageCircle, Copy, QrCode, Send, LayoutList, Share2, ClipboardList } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import './ShareSection.css';

const PAGE_URL = typeof window !== 'undefined' ? window.location.href : 'https://toknggal-raya2026.web.app';
const TARGET_SUMBANGAN = 1000;

const ShareSection = () => {
    const [rsvp, setRsvp] = useState([]);
    const [potluck, setPotluck] = useState([]);
    const [sumbangan, setSumbangan] = useState([]);
    const [previewMode, setPreviewMode] = useState('general'); // 'general' or 'reminder'

    useEffect(() => {
        const q1 = query(collection(db, 'rsvp_attendance'), orderBy('created_at', 'asc')); // Order asc for sequential sharing
        const q2 = query(collection(db, 'potluck_list'), orderBy('created_at', 'asc'));
        const q3 = query(collection(db, 'sumbangan'));

        const u1 = onSnapshot(q1, s => setRsvp(s.docs.map(d => d.data())));
        const u2 = onSnapshot(q2, s => setPotluck(s.docs.map(d => d.data())));
        const u3 = onSnapshot(q3, s => setSumbangan(s.docs.map(d => d.data())));

        return () => { u1(); u2(); u3(); };
    }, []);

    const totalDewasa = rsvp.reduce((s, r) => s + (Number(r.pax_dewasa) || Number(r.pax) || 0), 0);
    const totalKanak = rsvp.reduce((s, r) => s + (Number(r.pax_kanak) || 0), 0);
    const totalPax = totalDewasa + totalKanak;
    const totalSumbangan = sumbangan.reduce((s, r) => s + (Number(r.amount) || 0), 0);
    const progress = Math.min(100, Math.round((totalSumbangan / TARGET_SUMBANGAN) * 100));

    const genGeneralMsg = () => {
        return encodeURIComponent(
            `Assalamualaikum 🌙✨\n\nJom kita semua meriahkan!\n\n🎉 *Majlis Kesyukuran & Sambutan Hari Raya*\n*Waris Keluarga Tok Nggal Batu Burok*\n\n📅 *19 April 2026 (Ahad)*\n🕐 *2:30 – 5:30 petang*\n📍 *Villa Arasy, Sepang, Selangor*\n\nDaftar kehadiran & rancang potluck di sini 👇\nhttps://toknggal-raya2026.web.app\n\nYuk hadir, semakin ramai semakin meriah! 🥳`
        );
    };

    const genReminderMsg = () => {
        const diff = new Date('2026-04-19T14:30:00+08:00') - new Date();
        const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        const formatRM = n => `RM ${Number(n).toLocaleString('ms-MY', { minimumFractionDigits: 2 })}`;

        let msg = `✨ *PERINGATAN MESRA MAJLIS RAYA TOK NGGAL* ✨\n\n`;
        msg += `⏳ *Baki Hari:* ${daysLeft} hari lagi memulakan majlis!\n\n`;

        msg += `👨‍👩‍👧‍👦 *SENARAI KEHADIRAN TERKINI* (Keseluruhan: ${totalPax} org)\n`;
        if (rsvp.length === 0) msg += `_Belum ada pendaftaran._\n`;
        rsvp.forEach((r, i) => {
            msg += `${i + 1}. ${r.nama}`;
            if (r.keluarga) msg += ` (${r.keluarga})`;
            const d = r.pax_dewasa ?? r.pax ?? 0;
            const k = r.pax_kanak ?? 0;
            msg += ` - 🧑${d}`;
            if (k > 0) msg += ` 👶${k}`;
            msg += `\n`;
        });

        msg += `\n🍲 *SENARAI POTLUCK TERKINI*\n`;
        if (potluck.length === 0) msg += `_Belum ada potluck._\n`;
        potluck.forEach((p, i) => {
            msg += `${i + 1}. *${p.nama}* - ${p.makanan}`;
            if (p.kuantiti) msg += ` (${p.kuantiti})`;
            msg += `\n`;
        });

        msg += `\n💰 *STATUS SUMBANGAN TERKINI*\n`;
        msg += `Jumlah Terkumpul: *${formatRM(totalSumbangan)}*\n`;
        msg += `Misi Kutipan: RM 1,000 (${progress}%)\n_Terima kasih atas segala sumbangan yang dihulurkan!_\n\n`;

        msg += `🌐 *KLIK UNTUK DAFTAR KEHADIRAN / MENU*\n`;
        msg += `https://toknggal-raya2026.web.app\n\n`;
        msg += `_Sila layari portal rasmi di atas untuk daftar kehadiran (RSVP), tambah senarai Potluck, atau salurkan sumbangan._`;

        return encodeURIComponent(msg);
    };

    const handleWhatsApp = (type) => {
        const text = type === 'general' ? genGeneralMsg() : genReminderMsg();
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText('https://toknggal-raya2026.web.app').then(() => {
            const t = document.createElement('div');
            t.className = 'toast show';
            t.innerHTML = '✅ Link berjaya disalin!';
            document.body.appendChild(t);
            setTimeout(() => { t.className = 'toast'; setTimeout(() => t.remove(), 400); }, 3000);
        });
    };

    return (
        <section id="share" className="section share-section" style={{ background: '#f8fafc' }}>
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Jemput Keluarga ✦</div>
                    <h2 className="section-title">Sebar & Hebahkan</h2>
                    <p className="section-subtitle">Majlis lebih meriah dengan kehadiran dan penglibatan semua waris keluarga. Sebarkan!</p>
                </div>

                <div className="share-layout">
                    {/* Messaging Card */}
                    <div className="share-message-card glass-card reveal">
                        <div className="share-msg-header" style={{ justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MessageCircle size={20} style={{ color: '#25D366' }} />
                                <span style={{ fontWeight: 700, color: 'var(--emerald-800)' }}>Pilihan Mesej Broadcast</span>
                            </div>
                        </div>

                        <div className="share-tabs">
                            <button className={`share-tab ${previewMode === 'general' ? 'active' : ''}`} onClick={() => setPreviewMode('general')}>
                                <Share2 size={16} /> Undangan Umum
                            </button>
                            <button className={`share-tab ${previewMode === 'reminder' ? 'active' : ''}`} onClick={() => setPreviewMode('reminder')}>
                                <ClipboardList size={16} /> Senarai Penuh Keluarga
                            </button>
                        </div>

                        {previewMode === 'general' ? (
                            <div className="share-msg-preview">
                                <p>Assalamualaikum 🌙✨</p>
                                <br />
                                <p>Jom kita semua meriahkan!</p>
                                <br />
                                <p>🎉 <strong>Majlis Kesyukuran & Sambutan Hari Raya</strong></p>
                                <p><strong>Waris Keluarga Tok Nggal Batu Burok</strong></p>
                                <br />
                                <p>📅 <strong>19 April 2026 (Ahad)</strong></p>
                                <p>🕐 <strong>2:30 – 5:30 petang</strong></p>
                                <p>📍 <strong>Villa Arasy, Sepang, Selangor</strong></p>
                                <br />
                                <p>Daftar kehadiran & rancang potluck di sini 👇</p>
                                <p className="share-link-preview">https://toknggal-raya2026.web.app</p>
                                <br />
                                <p>Yuk hadir, semakin ramai semakin meriah! 🥳</p>

                                <button className="btn btn-whatsapp btn-lg w-full" style={{ marginTop: '1.5rem' }} onClick={() => handleWhatsApp('general')}>
                                    <Send size={18} />
                                    Kongsi Undangan (WhatsApp)
                                </button>
                            </div>
                        ) : (
                            <div className="share-msg-preview reminder-preview">
                                <p>✨ <strong>PERINGATAN MESRA MAJLIS RAYA TOK NGGAL</strong> ✨</p>
                                <br />
                                <p>👨‍👩‍👧‍👦 <strong>SENARAI KEHADIRAN TERKINI</strong> ({totalPax} org)</p>
                                <em style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {rsvp.length > 0 ? '(Senarai lengkap 1 hingga ke-' + rsvp.length + ' bersama potluck & sumbangan akan di-generate secara automatik di WhatsApp)' : '(Tiada pendaftaran setakat ini)'}
                                </em>
                                <br /><br />
                                <p>🌐 <strong>KLIK UNTUK DAFTAR KEHADIRAN / MENU</strong></p>
                                <p className="share-link-preview">https://toknggal-raya2026.web.app</p>

                                <button className="btn btn-whatsapp btn-lg w-full" style={{ marginTop: '1.5rem' }} onClick={() => handleWhatsApp('reminder')}>
                                    <Send size={18} />
                                    Jana & Kongsi Laporan Penuh (WhatsApp)
                                </button>
                            </div>
                        )}
                    </div>

                    {/* QR & Copy */}
                    <div className="share-right reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="qr-card glass-card">
                            <div className="qr-header">
                                <QrCode size={20} style={{ color: 'var(--emerald-600)' }} />
                                <span>QR Code Portal Majlis</span>
                            </div>
                            <div className="qr-wrapper">
                                <QRCodeSVG
                                    value={PAGE_URL}
                                    size={180}
                                    bgColor="transparent"
                                    fgColor="#065f46"
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <p className="qr-caption" style={{ padding: '0 1rem', fontSize: '0.85rem' }}>Imbas kod ini atau salin pautan portal untuk diberikan kepada keluarga lain.</p>
                            <button className="btn btn-outline w-full" onClick={handleCopy}>
                                <Copy size={16} />
                                Salin Pautan (Link)
                            </button>
                        </div>

                        <div className="share-tips glass-card">
                            <h4 style={{ color: 'var(--emerald-800)', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem' }}>
                                💡 Tip Perkongsian
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <li><strong>Undangan Umum:</strong> Sesuai jika baru nak mewarwarkan kepada saudara jauh yang belum dijemput.</li>
                                <li><strong>Senarai Penuh:</strong> Sesuai dihantar berkala (1-2 minggu sekali) ke dalam group keluarga sebagai update dan dorongan supaya lebih ramai membuat RSVP.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareSection;
