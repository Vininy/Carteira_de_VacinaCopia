import { User } from '../models/User.js';
import { Vaccine } from '../models/Vaccine.js';

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
