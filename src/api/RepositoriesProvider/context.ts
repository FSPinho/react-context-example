import React from "react";
import {RepositoriesContextValue} from "./types";

export const RepositoriesContext = React.createContext<RepositoriesContextValue | null>(null);