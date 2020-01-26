package com.betsoft.kalkulator.business.steps.definitions.circle_def;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;
import java.util.Set;

@RepositoryRestResource
public interface CircleDefRepository extends JpaRepository<CircleDef, Long> {
    Optional<Set<CircleDef>> findByProductGroupDefAndColorDef(ProductGroupDef productGroupDef, ColorDef colorDef);
}
