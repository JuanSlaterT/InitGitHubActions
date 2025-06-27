const express = require('express');
const ReconocimientoController = require('../Controllers/reconocimiento.controller');
const router = express.Router();

/**
 * @swagger
 * /api/reconocimiento:
 *   post:
 *     summary: Crear un nuevo reconocimiento
 *     tags: [Reconocimiento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email_persona
 *               - cert_type_id
 *               - meeting
 *             properties:
 *               email_persona:
 *                 type: string
 *                 format: email
 *                 description: Email de la persona que recibe el reconocimiento
 *               cert_type_id:
 *                 type: integer
 *                 description: ID del tipo de certificado
 *               meeting:
 *                 type: string
 *                 maxLength: 64
 *                 description: Reunión donde se otorgó el reconocimiento
 *     responses:
 *       201:
 *         description: Reconocimiento creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Persona o tipo de certificado no encontrado
 */
router.post('/', ReconocimientoController.createReconocimiento);

/**
 * @swagger
 * /api/reconocimiento:
 *   get:
 *     summary: Obtener todos los reconocimientos
 *     tags: [Reconocimiento]
 *     responses:
 *       200:
 *         description: Lista de reconocimientos obtenida exitosamente
 */
router.get('/', ReconocimientoController.getAllReconocimientos);

/**
 * @swagger
 * /api/reconocimiento/stats:
 *   get:
 *     summary: Obtener estadísticas de reconocimientos
 *     tags: [Reconocimiento]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 */
router.get('/stats', ReconocimientoController.getReconocimientoStats);

/**
 * @swagger
 * /api/reconocimiento/{id}:
 *   get:
 *     summary: Obtener un reconocimiento por ID
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reconocimiento
 *     responses:
 *       200:
 *         description: Reconocimiento encontrado
 *       404:
 *         description: Reconocimiento no encontrado
 */
router.get('/:id', ReconocimientoController.getReconocimientoById);

/**
 * @swagger
 * /api/reconocimiento/email/{email}:
 *   get:
 *     summary: Obtener reconocimientos por email de persona
 *     tags: [Reconocimiento]
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
 *         description: Reconocimientos encontrados
 */
router.get('/email/:email', ReconocimientoController.getReconocimientosByEmail);

/**
 * @swagger
 * /api/reconocimiento/cert-type/{cert_type_id}:
 *   get:
 *     summary: Obtener reconocimientos por ID de tipo de certificado
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: cert_type_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de certificado
 *     responses:
 *       200:
 *         description: Reconocimientos encontrados
 */
router.get('/cert-type/:cert_type_id', ReconocimientoController.getReconocimientosByCertTypeId);

/**
 * @swagger
 * /api/reconocimiento/tipo/{tipo}:
 *   get:
 *     summary: Obtener reconocimientos por tipo de certificado
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de certificado (ej: KUDOS, ACHIEVEMENT, THANKYOU)
 *     responses:
 *       200:
 *         description: Reconocimientos encontrados
 */
router.get('/tipo/:tipo', ReconocimientoController.getReconocimientosByTipo);

/**
 * @swagger
 * /api/reconocimiento/{id}:
 *   put:
 *     summary: Actualizar un reconocimiento
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reconocimiento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_persona:
 *                 type: string
 *                 format: email
 *               cert_type_id:
 *                 type: integer
 *               meeting:
 *                 type: string
 *                 maxLength: 64
 *     responses:
 *       200:
 *         description: Reconocimiento actualizado exitosamente
 *       404:
 *         description: Reconocimiento no encontrado
 */
router.put('/:id', ReconocimientoController.updateReconocimiento);

/**
 * @swagger
 * /api/reconocimiento/{id}:
 *   delete:
 *     summary: Eliminar un reconocimiento
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reconocimiento a eliminar
 *     responses:
 *       200:
 *         description: Reconocimiento eliminado exitosamente
 *       404:
 *         description: Reconocimiento no encontrado
 */
router.delete('/:id', ReconocimientoController.deleteReconocimiento);

module.exports = router; 