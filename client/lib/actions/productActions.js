export const getAllProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  };
  
  export const getSingleProduct = async (idOrSlug) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${idOrSlug}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return await res.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };
  