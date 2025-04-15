
import Payment from "./Payment";
import { ArrowLeft, Search, ShoppingCart, Filter, Star, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  dosage: string;
  rating: number;
  inStock: boolean;
}

export default function EPharm() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { items, addItem, removeItem, updateQuantity, total } = useCartStore();

  const categories = [
    "All",
    "Prescription",
    "Over-the-Counter",
    "Vitamins",
    "Personal Care",
    "First Aid"
  ];

  const medicines: Medicine[] = [
    {
      id: "med1",
      name: "Paracetamol 500mg",
      category: "Over-the-Counter",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3",
      description: "Pain reliever and fever reducer",
      dosage: "1-2 tablets every 4-6 hours",
      rating: 4.5,
      inStock: true
    },
    {
      id: "med2",
      name: "Vitamin C 1000mg",
      category: "Vitamins",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3",
      description: "Supports immune system health",
      dosage: "1 tablet daily",
      rating: 4.8,
      inStock: true
    },
    {
      id: "med3",
      name: "First Aid Kit",
      category: "First Aid",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3",
      description: "Complete emergency kit",
      dosage: "N/A",
      rating: 4.7,
      inStock: true
    },
    {
      id: "med4",
      name: "Allergy Relief",
      category: "Over-the-Counter",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3",
      description: "24-hour allergy relief",
      dosage: "1 tablet daily",
      rating: 4.3,
      inStock: true
    },
    {
      id: "med5",
      name: "Multivitamin",
      category: "Vitamins",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3",
      description: "Daily essential vitamins",
      dosage: "1 tablet daily",
      rating: 4.6,
      inStock: true
    },
    {
      id: "med6",
      name: "Bandages",
      category: "First Aid",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3",
      description: "Sterile adhesive bandages",
      dosage: "N/A",
      rating: 4.4,
      inStock: true
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory.toLowerCase() === "all" || 
                          medicine.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f9ff] to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-[#1e4d8c]"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-[#1e4d8c]">Online Pharmacy</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="text-[#1e4d8c]">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart ({items.length})</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                {items.length === 0 ? (
                  <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">Rs.{total.toFixed(2)}</span>
                      </div>
                        <Payment total={total.toFixed(2)} />
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search medicines..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="text-[#1e4d8c]">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category.toLowerCase()
                    ? "bg-[#1e4d8c] text-white"
                    : "text-[#1e4d8c]"
                }`}
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#1e4d8c] font-medium">{medicine.category}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{medicine.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{medicine.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{medicine.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-[#1e4d8c]">${medicine.price}</span>
                  <span className="text-sm text-gray-500">{medicine.dosage}</span>
                </div>
                <Button 
                  className="w-full bg-[#1e4d8c] hover:bg-[#153661] text-white"
                  onClick={() => addItem({
                    id: medicine.id,
                    name: medicine.name,
                    price: medicine.price,
                    image: medicine.image
                  })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}