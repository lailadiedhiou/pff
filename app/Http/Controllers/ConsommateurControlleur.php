<?php

use App\Models\Consommateur;
use Illuminate\Http\Request;

namespace App\Http\Controllers;


class ConsommateurControlleur extends Controller
{
    // Ajouter au panier
    public function ajouter_panier(Request $request)
    {
        // Logique pour ajouter au panier
        return response()->json(['message' => 'Produit ajouté au panier'], 200);
    }

    // Passer commande
    public function passer_commande(Request $request)
    {
        // Logique pour passer commande
        return response()->json(['message' => 'Commande passée avec succès'], 200);
    }

    // Laisser une évaluation
    public function laisser_evaluation(Request $request)
    {
        $request->validate([
            'evaluation' => 'required|string|max:255',
        ]);

        // Logique pour enregistrer l'évaluation
        return response()->json(['message' => 'Évaluation laissée avec succès'], 200);
    }
}
