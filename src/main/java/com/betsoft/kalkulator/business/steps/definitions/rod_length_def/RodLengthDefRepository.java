package com.betsoft.kalkulator.business.steps.definitions.rod_length_def;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;
import java.util.Set;

@RepositoryRestResource
public interface RodLengthDefRepository extends JpaRepository<RodLengthDef, Long> {
    Optional<Set<RodLengthDef>> findByProductGroupDefAndColorDef(ProductGroupDef productGroupDef, ColorDef colorDef);
}
