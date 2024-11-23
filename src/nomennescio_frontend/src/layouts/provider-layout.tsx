import { UserContextProvider } from "../context/user-context";
import { IChildren } from "../interfaces/children-interface";

export default function ProviderLayout({ children }: IChildren) {
  return (
    <>
      <UserContextProvider>{children}</UserContextProvider>
    </>
  );
}
