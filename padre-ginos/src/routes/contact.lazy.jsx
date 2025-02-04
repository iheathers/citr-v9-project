import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  function handlePostContact(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    return postContact(
      formData.get("name"),
      formData.get("email"),
      formData.get("message"),
    );
  }

  const mutation = useMutation({
    mutationFn: handlePostContact,
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted!</h3>
      ) : (
        <>
          <form onSubmit={mutation.mutate}>
            <input name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <textarea placeholder="Message" name="message"></textarea>
            <button>Submit</button>
          </form>
          {mutation.isError ? <p> Error</p> : null}
        </>
      )}
    </div>
  );
}
