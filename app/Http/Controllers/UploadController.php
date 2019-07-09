<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Uploads;
use Illuminate\Support\Facades\Storage;
class UploadController extends Controller
{
   const PATH='/app/public';
   public $statusSuccess=200;
    protected $objUpload;
    public function __construct()
    {
        $this->objUpload = new Uploads();
    }
    public function upload(Request $request){
    $uploadedFile = $request->file; 
        if ($uploadedFile->isValid()) {
          //  dd(storage_path().self::PATH);
            $uploadedFile->move(storage_path().self::PATH,strtotime(now()).$request->name);
            
            $this->objUpload->file = strtotime(now()).$request->name;
            $this->objUpload->save();
            return response()->json(array('status' => 'success'),$this->statusSuccess);
        }
    }

    public function getFileLists(){
       return $arrFiles  = $this->objUpload::all();
    }
}
