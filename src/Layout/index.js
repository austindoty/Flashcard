import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home.js";
import CreateDeck from "../components/CreateDeck";
import Deck from "../components/Deck";
import Study from "../components/Study";
import EditDeck from "../components/EditDeck";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/decks/new">
                        <CreateDeck />
                    </Route>
                    <Route exact path="/decks/:deckId">
                        <Deck />
                    </Route>
                    <Route path="/decks/:deckId/study">
                        <Study />
                    </Route>
                    <Route path="/decks/:deckId/edit">
                        <EditDeck />
                    </Route>
                    <Route path="/decks/:deckId/cards/new">
                        <AddCard />
                    </Route>
                    <Route path="/decks/:deckId/cards/:cardId/edit">
                        <EditCard />
                    </Route>
                    <NotFound />
                </Switch>
            </div>
        </>
    );
}

export default Layout;