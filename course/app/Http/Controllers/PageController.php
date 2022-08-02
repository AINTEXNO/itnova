<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Services\CourseService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     */
    public function home(CourseService $service)
    {
        return view('pages.home');
    }
}
