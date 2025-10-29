/*
TODO

- aufbereiteten String in einer neuen Textarea zeigen
- Bereinigung von Zeichen die Bestandteile auf einer Zeile trennen. Bsp: Telefon: 0621/7273249 0 | E-Mail: info@eventstore-mannheim.de
- Beruf, Position, Stellenbeschreibung
- BPM-Anfrage-Parser
- Geschlecht anhand des Names ermitteln
- replace "," gegen ""
- Seite ggf wie vcardmaker.com bauen
- Web: und Fax: sind keine Vornamen
- whitespace am Anfrang und am Ende entfernen

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

function clear_textarea(){
    document.getElementById('impressum_text').value = "";
};

function text_input(text) { 
    var text = document.getElementById("impressum_text").value;

// Eingabe Aufbereitung des Strings
    text = text.trim(); 
    text = text.replace(/[^\S\r\n]+$/gm, "")
    //text = text.replace(/^\s\s*/gm, '').replace(/\s\s*$/gm, '');
    //text = text.replace(/\s|\s/gm, '\n');

// Wenn "Geschäftsführer|Inh|Inhaber" dann ist es wohl "Vorname Nachname" 

try {
    var re_vorname_nachname_gf = /.*(?:Geschäftsführerin|Geschäftsführung|Geschäftsführer|GF|Inhaberin|Inhaber|(Inh.)|Vorstand|Vorstände|vertreten\sdurch)(:\s*|\s*|:)?([A-Za-zÀ-ÖØ-öø-ÿ]+\-[A-Za-zÀ-ÖØ-öø-ÿ]+|[A-Za-zÀ-ÖØ-öø-ÿ]+)(\s)([A-Za-zÀ-ÖØ-öø-ÿ]+\-[A-Za-zÀ-ÖØ-öø-ÿ]+|[A-Za-zÀ-ÖØ-öø-ÿ]+)/gi;
    var match_vorname_nachname_gf = re_vorname_nachname_gf.exec(text);
    var vorname_nachname_gf = match_vorname_nachname_gf[3] + match_vorname_nachname_gf[4] + match_vorname_nachname_gf[5];
    document.getElementById("vorname_nachname_gf").innerHTML = 'Vorname Nachname über GF: ' + vorname_nachname_gf;

    // von vorname_nachname_gf den Vornamen holen
    try {
        var vorname_gf = match_vorname_nachname_gf[3];
        document.getElementById("vorname_gf").innerHTML = 'Vorname über GF: ' + vorname_gf;
        var vorname = vorname_gf;
    } catch (e) {
        document.getElementById("vorname_gf").innerHTML = 'Vorname über GF: not found';
        vorname_gf = "";
    }

    // von vorname_nachname_gf den Nachnamen holen
    try {
        var nachname_gf = match_vorname_nachname_gf[5];
        document.getElementById("nachname_gf").innerHTML = 'Nachname über GF: ' + nachname_gf;
        var nachname = nachname_gf;
    } catch (e) {
        document.getElementById("nachname_gf").innerHTML = 'Nachname über GF: not found';
        vorname_gf = "";
    }

} catch (e) {
    document.getElementById("vorname_nachname").innerHTML = 'Vorname Nachname über GF: not found';
    vorname_nachname_gf = "";

    // Vorname Suche in vornamen.js
    try {
        var re_vornamen_find_all_str = vorname_test;
        var re_vornamen_find_all = new RegExp(re_vornamen_find_all_str);
        
        var vornamen_found_arr = text.matchAll(re_vornamen_find_all);
        for (vorname of vornamen_found_arr) {
            document.getElementById("vornamen_find_all").innerHTML = "Vorname über Vorname-Datenbank: " + vorname[0];
        }
        vorname = vorname[0];
    } catch (e) {
        document.getElementById("vornamen_find_all").innerHTML = 'Vornamen_find_all: not found';
    }

    // Nachname über ermittelten Vornamen in vornamen.js
    try {
        var re_nachname_str = `${vorname}(\\s\)\(\[A-Za-zÀ-ÖØ-öø-ÿ\]\+\\-\[A-Za-zÀ-ÖØ-öø-ÿ\]\+|\[A-Za-zÀ-ÖØ-öø-ÿ\]\+\)`;
        var re_nachname = new RegExp(re_nachname_str);
        var match_nachname = text.match(re_nachname);
        nachname = match_nachname[2];
            document.getElementById("nachname_check").innerHTML = 'Nachname über Vorname (Vorname-Datenbank): ' + nachname;
    } catch (e) {
        document.getElementById("nachname_check").innerHTML = 'Nachname über Vorname aus vorname_db: Nachname nicht erkannt.';
    }
}

