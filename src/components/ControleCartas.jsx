import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  


const ControleCartas = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [card, setCard] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("cartas/all");
            setCard(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`cartas/filtro/${campos.palavra}`);
        lista.data.length
        ? setCard(lista.data)
        : alert("Não há cartas cadastradas com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,nome) => {
    if(!window.confirm(`Confirma a exclusão da Carta ${nome}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`cartas/deleteCard/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setCard(card.filter(card => card.id !== id));
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível excluir a carta ${nome}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,nome) => {
    let novaQuantidade = prompt(`Digite a nova qunatidade da carta ${nome}`);
    novaQuantidade = parseFloat(novaQuantidade);
    if (novaQuantidade == "" ) {
        alert('Digite uma quantidade válida!(quantidade em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`cartas/updateCard/${id}`,{quantity: novaQuantidade});
        
        const CardAtualizado = [...card];
        const indiceCard  = CardAtualizado.find(Cards => Cards.id === id);
        console.log("indice cartas:"+indiceCard);
        CardAtualizado[indiceCard.id].quantity = novaQuantidade;
        setCard(CardAtualizado);
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a carta ${nome}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Controle de Cartas</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Nome da Carta" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {card.map((card) => (
                    <ItemLista
                        key={card.id}
                        id={card.id}
                        nome={card.name}
                        descricao={card.description}
                        quantidade={card.quantity}
                        excluirClick={()=>excluir(card.id,card.name)}
                        alterarClick={()=>alterar(card.id,card.name)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ControleCartas;