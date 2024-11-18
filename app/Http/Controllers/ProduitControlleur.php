<?php
namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProduitControlleur extends Controller
{
    // Retourne tous les produits
    public function index(Request $request)
    {
        $query = Produit::query();

        if ($request->filled('keyword')) {
            $query->where('nom', 'LIKE', "%{$request->keyword}%")
                  ->orWhere('description', 'LIKE', "%{$request->keyword}%");
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        $produits = $query->get();

        return response()->json($produits);
    }

    // Retourne un produit unique
    public function show($id)
    {
        $produit = Produit::find($id);

        if ($produit == null) {
            return response()->json([
                'status' => false,
                'message' => 'Produit non trouvé',
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $produit,
        ]);
    }

    // Crée un nouveau produit
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|min:3',
            'description' => 'nullable',
            'prix' => 'required|numeric',
            'stock' => 'required|numeric',
            'categories' => 'required',
            'photos' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Veuillez corriger les erreurs',
                'errors' => $validator->errors()
            ]);
        }

        $produit = new Produit();
        $produit->nom = $request->nom;
        $produit->description = $request->description;
        $produit->prix = $request->prix;
        $produit->stock = $request->stock;
        $produit->categories = $request->categories;

        if ($request->hasFile('photos')) {
            $photoName = time() . '-' . $produit->id . '.' . $request->photos->extension();
            $request->photos->move(public_path('uploads/produits'), $photoName);
            $produit->photos = $photoName;
        }

        try {
            $produit->save();
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Échec de l\'enregistrement du produit',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Produit ajouté avec succès.',
            'data' => $produit
        ]);
    }

    // Met à jour un produit existant
    public function update($id, Request $request)
    {
        $produit = Produit::find($id);

        if ($produit == null) {
            return response()->json([
                'status' => false,
                'message' => 'Produit non trouvé',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'required|min:3',
            'description' => 'nullable',
            'prix' => 'required|numeric',
            'stock' => 'required|numeric',
            'categories' => 'required',
            'photos' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Veuillez corriger les erreurs',
                'errors' => $validator->errors()
            ]);
        }

        $produit->nom = $request->nom;
        $produit->description = $request->description;
        $produit->prix = $request->prix;
        $produit->stock = $request->stock;
        $produit->categories = $request->categories;

        if ($request->hasFile('photos')) {
            // Supprimer l'ancienne photo si elle existe
            if ($produit->photos) {
                File::delete(public_path('storage/produits/' . $produit->photos));
            }

            $photoName = time() . '-' . $produit->id . '.' . $request->photos->extension();
            $request->photos->move(public_path('storage/produits'), $photoName);
            $produit->photos = $photoName;
        }

        try {
            $produit->save();
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Échec de la mise à jour du produit',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Produit mis à jour avec succès.',
            'data' => $produit
        ]);
    }

    // Supprime un produit
    public function destroy($id)
    {
        $produit = Produit::find($id);

        if ($produit == null) {
            return response()->json([
                'status' => false,
                'message' => 'Produit non trouvé',
            ]);
        }

        if ($produit->photos) {
            try {
                File::delete(public_path('storage/produits/' . $produit->photos));
            } catch (\Exception $e) {
                return response()->json([
                    'status' => false,
                    'message' => 'Échec de la suppression de la photo du produit',
                    'error' => $e->getMessage()
                ], 500);
            }
        }

        try {
            $produit->delete();
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Échec de la suppression du produit',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Produit supprimé avec succès.'
        ]);
    }
}
