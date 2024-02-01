const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='
const page_url = 'href=http://en.wikipedia.org/?curid=${pageid}'

const formularioDOM = document.querySelector('.formulario')
const inputDOM = document.querySelector('.formulario-input')
const resultadosDOM = document.querySelector('.resultados')

formularioDOM.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = inputDOM.value
    if(!value) {
        resultadosDOM.innerHTML = '<div class="erros">Por favor, digite novamente !</div>'
        return
    }
    fetchPages(value)
})

const fetchPages = async(searchValue) => {
    resultadosDOM.innerHTML = '<div class="loading"></div>'
    try {
        const response = await fetch(`${url}${searchValue}`)
        const data = await response.json()
        const results = data.query.search

        if(results.length < 1) {
            resultadosDOM.innerHTML = '<div class="erros">Sem resultados ! Tente novamente.</div>'
            return
        }
        renderResults(results)
    } catch(error) {
        resultadosDOM.innerHTML = '<div class="erros">Ocorreu um erro !</div>'
    }
}

const renderResults = (list) => {
    const cardsList = list
        .map((item) => {
            const { title, snippet, pageid } = item
            return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
                    <h4>${title}</h4>
                    <p>${snippet}</p></a>`
        })
        .join('')
        resultadosDOM.innerHTML = `<div class="artigos">${cardsList}</div>`
}