"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Trash2,
  Edit,
  Plus,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Upload,
  AlertTriangle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Activity,
} from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useOrderStore } from "@/lib/order-store"
import type { Product } from "@/lib/all-products-data"

export default function AdminPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct, setLoading, lastUpdated } = useProductStore()

  const { orders, updateOrderStatus, getTotalRevenue, getRecentOrders } = useOrderStore()

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "upper" as "upper" | "lower" | "complete",
    color: "",
    stockCount: 0,
    description: "",
    bgColor: "#6b7280",
  })

  // Dashboard stats
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentOrders: 0,
  })

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        loadStats()
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, products, orders])

  useEffect(() => {
    loadStats()
  }, [products, orders])

  const loadStats = () => {
    const lowStock = products.filter((p) => p.stockCount < 10).length
    const revenue = getTotalRevenue()
    const recentOrdersCount = getRecentOrders(24).length // Orders in last 24 hours

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: new Set(orders.map((o) => o.customer.email)).size,
      totalRevenue: revenue,
      lowStockProducts: lowStock,
      recentOrders: recentOrdersCount,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      toast.error("Maximum 5 images allowed")
      return
    }

    setSelectedImages(files)

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreview(previews)
  }

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.color || selectedImages.length === 0) {
      toast.error("Please fill in all required fields and upload at least one image")
      return
    }

    setLoading(true)
    try {
      // TODO: Upload images to storage and get URLs
      // For now, using placeholder URLs
      const imageUrls = selectedImages.map(
        (_, index) =>
          `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(newProduct.name + " " + (index + 1))}`,
      )

      const productData: Product = {
        id: `product-${Date.now()}`,
        ...newProduct,
        image: imageUrls[0],
        images: imageUrls,
        colors: [newProduct.bgColor],
        inStock: newProduct.stockCount > 0,
        isLatest: true,
        type: newProduct.category as "upper" | "lower" | "complete",
        createdAt: new Date(),
        rating: 4.0 + Math.random() * 1, // Mock rating for demo
      }

      addProduct(productData)

      // Reset form
      setNewProduct({
        name: "",
        price: 0,
        category: "upper",
        color: "",
        stockCount: 0,
        description: "",
        bgColor: "#6b7280",
      })
      setSelectedImages([])
      setImagePreview([])

      toast.success("Product created successfully! It's now live on the website.")
    } catch (error) {
      console.error("Failed to create product:", error)
      toast.error("Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProduct = async (product: Product) => {
    try {
      updateProduct(product.id, product)
      setEditingProduct(null)
      toast.success("Product updated successfully! Changes are live.")
    } catch (error) {
      console.error("Failed to update product:", error)
      toast.error("Failed to update product")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This will remove it from the website immediately."))
      return

    try {
      deleteProduct(id)
      toast.success("Product deleted successfully!")
    } catch (error) {
      console.error("Failed to delete product:", error)
      toast.error("Failed to delete product")
    }
  }

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any)
    toast.success("Order status updated successfully!")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Real-time Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">TESSCH Admin Portal</h1>
              <p className="text-gray-600 text-lg">Real-time store management and analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className={`h-4 w-4 ${autoRefresh ? "text-green-500 animate-pulse" : "text-gray-400"}`} />
                <span>Live Updates</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={autoRefresh ? "bg-green-50 border-green-200" : ""}
                >
                  {autoRefresh ? "ON" : "OFF"}
                </Button>
              </div>
              <div className="text-xs text-gray-500">Last updated: {formatDate(lastUpdated)}</div>
            </div>
          </div>
        </div>

        {/* Real-time Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs opacity-80">Active inventory</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs opacity-80">All time orders</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs opacity-80">Unique customers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs opacity-80">Total earnings</p>
            </CardContent>
          </Card>

          <Card
            className={`${stats.lowStockProducts > 0 ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-gray-500 to-gray-600"} text-white`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.lowStockProducts}</div>
              <p className="text-xs opacity-80">Items below 10</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
              <RefreshCw className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.recentOrders}</div>
              <p className="text-xs opacity-80">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Products ({products.length})
            </TabsTrigger>
            <TabsTrigger
              value="add-product"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Add Product
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="h-6 w-6 text-blue-600" />
                  Live Product Inventory
                </CardTitle>
                <CardDescription>Real-time product management with live stock updates</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {products.map((product) => (
                    <Card key={product.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">
                                  {product.color} {product.name}
                                </h3>
                                {product.isLatest && <Badge className="bg-green-100 text-green-800 text-xs">NEW</Badge>}
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                                  ></div>
                                  <span className="text-xs text-gray-500">
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                              <div className="flex items-center gap-4">
                                <Badge
                                  variant={
                                    product.category === "upper"
                                      ? "default"
                                      : product.category === "lower"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="capitalize"
                                >
                                  {product.category}
                                </Badge>
                                <span className="text-lg font-bold text-green-600">
                                  {formatCurrency(product.price)}
                                </span>
                                <Badge
                                  variant={product.stockCount < 10 ? "destructive" : "outline"}
                                  className={product.stockCount < 10 ? "animate-pulse" : ""}
                                >
                                  Stock: {product.stockCount}
                                </Badge>
                                {product.createdAt && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(product.createdAt)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plus className="h-6 w-6 text-green-600" />
                  Add New Product (Live Update)
                </CardTitle>
                <CardDescription>Create a new product that will instantly appear on the website</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Product Details */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold">
                          Product Name *
                        </Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Enter product name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="color" className="text-sm font-semibold">
                          Color *
                        </Label>
                        <Input
                          id="color"
                          value={newProduct.color}
                          onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                          placeholder="Enter color"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-sm font-semibold">
                          Price (₹) *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                          placeholder="0.00"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock" className="text-sm font-semibold">
                          Stock Count *
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stockCount}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, stockCount: Number.parseInt(e.target.value) })
                          }
                          placeholder="0"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="text-sm font-semibold">
                          Category *
                        </Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value: "upper" | "lower" | "complete") =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upper">Upper</SelectItem>
                            <SelectItem value="lower">Lower/Sole</SelectItem>
                            <SelectItem value="complete">Complete Shoe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bgColor" className="text-sm font-semibold">
                          Background Color
                        </Label>
                        <Input
                          id="bgColor"
                          type="color"
                          value={newProduct.bgColor}
                          onChange={(e) => setNewProduct({ ...newProduct, bgColor: e.target.value })}
                          className="mt-1 h-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-semibold">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Enter product description"
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-semibold">Product Images * (Max 5)</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {imagePreview.length > 0 && (
                      <div>
                        <Label className="text-sm font-semibold">Preview</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Badge className="absolute top-2 right-2 bg-blue-500">{index + 1}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCreateProduct}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Creating & Publishing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Product (Live Update)
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                  Real-time Order Management
                </CardTitle>
                <CardDescription>Live order tracking with instant updates from customer purchases</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No orders yet</h3>
                      <p className="text-gray-500">
                        Orders will appear here in real-time when customers make purchases
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <Card key={order.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Order Info */}
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">Order {order.id}</h3>
                                <Badge
                                  variant={
                                    order.status === "delivered"
                                      ? "default"
                                      : order.status === "shipped"
                                        ? "secondary"
                                        : order.status === "processing"
                                          ? "outline"
                                          : "destructive"
                                  }
                                  className="text-sm"
                                >
                                  {order.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  {formatDate(order.createdAt)}
                                </p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(order.total)}</p>
                              </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                              <h4 className="font-semibold mb-3 text-gray-700">Customer Details</h4>
                              <div className="space-y-2 text-sm">
                                <p className="font-medium">{order.customer.name}</p>
                                <p className="flex items-center gap-2 text-gray-600">
                                  <Mail className="h-4 w-4" />
                                  {order.customer.email}
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                  <Phone className="h-4 w-4" />
                                  {order.customer.phone}
                                </p>
                                <p className="flex items-start gap-2 text-gray-600">
                                  <MapPin className="h-4 w-4 mt-0.5" />
                                  <span>
                                    {order.customer.address}
                                    <br />
                                    {order.customer.city} - {order.customer.pincode}
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold mb-3 text-gray-700">Order Items</h4>
                              <div className="space-y-3">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">
                                        {item.color} {item.name}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        Size: {item.size} | Qty: {item.quantity}
                                      </p>
                                      <p className="text-sm font-semibold text-green-600">
                                        {formatCurrency(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Status Update */}
                          <div className="mt-6 pt-4 border-t flex items-center justify-between">
                            <div className="text-sm text-gray-600">Last updated: {formatDate(order.updatedAt)}</div>
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Live Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{formatCurrency(stats.totalRevenue)}</div>
                    <p className="text-gray-600">Total Revenue</p>
                    <div className="mt-4 text-sm text-gray-500">
                      Average order value: {formatCurrency(stats.totalRevenue / (stats.totalOrders || 1))}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">Recent orders (24h): {stats.recentOrders}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Live Inventory Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Products</span>
                      <Badge variant="outline">{stats.totalProducts}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>In Stock</span>
                      <Badge className="bg-green-100 text-green-800">{products.filter((p) => p.inStock).length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Low Stock</span>
                      <Badge variant="destructive">{stats.lowStockProducts}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Latest Products</span>
                      <Badge className="bg-blue-100 text-blue-800">{products.filter((p) => p.isLatest).length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Out of Stock</span>
                      <Badge variant="secondary">{products.filter((p) => !p.inStock).length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Edit Product (Live Update)</CardTitle>
                <CardDescription>Changes will be reflected immediately on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-color">Color</Label>
                    <Input
                      id="edit-color"
                      value={editingProduct.color || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Price (₹)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-stock">Stock Count</Label>
                    <Input
                      id="edit-stock"
                      type="number"
                      value={editingProduct.stockCount}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stockCount: Number.parseInt(e.target.value),
                          inStock: Number.parseInt(e.target.value) > 0,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdateProduct(editingProduct)} className="flex-1">
                    Save Changes (Live Update)
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProduct(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
