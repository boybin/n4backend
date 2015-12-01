<?php

use Illuminate\Database\Seeder;

class BuildingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('buildings')->delete();
      factory(App\Building::class, 3)->create()->each(function($r) {
        $r->rooms()->save(factory(App\Room::class)->make());
      });
    }
}
