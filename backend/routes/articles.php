<?php

use App\Http\Controllers\ArticlesController;
use Illuminate\Support\Facades\Route;

Route::prefix('articles')->group(function () {
    Route::get('/', [ArticlesController::class, 'index']);
    Route::get('/{id}', [ArticlesController::class, 'show']);
    Route::post('/', [ArticlesController::class, 'store']);
});
