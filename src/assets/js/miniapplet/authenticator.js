var urlPortafirma = "https://dportafirmas.dipujaen.es/pfirmav3/afirma/";


function showErrorFunction(type, message) {
    alert("El proceso de firma ha fallado: " + message);
}

function authenticate(sessionId) {

    if (MiniApplet.isAndroid()) {
        authAndroid(sessionId);
    } else if (MiniApplet.isIOS()) {
        authIOS(sessionId);
    } else {
        authMiniapplet();
    }
    return false;
}

function authIOS(sessionId) {
    var clientUrl = extractClientUrl() + '/mobile/auth';
    launchLink("portafirmas://auth?datos=auth$SHA512&sessionId=" + sessionId + "&url=" +
        clientUrl);
}

function authAndroid(sessionId) {
    var clientUrl = extractClientUrl() + '/mobile/auth';
    launchLink("portafirmas://auth/auth$SHA512/" + sessionId + "/" + clientUrl);
}

function launchLink(contentLink) {
    window.location = contentLink;
}

function authMiniapplet() {
    var format = "CAdES";
    var algorithm = "SHA1withRSA";

    var texto = "Tkg/USt8bXtvNztianpLfGFBcGpmPTNIRXlCaEhmS1MlclVXeFlqUnQxUk89UD8oJSxsbD9iUWV9LXI7OHAq"

    var clientUrl = extractClientUrl();
    var signerClientUrl = clientUrl + "/miniapplet/client";

    var serverStorageUrl = clientUrl + "/afirma/StorageService";
    var serverRetrieveUrl = clientUrl + "/afirma/RetrieveService";

    var params = "";
    params += "\nformat=" + format;
    params += '\ndoc=' + texto + '\n'
    params += 'filter=nonexpired:;';
    //if (filterCert != '') {
    //   params += 'subject.rfc2254:' + filterCert;
    //}
    params += '\n';

    try {
        MiniApplet.setForceWSMode(true);
        MiniApplet.cargarAppAfirma(signerClientUrl);
        MiniApplet.setServlets(urlPortafirma + "StorageService", urlPortafirma + "RetrieveService");
        MiniApplet.sign(texto, algorithm, format, params, successCertificate, showErrorFunction);

    } catch (e) {
        alert("Error en el proceso de firma\n" +
            "\n\nPruebe a recargar la página. \n\nSi persiste el problema consulte con el administrador.\n\n\n\nMensaje:\n" +
            e);
    }
}

function successCertificate(signatureBase64, certificateB64) {

    document.getElementById('certificado').value = certificateB64;
    window.dispatchEvent(new Event('certificado-event'));

}

function extractClientUrl() {
    var signerClientUrl = window.location.href;
    if (signerClientUrl.indexOf("/index.html") > -1) {
        signerClientUrl = signerClientUrl.substring(0, signerClientUrl
            .indexOf("/index.html"));
    }
    return signerClientUrl;
}