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

    const [card, setCardData] = useState(initialDeckState);
    const [deck, setDeckData] = useState(initialCardState);


    useEffect(() => {
        async function getDeckData() {
            try {
                const initialDeckData = await readDeck(deckId);
                setDeckData(initialDeckData)
            } catch (error){
                console.error("Error fetching card data:", error)
            }
        }
        getDeckData();
    }, [deckId]);

    useEffect(() => {
        async function getCardData() {
            try {
                const initialDeckData = await readCard(cardId);
                setCardData(initialCardState)
            } catch (error){
                console.error("Error updating Card:", error)
            }
        }
        getCardData();
    }, [cardId]);
            

    /*function handleChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }*/

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await updateCard({...card, id: cardId, deckId: parseInt(deckId)})
            history.push(`/decks/${deckId}`)
        } catch (error) {
            console.error("Error updating card:", error)
        }
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
        card={card}
        type="edit"
      />

        </div>
    );
}

export default EditCard;