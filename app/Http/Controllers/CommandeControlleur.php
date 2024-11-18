<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{
    // Récupérer toutes les commandes pour l'administrateur
    public function index()
    {
        $this->authorize('viewAny', Commande::class); // Autoriser l'accès pour les administrateurs
        $commandes = Commande::with(['fermier', 'consommateur', 'produit'])->get();

        return response()->json($commandes);
    }

    // Récupérer les commandes spécifiques au fermier connecté
    public function commandesFermier()
    {
        $fermierId = Auth::id(); // ID de l'utilisateur authentifié (supposé être un fermier)
        $commandes = Commande::where('fermier_id', $fermierId)->with(['consommateur', 'produit'])->get();

        return response()->json($commandes);
    }

    // Récupérer les commandes d'un consommateur spécifique (pour le consommateur connecté)
    public function commandesConsommateur()
    {
        $consommateurId = Auth::id(); // ID de l'utilisateur authentifié (supposé être un consommateur)
        $commandes = Commande::where('consommateur_id', $consommateurId)->with(['fermier', 'produit'])->get();

        return response()->json($commandes);
    }

    // Créer une nouvelle commande
    public function creerCommande(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1',
        ]);

        $commande = Commande::create([
            'consommateur_id' => Auth::id(),
            'produit_id' => $request->produit_id,
            'quantite' => $request->quantite,
            'statut' => 'en attente', // Statut initial de la commande
        ]);

        return response()->json(['message' => 'Commande créée avec succès', 'commande' => $commande], 201);
    }

    // Mettre à jour une commande (pour le fermier ou l'administrateur)
    public function mettreAJourCommande(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);

        $this->authorize('update', $commande); // Vérifie l'autorisation pour le fermier ou l'administrateur

        $request->validate([
            'statut' => 'required|string',
        ]);

        $commande->statut = $request->statut;
        $commande->save();

        return response()->json(['message' => 'Commande mise à jour avec succès', 'commande' => $commande]);
    }

    // Supprimer une commande (pour le fermier ou l'administrateur)
    public function supprimerCommande($id)
    {
        $commande = Commande::findOrFail($id);

        $this->authorize('delete', $commande); // Vérifie l'autorisation pour le fermier ou l'administrateur

        $commande->delete();

        return response()->json(['message' => 'Commande supprimée avec succès']);
    }
}
