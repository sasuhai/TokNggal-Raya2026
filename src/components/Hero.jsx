import React, { useState, useEffect } from 'react';
import { CalendarCheck, Utensils, Heart, ChevronDown } from 'lucide-react';
import './Hero.css';

const EVENT_DATE = new Date('2026-04-19T14:30:00+08:00');

function pad(n) { return String(n).padStart(2, '0'); }

const CountdownUnit = ({ value, label }) => (
    <div className="countdown-unit">
        <div className="countdown-num">{pad(value)}</div>
        <div className="countdown-label">{label}</div>
    </div>
);

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calc = () => {
            const diff = EVENT_DATE - new Date();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        calc();
        const t = setInterval(calc, 1000);
        return () => clearInterval(t);
    }, []);

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="hero" className="hero">
            {/* Islamic geometric overlay */}
            <div className="hero-pattern" />
            <div className="hero-gradient" />

            {/* Decorative elements */}
            <div className="hero-deco hero-deco-tl animate-float" style={{ animationDelay: '0s' }}>🪔</div>
            <div className="hero-deco hero-deco-tr animate-float" style={{ animationDelay: '1s' }}>🏮</div>
            <div className="hero-deco hero-deco-bl animate-float" style={{ animationDelay: '0.5s' }}>🌙</div>
            <div className="hero-deco hero-deco-br animate-float" style={{ animationDelay: '1.5s' }}>⭐</div>

            <div className="container hero-content">
                <div className="hero-badge animate-fade-up">
                    <span>🌙</span>
                    <span>1447 Hijriah</span>
                    <span>✦</span>
                    <span>2026 Masihi</span>
                </div>

                <h1 className="hero-title animate-fade-up delay-1">
                    <span className="hero-title-small">Majlis Kesyukuran & Sambutan</span>
                    <span className="hero-title-main">Hari Raya</span>
                    <span className="hero-title-accent">Waris Keluarga</span>
                    <span className="hero-title-family">Tok Nggal Batu Burok</span>
                </h1>

                <p className="hero-tagline animate-fade-up delay-2">
                    "Satukan Silaturrahim, Eratkan Ukhuwah"
                </p>

                <div className="hero-event-info animate-fade-up delay-2">
                    <div className="event-info-item">
                        <span className="event-info-icon">📅</span>
                        <div>
                            <div className="event-info-value">19 April 2026</div>
                            <div className="event-info-label">Ahad</div>
                        </div>
                    </div>
                    <div className="event-info-divider">✦</div>
                    <div className="event-info-item">
                        <span className="event-info-icon">🕐</span>
                        <div>
                            <div className="event-info-value">2:30 – 5:30 petang</div>
                            <div className="event-info-label">Masa Majlis</div>
                        </div>
                    </div>
                    <div className="event-info-divider">✦</div>
                    <div className="event-info-item">
                        <span className="event-info-icon">📍</span>
                        <div>
                            <div className="event-info-value">Villa Arasy</div>
                            <div className="event-info-label">Sepang, Selangor</div>
                        </div>
                    </div>
                </div>

                {/* Countdown */}
                <div className="countdown-wrapper animate-fade-up delay-3">
                    <div className="countdown-label-top">⏳ Majlis bermula dalam</div>
                    <div className="countdown-grid">
                        <CountdownUnit value={timeLeft.days} label="Hari" />
                        <div className="countdown-colon">:</div>
                        <CountdownUnit value={timeLeft.hours} label="Jam" />
                        <div className="countdown-colon">:</div>
                        <CountdownUnit value={timeLeft.minutes} label="Minit" />
                        <div className="countdown-colon">:</div>
                        <CountdownUnit value={timeLeft.seconds} label="Saat" />
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="hero-cta animate-fade-up delay-4">
                    <button className="btn btn-gold btn-lg animate-pulse-gold" onClick={() => scrollTo('#rsvp')}>
                        <CalendarCheck size={20} />
                        Daftar Kehadiran
                    </button>
                    <button className="btn btn-white btn-lg" onClick={() => scrollTo('#potluck')}>
                        <Utensils size={20} />
                        Rancang Potluck
                    </button>
                    <button className="btn btn-outline btn-lg" onClick={() => scrollTo('#sumbangan')}
                        style={{ borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}>
                        <Heart size={20} />
                        Hulurkan Sumbangan
                    </button>
                </div>

                <button className="hero-scroll-hint" onClick={() => scrollTo('#poster')}>
                    <ChevronDown size={22} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
