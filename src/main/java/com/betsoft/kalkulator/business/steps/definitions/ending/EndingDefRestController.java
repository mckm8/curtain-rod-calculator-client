package com.betsoft.kalkulator.business.steps.definitions.ending;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDefRepository;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import com.betsoft.kalkulator.business.steps.definitions.support_def.SupportDef;
import com.betsoft.kalkulator.business.steps.definitions.support_def.SupportDefRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/endingDefs")
public class EndingDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private EndingDefRepository endingDefRepository;

    public EndingDefRestController(ColorDefRepository colorDefRepository, ProductGroupDefRepository productGroupDefRepository, EndingDefRepository endingDefRepository) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.endingDefRepository = endingDefRepository;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<EndingDef>> byProductGroupDefAndColorDef = endingDefRepository.findByProductGroupDefAndColorDef(productGroup.get(), color.get());
            if (byProductGroupDefAndColorDef.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefAndColorDef.get());
            }
        }
        return ResponseEntity.noContent().build();
    }
}
