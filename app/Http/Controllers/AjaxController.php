<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function upload(Request $request){
        //upload file; 
        $file = $request->file('image'); 
        $limage = $request->image; 

        return response()->json(['status' => 200,  'request' => $request->all(), 'img' => $file, 'file' => $_FILES, 'post' => $_POST, 'limage' => $limage]); 
        //return $request;
    }
}
