package com.betsoft.kalkulator.config;

import com.betsoft.kalkulator.business.order.SingleOrder;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
class RepositoryConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(
                SingleOrder.class,
                ProductGroupDef.class
                );
//        config.findRepositoryMappingForPath("")
    }
}