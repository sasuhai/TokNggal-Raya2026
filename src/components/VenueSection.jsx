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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1234567890123!2d101.58!3d2.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d1f1e4b1234567%3A0x1234567890abcdef!2sVilla%20Arasy%2C%20Sepang%2C%20Selangor!5e0!3m2!1sen!2smy!4v1234567890123!5m2!1sen!2smy"
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
