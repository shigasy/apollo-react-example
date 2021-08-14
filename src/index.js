import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from '@apollo/react-common';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    })
  },
  onError: ({ graphQLErrors, networlError}) => {
    // 一括でエラーハンドリングを指定できる
    // コンポーネント毎に固有の処理を書く必要がない
    // ただ、errorを返しつつも表示できるデータがあり、表示したいときに一括でエラー画面遷移とかは微妙かも
    if (graphQLErrors) {
      console.error(graphQLErrors)
    }
    // 再リクエストとかになりそう
    if (networlError) {
      console.error(networlError)
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
