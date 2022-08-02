<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCollection;
use App\Models\Course;
use App\Models\Settings;
use App\Services\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * @param Request $request
     * @param CourseService $service
     * @return CourseCollection
     * @throws \GuzzleHttp\Exception\GuzzleException
     * Получение курсов валют
     */
    public function getCourses(Request $request, CourseService $service)
    {
        $currencies = $request->view;
        $cbr = $request->cbr;

        $courses = $service->getCourses($currencies, $cbr);

        $settings = new Settings();
        $settings->count()
            ? $settings->orderByDesc('id')->first()->update($request->all())
            : $settings->create($request->all());

        return new CourseCollection($courses);
    }
}
