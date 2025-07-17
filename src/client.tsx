import { createRoot } from "react-dom/client";
import NotificationButton from "./components/NotificationButton";

const islands = { NotificationButton };

document.querySelectorAll("[data-island]").forEach((el) => {
  const name = el.getAttribute("data-island");
  const props = JSON.parse(
    decodeURIComponent(el.getAttribute("data-props") || "{}")
  );
  const Component = islands[name];
  if (Component) {
    createRoot(el).render(<Component {...props} />);
  }
});
