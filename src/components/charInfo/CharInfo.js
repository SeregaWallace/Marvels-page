import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharInfo();
        }
    }

    updateCharInfo = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.loadingTrue()
        this.marvelService
            .getCharacter(charId)
            .then(this.charLoaded)
            .catch(this.onError)
    }

    charLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    loadingTrue = () => {
        this.setState({
            loading: true,
        });
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, homepage, wiki, thumbnail, description, comics } = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics > 0 ? null : 'Sorry, there is no comic-books'}
                {
                    comics.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;