package com.betsoft.kalkulator.business.order;

import com.betsoft.kalkulator.business.steps.definitions.circle_def.CircleDef;
import com.betsoft.kalkulator.business.steps.definitions.ending.EndingDef;
import com.betsoft.kalkulator.business.steps.definitions.ending_second_rod.EndingSecondRodDef;
import com.betsoft.kalkulator.business.steps.definitions.rod_length_def.RodLengthDef;
import com.betsoft.kalkulator.business.steps.definitions.support_def.SupportDef;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;


@RunWith(MockitoJUnitRunner.class)
public class SingleOrderTest {

    @InjectMocks
    private SingleOrder singleOrder;
    @Mock
    private RodLengthDef rodLengthDef;
    @Mock
    private SupportDef supportDef;
    @Mock
    private EndingDef endingDef;
    @Mock
    private EndingSecondRodDef endingDef2;
    @Mock
    private CircleDef circleDef;

    @Before
    public void init() {
        Mockito.when(rodLengthDef.getPrice()).thenReturn(26.0);
        Mockito.when(supportDef.getPrice()).thenReturn(8.0);
        Mockito.when(endingDef.getPrice()).thenReturn(12.0);
        Mockito.when(endingDef2.getPrice()).thenReturn(10.0);
        Mockito.when(circleDef.getPrice()).thenReturn(12.0);
        singleOrder.setSupportCount(1L);
        singleOrder.setEndingCount(1L);
        singleOrder.setEnding2Count(1L);
    }

    @Test
    public void when_RodCountIs1_Expect_calculatedPriceIs68() {
        singleOrder.setRodCount(1L);
        assertEquals(68, singleOrder.calculatePrice(), 0.000001);
    }

    @Test
    public void when_RodCountIs2_Expect_calculatedPriceIs94() {
        singleOrder.setRodCount(2L);
        assertEquals(94, singleOrder.calculatePrice(), 0.000001);
    }

    @Test
    public void when_endingDef2IsNull_Expect_calculatedPriceIs() {
        singleOrder.setRodCount(1L);
        singleOrder.setEndingDef2(null);

        assertEquals(58, singleOrder.calculatePrice(), 0.000001);
    }

}
