var db = openDatabase("aplicativo","1.0","aplicativo", 5*1024*1024)
$(document).ready(function() {  
    var loc = location.search.substring(0, location.search.length)    
    var url = loc.substring(loc.indexOf('=')+1,loc.length)
    var nome = document.getElementById("txtNome")
    var telefone = document.getElementById("txtTelefone")
    var data_contato = document.getElementById("txtDataContato")
    var observacao = document.getElementById("txtObservacao") 
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM clientes WHERE telefone=?', [url], function (tx, resultado) {
            var rows = resultado.rows[0]
            var origem = rows.origem
            nome.value = rows.nome 
            data_contato.value = rows.data_contato 
            observacao.value = rows.observacao
            telefone.value = rows.telefone
            var result_select = ""
            var select = document.getElementById("txtOrigem")
            select.innerHTML = ""
            switch (origem){
                case 'Celular':
                    result_select =  "<option value='Celular' selected>Celular</option>"
                    result_select += "<option value='Fixo'>Fixo</option>"
                    result_select += "<option value='Whatsapp'>Whatsapp</option>"
                    result_select += "<option value='Facebook'>Facebook</option>"
                    result_select += "<option value='Instagram'>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio'>Google Meu Negocio</option>"
                    break
                case 'Fixo':
                    result_select =  "<option value='Celular'>Celular</option>"
                    result_select += "<option value='Fixo' selected>Fixo</option>"
                    result_select += "<option value='Whatsapp'>Whatsapp</option>"
                    result_select += "<option value='Facebook'>Facebook</option>"
                    result_select += "<option value='Instagram'>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio'>Google Meu Negocio</option>"
                    break
                case 'Whatsapp':
                    result_select =  "<option value='Celular'>Celular</option>"
                    result_select += "<option value='Fixo'>Fixo</option>"
                    result_select += "<option value='Whatsapp' selected>Whatsapp</option>"
                    result_select += "<option value='Facebook'>Facebook</option>"
                    result_select += "<option value='Instagram'>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio'>Google Meu Negocio</option>"
                    break
                case 'Facebook':
                    result_select =  "<option value='Celular'>Celular</option>"
                    result_select += "<option value='Fixo'>Fixo</option>"
                    result_select += "<option value='Whatsapp'>Whatsapp</option>"
                    result_select += "<option value='Facebook' selected>Facebook</option>"
                    result_select += "<option value='Instagram'>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio'>Google Meu Negocio</option>"
                    break
                case 'Instagram':
                    result_select =  "<option value='Celular'>Celular</option>"
                    result_select += "<option value='Fixo'>Fixo</option>"
                    result_select += "<option value='Whatsapp'>Whatsapp</option>"
                    result_select += "<option value='Facebook'>Facebook</option>"
                    result_select += "<option value='Instagram' selected>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio'>Google Meu Negocio</option>"
                    break
                case 'Google Meu Negocio':
                    result_select =  "<option value='Celular'>Celular</option>"
                    result_select += "<option value='Fixo'>Fixo</option>"
                    result_select += "<option value='Whatsapp'>Whatsapp</option>"
                    result_select += "<option value='Facebook'>Facebook</option>"
                    result_select += "<option value='Instagram'>Instagram</option>"
                    result_select += "<option value='Google Meu Negocio' selected>Google Meu Negocio</option>"
                    break
            }
            select.innerHTML = result_select
        });
    });
})
$('#btnAlterar').on("click",function(){
    app.alterar();
})
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        
    },
    alterar: function(){
        let nome = document.getElementById("txtNome").value
        let telefone = document.getElementById("txtTelefone").value
        let origem = document.getElementById("txtOrigem").value
        let data_contato = document.getElementById("txtDataContato").value
        let observacao = document.getElementById("txtObservacao").value
        db.transaction(function(tx){
            tx.executeSql("UPDATE clientes SET nome=?, telefone=?, origem=?, data_contato=?, observacao=? WHERE telefone=?",[nome, telefone, origem, data_contato, observacao, telefone])
        }, function(error){
            alert('Erro durante a transacao com o banco: ' + error.message)
        }, function(){
            // alert('Inserção realizada com sucesso!')
            window.location.href = "consultar.html"
        })
        
    }
}