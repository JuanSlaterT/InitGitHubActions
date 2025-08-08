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
 *               - cert_type_id
 *               - meeting
 *               - nombre_colaborador
 *             properties:
 *               cert_type_id:
 *                 type: integer
 *                 description: ID del tipo de certificado
 *               meeting:
 *                 type: string
 *                 maxLength: 64
 *                 description: Reunión donde se otorgó el reconocimiento
 *               nombre_colaborador:
 *                 type: string
 *                 maxLength: 120
 *                 description: Nombre del colaborador que recibe el reconocimiento
 *     responses:
 *       201:
 *         description: Reconocimiento creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tipo de certificado no encontrado
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
 *           type: string
 *           format: uuid
 *         description: ID del reconocimiento (UUID)
 *     responses:
 *       200:
 *         description: Reconocimiento encontrado
 *       404:
 *         description: Reconocimiento no encontrado
 */
router.get('/:id', ReconocimientoController.getReconocimientoById);

/**
 * @swagger
 * /api/reconocimiento/colaborador/{nombre_colaborador}:
 *   get:
 *     summary: Obtener reconocimientos por nombre de colaborador
 *     tags: [Reconocimiento]
 *     parameters:
 *       - in: path
 *         name: nombre_colaborador
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del colaborador
 *     responses:
 *       200:
 *         description: Reconocimientos encontrados
 */
router.get('/colaborador/:nombre_colaborador', ReconocimientoController.getReconocimientosByColaborador);

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
 *           type: string
 *           format: uuid
 *         description: ID del reconocimiento a actualizar (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cert_type_id:
 *                 type: integer
 *               meeting:
 *                 type: string
 *                 maxLength: 64
 *               nombre_colaborador:
 *                 type: string
 *                 maxLength: 120
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
 *           type: string
 *           format: uuid
 *         description: ID del reconocimiento a eliminar (UUID)
 *     responses:
 *       200:
 *         description: Reconocimiento eliminado exitosamente
 *       404:
 *         description: Reconocimiento no encontrado
 */
router.delete('/:id', ReconocimientoController.deleteReconocimiento);

module.exports = router; 