
function contact_data_labeled(text_labeled){

    var text_labeled = document.getElementById("contact_data_labeled_text").value;

    try {
        var re_vorname_labeled = /(?:(Vorname[\:\s]*))(.*)/gim;
        var match_vorname_labeled = re_vorname_labeled.exec(text_labeled);
        var vorname_labeled = match_vorname_labeled[2];
        document.getElementById("vorname_labeled").innerHTML = 'vorname_labeled: ' + vorname_labeled;
    } catch (e) {
        document.getElementById("vorname_labeled").innerHTML = 'vorname_labeled: not found';
        vorname_labeled = "";
    }

    try {
        var re_nachname_labeled = /(?:(Nachname[\:\s]*))(.*)/gim;
        var match_nachname_labeled = re_nachname_labeled.exec(text_labeled);
        var nachname_labeled = match_nachname_labeled[2];
        document.getElementById("nachname_labeled").innerHTML = 'nachname_labeled: ' + nachname_labeled;
    } catch (e) {
        document.getElementById("nachname_labeled").innerHTML = 'nachname_labeled: not found';
        nachname_labeled = "";
    }
    try {
        var re_firma_labeled = /(?:(Firma[\:\s]*))(.*)/gim;
        var match_firma_labeled = re_firma_labeled.exec(text_labeled);
        var firma_labeled = match_firma_labeled[2];
        document.getElementById("firma_labeled").innerHTML = 'firma_labeled: ' + firma_labeled;
    } catch (e) {
        document.getElementById("firma_labeled").innerHTML = 'firma_labeled: not found';
        firma_labeled = "";
    }

    try {
        var re_strasse_labeled = /(?:(Strasse[\:\s]*))(.*)/gim;
        var match_strasse_labeled = re_strasse_labeled.exec(text_labeled);
        var strasse_labeled = match_strasse_labeled[2];
        document.getElementById("strasse_labeled").innerHTML = 'strasse_labeled: ' + strasse_labeled;
    } catch (e) {
        document.getElementById("strasse_labeled").innerHTML = 'strasse_labeled: not found';
        strasse_labeled = "";
    }

    try {
        var re_plz_ort_labeled = /(?:(Plz\/Ort[\:\s]*))(.*)/gim;
        var match_plz_ort_labeled = re_plz_ort_labeled.exec(text_labeled);
        var plz_ort_labeled = match_plz_ort_labeled[2];
        document.getElementById("plz_ort_labeled").innerHTML = 'plz_ort_labeled: ' + plz_ort_labeled;
    } catch (e) {
        document.getElementById("plz_ort_labeled").innerHTML = 'plz_ort_labeled: not found';
        plz_ort_labeled = "";
    }

    try {
        var re_land_labeled = /(?:(Land[\:\s]*))(.*)/gim;
        var match_land_labeled = re_land_labeled.exec(text_labeled);
        var land_labeled = match_land_labeled[2];
        document.getElementById("land_labeled").innerHTML = 'land_labeled: ' + land_labeled;
    } catch (e) {
        document.getElementById("land_labeled").innerHTML = 'land_labeled: not found';
        land_labeled = "";
    }

    try {
        var re_telefon_labeled = /(?:(Telefon[\:\s]*))(.*)/gim;
        var match_telefon_labeled = re_telefon_labeled.exec(text_labeled);
        var telefon_labeled = match_telefon_labeled[2];
        document.getElementById("telefon_labeled").innerHTML = 'telefon_labeled: ' + telefon_labeled;
    } catch (e) {
        document.getElementById("telefon_labeled").innerHTML = 'telefon_labeled: not found';
        telefon_labeled = "";
    }

    try {
        var re_email_labeled = /(?:(Email[\:\s]*))(.*)/gim;
        var match_email_labeled = re_email_labeled.exec(text_labeled);
        var email_labeled = match_email_labeled[2];
        document.getElementById("email_labeled").innerHTML = 'email_labeled: ' + email_labeled;
    } catch (e) {
        document.getElementById("email_labeled").innerHTML = 'email_labeled: not found';
        email_labeled = "";
    }

    try {
        var re_nachricht_labeled = /(?:(Nachricht[\:\s]*))(.*)/gim;
        var match_nachricht_labeled = re_nachricht_labeled.exec(text_labeled);
        var nachricht_labeled = match_nachricht_labeled[2];
        document.getElementById("nachricht_labeled").innerHTML = 'nachricht_labeled: ' + nachricht_labeled;
    } catch (e) {
        document.getElementById("nachricht_labeled").innerHTML = 'nachricht_labeled: not found';
        nachricht_labeled = "";
    }


}


/* BPM-Muster

Monatl. Rate:
Vertragsart: Leasing
Laufzeit: 48 Monate
Restwert: 0,00 €
Anzahlung: 0,00 €
Preis: 2.799,10
Vorname: Max
Nachname: Muster
Firma: Muster GmbH
Strasse: Musterallee 1
Plz/Ort: 12345 Traumstadt
Land: Deutschland
Telefon: 0171 1234567
Email: test@test.de
Nachricht: Hallo

*/