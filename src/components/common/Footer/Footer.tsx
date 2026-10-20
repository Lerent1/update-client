// Footer — E-ShopTech Retail Signature Footer

import { Link } from 'react-router-dom';
import {
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
} from 'lucide-react';

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.69a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.97-4.5V8.04a8.28 8.28 0 0 0 4.8 1.52V6.1c-.34 0-.68-.04-1-.13z" />
    </svg>
  );
}

const SERVICE_BENEFITS = [
  { icon: Truck, title: 'Giao hàng siêu tốc', desc: 'Miễn phí từ đơn 300.000₫' },
  { icon: Shield, title: 'Bảo hành chính hãng', desc: '12 - 24 tháng toàn quốc' },
  { icon: RefreshCw, title: '1 đổi 1 trong 30 ngày', desc: 'Nhanh chóng nếu lỗi NSX' },
  { icon: CreditCard, title: 'Trả góp 0% lãi suất', desc: 'Duyệt nhanh trong 5 phút' },
];

const PAYMENT_METHODS = [
  'VNPAY',
  'MoMo',
  'ZaloPay',
  'Apple Pay',
  'Visa',
  'MasterCard',
  'JCB',
  'ShopeePay',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" style={{ background: '#ffffff', color: '#4b5563', borderTop: '1px solid #e5e7eb', marginTop: 'auto' }}>
      {/* 4 Value Proposition Bar */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ padding: '1.25rem 1rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
            className="service-benefits-grid"
          >
            {SERVICE_BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: '#ede9fe', flexShrink: 0,
                }}>
                  <Icon size={20} color="#7c3aed" />
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>{title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Hotlines */}
      <div className="container" style={{ padding: '2.5rem 1rem 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: '1fr',
          }}
          className="footer-grid-cps"
        >
          {/* Column 1: Hotline Support */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '0.875rem', letterSpacing: '0.02em' }}>
              Tổng đài hỗ trợ miễn phí
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem' }}>
              <div>
                Gọi mua: <span style={{ fontWeight: 800, color: '#7c3aed' }}>1800.2097</span> (7h30 - 22h00)
              </div>
              <div>
                Khiếu nại: <span style={{ fontWeight: 800, color: '#7c3aed' }}>1800.2063</span> (8h00 - 21h30)
              </div>
              <div>
                Bảo hành: <span style={{ fontWeight: 800, color: '#7c3aed' }}>1800.2064</span> (8h00 - 21h00)
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>
                Phương thức thanh toán
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {PAYMENT_METHODS.map((pm) => (
                  <span
                    key={pm}
                    style={{
                      padding: '0.2rem 0.5rem',
                      background: '#f3f4f6',
                      borderRadius: '4px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#4b5563',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Information & Policies */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '0.875rem', letterSpacing: '0.02em' }}>
              Thông tin & Chính sách
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              {[
                { title: 'Mua hàng và thanh toán Online', to: '/products' },
                { title: 'Mua hàng trả góp 0% qua thẻ', to: '/products' },
                { title: 'Chính sách giao hàng toàn quốc', to: '/policies/shipping' },
                { title: 'Chính sách bảo hành chính hãng', to: '/policies/warranty' },
                { title: 'Chính sách đổi trả 1 - 1 trong 30 ngày', to: '/policies/returns' },
                { title: 'Tra cứu hóa đơn điện tử VAT', to: '/profile' },
                { title: 'Chính sách bảo mật thông tin', to: '/policies/privacy' },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.to}
                    style={{ color: '#4b5563', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#7c3aed')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Smember */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '0.875rem', letterSpacing: '0.02em' }}>
              Dịch vụ & Tiện ích
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              {[
                { title: 'Khách hàng doanh nghiệp (B2B)', to: '/products' },
                { title: 'Ưu đãi thanh toán ngân hàng & Ví', to: '/products' },
                { title: 'Smember: Tích điểm & Quyền lợi VIP', to: '/profile' },
                { title: 'Thu cũ đổi mới trợ giá lên tới 2 triệu', to: '/products' },
                { title: 'Tuyển dụng nhân viên E-ShopTech', to: '/' },
                { title: 'Hệ thống 115 cửa hàng toàn quốc', to: '/' },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.to}
                    style={{ color: '#4b5563', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#7c3aed')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Ecosystem & Socials */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '0.875rem', letterSpacing: '0.02em' }}>
              Kết nối với E-ShopTech
            </h3>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
              {[
                { icon: YoutubeIcon, label: 'Kênh YouTube', color: '#ff0000', href: '#' },
                { icon: FacebookIcon, label: 'E-ShopTech Fanpage', color: '#1877f2', href: '#' },
                { icon: TikTokIcon, label: 'TikTok E-ShopTech', color: '#000000', href: '#' },
              ].map(({ icon: Icon, label, color, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    color: color,
                    border: '1px solid #e5e7eb',
                    transition: 'transform 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#ede9fe'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = '#f3f4f6'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div style={{ fontSize: '0.8125rem', marginBottom: '0.875rem' }}>
              <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Hệ sinh thái công nghệ:</div>
              <div style={{ color: '#6b7280', lineHeight: 1.6 }}>
                <div>• <strong>Điện Thoại Vui:</strong> Sửa chữa điện thoại & laptop</div>
                <div>• <strong>Sforum.vn:</strong> Tin công nghệ & đánh giá</div>
                <div>• <strong>Schannel:</strong> Kênh giải trí công nghệ</div>
              </div>
            </div>

            {/* Certification Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#15803d',
                background: '#dcfce7',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid #86efac',
              }}>
                ✓ Đã Thông Báo Bộ Công Thương
              </span>
              <span style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid #bfdbfe',
              }}>
                DMCA PROTECTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Address */}
      <div style={{ borderTop: '1px solid #e5e7eb', background: '#f8fafc', padding: '1.25rem 1rem' }}>
        <div className="container" style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.6, textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.25rem', fontWeight: 600 }}>
            Công ty TNHH Thương Mại Thiết Bị Công Nghệ E-ShopTech Việt Nam
          </p>
          <p style={{ margin: '0 0 0.25rem' }}>
            Địa chỉ: 350-352 Võ Văn Kiệt, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh · Điện thoại: 1800.2097 · Email: cskh@eshoptech.vn
          </p>
          <p style={{ margin: 0 }}>
            © {currentYear} E-ShopTech. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .service-benefits-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .footer-grid-cps { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .footer-grid-cps { grid-template-columns: 1.3fr 1.1fr 1.1fr 1.3fr !important; }
        }
      `}</style>
    </footer>
  );
}
