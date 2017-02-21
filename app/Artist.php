<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    public function scopeViewable($query)
    {
      return $query->where('is_live', true)
                   ->where('is_deleted', false);
    }

    public function scopeCurrent($query)
    {
      return $query->where('is_current', true);
    }

    public function scopeOrdered($query)
    {
      return $query->orderBy('name');
    }
}
