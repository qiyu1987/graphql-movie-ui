import React, { Component } from "react"
import "./App.css"
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider, Query } from "react-apollo"

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
})

const MOVIES_QUERY = gql`
	{
		movies {
			id
			title
			release_date
		}
	}
`

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<div className="App">
					<Query query={MOVIES_QUERY}>
						{({ loading, error, data }) => {
							if (loading) return <p>Loading...</p>
							if (error) return <p>Error :(</p>
							return this.renderMovies(data.movies)
						}}
					</Query>
				</div>
			</ApolloProvider>
		)
	}

	renderMovies(movies) {
		return movies.map(movie => <div key={movie.id}>{movie.title}</div>)
	}
}

export default App
