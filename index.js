'use strict';

const makeError = (
  name,
  code,
  _statusCode,
  _message,
  internalMessage
) => args => {

  const {
    statusCode     = _statusCode,
    message        = _message,
    messageContext = '',
    debug          = {}
  } = args || {};

  return {
    name,
    code,
    statusCode,
    isAppError : true,
    message    : message + (messageContext && ': ' + messageContext),
    debug      : {
      internalMessage,
      ...debug
    }
  };
};

const errors = {
  system : {
    UNCAUGHT      : makeError('SYSTEM.UNCAUGHT', 9999, 501, 'System hiccup! We have been alerted and will be resolving the issue as soon as we can', ''),
    NETWORK       : makeError('SYSTEM.NETWORK', 9001, 501, 'System hiccup! We have been alerted and will be resolving the issue as soon as we can', ''),
    CONFIGURATION : makeError('SYSTEM.CONFIGURATION', 9002, 501, 'System hiccup! We have been alerted and will be resolving the issue as soon as we can', 'The application is mis-configured')
  },

  auth : {
    UNAUTHORIZED_API_ACCESS        : makeError('AUTH.UNAUTHORIZED_API_ACCESS', 5000, 401, 'Unauthorized', 'Unauthorized API access'),
    FLAGGED_ITEM                   : makeError('AUTH.FLAGGED_ITEM', 5001, 200, 'Resource has been flagged for administration', ''),
    TOKEN_INVALID                  : makeError('AUTH.TOKEN_INVALID', 5002, 401, 'Permission denied', 'Invalid auth token'),
    TOKEN_EXPIRED                  : makeError('AUTH.TOKEN_EXPIRED', 5003, 401, 'Permission denied', 'Expired auth token'),
    FORBIDDEN_API_ACCESS           : makeError('AUTH.FORBIDDEN_API_ACCESS', 5004, 403, 'Permission denied', 'Forbidden API access'),
    MISSING_REFRESH_TOKEN_PAYLOAD  : makeError('AUTH.MISSING_REFRESH_TOKEN_PAYLOAD', 5005, 401, 'Permission denied', 'Missing refresh token payload'),
    MISSING_REFRESH_TOKEN_SECRET   : makeError('AUTH.MISSING_REFRESH_TOKEN_SECRET', 5006, 401, 'Permission denied', 'Missing refresh token secret'),
    MISSING_REQ                    : makeError('AUTH.MISSING_REQ', 5007, 401, 'Permission denied', 'Missing req, can not get token from header or query string'),
    CANNOT_SIGN_TOKEN              : makeError('AUTH.CANNOT_SIGN_TOKEN', 5008, 401, 'Permission denied', 'Could not sign token'),
    INVALID_CREDENTIALS            : makeError('AUTH.INVALID_CREDENTIALS', 5009, 200, 'Invalid credentials', 'Invalid credentials'),
    USER_ACCOUNT_EXPIRED           : makeError('AUTH.USER_ACCOUNT_EXPIRED', 5010, 200, 'Permission denied', 'User account has expired'),
    USER_ACCOUNT_LOCKED            : makeError('AUTH.USER_ACCOUNT_LOCKED', 5011, 200, 'Permission denied', 'User account is locked out'),
    USER_REQUIRES_MFA              : makeError('AUTH.USER_REQUIRES_MFA', 5012, 200, 'Permission denied', 'User requires mfa'),
    USER_MFA_TOKEN_INVALID         : makeError('AUTH.USER_MFA_TOKEN_INVALID', 5013, 401, 'Permission denied', 'User mfa token invalid'),
    MISSING_TRANSFER_TOKEN_PAYLOAD : makeError('AUTH.MISSING_TRANSFER_TOKEN_PAYLOAD', 5014, 401, 'Permission denied', 'Missing transfer token payload'),
    REFRESH_TOKEN_INVALID          : makeError('AUTH.REFRESH_TOKEN_INVALID', 5015, 401, 'Permission denied', 'Invalid refresh token'),
    REFRESH_TOKEN_EXPIRED          : makeError('AUTH.REFRESH_TOKEN_EXPIRED', 5016, 401, 'Permission denied', 'Expired refresh token'),
    TRANSFER_TOKEN_INVALID         : makeError('AUTH.TRANSFER_TOKEN_INVALID', 5017, 401, 'Permission denied', 'Invalid transfer token'),
    TRANSFER_TOKEN_EXPIRED         : makeError('AUTH.TRANSFER_TOKEN_EXPIRED', 5018, 401, 'Permission denied', 'Expired transfer token'),
    UNSUPPORTED_STRATEGY           : makeError('AUTH.UNSUPPORTED_STRATEGY', 5019, 401, 'Permission denied', 'Unsupported auth strategy'),
    UNAUTHORIZED_IP_ADDRESS        : makeError('AUTH.UNAUTHORIZED_IP_ADDRESS', 5020, 401, 'Permission denied', 'Unauthorized IP address'),
    SAML_ERROR                     : makeError('AUTH.SAML_ERROR', 5021, 501, 'System error', 'Error on SAML authentication process'),
    OIDC_ERROR                     : makeError('AUTH.OIDC_ERROR', 5022, 501, 'System error', 'Error on OIDC authentication process'),
    UNKNOWN_OIDC_ISSUER            : makeError('AUTH.UNKNOWN_OIDC_ISSUER', 5023, 501, 'System error', 'Unknown OIDC issuer')
  },

  db : {
    NO_QUERY_RESULTS   : makeError('DB.NO_QUERY_RESULTS', 6000, 200, 'No results', 'No db query results'),
    NO_DB_CONNECTION   : makeError('DB.NO_DB_CONNECTION', 6001, 501, 'System error, please check back later', 'Cannot connect to MySQL. Make sure the database is running'),
    DUPLICATE          : makeError('DB.DUPLICATE', 6002, 409, 'Already exists', 'Duplicate row error'),
    ACCESS_DENIED      : makeError('DB.ACCESS_DENIED', 6003, 501, 'Access denied', 'There was a problem establishing a database connection.'),
    UNKNOWN            : makeError('DB.UNKNOWN', 6999, 501, 'System error', 'Unknown MySQL error'),
    MISSING_CONNECTION : makeError('DB.MISSING_CONNECTION', 6998, 501, 'System error', 'There was a problem establishing a database connection. This is likely an application error and not a MySQL error')
  },

  files : {
    UNSUPPORTED_TYPE                        : makeError('FILES.UNSUPPORTED_TYPE', 8000, 415, 'Unsupported file type', 'Unsupported file type'),
    TOO_LARGE                               : makeError('FILES.TOO_LARGE', 8001, 413, 'File too large', 'File too large'),
    UNSUPPORTED_FILE_EXTENSION              : makeError('FILES.UNSUPPORTED_FILE_EXTENSION', 8002, 415, 'Unsupported file extension', 'Unsupported file extension'),
    UPLOAD_CANCELLED                        : makeError('FILES.UPLOAD_CANCELLED', 8003, 400, 'User cancelled upload', 'User cancelled upload'),
    VARIANT_CREATION_FAILURE                : makeError('MEDIA_FILE.VARIANT_CREATION_FAILURE', 8004, 400, 'Failed to create variant', 'Failed to create variant'),
    VARIANT_CREATION_FAILURE_PROCESS_KILLED : makeError('MEDIA_FILE.VARIANT_CREATION_FAILURE_PROCESS_KILLED', 8005, 400, 'Process to create media asset variant killed.  The uploaded file is likely too large', ''),
    DUPLICATE_FILE_FOUND                    : makeError('MEDIA_FILE.DUPLICATE_FILE_FOUND', 8006, 400, 'A file by that name in that language already has been added to this order. Please delete the file and try again.', ''),
    INVALID_MIME_TYPE                       : makeError('MEDIA_FILE.INVALID_MIME_TYPE', 8007, 400, 'The role %s does not allow files of type %s. Please try again with another file.', ''),
    PRESIGNED_URL_CREATION_FAILED           : makeError('MEDIA_FILE.PRESIGNED_URL_CREATION_FAILED', 8008, 400, 'There was an error while generating a pre-signed url for your file. Please try again.', '')
  },

  validation : {
    REQUIRED    : makeError('VALIDATION.REQUIRED', 7000, 400, 'Missing required property', 'Missing required property'),
    UNSUPPORTED : makeError('VALIDATION.UNSUPPORTED', 7001, 400, 'Unsupported property', 'Unsupported property'),
    VALUE       : makeError('VALIDATION.VALUE', 7002, 400, 'Illegal value for property', 'Illegal value for property')
  },

  security : {
    VIRUS_SCAN_FAILED   : makeError('SECURITY.VIRUS_SCAN_FAILED', 10000, 400, 'Uploaded file failed virus scanning', ''),
    REQUEST_ID_MISMATCH : makeError('SECURITY.REQUEST_ID_MISMATCH', 10001, 400, 'Provided x-request-id request header did not match the echoed response header.', 'Possible api response caching, check Akamai or Nginx immediately')
  }
};

const error = o => {
  let err = new Error();
  Object.getOwnPropertyNames(o).map(k => err[k] = o[k]);
  return err;
};

module.exports = {
  errors,
  error,
  makeError
};
