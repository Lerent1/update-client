// ProductCard — E-ShopTech Retail Card

import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Check } from 'lucide-react';
import type { Product } from '@/models/product.model';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/utils/format';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isHotSale?: boolean;
}

export default function ProductCard({ product, onAddToCart, isHotSale = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discount = product.discountPercent ?? (
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  );

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

    onAddToCart?.(product);
  }

  function handleToggleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  }

  // Smember discount estimate (1% or fixed cashback)
  const smemberDiscount = Math.min(Math.round(product.price * 0.01), 300000);

  return (
    <article className="product-card" style={{ height: '100%' }}>
      <Link
        to={`/products/${product.id}`}
        aria-label={`Xem chi tiết ${product.name}`}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}
      >
        {/* Card Image Area with promotional badges */}
        <div className="product-card-image">
          {/* Top-left Badges: Trả góp 0% & Discount % */}
          <div style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            zIndex: 2,
          }}>
            <span style={{
              background: '#fff7ed',
              color: '#ea580c',
              border: '1px solid #fdba74',
              borderRadius: '4px',
              fontSize: '0.6875rem',
              fontWeight: 700,
              padding: '0.125rem 0.375rem',
              whiteSpace: 'nowrap',
            }}>
              Trả góp 0%
            </span>

            {discount > 0 && (
              <span style={{
                background: '#7c3aed',
                color: '#ffffff',
                borderRadius: '4px',
                fontSize: '0.6875rem',
                fontWeight: 800,
                padding: '0.125rem 0.375rem',
                display: 'inline-block',
                width: 'fit-content',
              }}>
                Giảm {discount}%
              </span>
            )}
          </div>

          {/* Top-right Wishlist Button */}
          <button
            onClick={handleToggleLike}
            aria-label="Thêm vào danh sách yêu thích"
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'rgba(255,255,255,0.85)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'all 0.2s',
            }}
          >
            <Heart
              size={15}
              color={liked ? '#7c3aed' : '#9ca3af'}
              fill={liked ? '#7c3aed' : 'none'}
            />
          </button>

          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image';
            }}
          />
        </div>

        {/* Card Body */}
        <div className="product-card-body">
          {product.brand && (
            <span className="product-card-brand">{product.brand}</span>
          )}

          <h3 className="product-card-name" title={product.name}>
            {product.name}
          </h3>

          {/* Price Block: Vibrant Purple */}
          <div className="product-card-price">
            <span className="product-card-price-sale">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-card-price-original">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Smember Benefit Tag */}
          <div style={{
            background: '#f5f3ff',
            border: '1px dashed #c4b5fd',
            borderRadius: '4px',
            padding: '0.25rem 0.375rem',
            fontSize: '0.6875rem',
            color: '#6d28d9',
            lineHeight: 1.3,
            margin: '0.25rem 0',
          }}>
            <strong>Smember:</strong> Giảm thêm tới {formatPrice(smemberDiscount)}
          </div>

          {/* Hot Sale Progress Bar (if in Hot Sale Section) */}
          {isHotSale && (
            <div className="fire-bar-container">
              <div
                className="fire-bar-fill"
                style={{ width: `${Math.min(95, Math.max(30, (product.stock % 20 + 1) * 5))}%` }}
              />
              <div className="fire-bar-text">
                🔥 ĐÃ BÁN {Math.max(12, 45 - (product.stock % 15))} SẢN PHẨM
              </div>
            </div>
          )}

          {/* Rating and Stock status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Star size={12} fill="#ffc107" color="#ffc107" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4b5563' }}>
                {product.rating ?? '4.8'}
              </span>
              <span style={{ fontSize: '0.6875rem', color: '#9ca3af' }}>
                ({product.reviewCount ?? 12})
              </span>
            </div>

            {isOutOfStock ? (
              <span className="stock-out">Hết hàng</span>
            ) : isLowStock ? (
              <span className="stock-low">Sắp hết hàng</span>
            ) : (
              <span style={{ fontSize: '0.6875rem', color: '#16a34a', fontWeight: 600 }}>Sẵn hàng</span>
            )}
          </div>
        </div>
      </Link>

      {/* Action: Add to Cart button */}
      <div className="product-card-actions">
        <button
          className={`btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Thêm ${product.name} vào giỏ hàng`}
          style={{ width: '100%', gap: '0.375rem', fontSize: '0.75rem', padding: '0.45rem 0.5rem' }}
        >
          {added ? (
            <>
              <Check size={14} color="#7c3aed" />
              <span>Đã thêm</span>
            </>
          ) : isOutOfStock ? (
            'Tạm hết hàng'
          ) : (
            <>
              <ShoppingCart size={13} />
              <span>Thêm vào giỏ</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
