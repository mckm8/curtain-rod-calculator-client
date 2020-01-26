package com.betsoft.kalkulator.business.steps.definitions.color_def;

import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDefRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(path = "/colorDefs")
public class ColorDefRestController {

    private ColorDefRepository colorDefRepository;
    private ProductGroupDefRepository productGroupDefRepository;

    public ColorDefRestController(ColorDefRepository colorDefRepository, ProductGroupDefRepository productGroupDefRepository) {
        this.colorDefRepository = colorDefRepository;
        this.productGroupDefRepository = productGroupDefRepository;
    }

    @GetMapping
    @RequestMapping(path = "/byProductGroupName")
    public ResponseEntity getByProductGroup(@RequestParam("productgroupname") String name) {
        if (Objects.nonNull(name)){
            Optional<ProductGroupDef> byId = productGroupDefRepository.findByName(name);
            if (byId.isPresent()) {
                Set<ColorDef> byProductGroupDefs = colorDefRepository.findByProductGroupDefs(Collections.singleton(byId.get()));
                return ResponseEntity.ok(byProductGroupDefs);
            }
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @RequestMapping(path = "/byProductGroupId")
    public ResponseEntity getByProductGroupId(@RequestParam("productgroupid") Long id) {
        if (Objects.nonNull(id)){
            Optional<ProductGroupDef> byId = productGroupDefRepository.findById(id);
            if (byId.isPresent()) {
                Set<ColorDef> byProductGroupDefs = colorDefRepository.findByProductGroupDefs(Collections.singleton(byId.get()));
                return ResponseEntity.ok(byProductGroupDefs);
            }
        }
        return ResponseEntity.noContent().build();
    }
}

