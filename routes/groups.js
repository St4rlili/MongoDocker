import express from 'express';
import Group from '../models/Group.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const groups = await Group.find().populate('users');
  res.json(groups);
});

router.get('/:id', async (req, res) => {
  const group = await Group.findById(req.params.id).populate('users');
  if (!group) return res.status(404).json({ error: 'Grupo no encontrado' });
  res.json(group);
});

router.post('/', async (req, res) => {
  const { name, users } = req.body;
  if (users) {
    const validUsers = await User.find({ _id: { $in: users } });
    if (validUsers.length !== users.length) return res.status(400).json({ error: 'ID inválido' });
  }
  const newGroup = new Group({ name, users });
  await newGroup.save();
  res.status(201).json(newGroup);
});

router.put('/:id', async (req, res) => {
  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedGroup) return res.status(404).json({ error: 'Grupo no encontrado' });
  res.json(updatedGroup);
});

router.delete('/:id', async (req, res) => {
  const deletedGroup = await Group.findByIdAndDelete(req.params.id);
  if (!deletedGroup) return res.status(404).json({ error: 'Grupo no encontrado' });
  res.json({ message: 'Grupo borrado' });
});

export default router;
