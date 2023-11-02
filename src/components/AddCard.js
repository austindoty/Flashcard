import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import  CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();
    const initialState = {
        front: "",
        back: "",
    };

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    const handleAddCard = async (formData) => {
        try {
          // Assuming you have an API function to create a card
          const response = await createCard(deckId, formData); // Make an API request to create a card
          console.log("Card created:", response); // Handle success
          history.push(`/decks/${deckId}`); // Redirect to the deck page or perform other actions
        } catch (error) {
          console.error("Error creating card:", error); // Handle errors
        }
      }

    

    async function handleDone() {
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <CardForm
                initialData={initialState}
                onSubmit={handleAddCard}
                onCancel={handleDone}
            />
        </div>
    );
}

export default AddCard;