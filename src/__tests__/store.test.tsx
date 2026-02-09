import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { PortfolioProvider, usePortfolio } from '@/lib/store';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PortfolioProvider>{children}</PortfolioProvider>
);

describe('PortfolioProvider / usePortfolio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated with no stored session', () => {
    const { result } = renderHook(() => usePortfolio(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.userName).toBeNull();
  });

  it('login sets userName, isAuthenticated, and persists to localStorage', () => {
    const { result } = renderHook(() => usePortfolio(), { wrapper });

    act(() => {
      result.current.login('Adrian');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.userName).toBe('Adrian');
    expect(localStorage.getItem('session_user')).toBe('Adrian');
  });

  it('logout clears userName, isAuthenticated, and localStorage', () => {
    const { result } = renderHook(() => usePortfolio(), { wrapper });

    act(() => {
      result.current.login('Adrian');
    });
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.userName).toBeNull();
    expect(localStorage.getItem('session_user')).toBeNull();
  });

  it('restores session from localStorage on mount', () => {
    localStorage.setItem('session_user', 'StoredUser');

    const { result } = renderHook(() => usePortfolio(), { wrapper });

    // useEffect runs async, wait for state update
    expect(result.current.userName).toBe('StoredUser');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('isHydrated becomes true after mount', () => {
    const { result } = renderHook(() => usePortfolio(), { wrapper });
    expect(result.current.isHydrated).toBe(true);
  });

  it('logout also clears chat_messages from localStorage', () => {
    localStorage.setItem('chat_messages', JSON.stringify([{ id: '1', role: 'user', content: 'test' }]));
    const { result } = renderHook(() => usePortfolio(), { wrapper });

    act(() => {
      result.current.login('Adrian');
    });
    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem('chat_messages')).toBeNull();
  });

  it('throws error when used outside PortfolioProvider', () => {
    expect(() => {
      renderHook(() => usePortfolio());
    }).toThrow('usePortfolio must be used within a PortfolioProvider');
  });
});
