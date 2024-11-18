<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CommerçantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        if (auth()->check() && auth()->user()->isCommercant()) {
            return $next($request);
        }

        return redirect('/')->with('error', 'Accès réservé aux commerçants.');
    }

}
