<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Item::all();
    }

    /**
     * Store a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function set(Request $request)
    {
        Item::truncate();
        $items = $request->items;
        foreach ($items as $item) {
            $new_item = new Item();
            $new_item->title = $item['title'];
            $new_item->done = $item['done'] ? true : false;
            $new_item->due_date = $item['due_date'] ? Carbon::parse($item['due_date']) : null;
            $new_item->save();
        }
        return true;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_item = new Item();
        $new_item->title = $request->new_item["title"];
        $new_item->save();

        return $new_item;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $updated_item = $request->updated_item;
        if (isset($updated_item["title"])) {
            $item->title = $updated_item["title"];
        }
        if (isset($updated_item["done"])) {
            $item->done = $updated_item["done"] ? true : false;
        }
        if (isset($updated_item["due_date"])) {
            $item->due_date = $updated_item["due_date"] ? Carbon::parse($updated_item["due_date"]) : null;
        }
        $item->save();

        return $item;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return true;
    }
}
