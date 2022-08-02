<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function saveSettings(Request $request)
    {
        Settings::updateOrCreate([
            'cbr' => $request->cbr,
            'view' => $request->view,
            'timeout' => $request->timeout
        ]);

        return response()->json([
            'status' => true,
        ])->setStatusCode(200);
    }
}
