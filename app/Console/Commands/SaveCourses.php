<?php

namespace App\Console\Commands;

use App\Services\CourseService;
use Illuminate\Console\Command;

class SaveCourses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'courses:save';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Save courses';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     * @throws \GuzzleHttp\Exception\GuzzleException
     * Команда, которая делает запрос к ресурсу каждую минуту
     */
    public function handle(CourseService $service)
    {
        return $service->saveCourses();
    }
}
