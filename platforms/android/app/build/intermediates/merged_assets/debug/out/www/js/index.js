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
var db = openDatabase("aplicativo","1.0","aplicativo", 5*1024*1024)
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        document.getElementById('btnInserir').addEventListener("click",app.inserir);
        this.receivedEvent('deviceready');
        
    },
    receivedEvent: function(id){
        
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (nome TEXT, telefone TEXT, origem TEXT, data_contato TEXT, observacao TEXT)')
        }, function(error){
            console.log('Transação com erro: ' + error.message)
        }, function(){
            // alert("Banco de dados criado com sucesso!")
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
            nome = document.getElementById("txtNome")
            telefone = document.getElementById("txtTelefone")
            origem = document.getElementById("txtOrigem")
            data_contato = document.getElementById("txtDataContato")
            observacao = document.getElementById("txtObservacao")
            nome.value = ""
            telefone.value = ""
            origem.value = ""
            data_contato.value = ""
            observacao.value = ""
        })
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
            alert('Inserção realizada com sucesso!')
        })
        window.location = "consultar.html"
    }
}
app.initialize();
app.onDeviceReady();
