<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    public function releases() {
      return $this->belongsToMany(Release::class)
        ->withTimestamps()
        ->withPivot('is_current')
        ->orderBy('display_order', 'asc');
    }

    public function scopeViewable($query) {
      return $query->where('is_current', true);
    }

    public static function getOffers() {
      return self::viewable()
        ->with('releases')
        ->orderBy('display_order', 'asc')
        ->get();
    }
}
