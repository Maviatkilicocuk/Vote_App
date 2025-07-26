import { gql } from "@apollo/client";

export const NEW_QUESTIONS_MUTATION = gql`
mutation newQuestion ($input: questions_insert_input!) {
  insert_questions_one(object: $input) {
    title
    id
  }
}
`;
