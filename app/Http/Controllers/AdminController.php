<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    // Liste tous les utilisateurs
    public function index()
    {
        $this->authorize('isAdmin', Auth::user()); // Vérifier si l'utilisateur est admin

        $users = User::all();
        return response()->json($users);
    }

    // Supprime un utilisateur par ID
    public function deleteUser($id)
    {
        $this->authorize('isAdmin', Auth::user());

        $user = User::findOrFail($id);
        
        if ($user->role === 'administrateur') {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer un administrateur.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
    }

    // Modération des évaluations (à ajuster selon votre structure d'évaluation)
    public function moderateEvaluation($evaluationId)
    {
        $this->authorize('isAdmin', Auth::user());

        // Logique de modération (ex. approbation, suppression) selon le modèle d'évaluation
        // Exemple : $evaluation = Evaluation::findOrFail($evaluationId);
        // $evaluation->status = 'approuvé';
        // $evaluation->save();

        return response()->json(['message' => 'Évaluation modérée avec succès.']);
    }
}
