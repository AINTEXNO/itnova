<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function setCbrAttribute($value)
    {
        $this->attributes['cbr'] = json_encode(explode(',', $value));
    }

    public function setViewAttribute($value)
    {
        $this->attributes['view'] = json_encode(explode(',', $value));
    }
}
