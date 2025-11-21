import Router from "./router";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}

export default App