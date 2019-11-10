import React, { Component } from "react"
import "./App.css"
import ApolloClient, { gql } from "apollo-boost"

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
})

class App extends Component {
	componentDidMount() {
		client
			.query({
				query: gql`
					{
						movies {
							id
							title
							release_date
						}
					}
				`
			})
			.then(result => this.setState(result.data))
	}

	render() {
		return (
			<div className="App">
				{!this.state || !this.state.movies
					? ""
					: this.state.movies.map(movie => (
							<div key={movie.id}>{movie.title}</div>
					  ))}
			</div>
		)
	}
}

export default App
