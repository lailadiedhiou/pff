// src/components/AddProductForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AddProductForm.css';

const AddProductForm = () => {
    const [produits, setProduits] = useState([]);
    const [nouveauProduit, setNouveauProduit] = useState({
        nom: '',
        description: '',
        prix: '',
        stock: '',
        categories: ''
    });
    const [image, setImage] = useState(null);
    const [editing, setEditing] = useState(false);
    const [currentProduitId, setCurrentProduitId] = useState(null);
    const [showDetails, setShowDetails] = useState(null);
    const [error, setError] = useState(null);
    const imageInputRef = useRef(null); // Créer une référence pour l'input d'image

    useEffect(() => {
        fetchProduits();
    }, []);

    const fetchProduits = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/produits');
            const data = await response.json();
            setProduits(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des produits :", err);
            setError("Erreur lors de la récupération des produits.");
        }
    };

    const handleInputChange = (e) => {
        setNouveauProduit({ ...nouveauProduit, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nouveauProduit.nom);
        formData.append('description', nouveauProduit.description);
        formData.append('prix', nouveauProduit.prix);
        formData.append('stock', nouveauProduit.stock);
        formData.append('categories', nouveauProduit.categories);
        
        if (image) {
            formData.append('photos', image);
        }

        try {
            if (editing) {
                await updateProduit(currentProduitId, formData);
            } else {
                await ajouterProduit(formData);
            }

            resetForm();
            fetchProduits();
        } catch (err) {
            console.error("Erreur lors de l'ajout du produit :", err);
            setError("Erreur lors de l'ajout du produit.");
        }
    };

    const ajouterProduit = async (formData) => {
        const response = await fetch('http://localhost:8000/api/produits', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout du produit');
        }
        setProduits([...produits, data.data]);
    };

    const updateProduit = async (id, formData) => {
        const response = await fetch(`http://localhost:8000/api/produits/${id}`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erreur lors de la mise à jour du produit');
        }

        const updatedList = produits.map((produit) =>
            produit.id === id ? data.data : produit
        );
        setProduits(updatedList);
    };

    const deleteProduit = async (id) => {
        await fetch(`http://localhost:8000/api/produits/${id}`, {
            method: 'DELETE',
        });
        setProduits(produits.filter((produit) => produit.id !== id));
    };

    const handleEdit = (produit) => {
        setEditing(true);
        setCurrentProduitId(produit.id);
        setNouveauProduit({ 
            nom: produit.nom,
            description: produit.description,
            prix: produit.prix,
            stock: produit.stock,
            categories: produit.categories,
        });
        setImage(null);
    };

    const resetForm = () => {
        setNouveauProduit({ nom: '', description: '', prix: '', stock: '', categories: '' });
        setImage(null);
        setEditing(false);
        setCurrentProduitId(null);
        setError(null);
        
        // Réinitialiser l'input d'image
        if (imageInputRef.current) {
            imageInputRef.current.value = ''; // Réinitialiser la valeur de l'input d'image
        }
    };

    const toggleDetails = (id) => {
        setShowDetails(showDetails === id ? null : id);
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <section className="content animate-fade-in">
                <h2>Ajouter un nouveau produit</h2>
                <form className="add-product-form" id="add-product-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nom">Nom du produit</label>
                        <input 
                            type="text" 
                            id="nom" 
                            name="nom" 
                            value={nouveauProduit.nom}
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="categories">Catégorie</label>
                        <select 
                            id="categories" 
                            name="categories"
                            value={nouveauProduit.categories} 
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Choisir une catégorie</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Légumes">Légumes</option>
                            <option value="Légumineuses">Légumineuses</option>
                            <option value="Céréales">Céréales</option>
                            <option value="Cultures industrielles">Cultures industrielles</option>
                            <option value="Racines et Tubercules">Racines et Tubercules</option>
                            <option value="Cultures spécifiques à l'exportation">Cultures spécifiques à l'exportation</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="prix">Prix (€/kg ou €/unité)</label>
                        <input 
                            type="number" 
                            id="prix" 
                            name="prix"
                            step="0.01" 
                            value={nouveauProduit.prix}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="stock">Quantité disponible</label>
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock"
                            value={nouveauProduit.stock}
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="4" 
                            value={nouveauProduit.description}
                            onChange={handleInputChange} 
                            required
                        ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="image">Image du produit</label>
                        <input 
                            type="file" 
                            id="image" 
                            name="photos" // Garder le nom pour correspondre à la logique
                            ref={imageInputRef} // Ajouter la référence ici
                            onChange={handleImageChange} 
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn">Ajouter le produit</button>
                </form>
            </section>
        </div>
    );
};

export default AddProductForm;
