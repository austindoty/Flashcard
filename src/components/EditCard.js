import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm.js";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});

  const initialFormState = {
    id: -1,
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
        console.log("I loaded the deck", deck);
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted Load Single Deck");
        else throw error;
      }
    }
    loadDeck();
    return () => {
      console.log("Cleanup Load Single Deck");
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCard() {
      try {
        const card = await readCard(cardId, abortController.signal);
        setFormData({ ...card });
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted Load Single Card");
        else throw error;
      }
    }

    loadCard();
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
      await updateCard(formData);
      history.push(`/decks/${deckId}`);
    }
    create();
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              <i className="bi bi-house-door"></i> Home
            </Link>
            /<Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>/ Edit Card{" "}
            {cardId}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Edit Card</h3>
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
export default EditCard;
