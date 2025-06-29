// controllers/vaccineController.js
import { User } from '../models/User.js';
import { Vaccine } from '../models/Vaccine.js';

export const registerVaccines = async (req, res) => {
  try {
    const userId = req.user.id; // Assumindo que verificarToken já colocou o user no req
    const { vacinas } = req.body; // Array de códigos das vacinas, ex: ['triplice20', 'dtpa18']

    if (!vacinas || !Array.isArray(vacinas) || vacinas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma vacina fornecida.' });
    }

    // Busca as vacinas no banco que correspondem aos códigos enviados
    const vaccinesFound = await Vaccine.findAll({
      where: { codigo: vacinas }
    });

    if (vaccinesFound.length === 0) {
      return res.status(404).json({ error: 'Nenhuma vacina válida encontrada.' });
    }

    // Busca o usuário no banco (para garantir que existe)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Adiciona as vacinas ao usuário
    // Usando "addVaccines" gerado pelo belongsToMany (plural: addVaccines)
    // Poderia usar também setVaccines para substituir, ou addVaccine para uma só
    await user.addVaccines(vaccinesFound);

    return res.json({ message: 'Vacinas registradas com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar vacinas:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
