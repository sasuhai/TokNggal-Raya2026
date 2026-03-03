import React, { useState, useEffect } from 'react';
import { Menu, X, Home, CalendarCheck, Utensils, Heart, Users } from 'lucide-react';
import './Navbar.css';

const EVENT_DATE = new Date('2026-04-19T14:30:00+08:00');

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const calc = () => {
            const diff = EVENT_DATE - new Date();
            setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
        };
        calc();
        const interval = setInterval(calc, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '#rsvp', label: 'Daftar Hadir', icon: <CalendarCheck size={16} /> },
        { href: '#potluck', label: 'Potluck', icon: <Utensils size={16} /> },
        { href: '#sumbangan', label: 'Sumbangan', icon: <Heart size={16} /> },
        { href: '#galeri', label: 'Galeri', icon: <Users size={16} /> },
    ];

    const scrollTo = (href) => {
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="navbar-inner">
                <a href="#hero" className="navbar-brand" onClick={e => { e.preventDefault(); scrollTo('#hero'); }}>
                    <span className="navbar-logo">🌙</span>
                    <div>
                        <div className="navbar-title">Tok Nggal</div>
                        <div className="navbar-sub">Batu Burok 2026</div>
                    </div>
                </a>

                <div className="navbar-countdown">
                    <div className="count-box">
                        <span className="count-num">{daysLeft}</span>
                        <span className="count-lbl">Hari Lagi</span>
                    </div>
                </div>

                <div className="navbar-links">
                    {navLinks.map(l => (
                        <button key={l.href} className="nav-link" onClick={() => scrollTo(l.href)}>
                            {l.icon}{l.label}
                        </button>
                    ))}
                </div>

                <button className="navbar-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer${open ? ' open' : ''}`}>
                {navLinks.map(l => (
                    <button key={l.href} className="mobile-nav-link" onClick={() => scrollTo(l.href)}>
                        {l.icon}{l.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
