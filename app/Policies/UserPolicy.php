<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function delete(User $admin, User $user)
    {
        return $admin->role === 'administrateur';
    }

    public function moderateReview(User $admin)
    {
        return $admin->role === 'administrateur';
    }
}
