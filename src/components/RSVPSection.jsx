import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Users, UserCheck, CheckCircle, LayoutList, LayoutGrid, Search, Phone } from 'lucide-react';
import './RSVPSection.css';

const initialForm = {
    type: 'keluarga',
    nama: '',
    keluarga: '',
    pax: 1,
    phone: '',
    email: '',
    catatan: '',
};

const RSVPSection = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({ families: 0, totalPax: 0 });
    const [list, setList] = useState([]);
    const [viewMode, setViewMode] = useState('card'); // 'card' | 'table'
    const [search, setSearch] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'rsvp_attendance'), orderBy('created_at', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setList(data);
            const totalPax = data.reduce((sum, d) => sum + (Number(d.pax) || 0), 0);
            const families = data.filter(d => d.type === 'keluarga').length;
            setStats({ families, totalPax });
        });
        return () => unsub();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.nama.trim()) { setError('Sila masukkan nama penuh.'); return; }
        if (!form.phone.trim()) { setError('Sila masukkan nombor telefon.'); return; }
        setLoading(true);
        try {
            await addDoc(collection(db, 'rsvp_attendance'), {
                ...form,
                pax: Number(form.pax),
                created_at: serverTimestamp(),
            });
            setSubmitted(true);
        } catch (err) {
            setError('Ralat berlaku. Sila cuba semula.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => { setForm(initialForm); setSubmitted(false); setError(''); };

    const filtered = list.filter(item =>
        !search ||
        item.nama?.toLowerCase().includes(search.toLowerCase()) ||
        item.keluarga?.toLowerCase().includes(search.toLowerCase()) ||
        item.phone?.includes(search)
    );

    return (
        <section id="rsvp" className="section rsvp-section">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Pendaftaran ✦</div>
                    <h2 className="section-title">Daftar Kehadiran</h2>
                    <p className="section-subtitle">Sila daftar agar kami dapat membuat persediaan yang sempurna</p>
                </div>

                {/* Stats */}
                <div className="rsvp-stats reveal">
                    <div className="stat-card">
                        <div className="stat-icon">🏠</div>
                        <div className="stat-number">{stats.families}</div>
                        <div className="stat-label">Keluarga Berdaftar</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👨‍👩‍👧‍👦</div>
                        <div className="stat-number">{stats.totalPax}</div>
                        <div className="stat-label">Jumlah Pax Hadir</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📝</div>
                        <div className="stat-number">{list.length}</div>
                        <div className="stat-label">Pendaftaran</div>
                    </div>
                </div>

                {/* Form + Compact List */}
                <div className="rsvp-layout">
                    {/* Form */}
                    <div className="rsvp-form-card glass-card reveal">
                        {submitted ? (
                            <div className="success-state">
                                <div className="success-icon">
                                    <CheckCircle size={32} color="white" />
                                </div>
                                <h3>Pendaftaran Berjaya! 🎉</h3>
                                <p>Terima kasih, <strong>{form.nama}</strong>! Pendaftaran anda telah diterima.</p>
                                <p>Kami nantikan kehadiran anda bersama keluarga di Villa Arasy!</p>
                                <button className="btn btn-primary" onClick={resetForm}>
                                    Daftar Keluarga Lain
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-section-title">
                                    <Users size={20} />
                                    <span>Maklumat Pendaftaran</span>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Jenis Pendaftaran</label>
                                    <div className="tab-group">
                                        <button type="button" className={`tab-btn ${form.type === 'keluarga' ? 'active' : ''}`}
                                            onClick={() => setForm(p => ({ ...p, type: 'keluarga' }))}>
                                            🏠 Ketua Keluarga
                                        </button>
                                        <button type="button" className={`tab-btn ${form.type === 'individu' ? 'active' : ''}`}
                                            onClick={() => setForm(p => ({ ...p, type: 'individu' }))}>
                                            👤 Individu
                                        </button>
                                    </div>
                                </div>

                                <div className="form-grid form-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Nama Penuh *</label>
                                        <input className="form-control" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama penuh anda" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Nama Keluarga / Cawangan</label>
                                        <input className="form-control" name="keluarga" value={form.keluarga} onChange={handleChange} placeholder="Cth: Keluarga Pak Long" />
                                    </div>
                                </div>

                                <div className="form-grid form-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Jumlah Pax *</label>
                                        <input className="form-control" name="pax" type="number" min="1" max="50" value={form.pax} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">No. Telefon *</label>
                                        <input className="form-control" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="012-3456789" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Emel (pilihan)</label>
                                    <input className="form-control" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@contoh.com" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Catatan (pilihan)</label>
                                    <textarea className="form-control" name="catatan" value={form.catatan} onChange={handleChange} rows={3} placeholder="Ada keperluan khas? Hubungi kami!" />
                                </div>

                                {error && <div className="error-text" style={{ fontSize: '0.875rem' }}>⚠️ {error}</div>}

                                <button className="btn btn-primary btn-lg w-full" type="submit" disabled={loading}>
                                    {loading ? <><span className="spinner" /> Mendaftar...</> : <><UserCheck size={20} /> Daftar Sekarang</>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Compact Card List – right column */}
                    <div className="rsvp-list reveal">
                        <div className="rsvp-list-header-row">
                            <h3 className="rsvp-list-title">👥 Senarai Terkini</h3>
                            <span className="badge badge-emerald">{list.length} daftar</span>
                        </div>
                        {list.length === 0 ? (
                            <div className="rsvp-empty">Belum ada pendaftaran lagi. Jadilah yang pertama!</div>
                        ) : (
                            <div className="rsvp-list-items">
                                {list.slice(0, 8).map((item) => (
                                    <div key={item.id} className="rsvp-list-item card">
                                        <div className="rsvp-avatar">{item.nama?.[0]?.toUpperCase() || '?'}</div>
                                        <div className="rsvp-info">
                                            <div className="rsvp-name">{item.nama}</div>
                                            {item.keluarga && <div className="rsvp-family">🏠 {item.keluarga}</div>}
                                            <div className="rsvp-pax-row">
                                                <span className="badge badge-emerald">👥 {item.pax} pax</span>
                                                <span className="badge badge-gold">{item.type === 'keluarga' ? '🏠 Keluarga' : '👤 Individu'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {list.length > 8 && (
                                    <button className="rsvp-more-hint" onClick={() => {
                                        document.querySelector('#rsvp-full-list')?.scrollIntoView({ behavior: 'smooth' });
                                    }}>
                                        +{list.length - 8} lagi — lihat senarai penuh ↓
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── FULL REGISTRATION LIST ── */}
                {list.length > 0 && (
                    <div id="rsvp-full-list" className="rsvp-full-list reveal">
                        <div className="rsvp-full-header">
                            <div className="rsvp-full-title-row">
                                <div>
                                    <h3>📋 Senarai Lengkap Pendaftaran</h3>
                                    <p className="rsvp-full-subtitle">
                                        Semua <strong>{list.length}</strong> pendaftaran — Jumlah <strong>{stats.totalPax} pax</strong> hadir
                                    </p>
                                </div>
                                <div className="rsvp-view-toggle">
                                    <button className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
                                        onClick={() => setViewMode('card')} title="Paparan Kad">
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                                        onClick={() => setViewMode('table')} title="Paparan Jadual">
                                        <LayoutList size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="rsvp-search-wrap">
                                <Search size={16} className="rsvp-search-icon" />
                                <input
                                    className="form-control rsvp-search"
                                    type="text"
                                    placeholder="Cari nama, keluarga, atau no. telefon..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {search && <button className="rsvp-search-clear" onClick={() => setSearch('')}>✕</button>}
                            </div>

                            {search && (
                                <div className="rsvp-search-result">
                                    🔍 {filtered.length} keputusan untuk "{search}"
                                </div>
                            )}
                        </div>

                        {/* Card Grid */}
                        {viewMode === 'card' && (
                            <div className="rsvp-card-grid">
                                {filtered.map((item, i) => (
                                    <div key={item.id} className="rsvp-full-card card">
                                        <div className="rsvp-full-card-header">
                                            <div className="rsvp-full-avatar">{item.nama?.[0]?.toUpperCase() || '?'}</div>
                                            <div className="rsvp-full-no">#{i + 1}</div>
                                        </div>
                                        <div className="rsvp-full-card-body">
                                            <div className="rsvp-full-name">{item.nama}</div>
                                            {item.keluarga && <div className="rsvp-full-keluarga">🏠 {item.keluarga}</div>}
                                            <div className="rsvp-full-tags">
                                                <span className="badge badge-emerald">👥 {item.pax} pax</span>
                                                <span className="badge badge-gold">{item.type === 'keluarga' ? '🏠 Keluarga' : '👤 Individu'}</span>
                                            </div>
                                            <div className="rsvp-full-phone"><Phone size={12} /> {item.phone}</div>
                                            {item.catatan && <div className="rsvp-full-catatan">💬 {item.catatan}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Table */}
                        {viewMode === 'table' && (
                            <div className="rsvp-table-wrap">
                                <table className="rsvp-table">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama</th>
                                            <th>Keluarga / Cawangan</th>
                                            <th>Jenis</th>
                                            <th>Pax</th>
                                            <th>No. Telefon</th>
                                            <th>Catatan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((item, i) => (
                                            <tr key={item.id}>
                                                <td className="td-no">{i + 1}</td>
                                                <td>
                                                    <div className="td-nama-wrap">
                                                        <div className="td-avatar">{item.nama?.[0]?.toUpperCase() || '?'}</div>
                                                        <span className="td-bold">{item.nama}</span>
                                                    </div>
                                                </td>
                                                <td>{item.keluarga || <span className="td-empty">–</span>}</td>
                                                <td>
                                                    <span className={`badge ${item.type === 'keluarga' ? 'badge-gold' : 'badge-emerald'}`}>
                                                        {item.type === 'keluarga' ? '🏠 Keluarga' : '👤 Individu'}
                                                    </span>
                                                </td>
                                                <td><span className="td-pax">{item.pax}</span></td>
                                                <td className="td-phone">
                                                    <a href={`tel:${item.phone}`} className="phone-link">{item.phone}</a>
                                                </td>
                                                <td className="td-catatan">{item.catatan || <span className="td-empty">–</span>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4} className="tf-label">JUMLAH KESELURUHAN</td>
                                            <td className="tf-total">{filtered.reduce((s, r) => s + (Number(r.pax) || 0), 0)} pax</td>
                                            <td colSpan={2}></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RSVPSection;
