export const ErrorResponse = {
  BAD_REQUEST: {
    statusCode: 400,
    message: 'Invalid Data',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error',
  },
  INVALID_INPUT_PARAMETERS: {
    statusCode: 400,
    message: 'Invalid input parameters',
  },
  ITEM_NOT_FOUND: {
    statusCode: 400,
    message: 'Item not found',
  },
  INVALID_TOKEN:{
    statusCode: 401,
    message: 'Token is invalid',
  },
  USER_UNAUTHORIZED:{
    statusCode: 401,
    message: 'User is unauthorized',
  }
}