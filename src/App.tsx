import React from "react";
import {RepositoriesProvider} from "./api/RepositoriesProvider";
import {Repositories} from "./pages/Repositories";

function App() {
    return (
        <RepositoriesProvider>
            <Repositories/>
        </RepositoriesProvider>
    );
}

export default App;
