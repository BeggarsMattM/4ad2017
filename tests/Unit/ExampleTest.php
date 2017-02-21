<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Release;
use App\Offer;
use Carbon\Carbon;

class ExampleTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }

    public function setUp() {

      parent::setUp();
      Release::truncate();
      Offer::truncate();

    }

    public function testReleaseScopes()
    {

      $releases = factory(\App\Release::class, 2)->create([
        'golive_date' => \Carbon\Carbon::now()->addWeek()
      ]);
      $release = factory(\App\Release::class)->create([
        'golive_date' => \Carbon\Carbon::now()->subWeek()
      ]);

      $this->assertEquals(\App\Release::all()->count(), 3);
      $this->assertEquals(\App\Release::viewable()->count(), 1);

      $viewable_release = \App\Release::viewable()->first();
      $viewable_release->is_live = 0;
      $viewable_release->save();

      $this->assertEquals(\App\Release::viewable()->count(), 0);
    }

    public function testGetReleases()
    {
      $releases = factory(\App\Release::class, 50)->create();

      $releases = \App\Release::getReleases(18);
      $this->assertEquals($releases->count(), 18);
      $this->assertEquals($releases->where('store_only', true)->count(), 0);
      $this->assertEquals($releases->where('is_live', false)->count(), 0);
      $this->assertTrue($releases->first()->release_date >= $releases->last()->release_date);
    }

    public function testGetReleaseYears()
    {
      $r00  = factory(Release::class)->create(['release_date' => Carbon::createFromDate(2000, 1, 1)]);
      $r17  = factory(Release::class)->create(['release_date' => Carbon::createFromDate(2017, 1, 1)]);
      $r15  = factory(Release::class)->create(['release_date' => Carbon::createFromDate(2015, 1, 1)]);
      $r16  = factory(Release::class)->create(['release_date' => Carbon::createFromDate(2016, 1, 1)]);
      $r16b = factory(Release::class)->create(['release_date' => Carbon::createFromDate(2016, 1, 1)]);
      $years = Release::getReleaseYears()->values()->toArray();
      $this->assertEquals($years, [2017, 2016, 2015, 2000]);
    }

    public function testGetOffers()
    {
      $o1 = factory(Offer::class)->create(['is_current' => true, 'display_order' => 1]);
      $o2 = factory(Offer::class)->create(['is_current' => false]);
      $o3 = factory(Offer::class)->create(['is_current' => true, 'display_order' => 0]);
      $offers = Offer::getOffers();
      $this->assertEquals($offers->count(), 2);
      $this->assertEquals($offers->first()->display_order, 0);
    }
}
