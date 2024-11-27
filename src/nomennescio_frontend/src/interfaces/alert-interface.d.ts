interface IAlert {
  title: string;
  desc: string;
  type?: "success" | "error" | "warning" | "info";
  showAlert: boolean;
  closeAlert: () => void;
  isClosing: boolean;
}

export default IAlert;