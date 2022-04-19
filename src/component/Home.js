import React, { useState } from 'react'

import style from './Home.module.css'
import { FiSearch } from 'react-icons/fi'

import Api from '../services/Api'

export default function Home(){

    const [input, setInput] =  useState('')
    const [cep, setCep] = useState({})


    // Função assicrona
    async function handleSearch(){
        // 01001000/json/

        //validando se o input está vazio
        if(input === ''){
            alert("preencha um cep")
            return
        }

        //O que você pode fazer mas que pode dar errado (tentativa)
        try{

            // 'await' espera a requisição que será passada
            const response = await Api.get(`${input}/json`)

            //passa o valor para o 'setCep' (objeto requisitado)
            setCep(response.data)
            //limpa o 'setInput'
            setInput('')

        }
        //se o 'try' der errado cai no bloco 'catch'
        catch{
            alert("Ops erro ao buscar!")
            //limpa o 'setInput'
            setInput('')
        }
    }
    
    return(
        <div className={style.container}>
            <h1>Gerar CEP</h1>

            <div className={style.containerInput}>
                <input 
                    type="text"
                    placeholder="Digite seu cep"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                />
                <button onClick={handleSearch}>
                    <FiSearch size={25} color="#fff"/>
                </button>
            </div>

            {/* condição de renderização */}
            {Object.keys(cep).length > 0 && (
                <main className={style.main}>
                    <h2>CEP: {cep.cep}</h2>

                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>
                    <span>{cep.ddd}</span>
                </main>
            )}
            
        </div>
    )
}