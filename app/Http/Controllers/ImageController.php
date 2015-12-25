<?php

namespace App\Http\Controllers;

use File;

use App\Image;
use Flow\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class ImageController extends AuthBaseController
{
  public $model_id;
  public $r_id;
  public $model_class_path;
  public $destination_path;
  public $filename;

  public $config;

  public function uploadFile(Request $request, $model_id = false, $r_id)
  {
       try
       {
           $this->model_id  = $model_id;
           $this->r_id = $r_id;
           $model_class_path  = $this->getClassName($request);
           $this->destination_path    = $this->getImagePublicDestinationPath($request);
           $realPath = public_path().'/'.$this->destination_path;
           File::makeDirectory($realPath, $mode = 0777, true, true);
           $this->model_class_path = $model_class_path;

           $this->config = new Config(array(
               'tempDir' => storage_path('chunks_temp_folder')
           ));
           $this->filename = Input::get('flowFilename');

           $flowRequest = new \Flow\Request();
           if(\Flow\Basic::save(
               public_path($this->getPathWithFile()),
               $this->config,
               $flowRequest)) {
                 $image = $this->saveImagable();
                 return Response::json(['data' => $image, 'message' => "File Uploaded $this->filename"], 200);
           } else {
               return Response::json([], 204);
           }
       }
       catch(\Exception $e)
       {
           throw new \Exception(sprintf("Error saving image %s", $e->getMessage()));
       }
   }

   public function saveImagable()
   {
       $imageable = new Image();
       $imageable->path = $this->getPathWithFile();
       $imageable->imageable_id = $this->model_id;
       $imageable->imageable_type = $this->model_class_path;
       $imageable->r_id = $this->r_id;
       $imageable->save();

       return $imageable;
   }

   public function getDestinationPath()
   {
       return $this->destination_path;
   }

   public function setDestinationPath($destination_path)
   {
       $this->destination_path = $destination_path;
   }

   private function getClassName($request)
   {
       return ($request->input('model_class_path')) ? $request->input('model_class_path') : 'App\Room';
   }

   private function getPathWithFile() {
     return $this->destination_path .'/'.$this->filename;
   }

   public function getImagePublicDestinationPath(Request $request)
   {
      $uploadDate = new \DateTime();
      $uploadDateStr = $uploadDate->format('Y-m-d');

      return ($request->input('path')) ? $request->input('path') : 'upimages/rooms/'.$this->model_id.'/'.$uploadDateStr;
   }

}
