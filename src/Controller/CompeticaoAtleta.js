import competicoes from "../Models/Competicao.js";
import atletas from "../Models/Atleta.js";
import atleta from "../Models/Atleta.js";

class atletacompeticao{

static adicionarAtletaCompeticao = async (req, res) => {
  try {
    const { idCompeticao, atletasArray  } = req.body;

    const competicao = await competicoes.findById(idCompeticao);
    const atleta = await atletas.findById(atletasArray.atleta);
    
    if (!competicao) {
      return res.status(404).send({ message: "Competição não encontrada." });
    }

    if (!atleta) {
      return res.status(404).send({ message: "Atleta não encontrado." });
    }

    const ifAtletaExist = competicao.atletasArray.find( e => {
      return String(e.atleta) === String(atleta._id)
    })

    if(ifAtletaExist){
      return res.status(404).send({ message: "Atleta já cadastrado." });
    }
    competicao.atletasArray.push({atleta: atleta._id});
    await competicao.save();

    res.status(200).send({
      message: "Atleta adicionado com sucesso à competição.",
      competicao,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Erro ao adicionar atleta à competição.",
      error,
    });
  }
};

static aprovarAtletaDaCompeticao = async (req, res) => {
  try {
    const { competicaoId, atletaId } = req.params;

    // Verificar se a competição existe
    const competicao = await competicoes.findById(competicaoId);

    if (!competicao) {
      return res.status(404).json({ message: 'Competição não encontrada.' });
    }
    
    // Remover o atleta da competição
    competicao.atletasArray.forEach((res)=>{
      if(String(res.atleta) === String(atletaId)){
        res.aprovado = true        
      }
      return res;
    })

    await competicao.save();

    res.status(200).json({ message: 'Atleta aprovado da competição com sucesso.' }); 
  } catch (error) {
    console.error('Erro ao remover o atleta da competição:', error);
    res.status(500).json({ message: 'Erro ao remover o atleta da competição.' });
  }
};

static listarAtletasDaCompeticao = async (req, res) => {
  try {
    const { competicaoId } = req.params;

    // Verificar se a competição existe
    const competicao = await competicoes.findById(competicaoId).populate('atletasArray.atleta');

    if (!competicao) {
      return res.status(404).json({ message: 'Competição não encontrada.' });
    }
    res.status(200).json( competicao.atletasArray );
  } catch (error) {
    console.error('Erro ao listar os atletas da competição:', error);
    res.status(500).json({ message: 'Erro ao listar os atletas da competição.' });
  }
};

}

export default atletacompeticao;



