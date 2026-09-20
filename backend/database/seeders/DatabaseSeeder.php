<?php

namespace Database\Seeders;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gradient.local',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $user = User::create([
            'name' => 'Пользователь',
            'email' => 'user@gradient.local',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // placeholder.jpg нужно положить в storage/app/public/photos вручную,
        // либо просто загрузить фото через форму на сайте после запуска
        Photo::create(['user_id' => $user->id, 'title' => 'Первая фотография', 'image_path' => 'photos/placeholder.jpg']);
        Photo::create(['user_id' => $admin->id, 'title' => 'Фото от админа', 'image_path' => 'photos/placeholder.jpg']);
    }
}
