import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
// import { nomennescio_backend } from "../../declarations/nomennescio_backend";
import Authentication from './pages/Authentication';

function App() {
  // const [greeting, setGreeting] = useState("");

  // function handleSubmit(event: any) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   nomennescio_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <Box className='w-screen h-screen bg-green-300'>
      <Authentication />
      {/* <Sidebar />  */}
      {/* <TextField placeholder="input your username"></TextField> */}
    </Box>
  );
}

export default App;
