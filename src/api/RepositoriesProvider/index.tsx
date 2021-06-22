import React, { useCallback, useMemo, useState } from "react";
import { RepositoriesContext } from "./context";
import { RepositoriesContextValue, Repository, User } from "./types";
import axios from "axios";


export const DEF_REPOS_PAGE_SIZE = 18;


export const RepositoriesProvider: React.FC = ({ children }) => {
    /**
     * Whether context is calling the GitHub API.
     * */
    const [loading, setLoading] = useState(false);

    /**
     * Current loaded repositories page.
     * */
    const [page, setPage] = useState(0);

    /**
     * Selected user.
     * */
    const [user, setUser] = useState<User | null>(null);

    /**
     * Last selected users, including the current.
     * */
    const [users, setUsers] = useState({} as Record<number, User>);

    /**
     * Current user repository list.
     * */
    const [repositories, setRepositories] = useState({} as Record<number, Repository>);

    /**
     * All selected repositories.
     * */
    const [repositoriesFavorites, setRepositoriesFavorites] = useState({} as Record<number, Repository>);

    const clear = useCallback(() => {
        setPage(0);
        setLoading(false);
        setUser(null);
        setUsers({});
        setRepositories({});
    }, []);

    /**
     * Retrieves the given username info, and set as the selected user.
     * */
    const loadMoreRepositories = useCallback(async (owner?: User | null) => {
        setLoading(true);

        let _page = page;
        let _repos = {...repositories} as Record<string, Repository>;

        if (!owner) {
            owner = user;
        } else {
            _page = 1;
            _repos = {};
        }

        if (owner) {
            try {
                const { data: reposData } = await axios.get(
                    `https://api.github.com/users/${owner.username}/repos?page=${_page}&per_page=${DEF_REPOS_PAGE_SIZE}`
                );

                reposData.forEach((data: any) => {
                    _repos[data.id] = {
                        id: data.id,
                        title: data.name,
                        description: data.desciption,
                        owner: owner,
                        forks: data.forks,
                        stars: data.stargazers_count,
                        url: data.html_url
                    } as Repository;
                });
                setRepositories(_repos);
                setLoading(false);

                if (reposData.length) {
                    setPage(_page + 1);
                }
            } catch (error) {
                clear();
                throw new Error(`Can't retrieve ${owner.username}'s repositories.`);
            }
        } else {
            setLoading(false);
        }
    }, [clear, page, user, repositories]);

    /**
     * Retrieves the given username info, and set as the selected user.
     * */
    const selectUser = useCallback(async (username: string) => {
        clear();
        setLoading(true);

        let user: User | null = null;

        try {
            const { data: userData } = await axios.get(`https://api.github.com/users/${username}`);
            user = {
                id: userData.id,
                username: userData.login,
                name: userData.name,
                photoURL: userData.avatar_url,
                url: userData.html_url,
                bio: userData.bio,
                repositoriesCount: userData.public_repos
            };
            setUser(user);
            setUsers(curr => user ? ({ ...curr, [user.id]: user }) : curr);
        } catch (error) {
            clear();
            throw new Error(`${username} isn't a valid username.`);
        }

        await loadMoreRepositories(user);
    }, [clear, loadMoreRepositories]);

    const toggleFavoriteRepository = useCallback((repositoryId: number) => {
        setRepositoriesFavorites(curr => {
            if (curr[repositoryId]) {
                delete curr[repositoryId];
            } else {
                const repo = repositories[repositoryId];
                if (repo) {
                    curr[repositoryId] = repo;
                }
            }

            return {...curr};
        })
    }, [repositories]);

    const contextValue = useMemo<RepositoriesContextValue>(() => {
        return {
            loading,
            user,
            users,
            repositories,
            repositoriesFavorites,
            selectUser,
            loadMoreRepositories,
            toggleFavoriteRepository,
        }
    }, [
        user, users, repositories, repositoriesFavorites,
        selectUser, loadMoreRepositories, toggleFavoriteRepository,
        loading,
    ]);

    return (
        <RepositoriesContext.Provider value={contextValue}>
            {children}
        </RepositoriesContext.Provider>
    );
}
