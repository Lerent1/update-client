import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Package,
  Flame,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Cpu,
  Tv,
  Watch,
  Home,
  RefreshCw,
} from 'lucide-react';
import { productService } from '@/api/services/product.service';
import type { Product } from '@/models/product.model';
import ProductCard from '@/components/common/Card/ProductCard';
import ProductCardSkeleton from '@/components/common/Card/ProductCardSkeleton';

const MAIN_CATEGORIES = [
  { name: 'Điện thoại, Tablet', slug: 'dien-thoai', icon: Smartphone, tag: 'Hot' },
  { name: 'Laptop, Màn hình', slug: 'laptop', icon: Laptop, tag: null },
  { name: 'Máy tính bảng', slug: 'may-tinh-bang', icon: Tablet, tag: null },
  { name: 'Âm thanh, Tai nghe', slug: 'tai-nghe-loa', icon: Headphones, tag: null },
  { name: 'Đồng hồ thông minh', slug: 'phu-kien', icon: Watch, tag: null },
  { name: 'Nhà thông minh', slug: 'phu-kien', icon: Home, tag: null },
  { name: 'Phụ kiện, Cáp sạc', slug: 'phu-kien', icon: Package, tag: null },
  { name: 'PC, Linh kiện máy', slug: 'man-hinh', icon: Cpu, tag: null },
  { name: 'Tivi, Loa giải trí', slug: 'tai-nghe-loa', icon: Tv, tag: null },
  { name: 'Thu cũ đổi mới', slug: 'dien-thoai', icon: RefreshCw, tag: 'Trợ giá 2Tr' },
  { name: 'Hotsale Cuối Tuần', slug: 'dien-thoai', icon: Flame, tag: 'Giảm 50%' },
];

const HERO_SLIDES = [
  {
    id: 1,
    title: 'iPhone 16 Pro Max',
    subtitle: 'Titan Sa Mạc — Trả góp 0% qua thẻ',
    tag: 'Mở bán đặc quyền',
    tabName: 'IPHONE 16 PRO MAX',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&q=80',
    link: '/products/1',
    bg: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #c084fc 100%)',
    priceText: 'Chỉ từ 32.990.000₫',
  },
  {
    id: 2,
    title: 'Galaxy S25 Ultra 5G',
    subtitle: 'Quyền năng Galaxy AI đỉnh cao',
    tag: 'Thu cũ trợ giá 4 triệu',
    tabName: 'GALAXY S25 ULTRA',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900&q=80',
    link: '/products/2',
    bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #38bdf8 100%)',
    priceText: 'Chỉ từ 29.990.000₫',
  },
  {
    id: 3,
    title: 'MacBook Air M3 Series',
    subtitle: 'Siêu mỏng nhẹ, pin 18 giờ liên tục',
    tag: 'HSSV Giảm thêm 5%',
    tabName: 'MACBOOK AIR M3',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80',
    link: '/products/4',
    bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
    priceText: 'Chỉ từ 26.490.000₫',
  },
  {
    id: 4,
    title: 'Sony & JBL Âm Thanh',
    subtitle: 'Chống ồn chủ động, bass bùng nổ',
    tag: 'Giảm sốc tới 40%',
    tabName: 'TAI NGHE & LOA HOT',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    link: '/products/7',
    bg: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #f43f5e 100%)',
    priceText: 'Chỉ từ 690.000₫',
  },
];

