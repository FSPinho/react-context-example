import {useContext} from "react";
import {RepositoriesContext} from "./context";
import {RepositoriesContextValue} from "./types";

export const useRepositories = (): RepositoriesContextValue => {
    const repositories = useContext(RepositoriesContext);

    if (!repositories) {
        throw new Error("Missing repository provider.");
    }

    return repositories;
}