/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        document.getElementById('btnInserir').addEventListener("click,app.inserir");
        this.receivedEvent('deviceready');
        console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
        
    },
    receivedEvent: function(id){
        db = window.sqlitePlugin.openDatabase({
            name: 'aplicativo.db',
            location: 'default',
            androidDatabaseProvider: 'system'
        })
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (nome, telefone, origem, data_contato, observacao)')
        }, function(error){
            console.log('Transação com erro: ' + error.message)
        }, function(){
            alert("Banco de dados criado com sucesso!")
        })
    },
    inserir: function(){
        let nome = document.getElementById("txtNome").value
        let telefone = document.getElementById("txtTelefone").value
        let origem = document.getElementById("txtOrigem").value
        let data_contato = document.getElementById("txtDataContato").value
        let observacao = document.getElementById("txtObservacao").value

        db.transaction(function(tx){
            tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?)',[nome, telefone, origem, data_contato, observacao])
        }, function(error){
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function(){
            alert('Inserção realizada com sucesso!')
        })
    },
    alterar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string)
        var getTelefone = url.searchParams.get("telefone")
        alert(getTelefone)

        let nome = document.getElementById("txtNome").value
        let telefone = document.getElementById("txtTelefone").value
        let origem = document.getElementById("txtOrigem").value
        let data_contato = document.getElementById("txtDataContato").value
        let observacao = document.getElementById("txtObservacao").value

        db.transaction(function(tx){
            tx.executeSql("UPDATE clientes SET nome='?', telefone='?', origem='?', data_contato='?', observacao='?' WHERE telefone LIKE '?'",[nome, telefone, origem, data_contato, observacao, telefone])
        }, function(error){
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function(){
            alert('Inserção realizada com sucesso!')
        })
    },
    consultar: function(){
        let nome
        let telefone
        let origem
        let data_contato
        let observacao
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM clientes",[nome, telefone, origem, data_contato, observacao])
            document.getElementById("nome").value = nome;
            document.getElementById("telefone").value = telefone;
            document.getElementById("origem").value = origem;
            document.getElementById("data_contato").value = data_contato;
            document.getElementById("observacao").value = observacao;
        }, function(error){
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function(){
            alert('Consulta executada com sucesso!')
        })
    }
}