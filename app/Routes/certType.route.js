const express = require('express');
const CertTypeController = require('../Controllers/certType.controller');
const router = express.Router();

/**
 * @swagger
 * /api/cert-type:
 *   post:
 *     summary: Crear un nuevo tipo de certificado
 *     tags: [CertType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - nombre
 *             properties:
 *               tipo:
 *                 type: string
 *                 maxLength: 24
 *                 description: Tipo de certificado (ej: KUDOS, ACHIEVEMENT, THANKYOU)
 *               nombre:
 *                 type: string
 *                 maxLength: 64
 *                 description: Nombre descriptivo del tipo de certificado
 *     responses:
 *       201:
 *         description: Tipo de certificado creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Tipo ya existe
 */
router.post('/', CertTypeController.createCertType);

/**
 * @swagger
 * /api/cert-type:
 *   get:
 *     summary: Obtener todos los tipos de certificado
 *     tags: [CertType]
 *     responses:
 *       200:
 *         description: Lista de tipos de certificado obtenida exitosamente
 */
router.get('/', CertTypeController.getAllCertTypes);

/**
 * @swagger
 * /api/cert-type/{id}:
 *   get:
 *     summary: Obtener un tipo de certificado por ID
 *     tags: [CertType]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de certificado
 *     responses:
 *       200:
 *         description: Tipo de certificado encontrado
 *       404:
 *         description: Tipo de certificado no encontrado
 */
router.get('/:id', CertTypeController.getCertTypeById);

/**
 * @swagger
 * /api/cert-type/tipo/{tipo}:
 *   get:
 *     summary: Obtener un tipo de certificado por tipo
 *     tags: [CertType]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de certificado (ej: KUDOS, ACHIEVEMENT, THANKYOU)
 *     responses:
 *       200:
 *         description: Tipo de certificado encontrado
 *       404:
 *         description: Tipo de certificado no encontrado
 */
router.get('/tipo/:tipo', CertTypeController.getCertTypeByTipo);

/**
 * @swagger
 * /api/cert-type/{id}:
 *   put:
 *     summary: Actualizar un tipo de certificado
 *     tags: [CertType]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de certificado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 maxLength: 24
 *               nombre:
 *                 type: string
 *                 maxLength: 64
 *     responses:
 *       200:
 *         description: Tipo de certificado actualizado exitosamente
 *       404:
 *         description: Tipo de certificado no encontrado
 */
router.put('/:id', CertTypeController.updateCertType);

/**
 * @swagger
 * /api/cert-type/{id}:
 *   delete:
 *     summary: Eliminar un tipo de certificado
 *     tags: [CertType]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de certificado a eliminar
 *     responses:
 *       200:
 *         description: Tipo de certificado eliminado exitosamente
 *       404:
 *         description: Tipo de certificado no encontrado
 *       409:
 *         description: No se puede eliminar porque está siendo usado en reconocimientos
 */
router.delete('/:id', CertTypeController.deleteCertType);

module.exports = router; 