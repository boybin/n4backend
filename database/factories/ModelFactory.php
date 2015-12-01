<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'password' => Hash::make('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Building::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'desc' => $faker->text,
        'user_id' => 1,
        'rooms_count' => $faker->randomNumber(2),
    ];
});

$factory->define(App\Room::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'desc' => $faker->text,
        'user_id' => 1,
    ];
});

/*
$factory->define(App\Contract::class, function (Faker\Generator $faker) {
    return [
    ];
})

$factory->define(App\FeeMeta::class, function (Faker\Generator $faker) {
    return [
    ];
})

$factory->define(App\FeeRecord::class, function (Faker\Generator $faker) {
    return [
    ];
})
*/
