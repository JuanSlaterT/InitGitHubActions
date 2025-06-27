const express = require('express');
const PersonaController = require('../Controllers/persona.controller');
const router = express.Router();

/**
 * @swagger
 * /api/persona:
 *   post:
 *     summary: Crear una nueva persona
 *     tags: [Persona]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - full_name
 *               - url_image
 *               - team
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de la persona (PRIMARY KEY)
 *               full_name:
 *                 type: string
 *                 maxLength: 64
 *                 description: Nombre completo de la persona
 *               url_image:
 *                 type: string
 *                 maxLength: 128
 *                 description: URL de la imagen de la persona
 *               team:
 *                 type: string
 *                 maxLength: 24
 *                 description: Equipo al que pertenece la persona
 *               role:
 *                 type: string
 *                 maxLength: 32
 *                 description: Rol de la persona
 *     responses:
 *       201:
 *         description: Persona creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Email ya existe
 */
router.post('/', PersonaController.createPersona);

/**
 * @swagger
 * /api/persona:
 *   get:
 *     summary: Obtener todas las personas
 *     tags: [Persona]
 *     responses:
 *       200:
 *         description: Lista de personas obtenida exitosamente
 */
router.get('/', PersonaController.getAllPersonas);

/**
 * @swagger
 * /api/persona/{email}:
 *   get:
 *     summary: Obtener una persona por email
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get('/:email', PersonaController.getPersonaByEmail);

/**
 * @swagger
 * /api/persona/{email}:
 *   put:
 *     summary: Actualizar una persona
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email de la persona a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 maxLength: 64
 *               url_image:
 *                 type: string
 *                 maxLength: 128
 *               team:
 *                 type: string
 *                 maxLength: 24
 *               role:
 *                 type: string
 *                 maxLength: 32
 *     responses:
 *       200:
 *         description: Persona actualizada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.put('/:email', PersonaController.updatePersona);

/**
 * @swagger
 * /api/persona/{email}:
 *   delete:
 *     summary: Eliminar una persona
 *     tags: [Persona]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email de la persona a eliminar
 *     responses:
 *       200:
 *         description: Persona eliminada exitosamente
 *       404:
 *         description: Persona no encontrada
 */
router.delete('/:email', PersonaController.deletePersona);

module.exports = router; 