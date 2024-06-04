type PeopleResponse = {
  count: number;
  results: Profile[];
};

type Profile = {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  name: string;
  url: string;
  species: string[];
  starships: string[];
  vehicles: string;
};

type Species = {
  name: string;
  classification: string;
  language: string;
  average_lifespan: string;
};

type Film = {
  director: string;
  episode_id: string;
  producer: string;
  release_date: string;
  title: string;
};

type StarShip = {
  name: string;
  model: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  passengers: string;
};
