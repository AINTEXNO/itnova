<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyCollection;
use App\Models\Currency;
use App\Services\CourseService;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /**
     * @return CurrencyCollection
     * Получение всех валют
     */
    public function getCurrencies()
    {
        $currencies = Currency::all();

        return new CurrencyCollection($currencies);
    }
}
