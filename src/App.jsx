import { StrictMode } from "react";
import Container from "./pokedex/Container";
import Pokedex from "./pokedex/Pokedex";

export const App = () => {
  return (
    <StrictMode>
      <main className="container overflow-hidden">
        <Container>
          <Pokedex />
        </Container>
      </main>
    </StrictMode>
  );
};

export default App;
