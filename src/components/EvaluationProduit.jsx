import React, { useState, useEffect } from 'react';
import './EvaluationProduit.css';

const EvaluationProduit = () => {
    const [evaluations, setEvaluations] = useState([]); // Initialisation en tableau vide
    const [note, setNote] = useState(0);
    const [commentaire, setCommentaire] = useState('');

    // Récupération des évaluations depuis l'API
    useEffect(() => {
        fetch('http://localhost:8000/api/evaluations')
            .then((response) => response.json())
            .then((data) => {
                setEvaluations(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Erreur de récupération des évaluations :", error));
    }, []);
    

    // Fonction pour soumettre une évaluation
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Objet évaluation
        const nouvelleEvaluation = {
            note,
            commentaire,
            date: new Date().toISOString().split('T')[0], // Format date AAAA-MM-JJ
        };

        // Envoi des données au backend
        fetch('/api/evaluations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouvelleEvaluation),
        })
            .then((response) => response.json())
            .then((data) => {
                // Ajout de la nouvelle évaluation au tableau des évaluations
                setEvaluations((prevEvaluations) => [...prevEvaluations, data]);
                setNote(0);
                setCommentaire('');
            })
            .catch((error) => console.error("Erreur lors de l'ajout de l'évaluation :", error));
    };

    return (
        <div className="evaluation-produit">
            <h2>Évaluations</h2>
            {Array.isArray(evaluations) && evaluations.length > 0 ? (
                evaluations.map((evaluation, index) => (
                    <div key={index} className="evaluation">
                        <p>Note : {evaluation.note}</p>
                        <p>Commentaire : {evaluation.commentaire}</p>
                        <p>Date : {evaluation.date}</p>
                    </div>
                ))
            ) : (
                <p>Aucune évaluation disponible.</p>
            )}

            <div className="soumettre-evaluation">
                <h3>Soumettre une évaluation</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Note :
                        <select value={note} onChange={(e) => setNote(Number(e.target.value))}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <label>
                        Commentaire :
                        <textarea
                            value={commentaire}
                            onChange={(e) => setCommentaire(e.target.value)}
                            placeholder="Votre commentaire"
                        />
                    </label>
                    <button type="submit">Envoyer l'évaluation</button>
                </form>
            </div>
        </div>
    );
};

export default EvaluationProduit;
