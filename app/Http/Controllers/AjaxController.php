<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Input\Input;

class AjaxController extends Controller
{
    public function upload(Request $request){
        //uploaded file; 
        //$uploadImage = $_FILES['image']; // $request 

        //dd($request->file('image')->getClientOriginalName()); 
    //store = Storage::put('public/uplimg', $uploadImage); 
        $store = $request->file('image')->store('public/imageupload'); 

        
        $img = new File(); 
        $img->file_org_name = $request->file('image')->getClientOriginalName(); 
        $img->file_hashname = explode("/", $store)[2]; 
        $img->created_at    = now();
        
        $img->save(); 
        
        //return response()->json(['status' => 200, 'storestatus' => $store]); 
        if($store){
        return response()->json(['status' => 200, 'store' => $img->file_hashname, 'img' => $img]); 

        }

        return response()->json(['status' => 404, 'error' => 'image not found!']);
    }
}
