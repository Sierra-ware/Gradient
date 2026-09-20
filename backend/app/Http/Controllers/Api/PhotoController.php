<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PhotoController extends Controller
{
    // GET /api/photos — все фото, последние сверху
    public function index()
    {
        return response()->json(
            Photo::with('user:id,name,role')->latest()->get()
        );
    }

    // POST /api/photos — загрузка нового фото (нужна авторизация)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image', 'max:8192'], // до 8 МБ
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $path = $request->file('image')->store('photos', 'public');

        $photo = $request->user()->photos()->create([
            'title' => $request->title,
            'image_path' => $path,
        ]);

        return response()->json($photo->load('user:id,name,role'), 201);
    }

    // DELETE /api/photos/{photo} — удалить может владелец или admin
    public function destroy(Request $request, Photo $photo)
    {
        $this->authorize('delete', $photo);

        Storage::disk('public')->delete($photo->image_path);
        $photo->delete();

        return response()->json(['message' => 'Фото удалено.']);
    }
}