// Wenn irgendwo im Text "Geschäftsführer|Inhaber|Inh." dann nehme das als Position der Person 
try {
    var re_job_title = /Geschäftsführerin|Geschäftsführung|Geschäftsführer|Inhaberin|Inhaber|(Inh.)|Vorstand|Vorstände/gim;
    var match_job_title = re_job_title.exec(text);
    var job_title = match_job_title[0];
    document.getElementById("job_title").innerHTML = 'job title: ' + job_title;

} catch (e) {
    document.getElementById("job_title").innerHTML = 'job title: not found';
    job_title = "";
}

// Firma - Wenn Zeile mit GmbH o.ä. endet dann übernehme Zeile als Firma, alternativ irgend was das keine Kontaktdaten
try {
    var re_firma = /(?:\n.+)(AG|eG|e.K.|e.V.|GbR|gGmbH|GmbH|KGaA|KdöR|KG|OHG|PartG|UG|Aktiengesellschaft|Eingetragene Genossenschaft|Eingetragener Kaufmann|Eingetragener Verein|Einzelkaufmann|Einzelunternehmen|Fachhochschule|Freiberufler|gesellschaft|Gesellschaft bürgerlichen Rechts|gemeinnützige GmbH|Gesellschaft mit beschränkter Haftung|GmbH & Co. KG|Kommanditgesellschaft|Kommanditgesellschaft auf Aktien|Körperschaft des öffentlichen Rechts|Offene Handelsgesellschaft|Partnerschaftsgesellschaft|Stiftung|UG (haftungsbeschränkt)|Unternehmen|Universität)$/gim;
    var match_firma = re_firma.exec(text);
    var firma = match_firma[0].trim();
    document.getElementById("firma").innerHTML = 'Firma: ' + firma;
}
catch (e) {
        try {
            var re_firma = /^.+\n/gi;
            var match_firma = re_firma.exec(text);
            var firma = match_firma[0];
            document.getElementById("firma").innerHTML = 'Firma: ' + firma;
        }
        catch (e) {
            document.getElementById("firma").innerHTML = 'Firma: not found';
            firma = "";
        }
}

// Firma wenn Einzelunternehmen - Am Anfang des Textes Beginnt und endet mit Wor also "Wort Wort" was der Vorname und Nachname sein könnte
try {
    var re_vorname_nachname = /^([A-Za-zÀ-ÖØ-öø-ÿ]+)\s([A-Za-zÀ-ÖØ-öø-ÿ]+)$/gim;
    var match_vorname_nachname = re_vorname_nachname.exec(text);
    var vorname_nachname = match_vorname_nachname[0];
    document.getElementById("vorname_nachname").innerHTML = 'Vorname Nachname / Firma: ' + vorname_nachname;
} catch (e) {
    document.getElementById("vorname_nachname").innerHTML = 'Vorname Nachname / Firma: not found';
    vorname_nachname = "";
}

// Strasse - Alles was in der Zeile vor Postleitzahl und Ort kommt ist die Strasse
try {
    var re_strasse = /.*(?=(\s*|\s*\n*)(D-)?([0-9]{5})\s[^0-9])/gim;
    var match_strasse = re_strasse.exec(text);
    var strasse = match_strasse[0];
    document.getElementById("strasse").innerHTML = 'Strasse: ' + strasse;
} catch (e) {
    document.getElementById("strasse").innerHTML = 'Strasse: not found';
    strasse = "";
}

// Postleitzahl
try {
    var re_postleitzahl = /(?:\s)(D-)?([0-9]{5})(?=\s)/;
    var match_postleitzahl = re_postleitzahl.exec(text);
    var postleitzahl = match_postleitzahl[2];
    document.getElementById("postleitzahl").innerHTML = 'Postleitzahl: ' + postleitzahl;
} catch (e) {
    document.getElementById("postleitzahl").innerHTML = 'Postleitzahl: not found';
    postleitzahl = "";
}

