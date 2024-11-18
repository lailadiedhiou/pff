<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Enregistrement d'un nouvel utilisateur
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:agriculteur,commercant,consommateur,administrateur',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        auth()->login($user);

        return response()->json([
            'message' => 'Utilisateur enregistré avec succès',
            'user' => $user,
        ], 201);
    }

    // Connexion d'un utilisateur
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;

            return response()->json([
                'message' => 'Connexion réussie',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        return response()->json(['error' => 'Identifiants invalides.'], 400);
    }

    // Obtenir la liste de tous les utilisateurs (accessible uniquement pour l'administrateur)
    public function getAllUsers()
    {
        /*if (Auth::user()->role !== 'administrateur') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }*/

        $users = User::all();
        return response()->json($users);
    }

    // Obtenir l'utilisateur authentifié
    public function getAuthenticatedUser()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['error' => 'Aucun utilisateur authentifié'], 401);
        }
    }

    // Mettre à jour le profil de l'utilisateur actuel (admin ou utilisateur)
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
        ]);

        $user = Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json(['message' => 'Profil mis à jour avec succès', 'user' => $user]);
    }

    // Supprimer un utilisateur (accessible uniquement pour l'administrateur)
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        /*if (Auth::user()->role !== 'administrateur') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }*/

        if ($user->role === 'administrateur') {
            return response()->json(['message' => 'Impossible de supprimer un administrateur'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
