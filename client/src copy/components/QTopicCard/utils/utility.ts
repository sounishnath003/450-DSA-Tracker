export function findPercentageCompleted(
  totalQuestions: number,
  doneQuestions: number
) {
  return Math.round((doneQuestions / totalQuestions) * 100);
}
