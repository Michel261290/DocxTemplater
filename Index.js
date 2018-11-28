
$("#btnGenerarDocx").on('click', function () {
    $("#fileUpload").trigger('click');
});

$("#fileUpload").on('change', function () {


    if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document'].indexOf($("#fileUpload").get(0).files[0].type) == -1) {
        alert('Error : No es un archivo DOCX');
        $("#fileUpload").val("");
        return;
    }

    var url = URL.createObjectURL($("#fileUpload").get(0).files[0]);


    var docx = new DocxReader();

    docx.Load(url, function () {

        // Buscar Texto
        // var found = docx.Search("first"); // Regresa True/False


        // Remplazar Texto
        //docx.Replace("Texto", "Este Texto Fue Cambiado Desde JS");

        //var variables = docx.GetVariables();

        // console.log(variables);


        // Cambiar variables en documento
        // var docxvar = {
        //     "fecha": "99/99/9999",
        //     "hora": "00:00",
        //     "oficina": "0001",
        //     "codigo_centro": "0320",
        //     "saldo_inicial_caja": "10,000.00",

        // };

        var docxvar = {
            "data": [
                {
                    "fecha": "99/99/9999",
                    "hora": "00:00",
                    "oficina": "0001",
                    "codigo_centro": "0320",
                    "saldo_inicial_caja": "10,000.00"
                },
                {
                    "fecha": "99/99/9999",
                    "hora": "00:00",
                    "oficina": "0001",
                    "codigo_centro": "0320",
                    "saldo_inicial_caja": "10,000.00"
                }
            ]
        }

        //remplaza variables recibiendo JSON como entrada
        docx.ReplaceVariable(docxvar);


        // Asigna un nombre al archivo de salida
        docx.SetName("Plantilla.docx")

        // Descarga el documento
        docx.Download();
        $("#fileUpload").val("");
    });

});


//Obtiene el base64 de un archivo
function getBase64(file) {
    var nameFile = file.name;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (result) {
        getFile(result.target.result, nameFile);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

//Obtiene un file a partir de un base64
function getFile(base64, filename) {
    var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    var file = new File([u8arr], filename, { type: mime });

    var docx = new DocxReader();
    setTimeout(function () {
        var url = URL.createObjectURL(file);
        docx.Load(url, function () {
            docx.SetName(filename)
            docx.Download();
        });
    }, 1500);


}
