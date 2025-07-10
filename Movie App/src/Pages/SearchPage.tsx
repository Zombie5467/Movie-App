// SearchPage.tsx
import { SearchMulti } from "../components/Navbar/SearchMulti";

export const SearchPage = () => <SearchMulti />

/*
  Nota personal
  Aunque podría pasar SearchMulti directamente a Router (fuera de Routes),
  lo hice así para que SearchPage sea una página independiente y tener más flexibilidad
  en el futuro, por ejemplo, si quiero agregar más componentes o funcionalidades a SearchPage.
*/

