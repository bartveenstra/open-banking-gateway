package de.adorsys.opba.protocol.xs2a.service.xs2a.consent.authenticate;

import com.google.common.collect.ImmutableMap;
import de.adorsys.opba.db.domain.entity.Consent;
import de.adorsys.opba.db.domain.entity.sessions.ServiceSession;
import de.adorsys.opba.db.repository.jpa.ConsentRepository;
import de.adorsys.opba.protocol.xs2a.config.flowable.Xs2aObjectMapper;
import de.adorsys.opba.protocol.xs2a.service.ValidatedExecution;
import de.adorsys.opba.protocol.xs2a.service.xs2a.context.Xs2aContext;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.flowable.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service("xs2aPersistConsentId")
@RequiredArgsConstructor
public class Xs2aPersistConsentId extends ValidatedExecution<Xs2aContext> {

    private final ConsentRepository consents;
    private final EntityManager entityManager;

    private final Xs2aObjectMapper mapper;

    @SneakyThrows
    @Override
    @Transactional
    protected void doRealExecution(DelegateExecution execution, Xs2aContext context) {
        Consent consent = Consent.builder()
            .serviceSession(entityManager.find(ServiceSession.class, context.getServiceSessionId()))
            .consentCode(context.getConsentId())
            .context(mapper.getMapper().writeValueAsString(
                ImmutableMap.of(
                    context.getClass().getCanonicalName(),
                    context
                )))
            .build();
        consents.save(consent);
    }
}
