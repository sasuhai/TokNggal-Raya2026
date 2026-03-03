import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import './VenueSection.css';

const agenda = [
    { time: '2:30 petang', event: 'Ketibaan Tetamu & Pendaftaran', icon: '🎪' },
    { time: '3:00 petang', event: 'Sesi Suai Kenal Generasi Muda', icon: '🤝' },
    { time: '3:30 petang', event: 'Jamuan Raya & Potluck Bersama', icon: '🍽' },
    { time: '4:30 petang', event: 'Cabutan Bertuah & Hiburan', icon: '🎉' },
    { time: '5:00 petang', event: 'Bergambar Kenangan Bersama', icon: '📸' },
    { time: '5:30 petang', event: 'Bersurai & Pulang', icon: '🌙' },
];

const VenueSection = () => {
    return (
        <section id="venue" className="section venue-section">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Maklumat Majlis ✦</div>
                    <h2 className="section-title">Tempat & Aturcara</h2>
                    <p className="section-subtitle">Semua maklumat yang anda perlukan untuk hadir ke majlis</p>
                </div>

                <div className="venue-grid">
                    {/* Map */}
                    <div className="venue-map-card glass-card reveal">
                        <div className="venue-map-header">
                            <MapPin size={22} style={{ color: 'var(--emerald-600)' }} />
                            <div>
                                <div className="venue-name">Villa Arasy</div>
                                <div className="venue-address">No 2, Jalan 4 Keranji, Sepang, Selangor</div>
                            </div>
                        </div>
                        <div className="venue-map-frame">
                            <iframe
                                title="Lokasi Villa Arasy"
                                src="https://maps.google.com/maps?q=Villa+Arasy,+Jalan+4+Keranji,+Sepang,+Selangor&z=15&output=embed"
                                width="100%"
                                height="280"
                                style={{ border: 0, borderRadius: '16px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <a
                            href="https://www.google.com/maps/search/Villa+Arasy,+No+2+Jalan+4+Keranji+Sepang+Selangor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary w-full"
                            style={{ justifyContent: 'center' }}
                        >
                            <MapPin size={16} />
                            Buka Google Maps
                        </a>

                        <div className="venue-datetime-row">
                            <div className="venue-dt-item">
                                <Calendar size={18} style={{ color: 'var(--emerald-600)' }} />
                                <div>
                                    <div className="venue-dt-label">Tarikh</div>
                                    <div className="venue-dt-value">19 April 2026 (Ahad)</div>
                                </div>
                            </div>
                            <div className="venue-dt-item">
                                <Clock size={18} style={{ color: 'var(--emerald-600)' }} />
                                <div>
                                    <div className="venue-dt-label">Masa</div>
                                    <div className="venue-dt-value">2:30 – 5:30 petang</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agenda */}
                    <div className="reveal">
                        <div className="agenda-header">
                            <h3>🗓 Aturcara Majlis</h3>
                            <p>Ikuti jadual majlis untuk pengalaman yang lebih teratur</p>
                        </div>
                        <div className="agenda-list">
                            {agenda.map((item, i) => (
                                <div key={i} className="agenda-item">
                                    <div className="agenda-timeline">
                                        <div className="agenda-dot" />
                                        {i < agenda.length - 1 && <div className="agenda-line" />}
                                    </div>
                                    <div className="agenda-card card">
                                        <div className="agenda-icon">{item.icon}</div>
                                        <div className="agenda-info">
                                            <div className="agenda-time">{item.time}</div>
                                            <div className="agenda-event">{item.event}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
