/**
 * Open Banking Gateway FinTech Example API
 * This is a sample API that shows how to develop FinTech use cases that invoke banking APIs.  #### User Agent and Cookies This Api assumes  * that the PsuUserAgent (hosting the FinTechUI) is a modern web browser that stores httpOnly cookies sent with the redirect under the given domain and path as defined by [RFC 6265](https://tools.ietf.org/html/rfc6265). * that any other PsuUserAgent like a native mobile or a desktop application can simulate this same behavior of a modern browser with respect to Cookies.  #### SessionCookies and XSRF After a PSU is authenticated with the FinTech environment (either through the simple login interface defined here, or through an identity provider), the FinTechApi will establish a session with the FinTechUI. This is done by the mean of using a cookie called SessionCookie. This SessionCookie is protected by a corresponding xsrfToken. The response that sets a SessionCookie also carries a corresponding xsrfToken in the response header named \"X-XSRF-TOKEN\".  It is the responsibility of the FinTechUI to : * parse and store this xsrfToken so that a refresh of a browser window can work. This shall be done using user agent capabilities.  A web browser application might decide to store the xsrfToken in the browser localStorage, as the cookie we set are all considered persistent. * make sure that each subsequent request that is carrying the SessionCookie also carries the corresponding xsrfToken as header field (see the request path). * remove this xsrfToken from the localStorage when the corresponding SessionCookie is deleted by a server response (setting cookie value to null).  The main difference between an xsrfToken and a SessionCookie is that the sessionCookie is automatically sent with each matching request. The xsrfToken must be explicitely read and sent by application.  #### API- vs. UI-Redirection For simplicity, this Framework is designed to redirect to FinTechUI not to FinTechApi.  #### Explicite vs. Implicite Redirection We define an \"Implicite redirection\" a case where a web browser react to 30X reponse and automatically redirects to the attached endpoint. We define an \"Explicite Redirection\" as a case where the UI-Application reacts to a 20X response, explicitely parses the attached __Location__ header an uses it to reload  the new page in the browser window (or start the new UI-Application in case of native apps).  This framework advocates for explicite redirection passing a __20X__ response to the FinTechUI toghether with the __Location__ parameter.  Processing a response that initiates a redirect, the FinTechUI makes sure following happens, * that the exisitng __SessionCookie__ is deleted, as the user will not have a chance for an explicite logout, * that the corresponding xsrfToken is deleted from the local storage, * that a RedirectCookie set is stored (in case UI is not a web browser), so the user can be authenticated against it when sent back to the FinTechUI. The expiration of the RedirectCookie shall be set to the expected duration of the redirect, * that the corresponding xsrfToken is stored in the local storage (under the same cookie path as the RedirectCookie)  #### Redirecting to the ConsentAuthorisationApi For a redirection to the ConsentAuthorisationApi, a generated AUTH-ID is added to the cookie path and used to distinguish authorization processes from each order.  This information (AUTH-ID) must be contained in the back redirect url sent to the ConsentAuthorisationApi in the back channel, so that the FinTechUI can invoke the correct code2Token endpoint when activated.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParameterCodec, HttpParams, HttpResponse} from '@angular/common/http';
import {CustomHttpParameterCodec} from '../encoder';
import {Observable} from 'rxjs';

import {AccountList} from '../model/accountList';
import {TransactionsResponse} from '../model/transactionsResponse';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class FinTechAccountInformationService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Provides list of available accounts for the given bank
     * Read the identifiers of the available payment accounts.  If required by the bank, PSU consent will be obtained before returning the list of bank accounts.  Returns all identifiers of the accounts, to which an account access has been granted to by the PSU. In addition, relevant information about the accounts and hyperlinks to corresponding account information resources are provided if a related consent has been already granted.
     * @param bankId
     * @param xRequestID Unique ID that identifies this request through common workflow. Must be contained in HTTP Response as well.
     * @param X_XSRF_TOKEN XSRF parameter used to validate a SessionCookie or RedirectCookie.
     * @param fintechRedirectURLOK
     * @param fintechRedirectURLNOK
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public aisAccountsGET(bankId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, observe?: 'body', reportProgress?: boolean): Observable<AccountList>;
    public aisAccountsGET(bankId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AccountList>>;
    public aisAccountsGET(bankId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AccountList>>;
    public aisAccountsGET(bankId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (bankId === null || bankId === undefined) {
            throw new Error('Required parameter bankId was null or undefined when calling aisAccountsGET.');
        }
        if (xRequestID === null || xRequestID === undefined) {
            throw new Error('Required parameter xRequestID was null or undefined when calling aisAccountsGET.');
        }
        if (X_XSRF_TOKEN === null || X_XSRF_TOKEN === undefined) {
            throw new Error('Required parameter X_XSRF_TOKEN was null or undefined when calling aisAccountsGET.');
        }
        if (fintechRedirectURLOK === null || fintechRedirectURLOK === undefined) {
            throw new Error('Required parameter fintechRedirectURLOK was null or undefined when calling aisAccountsGET.');
        }
        if (fintechRedirectURLNOK === null || fintechRedirectURLNOK === undefined) {
            throw new Error('Required parameter fintechRedirectURLNOK was null or undefined when calling aisAccountsGET.');
        }

        let headers = this.defaultHeaders;
        if (xRequestID !== undefined && xRequestID !== null) {
            headers = headers.set('X-Request-ID', String(xRequestID));
        }
        if (X_XSRF_TOKEN !== undefined && X_XSRF_TOKEN !== null) {
            headers = headers.set('X-XSRF-TOKEN', String(X_XSRF_TOKEN));
        }
        if (fintechRedirectURLOK !== undefined && fintechRedirectURLOK !== null) {
            headers = headers.set('Fintech-Redirect-URL-OK', String(fintechRedirectURLOK));
        }
        if (fintechRedirectURLNOK !== undefined && fintechRedirectURLNOK !== null) {
            headers = headers.set('Fintech-Redirect-URL-NOK', String(fintechRedirectURLNOK));
        }

        // authentication (sessionCookie) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<AccountList>(`${this.configuration.basePath}/v1/ais/banks/${encodeURIComponent(String(bankId))}/accounts`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns the list of transactions of the given account
     * Returns the list of transactions of the given account.
     * @param bankId
     * @param accountId
     * @param xRequestID Unique ID that identifies this request through common workflow. Must be contained in HTTP Response as well.
     * @param X_XSRF_TOKEN XSRF parameter used to validate a SessionCookie or RedirectCookie.
     * @param fintechRedirectURLOK
     * @param fintechRedirectURLNOK
     * @param dateFrom Conditional: Starting date (inclusive the date dateFrom) of the transaction list, mandated if no delta access is required.  For booked transactions, the relevant date is the booking date.  For pending transactions, the relevant date is the entry date, which may not be transparent neither in this API nor other channels of the ASPSP.
     * @param dateTo End date (inclusive the data dateTo) of the transaction list, default is \&quot;now\&quot; if not given.  Might be ignored if a delta function is used.  For booked transactions, the relevant date is the booking date.  For pending transactions, the relevant date is the entry date, which may not be transparent neither in this API nor other channels of the ASPSP.
     * @param entryReferenceFrom This data attribute is indicating that the AISP is in favour to get all transactions after the transaction with identification entryReferenceFrom alternatively to the above defined period. This is a implementation of a delta access. If this data element is contained, the entries \&quot;dateFrom\&quot; and \&quot;dateTo\&quot; might be ignored by the ASPSP if a delta report is supported.  Optional if supported by API provider.
     * @param bookingStatus Permitted codes are   * \&quot;booked\&quot;,   * \&quot;pending\&quot; and   * \&quot;both\&quot; To support the \&quot;pending\&quot; and \&quot;both\&quot; feature is optional for the ASPSP, Error code if not supported in the online banking frontend Default is \&quot;booked\&quot;
     * @param deltaList This data attribute is indicating that the AISP is in favour to get all transactions after the last report access for this PSU on the addressed account. This is another implementation of a delta access-report.  This delta indicator might be rejected by the ASPSP if this function is not supported.  Optional if supported by API provider
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public aisTransactionsGET(bankId: string, accountId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, dateFrom?: string, dateTo?: string, entryReferenceFrom?: string, bookingStatus?: 'booked' | 'pending' | 'both', deltaList?: boolean, observe?: 'body', reportProgress?: boolean): Observable<TransactionsResponse>;
    public aisTransactionsGET(bankId: string, accountId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, dateFrom?: string, dateTo?: string, entryReferenceFrom?: string, bookingStatus?: 'booked' | 'pending' | 'both', deltaList?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TransactionsResponse>>;
    public aisTransactionsGET(bankId: string, accountId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, dateFrom?: string, dateTo?: string, entryReferenceFrom?: string, bookingStatus?: 'booked' | 'pending' | 'both', deltaList?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TransactionsResponse>>;
    public aisTransactionsGET(bankId: string, accountId: string, xRequestID: string, X_XSRF_TOKEN: string, fintechRedirectURLOK: string, fintechRedirectURLNOK: string, dateFrom?: string, dateTo?: string, entryReferenceFrom?: string, bookingStatus?: 'booked' | 'pending' | 'both', deltaList?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (bankId === null || bankId === undefined) {
            throw new Error('Required parameter bankId was null or undefined when calling aisTransactionsGET.');
        }
        if (accountId === null || accountId === undefined) {
            throw new Error('Required parameter accountId was null or undefined when calling aisTransactionsGET.');
        }
        if (xRequestID === null || xRequestID === undefined) {
            throw new Error('Required parameter xRequestID was null or undefined when calling aisTransactionsGET.');
        }
        if (X_XSRF_TOKEN === null || X_XSRF_TOKEN === undefined) {
            throw new Error('Required parameter X_XSRF_TOKEN was null or undefined when calling aisTransactionsGET.');
        }
        if (fintechRedirectURLOK === null || fintechRedirectURLOK === undefined) {
            throw new Error('Required parameter fintechRedirectURLOK was null or undefined when calling aisTransactionsGET.');
        }
        if (fintechRedirectURLNOK === null || fintechRedirectURLNOK === undefined) {
            throw new Error('Required parameter fintechRedirectURLNOK was null or undefined when calling aisTransactionsGET.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom);
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo);
        }
        if (entryReferenceFrom !== undefined && entryReferenceFrom !== null) {
            queryParameters = queryParameters.set('entryReferenceFrom', <any>entryReferenceFrom);
        }
        if (bookingStatus !== undefined && bookingStatus !== null) {
            queryParameters = queryParameters.set('bookingStatus', <any>bookingStatus);
        }
        if (deltaList !== undefined && deltaList !== null) {
            queryParameters = queryParameters.set('deltaList', <any>deltaList);
        }

        let headers = this.defaultHeaders;
        if (xRequestID !== undefined && xRequestID !== null) {
            headers = headers.set('X-Request-ID', String(xRequestID));
        }
        if (X_XSRF_TOKEN !== undefined && X_XSRF_TOKEN !== null) {
            headers = headers.set('X-XSRF-TOKEN', String(X_XSRF_TOKEN));
        }
        if (fintechRedirectURLOK !== undefined && fintechRedirectURLOK !== null) {
            headers = headers.set('Fintech-Redirect-URL-OK', String(fintechRedirectURLOK));
        }
        if (fintechRedirectURLNOK !== undefined && fintechRedirectURLNOK !== null) {
            headers = headers.set('Fintech-Redirect-URL-NOK', String(fintechRedirectURLNOK));
        }

        // authentication (sessionCookie) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<TransactionsResponse>(`${this.configuration.basePath}/v1/ais/banks/${encodeURIComponent(String(bankId))}/accounts/${encodeURIComponent(String(accountId))}/transactions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
