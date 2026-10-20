// AuthLayout — Wrapper cho các trang đăng nhập / đăng ký E-ShopTech

import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f4f6f8',
      padding: '2rem 1rem',
    }}>
      {/* Brand Logo E-ShopTech */}
      <Link to="/" style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1.75rem', textDecoration: 'none' }}>
        <span style={{
          fontSize: '1.85rem',
          fontWeight: 900,
          color: '#7c3aed',
          letterSpacing: '-0.02em',
        }}>
          E-Shop
        </span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#7c3aed',
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: 900,
          padding: '2px 8px',
          borderRadius: '6px',
          marginLeft: '4px',
          lineHeight: 1,
          boxShadow: '0 2px 6px rgba(124, 58, 237, 0.3)',
        }}>
          TECH
        </span>
      </Link>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
      }}>
        <Outlet />
      </div>
    </div>
  );
}
