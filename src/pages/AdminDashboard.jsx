import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth, googleProvider } from '../firebase/config';
import { LogIn, LogOut, Users, Utensils, Heart, Trash2, Download } from 'lucide-react';
import './AdminDashboard.css';

const ADMIN_EMAILS = ['your-admin@email.com']; // Add admin emails here

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('rsvp');
    const [rsvp, setRsvp] = useState([]);
    const [potluck, setPotluck] = useState([]);
    const [sumbangan, setSumbangan] = useState([]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (!user) return;
        const q1 = query(collection(db, 'rsvp_attendance'), orderBy('created_at', 'desc'));
        const q2 = query(collection(db, 'potluck_list'), orderBy('created_at', 'desc'));
        const q3 = query(collection(db, 'sumbangan'), orderBy('created_at', 'desc'));
        const u1 = onSnapshot(q1, s => setRsvp(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const u2 = onSnapshot(q2, s => setPotluck(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const u3 = onSnapshot(q3, s => setSumbangan(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        return () => { u1(); u2(); u3(); };
    }, [user]);

    const handleLogin = async () => {
        try { await signInWithPopup(auth, googleProvider); }
        catch (e) { console.error(e); }
    };

    const handleLogout = () => signOut(auth);

    const handleDelete = async (col, id) => {
        if (!confirm('Padam rekod ini?')) return;
        try { await deleteDoc(doc(db, col, id)); }
        catch (e) { alert('Gagal memadam.'); }
    };

    const exportCSV = () => {
        const headers = ['Nama', 'Keluarga', 'Jenis', 'Dewasa', 'Kanak-kanak', 'Jumlah Pax', 'Telefon', 'Emel', 'Catatan'];
        const rows = rsvp.map(r => [
            r.nama,
            r.keluarga || '',
            r.type,
            r.pax_dewasa ?? r.pax ?? 0,
            r.pax_kanak ?? 0,
            (Number(r.pax_dewasa) || Number(r.pax) || 0) + (Number(r.pax_kanak) || 0),
            r.phone,
            r.email || '',
            r.catatan || ''
        ]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const a = document.createElement('a');
        a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        a.download = 'RSVP_TokNggal2026.csv';
        a.click();
    };

    const formatRM = n => `RM ${Number(n).toLocaleString('ms-MY', { minimumFractionDigits: 2 })}`;
    const totalDewasa = rsvp.reduce((s, r) => s + (Number(r.pax_dewasa) || Number(r.pax) || 0), 0);
    const totalKanak = rsvp.reduce((s, r) => s + (Number(r.pax_kanak) || 0), 0);
    const totalPax = totalDewasa + totalKanak;
    const totalSumbangan = sumbangan.reduce((s, r) => s + (Number(r.amount) || 0), 0);

    if (loading) return (
        <div className="admin-loading">
            <div className="spinner" style={{ width: 40, height: 40, borderColor: 'var(--emerald-200)', borderTopColor: 'var(--emerald-600)' }} />
        </div>
    );

    if (!user) return (
        <div className="admin-login-page">
            <div className="admin-login-card glass-card">
                <div className="admin-login-icon">🔐</div>
                <h1>Dashboard Admin</h1>
                <p>Hanya jawatankuasa yang berdaftar sahaja boleh mengakses kawasan ini.</p>
                <button className="btn btn-primary btn-lg" onClick={handleLogin}>
                    <LogIn size={20} />
                    Log Masuk dengan Google
                </button>
                <a href="/" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>← Kembali ke Portal</a>
            </div>
        </div>
    );

    return (
        <div className="admin-page bg-islamic">
            <div className="admin-header">
                <div className="admin-header-inner">
                    <div>
                        <h1>Dashboard Jawatankuasa</h1>
                        <p>Portal Rasmi Tok Nggal Raya 2026</p>
                    </div>
                    <div className="admin-user">
                        <img src={user.photoURL} alt={user.displayName} className="admin-avatar" />
                        <div>
                            <div className="admin-username">{user.displayName}</div>
                            <div className="admin-email">{user.email}</div>
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                            <LogOut size={14} /> Log Keluar
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-content container">
                {/* Summary */}
                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-icon"><Users size={24} /></div>
                        <div className="stat-number">{rsvp.length}</div>
                        <div className="stat-label">Pendaftaran RSVP</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🧑</div>
                        <div className="stat-number">{totalDewasa}</div>
                        <div className="stat-label">Jumlah Dewasa</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👶</div>
                        <div className="stat-number">{totalKanak}</div>
                        <div className="stat-label">Jumlah Kanak-kanak</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👨‍👩‍👧‍👦</div>
                        <div className="stat-number">{totalPax}</div>
                        <div className="stat-label">Jumlah Keseluruhan</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><Utensils size={24} /></div>
                        <div className="stat-number">{potluck.length}</div>
                        <div className="stat-label">Hidangan Potluck</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><Heart size={24} /></div>
                        <div className="stat-number">{formatRM(totalSumbangan)}</div>
                        <div className="stat-label">Jumlah Sumbangan</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <div className="tab-group" style={{ maxWidth: 500 }}>
                        <button className={`tab-btn ${activeTab === 'rsvp' ? 'active' : ''}`} onClick={() => setActiveTab('rsvp')}>
                            <Users size={14} /> RSVP ({rsvp.length})
                        </button>
                        <button className={`tab-btn ${activeTab === 'potluck' ? 'active' : ''}`} onClick={() => setActiveTab('potluck')}>
                            <Utensils size={14} /> Potluck ({potluck.length})
                        </button>
                        <button className={`tab-btn ${activeTab === 'sumbangan' ? 'active' : ''}`} onClick={() => setActiveTab('sumbangan')}>
                            <Heart size={14} /> Sumbangan ({sumbangan.length})
                        </button>
                    </div>

                    {activeTab === 'rsvp' && (
                        <button className="btn btn-primary btn-sm" onClick={exportCSV}>
                            <Download size={14} /> Export CSV
                        </button>
                    )}
                </div>

                {/* Tables */}
                <div className="admin-table-wrap glass-card">
                    {activeTab === 'rsvp' && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Keluarga</th>
                                    <th>Jenis</th>
                                    <th>🧑 Dewasa</th>
                                    <th>👶 Kanak</th>
                                    <th>Jumlah</th>
                                    <th>Telefon</th>
                                    <th>Catatan</th>
                                    <th>Padam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rsvp.map(r => (
                                    <tr key={r.id}>
                                        <td className="td-bold">{r.nama}</td>
                                        <td>{r.keluarga || '–'}</td>
                                        <td><span className="badge badge-emerald">{r.type}</span></td>
                                        <td>{r.pax_dewasa ?? r.pax ?? 0}</td>
                                        <td>{r.pax_kanak ?? 0}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--emerald-700)' }}>
                                            {(Number(r.pax_dewasa) || Number(r.pax) || 0) + (Number(r.pax_kanak) || 0)}
                                        </td>
                                        <td>{r.phone}</td>
                                        <td className="td-muted">{r.catatan || '–'}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete('rsvp_attendance', r.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'potluck' && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Kategori</th>
                                    <th>Hidangan</th>
                                    <th>Kuantiti</th>
                                    <th>Padam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {potluck.map(p => (
                                    <tr key={p.id}>
                                        <td className="td-bold">{p.nama}</td>
                                        <td><span className="badge badge-gold">{p.kategori}</span></td>
                                        <td>{p.makanan}</td>
                                        <td>{p.kuantiti || '–'}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete('potluck_list', p.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'sumbangan' && (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Jumlah</th>
                                    <th>Cara Bayar</th>
                                    <th>Tarikh Bayar</th>
                                    <th>Status</th>
                                    <th>Padam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sumbangan.map(s => (
                                    <tr key={s.id}>
                                        <td className="td-bold">{s.anonymous ? '🔒 Hamba Allah' : s.nama}</td>
                                        <td style={{ color: 'var(--emerald-700)', fontWeight: 700 }}>{formatRM(s.amount)}</td>
                                        <td>{s.payment_method}</td>
                                        <td>{s.tarikh_bayar || '–'}</td>
                                        <td><span className="badge badge-emerald">{s.anonymous ? 'Rahsia' : 'Terbuka'}</span></td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete('sumbangan', s.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
