export interface User {
    id: number;
    name: string;
    username: string,
    photoURL: string;
    bio: string;
    url: string;
    repositoriesCount: number;
}

export interface Repository {
    id: number;
    owner: User;
    title: string;
    stars: number;
    forks: number;
    url: string;
    description: string;
}

export interface RepositoriesContextValue {
    loading: boolean;

    user: User | null;

    users: Record<number, User>,
    repositories: Record<number, Repository>
    repositoriesFavorites: Record<number, Repository>;

    selectUser(username: string): Promise<void>;
    loadMoreRepositories(): Promise<void>;

    toggleFavoriteRepository(repositoryId: number): void;
}
