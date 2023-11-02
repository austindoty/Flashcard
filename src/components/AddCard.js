import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const history = useHistory();
    const { deckId } = useParams(); // Retrieve deck id from url
    const [currentDeck, setCurrentDeck] = useState({});

    const initialFormState = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {

                const deck = await readDeck(deckId, abortController.signal);
                setCurrentDeck(deck);
            } catch (error) { 
                if (error.name === "AbortError")
                console.log("Aborted Load Single Deck");
                else throw error;
            }
        }
            loadDeck();
        return () => {
            abortController.abort(); 
        };
    }, []);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function create() {
            setFormData({ ...initialFormState }); // Reset form
            await createCard(deckId, formData);
        }
        create();
    };
    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <p className="breadcrumb">
                        <Link to="/">
                            <i className="bi bi-house-door"></i> Home
                        </Link>
                             / 
                        <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
                            /Add Card
                    </p>
                </div>
            </div>
        <div className="row">
            <div className="col">
                <h3>{currentDeck.name}:</h3>
                <h3>Add Card</h3>
                    <CardForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                    handleCancel={handleCancel}
                    />
            </div>
        </div>
        </>
        );
}

export default AddCard;