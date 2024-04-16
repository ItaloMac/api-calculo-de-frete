const { listarPokemons } = require('utils-playground')
const { produto } = require('../bancodedados')
const { listaDeProdutos } = require('../bancodedados')
const { getStateFromZipcode, getPackageDescriptionNpm } = require('utils-playground');



const listagemProdutos =  (req,res) => {
  
    
    return res.json(listaDeProdutos)
}

const detalhesProduto = async (req,res) => {
    const { idProduto } = req.params;
    
    const produtoBuscado = listaDeProdutos.find(produto => produto.id === idProduto)
   
    if (!produtoBuscado) {
        return res.status(404).json({ error: 'Produto não existe' });
    }
    
    res.json(produtoBuscado);
}

const calculoFrete = async (req,res) => {
    const { idProduto, cep } = req.params;
    
    const produtoBuscado = listaDeProdutos.find(produto => produto.id === Number(idProduto))
 
    
    if (!produtoBuscado) {
        return res.status(404).json({ error: 'Produto não existe' });
    }

    const estado = await getStateFromZipcode(cep);

    try {
        let valorDoFrete = produtoBuscado.valor * 12 / 100;

        if (estado == "BA" || estado == "SE" || estado == "AL" || estado == "PE" || estado == "PB") {
            valorDoFrete = produtoBuscado.valor * 10 / 100;
        } else if (estado === "SP" || estado === "RJ") {
            valorDoFrete = produtoBuscado.valor * 15 / 100;
        } else {
            valorDoFrete = produtoBuscado.valor * 12 / 100;
        }
    
        res.json({
            produtoBuscado,
            estado,
            valorDoFrete
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao calcular o frete.' });
    }
   
}





    //const valoreDoFrete = listaDeProdutos. produto.valor(produtoBuscado) * 12 / 100





    //function fretePercentual(valorDoFrete,Estado) {
     //   if (Estado === BA || SE || AL || PE || PB) {

   //     }
  //  }
    



module.exports = {
    listagemProdutos,
    detalhesProduto,
    calculoFrete
}
