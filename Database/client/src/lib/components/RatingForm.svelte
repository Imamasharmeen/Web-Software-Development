<script>
  export let bookId;
  let rating = 1;
  let feedback = "";

  async function submitRating() {
    const response = await fetch(`/books/${bookId}/ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, feedback: feedback || undefined }),
    });
    const result = await response.json();
    console.log("Rating created:", result);
  }
</script>

<div>
  <h2>Rate Book {bookId}</h2>
  <form on:submit|preventDefault={submitRating}>
    <label>
      Rating (1-5):
      <input type="number" min="1" max="5" bind:value={rating} />
    </label>
    <label>
      Feedback (optional):
      <textarea bind:value={feedback}></textarea>
    </label>
    <button type="submit">Submit Rating</button>
  </form>
</div>