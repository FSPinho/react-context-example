import React, { useCallback, useState } from "react";
import { useRepositories } from "../../api/RepositoriesProvider/hooks";
import { Header, HeaderInfo, Modal, ModalBG, ModalClose } from "./styles";
import { RepositoriesList } from "../RepositoriesList";

export const RepositoriesHeader: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const repositoriesContext = useRepositories();

    const onUsernameChange = useCallback(({ target: { value } }) => {
        setUsername(value);
    }, []);

    const selectUser = useCallback(async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await repositoriesContext.selectUser(username);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }, [repositoriesContext, username]);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return (
        <Header>
            <form onSubmit={selectUser}>
                <input name={"user"}
                       value={username}
                       onChange={onUsernameChange}
                       placeholder={"Username..."}/>
                <button>GO</button>
                {!!error && <p dangerouslySetInnerHTML={{ __html: error }}/>}
            </form>

            {repositoriesContext.user && (
                <HeaderInfo>
                    <span>{repositoriesContext.user.repositoriesCount} repositories</span>
                </HeaderInfo>
            )}

            <HeaderInfo onClick={openModal} clickable>
                <span>{Object.keys(repositoriesContext.repositoriesFavorites).length} favorites</span>
            </HeaderInfo>

            {modalOpen && (
                <ModalBG/>
            )}

            {modalOpen && (
                <Modal>
                    <ModalClose onClick={closeModal}>x</ModalClose>
                    <RepositoriesList favorites/>
                </Modal>
            )}


        </Header>
    );
}
