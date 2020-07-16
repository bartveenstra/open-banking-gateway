package de.adorsys.opba.protocol.xs2a.service.xs2a.consent.authenticate.redirect;

import de.adorsys.opba.protocol.xs2a.service.ContextUtil;
import de.adorsys.opba.protocol.xs2a.service.ValidatedExecution;
import de.adorsys.opba.protocol.xs2a.service.xs2a.context.Xs2aContext;
import de.adorsys.xs2a.adapter.service.Oauth2Service;
import de.adorsys.xs2a.adapter.service.model.TokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static de.adorsys.xs2a.adapter.service.RequestHeaders.PSU_ID;
import static de.adorsys.xs2a.adapter.service.RequestHeaders.X_GTW_ASPSP_ID;
import static de.adorsys.xs2a.adapter.service.RequestHeaders.X_REQUEST_ID;

@Service("xs2aRefreshAccessToken")
@RequiredArgsConstructor
@Slf4j
public class Xs2aRequestAccessToken extends ValidatedExecution<Xs2aContext> {

    private final RuntimeService runtimeService;
    private final Oauth2Service oauth2Service;

    @Override
    protected void doRealExecution(DelegateExecution execution, Xs2aContext context) {
        LocalDateTime expireDate = LocalDateTime.parse(context.getOauthTokenExpiration());
        if(expireDate.isAfter(LocalDateTime.now())) {
            log.info("Access token is expired. Requiring new access token");
            //TODO:  Refresh Access Token and persist in context!!
//            ContextUtil.getAndUpdateContext(
//                execution,
//                (Xs2aContext ctx) -> {
//                    ctx.setOauthTokenExpiration(localDateTime.toString());
//                    ctx.setOauthTokenResponse(token);
//                }
//            );
        } else {
            log.info("Access token is not expired. No refresh required");
        }
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