// Ort
try {
    var re_ort = /(?:\s(D-)?([0-9]{5})\s)([A-Za-zÀ-ÖØ-öø-ÿ-]+)/gim;
    var match_ort = re_ort.exec(text);
    var ort = match_ort[3];
    document.getElementById("ort").innerHTML = 'Ort: ' + ort;
} catch (e) {
    document.getElementById("ort").innerHTML = 'Ort: not found';
    ort = "";
}

// Telefon mobil
try {
    var re_telefon_mobil = /(?:\D)(((\+|00)\s*49(\s*\(0\)\s*)?\s*1)|01)(.*\d{1,14})/gim;
    var match_telefon_mobil = re_telefon_mobil.exec(text);
    var telefon_mobil = match_telefon_mobil[0];
    telefon_mobil = clean_number(telefon_mobil);
    document.getElementById("telefon_mobil").innerHTML = 'Telefon mobil: ' + telefon_mobil;
}catch (e) {
    document.getElementById("telefon_mobil").innerHTML = 'Telefon mobil: not found';
    telefon_mobil = "";
}

// Telefon
try {
    var re_telefon = /(?:\D|\s*)(\+|0|0049).*\d{1,14}$/gim;
    var match_telefon = re_telefon.exec(text);
    var telefon = match_telefon[0];
    telefon = clean_number(telefon);

    var re_telefon_check = /(01)|\+49\s?1|00\s?49\s?1.*/gim;
    var telefon_check = re_telefon_check.test(telefon);

    if (telefon_check == true) { 
        document.getElementById("telefon").innerHTML = 'Telefon: not found';
        telefon = ""; 
    } else {
        document.getElementById("telefon").innerHTML = 'Telefon: ' + telefon; 
    }
}catch (e) {
    document.getElementById("telefon").innerHTML = 'Telefon: not found';
    telefon = "";
}

