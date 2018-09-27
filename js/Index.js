
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
        var found = docx.Search("first"); // Regresa True/False
        
        
        // Remplazar Texto
        docx.Replace("Texto", "Este Texto Fue Cambiado Desde JS");


        // Cambiar variables en documento
        var docxvar = {
            "nombre": "Este es un texto que contiene la varibale nombre"
        };

        docx.docxtemplater.setData(docxvar);

        try {
            // renderiza el documento con las variables nuevas
            docx.docxtemplater.render();
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({ error: e }));
            throw error;
        }

        // Asigna un nombre al archivo de salida
        docx.SetName("Plantilla.docx")

        // Descarga el documento
        docx.Download();
    });

});
