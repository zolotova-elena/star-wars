import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator';


export default class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 5000
    };

    static propsTypes = {
        updateInterval: PropTypes.number //.isRequired
    };

    swapiService = new SwapiService();

    state = {
        planet : {},
        loading : true,
        error : false
    };

    constructor () {
        super();
    };

    componentDidMount () {
        const { updateInterval } = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    };

    componentWillUnmount () {
        clearInterval(this.interval);
    };

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading : false});
    };

    onError = (err) => {
        this.setState({
            error : true,
            loading : false
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*25 + 3);
        this.swapiService
            .getPlanet(id)
            .then ((planet) => {
                this.onPlanetLoaded(planet);
            })
            .catch (this.onError);

    };

    render() {
        const {
            planet,
            loading,
            error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;

        /*if (loading) {
            return (
                <div className="random-planet jumbotron rounded">
                    <Spinner />
                </div>);
        }*/

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>

        );
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population,
        rotationPeriod,
        diameter} = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};