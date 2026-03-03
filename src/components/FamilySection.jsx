import React, { useState } from 'react';
import { ExternalLink, Users, Play } from 'lucide-react';
import './FamilySection.css';

const FamilySection = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <section id="kenal-keluarga" className="section family-section">
            <div className="container">
                <div className="section-header reveal">
                    <div className="section-label">✦ Kenali Kami ✦</div>
                    <h2 className="section-title">Kenal Keluarga Tok Nggal</h2>
                    <p className="section-subtitle">Jom kenali ahli keluarga besar kita dan tonton video kenangan bersama</p>
                </div>

                <div className="family-grid reveal">

                    {/* FamilyLinx Card */}
                    <div className="familylinx-card glass-card">
                        <div className="familylinx-icon">🌳</div>
                        <div className="familylinx-content">
                            <h3>Pokok Keluarga Digital</h3>
                            <p>
                                Terokai salasilah dan kenali semua waris keluarga besar Tok Nggal Batu Burok melalui platform FamilyLinx kami.
                            </p>
                            <div className="familylinx-stats">
                                <div className="fl-stat">
                                    <span className="fl-stat-icon">👨‍👩‍👧‍👦</span>
                                    <span>Keluarga Besar</span>
                                </div>
                                <div className="fl-stat">
                                    <span className="fl-stat-icon">🗂️</span>
                                    <span>Salasilah Lengkap</span>
                                </div>
                                <div className="fl-stat">
                                    <span className="fl-stat-icon">📸</span>
                                    <span>Galeri Kenangan</span>
                                </div>
                            </div>
                            <a
                                href="https://familylinx-a03dc.web.app/toknggal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary familylinx-btn"
                            >
                                <Users size={18} />
                                Kenali Keluarga Tok Nggal
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* YouTube Embed */}
                    <div className="youtube-card glass-card">
                        <div className="youtube-label">🎬 Video Kenangan Keluarga</div>
                        <div className="youtube-wrapper">
                            {!videoLoaded ? (
                                <div className="youtube-thumbnail" onClick={() => setVideoLoaded(true)}>
                                    <div className="yt-custom-bg">
                                        <div className="yt-deco-circle yt-deco-1" />
                                        <div className="yt-deco-circle yt-deco-2" />
                                        <div className="yt-title-text">🎞 Kenangan Keluarga Tok Nggal</div>
                                        <div className="yt-play-btn">
                                            <Play size={36} fill="white" color="white" />
                                        </div>
                                        <div className="yt-overlay-text">Klik untuk tonton video</div>
                                    </div>
                                </div>
                            ) : (
                                <iframe
                                    className="youtube-iframe"
                                    src="https://www.youtube.com/embed/OVAxgx5gDqc?autoplay=1&si=Iqi5KiGUURZnhYX3"
                                    title="Video Kenangan Keluarga Tok Nggal"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FamilySection;
