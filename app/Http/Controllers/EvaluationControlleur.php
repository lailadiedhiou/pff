<?php
namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EvaluationControlleur extends Controller

{
    public function addEvaluation(Request $request, $produitId)
    {
        $user = Auth::user();

        // Vérifie que l'utilisateur est un consommateur
        if ($user->role !== 'consommateur') {
            return response()->json(['message' => 'Seuls les consommateurs peuvent laisser des évaluations'], 403);
        }

        $evaluation = new Evaluation();
        $evaluation->note = $request->note;
        $evaluation->commentaire = $request->commentaire;
        $evaluation->date = now();
        $evaluation->user_id = $user->id;
        $evaluation->produit_id = $produitId;
        $evaluation->save();

        return response()->json(['message' => 'Évaluation ajoutée avec succès', 'evaluation' => $evaluation]);
    }
    public function getEvaluations($id)
{
    try {
        $product = Produit::findOrFail($id); // Ensure product exists
        $evaluations = $product->evaluations()->with('consommateur')->get(); // Fetch evaluations with consommateur
        return response()->json($evaluations, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Erreur de récupération des évaluations'], 500);
    }
}

}
