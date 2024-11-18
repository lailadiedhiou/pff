<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'commentaire',
        'date',
        'consommateur_id',
    ];

    

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
    public function consommateur()
    {
        return $this->belongsTo(Consommateur::class, 'consommateur_id');
    }

}
