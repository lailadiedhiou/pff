<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Evaluation;
class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'photos',
        'stock',
        'categories'
    ];
    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }


}
