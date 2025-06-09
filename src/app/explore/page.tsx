"use client";
import CatSub from "./components/Searchbar/CatSub";
import SearchBar from "./components/Searchbar/SearchBar";
import ExplorList from "./components/ExploreList/ExplorList";
export default function Page() {
  return (
    <div className="mt-7">
<SearchBar/>
<CatSub/>
<ExplorList/>
    </div>
  );
}