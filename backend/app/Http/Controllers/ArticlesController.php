<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticlesController extends Controller {
    public function index()
    {
        return Article::orderBy('id', 'desc')->paginate(5);
    }

    public function show($id)
    {
        return Article::with(['comments' => function ($query) {
            $query->orderBy('id', 'desc'); 
        }])->findOrFail($id);
    }


    public function store(Request $request) 
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        return Article::create($request->only(['title', 'content']));
    }
}
