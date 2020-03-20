package de.adorsys.opba.protocol.xs2a.service.xs2a.dto;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.common.io.Resources;
import de.adorsys.opba.protocol.xs2a.service.xs2a.context.Xs2aContext;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = Xs2aWithBalanceParametersFromCtxTest.TestConfig.class)
public class Xs2aWithBalanceParametersFromCtxTest {
    public static final ObjectMapper JSON_MAPPER = new ObjectMapper()
                                                           .registerModule(new JavaTimeModule())
                                                           .enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    public static final String PATH_PREFIX = "mapper-test-fixtures/xs2a_with_balance_parameters_from_";

    @Autowired
    private Xs2aWithBalanceParameters.FromCtx mapper;

    @Test
    @SneakyThrows
    public void xs2aWithBalanceParametersFromCtxMapperTest() {
        // Given
        Xs2aContext mappingInput = getFromFile(PATH_PREFIX + "xs2a_consent_input.json", Xs2aContext.class);
        Xs2aWithBalanceParameters expected = getFromFile(PATH_PREFIX + "xs2a_consent_output.json", Xs2aWithBalanceParameters.class);

        // When
        Xs2aWithBalanceParameters actual = mapper.map(mappingInput);

        // Then
        assertThat(expected).isEqualToComparingFieldByFieldRecursively(actual);
    }

    @SneakyThrows
    private <T> T getFromFile(String path, Class<T> valueType) {
        return JSON_MAPPER.readValue(Resources.getResource(path), valueType);
    }

    @Configuration
    @ComponentScan(basePackages = "de.adorsys.opba.protocol.xs2a.service.mappers.generated")
    public static class TestConfig {
    }
}