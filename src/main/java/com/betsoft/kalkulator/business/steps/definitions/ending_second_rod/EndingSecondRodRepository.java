package com.betsoft.kalkulator.business.steps.definitions.ending_second_rod;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;
import java.util.Set;

@RepositoryRestResource
public interface EndingSecondRodRepository extends JpaRepository<EndingSecondRodDef, Long> {
    Optional<Set<EndingSecondRodDef>> findByProductGroupDefAndColorDef(ProductGroupDef productGroupDef, ColorDef colorDef);
}
