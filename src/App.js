import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // リアクティブな定数を定義
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // ポケモンの詳細データを取得
      loadPokemon(res.results)
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData)
  }

  console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1> ロード中・・・</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
