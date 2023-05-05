import competicoes from "../Models/Competicao.js";

class competicoesController{

    static ListarCompeticoes = (req, res) =>{
        competicoes.find()
        .populate('esporte')
        .then(competicoes => res.status(200).json(competicoes))
      .catch(erro => res.status(500).json({ erro: erro.message }));
    }

    static ObterCompeticaopeloid  = async (req, res) => {
        try {
          const id = req.params.id;
          const competicao = await competicoes.findById(id);
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
}
export default competicoesController;