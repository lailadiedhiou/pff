<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->integer('note');
            $table->string('commentaire');
            $table->date('date');
            $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
            $table->foreignId('consommateur_id')->constrained('consommateurs')->onDelete('cascade'); // Relation avec consommateur
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluations');
    }
}
