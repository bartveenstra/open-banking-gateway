package de.adorsys.opba.api.security.external.domain;

import lombok.experimental.UtilityClass;

@UtilityClass
@SuppressWarnings("checkstyle:HideUtilityClassConstructor") //Checkstyle doesn't recognise Lombok
public class HttpHeaders {
    public static final String PSU_CONSENT_SESSION = "PSU-Consent-Session";
    public static final String SERVICE_SESSION_ID = "Service-Session-ID";
    public static final String AUTHORIZATION_SESSION_ID = "Authorization-Session-ID";
    public static final String REDIRECT_CODE = "Redirect-Code";
    public static final String X_REQUEST_ID = "X-Request-ID";
    public static final String COMPUTE_PSU_IP_ADDRESS = "Compute-PSU-IP-Address";
    public static final String BANK_ID = "Bank-ID";
    public static final String FINTECH_USER_ID = "Fintech-User-ID";
    public static final String FINTECH_REDIRECT_URL_OK = "Fintech-Redirect-URL-OK";
    public static final String FINTECH_REDIRECT_URL_NOK = "Fintech-Redirect-URL-NOK";

    public static final String X_TIMESTAMP_UTC = "X-Timestamp-UTC";
    public static final String X_OPERATION_TYPE = "X-Operation-Type";
    public static final String X_REQUEST_SIGNATURE = "X-Request-Signature";
    public static final String FINTECH_ID = "Fintech-ID";
    public static final String AUTHORIZATION_SESSION_KEY = "Authorization-Session-Key";
}
