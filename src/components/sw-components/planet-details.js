import React from 'react';
import ItemDetails, { Record } from '../item-details/item-details';
import { withSwapiService } from '../hoc-helpers';

const PlanetDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="pupulation" label="Pupulation"/>
            <Record field="rotationPeriod" label="Rotation Period"/>
            <Record field="diameter" label="Diameter"/>
        </ItemDetails>
    )
};

const mapMethodsToprops = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
};

export default withSwapiService(PlanetDetails, mapMethodsToprops);