// Fax
try {
    var re_fax = /(?:x[.\:\(\s_-]*)((\+|0|0049).*\d{1,14}$)/gim;
    var match_fax = re_fax.exec(text);
    var fax = match_fax[1];
    fax = clean_number(fax);
    document.getElementById("fax").innerHTML = 'Fax: ' + fax;
} catch (e) {
    document.getElementById("fax").innerHTML = 'Fax: not found';
    fax = "";
}

// E-Mail
try {
    var re_email = /([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gim;
    var match_email = re_email.exec(text);
    var email = match_email[0];
    document.getElementById("email").innerHTML = 'E-mail: ' + email;
} catch (e) {
    document.getElementById("email").innerHTML = 'E-mail: not found';
    email = "";
}

// Url
try{
    var www_email_tld = "www." + match_email[2];
    document.getElementById("internet").innerHTML = 'Internet über email TLD: ' + www_email_tld;
    var www = www_email_tld;
}catch (e) {
    try {
        var re_www = /(http|www).*/gim;
        var match_www = re_www.exec(text);
        www = match_www[0];
        document.getElementById("internet").innerHTML = 'Internet: '+ www;
    } catch(e) {
        document.getElementById("internet").innerHTML = 'Internet: not found';
        www = "";
    }
}

// Umsatzsteuer-Identifikationsnummer
try {
    var re_ustid = /((Ust|Umsatz)\S+(\s|:))(DE(\s)?.*\d{1,9})/gim;
    var match_ustid = re_ustid.exec(text);
    var ustid = match_ustid[4];
    ustid = ustid.replace(/(\/|\s)/g, "");
    document.getElementById("ustid").innerHTML = 'Umsatzsteuer-Identifikationsnummer: ' + ustid;
} catch (e) {
    document.getElementById("ustid").innerHTML = 'Umsatzsteuer-Identifikationsnummer: not found';
    ustid = "";
    // Steuernummer
    try {
        var re_stnr = /(?:Steuer+[-\s|:.A-Za-z]*)\D(.*\d{1,9})/gim;
        var match_stnr = re_stnr.exec(text);
        var stnr = match_stnr[1];
        document.getElementById("stnr").innerHTML = 'Steuernummer: ' + stnr;
    } catch (e) {
        document.getElementById("stnr").innerHTML = 'Steuernummer: not found';
        stnr = "";
    }
}

// Registergericht
try {
    var re_registergericht = /(?:(gericht\w*[.\:\(\s_-]*))([A-Za-zÀ-ÖØ-öø-ÿ]+\-[A-Za-zÀ-ÖØ-öø-ÿ]+|[A-Za-zÀ-ÖØ-öø-ÿ]+)(\s)([A-Za-zÀ-ÖØ-öø-ÿ]+\-[A-Za-zÀ-ÖØ-öø-ÿ]+|[A-Za-zÀ-ÖØ-öø-ÿ]+)/gim;
    var match_registergericht = re_registergericht.exec(text);
    var registergericht = match_registergericht[2] + " " + match_registergericht[4];
    document.getElementById("registergericht").innerHTML = 'Registergericht: ' + registergericht;
} catch (e) {
    document.getElementById("registergericht").innerHTML = 'Registergericht: not found';
    registergericht = "";
}

// Registernummer
try {
    var re_registernummer = /((HRA|HRB|VR)\s\d+)/gim;
    var match_registernummer = re_registernummer.exec(text);
    var registernummer = match_registernummer[0];
    document.getElementById("registernummer").innerHTML = 'Registernummer: ' + registernummer;
} catch (e) {
    document.getElementById("registernummer").innerHTML = 'Registernummer: not found';
    registernummer = "";
}

// Bereinigung der Telefonnummern um verschiedene Zeichen
function clean_number(number){

    var cleaned_number = number.toString();

    cleaned_number = cleaned_number.replace(/\+\s/, "+");
    cleaned_number = cleaned_number.replace(/\(0\)/g, "");
    cleaned_number = cleaned_number.replace(/[\-._\|\\\/\(\)\[\]\(\)\{\}]+/g, " ");
    cleaned_number = cleaned_number.replace(/\s{2,}/g, " ");
    return cleaned_number;
}

function trim_whitespace_begin_end(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }

// test var if it is not undefined
function var_not_undefined(x){
    var x = (typeof x === 'undefined') ? "" : x;
    return x;
}

// Erstellung des vcard textes als String

function vcard_gen(){

    var vc_n = var_not_undefined(nachname);
    var vc_fn = var_not_undefined(vorname);
    var vc_org = var_not_undefined(firma);
    var vc_adr = var_not_undefined(strasse) + ";" + var_not_undefined(ort) + ";;" + var_not_undefined(postleitzahl);
    var vc_tel = var_not_undefined(telefon);
    var vc_tel_cell = var_not_undefined(telefon_mobil);
    var vc_tel_fax = var_not_undefined(fax);
    var vc_url = var_not_undefined(www);
    var vc_email = var_not_undefined(email);
    var vc_note = 'UStID: ' + var_not_undefined(ustid) + ' StNr: ' + var_not_undefined(stnr);  // ggf 0x0D0A verwenden weil \n nicht innerhalb eines vcard-feldes nicht funktioniert

    var vcard = "BEGIN:VCARD" + "\n" +
    "VERSION:3.0" + "\n" +
    "N;CHARSET=utf-8:" + vc_n + ";" + vc_fn + "\n" +
    "FN;CHARSET=utf-8:" + vc_fn + " " + vc_n + "\n" +
    "ORG;CHARSET=utf-8:" + vc_org + "\n" +
    "ADR;CHARSET=utf-8;WORK:;;" + vc_adr + "\n" +
    "TEL;CHARSET=utf-8;WORK;VOICE:" + vc_tel + "\n" +
    "TEL;CHARSET=utf-8;TYPE=CELL:" + vc_tel_cell + "\n" +
    "TEL;CHARSET=utf-8;WORK;FAX:" + vc_tel_fax + "\n" +
    "URL;CHARSET=utf-8;TYPE=WORK:" + vc_url + "\n" +
    "EMAIL;INTERNET;CHARSET=utf-8;TYPE=WORK:" + vc_email + "\n" +
    "NOTE;CHARSET=utf-8:" + vc_note + "\n" +
    "END:VCARD";

    return vcard;
}

// Erstellung des vcard-Download-Links

try{
    document.getElementById("vcard").textContent = vcard_gen();
    var vcard_export = vcard_gen();

    let blob = new Blob([vcard_export], {type: 'text/plain;charset=utf-8'});
    link.href = URL.createObjectURL(blob);
}catch (e) {
    document.getElementById("vcard").textContent = 'vCard konnte nicht generiert werden.';
}

}
