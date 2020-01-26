package com.betsoft.kalkulator.business.mail;

import com.betsoft.kalkulator.business.order.SingleOrder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class MailSender {

    public static final String EMAIL_LABS_URL = "https://api.emaillabs.net.pl/api/new_sendmail";

    public static void sendMail(SingleOrder singleOrder) {
        try {
            String appKey = "appKey";
            String secretKey = "secret";

            String userpass = appKey + ":" + secretKey;
            String basicAuth = "Basic "
                    + javax.xml.bind.DatatypeConverter.printBase64Binary(userpass.getBytes(StandardCharsets.UTF_8));

            HashMap<String, String> emailContent = generateEmailContent(singleOrder);

            // build query
            StringBuilder query = new StringBuilder();
            boolean first = true;
            for (Map.Entry<String, String> entry : emailContent.entrySet()) {
                if (first)
                    first = false;
                else
                    query.append("&");
                query.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
                query.append("=");
                query.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
            }

            // setup connection
            URL url = new URL(EMAIL_LABS_URL);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Authorization", basicAuth);
            connection.setDoOutput(true);

            // send data
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
            out.write(query.toString());
            out.close();

            // read output
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static HashMap<String, String> generateEmailContent(SingleOrder singleOrder) {
        HashMap<String, String> params = new HashMap<>();
        params.put("smtp_account", "1.betsoft.smtp");
        params.put("subject", "Potwierdzenie kalkulacji karnisza nr " + singleOrder.getId() + " - instrukcja dalszego postępowania");
        params.put("html", "<h1>Podsumowanie zamówienia</h1>\n" +
                "<h2>Kalkulacja karnisza</h2>\n" +
                "<table>\n" +
                "    <tr>\n" +
                "        <td>Seria</td>\n" +
                "        <td><b>" + singleOrder.getProductGroupDef().getName() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>\n" +
                "            Długość\n" +
                "        </td>\n" +
                "        <td><b>" + singleOrder.getRodLengthDef().getLength() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td style=\"width: 200px;\">Kolor</td>\n" +
                "        <td><b>" + singleOrder.getColorDef().getName() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Zakończenia</td>\n" +
                "        <td><b>" + singleOrder.getEndingDef().getName() + "</b></td>\n" +
                "    </tr>\n" +
                (singleOrder.getRodCount() >1L?
                "    <tr>\n" +
                "        <td>Zakończenia dla drugiego drążka</td>\n" +
                "        <td><b>" + singleOrder.getEndingDef2().getName() + "</b></td>\n" +
                "    </tr>\n":"") +
                "    <tr>\n" +
                "        <td>\n" +
                "            Rodzaj karnisza </td>\n" +
                "        <td><b>" + (singleOrder.getRodCount().equals(1L) ? "Pojedyńczy" : "Podwójny") + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>\n" +
                "            Wspornik</td>\n" +
                "        <td><b>" + singleOrder.getSupportDef().getName() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Kółka:</td>\n" +
                "        <td><b>" + singleOrder.getCircleDef().getName() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Suma:</td>\n" +
                "        <td><b>" + singleOrder.calculatePrice() + " zł</b></td>\n" +
                "    </tr>\n" +
                "</table>" +
                "<h2>Dane zamawiającego</h2>\n" +
                "\n" +
                "<table>\n" +
                "    <tr>\n" +
                "        <td style=\"width: 200px;\">Adres e-mail</td>\n" +
                "        <td><b>" + singleOrder.getEmail() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Numer telefonu</td>\n" +
                "        <td><b>" + singleOrder.getPhoneNumber() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Nazwa użytkownika Allegro</td>\n" +
                "        <td><b>" + singleOrder.getAllegroNick() + "</b></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td>Uwagi do kalkulacji:</td>\n" +
                "        <td><b>" + singleOrder.getAdditionalInformations() + "</b></td>\n" +
                "    </tr>\n" +
                "</table>\n" +
                "\n" +
                "<p>\n" +
                "    Końcowa cena karnisza to :  <b style=\"font-size: xx-large\">" + singleOrder.calculatePrice() + " PLN.</b>\n" +
                "</p>\n" +
                "<p>\n" +
                "    Należy dokonać zakupu <b style=\"font-size: xx-large\">" + Math.ceil(singleOrder.calculatePrice() / singleOrder.getPricePerElement()) + "</b> sztuk produktu na akucji.\n" +
                "</p>" +
                "<p><a href=\"" + singleOrder.getRedirectUrl() + "\">Kliknij aby przejść do aukcji</a></p>" +
                "<h2>" + singleOrder.getRedirectUrl() + "</h2>");
        params.put("text", "Potwierdzenie kalkulacji karnisza - instrukcja dalszego postępowania");
        params.put("from", "allegro@profi-styl.pl");
        params.put("to[" + singleOrder.getEmail() + "][message_id]", UUID.randomUUID().toString() + "@profi-styl.pl");
        return params;
    }

}
