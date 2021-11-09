'use strict'

const limparFormulario = (endereco) => {

    document.getElementById('endereco').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''

}

// Função responsável por preencher o formulário com os dados que foram recuperados na função de pesquisar o CEP
const preencherFormulario = (endereco) => {

    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf

}

// Funções responsáveis por validar os campos
const eNumero = (numero) => /^[0-9]+$/.test(numero)
const cepValido = (cep) => cep.length == 8 && eNumero(cep)

// Fução arrow do tipo async
const pesquisarCep = async () => {

    limparFormulario()

    // Recupera o que está dentro da input cep
    const cep = document.getElementById('cep').value

    // Abriga a URL pertencente a API, nesse caso, do CEP
    const url = `https://viacep.com.br/ws/${cep}/json/`

    if (cepValido(cep)) {
        
        // Faz uma requisição a URL da API
        const dados = await fetch(url)

        // Guarda todos os dados dentro dessa variável que estamos criando
        const endereco = await dados.json()

        // Validação para error do Json
        if (endereco.hasOwnProperty('erro')) {
            
            document.getElementById('endereco').value = 'CEP não encontrado'

        } else {

            preencherFormulario(endereco)

        }

    } else {

        document.getElementById('endereco').value = 'CEP inválido'

    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);