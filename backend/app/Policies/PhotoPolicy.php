<?php

namespace App\Policies;

use App\Models\Photo;
use App\Models\User;

class PhotoPolicy
{
    // Любой авторизованный пользователь может загружать фото
    public function create(User $user): bool
    {
        return true;
    }

    // Удалять может владелец фото или admin (модерация)
    public function delete(User $user, Photo $photo): bool
    {
        return $user->isAdmin() || $user->id === $photo->user_id;
    }

    // Редактировать может владелец фото или admin
    public function update(User $user, Photo $photo): bool
    {
        return $user->isAdmin() || $user->id === $photo->user_id;
    }
}
