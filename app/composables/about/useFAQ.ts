export const useFAQ = () => {
  // FAQ accordion state
  const openFaqIndex = ref(-1);

  const toggleFaq = (index: number) => {
    openFaqIndex.value = openFaqIndex.value === index ? -1 : index;
  };

  return {
    openFaqIndex,
    toggleFaq,
  };
};
