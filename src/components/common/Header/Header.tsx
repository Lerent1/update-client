// Header — E-ShopTech Retail Signature Header

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  Truck,
  ChevronDown,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Monitor,
  Package,
  LogOut,
  Flame,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

const CITIES = [
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Bình Dương',
  'Hải Phòng',
  'Cần Thơ',
  'Đồng Nai',
  'Quảng Ninh',
  'Thái Nguyên',
  'Bắc Ninh',
];

const TRENDING_SEARCHES = [
  'iPhone 16 Pro Max',
  'Galaxy S25 Ultra',
  'Laptop Gaming',
  'MacBook Air M3',
  'Tai nghe Bluetooth',
  'Cáp sạc Type-C',
  'iPad Air',
];

const SUB_NAV_ITEMS = [
  { label: 'Điện thoại', slug: 'dien-thoai', icon: Smartphone },
  { label: 'Laptop', slug: 'laptop', icon: Laptop },
  { label: 'Tablet', slug: 'may-tinh-bang', icon: Tablet },
  { label: 'Tai nghe - Loa', slug: 'tai-nghe-loa', icon: Headphones },
  { label: 'Màn hình', slug: 'man-hinh', icon: Monitor },
  { label: 'Phụ kiện', slug: 'phu-kien', icon: Package },
  { label: 'Thu cũ đổi mới', slug: 'dien-thoai', icon: RefreshCw, highlight: true },
  { label: 'Hotsale Cuối Tuần', slug: 'dien-thoai', icon: Flame, isFire: true },
];

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { totalItems } = useCartStore();
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') ?? '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hồ Chí Minh');
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const cityModalRef = useRef<HTMLDivElement>(null);

  // Close popups on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (cityModalRef.current && !cityModalRef.current.contains(e.target as Node)) {
        setCityModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setIsSearchFocused(false);
    const kw = keyword.trim();
    if (kw) {
      navigate(`/products?keyword=${encodeURIComponent(kw)}`);
    } else {
      navigate('/products');
    }
    setMobileOpen(false);
  }

  function handleQuickSearch(tag: string) {
    setKeyword(tag);
    setIsSearchFocused(false);
    navigate(`/products?keyword=${encodeURIComponent(tag)}`);
    setMobileOpen(false);
  }

  function handleLogout() {
    clearAuth();
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <>
      <header className="header" role="banner">
        {/* Main Header Bar */}
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', height: '64px' }}>
            {/* Hamburger on mobile */}
            <button
              className="btn btn-icon hamburger-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu danh mục"
              style={{ color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', padding: '0.4rem' }}
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo: E-ShopTech */}
            <Link
              to="/"
              aria-label="E-ShopTech — Hệ thống bán lẻ công nghệ hàng đầu"
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, marginRight: '0.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}>
                  E-Shop
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  color: '#6d28d9',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  marginLeft: '4px',
                  lineHeight: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}>
                  TECH
                </span>
              </div>
            </Link>

            {/* Location Selector */}
            <div ref={cityModalRef} style={{ position: 'relative' }} className="desktop-location">
              <button
                onClick={() => setCityModalOpen(!cityModalOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
                aria-haspopup="dialog"
                aria-expanded={cityModalOpen}
              >
                <MapPin size={14} style={{ color: '#fff' }} />
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Xem giá tại</div>
                  <div style={{ fontWeight: 700 }}>{selectedCity}</div>
                </div>
                <ChevronDown size={12} style={{ transform: cityModalOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {cityModalOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: 0,
                    width: '220px',
                    background: '#fff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    padding: '0.75rem',
                    zIndex: 350,
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                    Chọn khu vực của bạn
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '240px', overflowY: 'auto' }}>
                    {CITIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setSelectedCity(c); setCityModalOpen(false); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0.625rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: selectedCity === c ? '#f5f3ff' : 'transparent',
                          color: selectedCity === c ? '#6d28d9' : '#374151',
                          fontWeight: selectedCity === c ? 700 : 500,
                          fontSize: '0.8125rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {c}
                        {selectedCity === c && <Check size={14} color="#6d28d9" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar: White rounded pill with trending popover */}
            <div ref={searchBoxRef} style={{ flex: 1, position: 'relative', maxWidth: '420px', margin: '0 0.25rem' }}>
              <form onSubmit={handleSearch} role="search">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '10px',
                  padding: '0.2rem 0.75rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}>
                  <Search size={16} color="#707070" style={{ flexShrink: 0, marginRight: '0.5rem' }} />
                  <input
                    type="search"
                    placeholder="Bạn cần tìm gì hôm nay?"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    aria-label="Tìm kiếm sản phẩm"
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      padding: '0.45rem 0',
                      fontSize: '0.875rem',
                      color: '#212529',
                      background: 'transparent',
                    }}
                  />
                  {keyword && (
                    <button
                      type="button"
                      onClick={() => setKeyword('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0 0.25rem' }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </form>

              {/* Trending Searches Popover */}
              {isSearchFocused && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '0.75rem',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
                  padding: '1rem',
                  zIndex: 350,
                  border: '1px solid #e5e7eb',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
                    <Sparkles size={14} color="#7c3aed" />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151' }}>Xu hướng tìm kiếm</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {TRENDING_SEARCHES.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleQuickSearch(t)}
                        style={{
                          background: '#f4f6f8',
                          border: '1px solid #e5e7eb',
                          borderRadius: '999px',
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.75rem',
                          color: '#4b5563',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#7c3aed';
                          e.currentTarget.style.color = '#7c3aed';
                          e.currentTarget.style.background = '#f5f3ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.color = '#4b5563';
                          e.currentTarget.style.background = '#f4f6f8';
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', flexShrink: 0 }}>
              {/* Hotline 1800.2097 */}
              <div
                className="desktop-only"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#fff',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.12)',
                  userSelect: 'none',
                }}
              >
                <Phone size={18} />
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Gọi mua hàng</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>1800.2097</div>
                </div>
              </div>

              {/* Stores near you */}
              <Link
                to="/products"
                className="header-action-btn desktop-only"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              >
                <MapPin size={18} />
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Cửa hàng</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>gần bạn</div>
                </div>
              </Link>

              {/* Order lookup */}
              <Link
                to="/profile"
                className="header-action-btn desktop-only"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.375rem 0.5rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              >
                <Truck size={18} />
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Tra cứu</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>đơn hàng</div>
                </div>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                aria-label={`Giỏ hàng có ${totalItems} sản phẩm`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.18)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-8px',
                      background: '#ffffff',
                      color: '#6d28d9',
                      fontSize: '0.625rem',
                      fontWeight: 800,
                      borderRadius: '999px',
                      minWidth: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 3px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}>
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <div style={{ lineHeight: 1.15 }} className="desktop-only">
                  <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Giỏ</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>hàng</div>
                </div>
              </Link>

              {/* Smember / Account Profile */}
              {isAuthenticated ? (
                <div ref={userMenuRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: 'rgba(255,255,255,0.18)',
                      color: '#fff',
                      border: 'none',
                      padding: '0.375rem 0.625rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <User size={18} />
                    <div style={{ lineHeight: 1.15, textAlign: 'left' }} className="desktop-only">
                      <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Smember</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.name?.split(' ').pop()}
                      </div>
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        right: 0,
                        minWidth: '210px',
                        background: '#fff',
                        borderRadius: '0.75rem',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
                        padding: '0.5rem',
                        zIndex: 350,
                      }}
                    >
                      <div style={{ padding: '0.625rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <ShieldCheck size={16} color="#7c3aed" />
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>Smember VIP</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0' }}>{user?.email}</p>
                      </div>

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8125rem',
                            color: '#374151',
                            borderRadius: '6px',
                          }}
                        >
                          Trang Quản trị Admin
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8125rem',
                          color: '#374151',
                          borderRadius: '6px',
                        }}
                      >
                        Hồ sơ Smember
                      </Link>

                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.8125rem',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: '6px',
                        }}
                      >
                        <LogOut size={14} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.375rem 0.625rem',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.18)',
                  }}
                >
                  <User size={18} />
                  <div style={{ lineHeight: 1.15 }} className="desktop-only">
                    <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Smember</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Đăng nhập</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sub-navigation bar: Quick pills */}
        <div style={{ background: 'linear-gradient(90deg, #6d28d9 0%, #7c3aed 100%)', borderTop: '1px solid rgba(255,255,255,0.18)' }} className="sub-header-bar">
          <div className="container" style={{ padding: '0.35rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {SUB_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={`/products?category=${item.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: item.isFire ? 800 : 600,
                      color: item.isFire ? '#ffeb3b' : '#ffffff',
                      background: item.isFire ? 'rgba(0,0,0,0.2)' : 'transparent',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = item.isFire ? 'rgba(0,0,0,0.2)' : 'transparent')}
                  >
                    <Icon size={13} color={item.isFire ? '#ffeb3b' : '#ffffff'} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="mobile-menu" role="dialog" aria-label="Menu E-ShopTech">
            {/* Header of Drawer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: '#6d28d9',
              color: '#fff',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900 }}>E-Shop</span>
                <span style={{
                  background: '#fff',
                  color: '#6d28d9',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  padding: '2px 5px',
                  borderRadius: '4px',
                  marginLeft: '4px',
                }}>
                  TECH
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                aria-label="Đóng menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* City Selector in Mobile */}
            <div style={{ padding: '0.75rem 1rem', background: '#f5f3ff', borderBottom: '1px solid #ede9fe' }}>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Xem giá theo khu vực:</div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #7c3aed',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#6d28d9',
                  background: '#fff',
                }}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category list */}
            <div style={{ padding: '0.75rem 0' }}>
              <p style={{
                fontSize: '0.6875rem',
                fontWeight: 800,
                color: '#9ca3af',
                textTransform: 'uppercase',
                padding: '0 1rem 0.5rem',
                letterSpacing: '0.05em',
              }}>
                Danh mục nổi bật
              </p>

              {SUB_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={`/products?category=${item.slug}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 1rem',
                      fontSize: '0.875rem',
                      color: item.isFire ? '#7c3aed' : '#374151',
                      fontWeight: item.isFire ? 700 : 500,
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <Icon size={18} color={item.isFire ? '#7c3aed' : '#6b7280'} />
                    {item.label}
                  </Link>
                );
              })}

              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                }}
              >
                Xem tất cả sản phẩm →
              </Link>
            </div>

            {/* Auth in Mobile */}
            <div style={{ padding: '1rem', borderTop: '1px solid #f3f4f6', background: '#fafafa' }}>
              {isAuthenticated ? (
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
                    Chào, {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                    }}
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    Đăng ký Smember
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
          .desktop-location { display: none !important; }
        }
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
