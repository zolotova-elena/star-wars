import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import './people-page.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 11,
        hasError: false
    };

    componentDidCatch() {
        this.setState({
          hasError: true
        });
    }

    onPersonSelected = (selectedPerson) => {
        console.log("selectedPerson 29", selectedPerson);
        this.setState({ selectedPerson });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>

                {(item) => (
                    `${item.name} (${item.birthYear})`
                )}



            </ItemList>
        );

        console.log("selectedPerson",this.state.selectedPerson)

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails 
                    itemId={this.state.selectedPerson} 
                    getData={this.swapiService.getPerson}
                    getImageUrl={this.swapiService.getPersonImage}>
                    <Record field="gender" label="Gender"/>
                    <Record field="eyeColor" label="Eye Color"/>
                </ItemDetails>

                    
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails} />
        );
    }
}