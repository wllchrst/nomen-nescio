import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { nomennescio_backend } from "../../declarations/nomennescio_backend";

function App() {
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    nomennescio_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <Box p={6} textAlign="center" bg="gray.50" borderRadius="md" boxShadow="md">
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit" className="bg-blue-500">
          Click Me!
        </button>
      </form>
      <section id="greeting">{greeting}</section>
    </Box>
  );
}

export default App;
