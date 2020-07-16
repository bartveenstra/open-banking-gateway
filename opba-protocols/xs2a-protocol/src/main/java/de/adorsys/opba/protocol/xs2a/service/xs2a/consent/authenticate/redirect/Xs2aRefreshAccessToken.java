package de.adorsys.opba.protocol.xs2a.service.xs2a.consent.authenticate.redirect;

import de.adorsys.opba.protocol.xs2a.service.ContextUtil;
import de.adorsys.opba.protocol.xs2a.service.ValidatedExecution;
import de.adorsys.opba.protocol.xs2a.service.xs2a.context.Xs2aContext;
import de.adorsys.xs2a.adapter.service.Oauth2Service;
import de.adorsys.xs2a.adapter.service.model.TokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static de.adorsys.xs2a.adapter.service.RequestHeaders.PSU_ID;
import static de.adorsys.xs2a.adapter.service.RequestHeaders.X_GTW_ASPSP_ID;
import static de.adorsys.xs2a.adapter.service.RequestHeaders.X_REQUEST_ID;

@Service("xs2aRequestAccessToken")
@RequiredArgsConstructor
public class Xs2aRefreshAccessToken extends ValidatedExecution<Xs2aContext> {

    private final RuntimeService runtimeService;
    private final Oauth2Service oauth2Service;

    @Override
    protected void doRealExecution(DelegateExecution execution, Xs2aContext context) {
        String authorizationCode = context.getAuthorizationCode();

        Map<String, String> headers = new HashMap<>();
        headers.put(PSU_ID, context.getPsuId());
        headers.put(X_REQUEST_ID, context.getRequestId());
        headers.put(X_GTW_ASPSP_ID, context.getAspspId());

        Oauth2Service.Parameters parameters = new Oauth2Service.Parameters();
        parameters.setAuthorizationCode(authorizationCode);

        TokenResponse token = getTokenResponse(headers, parameters);

        int expiresInSeconds = Math.toIntExact(token.getExpiresInSeconds());

        LocalDateTime localDateTime = LocalDateTime.now().plusSeconds(expiresInSeconds);

        ContextUtil.getAndUpdateContext(
            execution,
            (Xs2aContext ctx) -> {
                ctx.setOauthTokenExpiration(localDateTime.toString());
                ctx.setOauthTokenResponse(token);
            }
        );
    }

    @SneakyThrows
    private TokenResponse getTokenResponse(Map<String, String> headers, Oauth2Service.Parameters parameters) {
        return oauth2Service.getToken(headers, parameters);
    }

    @Override
    protected void doMockedExecution(DelegateExecution execution, Xs2aContext context) {
        runtimeService.trigger(execution.getId());
    }

}
