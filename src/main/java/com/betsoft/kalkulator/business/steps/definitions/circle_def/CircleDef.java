package com.betsoft.kalkulator.business.steps.definitions.circle_def;

import com.betsoft.kalkulator.business.steps.definitions.color_def.ColorDef;
import com.betsoft.kalkulator.business.steps.definitions.product_group_def.ProductGroupDef;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Getter
@Setter
@Entity
@ToString
@Audited
public class CircleDef {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;

    private Double price;

    @ManyToOne(targetEntity = ColorDef.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "COLOR_ID")
    @JsonIgnore
    private ColorDef colorDef;

    @ManyToOne(targetEntity = ProductGroupDef.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_GROUP_ID")
    @JsonIgnore
    private ProductGroupDef productGroupDef;
}
