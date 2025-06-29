import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { nome, email, cpf, senha, dataNascimento, tipoSanguineo } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({
      nome,
      email,
      cpf,
      senha: senhaHash,
      dataNascimento,       
      tipoSanguineo        
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err); // log detalhado no terminal
    res.status(400).json({ error: 'Erro ao cadastrar usuário', details: err.message });
  }
};


export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login', details: err.message });
  }
};

export const profile = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.userId, {
      attributes: ['id', 'nome', 'email', 'cpf']
    });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};
