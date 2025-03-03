export const getAllCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return await res.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };
  
  export const getProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}/products`
      ); 
      if (!res.ok) throw new Error("Failed to fetch products");
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  export const getCategoryById = async (categoryId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`);
  
      if (!res.ok) throw new Error("Failed to fetch category");
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  };
  
  