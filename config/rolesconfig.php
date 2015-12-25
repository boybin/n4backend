
<?php
//Add forbid api call here to prevent specific access
return [
  'roles' => [
        '1' => [
          'forbids'=>[
            'api.rent.buildings.xxxxx'
          ]
        ],
        '2' => [
          'forbids'=>[
            'api.rent.buildings',
            'api.rent.contracts',
            'api.rent.feerecords',
            'api.rent.users'
          ]
        ],
        '3' => [
          'forbids'=>[
            'api.rent.buildings',
            'api.rent.feerecordstatistics',
            'api.rent.users'
          ]
        ]
    ]
];
