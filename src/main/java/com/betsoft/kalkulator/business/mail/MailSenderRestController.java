package com.betsoft.kalkulator.business.mail;

import com.betsoft.kalkulator.business.order.SingleOrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/mail")
public class MailSenderRestController {

    private SingleOrderRepository singleOrderRepository;

    public MailSenderRestController(SingleOrderRepository singleOrderRepository) {
        this.singleOrderRepository = singleOrderRepository;
    }

    @GetMapping(path = "{orderId}")
    public ResponseEntity sendMail(@PathVariable("orderId") Long orderId){
        singleOrderRepository.findById(orderId).ifPresent(MailSender::sendMail);
        return ResponseEntity.ok().build();
    }

}
