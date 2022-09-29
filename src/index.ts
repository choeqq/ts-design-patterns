import { RecordHandler, loader } from "./loader";

interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;
}

// Factory pattern
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }
    public get(id: string): T {
      return this.db[id];
    }
  }
  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();
const pokemonDB = new PokemonDB();
pokemonDB.set({
  id: "Bulbosaur",
  attack: 50,
  defense: 10,
});

console.log(pokemonDB.get("Bulbosaur"));
