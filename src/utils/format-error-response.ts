import { ErrorDetails, ErrorResponse } from "@/types/interfaces";

interface FormatErrorParams {
  status: string;
  code: string;
  statusCode: number;
  message: string;
  details: string | Record<string, string>;
  path: string;
  suggestion: string;
  requestId: string;
  documentationUrl?: string;
}
export const formatErrorResponse = ({
  status,
  statusCode,
  code,
  message,
  details,
  path,
  suggestion,
  requestId,
  documentationUrl = "https://api.example.com/docs/errors",
}: FormatErrorParams): ErrorResponse => {
  const errorDetails: ErrorDetails = {
    code,
    message,
    details,
    timestamp: new Date().toISOString(),
    path,
    suggestion,
  };

  return {
    status,
    statusCode,
    error: errorDetails,
    requestId,
    documentation_url: documentationUrl,
  };
};
