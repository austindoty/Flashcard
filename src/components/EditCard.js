import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import  CardForm  from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const initialDeckState = {
        id: "",
        name: "",
        description: "",
    };
    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(initialDeckState);
    const [deck, setDeck] = useState(initialCardState);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const cardResponse = await readCard(
                    cardId,
                    abortController.signal
                );
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                setCard(cardResponse);
                setDeck(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);
    
    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    async function handleCancel() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <CardForm
        initialData={{
          front: card.front,
          back: card.back,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

        </div>
    );
}

export default EditCard;