package com.betsoft.kalkulator.business.steps.definitions.circle_def;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDefRepository;
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
@RequestMapping(path = "/circleDefs")
public class CircleDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;
    private CircleDefRepository circleDefRepository;

    public CircleDefRestController(ColorDefRepository colorDefRepository
            , ProductGroupDefRepository productGroupDefRepository
            , CircleDefRepository circleDefRepository) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
        this.circleDefRepository = circleDefRepository;
    }

    @SuppressWarnings("Duplicates")
    @GetMapping
    @RequestMapping(path = "/byProductGroupIdAndColorId")
    public ResponseEntity getbyProductGroupIdAndColorId(@RequestParam("productgroupid") Long productGroupId, @RequestParam("colorid") Long colorId) {
        Optional<ProductGroupDef> productGroup = productGroupDefRepository.findById(productGroupId);
        Optional<ColorDef> color = colorDefRepository.findById(colorId);
        if (productGroup.isPresent() && color.isPresent()) {
            Optional<Set<CircleDef>> byProductGroupDefsAndColorDefs = circleDefRepository.findByProductGroupDefAndColorDef(productGroup.get(), color.get());
            if (byProductGroupDefsAndColorDefs.isPresent()) {
                return ResponseEntity.ok(byProductGroupDefsAndColorDefs.get());
            }
        }
        return ResponseEntity.noContent().build();
    }
}
