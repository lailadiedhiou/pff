export const getProducts = async () => {
    // Remplacer par l'appel réel à l'API
    return [
      { id: 1, name: 'Tomates', price: 5 },
      { id: 2, name: 'Pommes de terre', price: 3 }
    ];
  };
  
  export const getProductById = async (id) => {
    // Remplacer par l'appel réel à l'API
    return { id, name: 'Tomates', price: 5, description: 'Des tomates fraîches' };
  };
  