import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
{
  organization(login: "apollographql") {
    repositories(first: 5, isFork: false) {
      nodes {
        id
        name
        url
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
}
`

function App() {
  return (
    <Query query={query}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.toString()}</p>

        const repositories = data.organization.repositories.nodes

        return (
          <div className="App">
            {repositories.map((repo) => (
              <li key={repo.id}>
                <a href={repo.url}>{repo.name}</a>
                <button>{repo.stargazers.totalCount} Star</button>
              </li>
            ))}
          </div>
        )
      }}
    </Query>
  );
}

export default App;
