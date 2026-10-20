// ProductDetailPage — E-ShopTech Retail Product Detail

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Package,
  Truck,
  Shield,
  RefreshCw,
  Check,
  Heart,
  ChevronRight,
  MapPin,
  Gift,
  AlertCircle,
} from 'lucide-react';
import { productService } from '@/api/services/product.service';
import type { Product } from '@/models/product.model';
import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/common/Card/ProductCard';
import { formatPrice } from '@/utils/format';

const MEMORY_OPTIONS = ['128GB', '256GB', '512GB', '1TB'];
const COLOR_OPTIONS = [
  { name: 'Titan Tự Nhiên', hex: '#9e9689' },
  { name: 'Titan Sa Mạc', hex: '#c5a782' },
  { name: 'Titan Trắng', hex: '#f0f0ee' },
  { name: 'Titan Đen', hex: '#373639' },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedMemory, setSelectedMemory] = useState('256GB');
  const [selectedColor, setSelectedColor] = useState('Titan Tự Nhiên');
  const [liked, setLiked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id!);
        setProduct(data);
        setSelectedImage(data.imageUrl);

        if (data.categoryId) {
          productService
            .getRelatedProducts(data.categoryId, data.id, 4)
            .then(setRelatedProducts)
            .catch(() => {});
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Không thể tải sản phẩm.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleBuyNow() {
    if (!product) return;
    addItem(product, 1);
    navigate('/cart');
  }

  function handleAddToCart() {
    if (!product) return;
    addItem(product, 1);
    triggerToast(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="skeleton" style={{ height: '400px', borderRadius: '12px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="skeleton" style={{ height: '30px', width: '80%' }} />
            <div className="skeleton" style={{ height: '40px', width: '50%' }} />
            <div className="skeleton" style={{ height: '120px', width: '100%' }} />
            <div className="skeleton" style={{ height: '50px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
        <h2>{error ?? 'Không tìm thấy sản phẩm'}</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const discount = product.discountPercent ?? (
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  );

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#6d28d9',
          color: '#fff',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          animation: 'fade-in 0.2s',
        }}>
          <Check size={18} />
          {toastMessage}
        </div>
      )}

      {/* Top Header / Breadcrumb */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '0.625rem 0' }}>
        <div className="container">
          <nav className="breadcrumb" style={{ fontSize: '0.8125rem' }}>
            <Link to="/" style={{ color: '#6b7280' }}>Trang chủ</Link>
            <ChevronRight size={13} color="#cbd5e1" />
            <Link to="/products" style={{ color: '#6b7280' }}>Sản phẩm</Link>
            <ChevronRight size={13} color="#cbd5e1" />
            <span style={{ color: '#7c3aed', fontWeight: 600 }}>{product.category?.name ?? 'Điện thoại'}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1rem' }}>
        {/* Product Title Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '1.25rem',
        }}>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Star size={14} fill="#ffc107" color="#ffc107" />
                <span style={{ fontWeight: 700, color: '#111827' }}>{product.rating ?? '4.9'}</span>
                <span style={{ color: '#6b7280' }}>({product.reviewCount ?? 128} đánh giá)</span>
              </div>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>Còn hàng tại E-ShopTech</span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ color: '#6b7280' }}>Thương hiệu: <strong style={{ color: '#111827' }}>{product.brand ?? 'Apple'}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setLiked(!liked)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: '1px solid #e5e7eb',
                background: '#fff',
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: liked ? '#7c3aed' : '#4b5563',
              }}
            >
              <Heart size={14} fill={liked ? '#7c3aed' : 'none'} color={liked ? '#7c3aed' : '#6b7280'} />
              {liked ? 'Đã yêu thích' : 'Yêu thích'}
            </button>
          </div>
        </div>

        {/* Main 2-Column Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48% 52%',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
          className="detail-2col-layout"
        >
          {/* Left Column: Gallery & Guarantee */}
          <div>
            {/* Main Picture Card */}
            <div style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              textAlign: 'center',
              position: 'relative',
            }}>
              {discount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: '#7c3aed',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                }}>
                  Giảm {discount}%
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  maxHeight: '360px',
                  width: '100%',
                  objectFit: 'contain',
                  margin: '0 auto',
                  transition: 'transform 0.3s',
                }}
              />
            </div>

            {/* Guarantee & Service Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              marginTop: '1rem',
            }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Thông tin bảo hành & cam kết E-ShopTech
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem', color: '#374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                  <span><strong>Bảo hành chính hãng 12 tháng</strong> tại trung tâm bảo hành ủy quyền</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                  <span><strong>1 đổi 1 trong 30 ngày</strong> nếu có lỗi phần cứng từ nhà sản xuất</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                  <span><strong>Giao hàng miễn phí</strong> nội thành trong vòng 2 giờ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={16} color="#7c3aed" style={{ flexShrink: 0 }} />
                  <span>Hộp phụ kiện đầy đủ, nguyên seal, mới 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Variations, Promo Box & Buying Actions */}
          <div>
            {/* Price Block */}
            <div style={{
              background: '#ffffff',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              padding: '1.25rem',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#7c3aed' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '1rem', color: '#707070', textDecoration: 'line-through' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span style={{
                  background: '#fff7ed',
                  color: '#ea580c',
                  border: '1px solid #fdba74',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                }}>
                  Trả góp 0%
                </span>
              </div>

              {/* Smember benefit badge */}
              <div style={{
                background: '#fff5f5',
                border: '1px dashed #fca5a5',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                marginTop: '0.75rem',
                fontSize: '0.8125rem',
                color: '#b91c1c',
              }}>
                <strong>Smember đặc quyền:</strong> Tích lũy điểm và giảm thêm đến <strong>300.000₫</strong>
              </div>
            </div>

            {/* Version Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                Chọn phiên bản bộ nhớ:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {MEMORY_OPTIONS.map((mem) => (
                  <button
                    key={mem}
                    onClick={() => setSelectedMemory(mem)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '8px',
                      border: selectedMemory === mem ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                      background: selectedMemory === mem ? '#f5f3ff' : '#ffffff',
                      color: selectedMemory === mem ? '#7c3aed' : '#374151',
                      fontWeight: 700,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    {mem}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                Chọn màu sắc: <strong style={{ color: '#7c3aed' }}>{selectedColor}</strong>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {COLOR_OPTIONS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: selectedColor === col.name ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                      background: selectedColor === col.name ? '#f5f3ff' : '#ffffff',
                      color: selectedColor === col.name ? '#7c3aed' : '#374151',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: col.hex, border: '1px solid #ccc' }} />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Signature Promotion Box */}
            <div style={{
              border: '1.5px solid #7c3aed',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                background: '#7c3aed',
                color: '#fff',
                padding: '0.5rem 0.875rem',
                fontSize: '0.8125rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}>
                <Gift size={16} /> KHUYẾN MÃI E-SHOPTECH ĐẶC QUYỀN
              </div>

              <div style={{ padding: '0.875rem', background: '#fff', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#374151' }}>
                <div>1. <strong>Giảm thêm 500.000₫</strong> khi thanh toán qua ví VNPAY-QR hoặc MoMo</div>
                <div>2. <strong>Thu cũ đổi mới:</strong> Trợ giá lên tới 2.000.000₫ khi lên đời</div>
                <div>3. <strong>Tặng gói bảo hành VIP</strong> rơi vỡ vào nước 12 tháng tại Điện Thoại Vui</div>
                <div>4. Tặng kèm voucher giảm 20% khi mua ốp lưng và sạc dự phòng chính hãng</div>
              </div>
            </div>

            {/* Buying Action Buttons: Big Red MUA NGAY + 2 Side-by-side Installment Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
              {/* Big Red "MUA NGAY" */}
              <button
                onClick={handleBuyNow}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: 1.2,
                }}
              >
                <span>MUA NGAY</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.9 }}>
                  (Giao tận nơi hoặc nhận tại cửa hàng E-ShopTech)
                </span>
              </button>

              {/* 2 Installment Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.625rem 0.5rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.8125rem' }}>TRẢ GÓP 0%</div>
                  <div style={{ fontSize: '0.6875rem', opacity: 0.9 }}>Duyệt nhanh qua CCCD</div>
                </button>

                <button
                  onClick={handleAddToCart}
                  style={{
                    background: '#ffffff',
                    color: '#7c3aed',
                    border: '1.5px solid #7c3aed',
                    borderRadius: '8px',
                    padding: '0.625rem 0.5rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.8125rem' }}>THÊM VÀO GIỎ</div>
                  <div style={{ fontSize: '0.6875rem' }}>Giữ sản phẩm trong giỏ</div>
                </button>
              </div>
            </div>

            {/* Store Location Availability */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#7c3aed" />
                <span>Có sẵn tại <strong>48 cửa hàng</strong> ở TP. Hồ Chí Minh & Hà Nội</span>
              </div>
              <span style={{ color: '#7c3aed', fontWeight: 700, cursor: 'pointer' }}>Xem chi nhánh</span>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications && (
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            marginTop: '2rem',
          }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Thông số kỹ thuật {product.name}
            </h2>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div
                  key={key}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr',
                    padding: '0.65rem 1rem',
                    background: idx % 2 === 0 ? '#f8fafc' : '#ffffff',
                    fontSize: '0.8125rem',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#4b5563' }}>{key}</span>
                  <span style={{ color: '#111827' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Description */}
        {product.description && (
          <div style={{
            background: '#ffffff',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            padding: '1.25rem',
            marginTop: '1.5rem',
          }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Đặc điểm nổi bật
            </h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: '#374151', margin: 0 }}>
              {product.description}
            </p>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Sản phẩm tương tự bạn có thể thích
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 850px) {
          .detail-2col-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
