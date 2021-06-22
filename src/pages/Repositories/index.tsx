import React from "react";
import { RepositoriesList } from "../../components/RepositoriesList";
import { Page } from "./styles";
import { RepositoriesHeader } from "../../components/RepositoriesHeader";

export const Repositories: React.FC = () => {
    return (
        <Page>
            <RepositoriesHeader/>
            <RepositoriesList/>
        </Page>
    );
}
