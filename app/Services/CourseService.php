<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Currency;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;

class CourseService
{
    /**
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     * Получение курсов валют с ресурса
     */
    public function getCoursesFromResource()
    {
        $client = new Client();
        $uri = 'http://www.cbr.ru/scripts/XML_daily.asp';

        $file = File::get(public_path('courses.xml'));

        $response = $client->request('GET', $uri);

        $code = $response->getStatusCode();
        $content = $response->getBody();

        $xml = simplexml_load_string($content);
        $json = json_encode($xml);

        return json_decode($json, true);
    }

    /**
     * @return void
     * Сохранение валют и курсов в БД
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function saveCourses()
    {
        $courses = $this->getCoursesFromResource();
        $currencies = $courses['Valute'];
        $attributes = $courses['@attributes'];

        foreach ($currencies as $currency) {
            $currentCurrency = Currency::firstOrCreate([
                'num_code' => $currency['NumCode'],
                'char_code' => $currency['CharCode'],
                'nominal' => $currency['Nominal'],
                'name' => $currency['Name']
            ]);

            $courseDate = Carbon::parse($attributes['Date'])->format('Y-m-d');
            $course = Course::where('currency_id', $currentCurrency->id)
                ->where('date', $courseDate)
                ->first();

            if ($course) {
                return $course->update([
                    'value' => $currency['Value'],
                ]);
            }

            Course::create([
                'currency_id' => $currentCurrency->id,
                'value' => $currency['Value'],
                'date' => Carbon::parse($attributes['Date'])->format('Y-m-d'),
            ]);
        }
    }

    /**
     * @param $currencies
     * @param $cbr
     * @return mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     * Получение курсов валют, которые соответствуют настройкам
     */
    public function getCourses($currencies, $cbr)
    {
        $this->saveCourses();

        $currencies = explode(',', $currencies);
        $cbr = explode(',', $cbr);

        $latestCourseDate = Course::orderByDesc('date')->first()->date;

        return Course::whereIn('currency_id', $currencies)
            ->whereIn('currency_id', $cbr)
            ->where('date', $latestCourseDate)
            ->get();
    }
}
