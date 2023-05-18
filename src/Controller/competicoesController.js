import competicoes from "../Models/Competicao.js";

class competicoesController{

    static ListarCompeticoes = (req, res) =>{
        competicoes.find()
        .populate('esporte')
        .populate('atletasArray.atleta')
        .then(competicoes => res.status(200).json(competicoes))
      .catch(erro => res.status(500).json({ erro: erro.message }));
    }

    static ObterCompeticaopeloid  = async (req, res) => {
        try {
          const id = req.params.id;
          const competicao = await competicoes.findById(id)
          .populate('esporte')
          .populate('atletasArray.atleta')
          if (!competicao) {
            res.status(400).send({ message: `Id do Competicao não localizado` });
          } else {
            res.status(200).send(competicao);
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    
    static CadastrarCompeticoes = (req, res) =>{
        let Competicao = new competicoes(req.body);
        console.log(Competicao)
        Competicao.save()
    .then(() => {
        res.status(200).send(Competicao.toJSON());
    })
    .catch((err) => {
        res.status(500).send({message: `${err.message} - falha ao cadastrar o Competicao`});
    });
    }
    static Atualizarcompeticoes = async (req, res) => {
        try {
          const id = req.params.id;
          const CompeticaoAtualizado = await competicoes.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({ message: 'Competicao atualizado com sucesso' });
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    
    /* static ListarCompeticoesDoAtleta = async (req, res) => {
      try {
        const { atletaId } = req.params;
    
        // Consulta todas as competições em que o atleta está cadastrado
        const Competicao = await competicoes.find({ atletas: atletaId }).populate('esporte');
    
        res.status(200).json(Competicao);
      } catch (error) {
        console.error('Erro ao listar as competições do atleta:', error);
        res.status(500).json({ message: 'Erro ao listar as competições do atleta.' });
      }
    }; */

    static removerAtletaDaCompeticao = async (req, res) => {
      try {
        const { competicaoId, atletaId } = req.params;
        
        // Verificar se a competição existe
        const competicao = await competicoes.findById(competicaoId);
    
        if (!competicao) {
          return res.status(404).json({ message: 'Competição não encontrada.' });
        }
    
        // Remover o atleta da competição
        competicao.atletas = competicao.atletas.filter((atleta) => atleta.toString() !== atletaId);
        await competicao.save();
    
        res.status(200).json({ message: 'Atleta removido da competição com sucesso.' });
      } catch (error) {
        console.error('Erro ao remover o atleta da competição:', error);
        res.status(500).json({ message: 'Erro ao remover o atleta da competição.' });
      }
    };

      static excluirCompeticao = (req,res) => {
        const id = req.params.id;
        competicoes.findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({ message: 'Competicao removido com sucesso' });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
    }

    static listarCompeticoesDoAtleta = async (req, res) => {
      try {
        const { atletaId } = req.params;
        const competicoesAtleta = []
        competicoes.find().populate('esporte')
        .then(competicoes => {
          competicoes.forEach((res)=>{            
            res.atletasArray.find( e => {
              if(String(e.atleta) === String(atletaId)){
                competicoesAtleta.push(res)
              }
            })
          })
          res.status(200).json(competicoesAtleta); 
        })
      } catch (error) {
        console.error('Erro ao listar as competições do atleta:', error);
        res.status(500).json({ message: 'Erro ao listar as competições do atleta.' });
      }
    };

    static removerAtletaDaCompeticao = async (req, res) => {
      try {
        const { competicaoId, atletaId } = req.params;
    
        // Verificar se a competição existe
        const competicao = await competicoes.findById(competicaoId);
    
        if (!competicao) {
          return res.status(404).json({ message: 'Competição não encontrada.' });
        }
        
        // Remover o atleta da competição
        competicao.atletasArray =  competicao.atletasArray.filter((atleta) => String(atleta.atleta) !== String(atletaId));
        console.log(competicao.atletasArray)
        await competicao.save();
    
        res.status(200).json({ message: 'Atleta removido da competição com sucesso.' });
      } catch (error) {
        console.error('Erro ao remover o atleta da competição:', error);
        res.status(500).json({ message: 'Erro ao remover o atleta da competição.' });
      }
    };
    
    
    
}
export default competicoesController;