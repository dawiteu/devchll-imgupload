<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AjaxController extends Controller
{
    public function upload(Request $request){
        //uploaded file; 
        $uploadImage = $_FILES['image']; // $request 

        //Storage::put('public/uplimg', $content); 

        // $img = new File(); 
        // $img->file_org_name = $uploadImage['name']; 
        // $img->file_hashname = $uploadImage['name']; 
        // $img->file_path     = $uploadImage['name']; 
        // $img->created_at    = now();

        // $img->save(); 

        if($uploadImage){
            return response()->json(['status' => 200,  'sendfile' => $uploadImage, 'name' => $uploadImage['name']]); 

        }

        return response()->json(['status' => 404, 'error' => 'image not found!']);
    }
}