// Tech News
const TECH_NEWS = [
  {
    id: 1,
    title: 'Đánh giá chi tiết iPhone 16 Pro Max sau 3 tháng sử dụng: Vẫn là ông vua toàn diện',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
    time: '2 giờ trước',
    comments: 48,
  },
  {
    id: 2,
    title: 'Top 5 laptop văn phòng và sinh viên mỏng nhẹ, pin trâu đáng mua nhất 2026',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
    time: '4 giờ trước',
    comments: 32,
  },
  {
    id: 3,
    title: 'Galaxy S25 Ultra có gì vượt trội? So sánh camera 200MP và tính năng Galaxy AI',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80',
    time: '6 giờ trước',
    comments: 19,
  },
  {
    id: 4,
    title: 'Hướng dẫn chọn mua sạc nhanh 65W GaN tiện dụng cho cả iPhone, iPad và MacBook',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80',
    time: '1 ngày trước',
    comments: 15,
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBrandPhone, setActiveBrandPhone] = useState('all');
  const [activeBrandLaptop, setActiveBrandLaptop] = useState('all');
  const [flashSaleTab, setFlashSaleTab] = useState('dien-thoai');

  // Products & Categories
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Countdown timer for Flash Sale
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 18 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play hero slider
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  // Fetch products
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await productService.getProducts({ limit: 40 });
        setAllProducts(res.data);
      } catch {
        // Handle gracefully
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Partition products
  const phoneProducts = useMemo(() => {
    const list = allProducts.filter((p) => p.category?.slug === 'dien-thoai' || p.categoryId === 1);
    if (activeBrandPhone === 'all') return list;
    return list.filter((p) => p.brand?.toLowerCase() === activeBrandPhone.toLowerCase());
  }, [allProducts, activeBrandPhone]);

  const laptopProducts = useMemo(() => {
    const list = allProducts.filter((p) => p.category?.slug === 'laptop' || p.categoryId === 2);
    if (activeBrandLaptop === 'all') return list;
    return list.filter((p) => p.brand?.toLowerCase() === activeBrandLaptop.toLowerCase());
  }, [allProducts, activeBrandLaptop]);

  const hotSaleProducts = useMemo(() => {
    const filtered = allProducts.filter((p) => {
      if (flashSaleTab === 'all') return true;
      return p.category?.slug === flashSaleTab;
    });
    return (filtered.length > 0 ? filtered : allProducts).slice(0, 5);
  }, [allProducts, flashSaleTab]);

  const accessoryProducts = useMemo(() => {
    return allProducts.filter((p) => p.category?.slug === 'phu-kien' || p.category?.slug === 'tai-nghe-loa').slice(0, 5);
  }, [allProducts]);

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* ============================================================
          SECTION 1: HERO (3 Columns: Menu + Slider + 3 Banners)
          ============================================================ */}
      <section style={{ paddingTop: '0.75rem', paddingBottom: '1rem' }} aria-label="Khu vực nổi bật">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 260px',
              gap: '0.75rem',
              alignItems: 'stretch',
            }}
            className="hero-3col-layout"
          >
            {/* Column 1: Vertical Category Menu */}
            <aside
              style={{
                background: '#ffffff',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                padding: '0.35rem 0',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="vertical-category-sidebar"
            >
              {MAIN_CATEGORIES.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={`/products?category=${item.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8125rem',
                      color: item.name.includes('Hotsale') ? '#7c3aed' : '#212529',
                      fontWeight: item.name.includes('Hotsale') ? 700 : 500,
                      textDecoration: 'none',
                      borderRadius: '4px',
                      margin: '0 0.25rem',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f5f3ff';
                      e.currentTarget.style.color = '#7c3aed';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = item.name.includes('Hotsale') ? '#7c3aed' : '#212529';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={16} color={item.name.includes('Hotsale') ? '#7c3aed' : '#4b5563'} />
                      <span>{item.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {item.tag && (
                        <span style={{
                          fontSize: '0.625rem',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '4px',
                          background: '#ede9fe',
                          color: '#7c3aed',
                          fontWeight: 700,
                        }}>
                          {item.tag}
                        </span>
                      )}
                      <ChevronRight size={13} color="#9ca3af" />
                    </div>
                  </Link>
                );
              })}
            </aside>

            {/* Column 2: Interactive Hero Slider */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {/* Slider Main View */}
              <div style={{ position: 'relative', flex: 1, minHeight: '300px', overflow: 'hidden' }}>
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: currentSlide === idx ? 1 : 0,
                      pointerEvents: currentSlide === idx ? 'auto' : 'none',
                      transition: 'opacity 0.4s ease-in-out',
                      background: slide.bg,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '2rem',
                    }}
                  >
                    {/* Decorative luminous glow */}
                    <div style={{
                      position: 'absolute',
                      top: '-40%',
                      right: '5%',
                      width: '380px',
                      height: '380px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Left text */}
                    <div style={{ maxWidth: '60%', zIndex: 2 }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.45)',
                        color: '#ffffff',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.625rem',
                        borderRadius: '6px',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        {slide.tag}
                      </span>
                      <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.85rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                        {slide.title}
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.95)', margin: '0 0 1rem' }}>
                        {slide.subtitle}
                      </p>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fef08a', marginBottom: '1.25rem' }}>
                        {slide.priceText}
                      </div>
                      <Link
                        to={slide.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.55rem 1.25rem',
                          fontSize: '0.8125rem',
                          borderRadius: '8px',
                          background: '#ffffff',
                          color: '#7c3aed',
                          fontWeight: 800,
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.22)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)';
                        }}
                      >
                        Mua Ngay <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Right image */}
                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        style={{
                          maxHeight: '260px',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))',
                          borderRadius: '12px',
                        }}
                      />
                    </div>
                  </div>
                ))}

                {/* Slider Nav Arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0.5rem',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.4)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Slide trước"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '0.5rem',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.4)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Slide tiếp"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Slider Bottom Tabs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${HERO_SLIDES.length}, 1fr)`,
                background: '#f8fafc',
                borderTop: '1px solid #e5e7eb',
              }}>
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      padding: '0.625rem 0.5rem',
                      border: 'none',
                      background: currentSlide === idx ? '#ffffff' : 'transparent',
                      borderBottom: currentSlide === idx ? '3px solid #7c3aed' : '3px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{
                      fontSize: '0.6875rem',
                      fontWeight: currentSlide === idx ? 800 : 600,
                      color: currentSlide === idx ? '#7c3aed' : '#4b5563',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {slide.tabName}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: 3 Stacked Promotional Banners */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="hero-right-banners">
              {/* Banner 1 */}
              <Link
                to="/products?category=dien-thoai"
                style={{
                  flex: 1,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
                  border: '1px solid #ddd6fe',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>
                    Thu cũ đổi mới
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#5b21b6', marginTop: '0.2rem' }}>
                    Trợ giá lên đến<br /><span style={{ color: '#7c3aed', fontSize: '1rem' }}>2.000.000₫</span>
                  </div>
                </div>
              </Link>

              {/* Banner 2 */}
              <Link
                to="/profile"
                style={{
                  flex: 1,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                  border: '1px solid #fde68a',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase' }}>
                    Smember Đặc Quyền
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#78350f', marginTop: '0.2rem' }}>
                    Tích điểm & Hoàn tiền<br /><span style={{ color: '#d97706', fontSize: '1rem' }}>Đến 5% giá trị</span>
                  </div>
                </div>
              </Link>

              {/* Banner 3 */}
              <Link
                to="/products?category=laptop"
                style={{
                  flex: 1,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  border: '1px solid #bfdbfe',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                    Trả Góp 0% Lãi Suất
                  </span>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e3a8a', marginTop: '0.2rem' }}>
                    Duyệt hồ sơ 5 phút<br /><span style={{ color: '#2563eb', fontSize: '1rem' }}>0đ trả trước</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: HOT SALE CUỐI TUẦN / FLASH SALE
          ============================================================ */}
      <section style={{ padding: '0.5rem 0 1.5rem' }} aria-label="Hot Sale giá sốc">
        <div className="container">
          <div className="flash-sale-box">
            {/* Header of Flash Sale */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '0.75rem',
            }}>
              {/* Title & Countdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Flame size={26} color="#ffeb3b" style={{ animation: 'bounce 1s infinite' }} />
                  <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                    HOT SALE GIÁ SỐC
                  </span>
                </div>

                {/* Countdown Timer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#ffeb3b', fontWeight: 700 }}>Kết thúc sau:</span>
                  <span className="countdown-badge">{String(countdown.hours).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>:</span>
                  <span className="countdown-badge">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>:</span>
                  <span className="countdown-badge">{String(countdown.seconds).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Sub-tabs inside Hot Sale */}
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Điện thoại', slug: 'dien-thoai' },
                  { label: 'Laptop', slug: 'laptop' },
                  { label: 'Âm thanh', slug: 'tai-nghe-loa' },
                  { label: 'Tất cả deal', slug: 'all' },
                ].map((tab) => (
                  <button
                    key={tab.slug}
                    onClick={() => setFlashSaleTab(tab.slug)}
                    style={{
                      background: flashSaleTab === tab.slug ? '#ffffff' : 'rgba(255,255,255,0.18)',
                      color: flashSaleTab === tab.slug ? '#6d28d9' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flash Sale Product Grid */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {hotSaleProducts.map((p) => (
                  <ProductCard key={p.id} product={p} isHotSale={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: ĐIỆN THOẠI NỔI BẬT NHẤT
          ============================================================ */}
      <section style={{ padding: '1rem 0' }} aria-label="Điện thoại nổi bật">
        <div className="container">
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
          }}>
            {/* Header + Brand Filters */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <h2 className="section-title">
                ĐIỆN THOẠI NỔI BẬT NHẤT
              </h2>

              {/* Brand Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Apple (iPhone)', value: 'apple' },
                  { label: 'Samsung', value: 'samsung' },
                  { label: 'Xiaomi', value: 'xiaomi' },
                  { label: 'OPPO', value: 'oppo' },
                ].map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setActiveBrandPhone(b.value)}
                    className={`filter-pill ${activeBrandPhone === b.value ? 'active' : ''}`}
                  >
                    {b.label}
                  </button>
                ))}

                <Link
                  to="/products?category=dien-thoai"
                  style={{ fontSize: '0.8125rem', color: '#7c3aed', fontWeight: 700, marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  Xem tất cả <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {phoneProducts.slice(0, 8).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: LAPTOP, MÀN HÌNH BÁN CHẠY
          ============================================================ */}
      <section style={{ padding: '0.75rem 0' }} aria-label="Laptop bán chạy">
        <div className="container">
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
          }}>
            {/* Header + Brand Filters */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              <h2 className="section-title">
                LAPTOP, MÀN HÌNH BÁN CHẠY
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'MacBook', value: 'apple' },
                  { label: 'ASUS', value: 'asus' },
                  { label: 'Dell', value: 'dell' },
                  { label: 'Lenovo', value: 'lenovo' },
                ].map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setActiveBrandLaptop(b.value)}
                    className={`filter-pill ${activeBrandLaptop === b.value ? 'active' : ''}`}
                  >
                    {b.label}
                  </button>
                ))}

                <Link
                  to="/products?category=laptop"
                  style={{ fontSize: '0.8125rem', color: '#7c3aed', fontWeight: 700, marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  Xem tất cả <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
                {laptopProducts.slice(0, 8).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: PHỤ KIỆN CÔNG NGHỆ CHÍNH HÃNG
          ============================================================ */}
      <section style={{ padding: '0.75rem 0' }} aria-label="Phụ kiện chính hãng">
        <div className="container">
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 className="section-title">
                PHỤ KIỆN & ÂM THANH GIÁ SỐC
              </h2>
              <Link
                to="/products?category=phu-kien"
                style={{ fontSize: '0.8125rem', color: '#7c3aed', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                Xem tất cả phụ kiện <ChevronRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
              {accessoryProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: SFORUM — CHUYÊN TRANG CÔNG NGHỆ E-SHOPTECH
          ============================================================ */}
      <section style={{ padding: '1.25rem 0' }} aria-label="Tin công nghệ Sforum">
        <div className="container">
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#7c3aed', color: '#fff', fontSize: '0.75rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  Sforum
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#212529' }}>
                  TIN CÔNG NGHỆ NỔI BẬT
                </h2>
              </div>
              <span style={{ fontSize: '0.8125rem', color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }}>
                Xem thêm tin tức →
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}>
              {TECH_NEWS.map((news) => (
                <article
                  key={news.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <img
                      src={news.image}
                      alt={news.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                    />
                  </div>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#212529',
                    lineHeight: 1.4,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {news.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                    <span>{news.time}</span>
                    <span>• {news.comments} bình luận</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Styles for Hero 3-Col */}
      <style>{`
        @media (max-width: 992px) {
          .hero-3col-layout {
            grid-template-columns: 1fr !important;
          }
          .vertical-category-sidebar {
            display: none !important;
          }
          .hero-right-banners {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .hero-right-banners {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
