<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();
  
    const addQuestion = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const question = Object.fromEntries(formData);
      question.id = crypto.randomUUID();
      question.upvotes = 0; // প্রাথমিকভাবে ০ আপভোট
      questionState.add(question);
      e.target.reset();
    };
  </script>
  
  <form onsubmit={addQuestion}>
    <label for="title">Title</label>
    <input id="title" name="title" type="text" placeholder="Enter question title" />
    <label for="text">Text</label>
    <textarea id="text" name="text" placeholder="Enter question text"></textarea>
    <input type="submit" value="Add Question" />
  </form>