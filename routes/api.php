<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');


/*Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/users', [UserController::class, 'getAllUsers'])->name('admin.users');
        Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])->name('admin.destroyUser');
    });

    Route::put('/user/profile', [UserController::class, 'updateProfile'])->name('user.updateProfile');
});*/

/*Route::get('/admin/users', [UserController::class, 'getAllUsers']);
Route::get('/user', [UserController::class, 'getAuthenticatedUser'])->middleware('auth'); // Pour obtenir le profil de l'utilisateur
Route::put('/admin/profile', [UserController::class, 'updateProfile'])->middleware('auth');
Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])->middleware('auth');*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::get('/user/profile', [UserController::class, 'getAuthenticatedUser']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
});


use App\Http\Controllers\ConsommateurControlleur;

Route::post('consommateur/ajouter_panier', [ConsommateurControlleur::class, 'ajouter_panier']);
Route::post('consommateur/passer_commande', [ConsommateurControlleur::class, 'passer_commande']);
Route::post('consommateur/laisser_evaluation', [ConsommateurControlleur::class, 'laisser_evaluation']);
use App\Http\Controllers\CommercantControlleur;

Route::post('commercant/acheter_en_gros', [CommercantControlleur::class, 'acheter_en_gros']);
Route::post('commercant/gerer_stock', [CommercantControlleur::class, 'gerer_stock']);
use App\Http\Controllers\ProduitControlleur;

Route::get('produits',[ProduitControlleur::class, 'index']);
Route::post('produits',[ProduitControlleur::class, 'store']);
Route::get('produits/{id}',[ProduitControlleur::class, 'show']);
Route::delete('produits/{id}',[ProduitControlleur::class, 'destroy']);
Route::PUT('produits/{id}', [ProduitControlleur::class, 'update']);

use App\Http\Controllers\CommandeControlleur;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/commandes', [CommandeController::class, 'index']); // Pour les admins
    Route::get('/commandes/fermier', [CommandeController::class, 'commandesFermier']); // Pour les fermiers
    Route::get('/commandes/consommateur', [CommandeController::class, 'commandesConsommateur']); // Pour les consommateurs
    Route::post('/commandes', [CommandeController::class, 'creerCommande']); // Créer une commande
    Route::put('/commandes/{id}', [CommandeController::class, 'mettreAJourCommande']); // Mettre à jour une commande
    Route::delete('/commandes/{id}', [CommandeController::class, 'supprimerCommande']); // Supprimer une commande
});


use App\Http\Controllers\EvaluationControlleur;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/evaluations', [EvaluationControlleur::class, 'addEvaluation']);
});
Route::get('/produits/{produitId}/evaluations', [EvaluationControlleur::class, 'getEvaluations']);


use App\Http\Controllers\AgriculteurControlleur;



Route::middleware(['auth', 'agriculteur'])->group(function () {
    Route::get('/agriculteurs', [AgriculteurControlleur::class, 'index']);
    Route::post('agriculteurs', [AgriculteurControlleur::class, 'ajouter']);
    Route::put('agriculteurs/{id}', [AgriculteurControlleur::class, 'modifier']);
    Route::get('agriculteurs/{id}/commandes', [AgriculteurControlleur::class, 'consulter_commande']);
});