// This file would normally contain API calls to fetch products from your backend

// Mock function to simulate fetching products from an API
async function fetchProducts() {
    // In a real application, this would be an API call
    return [
      {
        id: 1,
        name: "Advanced Pain Relief Tablets",
        price: 9.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Pain Relief",
        description: "Fast-acting pain relief tablets for headaches, muscle pain, and minor arthritis pain.",
        stock: 45,
      },
      {
        id: 2,
        name: "Digital Blood Pressure Monitor",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Devices",
        description: "Accurate and easy-to-use digital blood pressure monitor for home use.",
        stock: 18,
      },
      {
        id: 3,
        name: "Cold & Flu Relief Syrup",
        price: 12.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Cold & Flu",
        description: "Relieves symptoms of cold and flu including cough, congestion, and sore throat.",
        stock: 32,
      },
      {
        id: 4,
        name: "Daily Multivitamin Tablets",
        price: 15.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Vitamins",
        description: "Complete daily multivitamin with essential nutrients for overall health.",
        stock: 56,
      },
      {
        id: 5,
        name: "Digital Thermometer",
        price: 19.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Devices",
        description: "Fast and accurate digital thermometer for temperature readings.",
        stock: 24,
      },
      {
        id: 6,
        name: "Allergy Relief Tablets",
        price: 8.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Allergy",
        description: "Non-drowsy allergy relief for seasonal allergies and hay fever.",
        stock: 38,
      },
      {
        id: 7,
        name: "First Aid Kit",
        price: 24.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "First Aid",
        description: "Comprehensive first aid kit for home, office, or travel.",
        stock: 42,
      },
      {
        id: 8,
        name: "Glucose Monitor",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "Devices",
        description: "Easy-to-use glucose monitor for diabetes management.",
        stock: 15,
      },
    ];
  }
  
  // Mock function to fetch a single product by ID
  async function fetchProductById(id) {
    const products = await fetchProducts();
    return products.find((product) => product.id === id) || null;
  }
  
  // Mock function to fetch products by category
  async function fetchProductsByCategory(category) {
    const products = await fetchProducts();
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  }
  
  // Export functions for use in other modules
  export { fetchProducts, fetchProductById, fetchProductsByCategory };
  