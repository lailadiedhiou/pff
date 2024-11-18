<?php
use App\Models\Commercant;
use Illuminate\Http\Request;
namespace App\Http\Controllers;

class CommercantControlleur extends Controller
{
    // Acheter en gros
    public function acheter_en_gros(Request $request)
    {
        // Logique pour acheter en gros
        return response()->json(['message' => 'Achat en gros effectué avec succès'], 200);
    }

    // Gérer stock
    public function gerer_stock(Request $request)
    {
        // Logique pour gérer le stock
        return response()->json(['message' => 'Stock mis à jour avec succès'], 200);
    }
}
