import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { FrontPage } from "./pages/FrontPage";

function App() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 max-w-6xl m-auto">
      <Nav />
      <FrontPage />
      <Footer />
    </div>
  );
}

export default App;
