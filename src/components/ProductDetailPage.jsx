import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetailsPage = ({ user }) => {
    const [product, setProduct] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [note, setNote] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingEvaluations, setLoadingEvaluations] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();

    // Utilisateur fictif pour tester l'affichage du formulaire (à enlever en production)
    user = user || { role: 'consommateur' };

    // Fetch product details
    const fetchProduct = async () => {
        setError(null); // Reset error before new fetch attempt
        try {
            setLoadingProduct(true);
            const res = await fetch(`http://localhost:8000/api/produits/${params.id}`);
            if (!res.ok) throw new Error("Erreur de récupération du produit");
            const result = await res.json();
            setProduct(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingProduct(false);
        }
    };

    // Fetch product evaluations
    const fetchEvaluations = async () => {
        setError(null); // Reset error before new fetch attempt
        try {
            setLoadingEvaluations(true);
            const res = await fetch(`http://localhost:8000/api/produits/${params.id}/evaluations`);
            if (!res.ok) throw new Error("Erreur de récupération des évaluations");
            const result = await res.json();
            setEvaluations(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingEvaluations(false);
        }
    };

    // Submit a new evaluation
    const submitEvaluation = async (e) => {
        e.preventDefault();
        try {
            setError(null); // Reset error before submitting
            const evaluationData = { note, commentaire, produit_id: params.id };
            const res = await fetch('http://localhost:8000/api/evaluations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evaluationData),
            });

            if (res.ok) {
                setNote('');
                setCommentaire('');
                fetchEvaluations(); // Refresh evaluations
            } else {
                const errorResponse = await res.json();
                setError(errorResponse.message || "Erreur lors de la soumission de l'évaluation");
            }
        } catch (error) {
            setError("Erreur lors de la soumission de l'évaluation");
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchEvaluations();
    }, [params.id]);

    if (loadingProduct) return <div>Chargement des détails du produit...</div>;

    return (
        <div className='container'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>{product ? product.nom : 'Produit introuvable'}</h2>
                <Link to='/market' className='btn btn-dark'>Retour aux produits</Link>
            </div>
            
            {error && <p className="text-danger">{error}</p>}

            {product && (
                <div className='row'>
                    <div className='col-md-12'>
                        {product.photos && (
                            <img className='w-50' src={`http://localhost:8000/uploads/produits/${product.photos}`} alt={product.nom} />
                        )}
                        <p>Prix: <strong>{product.prix} FCFA</strong></p>
                        <p>Description: {product.description}</p> 
                    </div>
                </div>
            )}

            {/* Evaluations Section */}
            <div className='evaluation-produit mt-5'>
                <h3>Évaluations</h3>
                {loadingEvaluations ? (
                    <p>Chargement des évaluations...</p>
                ) : evaluations.length > 0 ? (
                    evaluations.map((evaluation) => (
                        <div key={evaluation.id} className="evaluation">
                            <p><strong>Note:</strong> {evaluation.note} / 5</p>
                            <p><strong>Commentaire:</strong> {evaluation.commentaire}</p>
                            <p><strong>Par:</strong> {evaluation.consommateur ? evaluation.consommateur.nom : 'Anonyme'}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucune évaluation pour ce produit.</p>
                )}
            </div>

            {/* Evaluation Form */}
            {user && (
                <div className="soumettre-evaluation mt-4">
                    <h4>Donnez votre avis</h4>
                    <form onSubmit={submitEvaluation}>
                        <div>
                            <label>Note :</label>
                            <select value={note} onChange={(e) => setNote(e.target.value)} required>
                                <option value="">Sélectionnez une note</option>
                                <option value="1">1 - Très mauvais</option>
                                <option value="2">2 - Mauvais</option>
                                <option value="3">3 - Moyen</option>
                                <option value="4">4 - Bon</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>
                        <div className="mt-2">
                            <label>Commentaire :</label>
                            <textarea
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Soumettre l'évaluation</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
