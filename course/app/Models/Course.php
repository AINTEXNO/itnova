<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $guarded = ['id'];
    protected $casts = [
        'date' => 'datetime:Y.m.d',
        'value' => 'float',
    ];
    protected $appends = [
        'course_changed',
    ];

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function getPreviousDateAttribute()
    {
        $latest = Course::orderByDesc('id')->firts()->date;
        $date = new \DateTime(Carbon::parse($latest));
        return $date->modify('-1 day');
    }

    /**
     * @return int
     * Метод проверяет, как изменялся курс
     */
    public function getCourseChangedAttribute()
    {
        $latestDate = Course::orderByDesc('date')->first()->date;
        $lastCurrencyCourse = Course::where('currency_id', $this->attributes['currency_id'])
            ->where('date', '!=', $latestDate)
            ->orderByDesc('date')
            ->first();

        /**
         * 1 - курс поднялся
         * 2 - курс не изменился
         * 3 - курс опустился
         */

        if($lastCurrencyCourse) {
            if($this->attributes['value'] === (double)$lastCurrencyCourse->value) {
                return 2;
            }

            return $this->attributes['value'] > (double)$lastCurrencyCourse->value ? 1 : 3;
        }

        return 2;
    }

    public function setValueAttribute($value)
    {
        $this->attributes['value'] = str_replace(',', '.', $value);
    }
}
