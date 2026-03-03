import React, { useState } from 'react';
import { CalendarCheck, Utensils, Heart } from 'lucide-react';
import './StickyBottom.css';

const StickyBottom = () => {
    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="sticky-bottom">
            <button className="sticky-btn sticky-btn-gold" onClick={() => scrollTo('#rsvp')}>
                <CalendarCheck size={16} />
                <span>Daftar</span>
            </button>
            <button className="sticky-btn sticky-btn-emerald" onClick={() => scrollTo('#potluck')}>
                <Utensils size={16} />
                <span>Potluck</span>
            </button>
            <button className="sticky-btn sticky-btn-outline" onClick={() => scrollTo('#sumbangan')}>
                <Heart size={16} />
                <span>Sumbangan</span>
            </button>
        </div>
    );
};

export default StickyBottom;
