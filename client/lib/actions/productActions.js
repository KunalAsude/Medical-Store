export const getAllProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products${queryString}`);
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