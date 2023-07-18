// src/routes/notes/updateNote.jsx
export async function action({ params, request }) {
  const formData = await request.formData();
  const response = await fetch(`/api/notes/${params.noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  return null;
}