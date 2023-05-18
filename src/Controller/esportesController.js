
import esportes from "../Models/Esporte.js";

class EsportesController{

    static ListarEsportes = (req, res) =>{
        esportes.find().then(esportes => res.status(200).json(esportes))
      .catch(erro => res.status(500).json({ erro: erro.message }));
    }

    static ObterEsportepeloid  = async (req, res) => {
        try {
          const id = req.params.id;
          const esporte = await esportes.findById(id);
          if (!esporte) {
            res.status(400).send({ message: `Id do esporte não localizado` });
          } else {
            res.status(200).send(esporte);
          }
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }
    
    static CadastrarEsportes = (req, res) =>{
        let esporte = new esportes(req.body);
        esporte.aproved = false;
        esporte.save() 
    .then(() => {
        res.status(200).send(esporte.toJSON());
    })
    .catch((err) => {
        res.status(500).send({message: `${err.message} - falha ao cadastrar o esporte`});
    });
    }
    static AtualizarEsportes = async (req, res) => {
        try {
          const id = req.params.id;
          const esporteAtualizado = await esportes.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({ message: 'Esporte atualizado com sucesso' });
        } catch (err) {
          res.status(500).send({ message: err.message });
        }
      }

      static excluiresporte = (req,res) => {
        const id = req.params.id;
        esportes.findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({ message: 'Esporte removido com sucesso' });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
    }
}
export default EsportesController;