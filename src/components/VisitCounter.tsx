"use client";

import { useEffect } from 'react';

export default function VisitCounter() {
    useEffect(() => {
        fetch('/api/counter', { method: 'POST' }).catch(() => {});
    }, []);

    return null;
}
