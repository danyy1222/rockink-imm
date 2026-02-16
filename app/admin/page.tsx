'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PRODUCTS, Product, Brand, DEFAULT_BRANDS, HeroSlide, DEFAULT_HERO_SLIDES } from '@/lib/data';
import { getCategories, addCategory, removeCategory } from '@/lib/categories';
import { Edit2, Trash2, Plus, Folder, Check, Award, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { ImageUploader } from '@/components/image-uploader';

function AdminDashboardContent() {
  const { isLoggedIn, isMounted } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [redirected, setRedirected] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'productos' | 'categorias' | 'hero' | 'ofertas' | 'marcas'>('productos');
  const [selectedOffersProducts, setSelectedOffersProducts] = useState<string[]>([]);
  const [brands, setBrands] = useState<Brand[]>(DEFAULT_BRANDS);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('');
  const [productImages, setProductImages] = useState<string[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [heroUploadImages, setHeroUploadImages] = useState<string[]>([]);

  const loadProductsFromApi = async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      if (!response.ok) throw new Error('Error API');
      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch {
      setProducts(PRODUCTS);
    }
  };

  useEffect(() => {
    if (isMounted && !isLoggedIn && !redirected) {
      setRedirected(true);
      router.push('/admin/login');
    }
  }, [isMounted, isLoggedIn, redirected, router]);

  useEffect(() => {
    if (isMounted) {
      void loadProductsFromApi();

      // Cargar ofertas seleccionadas
      const savedOffers = localStorage.getItem('offersProducts');
      if (savedOffers) {
        try {
          setSelectedOffersProducts(JSON.parse(savedOffers));
        } catch (e) {
          setSelectedOffersProducts([]);
        }
      }

      // Cargar marcas
      const savedBrands = localStorage.getItem('brands');
      if (savedBrands) {
        try {
          setBrands(JSON.parse(savedBrands));
        } catch (e) {
          setBrands(DEFAULT_BRANDS);
          localStorage.setItem('brands', JSON.stringify(DEFAULT_BRANDS));
        }
      } else {
        localStorage.setItem('brands', JSON.stringify(DEFAULT_BRANDS));
      }

      const savedHeroSlides = localStorage.getItem('heroSlides');
      if (savedHeroSlides) {
        try {
          const parsed = JSON.parse(savedHeroSlides) as HeroSlide[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHeroSlides(parsed);
          } else {
            setHeroSlides(DEFAULT_HERO_SLIDES);
            localStorage.setItem('heroSlides', JSON.stringify(DEFAULT_HERO_SLIDES));
          }
        } catch (e) {
          setHeroSlides(DEFAULT_HERO_SLIDES);
          localStorage.setItem('heroSlides', JSON.stringify(DEFAULT_HERO_SLIDES));
        }
      } else {
        localStorage.setItem('heroSlides', JSON.stringify(DEFAULT_HERO_SLIDES));
      }

      setCategories(getCategories());
    }
  }, [isMounted]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const mainImage = productImages[0] || formData.image || 'https://images.unsplash.com/photo-1574895617837-7e16022e5ecb?w=500&h=500&fit=crop';

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category || 'Otros',
      image: mainImage,
      images: [mainImage],
      specifications: formData.specifications || [],
      youtubeId: formData.youtubeId || 'dQw4w9WgXcQ',
      inStock: formData.inStock !== false,
      inOffer: formData.inOffer || false,
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      alert('No se pudo crear el producto');
      return;
    }
    await loadProductsFromApi();
    setFormData({});
    setProductImages([]);
    setShowAddForm(false);
    alert('Producto añadido exitosamente');
  };

  const handleUpdateProduct = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    const current = products.find((p) => p.id === id);
    if (!current) return;
    const mainImage = productImages[0] || formData.image || current.image;
    const payload: Product = {
      ...current,
      ...formData,
      image: mainImage,
      images: [mainImage],
    };
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      alert('No se pudo actualizar el producto');
      return;
    }
    await loadProductsFromApi();
    setEditingId(null);
    setFormData({});
    setProductImages([]);
    alert('Producto actualizado exitosamente');
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        alert('No se pudo eliminar el producto');
        return;
      }
      await loadProductsFromApi();
    }
  };

  const handleToggleOfferProduct = (productId: string) => {
    let updated: string[];
    if (selectedOffersProducts.includes(productId)) {
      updated = selectedOffersProducts.filter((id) => id !== productId);
    } else {
      updated = [...selectedOffersProducts, productId];
    }
    setSelectedOffersProducts(updated);
    localStorage.setItem('offersProducts', JSON.stringify(updated));
  };

  const handleAddBrand = () => {
    if (!newBrandName.trim() || !newBrandLogo.trim()) {
      alert('Por favor completa el nombre y logo de la marca');
      return;
    }

    const newBrand: Brand = {
      id: Date.now().toString(),
      name: newBrandName,
      logo: newBrandLogo,
    };

    const updatedBrands = [...brands, newBrand];
    setBrands(updatedBrands);
    localStorage.setItem('brands', JSON.stringify(updatedBrands));
    setNewBrandName('');
    setNewBrandLogo('');
    alert('Marca agregada exitosamente');
  };

  const handleDeleteBrand = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta marca?')) {
      const updatedBrands = brands.filter((b) => b.id !== id);
      setBrands(updatedBrands);
      localStorage.setItem('brands', JSON.stringify(updatedBrands));
    }
  };

  const saveHeroSlides = (updatedSlides: HeroSlide[]) => {
    try {
      localStorage.setItem('heroSlides', JSON.stringify(updatedSlides));
      setHeroSlides(updatedSlides);
    } catch (error) {
      alert('No se pudieron guardar los slides del hero. Prueba con imágenes más livianas.');
    }
  };

  const handleAddHeroSlidesFromUpload = () => {
    if (heroUploadImages.length === 0) {
      alert('Selecciona al menos una imagen');
      return;
    }

    const newSlides = heroUploadImages.map((url, idx) => ({
      id: `${Date.now()}-${idx}`,
      url,
      badge: 'Bienvenido a Rockink IMM',
      title: 'Ofertas Especiales Ahora',
      description: 'Descubre nuestros productos en oferta seleccionados especialmente para ti. Calidad premium a precios excepcionales.',
    }));

    const updated = [...heroSlides, ...newSlides].slice(0, 5);
    saveHeroSlides(updated);
    setHeroUploadImages([]);
    alert('Slides del hero actualizados');
  };

  const handleCreateHeroSlide = () => {
    if (heroSlides.length >= 5) {
      alert('Máximo 5 slides');
      return;
    }

    const newSlide: HeroSlide = {
      id: `${Date.now()}-new`,
      url: '/placeholder.jpg',
      badge: 'Nueva etiqueta',
      title: 'Nuevo título',
      description: 'Nueva descripción',
    };

    saveHeroSlides([...heroSlides, newSlide]);
  };

  const handleDeleteHeroSlide = (id: string) => {
    if (heroSlides.length <= 1) {
      alert('Debe existir al menos un slide en el hero');
      return;
    }
    const updated = heroSlides.filter((slide) => slide.id !== id);
    saveHeroSlides(updated);
  };

  const handleUpdateHeroSlide = (id: string, field: 'badge' | 'title' | 'description' | 'url', value: string) => {
    const updated = heroSlides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide));
    saveHeroSlides(updated);
  };

  const handleUpdateHeroSlideImageFile = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      handleUpdateHeroSlide(id, 'url', base64);
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = '';
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const updated = addCategory(newCategory.trim());
    setCategories(updated);
    setNewCategory('');
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (category: string) => {
    if (confirm(`¿Deseas eliminar la categoría "${category}"?`)) {
      const updated = removeCategory(category);
      setCategories(updated);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header isAdmin={true} />

      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <Button
            variant={activeTab === 'productos' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('productos')}
            className="rounded-b-none"
          >
            Productos
          </Button>
          <Button
            variant={activeTab === 'categorias' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('categorias')}
            className="rounded-b-none"
          >
            <Folder className="w-4 h-4 mr-2" />
            Categorías
          </Button>
          <Button
            variant={activeTab === 'hero' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('hero')}
            className="rounded-b-none"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Hero
          </Button>
          <Button
            variant={activeTab === 'ofertas' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('ofertas')}
            className="rounded-b-none"
          >
            <Check className="w-4 h-4 mr-2" />
            Gestionar Ofertas
          </Button>
          <Button
            variant={activeTab === 'marcas' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('marcas')}
            className="rounded-b-none"
          >
            <Award className="w-4 h-4 mr-2" />
            Marcas
          </Button>
        </div>

        {/* Tab: Productos */}
        {activeTab === 'productos' && (
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-primary">Gestión de Productos</h1>
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
                setFormData({});
              }}
              className="bg-secondary hover:bg-secondary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showAddForm ? 'Cancelar' : 'Nuevo Producto'}
            </Button>
          </div>
        )}

        {/* Add/Edit Form */}
        {activeTab === 'productos' && (showAddForm || editingId) && (
          <Card className="mb-8 border-2 border-accent">
            <CardContent className="pt-6">
              <form
                onSubmit={(e) =>
                  editingId ? handleUpdateProduct(editingId, e) : handleAddProduct(e)
                }
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded"
                      placeholder="Nombre del producto"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Categoría</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Descripción</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded"
                      placeholder="Descripción del producto"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUploader
                      images={productImages}
                      onImagesChange={setProductImages}
                      maxImages={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">ID de Video YouTube</label>
                    <input
                      type="text"
                      value={formData.youtubeId || ''}
                      onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded"
                      placeholder="dQw4w9WgXcQ"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock !== false}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">En Stock</span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inOffer || false}
                        onChange={(e) => setFormData({ ...formData, inOffer: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">En Oferta</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingId ? 'Actualizar Producto' : 'Crear Producto'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                      setFormData({});
                      setProductImages([]);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        {activeTab === 'productos' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              Total de productos: {products.length}
            </h2>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4 items-start">
                      <div className="relative w-24 h-24 bg-muted rounded flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-primary">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                        <p className="text-sm text-foreground line-clamp-2 mb-2">
                          {product.description}
                        </p>
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            product.inStock
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {product.inStock ? 'En Stock' : 'Agotado'}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingId(product.id);
                            setFormData(product);
                            setShowAddForm(false);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Categorías */}
        {activeTab === 'categorias' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-primary">Gestión de Categorías</h1>
            <div className="flex items-center justify-between mb-8">
              <Button
                onClick={() => setShowCategoryForm(!showCategoryForm)}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                {showCategoryForm ? 'Cancelar' : 'Nueva Categoría'}
              </Button>
            </div>

            {/* Add Category Form */}
            {showCategoryForm && (
              <Card className="mb-8 border-2 border-accent">
                <CardContent className="pt-6">
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre de la Categoría</label>
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded"
                          placeholder="Nombre de la categoría"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Crear Categoría
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCategoryForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Categories List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                Total de categorías: {categories.length}
              </h2>

              <div className="grid gap-4">
                {categories.map((category) => (
                  <Card key={category} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-center">
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-primary">{category}</h3>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCategory(category)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Hero */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Gestión de Hero Principal</h1>
            <p className="text-muted-foreground">
              Administra imágenes de fondo y frases del carrusel principal (máximo 5).
            </p>

            <div className="flex justify-end">
              <Button
                onClick={handleCreateHeroSlide}
                disabled={heroSlides.length >= 5}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Nuevo Slide
              </Button>
            </div>

            <Card className="border-2 border-primary">
              <CardContent className="pt-6">
                <ImageUploader
                  images={heroUploadImages}
                  onImagesChange={setHeroUploadImages}
                  maxImages={5}
                />
                <Button
                  onClick={handleAddHeroSlidesFromUpload}
                  disabled={heroUploadImages.length === 0}
                  className="w-full mt-4 bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Imágenes al Hero
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {heroSlides.map((slide) => (
                <Card key={slide.id}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="relative w-full h-44 bg-muted rounded">
                      <Image
                        src={slide.url}
                        alt={slide.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">URL de imagen</label>
                      <input
                        type="text"
                        value={slide.url}
                        onChange={(e) => handleUpdateHeroSlide(slide.id, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">O subir imagen para este slide</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUpdateHeroSlideImageFile(slide.id, e)}
                        className="w-full px-3 py-2 border border-input rounded bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Etiqueta</label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => handleUpdateHeroSlide(slide.id, 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Título</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleUpdateHeroSlide(slide.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Descripción</label>
                      <textarea
                        value={slide.description}
                        onChange={(e) => handleUpdateHeroSlide(slide.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar Slide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Gestionar Ofertas */}
        {activeTab === 'ofertas' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Gestión de Productos en Oferta</h1>
            <p className="text-muted-foreground">
              Selecciona los productos que deseas mostrar en la sección de ofertas. Estos aparecerán en el carrusel principal.
            </p>

            <div className="grid gap-3">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay productos disponibles</p>
                </div>
              ) : (
                products.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all ${
                      selectedOffersProducts.includes(product.id)
                        ? 'border-primary border-2 bg-primary/5'
                        : 'border-border hover:border-primary'
                    }`}
                    onClick={() => handleToggleOfferProduct(product.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative w-20 h-20 bg-muted rounded flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-bold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {product.inStock ? '✓ En Stock' : '✗ Agotado'}
                        </p>
                      </div>

                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          selectedOffersProducts.includes(product.id)
                            ? 'bg-primary border-primary'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedOffersProducts.includes(product.id) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold">
                Productos seleccionados: {selectedOffersProducts.length}
              </p>
            </div>
          </div>
        )}

        {/* Tab: Marcas */}
        {activeTab === 'marcas' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Gestión de Marcas</h1>

            {/* Add Brand Form */}
            <Card className="border-2 border-primary">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre de la Marca</label>
                    <input
                      type="text"
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded"
                      placeholder="Ej: Lister"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">URL del Logo</label>
                    <input
                      type="text"
                      value={newBrandLogo}
                      onChange={(e) => setNewBrandLogo(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <Button onClick={handleAddBrand} className="w-full bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Marca
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Brands List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Total de marcas: {brands.length}</h2>
              <div className="grid gap-4">
                {brands.map((brand) => (
                  <Card key={brand.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative w-24 h-16 bg-muted rounded flex-shrink-0">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain rounded p-2"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-foreground">{brand.name}</h3>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
}

