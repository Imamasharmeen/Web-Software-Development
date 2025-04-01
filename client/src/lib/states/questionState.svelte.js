let questionState = $state([]);

const useQuestionState = () => {
  return {
    get questions() {
      return questionState;
    },
    add: (question) => {
      questionState.push(question);
    },
    remove: (id) => {
      questionState = questionState.filter((q) => q.id !== id);
    },
    upvote: (id) => {
      const question = questionState.find((q) => q.id === id);
      if (question) question.upvotes += 1;
    },
  };
};

export { useQuestionState };