<?php

use App\Http\Controllers\CommentsController;
use Illuminate\Support\Facades\Route;

Route::post('articles/{id}/comments', [CommentsController::class, 'store']);
