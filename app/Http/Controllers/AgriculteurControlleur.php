<?php
namespace App\Http\Controllers;

use App\Models\Agriculteur;
use Illuminate\Http\Request;

class AgriculteurControlleur extends Controller
{
    // Ajouter un agriculteur
    public function ajouter(Request $request)
    {
        $agriculteur = Agriculteur::create($request->all());
        return response()->json($agriculteur, 201);
    }

    // Modifier un agriculteur
    public function modifier(Request $request, $id)
    {
        $agriculteur = Agriculteur::find($id);

        if (!$agriculteur) {
            return response()->json(['message' => 'Agriculteur non trouvé'], 404);
        }

        $agriculteur->update($request->all());
        return response()->json($agriculteur, 200);
    }

    // Consulter les commandes d'un agriculteur (relation hypothétique)
    public function consulter_commande($id)
    {
        // Assumer qu'il y a une relation entre agriculteur et commande
        $agriculteur = Agriculteur::find($id);

        if (!$agriculteur) {
            return response()->json(['message' => 'Agriculteur non trouvé'], 404);
        }

        $commandes = $agriculteur->commandes; // Relation à définir
        return response()->json($commandes, 200);
    }
}
