import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Heart, CheckCircle, Eye, EyeOff, DollarSign } from 'lucide-react';
import './SumbanganSection.css';

const paymentMethods = ['Bank Transfer', 'Tunai (Hari Majlis)', 'TNG eWallet', 'DuitNow'];

const initialForm = {
    nama: '',
    amount: '',
    payment_method: 'Bank Transfer',
    tarikh_bayar: '',
    anonymous: false,
};

const SumbanganSection = () => {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [list, setList] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const q = query(collection(db, 'sumbangan'), orderBy('created_at', 'desc'));
        const unsub = onSnapshot(q, (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setList(data);
            setTotalAmount(data.reduce((sum, d) => sum + (Number(d.amount) || 0), 0));
        });
        return () => unsub();
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.nama.trim()) { setError('Sila masukkan nama anda.'); return; }
        if (!form.amount || Number(form.amount) <= 0) { setError('Sila masukkan jumlah sumbangan.'); return; }
        setLoading(true);
        try {
            await addDoc(collection(db, 'sumbangan'), {
                ...form,
                amount: Number(form.amount),
                created_at: serverTimestamp(),
            });
            setSubmitted(true);
        } catch (err) {
            setError('Ralat berlaku. Sila cuba semula.');
        } finally {
            setLoading(false);
        }
    };

    const formatRM = (n) => `RM ${Number(n).toLocaleString('ms-MY', { minimumFractionDigits: 2 })}`;

    return (
        <section id="sumbangan" className="section sumbangan-section">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Sumbangan Ikhlas ✦</div>
                    <h2 className="section-title">Hulurkan Sumbangan</h2>
                    <p className="section-subtitle">Sumbangan anda membantu jawatankuasa menyediakan majlis yang sempurna</p>
                </div>

                {/* Total */}
                <div className="sumbangan-total-card reveal">
                    <div className="total-left">
                        <div className="total-label">💰 Jumlah Komitmen Sumbangan</div>
                        <div className="total-amount">{formatRM(totalAmount)}</div>
                        <div className="total-sub">daripada {list.length} penyumbang</div>
                    </div>
                    <div className="total-right">
                        <div className="target-label">Sasaran</div>
                        <div className="target-amount">RM 1,000.00</div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${Math.min(100, (totalAmount / 1000) * 100)}%` }}
                            />
                        </div>
                        <div className="progress-pct">{Math.round((totalAmount / 1000) * 100)}% daripada sasaran</div>
                    </div>
                </div>

                <div className="sumbangan-layout">
                    {/* Form */}
                    <div className="sumbangan-form-card glass-card reveal">
                        {submitted ? (
                            <div className="success-state">
                                <div className="success-icon"><CheckCircle size={32} color="white" /></div>
                                <h3>Terima Kasih! 🎉</h3>
                                <p>Sumbangan anda telah direkodkan. Jazakallahu Khairan atas keikhlasan anda!</p>
                                <button className="btn btn-primary" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
                                    Rekod Sumbangan Lain
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-section-title">
                                    <Heart size={20} />
                                    <span>Rekod Komitmen Sumbangan</span>
                                </div>
                                <p className="form-note">* Ini adalah rekod komitmen. Pembayaran boleh dilakukan kemudian mengikut kaedah yang dipilih.</p>

                                <div className="form-group">
                                    <label className="form-label">
                                        {form.anonymous ? <><EyeOff size={14} /> Nama (akan dirahsiakan)</> : <><Eye size={14} /> Nama Penuh *</>}
                                    </label>
                                    <input
                                        className="form-control"
                                        name="nama"
                                        value={form.nama}
                                        onChange={handleChange}
                                        placeholder={form.anonymous ? 'Nama untuk rekod dalaman' : 'Nama penuh anda'}
                                        required
                                    />
                                </div>

                                <div className="anon-toggle" onClick={() => setForm(p => ({ ...p, anonymous: !p.anonymous }))}>
                                    <div className={`toggle-track ${form.anonymous ? 'checked' : ''}`}>
                                        <div className="toggle-thumb" />
                                    </div>
                                    <span className="toggle-label">
                                        {form.anonymous ? '🔒 Nama dirahsiakan (hanya admin boleh lihat)' : '👁 Paparkan nama secara terbuka'}
                                    </span>
                                </div>

                                <div className="form-grid form-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">Jumlah Sumbangan (RM) *</label>
                                        <div className="amount-input-wrap">
                                            <span className="amount-prefix">RM</span>
                                            <input
                                                className="form-control amount-input"
                                                name="amount"
                                                type="number"
                                                min="1"
                                                step="0.50"
                                                value={form.amount}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Cara Pembayaran</label>
                                        <select className="form-control form-select" name="payment_method" value={form.payment_method} onChange={handleChange}>
                                            {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tarikh Janji Bayar</label>
                                    <input
                                        className="form-control"
                                        name="tarikh_bayar"
                                        type="date"
                                        value={form.tarikh_bayar}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                {error && <div className="error-text">⚠️ {error}</div>}

                                <button className="btn btn-gold btn-lg w-full" type="submit" disabled={loading}>
                                    {loading ? <><span className="spinner" style={{ borderColor: 'rgba(255,255,255,0.4)', borderTopColor: 'white' }} /> Merekod...</>
                                        : <><Heart size={20} /> Rekod Sumbangan Saya</>}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Donors list */}
                    <div className="donors-list reveal">
                        <h3 className="rsvp-list-title">❤️ Senarai Penyumbang</h3>
                        <p className="text-muted text-sm" style={{ marginBottom: '1rem' }}>Terima kasih kepada semua yang telah berkomitmen!</p>
                        {list.length === 0 ? (
                            <div className="rsvp-empty">Belum ada sumbangan. Jadilah yang pertama!</div>
                        ) : (
                            <div className="donors-grid">
                                {list.map((item) => (
                                    <div key={item.id} className="donor-card card">
                                        <div className="donor-avatar">
                                            {item.anonymous ? '🔒' : (item.nama?.[0]?.toUpperCase() || '?')}
                                        </div>
                                        <div className="donor-info">
                                            <div className="donor-name">{item.anonymous ? 'Hamba Allah 🌙' : item.nama}</div>
                                            <div className="donor-method">{item.payment_method}</div>
                                        </div>
                                        <div className="donor-amount">{formatRM(item.amount)}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SumbanganSection;
