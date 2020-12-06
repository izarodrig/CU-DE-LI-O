var db = openDatabase("aplicativo","1.0","aplicativo", 5*1024*1024)
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        
    },
}
document.addEventListener("DOMContentLoaded", function(e) {
    app.initialize();
    app.onDeviceReady();
    e.preventDefault();
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM clientes",[],function(tx,resultado,error){
            if(error){
                alert('Erro durante a transacao com o banco: ' + error.message);
            }
            else{
                var rows = resultado.rows
                var result = ""
                for(var i = 0; i < rows.length; i++){
                    var table = document.querySelector('.dados')
                    result += "<tr>"
                    result += "<td>" + rows[i].nome + "</td>"
                    result += "<td>" + rows[i].telefone + "</td>"
                    result += "<td>" + rows[i].origem + "</td>"
                    result += "<td>" + rows[i].data_contato + "</td>"
                    result += "<td>" + rows[i].observacao + "</td>"
                    result += "<td><button id='" + rows[i].telefone +"' class='btn btn-primary btn-alterar'>Alterar</button></td>"
                    result += "</tr>"
                }
                table.innerHTML += result
            }
        })
    })
    $(document).on("click",".btn-alterar",app_alterar.alterar)
});
var app_alterar = {
    alterar: function(){
        var value = $(this).attr("id")
        window.location = "alterar.html?id="+value
    }
}


