<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_commande',
        'etat',
        'montant_total',
        'adresse_livraison'
    ];
}
