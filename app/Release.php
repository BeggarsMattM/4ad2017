<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Release extends Model
{
    protected $dates = ['release_date', 'golive_date'];

    public function artist() {
      return $this->belongsTo(Artist::class);
    }

    public function scopeViewable($query) {

      return $query->where('is_live', true)
                   ->afterGoLiveDate();
    }

    public function scopeAfterGoLiveDate($query) {

      return $query->where('golive_date', '<=', Carbon::now());
    }

    public function scopeExcludingStoreOnlyItems($query) {

      return $query->where('store_only', false);
    }

    public static function getReleases($number) {
      return self::viewable()
                 ->excludingStoreOnlyItems()
                 ->with('artist')
                 ->orderBy('release_date', 'desc')
                 ->get()
                 ->take($number);
    }

    public static function getReleaseYears() {

      $extractYearFunc = function ($r) {
        return $r->release_date->format('Y');
      };

      return self::viewable()
                 ->excludingStoreOnlyItems()
                 ->select('release_date')
                 ->get()
                 ->map($extractYearFunc)
                 ->toBase()
                 ->unique()
                 ->sort()
                 ->reverse();
    }
}
