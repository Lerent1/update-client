// ProductsPage — E-ShopTech Retail Catalog

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Package,
  RotateCcw,
} from 'lucide-react';
import { productService, categoryService } from '@/api/services/product.service';
import type { Category, FilterParams, Product } from '@/models/product.model';
import ProductCard from '@/components/common/Card/ProductCard';
import ProductCardSkeleton from '@/components/common/Card/ProductCardSkeleton';
import { useDebounce } from '@/hooks/useDebounce';

const BRAND_FILTERS = [
  'Tất cả',
  'Apple',
  'Samsung',
  'Xiaomi',
  'OPPO',
  'ASUS',
  'Dell',
  'Lenovo',
  'Sony',
];

const PRICE_RANGES = [
  { label: 'Tất cả giá', min: 0, max: Infinity },
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: 'Trên 20 triệu', min: 20000000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: '', label: 'Mặc định' },
  { value: 'newest', label: 'Hàng mới về' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'name_asc', label: 'Tên A → Z' },
] as const;

const PAGE_SIZE = 12;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlKeyword = searchParams.get('keyword') ?? '';
  const urlCategory = searchParams.get('category') ?? '';
  const urlSort = (searchParams.get('sortBy') ?? '') as FilterParams['sortBy'] | '';
  const urlPage = Number(searchParams.get('page') ?? '1');

  const [keyword, setKeyword] = useState(urlKeyword);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [sortBy, setSortBy] = useState(urlSort);
  const [page, setPage] = useState(urlPage);

  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedKeyword = useDebounce(keyword, 400);

  // Load categories
  useEffect(() => {
    categoryService.getCategories().then(setCategories).catch(() => {});
  }, []);

  // Sync external URL changes
  useEffect(() => {
    setKeyword(searchParams.get('keyword') ?? '');
    setSelectedCategory(searchParams.get('category') ?? '');
    setSortBy((searchParams.get('sortBy') ?? '') as FilterParams['sortBy'] | '');
    setPage(Number(searchParams.get('page') ?? '1'));
  }, [searchParams]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: FilterParams = {
        limit: 100,
        ...(debouncedKeyword ? { keyword: debouncedKeyword } : {}),
        ...(selectedCategory ? { categorySlug: selectedCategory } : {}),
        ...(sortBy ? { sortBy: sortBy as FilterParams['sortBy'] } : {}),
      };
      const result = await productService.getProducts(params);
      setRawProducts(result.data);
    } catch {
      setError('Không thể tải sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [debouncedKeyword, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side brand & price filtering for instantaneous responsive UX
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];

    if (selectedBrand !== 'Tất cả') {
      list = list.filter((p) => p.brand?.toLowerCase() === selectedBrand.toLowerCase());
    }

    const priceRule = PRICE_RANGES[selectedPriceIndex];
    if (priceRule && (priceRule.min > 0 || priceRule.max < Infinity)) {
      list = list.filter((p) => p.price >= priceRule.min && p.price <= priceRule.max);
    }

    return list;
  }, [rawProducts, selectedBrand, selectedPriceIndex]);

  // Pagination on filtered products
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  function handleCategorySelect(slug: string) {
    setSelectedCategory((prev) => (prev === slug ? '' : slug));
    setPage(1);
  }

  function handleClearAllFilters() {
    setKeyword('');
    setSelectedCategory('');
    setSelectedBrand('Tất cả');
    setSelectedPriceIndex(0);
    setSortBy('');
    setPage(1);
    setSearchParams({}, { replace: true });
  }

  const selectedCategoryName = categories.find((c) => c.slug === selectedCategory)?.name;
  const hasActiveFilters = debouncedKeyword || selectedCategory || selectedBrand !== 'Tất cả' || selectedPriceIndex > 0 || sortBy;

  return (
    <div style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
      {/* Top Banner & Breadcrumb */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '0.75rem 0' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
            <Link to="/" style={{ color: '#6b7280' }}>Trang chủ</Link>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#7c3aed', fontWeight: 700 }}>
              {selectedCategoryName ?? 'Tất cả sản phẩm'}
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#111827', margin: 0, textTransform: 'uppercase' }}>
                {selectedCategoryName ?? 'Tất cả sản phẩm công nghệ'}
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0.2rem 0 0' }}>
                {total} sản phẩm chính hãng, bảo hành 12 - 24 tháng tại E-ShopTech
              </p>
            </div>

            {/* Sort Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#4b5563' }}>Sắp xếp:</span>
              <select
                className="select"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as FilterParams['sortBy'] | ''); setPage(1); }}
                style={{ fontSize: '0.8125rem', padding: '0.4rem 1.75rem 0.4rem 0.75rem' }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '1rem' }}>
        {/* Filter Box */}
        <div style={{
          background: '#ffffff',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '1rem',
          marginBottom: '1rem',
        }}>
          {/* Brand Filter Row */}
          <div style={{ marginBottom: '0.875rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Chọn theo thương hiệu:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {BRAND_FILTERS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => { setSelectedBrand(brand); setPage(1); }}
                  className={`filter-pill ${selectedBrand === brand ? 'active' : ''}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter Row */}
          <div style={{ marginBottom: '0.875rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Mức giá:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  onClick={() => { setSelectedPriceIndex(idx); setPage(1); }}
                  className={`filter-pill ${selectedPriceIndex === idx ? 'active' : ''}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Row */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Danh mục:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              <button
                onClick={() => handleCategorySelect('')}
                className={`filter-pill ${!selectedCategory ? 'active' : ''}`}
              >
                Tất cả danh mục
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`filter-pill ${selectedCategory === cat.slug ? 'active' : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Clear Bar */}
          {hasActiveFilters && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.875rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #f3f4f6',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>Đang chọn lọc:</span>

              {debouncedKeyword && (
                <span className="badge badge-purple-subtle" style={{ gap: '0.25rem' }}>
                  Tìm: "{debouncedKeyword}"
                </span>
              )}
              {selectedBrand !== 'Tất cả' && (
                <span className="badge badge-purple-subtle">Hãng: {selectedBrand}</span>
              )}
              {selectedPriceIndex > 0 && (
                <span className="badge badge-purple-subtle">Giá: {PRICE_RANGES[selectedPriceIndex].label}</span>
              )}
              {selectedCategory && (
                <span className="badge badge-purple-subtle">Danh mục: {selectedCategoryName}</span>
              )}

              <button
                onClick={handleClearAllFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#7c3aed',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  marginLeft: 'auto',
                }}
              >
                <RotateCcw size={12} /> Bỏ chọn tất cả
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {error ? (
          <div className="error-state">
            <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>
            <button className="btn btn-primary" onClick={fetchProducts}>Thử lại</button>
          </div>
        ) : loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="empty-state">
            <Package size={56} style={{ color: '#7c3aed', opacity: 0.4, marginBottom: '1rem' }} />
            <p className="empty-state-title">Không tìm thấy sản phẩm phù hợp</p>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Hãy thử chọn lại thương hiệu, mức giá hoặc từ khóa khác
            </p>
            <button className="btn btn-primary" onClick={handleClearAllFilters}>
              <RotateCcw size={14} /> Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination" style={{ marginTop: '2rem' }} role="navigation" aria-label="Phân trang">
                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`pagination-btn ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    style={{
                      background: page === p ? '#7c3aed' : '#ffffff',
                      color: page === p ? '#ffffff' : '#374151',
                      borderColor: page === p ? '#7c3aed' : '#e5e7eb',
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  aria-label="Trang sau"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
