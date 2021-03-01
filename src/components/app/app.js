import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import { PersonList, PlanetList, StarshipList } from '../sw-components/item-lists';
import { PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import Row from '../row';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;


        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header />
                        { planet }

                        <div className="row mb2 button-row">
                            <button
                                className="toggle-planet btn btn-warning btn-lg"
                                onClick={this.toggleRandomPlanet}>
                                Toggle Random Planet
                            </button>
                            <ErrorButton />
                        </div>

                        <Row 
                            right={ <PersonDetails itemId={11}/> }
                            left={ <PersonList/> } />

                        <Row 
                            right={ <PlanetDetails itemId={5}/> }
                            left={ <PlanetList/> } />
                        
                        <Row 
                            right={ <StarshipDetails itemId={9}/> }
                            left={ <StarshipList/> } />

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}