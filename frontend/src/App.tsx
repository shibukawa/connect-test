import {
  createSignal,
  createResource,
  Component,
  Show,
} from 'solid-js';
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import {
  GreetService
} from "./greet/v1/greet_connectweb"

import styles from './App.module.css';

const transport = createConnectTransport({
  baseUrl: "/",
});

const client = createPromiseClient(GreetService, transport);

async function greeter(name: string) {
  return client.greet({name});
}

const App: Component = () => {
  const [name, setName] = createSignal("bob");
  const [greet] = createResource(name, greeter);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input
          placeholder="名前を入れてね"
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <p>greeting: {greet()?.greeting}</p>
      </header>
    </div>
  );
};

export default App;
