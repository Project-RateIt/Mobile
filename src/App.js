import * as React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "./AppNavigation";

function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}

export default App;
