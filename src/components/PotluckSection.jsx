import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Utensils, CheckCircle, Filter, Pencil, X, Save } from 'lucide-react';
import './PotluckSection.css';

const categories = ['Semua', 'Nasi', 'Lauk', 'Kuih', 'Minuman', 'Pencuci Mulut', 'Lain-lain'];
const catEmoji = { 'Nasi': '🍚', 'Lauk': '🍖', 'Kuih': '🧁', 'Minuman': '🥤', 'Pencuci Mulut': '🍮', 'Lain-lain': '🍽' };

const initialForm = { nama: '', kategori: 'Nasi', makanan: '', kuantiti: '' };

const PotluckSection = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('Semua');

    // Edit state
    const [editItem, setEditItem] = useState(null); // item being edited
    const [editForm, setEditForm] = useState({});
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'potluck_list'), orderBy('created_at', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            setList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, []);

    const filtered = filter === 'Semua' ? list : list.filter(i => i.kategori === filter);

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.nama.trim()) { setError('Sila masukkan nama anda.'); return; }
        if (!form.makanan.trim()) { setError('Sila masukkan nama hidangan.'); return; }
        setLoading(true);
        try {
            await addDoc(collection(db, 'potluck_list'), { ...form, created_at: serverTimestamp() });
            setSubmitted(true);
        } catch (err) {
            setError('Ralat berlaku. Sila cuba semula.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handlers
    const openEdit = (item) => {
        setEditItem(item);
        setEditForm({ nama: item.nama, kategori: item.kategori, makanan: item.makanan, kuantiti: item.kuantiti || '' });
        setEditError('');
    };

    const closeEdit = () => { setEditItem(null); setEditForm({}); setEditError(''); };

    const handleEditChange = e => setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleEditSave = async () => {
        setEditError('');
        if (!editForm.nama.trim()) { setEditError('Nama tidak boleh kosong.'); return; }
        if (!editForm.makanan.trim()) { setEditError('Nama hidangan tidak boleh kosong.'); return; }
        setEditLoading(true);
        try {
            await updateDoc(doc(db, 'potluck_list', editItem.id), {
                nama: editForm.nama,
                kategori: editForm.kategori,
                makanan: editForm.makanan,
                kuantiti: editForm.kuantiti,
            });
            closeEdit();
        } catch (err) {
            setEditError('Ralat semasa kemaskini. Cuba semula.');
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <section id="potluck" className="section potluck-section bg-islamic">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Potluck ✦</div>
                    <h2 className="section-title">Rancang Potluck Bersama</h2>
                    <p className="section-subtitle">Daftar hidangan anda dan lihat senarai makanan secara langsung untuk elak pertindihan</p>
                </div>

                <div className="potluck-layout">
                    {/* Form */}
                    <div className="potluck-form-card glass-card reveal">
                        {submitted ? (
                            <div className="success-state">
                                <div className="success-icon"><CheckCircle size={32} color="white" /></div>
                                <h3>Hidangan Didaftarkan! 🍽</h3>
                                <p>Terima kasih kerana menyertai potluck keluarga. Semua orang boleh lihat sumbangan anda!</p>
                                <button className="btn btn-primary" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                                    Tambah Hidangan Lain
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-section-title">
                                    <Utensils size={20} />
                                    <span>Daftar Hidangan Anda</span>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nama Anda *</label>
                                    <input className="form-control" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama penyumbang" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Kategori Makanan *</label>
                                    <div className="cat-selector">
                                        {categories.slice(1).map(cat => (
                                            <button key={cat} type="button"
                                                className={`cat-btn ${form.kategori === cat ? 'active' : ''}`}
                                                onClick={() => setForm(p => ({ ...p, kategori: cat }))}>
                                                {catEmoji[cat]} {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-grid form-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Nama Hidangan *</label>
                                        <input className="form-control" name="makanan" value={form.makanan} onChange={handleChange} placeholder="Cth: Rendang daging" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Anggaran Kuantiti</label>
                                        <input className="form-control" name="kuantiti" value={form.kuantiti} onChange={handleChange} placeholder="Cth: 5 kg / 50 pax" />
                                    </div>
                                </div>
                                {error && <div className="error-text">⚠️ {error}</div>}
                                <button className="btn btn-primary btn-lg w-full" type="submit" disabled={loading}>
                                    {loading ? <><span className="spinner" /> Mendaftar...</> : <><Utensils size={20} /> Daftar Hidangan</>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Live List */}
                    <div className="potluck-list reveal">
                        <div className="potluck-list-header">
                            <h3>🍳 Senarai Potluck Live</h3>
                            <span className="badge badge-emerald">{list.length} hidangan</span>
                        </div>

                        <div className="cat-filter">
                            <Filter size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            {categories.map(c => (
                                <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                                    {c === 'Semua' ? '🍽 Semua' : `${catEmoji[c]} ${c}`}
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 ? (
                            <div className="rsvp-empty">
                                {filter === 'Semua' ? 'Belum ada hidangan didaftarkan. Jadilah yang pertama!' : `Tiada hidangan dalam kategori "${filter}".`}
                            </div>
                        ) : (
                            <div className="potluck-grid">
                                {filtered.map(item => (
                                    <div key={item.id} className="potluck-card card">
                                        <div className="potluck-cat-icon">{catEmoji[item.kategori] || '🍽'}</div>
                                        <div className="potluck-card-body">
                                            <div className="potluck-makanan">{item.makanan}</div>
                                            <div className="potluck-nama">oleh {item.nama}</div>
                                            {item.kuantiti && <div className="potluck-qty">📦 {item.kuantiti}</div>}
                                            <span className="badge badge-gold" style={{ marginTop: '0.4rem' }}>{item.kategori}</span>
                                        </div>
                                        <button className="edit-icon-btn" onClick={() => openEdit(item)} title="Edit hidangan">
                                            <Pencil size={13} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editItem && (
                <div className="edit-modal-overlay" onClick={closeEdit}>
                    <div className="edit-modal glass-card" onClick={e => e.stopPropagation()}>
                        <div className="edit-modal-header">
                            <h3>✏️ Kemaskini Hidangan</h3>
                            <button className="edit-modal-close" onClick={closeEdit}><X size={18} /></button>
                        </div>
                        <div className="edit-modal-body">
                            <div className="form-group">
                                <label className="form-label">Nama Penyumbang *</label>
                                <input className="form-control" name="nama" value={editForm.nama} onChange={handleEditChange} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Kategori</label>
                                <div className="cat-selector" style={{ flexWrap: 'wrap' }}>
                                    {categories.slice(1).map(cat => (
                                        <button key={cat} type="button"
                                            className={`cat-btn ${editForm.kategori === cat ? 'active' : ''}`}
                                            onClick={() => setEditForm(p => ({ ...p, kategori: cat }))}>
                                            {catEmoji[cat]} {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-grid form-grid-2">
                                <div className="form-group">
                                    <label className="form-label">Nama Hidangan *</label>
                                    <input className="form-control" name="makanan" value={editForm.makanan} onChange={handleEditChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Kuantiti</label>
                                    <input className="form-control" name="kuantiti" value={editForm.kuantiti} onChange={handleEditChange} placeholder="Cth: 5 kg" />
                                </div>
                            </div>
                            {editError && <div className="error-text">⚠️ {editError}</div>}
                        </div>
                        <div className="edit-modal-footer">
                            <button className="btn btn-outline" onClick={closeEdit}>Batal</button>
                            <button className="btn btn-primary" onClick={handleEditSave} disabled={editLoading}>
                                {editLoading ? <><span className="spinner" /> Menyimpan...</> : <><Save size={16} /> Simpan Perubahan</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PotluckSection;
