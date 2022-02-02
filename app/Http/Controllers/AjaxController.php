<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AjaxController extends Controller
{
    public function upload(Request $request){
        //upload file; 
       
        //return response()->json(['status' => 200,  'img' => $request]); 
         return $request;
    }
}
