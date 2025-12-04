"use client";

import React, { useEffect, useState } from 'react';

export default function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null);

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const res = await fetch('/api/counter', { method: 'POST' });
                if (res.ok) {
                    const data = await res.json();
                    setVisits(data.visits);
                }
            } catch (error) {
                console.error('Failed to fetch visits:', error);
            }
        };

        fetchVisits();
    }, []);

    if (visits === null) return null;

    return (
        <span className="text-xs font-mono text-textSec opacity-50 select-none">
            {visits} vs
        </span>
    );
}
