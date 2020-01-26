package com.betsoft.kalkulator.business.steps.definitions.ending_second_rod;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDefRepository;
import com.betsoft.kalkulator.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/endingSecondRodDefs")
public class EndingSecondRodController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private EndingSecondRodRepository endingSecondRodRepository;

    public EndingSecondRodController(ColorDefRepository colorDefRepository,
                                     ProductGroupDefRepository productGroupDefRepository,
                                     EndingSecondRodRepository endingSecondRodRepository) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.endingSecondRodRepository = endingSecondRodRepository;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(
            @RequestParam("productgroupid") Long productGroupId,
            @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<EndingSecondRodDef>> byProductGroupDefAndColorDef = endingSecondRodRepository.findByProductGroupDefAndColorDef(productGroup.get(), color.get());
            if (byProductGroupDefAndColorDef.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefAndColorDef.get());
            }
        }
        return ResponseEntity.noContent().build();
    }
}

