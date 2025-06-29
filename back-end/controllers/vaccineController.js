import { User } from '../models/User.js';
import { Vaccine } from '../models/Vaccine.js';

export const registerVaccines = async (req, res) => {
  try {
    const userId = req.user.id; // vem do token
    const { vacinas } = req.body; // array de códigos, ex: ['triplice20', 'dtpa18']

    if (!vacinas || !Array.isArray(vacinas) || vacinas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma vacina fornecida.' });
    }

    // Buscar as vacinas no banco que batem com os códigos enviados
    const vaccinesFound = await Vaccine.findAll({
      where: { codigo: vacinas }
    });

    if (vaccinesFound.length === 0) {
      return res.status(404).json({ error: 'Nenhuma vacina válida encontrada.' });
    }

    // Buscar usuário pra garantir que existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Aqui adiciona as vacinas pro usuário (belongsToMany cria o método addVaccines)
    await user.addVaccines(vaccinesFound);

    return res.json({ message: 'Vacinas registradas com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar vacinas:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

export const getUserVaccines = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      include: {
        model: Vaccine,
        through: {
          attributes: ['aplicada', 'dataAplicacao']
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const vacinas = user.Vaccines.map(v => ({
      nome: v.nome,
      descricao: v.descricao,
      aplicada: v.UserVaccine.aplicada,
      dataAplicacao: v.UserVaccine.dataAplicacao
    }));

    return res.json(vacinas);
  } catch (error) {
    console.error('Erro ao buscar vacinas do usuário:', error);
    return res.status(500).json({ error: 'Erro ao buscar vacinas.' });
  }
};
