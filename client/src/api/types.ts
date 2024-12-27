export type ApiError = {
  statusCode: number;
  message: string;
};

export type BadRequestApiError = {
  message: {
    property: string;
    constraints: Record<string, string>;
  }[];
} & ApiError;

export type QueryParams = object;
