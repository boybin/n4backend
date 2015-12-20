
<?php
//Add forbid api call here to prevent specific access
return [
  'roles' => [
        '1' => [
          'forbids'=>[
            'api.rent.buildings'
          ]
        ],
        '2' => [
        ]
    ]
];
