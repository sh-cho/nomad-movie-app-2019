import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    return await axios.get(
      'https://yts-proxy.nomadcoders1.now.sh/list_movies.json',
      {
        params: {
          sort_by: 'rating',
          order_by: 'desc',
        },
      }
    );
  };

  async componentDidMount() {
    const {
      data: {
        data: { movies },
      },
    } = await this.getMovies();

    this.setState({ movies, isLoading: false });
  }

  renderMovies(movie) {
    return (
      <Movie
        key={movie.id}
        id={movie.id}
        year={movie.year}
        title={movie.title}
        summary={movie.summary}
        poster={movie.medium_cover_image}
        genres={movie.genres}
      />
    );
  }

  render() {
    const { movies, isLoading } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">{movies.map(this.renderMovies)}</div>
        )}
      </section>
    );
  }
}

export default Home;
