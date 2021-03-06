package de.adorsys.opba.starter;

import de.adorsys.opba.protocol.bpmnshared.config.flowable.FlowableObjectMapper;
import de.adorsys.opba.protocol.xs2a.context.Xs2aContext;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

/**
 * Validates entire embedded application.
 */
@ActiveProfiles("test")
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@SpringBootTest(classes = OpenBankingEmbeddedApplication.class, webEnvironment = RANDOM_PORT)
public class Xs2aSensitiveDataTest {

    @Autowired
    private FlowableObjectMapper mapper;

    @Test
    @SneakyThrows
    void testPsuPasswordNotSerialized() {
        Xs2aContext context = new Xs2aContext();
        context.setRequestScoped(new RequestScopedStub());
        context.setSagaId("1234");
        context.setPsuPassword("PASSWORD");

        assertThat(mapper.writeValueAsString(context)).doesNotContain("psuPassword");
        assertThat(mapper.writeValueAsString(context)).doesNotContain("PASSWORD");
    }

    @Test
    @SneakyThrows
    void testLastScaChallengeNotSerialized() {
        Xs2aContext context = new Xs2aContext();
        context.setRequestScoped(new RequestScopedStub());
        context.setSagaId("1234");
        context.setLastScaChallenge("Challenge!");

        assertThat(mapper.writeValueAsString(context)).doesNotContain("lastScaChallenge");
        assertThat(mapper.writeValueAsString(context)).doesNotContain("Challenge!");
    }
}


