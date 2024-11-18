import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MarketPage.css';
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext'; // Importer AuthContext

function MarketPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext); // Utiliser AuthContext pour l'authentification
  const navigate = useNavigate();

  const categories = [
    'Céréales', 'Légumineuses', 'Fruits', 'Légumes',
    'Cultures industrielles', 'Racines et Tubercules', 
    'Cultures spécifiques à l\'exportation',
  ];

  const handleAddToCart = (product) => {
    console.log("Utilisateur authentifié ?", isAuthenticated);
    /*if (!isAuthenticated) {
      navigate('/login'); // Redirige immédiatement vers la page de connexion
      return;
    }*/
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    addToCart(productWithQuantity);
    
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() === '') {
      filterProducts(selectedCategories);
      return;
    }
    const filtered = products.filter(product =>
      product.nom.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const resetSearch = () => {
    setKeyword('');
    filterProducts(selectedCategories);
  };

  const handleCategoryChange = (category) => {
    const normalizedCategory = category.toLowerCase();
    const updatedCategories = selectedCategories.includes(normalizedCategory)
      ? selectedCategories.filter(cat => cat !== normalizedCategory)
      : [...selectedCategories, normalizedCategory];
    
    setSelectedCategories(updatedCategories);
    filterProducts(updatedCategories);
  };

  const filterProducts = (categories) => {
    if (categories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        categories.includes(product.categories.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/produits')
      .then((response) => response.json())
      .then((data) => {
        const initializedData = data.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setProducts(initializedData);
        setFilteredProducts(initializedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des produits:', err);
        setError('Une erreur est survenue lors du chargement des produits');
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (id, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: value } : product
      )
    );
    setFilteredProducts((prevFiltered) =>
      prevFiltered.map((product) =>
        product.id === id ? { ...product, quantity: value } : product
      )
    );
  };

  if (loading) return <div>Chargement des produits...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <main>
        <div className="jumb">
          <div className="container">
            <div className="text1">
              <h3>Commandez vos <br />produits agricoles</h3>
            </div>
            <form className='search-container' onSubmit={handleSearch}>
              <img src="src/images/search_24px.png" alt="" />
              <input
                type="text"
                value={keyword}
                placeholder='Rechercher un produit...'
                className='search-bar'
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type='submit' className='search-button'>Rechercher</button>
              <button type="button" onClick={resetSearch} className='reset-button'>Réinitialiser</button>
            </form>
          </div>
        </div>

        <div className="produits-title">
          <h4>Notre Marché Agricole En Ligne</h4>
        </div>

        <div className="contenu">
          <div className="container">
            <h5>Trier par catégories</h5>
            <div className="horizontal-line"></div>
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.length === 0} 
                  onChange={() => {
                    setSelectedCategories([]);
                    setFilteredProducts(products);
                  }} 
                /> 
                Toutes les catégories
              </label>
              {categories.map((category, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="produits">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="heart-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <img
                    src={`http://localhost:8000/uploads/produits/${product.photos}`}
                    alt={product.nom}
                    className="product-image"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
                    onClick={() => navigate(`/product/${product.id}`)} 
                  />
                  <div className="product-info">
                    <h3>{product.nom}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Prix: {product.prix} FCFA</p>
                    <div className="quantity-container">
                      <div className="quantity-wrapper">
                        <button
                          className="quantity-btn minus"
                          onClick={() =>
                            handleQuantityChange(product.id, Math.max((product.quantity || 1) - 1, 1))
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={product.quantity || 1}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(product.id, parseInt(e.target.value, 10))
                          }
                        />
                        <button
                          className="quantity-btn plus"
                          onClick={() =>
                            handleQuantityChange(product.id, (product.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                        Ajout panier
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun produit disponible pour le moment.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MarketPage;
