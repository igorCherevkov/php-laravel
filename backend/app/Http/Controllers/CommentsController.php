<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class CommentsController extends Controller 
{
    public function store(Request $request, $id) 
    {
        $request->validate([
            'author_name' => 'required|string',
            'content' => 'required|string',
        ]);

        $article = Article::findOrFail($id);

        return $article->comments()->create($request->only(['author_name', 'content']));
    }
}
