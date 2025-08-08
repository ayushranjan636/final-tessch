"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { User, MapPin, Package, Heart, Edit, Plus, Trash2 } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"
import { getAuthToken } from "@/utils/auth" // Declare or import the getAuthToken function

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  joinDate: string
}

interface Address {
  id: string
  type: "shipping" | "billing"
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: Array<{
    id: string
    name: string
    size: string
    quantity: number
    price: number
    image: string
  }>
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    type: "shipping",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    isDefault: false,
  })

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    setLoading(true)
    try {
      await Promise.all([loadProfile(), loadAddresses(), loadOrders()])
    } catch (error) {
      console.error("Failed to load profile data:", error)
      toast.error("Failed to load profile data")
    } finally {
      setLoading(false)
    }
  }

  const loadProfile = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      const userData = await response.json()
      setProfile(userData)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const loadAddresses = async () => {
    try {
      const response = await fetch("/api/user/addresses", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      const addressData = await response.json()
      setAddresses(addressData)
    } catch (error) {
      console.error("Error fetching addresses:", error)
    }
  }

  const loadOrders = async () => {
    try {
      const response = await fetch("/api/user/orders", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      const orderData = await response.json()
      setOrders(orderData)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const handleUpdateProfile = async () => {
    if (!profile) return

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(profile),
      })
      const data = await response.json()

      setEditingProfile(false)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile")
    }
  }

  const handleAddAddress = async () => {
    if (!newAddress.firstName || !newAddress.address || !newAddress.city) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(newAddress),
      })
      const data = await response.json()

      setAddresses([...addresses, data])
      setNewAddress({
        type: "shipping",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        isDefault: false,
      })

      toast.success("Address added successfully")
    } catch (error) {
      console.error("Failed to add address:", error)
      toast.error("Failed to add address")
    }
  }

  const handleUpdateAddress = async (address: Address) => {
    try {
      const response = await fetch(`/api/user/addresses/${address.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(address),
      })

      setAddresses(addresses.map((a) => (a.id === address.id ? address : a)))
      setEditingAddress(null)
      toast.success("Address updated successfully")
    } catch (error) {
      console.error("Failed to update address:", error)
      toast.error("Failed to update address")
    }
  }

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return

    try {
      const response = await fetch(`/api/user/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })

      setAddresses(addresses.filter((a) => a.id !== id))
      toast.success("Address deleted successfully")
    } catch (error) {
      console.error("Failed to delete address:", error)
      toast.error("Failed to delete address")
    }
  }

  const handleReorder = async (order: Order) => {
    try {
      const response = await fetch(`/api/orders/${order.id}/reorder`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })

      toast.success("Items added to cart for reorder")
    } catch (error) {
      console.error("Failed to reorder:", error)
      toast.error("Failed to reorder")
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, addresses, and orders</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setEditingProfile(!editingProfile)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {editingProfile ? "Cancel" : "Edit"}
                  </Button>
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      disabled={!editingProfile}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>

                <div>
                  <Label>Member Since</Label>
                  <p className="text-sm text-gray-600 mt-1">{new Date(profile.joinDate).toLocaleDateString()}</p>
                </div>

                {editingProfile && <Button onClick={handleUpdateProfile}>Save Changes</Button>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            {/* Add New Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newFirstName">First Name</Label>
                    <Input
                      id="newFirstName"
                      value={newAddress.firstName}
                      onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newLastName">Last Name</Label>
                    <Input
                      id="newLastName"
                      value={newAddress.lastName}
                      onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="newAddress">Street Address</Label>
                  <Input
                    id="newAddress"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="newCity">City</Label>
                    <Input
                      id="newCity"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newState">State</Label>
                    <Input
                      id="newState"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newZipCode">ZIP Code</Label>
                    <Input
                      id="newZipCode"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddAddress}>Add Address</Button>
              </CardContent>
            </Card>

            {/* Existing Addresses */}
            <div className="space-y-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {address.type === "shipping" ? "Shipping" : "Billing"} Address
                        {address.isDefault && (
                          <Badge variant="secondary" className="ml-2">
                            Default
                          </Badge>
                        )}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingAddress(address)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAddress(address.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p>
                        {address.firstName} {address.lastName}
                      </p>
                      <p>{address.address}</p>
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order History
                </CardTitle>
                <CardDescription>View and manage your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Size: {item.size} | Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleReorder(order)}>
                          Reorder
                        </Button>
                        {order.status === "shipped" && (
                          <Button variant="outline" size="sm">
                            Track Package
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  My Wishlist
                </CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Your wishlist is empty. Start adding items you love!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Address Modal */}
        {editingAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Edit Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editFirstName">First Name</Label>
                    <Input
                      id="editFirstName"
                      value={editingAddress.firstName}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editLastName">Last Name</Label>
                    <Input
                      id="editLastName"
                      value={editingAddress.lastName}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editAddress">Street Address</Label>
                  <Input
                    id="editAddress"
                    value={editingAddress.address}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="editCity">City</Label>
                    <Input
                      id="editCity"
                      value={editingAddress.city}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editState">State</Label>
                    <Input
                      id="editState"
                      value={editingAddress.state}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editZipCode">ZIP Code</Label>
                    <Input
                      id="editZipCode"
                      value={editingAddress.zipCode}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleUpdateAddress(editingAddress)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingAddress(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
