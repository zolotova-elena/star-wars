import React from 'react';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (Wrapped, mapMethodsToprops) => {

    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const serviceProps = mapMethodsToprops(swapiService);
                        return (
                            <Wrapped {...props} {...serviceProps} />
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }

};

export default withSwapiService;