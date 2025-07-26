import { gql } from "@apollo/client";

export const QUESTIONS_SUBSCRIPTION = gql`
  subscription getQuestions {
    questions (order_by: { id: desc }){
      id
      title
    }
  }
`;
