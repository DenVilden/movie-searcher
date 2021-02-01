/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Error from "next/error";
import { ApolloError } from "@apollo/client";

type Props = {
  error: ApolloError;
};

const ErrorMessage = ({ error }: Props) => (
  <Error
    statusCode={
      error.graphQLErrors?.length
        ? error.graphQLErrors[0].extensions!.response.status
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          error.networkError!.statusCode
    }
    title={
      error.graphQLErrors?.length
        ? error.graphQLErrors[0].extensions!.response.statusText
        : error.networkError?.message
    }
  />
);

export default ErrorMessage;
