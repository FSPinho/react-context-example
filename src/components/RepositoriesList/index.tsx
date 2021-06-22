import React, { useCallback, useMemo, useState } from "react";
import { useRepositories } from "../../api/RepositoriesProvider/hooks";
import { RepoCard, RepoCardInfo, RepoCardTitle, Root } from "./styles";
import { RepositoriesListProps } from "./types";
import { useScrollBottomListener } from "../../util/ScrollListener/useScrollBottomListener";

export const RepositoriesList: React.FC<RepositoriesListProps> = ({ favorites }) => {
    const [error, setError] = useState("");

    const repositoriesContext = useRepositories();

    const repositories = useMemo(() => {
        return Object.values(favorites ? repositoriesContext.repositoriesFavorites : repositoriesContext.repositories)
            .sort((a, b) => a.title.localeCompare(b.title));
    }, [favorites, repositoriesContext.repositories, repositoriesContext.repositoriesFavorites]);

    const onScrollReachBottom = useCallback(async () => {
        try {
            await repositoriesContext.loadMoreRepositories();
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }, [repositoriesContext]);

    useScrollBottomListener(0, onScrollReachBottom);

    return repositoriesContext.user ? (
        <Root>
            <a rel={"noreferrer"} href={repositoriesContext.user.url} target={"_blank"}>
                <h2>{repositoriesContext.user.name}'s Repositories</h2>
            </a>

            {repositories.length === 0 && (
                <p>No repositories found.</p>
            )}

            {repositories.map(repo => (
                <RepoCard key={repo.id}>
                    <RepoCardTitle>
                        <a rel={"noreferrer"} href={repo.url} target={"_blank"}>{repo.title}</a>
                        {!!repo.description && <span><br/>{repo.description}</span>}
                        {favorites && <span><br/>{repo.owner.name}</span>}
                    </RepoCardTitle>
                    <RepoCardInfo>★ {repo.stars} stars</RepoCardInfo>
                    <RepoCardInfo>ψ {repo.stars} forks</RepoCardInfo>
                    <RepoCardInfo>
                        <button onClick={() => repositoriesContext.toggleFavoriteRepository(repo.id)}>
                            {repositoriesContext.repositoriesFavorites[repo.id] ? "♥" : "♡"}
                        </button>
                    </RepoCardInfo>
                </RepoCard>
            ))}

            {!!error && <p dangerouslySetInnerHTML={{ __html: error }}/>}
            {repositoriesContext.loading && <p>Loading...</p>}
        </Root>
    ) : null;
}
